import {
  ExamAnswerOption,
  ExamEvaluation,
  ExamQuestion,
  ExamQuestionEvaluation,
  ExamQuestionRole,
  ExamResponse,
  ExamTopic,
  ExamTopicEvaluation,
  OralExam,
  OralExamPoolBlock,
  OralExamQuestionBlock,
  ORAL_EXAM_CATEGORIES,
} from '../models';

/** Zufallsfunktion, standardmäßig `Math.random` (in Tests ersetzbar). */
export type RandomFn = () => number;

/** Bestehensgrenze in Prozent. */
export const ORAL_EXAM_PASS_PERCENT = 50;

/** Anzahl Antwortmöglichkeiten je Frage. */
export const ORAL_EXAM_OPTION_COUNT = 5;

function shuffle<T>(items: readonly T[], random: RandomFn): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Baut die Antwortmöglichkeiten einer Frage.
 *
 * Die richtige Antwort wird bewusst nicht immer an derselben Position
 * platziert: `correctIndex` wird über den gesamten Durchlauf rotiert, sodass
 * sich die Positionen gleichmäßig verteilen.
 */
function buildOptions(
  questionId: string,
  correctAnswer: string,
  distractors: readonly string[],
  correctIndex: number,
  random: RandomFn,
): ExamAnswerOption[] {
  const wrong = shuffle(distractors, random);
  const options: ExamAnswerOption[] = [];
  let wrongIndex = 0;
  for (let i = 0; i < ORAL_EXAM_OPTION_COUNT; i++) {
    if (i === correctIndex) {
      options.push({ id: `${questionId}-o${i}`, text: correctAnswer, correct: true });
    } else {
      options.push({ id: `${questionId}-o${i}`, text: wrong[wrongIndex++], correct: false });
    }
  }
  return options;
}

interface QuestionInput {
  block: OralExamQuestionBlock;
  role: ExamQuestionRole;
  position: number;
  correctIndex: number;
  question: string;
  correctAnswer: string;
  distractors: readonly string[];
  source: ExamQuestion['source'];
  verificationStatus: ExamQuestion['verificationStatus'];
  explanation?: string;
}

function makeQuestion(input: QuestionInput, random: RandomFn): ExamQuestion {
  const suffix = input.role === 'HAUPTFRAGE' ? 'h' : input.role === 'FOLGEFRAGE_1' ? 'f1' : 'f2';
  const id = `${input.block.id}-${suffix}`;
  return {
    id,
    blockId: input.block.id,
    category: input.block.category,
    categoryLabel: input.block.categoryLabel,
    role: input.role,
    position: input.position,
    question: input.question,
    correctAnswer: input.correctAnswer,
    options: buildOptions(id, input.correctAnswer, input.distractors, input.correctIndex, random),
    source: input.source,
    verificationStatus: input.verificationStatus,
    explanation: input.explanation,
    legalReference: input.block.legalReference,
  };
}

/** Wirft einen Fehler, wenn der Pool nicht alle Themengebiete abdeckt. */
export function validatePool(
  questions: readonly OralExamQuestionBlock[],
  pool: readonly OralExamPoolBlock[],
): void {
  const byId = new Map(questions.map((q) => [q.id, q]));
  for (const entry of pool) {
    const block = byId.get(entry.blockId);
    if (!block) {
      throw new Error(`Prüfungspool verweist auf unbekannten Block: ${entry.blockId}`);
    }
    if (entry.main.distractors.length !== ORAL_EXAM_OPTION_COUNT - 1) {
      throw new Error(`Hauptfrage ${entry.blockId} braucht 4 Distraktoren.`);
    }
    for (const [name, followUp] of [
      ['Folgefrage 1', entry.followUp1],
      ['Folgefrage 2', entry.followUp2],
    ] as const) {
      if (followUp.distractors.length !== ORAL_EXAM_OPTION_COUNT - 1) {
        throw new Error(`${name} von ${entry.blockId} braucht 4 Distraktoren.`);
      }
    }
  }
  for (const category of ORAL_EXAM_CATEGORIES) {
    const available = pool.filter((p) => byId.get(p.blockId)?.category === category);
    if (available.length === 0) {
      throw new Error(`Kein Prüfungsblock für Themengebiet ${category}.`);
    }
  }
}

