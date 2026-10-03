/**
 * Datenmodell der mündlichen Prüfungssimulation.
 *
 * Quelle der Hauptfragen ist die Fragenbank `Fragen.txt`. Hauptfrage und deren
 * richtige Antwort werden 1:1 übernommen (`QUESTIONS_TXT`).
 *
 * Die Fragenbank enthält keine Antworten zu den Folgefragen. Diese werden
 * entweder aus der 34a-Bibel abgeleitet (`AUTHORED_FROM_BIBEL`) oder – wo die
 * Bibel das Thema nicht abdeckt – aus Fachwissen ergänzt
 * (`AUTHORED_FROM_FACHWISSEN`, `UNVERIFIED`). Jede ergänzte Antwort ist im
 * Datenmodell eindeutig gekennzeichnet; in der Teilnehmeransicht werden diese
 * Kennzeichnungen nicht angezeigt.
 */

/** Interne Kategoriekürzel der Fragenbank (unverändert übernommen). */
export type OralExamCategory =
  | 'RdöSuO'
  | 'GewO/BewachV'
  | 'Datenschutz'
  | 'BGB'
  | 'StGB/StPO'
  | 'Waffen'
  | 'DGUV/UVV'
  | 'UmM'
  | 'Technik';

/** Herkunft einer Antwort. */
export type OralExamSource = 'QUESTIONS_TXT' | 'AUTHORED_FROM_BIBEL' | 'AUTHORED_FROM_FACHWISSEN';

/** Verifikationsstand einer Antwort. */
export type OralExamVerification = 'VERIFIED_QUESTIONS_TXT' | 'VERIFIED_BIBEL' | 'UNVERIFIED';

/** Anzeigenamen der 9 Themengebiete. */
export const ORAL_EXAM_CATEGORY_LABELS: Record<OralExamCategory, string> = {
  RdöSuO: 'Rechtsordnung / Staatskunde',
  'GewO/BewachV': 'GewO / BewachV',
  Datenschutz: 'Datenschutz',
  BGB: 'BGB',
  'StGB/StPO': 'StGB / StPO',
  Waffen: 'Waffen',
  'DGUV/UVV': 'DGUV / UVV',
  UmM: 'Umgang mit Menschen',
  Technik: 'Sicherheitstechnik',
};

/** Feste Reihenfolge der 9 Themengebiete. */
export const ORAL_EXAM_CATEGORIES: OralExamCategory[] = [
  'RdöSuO',
  'GewO/BewachV',
  'Datenschutz',
  'BGB',
  'StGB/StPO',
  'Waffen',
  'DGUV/UVV',
  'UmM',
  'Technik',
];

/** Ein vollständiger Fragenblock aus der Fragenbank. */
export interface OralExamQuestionBlock {
  id: string;
  /** Internes Kategoriekürzel der Fragenbank. */
  category: OralExamCategory;
  /** Anzeigename des Themengebiets. */
  categoryLabel: string;
  /** Schwierigkeit aus der Fragenbank (1–5). */
  difficulty: number;
  /** Cluster aus der Fragenbank. */
  cluster: string;
  /** Hauptfrage (1:1 aus der Fragenbank). */
  question: string;
  /** Richtige Antwort zur Hauptfrage (1:1 aus der Fragenbank). */
  correctAnswer: string;
  /** Rechtslehre/Rechtsreferenz aus der Fragenbank, sofern vorhanden. */
  legalReference?: string;
  /** Folgefrage 1 (1:1 aus der Fragenbank). */
  followUp1: string;
  /** Folgefrage 2 (1:1 aus der Fragenbank). */
  followUp2: string;
  /** Herkunft des Hauptfrage-Antwortschlüssels. */
  source: 'QUESTIONS_TXT';
  /** Redaktionelle Hinweise (z. B. fehlende Rechtslehre), nicht für Teilnehmer. */
  notes?: string[];
}

/**
 * Ergänzte Antwort einer Folgefrage.
 *
 * `answer` ist die richtige Antwort, `distractors` sind genau vier plausible
 * falsche Antworten. Alle fünf Antwortmöglichkeiten stammen aus derselben
 * Quelle (`source`).
 */
export interface AuthoredFollowUp {
  /**
   * Überarbeitete Formulierung der Folgefrage als vollständige Prüfungsfrage.
   * Der fachliche Aspekt bleibt unverändert; fehlt das Feld, wird die
   * Formulierung aus `Fragen.txt` verwendet.
   */
  question?: string;
  answer: string;
  /** Vier plausible Distraktoren. */
  distractors: string[];
  source: Exclude<OralExamSource, 'QUESTIONS_TXT'>;
  verificationStatus: Exclude<OralExamVerification, 'VERIFIED_QUESTIONS_TXT'>;
  /** Kurze, quellenbasierte Erklärung, sofern vorhanden. */
  explanation?: string;
  /** Abweichende Schwierigkeit (1–5) gegenüber der Blockstufe, sofern nötig. */
  difficulty?: number;
  /** Einschlägige Rechtsgrundlage, erst nach der Auflösung sichtbar. */
  legalBasis?: string;
}

