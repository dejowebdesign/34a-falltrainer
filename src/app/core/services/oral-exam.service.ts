import { Injectable, computed, signal } from '@angular/core';
import { ExamEvaluation, ExamResponse, OralExam } from '../models';
import { ORAL_EXAM_POOL } from '../data/oral-exam-authored.data';
import { ORAL_EXAM_QUESTIONS } from '../data/oral-exam-questions.data';
import { buildExam, evaluateExam } from '../rules/oral-exam-engine';

/**
 * Zustand der mündlichen Prüfungssimulation.
 *
 * Der Dienst hält den aktuellen Durchlauf, die Antworten des Teilnehmers und
 * die daraus berechnete Auswertung. Der Durchlauf wird bewusst nicht dauerhaft
 * gespeichert: Beim Verlassen der Prüfung beginnt eine neue Simulation.
 */
@Injectable({ providedIn: 'root' })
export class OralExamService {
  private readonly examSignal = signal<OralExam | null>(null);
  private readonly responsesSignal = signal<ExamResponse[]>([]);

  readonly exam = this.examSignal.asReadonly();
  readonly responses = this.responsesSignal.asReadonly();

  readonly answeredCount = computed(() => this.responsesSignal().length);
  readonly totalCount = computed(() => this.examSignal()?.questions.length ?? 0);
  readonly isComplete = computed(
    () => this.totalCount() > 0 && this.answeredCount() === this.totalCount(),
  );

  /** Startet einen neuen Durchlauf (9 Themengebiete × 3 Fragen). */
  start(): OralExam {
    const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL);
    this.examSignal.set(exam);
    this.responsesSignal.set([]);
    return exam;
  }

  /** Speichert die Antwort auf eine Frage. */
  answer(questionId: string, selectedOptionId: string): void {
    this.responsesSignal.update((responses) => {
      const withoutQuestion = responses.filter((response) => response.questionId !== questionId);
      return [...withoutQuestion, { questionId, selectedOptionId }];
    });
  }

  /** Liefert die gewählte Option einer Frage, falls vorhanden. */
  selectedOptionId(questionId: string): string | undefined {
    return this.responsesSignal().find((response) => response.questionId === questionId)
      ?.selectedOptionId;
  }

  /** Wertet den aktuellen Durchlauf aus. */
  evaluate(): ExamEvaluation | null {
    const exam = this.examSignal();
    if (!exam) {
      return null;
    }
    return evaluateExam(exam, this.responsesSignal());
  }

  /** Setzt den Durchlauf zurück. */
  reset(): void {
    this.examSignal.set(null);
    this.responsesSignal.set([]);
  }
}
