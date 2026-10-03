import {
  ORAL_EXAM_OPTION_COUNT,
  ORAL_EXAM_PASS_PERCENT,
  buildExam,
  evaluateExam,
  questionDifficulty,
  questionText,
  validatePool,
  validatePoolQuality,
} from './oral-exam-engine';
import { ORAL_EXAM_POOL } from '../data/oral-exam-authored.data';
import { ORAL_EXAM_QUESTIONS } from '../data/oral-exam-questions.data';
import { ExamResponse, OralExam, OralExamPoolBlock } from '../models';

const NORM_PATTERN = /§\s*\d|Art\.\s*\d/;

function brokenCorrectAnswer(entry: OralExamPoolBlock): string {
  const block = ORAL_EXAM_QUESTIONS.find((q) => q.id === entry.blockId)!;
  return entry.answerOverride ?? block.correctAnswer;
}

/** Deterministische Zufallsfunktion (immer 0 → immer das erste Element). */
const first = () => 0;
/** Deterministische Zufallsfunktion (immer 0.999 → immer das letzte Element). */
const last = () => 0.999999;

function correctResponses(exam: OralExam): ExamResponse[] {
  return exam.questions.map((question) => ({
    questionId: question.id,
    selectedOptionId: question.options.find((option) => option.correct)!.id,
  }));
}

function wrongResponses(exam: OralExam): ExamResponse[] {
  return exam.questions.map((question) => ({
    questionId: question.id,
    selectedOptionId: question.options.find((option) => !option.correct)!.id,
  }));
}

