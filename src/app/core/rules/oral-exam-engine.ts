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
  difficulty: number;
  question: string;
  correctAnswer: string;
  distractors: readonly string[];
  source: ExamQuestion['source'];
  verificationStatus: ExamQuestion['verificationStatus'];
  explanation?: string;
  legalBasis?: string;
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
    difficulty: input.difficulty,
    question: input.question,
    correctAnswer: input.correctAnswer,
    legalBasis: input.legalBasis,
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

/** Auffälligkeit einer Antwort einer einzelnen Prüfungsfrage. */
export interface ExamPoolQualityIssue {
  blockId: string;
  role: 'HAUPTFRAGE' | 'FOLGEFRAGE_1' | 'FOLGEFRAGE_2';
  kind:
    | 'OPTION_COUNT'
    | 'SHORT_OPTION'
    | 'NOT_A_SENTENCE'
    | 'PARAGRAPH_IN_DISTRACTOR'
    | 'PARAGRAPH_IN_CORRECT_ANSWER'
    | 'ABSOLUTE_DISTRACTOR'
    | 'EXTREME_DISTRACTOR'
    | 'MIRROR_DISTRACTOR'
    | 'REDUNDANT_OPTIONS'
    | 'AMBIGUOUS_OPTIONS'
    | 'ACRONYM_LEAK'
    | 'MISSING_QUESTION'
    | 'MISSING_CATEGORY'
    | 'MISSING_DIFFICULTY'
    | 'INVALID_DIFFICULTY'
    | 'LENGTH_IMBALANCE'
    | 'LENGTH_LEAK'
    | 'DUPLICATE_OPTION';
  detail: string;
}

/**
 * Absolute Formulierungen, die einen Distraktor zu leicht erkennbar machen.
 * Es werden nur falsche Antworten geprüft; in der richtigen Antwort kann eine
 * solche Formulierung fachlich korrekt sein.
 */
const ABSOLUTE_PATTERNS: readonly RegExp[] = [
  /\bniemals\b/i,
  /\bimmer\b/i,
  /\bstets\b/i,
  /\bunbegrenzt\b/i,
  /\bkeinerlei\b/i,
  /\bausschließlich\b/i,
  /ohne jede/i,
  /grundsätzlich immer/i,
  /unter keinen umständen/i,
  /in jedem fall/i,
  /zu keinem zeitpunkt/i,
];

/**
 * Offensichtlich extreme Aussagen, die einen Distraktor als unrealistisch
 * entlarven (z. B. vollständige Ausnahmslosigkeit ohne Sachbezug).
 */
const EXTREME_PATTERNS: readonly RegExp[] = [
  /\büberhaupt nicht\b/i,
  /\bgar nicht\b/i,
  /\bjede beliebige\b/i,
  /\bunter allen umständen\b/i,
  /\bvollständig ausgeschlossen\b/i,
  /\bzu keinem zeitpunkt\b/i,
  /\bohne jede(n|r|s)? (grund|anlass|prüfung|einschränkung)\b/i,
];

/** Negationswörter, mit denen eine Aussage in ihr Gegenteil verkehrt wird. */
const NEGATION_PATTERNS: readonly RegExp[] = [
  /\bnicht\b/i,
  /\bnie(mals)?\b/i,
  /\bkein(e|en|er|es)?\b/i,
  /\bohne\b/i,
  /\bniemand\b/i,
];

const NORM_PATTERN = /§\s*\d|Art\.\s*\d/;

/**
 * Akronyme, die in einer Antwort stehen dürfen. Sie sind Teil des
 * Fachvokabulars; geprüft wird nur, ob die richtige Antwort ein Akronym
 * enthält, das in keiner falschen Antwort vorkommt (dann verrät die
 * Abkürzung allein die Lösung).
 */
const KNOWN_ACRONYMS: readonly RegExp[] = [
  /\bDSGVO\b/,
  /\bBDSG\b/,
  /\bDGUV\b/,
  /\bIHK\b/,
  /\bUVV\b/,
  /\bGewO\b/,
  /\bBewachV\b/,
  /\bStGB\b/,
  /\bStPO\b/,
  /\bBGB\b/,
  /\bEMA\b/,
  /\bBMA\b/,
  /\bGMA\b/,
  /\bMEO\b/,
  /\bKfz\b/,
];

function acronymsIn(text: string): string[] {
  const found: string[] = [];
  for (const pattern of KNOWN_ACRONYMS) {
    const match = pattern.exec(text);
    if (match) {
      found.push(match[0].toUpperCase());
    }
  }
  return found;
}

/** Mindestlänge einer Antwort in Zeichen (vollständiger Satz statt Stichwort). */
const MIN_OPTION_CHARS = 45;

