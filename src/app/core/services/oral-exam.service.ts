import { Injectable, OnDestroy, computed, signal } from '@angular/core';
import { ExamEvaluation, ExamResponse, OralExam, OralExamSession } from '../models';
import { ORAL_EXAM_DURATION_SECONDS } from '../models';
import { ORAL_EXAM_POOL } from '../data/oral-exam-authored.data';
import { ORAL_EXAM_QUESTIONS } from '../data/oral-exam-questions.data';
import {
  buildExam,
  evaluateExam,
  examRemainingSeconds,
  finishExamSession,
  isExamExpired,
} from '../rules/oral-exam-engine';

/** Schlüssel der laufenden Prüfungssitzung im `sessionStorage`. */
const STORAGE_KEY = 'ft.oral-exam.session.v1';

const EMPTY_RESPONSES: readonly ExamResponse[] = [];

/**
 * Zustand der mündlichen Prüfungssimulation.
 *
 * Der Dienst hält den aktuellen Durchlauf, die Antworten des Teilnehmers und
 * den Prüfungstimer. Die verbleibende Zeit wird aus dem gespeicherten
 * Startzeitpunkt berechnet, nicht als flüchtiger Zähler geführt; dadurch
 * übersteht ein Browser-Refresh die laufende Prüfung.
 *
 * Ein neuer Durchlauf startet erst mit `start()`. `restoreSession()` stellt
 * eine laufende Prüfung nach einem Refresh wieder her.
 */
@Injectable({ providedIn: 'root' })
export class OralExamService implements OnDestroy {
  private readonly sessionSignal = signal<OralExamSession | null>(null);
  private readonly remainingSignal = signal<number>(ORAL_EXAM_DURATION_SECONDS);
  private timer: ReturnType<typeof setInterval> | null = null;

  readonly session = this.sessionSignal.asReadonly();
  readonly remainingSeconds = this.remainingSignal.asReadonly();

  readonly exam = computed<OralExam | null>(() => this.sessionSignal()?.exam ?? null);
  readonly responses = computed<readonly ExamResponse[]>(
    () => this.sessionSignal()?.responses ?? EMPTY_RESPONSES,
  );

  readonly answeredCount = computed(() => this.responses().length);
  readonly totalCount = computed(() => this.exam()?.questions.length ?? 0);
  readonly isComplete = computed(
    () => this.totalCount() > 0 && this.answeredCount() === this.totalCount(),
  );

  /** Ist die Prüfung beendet (regulär oder wegen Zeitablauf)? */
  readonly isFinished = computed(() => this.sessionSignal()?.finishedAt !== undefined);
  /** Wurde die Prüfung wegen Zeitablauf beendet? */
  readonly timedOut = computed(() => this.sessionSignal()?.timedOut === true);
  /** Sind weitere Eingaben gesperrt? */
  readonly isLocked = computed(() => this.isFinished());

  constructor() {
    this.restoreSession();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  /** Startet einen neuen Durchlauf (9 Themengebiete × 3 Fragen) mit 15 Minuten. */
  start(): OralExam {
    const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL);
    const session: OralExamSession = { exam, responses: [], startedAt: Date.now() };
    this.applySession(session);
    return exam;
  }

  /**
   * Stellt eine gespeicherte Sitzung wieder her. Eine bereits abgelaufene
   * Prüfung wird sofort beendet, damit die Zeit nicht erneut beginnt.
   */
  restoreSession(): boolean {
    const stored = this.readStorage();
    if (!stored) {
      return false;
    }
    this.applySession(stored);
    if (this.sessionSignal()?.finishedAt === undefined) {
      this.tick();
    }
    return true;
  }

  /** Speichert die Antwort auf eine Frage. Nach Prüfungsende wirkungslos. */
  answer(questionId: string, selectedOptionId: string): void {
    if (this.isLocked()) {
      return;
    }
    this.updateSession((session) => ({
      ...session,
      responses: [
        ...session.responses.filter((response) => response.questionId !== questionId),
        { questionId, selectedOptionId },
      ],
    }));
  }

  /** Liefert die gewählte Option einer Frage, falls vorhanden. */
  selectedOptionId(questionId: string): string | undefined {
    return this.sessionSignal()
      ?.responses.find((response) => response.questionId === questionId)
      ?.selectedOptionId;
  }

  /**
   * Beendet die Prüfung regulär (`timedOut = false`) oder wegen Zeitablauf.
   * Nach dem Beenden ist keine Eingabe mehr möglich.
   */
  finish(now: number = Date.now(), timedOut = false): void {
    const session = this.sessionSignal();
    if (!session || session.finishedAt !== undefined) {
      return;
    }
    const finished = finishExamSession(session, now, timedOut);
    this.sessionSignal.set(finished);
    this.persist(finished);
    this.remainingSignal.set(examRemainingSeconds(finished, finished.finishedAt!));
    this.stopTimer();
  }

  /** Wertet den aktuellen Durchlauf inklusive Zeitdaten aus. */
  evaluate(): ExamEvaluation | null {
    const session = this.sessionSignal();
    if (!session) {
      return null;
    }
    return evaluateExam(session.exam, session.responses, session);
  }

  /** Setzt den Durchlauf zurück und löscht die gespeicherte Sitzung. */
  reset(): void {
    this.stopTimer();
    this.sessionSignal.set(null);
    this.remainingSignal.set(ORAL_EXAM_DURATION_SECONDS);
    this.clearStorage();
  }

  private applySession(session: OralExamSession): void {
    this.sessionSignal.set(session);
    this.persist(session);
    this.remainingSignal.set(examRemainingSeconds(session, Date.now()));
    if (session.finishedAt === undefined) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  private updateSession(update: (session: OralExamSession) => OralExamSession): void {
    const session = this.sessionSignal();
    if (!session) {
      return;
    }
    const next = update(session);
    this.sessionSignal.set(next);
    this.persist(next);
  }

  private startTimer(): void {
    if (this.timer !== null) {
      return;
    }
    this.timer = setInterval(() => this.tick(), 1000);
  }

  private stopTimer(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private tick(): void {
    const session = this.sessionSignal();
    if (!session) {
      return;
    }
    if (session.finishedAt !== undefined) {
      this.remainingSignal.set(examRemainingSeconds(session, session.finishedAt));
      return;
    }
    const now = Date.now();
    if (isExamExpired(session, now)) {
      this.finish(now, true);
      return;
    }
    this.remainingSignal.set(examRemainingSeconds(session, now));
  }

  private persist(session: OralExamSession): void {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
      // sessionStorage kann in restriktiven Kontexten blockiert sein.
    }
  }

  private readStorage(): OralExamSession | null {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw) as OralExamSession;
      if (!parsed?.exam?.questions?.length || typeof parsed.startedAt !== 'number') {
        this.clearStorage();
        return null;
      }
      return parsed;
    } catch {
      this.clearStorage();
      return null;
    }
  }

  private clearStorage(): void {
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // siehe persist()
    }
  }
}