/**
 * Wählt je Themengebiet genau einen Fragenblock zufällig aus und baut daraus
 * einen vollständigen Durchlauf (9 Themengebiete × 3 Fragen = 27 Fragen).
 */
export function buildExam(
  questions: readonly OralExamQuestionBlock[],
  pool: readonly OralExamPoolBlock[],
  random: RandomFn = Math.random,
  examId = `exam-${Date.now()}`,
): OralExam {
  validatePool(questions, pool);
  const byId = new Map(questions.map((q) => [q.id, q]));
  const topics: ExamTopic[] = [];
  let position = 0;
  const startOffset = Math.floor(random() * ORAL_EXAM_OPTION_COUNT);

  for (const category of ORAL_EXAM_CATEGORIES) {
    const candidates = pool.filter((p) => byId.get(p.blockId)?.category === category);
    const chosen = candidates[Math.floor(random() * candidates.length)];
    const block = byId.get(chosen.blockId)!;

    const topicQuestions: ExamQuestion[] = [
      makeQuestion(
        {
          block,
          role: 'HAUPTFRAGE',
          position: ++position,
          correctIndex: (startOffset + position) % ORAL_EXAM_OPTION_COUNT,
          question: block.question,
          correctAnswer: block.correctAnswer,
          distractors: chosen.main.distractors,
          source: 'QUESTIONS_TXT',
          verificationStatus: 'VERIFIED_QUESTIONS_TXT',
        },
        random,
      ),
      makeQuestion(
        {
          block,
          role: 'FOLGEFRAGE_1',
          position: ++position,
          correctIndex: (startOffset + position) % ORAL_EXAM_OPTION_COUNT,
          question: block.followUp1,
          correctAnswer: chosen.followUp1.answer,
          distractors: chosen.followUp1.distractors,
          source: chosen.followUp1.source,
          verificationStatus: chosen.followUp1.verificationStatus,
          explanation: chosen.followUp1.explanation,
        },
        random,
      ),
      makeQuestion(
        {
          block,
          role: 'FOLGEFRAGE_2',
          position: ++position,
          correctIndex: (startOffset + position) % ORAL_EXAM_OPTION_COUNT,
          question: block.followUp2,
          correctAnswer: chosen.followUp2.answer,
          distractors: chosen.followUp2.distractors,
          source: chosen.followUp2.source,
          verificationStatus: chosen.followUp2.verificationStatus,
          explanation: chosen.followUp2.explanation,
        },
        random,
      ),
    ];

    topics.push({
      category,
      categoryLabel: block.categoryLabel,
      blockId: block.id,
      cluster: block.cluster,
      difficulty: block.difficulty,
      questions: topicQuestions,
    });
  }

  return {
    id: examId,
    topics,
    questions: topics.flatMap((topic) => topic.questions),
  };
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

/** Wertet einen Durchlauf anhand der Antworten des Teilnehmers aus. */
export function evaluateExam(exam: OralExam, responses: readonly ExamResponse[]): ExamEvaluation {
  const selectedByQuestion = new Map(responses.map((r) => [r.questionId, r.selectedOptionId]));

  const topics: ExamTopicEvaluation[] = exam.topics.map((topic) => {
    const questionEvaluations: ExamQuestionEvaluation[] = topic.questions.map((question) => {
      const selectedOptionId = selectedByQuestion.get(question.id);
      const selected = question.options.find((option) => option.id === selectedOptionId);
      return {
        question,
        selectedOptionId,
        selectedText: selected?.text,
        correct: selected?.correct === true,
      };
    });
    const correctCount = questionEvaluations.filter((entry) => entry.correct).length;
    return {
      category: topic.category,
      categoryLabel: topic.categoryLabel,
      blockId: topic.blockId,
      correctCount,
      total: topic.questions.length,
      percent: round1((correctCount / topic.questions.length) * 100),
      questions: questionEvaluations,
    };
  });

  const total = exam.questions.length;
  const correctCount = topics.reduce((sum, topic) => sum + topic.correctCount, 0);
  const percent = round1((correctCount / total) * 100);

  return {
    examId: exam.id,
    correctCount,
    total,
    percent,
    passed: percent >= ORAL_EXAM_PASS_PERCENT,
    thresholdPercent: ORAL_EXAM_PASS_PERCENT,
    requiredPoints: Math.ceil((total * ORAL_EXAM_PASS_PERCENT) / 100),
    topics,
  };
}