/** Zulässige Streubreite zwischen kürzester und längster Option (Faktor). */
const MAX_LENGTH_RATIO = 1.85;

/** Maximale Länge der richtigen Antwort im Verhältnis zur längsten falschen. */
const MAX_CORRECT_LENGTH_RATIO = 1.35;

/** Ab dieser Wortüberschneidung gelten zwei Optionen als redundant. */
const REDUNDANCY_THRESHOLD = 0.75;

/** Ab dieser Wortüberschneidung sind zwei Optionen praktisch deckungsgleich. */
const AMBIGUITY_THRESHOLD = 0.9;

/** Ab dieser Wortüberschneidung wird eine spiegelbildliche Umkehrung geprüft. */
const MIRROR_THRESHOLD = 0.5;

const STOPWORDS = new Set([
  'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einer', 'eines',
  'einem', 'einen', 'und', 'oder', 'ist', 'sind', 'wird', 'werden', 'als',
  'aus', 'bei', 'mit', 'von', 'zum', 'zur', 'für', 'auf', 'im', 'in', 'es',
  'sich', 'nicht', 'nur', 'auch', 'kann', 'darf', 'muss', 'nach', 'vor',
  'dass', 'man', 'wer', 'wie', 'was', 'sie', 'er', 'ihr', 'ihre', 'ihren',
]);

function tokens(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-zäöüß0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((word) => word.length >= 3 && !STOPWORDS.has(word)),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) {
    return 0;
  }
  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) {
      intersection++;
    }
  }
  return intersection / (a.size + b.size - intersection);
}

function hasNegation(text: string): boolean {
  return NEGATION_PATTERNS.some((pattern) => pattern.test(text));
}

function optionTexts(
  block: OralExamQuestionBlock,
  entry: OralExamPoolBlock,
  role: 'HAUPTFRAGE' | 'FOLGEFRAGE_1' | 'FOLGEFRAGE_2',
): { correct: string; distractors: readonly string[] } {
  if (role === 'HAUPTFRAGE') {
    return {
      correct: entry.answerOverride ?? block.correctAnswer,
      distractors: entry.main.distractors,
    };
  }
  const followUp = role === 'FOLGEFRAGE_1' ? entry.followUp1 : entry.followUp2;
  return { correct: followUp.answer, distractors: followUp.distractors };
}

/** Liefert die tatsächliche Frageformulierung (Override oder Fragenbank). */
export function questionText(
  block: OralExamQuestionBlock,
  entry: OralExamPoolBlock,
  role: 'HAUPTFRAGE' | 'FOLGEFRAGE_1' | 'FOLGEFRAGE_2',
): string {
  if (role === 'HAUPTFRAGE') {
    return entry.questionOverride ?? block.question;
  }
  const followUp = role === 'FOLGEFRAGE_1' ? entry.followUp1 : entry.followUp2;
  return followUp.question ?? (role === 'FOLGEFRAGE_1' ? block.followUp1 : block.followUp2);
}

/** Ermittelt die tatsächliche Schwierigkeit (1–5) einer Frage. */
export function questionDifficulty(
  block: OralExamQuestionBlock,
  entry: OralExamPoolBlock,
  role: 'HAUPTFRAGE' | 'FOLGEFRAGE_1' | 'FOLGEFRAGE_2',
): number {
  if (role === 'HAUPTFRAGE') {
    return entry.mainDifficulty ?? block.difficulty;
  }
  const followUp = role === 'FOLGEFRAGE_1' ? entry.followUp1 : entry.followUp2;
  return followUp.difficulty ?? block.difficulty;
}

/** Ermittelt die einschlägige Rechtsgrundlage, die erst nach der Auflösung erscheint. */
export function questionLegalBasis(
  block: OralExamQuestionBlock,
  entry: OralExamPoolBlock,
  role: 'HAUPTFRAGE' | 'FOLGEFRAGE_1' | 'FOLGEFRAGE_2',
): string | undefined {
  if (role === 'HAUPTFRAGE') {
    return entry.mainLegalBasis;
  }
  const followUp = role === 'FOLGEFRAGE_1' ? entry.followUp1 : entry.followUp2;
  return followUp.legalBasis;
}

/**
 * Prüft die fachlich-didaktische Qualität aller Antwortoptionen des Pools.
 *
 * Rein strukturelle und formale Kriterien: genau fünf Optionen, genau eine
 * richtige, jede Option ein vollständiger Satz, keine Paragraphen in falschen
 * Antworten, keine absoluten Distraktoren und ausgewogene Längen. Die Funktion
 * prüft bewusst nicht die inhaltliche Richtigkeit – diese bleibt fachliche
 * Verantwortung der Datenquelle.
 */