/** Ergänzte Distraktoren zur Hauptfrage (Antwortschlüssel bleibt aus Fragen.txt). */
export interface AuthoredMainDistractors {
  distractors: string[];
  source: Exclude<OralExamSource, 'QUESTIONS_TXT'>;
  verificationStatus: Exclude<OralExamVerification, 'VERIFIED_QUESTIONS_TXT'>;
}

/** Ein prüfungsreifer Fragenblock: Hauptfrage aus der Bank, Folgefragen ergänzt. */
export interface OralExamPoolBlock {
  blockId: string;
  /**
   * Überarbeitete Formulierung der Hauptfrage. Der fachliche Inhalt bleibt
   * unverändert gegenüber `Fragen.txt`; die Frage wird nur prüfungsgerechter
   * formuliert (kein Akronym als Lösungshinweis, keine Stichwortfrage).
   * Fehlt das Feld, wird die Formulierung aus `Fragen.txt` verwendet.
   */
  questionOverride?: string;
  /**
   * Überarbeitete richtige Antwort zur Hauptfrage. Der fachliche Sinn der
   * Antwort aus `Fragen.txt` bleibt erhalten; die Antwort wird nur als
   * vollständiger Satz formuliert. Fehlt das Feld, wird der Antwortschlüssel
   * aus `Fragen.txt` verwendet.
   */
  answerOverride?: string;
  /** Ergänzte Distraktoren zur Hauptfrage. */
  main: AuthoredMainDistractors;
  followUp1: AuthoredFollowUp;
  followUp2: AuthoredFollowUp;
  /** Abweichende Schwierigkeit (1–5) der Hauptfrage gegenüber der Blockstufe. */
  mainDifficulty?: number;
  /** Einschlägige Rechtsgrundlage der Hauptfrage, erst nach der Auflösung sichtbar. */
  mainLegalBasis?: string;
}

/** Rolle einer Frage im Fragenblock. */
export type ExamQuestionRole = 'HAUPTFRAGE' | 'FOLGEFRAGE_1' | 'FOLGEFRAGE_2';

/** Eine Antwortmöglichkeit im laufenden Prüfungsdurchlauf. */
export interface ExamAnswerOption {
  id: string;
  text: string;
  correct: boolean;
}

/** Eine einzelne Frage im laufenden Prüfungsdurchlauf. */
export interface ExamQuestion {
  id: string;
  blockId: string;
  category: OralExamCategory;
  categoryLabel: string;
  role: ExamQuestionRole;
  /** Position im Gesamtdurchlauf (1-basiert). */
  position: number;
  /** Schwierigkeit der konkreten Frage (1–5). */
  difficulty: number;
  question: string;
  correctAnswer: string;
  /**
   * Einschlägige Rechtsgrundlage. Wird bewusst nicht unter den fünf
   * Antwortmöglichkeiten geführt, sondern erst nach der Auflösung angezeigt.
   */
  legalBasis?: string;
  /** Genau fünf Antwortmöglichkeiten (1 richtig, 4 Distraktoren), gemischt. */
  options: ExamAnswerOption[];
  source: OralExamSource;
  verificationStatus: OralExamVerification;
  explanation?: string;
  legalReference?: string;
}

/** Ein Themengebiet im laufenden Durchlauf (ein Fragenblock = 3 Fragen). */
export interface ExamTopic {
  category: OralExamCategory;
  categoryLabel: string;
  blockId: string;
  cluster: string;
  difficulty: number;
  questions: ExamQuestion[];
}

/** Ein vollständiger Prüfungsdurchlauf. */
export interface OralExam {
  id: string;
  /** Reihenfolge der Themengebiete im Durchlauf. */
  topics: ExamTopic[];
  /** Alle Fragen in Durchlaufreihenfolge (27). */
  questions: ExamQuestion[];
}

/** Die vom Teilnehmer gewählte Antwort auf eine Frage. */
export interface ExamResponse {
  questionId: string;
  selectedOptionId: string;
}

/** Auswertung einer einzelnen Frage. */
export interface ExamQuestionEvaluation {
  question: ExamQuestion;
  selectedOptionId?: string;
  selectedText?: string;
  correct: boolean;
}

/** Auswertung eines Themengebiets. */
export interface ExamTopicEvaluation {
  category: OralExamCategory;
  categoryLabel: string;
  blockId: string;
  correctCount: number;
  total: number;
  /** Prozentwert (0–100), gerundet auf eine Nachkommastelle. */
  percent: number;
  questions: ExamQuestionEvaluation[];
}

/** Gesamtauswertung eines Durchlaufs. */
export interface ExamEvaluation {
  examId: string;
  correctCount: number;
  total: number;
  /** Prozentwert (0–100), gerundet auf eine Nachkommastelle. */
  percent: number;
  passed: boolean;
  thresholdPercent: number;
  /** Mindestpunktzahl für „bestanden“. */
  requiredPoints: number;
  topics: ExamTopicEvaluation[];
}
