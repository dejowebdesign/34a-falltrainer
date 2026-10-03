import { TestBed } from '@angular/core/testing';
import { OralExamService } from './oral-exam.service';
import { ORAL_EXAM_POOL } from '../data/oral-exam-authored.data';
import { ORAL_EXAM_DURATION_SECONDS } from '../models';

describe('OralExamService', () => {
  let service: OralExamService;

  beforeEach(() => {
    window.sessionStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(OralExamService);
  });

  afterEach(() => {
    service.reset();
    window.sessionStorage.clear();
  });

  it('startet einen Durchlauf mit 27 Fragen in 9 Themengebieten', () => {
    const exam = service.start();
    expect(exam.questions.length).toBe(27);
    expect(exam.topics.length).toBe(9);
    expect(service.totalCount()).toBe(27);
    expect(service.answeredCount()).toBe(0);
    expect(service.isComplete()).toBe(false);
  });

  it('startet den Timer mit 15:00 erst beim tatsächlichen Start', () => {
    expect(service.exam()).toBeNull();
    service.start();
    expect(service.remainingSeconds()).toBe(ORAL_EXAM_DURATION_SECONDS);
    expect(service.isFinished()).toBe(false);
    expect(service.isLocked()).toBe(false);
  });

  it('verwirft eine vorherige Antwort beim Neustart', () => {
    const exam = service.start();
    service.answer(exam.questions[0].id, exam.questions[0].options[0].id);
    expect(service.answeredCount()).toBe(1);

    service.start();
    expect(service.answeredCount()).toBe(0);
  });

  it('ersetzt die Antwort einer bereits beantworteten Frage', () => {
    const exam = service.start();
    const question = exam.questions[0];
    service.answer(question.id, question.options[0].id);
    service.answer(question.id, question.options[1].id);
    expect(service.answeredCount()).toBe(1);
    expect(service.selectedOptionId(question.id)).toBe(question.options[1].id);
  });

  it('meldet Vollständigkeit erst nach 27 Antworten', () => {
    const exam = service.start();
    exam.questions.slice(0, 26).forEach((question) => {
      service.answer(question.id, question.options[0].id);
    });
    expect(service.isComplete()).toBe(false);
    service.answer(exam.questions[26].id, exam.questions[26].options[0].id);
    expect(service.isComplete()).toBe(true);
  });

  it('liefert ohne Durchlauf keine Auswertung', () => {
    expect(service.evaluate()).toBeNull();
  });

  it('wertet einen vollständig richtig beantworteten Durchlauf als bestanden aus', () => {
    const exam = service.start();
    for (const question of exam.questions) {
      const correct = question.options.find((option) => option.correct)!;
      service.answer(question.id, correct.id);
    }
    service.finish(Date.now(), false);
    const result = service.evaluate()!;
    expect(result.correctCount).toBe(27);
    expect(result.passed).toBe(true);
    expect(result.unansweredCount).toBe(0);
    expect(result.timedOut).toBe(false);
  });

  it('setzt den Durchlauf zurück', () => {
    service.start();
    service.reset();
    expect(service.exam()).toBeNull();
    expect(service.evaluate()).toBeNull();
    expect(service.remainingSeconds()).toBe(ORAL_EXAM_DURATION_SECONDS);
  });

  it('zieht nur Blöcke aus dem konfigurierten Pool heran', () => {
    const exam = service.start();
    const poolIds = new Set(ORAL_EXAM_POOL.map((entry) => entry.blockId));
    for (const topic of exam.topics) {
      expect(poolIds.has(topic.blockId)).toBe(true);
    }
  });

  it('stellt eine laufende Sitzung aus dem sessionStorage wieder her', () => {
    const exam = service.start();
    service.answer(exam.questions[0].id, exam.questions[0].options[0].id);
    const snapshot = service.session()!;

    // Neustart der App simulieren: Zustand verwerfen, gespeicherte Sitzung behalten.
    service.reset();
    expect(service.exam()).toBeNull();
    window.sessionStorage.setItem('ft.oral-exam.session.v1', JSON.stringify(snapshot));

    expect(service.restoreSession()).toBe(true);
    expect(service.exam()?.id).toBe(exam.id);
    expect(service.answeredCount()).toBe(1);
  });

  it('setzt die verbleibende Zeit bei einer Wiederherstellung nicht zurück', () => {
    const exam = service.start();
    const session = service.session()!;
    service.reset();
    window.sessionStorage.setItem(
      'ft.oral-exam.session.v1',
      JSON.stringify({ ...session, startedAt: Date.now() - 120_000 }),
    );

    expect(service.restoreSession()).toBe(true);
    expect(service.exam()?.id).toBe(exam.id);
    expect(service.remainingSeconds()).toBeLessThan(ORAL_EXAM_DURATION_SECONDS);
    expect(service.remainingSeconds()).toBeLessThanOrEqual(780);
    expect(service.remainingSeconds()).toBeGreaterThan(770);
  });

  it('beendet eine beim Wiederherstellen bereits abgelaufene Sitzung', () => {
    const exam = service.start();
    const session = service.session()!;
    service.reset();
    window.sessionStorage.setItem(
      'ft.oral-exam.session.v1',
      JSON.stringify({
        ...session,
        startedAt: Date.now() - (ORAL_EXAM_DURATION_SECONDS + 30) * 1000,
      }),
    );

    expect(service.restoreSession()).toBe(true);
    expect(service.exam()?.id).toBe(exam.id);
    expect(service.timedOut()).toBe(true);
    expect(service.isLocked()).toBe(true);
    expect(service.remainingSeconds()).toBe(0);
  });

  it('sperrt nach Zeitablauf jede weitere Antwort und Navigation', () => {
    const exam = service.start();
    const first = exam.questions[0];
    service.answer(first.id, first.options[0].id);

    service.finish(Date.now(), true);
    expect(service.timedOut()).toBe(true);
    expect(service.isLocked()).toBe(true);

    const before = service.answeredCount();
    service.answer(exam.questions[1].id, exam.questions[1].options[0].id);
    expect(service.answeredCount()).toBe(before);
    expect(service.selectedOptionId(first.id)).toBe(first.options[0].id);
  });

  it('wertet bei Zeitablauf unbeantwortete Fragen als falsch', () => {
    const exam = service.start();
    for (const question of exam.questions.slice(0, 20)) {
      service.answer(question.id, question.options.find((o) => o.correct)!.id);
    }
    service.finish(Date.now(), true);

    const result = service.evaluate()!;
    expect(result.correctCount).toBe(20);
    expect(result.unansweredCount).toBe(7);
    expect(result.timedOut).toBe(true);
    expect(result.elapsedSeconds).toBe(ORAL_EXAM_DURATION_SECONDS);
  });

  it('startet einen neuen Durchlauf wieder bei 15:00', () => {
    service.start();
    service.finish(Date.now(), true);
    expect(service.remainingSeconds()).toBe(0);

    service.start();
    expect(service.remainingSeconds()).toBe(ORAL_EXAM_DURATION_SECONDS);
    expect(service.isFinished()).toBe(false);
    expect(service.timedOut()).toBe(false);
  });

  it('meldet die tatsächliche Bearbeitungszeit bei regulärem Ende', () => {
    const exam = service.start();
    const session = service.session()!;
    service.reset();
    window.sessionStorage.setItem(
      'ft.oral-exam.session.v1',
      JSON.stringify({ ...session, startedAt: Date.now() - 761_000 }),
    );
    expect(service.restoreSession()).toBe(true);
    for (const question of exam.questions) {
      service.answer(question.id, question.options[0].id);
    }
    service.finish(Date.now(), false);

    const result = service.evaluate()!;
    expect(result.timedOut).toBe(false);
    expect(result.elapsedSeconds).toBeGreaterThanOrEqual(760);
    expect(result.elapsedSeconds).toBeLessThanOrEqual(762);
  });
});