export function validatePoolQuality(
  questions: readonly OralExamQuestionBlock[],
  pool: readonly OralExamPoolBlock[],
): ExamPoolQualityIssue[] {
  const byId = new Map(questions.map((q) => [q.id, q]));
  const issues: ExamPoolQualityIssue[] = [];
  const push = (issue: ExamPoolQualityIssue) => issues.push(issue);

  const roles = ['HAUPTFRAGE', 'FOLGEFRAGE_1', 'FOLGEFRAGE_2'] as const;

  for (const entry of pool) {
    const block = byId.get(entry.blockId);
    if (!block) {
      continue;
    }
    if (!block.category || !block.categoryLabel) {
      push({
        blockId: entry.blockId,
        role: 'HAUPTFRAGE',
        kind: 'MISSING_CATEGORY',
        detail: 'Themengebiet fehlt oder ist leer.',
      });
    }
    for (const role of roles) {
      const { correct, distractors } = optionTexts(block, entry, role);
      const all = [correct, ...distractors];

      const effectiveQuestion = questionText(block, entry, role);
      if (!effectiveQuestion || !effectiveQuestion.trim()) {
        push({ blockId: entry.blockId, role, kind: 'MISSING_QUESTION', detail: 'Fragetext fehlt.' });
      }
      const difficulty = questionDifficulty(block, entry, role);
      if (difficulty === undefined || difficulty === null || Number.isNaN(difficulty)) {
        push({
          blockId: entry.blockId,
          role,
          kind: 'MISSING_DIFFICULTY',
          detail: 'Schwierigkeitsgrad fehlt.',
        });
      } else if (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > 5) {
        push({
          blockId: entry.blockId,
          role,
          kind: 'INVALID_DIFFICULTY',
          detail: `Schwierigkeitsgrad ${difficulty} liegt außerhalb 1–5.`,
        });
      }

      if (all.length !== ORAL_EXAM_OPTION_COUNT) {
        push({
          blockId: entry.blockId,
          role,
          kind: 'OPTION_COUNT',
          detail: `${all.length} statt ${ORAL_EXAM_OPTION_COUNT} Optionen.`,
        });
      }
      const unique = new Set(all.map((t) => t.trim().toLowerCase()));
      if (unique.size !== all.length) {
        push({
          blockId: entry.blockId,
          role,
          kind: 'DUPLICATE_OPTION',
          detail: 'Mindestens zwei Optionen sind identisch.',
        });
      }
      for (const option of all) {
        const text = option.trim();
        if (text.length < MIN_OPTION_CHARS) {
          push({
            blockId: entry.blockId,
            role,
            kind: 'SHORT_OPTION',
            detail: `Zu kurz (${text.length} Zeichen): "${text}"`,
          });
        }
        if (!/[.!?:]$/.test(text)) {
          push({
            blockId: entry.blockId,
            role,
            kind: 'NOT_A_SENTENCE',
            detail: `Kein vollständiger Satz: "${text}"`,
          });
        }
      }
      for (const distractor of distractors) {
        if (NORM_PATTERN.test(distractor)) {
          push({
            blockId: entry.blockId,
            role,
            kind: 'PARAGRAPH_IN_DISTRACTOR',
            detail: distractor,
          });
        }
        const lower = distractor.toLowerCase();
        for (const pattern of ABSOLUTE_PATTERNS) {
          if (pattern.test(lower)) {
            push({
              blockId: entry.blockId,
              role,
              kind: 'ABSOLUTE_DISTRACTOR',
              detail: `"${pattern.source}" in: ${distractor}`,
            });
          }
        }
        for (const pattern of EXTREME_PATTERNS) {
          if (pattern.test(lower)) {
            push({
              blockId: entry.blockId,
              role,
              kind: 'EXTREME_DISTRACTOR',
              detail: `"${pattern.source}" in: ${distractor}`,
            });
          }
        }
      }
      // Paragraphen dürfen auch in der richtigen Antwort nicht mehr als
      // Lösungshinweis unter den Optionen stehen; sie werden getrennt geführt.
      if (NORM_PATTERN.test(correct)) {
        push({
          blockId: entry.blockId,
          role,
          kind: 'PARAGRAPH_IN_CORRECT_ANSWER',
          detail: correct,
        });
      }
      // Spiegelbildliche Umkehrung der richtigen Antwort erkennen.
      const correctTokens = tokens(correct);
      const correctNegated = hasNegation(correct);
      const correctAcronyms = acronymsIn(correct);
      const distractorAcronyms = new Set(distractors.flatMap((t) => acronymsIn(t)));
      for (const acronym of correctAcronyms) {
        if (!distractorAcronyms.has(acronym)) {
          push({
            blockId: entry.blockId,
            role,
            kind: 'ACRONYM_LEAK',
            detail: `Akronym "${acronym}" steht nur in der richtigen Antwort.`,
          });
        }
      }
      for (const distractor of distractors) {
        if (jaccard(correctTokens, tokens(distractor)) >= MIRROR_THRESHOLD) {
          if (correctNegated !== hasNegation(distractor)) {
            push({
              blockId: entry.blockId,
              role,
              kind: 'MIRROR_DISTRACTOR',
              detail: `Umkehrung der richtigen Antwort: ${distractor}`,
            });
          }
        }
      }
      // Redundanz und echte Ambiguität zwischen zwei Optionen.
      for (let i = 0; i < all.length; i++) {
        for (let j = i + 1; j < all.length; j++) {
          const similarity = jaccard(tokens(all[i]), tokens(all[j]));
          if (similarity >= AMBIGUITY_THRESHOLD) {
            push({
              blockId: entry.blockId,
              role,
              kind: 'AMBIGUOUS_OPTIONS',
              detail: `Optionen ${i + 1} und ${j + 1} sind mit ${(similarity * 100).toFixed(0)} % nahezu identisch.`,
            });
          } else if (similarity >= REDUNDANCY_THRESHOLD) {
            push({
              blockId: entry.blockId,
              role,
              kind: 'REDUNDANT_OPTIONS',
              detail: `Optionen ${i + 1} und ${j + 1} sind mit ${(similarity * 100).toFixed(0)} % redundant.`,
            });
          }
        }
      }
      const lengths = all.map((t) => t.trim().length);
      const shortest = Math.min(...lengths);
      const longest = Math.max(...lengths);
      if (shortest > 0 && longest / shortest > MAX_LENGTH_RATIO) {
        push({
          blockId: entry.blockId,
          role,
          kind: 'LENGTH_IMBALANCE',
          detail: `Längste (${longest}) / kürzeste (${shortest}) = ${(longest / shortest).toFixed(2)}.`,
        });
      }
      // Längen-Leak: Die richtige Antwort darf nicht deutlich länger sein als
      // die längste falsche Antwort, sonst ist sie allein am Umfang erkennbar.
      const correctLength = correct.trim().length;
      const longestWrong = Math.max(...distractors.map((t) => t.trim().length));
      if (longestWrong > 0 && correctLength / longestWrong > MAX_CORRECT_LENGTH_RATIO) {
        push({
          blockId: entry.blockId,
          role,
          kind: 'LENGTH_LEAK',
          detail: `Richtige Antwort (${correctLength}) / längste falsche (${longestWrong}) = ${(correctLength / longestWrong).toFixed(2)}.`,
        });
      }
    }
  }

  return issues;
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
          difficulty: questionDifficulty(block, chosen, 'HAUPTFRAGE'),
          question: chosen.questionOverride ?? block.question,
          correctAnswer: chosen.answerOverride ?? block.correctAnswer,
          distractors: chosen.main.distractors,
          source: 'QUESTIONS_TXT',
          verificationStatus: 'VERIFIED_QUESTIONS_TXT',
          legalBasis: questionLegalBasis(block, chosen, 'HAUPTFRAGE'),
        },
        random,
      ),
      makeQuestion(
        {
          block,
          role: 'FOLGEFRAGE_1',
          position: ++position,
          correctIndex: (startOffset + position) % ORAL_EXAM_OPTION_COUNT,
          difficulty: questionDifficulty(block, chosen, 'FOLGEFRAGE_1'),
          question: chosen.followUp1.question ?? block.followUp1,
          correctAnswer: chosen.followUp1.answer,
          distractors: chosen.followUp1.distractors,
          source: chosen.followUp1.source,
          verificationStatus: chosen.followUp1.verificationStatus,
          explanation: chosen.followUp1.explanation,
          legalBasis: questionLegalBasis(block, chosen, 'FOLGEFRAGE_1'),
        },
        random,
      ),
      makeQuestion(
        {
          block,
          role: 'FOLGEFRAGE_2',
          position: ++position,
          correctIndex: (startOffset + position) % ORAL_EXAM_OPTION_COUNT,
          difficulty: questionDifficulty(block, chosen, 'FOLGEFRAGE_2'),
          question: chosen.followUp2.question ?? block.followUp2,
          correctAnswer: chosen.followUp2.answer,
          distractors: chosen.followUp2.distractors,
          source: chosen.followUp2.source,
          verificationStatus: chosen.followUp2.verificationStatus,
          explanation: chosen.followUp2.explanation,
          legalBasis: questionLegalBasis(block, chosen, 'FOLGEFRAGE_2'),
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
