import { TestBed } from '@angular/core/testing';
import { OralExamService } from './oral-exam.service';
import { ORAL_EXAM_POOL } from '../data/oral-exam-authored.data';

describe('OralExamService', () => {
  let service: OralExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OralExamService);
  });

  it('startet einen Durchlauf mit 27 Fragen in 9 Themengebieten', () => {
    const exam = service.start();
    expect(exam.questions.length).toBe(27);
    expect(exam.topics.length).toBe(9);
    expect(service.totalCount()).toBe(27);
    expect(service.answeredCount()).toBe(0);
    expect(service.isComplete()).toBe(false);
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
    const result = service.evaluate()!;
    expect(result.correctCount).toBe(27);
    expect(result.passed).toBe(true);
  });

  it('setzt den Durchlauf zurück', () => {
    service.start();
    service.reset();
    expect(service.exam()).toBeNull();
    expect(service.evaluate()).toBeNull();
  });

  it('zieht nur Blöcke aus dem konfigurierten Pool heran', () => {
    const exam = service.start();
    const poolIds = new Set(ORAL_EXAM_POOL.map((entry) => entry.blockId));
    for (const topic of exam.topics) {
      expect(poolIds.has(topic.blockId)).toBe(true);
    }
  });
});