describe('oral-exam-engine', () => {
  describe('validatePool', () => {
    it('akzeptiert den mitgelieferten Prüfungspool', () => {
      expect(() => validatePool(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL)).not.toThrow();
    });

    it('wirft, wenn ein Themengebiet nicht abgedeckt ist', () => {
      const poolWithoutTechnik = ORAL_EXAM_POOL.filter(
        (entry) =>
          !['fragen-220', 'fragen-218', 'fragen-224'].includes(entry.blockId),
      );
      expect(() => validatePool(ORAL_EXAM_QUESTIONS, poolWithoutTechnik)).toThrowError(
        /Kein Prüfungsblock für Themengebiet Technik/,
      );
    });

    it('wirft bei falscher Distraktorenanzahl', () => {
      const broken: OralExamPoolBlock[] = [
        {
          ...ORAL_EXAM_POOL[0],
          followUp1: { ...ORAL_EXAM_POOL[0].followUp1, distractors: ['nur einer'] },
        },
      ];
      expect(() => validatePool(ORAL_EXAM_QUESTIONS, broken)).toThrowError(/4 Distraktoren/);
    });

    it('wirft bei unbekanntem Blockbezug', () => {
      const broken: OralExamPoolBlock[] = [{ ...ORAL_EXAM_POOL[0], blockId: 'gibt-es-nicht' }];
      expect(() => validatePool(ORAL_EXAM_QUESTIONS, broken)).toThrowError(/unbekannten Block/);
    });
  });

  describe('buildExam', () => {
    it('erzeugt 9 Themengebiete mit je 3 Fragen (27 Fragen)', () => {
      const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, first, 'test');
      expect(exam.topics.length).toBe(9);
      expect(exam.questions.length).toBe(27);
      for (const topic of exam.topics) {
        expect(topic.questions.length).toBe(3);
      }
    });

    it('wählt je Themengebiet einen Block aus der passenden Kategorie', () => {
      const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, first, 'test');
      const byId = new Map(ORAL_EXAM_QUESTIONS.map((q) => [q.id, q]));
      for (const topic of exam.topics) {
        expect(byId.get(topic.blockId)?.category).toBe(topic.category);
      }
    });

    it('ordnet Hauptfrage, Folgefrage 1 und Folgefrage 2 hintereinander an', () => {
      const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, first, 'test');
      for (const topic of exam.topics) {
        expect(topic.questions.map((q) => q.role)).toEqual([
          'HAUPTFRAGE',
          'FOLGEFRAGE_1',
          'FOLGEFRAGE_2',
        ]);
      }
      expect(exam.questions.map((q) => q.position)).toEqual(
        Array.from({ length: 27 }, (_, i) => i + 1),
      );
    });

    it('gibt jeder Frage genau fünf Optionen mit genau einer richtigen', () => {
      const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, first, 'test');
      for (const question of exam.questions) {
        expect(question.options.length).toBe(ORAL_EXAM_OPTION_COUNT);
        expect(question.options.filter((option) => option.correct).length).toBe(1);
      }
    });

    it('übernimmt die überarbeitete Hauptfrage und Antwort aus dem Pool', () => {
      const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, first, 'test');
      const byBlockId = new Map(ORAL_EXAM_POOL.map((entry) => [entry.blockId, entry]));
      const blocks = new Map(ORAL_EXAM_QUESTIONS.map((q) => [q.id, q]));
      for (const topic of exam.topics) {
        const entry = byBlockId.get(topic.blockId)!;
        const block = blocks.get(topic.blockId)!;
        const main = topic.questions[0];
        expect(main.question).toBe(entry.questionOverride ?? block.question);
        expect(main.correctAnswer).toBe(entry.answerOverride ?? block.correctAnswer);
        expect(main.source).toBe('QUESTIONS_TXT');
      }
    });

    it('übernimmt die überarbeitete Formulierung der Folgefragen aus dem Pool', () => {
      const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, first, 'test');
      const byBlockId = new Map(ORAL_EXAM_POOL.map((entry) => [entry.blockId, entry]));
      const blocks = new Map(ORAL_EXAM_QUESTIONS.map((q) => [q.id, q]));
      for (const topic of exam.topics) {
        const entry = byBlockId.get(topic.blockId)!;
        const block = blocks.get(topic.blockId)!;
        expect(topic.questions[1].question).toBe(entry.followUp1.question ?? block.followUp1);
        expect(topic.questions[2].question).toBe(entry.followUp2.question ?? block.followUp2);
      }
    });

    it('verteilt die richtige Antwort über verschiedene Positionen', () => {
      const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, first, 'test');
      const positions = new Set(
        exam.questions.map((question) => question.options.findIndex((option) => option.correct)),
      );
      expect(positions.size).toBeGreaterThan(1);
    });

    it('wählt bei anderem Zufall einen anderen Block', () => {
      const examFirst = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, first, 'a');
      const examLast = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, last, 'b');
      const firstBlocks = examFirst.topics.map((topic) => topic.blockId);
      const lastBlocks = examLast.topics.map((topic) => topic.blockId);
      expect(firstBlocks).not.toEqual(lastBlocks);
    });
  });

  describe('evaluateExam', () => {
    it('vergibt bei allen richtigen Antworten 27 Punkte und bestanden', () => {
      const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, first, 'test');
      const result = evaluateExam(exam, correctResponses(exam));
      expect(result.correctCount).toBe(27);
      expect(result.total).toBe(27);
      expect(result.percent).toBe(100);
      expect(result.passed).toBe(true);
      expect(result.requiredPoints).toBe(14);
      expect(result.thresholdPercent).toBe(ORAL_EXAM_PASS_PERCENT);
    });

    it('vergibt bei allen falschen Antworten 0 Punkte und nicht bestanden', () => {
      const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, first, 'test');
      const result = evaluateExam(exam, wrongResponses(exam));
      expect(result.correctCount).toBe(0);
      expect(result.percent).toBe(0);
      expect(result.passed).toBe(false);
    });

    it('wertet nicht beantwortete Fragen als falsch', () => {
      const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, first, 'test');
      const result = evaluateExam(exam, []);
      expect(result.correctCount).toBe(0);
      expect(result.topics.every((topic) => topic.questions.every((q) => q.selectedText === undefined))).toBe(
        true,
      );
    });

    it('besteht mit genau 14 von 27 Punkten', () => {
      const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, first, 'test');
      const responses = correctResponses(exam).slice(0, 14);
      const result = evaluateExam(exam, responses);
      expect(result.correctCount).toBe(14);
      expect(result.passed).toBe(true);
    });

    it('besteht mit 13 von 27 Punkten nicht', () => {
      const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, first, 'test');
      const responses = correctResponses(exam).slice(0, 13);
      const result = evaluateExam(exam, responses);
      expect(result.correctCount).toBe(13);
      expect(result.passed).toBe(false);
    });

    it('berechnet die Punkte je Themengebiet', () => {
      const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, first, 'test');
      const responses = correctResponses(exam).slice(0, 4);
      const result = evaluateExam(exam, responses);
      expect(result.topics[0].correctCount).toBe(3);
      expect(result.topics[0].total).toBe(3);
      expect(result.topics[0].percent).toBe(100);
      expect(result.topics[1].correctCount).toBe(1);
      expect(result.topics[1].percent).toBeCloseTo(33.3, 1);
      expect(result.topics[2].correctCount).toBe(0);
    });

    it('liefert die gegebene Antwort im Klartext', () => {
      const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, first, 'test');
      const firstQuestion = exam.questions[0];
      const chosen = firstQuestion.options[0];
      const result = evaluateExam(exam, [
        { questionId: firstQuestion.id, selectedOptionId: chosen.id },
      ]);
      expect(result.topics[0].questions[0].selectedText).toBe(chosen.text);
    });
  });

  describe('validatePoolQuality', () => {
    it('meldet keine formalen Auffälligkeiten im mitgelieferten Pool', () => {
      expect(validatePoolQuality(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL)).toEqual([]);
    });

    it('bemängelt einen offensichtlich falschen, absoluten Distraktor', () => {
      const idx = ORAL_EXAM_POOL.findIndex((entry) => entry.blockId === 'fragen-218');
      const broken = [...ORAL_EXAM_POOL];
      broken[idx] = {
        ...broken[idx],
        main: {
          ...broken[idx].main,
          distractors: [
            'Der Besitzdiener darf unbegrenzt Gewalt einsetzen und ist dabei an keine Grenzen gebunden.',
            ...broken[idx].main.distractors.slice(0, 3),
          ],
        },
      };
      const issues = validatePoolQuality(ORAL_EXAM_QUESTIONS, broken);
      expect(issues.some((issue) => issue.kind === 'ABSOLUTE_DISTRACTOR')).toBe(true);
    });

    it('bemängelt eine Paragraphenangabe in einer falschen Antwort', () => {
      const idx = ORAL_EXAM_POOL.findIndex((entry) => entry.blockId === 'fragen-218');
      const broken = [...ORAL_EXAM_POOL];
      broken[idx] = {
        ...broken[idx],
        main: {
          ...broken[idx].main,
          distractors: [
            'Nach § 859 BGB darf der Besitzer sich gegen verbotene Eigenmacht mit Gewalt wehren.',
            ...broken[idx].main.distractors.slice(0, 3),
          ],
        },
      };
      const issues = validatePoolQuality(ORAL_EXAM_QUESTIONS, broken);
      expect(issues.some((issue) => issue.kind === 'PARAGRAPH_IN_DISTRACTOR')).toBe(true);
    });

    it('bemängelt eine Stichwortantwort ohne Satzende', () => {
      const idx = ORAL_EXAM_POOL.findIndex((entry) => entry.blockId === 'fragen-218');
      const broken = [...ORAL_EXAM_POOL];
      broken[idx] = {
        ...broken[idx],
        main: {
          ...broken[idx].main,
          distractors: [
            'Mechanisch, elektronisch, organisatorisch',
            ...broken[idx].main.distractors.slice(0, 3),
          ],
        },
      };
      const issues = validatePoolQuality(ORAL_EXAM_QUESTIONS, broken);
      expect(issues.some((issue) => issue.kind === 'NOT_A_SENTENCE')).toBe(true);
    });

    it('prüft die tatsächlich verwendeten Fragen aller neun Themengebiete', () => {
      const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, first, 'test');
      expect(exam.questions.length).toBe(27);
      for (const question of exam.questions) {
        expect(question.options.length).toBe(ORAL_EXAM_OPTION_COUNT);
        expect(question.options.filter((option) => option.correct).length).toBe(1);
        for (const option of question.options) {
          expect(option.text.trim().length).toBeGreaterThanOrEqual(45);
          expect(/[.!?:]$/.test(option.text.trim())).toBe(true);
        }
      }
    });

    it('liefert die effektive Frageformulierung über questionText', () => {
      const entry = ORAL_EXAM_POOL[0];
      const block = ORAL_EXAM_QUESTIONS.find((q) => q.id === entry.blockId)!;
      expect(questionText(block, entry, 'HAUPTFRAGE')).toBe(
        entry.questionOverride ?? block.question,
      );
      expect(questionText(block, entry, 'FOLGEFRAGE_1')).toBe(
        entry.followUp1.question ?? block.followUp1,
      );
    });

    it('bemängelt eine Paragraphenangabe in der richtigen Antwort', () => {
      const idx = ORAL_EXAM_POOL.findIndex((entry) => entry.blockId === 'fragen-218');
      const broken = [...ORAL_EXAM_POOL];
      broken[idx] = {
        ...broken[idx],
        followUp1: {
          ...broken[idx].followUp1,
          answer: 'Nach § 859 BGB darf sich der Besitzer gegen verbotene Eigenmacht wehren.',
        },
      };
      const issues = validatePoolQuality(ORAL_EXAM_QUESTIONS, broken);
      expect(issues.some((issue) => issue.kind === 'PARAGRAPH_IN_CORRECT_ANSWER')).toBe(true);
    });

    it('bemängelt einen extremen Distraktor', () => {
      const idx = ORAL_EXAM_POOL.findIndex((entry) => entry.blockId === 'fragen-218');
      const broken = [...ORAL_EXAM_POOL];
      broken[idx] = {
        ...broken[idx],
        main: {
          ...broken[idx].main,
          distractors: [
            'Der Besitzdiener ist für die Ausübung der tatsächlichen Gewalt gar nicht verantwortlich.',
            ...broken[idx].main.distractors.slice(0, 3),
          ],
        },
      };
      const issues = validatePoolQuality(ORAL_EXAM_QUESTIONS, broken);
      expect(issues.some((issue) => issue.kind === 'EXTREME_DISTRACTOR')).toBe(true);
    });

    it('bemängelt einen Distraktor, der die richtige Antwort nur umkehrt', () => {
      const idx = ORAL_EXAM_POOL.findIndex((entry) => entry.blockId === 'fragen-218');
      const correct = brokenCorrectAnswer(ORAL_EXAM_POOL[idx]);
      const broken = [...ORAL_EXAM_POOL];
      broken[idx] = {
        ...broken[idx],
        main: {
          ...broken[idx].main,
          distractors: [
            `Es gilt gerade nicht: ${correct}`,
            ...broken[idx].main.distractors.slice(0, 3),
          ],
        },
      };
      const issues = validatePoolQuality(ORAL_EXAM_QUESTIONS, broken);
      expect(issues.some((issue) => issue.kind === 'MIRROR_DISTRACTOR')).toBe(true);
    });

    it('bemängelt zwei nahezu identische Antwortoptionen', () => {
      const idx = ORAL_EXAM_POOL.findIndex((entry) => entry.blockId === 'fragen-218');
      const correct = brokenCorrectAnswer(ORAL_EXAM_POOL[idx]);
      const broken = [...ORAL_EXAM_POOL];
      broken[idx] = {
        ...broken[idx],
        main: {
          ...broken[idx].main,
          distractors: [
            correct,
            ...broken[idx].main.distractors.slice(0, 3),
          ],
        },
      };
      const issues = validatePoolQuality(ORAL_EXAM_QUESTIONS, broken);
      expect(
        issues.some(
          (issue) => issue.kind === 'AMBIGUOUS_OPTIONS' || issue.kind === 'DUPLICATE_OPTION',
        ),
      ).toBe(true);
    });

    it('bemängelt ein fehlendes Themengebiet', () => {
      const idx = ORAL_EXAM_QUESTIONS.findIndex((q) => q.id === 'fragen-218');
      const broken = ORAL_EXAM_QUESTIONS.map((q, i) =>
        i === idx ? { ...q, categoryLabel: '' } : q,
      );
      const issues = validatePoolQuality(broken, ORAL_EXAM_POOL);
      expect(issues.some((issue) => issue.kind === 'MISSING_CATEGORY')).toBe(true);
    });

    it('bemängelt einen ungültigen Schwierigkeitsgrad', () => {
      const idx = ORAL_EXAM_POOL.findIndex((entry) => entry.blockId === 'fragen-218');
      const broken = [...ORAL_EXAM_POOL];
      broken[idx] = { ...broken[idx], mainDifficulty: 9 };
      const issues = validatePoolQuality(ORAL_EXAM_QUESTIONS, broken);
      expect(issues.some((issue) => issue.kind === 'INVALID_DIFFICULTY')).toBe(true);
    });

    it('bemängelt ein Akronym, das nur in der richtigen Antwort steht', () => {
      const idx = ORAL_EXAM_POOL.findIndex((entry) => entry.blockId === 'fragen-218');
      const broken = [...ORAL_EXAM_POOL];
      broken[idx] = {
        ...broken[idx],
        followUp1: {
          ...broken[idx].followUp1,
          answer: 'Der Besitzdiener ist nach der DGUV für die tatsächliche Gewalt verantwortlich.',
        },
      };
      const issues = validatePoolQuality(ORAL_EXAM_QUESTIONS, broken);
      expect(issues.some((issue) => issue.kind === 'ACRONYM_LEAK')).toBe(true);
    });

    it('vergibt jeder Frage eine gültige Schwierigkeit zwischen 1 und 5', () => {
      const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, first, 'test');
      for (const question of exam.questions) {
        expect(Number.isInteger(question.difficulty)).toBe(true);
        expect(question.difficulty).toBeGreaterThanOrEqual(1);
        expect(question.difficulty).toBeLessThanOrEqual(5);
      }
    });

    it('liefert die Schwierigkeit über questionDifficulty, mit Override', () => {
      const entry = ORAL_EXAM_POOL.find((e) => e.blockId === 'fragen-029')!;
      const block = ORAL_EXAM_QUESTIONS.find((q) => q.id === 'fragen-029')!;
      expect(questionDifficulty(block, entry, 'HAUPTFRAGE')).toBe(4);
      expect(questionDifficulty(block, entry, 'FOLGEFRAGE_1')).toBe(block.difficulty);
    });

    it('führt die Rechtsgrundlage getrennt von den Antwortoptionen', () => {
      const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, first, 'test');
      for (const question of exam.questions) {
        for (const option of question.options) {
          expect(NORM_PATTERN.test(option.text)).toBe(false);
        }
      }
    });
  });
});
