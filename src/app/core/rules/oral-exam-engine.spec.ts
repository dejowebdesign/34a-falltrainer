import {
  ORAL_EXAM_OPTION_COUNT,
  ORAL_EXAM_PASS_PERCENT,
  buildExam,
  evaluateExam,
  examRemainingSeconds,
  finishExamSession,
  isExamExpired,
  questionDifficulty,
  questionText,
  validatePool,
  validatePoolQuality,
} from './oral-exam-engine';
import { ORAL_EXAM_POOL } from '../data/oral-exam-authored.data';
import { ORAL_EXAM_QUESTIONS } from '../data/oral-exam-questions.data';
import {
  ExamResponse,
  OralExam,
  OralExamPoolBlock,
  OralExamSession,
  ORAL_EXAM_DURATION_SECONDS,
  formatExamClock,
  oralExamTimerLevel,
} from '../models';

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

    it('bemängelt einen Fachbegriff, der nur in der richtigen Antwort steht', () => {
      const idx = ORAL_EXAM_POOL.findIndex((entry) => entry.blockId === 'fragen-218');
      const broken = [...ORAL_EXAM_POOL];
      broken[idx] = {
        ...broken[idx],
        questionOverride: 'Welche Aussage zur Besitzdienerstellung trifft zu?',
        answerOverride:
          'Der Besitzdienerstellung liegt die tatsächliche Gewalt für einen anderen zugrunde.',
        main: {
          ...broken[idx].main,
          distractors: [
            'Die tatsächliche Gewalt wird dabei im eigenen Namen und für sich selbst ausgeübt.',
            'Die tatsächliche Gewalt wird dabei aufgrund eines dinglichen Rechts ausgeübt.',
            'Die tatsächliche Gewalt wird dabei nur vorübergehend und ohne Weisung ausgeübt.',
            'Die tatsächliche Gewalt wird dabei ausschließlich durch den Eigentümer selbst ausgeübt.',
          ],
        },
      };
      const issues = validatePoolQuality(ORAL_EXAM_QUESTIONS, broken);
      expect(issues.some((issue) => issue.kind === 'KEYWORD_LEAK')).toBe(true);
    });

    it('bemängelt eine Normangabe in der Antwort ohne Norm in der Frage', () => {
      const idx = ORAL_EXAM_POOL.findIndex((entry) => entry.blockId === 'fragen-218');
      const broken = [...ORAL_EXAM_POOL];
      broken[idx] = {
        ...broken[idx],
        mainDifficulty: undefined,
        followUp1: {
          ...broken[idx].followUp1,
          question: 'Welche Aussage trifft auf die Selbsthilfe des Besitzers zu?',
          answer:
            'Nach § 859 BGB darf sich der Besitzer verbotener Eigenmacht mit Gewalt erwehren.',
        },
      };
      const issues = validatePoolQuality(ORAL_EXAM_QUESTIONS, broken);
      expect(issues.some((issue) => issue.kind === 'NORM_MISSING_IN_QUESTION')).toBe(true);
    });

    it('bemängelt die veraltete sichtbare Bezeichnung „Technik“', () => {
      const idx = ORAL_EXAM_QUESTIONS.findIndex((q) => q.id === 'fragen-218');
      const broken = ORAL_EXAM_QUESTIONS.map((q, i) =>
        i === idx ? { ...q, categoryLabel: 'Technik' } : q,
      );
      const issues = validatePoolQuality(broken, ORAL_EXAM_POOL);
      expect(issues.some((issue) => issue.kind === 'LEGACY_CATEGORY_LABEL')).toBe(true);
    });

    it('bemängelt einen Block, dessen drei Fragen dieselbe Schwierigkeit tragen', () => {
      const idx = ORAL_EXAM_POOL.findIndex((entry) => entry.blockId === 'fragen-218');
      const broken = [...ORAL_EXAM_POOL];
      broken[idx] = {
        ...broken[idx],
        mainDifficulty: 3,
        followUp1: { ...broken[idx].followUp1, difficulty: 3 },
        followUp2: { ...broken[idx].followUp2, difficulty: 3 },
      };
      const issues = validatePoolQuality(ORAL_EXAM_QUESTIONS, broken);
      expect(issues.some((issue) => issue.kind === 'DIFFICULTY_VARIETY')).toBe(true);
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
      expect(questionDifficulty(block, entry, 'HAUPTFRAGE')).toBe(3);
      expect(questionDifficulty(block, entry, 'FOLGEFRAGE_1')).toBe(3);
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

  describe('Randomisierung', () => {
    const seeded = (seed: number): (() => number) => {
      let state = seed >>> 0;
      return () => {
        state = (state * 1664525 + 1013904223) >>> 0;
        return (state >>> 8) / 0x1000000;
      };
    };

    function run(seed: number): OralExam {
      return buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, seeded(seed), `run-${seed}`);
    }

    it('erzeugt über zehn Durchläufe unterschiedliche Schwierigkeitsfolgen', () => {
      const sequences = new Set<string>();
      const blockSequences = new Set<string>();
      for (let seed = 1; seed <= 10; seed++) {
        const exam = run(seed);
        sequences.add(exam.questions.map((q) => q.difficulty).join(''));
        blockSequences.add(exam.topics.map((t) => t.blockId).join(','));
      }
      expect(sequences.size).toBeGreaterThan(1);
      expect(blockSequences.size).toBeGreaterThan(1);
    });

    it('mischt die Schwierigkeit innerhalb der Themengebiete', () => {
      let mixed = 0;
      let total = 0;
      for (let seed = 1; seed <= 10; seed++) {
        for (const topic of run(seed).topics) {
          total++;
          if (new Set(topic.questions.map((q) => q.difficulty)).size > 1) {
            mixed++;
          }
        }
      }
      // Deutliche Mehrheit der 90 Themengebiete soll gemischte Stufen zeigen.
      expect(mixed).toBeGreaterThan(total / 2);
    });

    it('beschriftet jede Frage mit ihrer tatsächlichen Schwierigkeit', () => {
      const blocks = new Map(ORAL_EXAM_QUESTIONS.map((q) => [q.id, q]));
      const entries = new Map(ORAL_EXAM_POOL.map((e) => [e.blockId, e]));
      for (let seed = 1; seed <= 10; seed++) {
        const exam = run(seed);
        for (const question of exam.questions) {
          const block = blocks.get(question.blockId)!;
          const entry = entries.get(question.blockId)!;
          expect(question.difficulty).toBe(questionDifficulty(block, entry, question.role));
          expect(question.difficulty).toBeGreaterThanOrEqual(1);
          expect(question.difficulty).toBeLessThanOrEqual(5);
        }
      }
    });

  });

  describe('Prüfungstimer', () => {
    const T0 = 1_700_000_000_000;
    const exam = buildExam(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL, first, 'timer-exam');

    function sessionAt(now: number): OralExamSession {
      return { exam, responses: [], startedAt: T0 };
    }

    it('formatiert MM:SS ohne Dezimalstellen und nie negativ', () => {
      expect(formatExamClock(900)).toBe('15:00');
      expect(formatExamClock(899)).toBe('14:59');
      expect(formatExamClock(3)).toBe('00:03');
      expect(formatExamClock(0)).toBe('00:00');
      expect(formatExamClock(-5)).toBe('00:00');
      expect(formatExamClock(61.9)).toBe('01:01');
    });

    it('startet bei 15:00 und zählt sekündlich herunter', () => {
      expect(examRemainingSeconds(sessionAt(T0), T0)).toBe(ORAL_EXAM_DURATION_SECONDS);
      expect(examRemainingSeconds(sessionAt(T0), T0 + 1000)).toBe(899);
      expect(examRemainingSeconds(sessionAt(T0), T0 + 60_000)).toBe(840);
      expect(examRemainingSeconds(sessionAt(T0), T0 + 61_000)).toBe(839);
    });

    it('berechnet die Restzeit aus dem Startzeitpunkt, nicht aus einem Zähler', () => {
      // Ein Sprung (z. B. Navigation oder Refresh) ändert nichts am Startzeitpunkt.
      const before = examRemainingSeconds(sessionAt(T0), T0 + 120_000);
      const after = examRemainingSeconds(sessionAt(T0), T0 + 120_000);
      expect(before).toBe(after);
      expect(before).toBe(780);
    });

    it('meldet Ablauf erst nach 15 Minuten', () => {
      expect(isExamExpired(sessionAt(T0), T0 + 899_000)).toBe(false);
      expect(isExamExpired(sessionAt(T0), T0 + 900_000)).toBe(true);
      expect(isExamExpired(sessionAt(T0), T0 + 901_000)).toBe(true);
    });

    it('setzt das Ende bei Zeitablauf exakt auf den Ablaufzeitpunkt', () => {
      const finished = finishExamSession(sessionAt(T0), T0 + 950_000, true);
      expect(finished.timedOut).toBe(true);
      expect(finished.finishedAt).toBe(T0 + ORAL_EXAM_DURATION_SECONDS * 1000);
      expect(examRemainingSeconds(finished, T0 + 950_000)).toBe(0);
    });

    it('behält bei regulärem Ende den tatsächlichen Endzeitpunkt', () => {
      const finished = finishExamSession(sessionAt(T0), T0 + 761_000, false);
      expect(finished.timedOut).toBe(false);
      expect(finished.finishedAt).toBe(T0 + 761_000);
      expect(examRemainingSeconds(finished, T0 + 761_000)).toBe(139);
    });

    it('stuft die Warnstufen korrekt ein', () => {
      expect(oralExamTimerLevel(900)).toBe('normal');
      expect(oralExamTimerLevel(121)).toBe('normal');
      expect(oralExamTimerLevel(120)).toBe('warning');
      expect(oralExamTimerLevel(61)).toBe('warning');
      expect(oralExamTimerLevel(60)).toBe('critical');
      expect(oralExamTimerLevel(31)).toBe('critical');
      expect(oralExamTimerLevel(30)).toBe('danger');
      expect(oralExamTimerLevel(1)).toBe('danger');
      expect(oralExamTimerLevel(0)).toBe('expired');
    });

    it('wertet unbeantwortete Fragen als falsch und zählt sie', () => {
      const responses: ExamResponse[] = exam.questions.slice(0, 20).map((question) => ({
        questionId: question.id,
        selectedOptionId: question.options.find((option) => option.correct)!.id,
      }));
      const session: OralExamSession = {
        exam,
        responses,
        startedAt: T0,
        finishedAt: T0 + ORAL_EXAM_DURATION_SECONDS * 1000,
        timedOut: true,
      };
      const result = evaluateExam(exam, responses, session);
      expect(result.correctCount).toBe(20);
      expect(result.unansweredCount).toBe(7);
      expect(result.timedOut).toBe(true);
      expect(result.durationSeconds).toBe(ORAL_EXAM_DURATION_SECONDS);
      expect(result.elapsedSeconds).toBe(ORAL_EXAM_DURATION_SECONDS);
      const unanswered = result.topics
        .flatMap((topic) => topic.questions)
        .filter((entry) => !entry.answered);
      expect(unanswered.length).toBe(7);
      expect(unanswered.every((entry) => !entry.correct)).toBe(true);
    });

    it('behält die Antworten beantworteter Fragen und meldet die Bearbeitungszeit', () => {
      const responses: ExamResponse[] = exam.questions.map((question) => ({
        questionId: question.id,
        selectedOptionId: question.options.find((option) => option.correct)!.id,
      }));
      const session: OralExamSession = {
        exam,
        responses,
        startedAt: T0,
        finishedAt: T0 + 761_000,
        timedOut: false,
      };
      const result = evaluateExam(exam, responses, session);
      expect(result.correctCount).toBe(27);
      expect(result.unansweredCount).toBe(0);
      expect(result.timedOut).toBe(false);
      expect(result.elapsedSeconds).toBe(761);
      expect(result.topics.flatMap((t) => t.questions).every((entry) => entry.answered)).toBe(true);
    });

    it('begrenzt die Bearbeitungszeit auf höchstens die Prüfungsdauer', () => {
      const session: OralExamSession = {
        exam,
        responses: [],
        startedAt: T0,
        finishedAt: T0 + 5_000_000,
        timedOut: false,
      };
      const result = evaluateExam(exam, [], session);
      expect(result.elapsedSeconds).toBe(ORAL_EXAM_DURATION_SECONDS);
    });

    it('wertet ohne Sitzung ohne Zeitbezug aus', () => {
      const result = evaluateExam(exam, []);
      expect(result.timedOut).toBe(false);
      expect(result.elapsedSeconds).toBe(0);
      expect(result.unansweredCount).toBe(27);
    });
  });
});
