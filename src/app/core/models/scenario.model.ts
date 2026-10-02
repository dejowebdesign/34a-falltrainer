/**
 * Szenarien (Fälle) sind strikt von der juristischen Knowledge Base getrennt
 * (Bibel-Kapitel 7, 63: SCENARIO → FACT → LEGAL_RULE → LEGAL_RESULT → EXPLANATION).
 *
 * Die Bibel selbst enthält bewusst keine konkreten Unterrichtsfälle. Die
 * Szenarien dieses Projekts sind Seed-Daten und verweisen ausschließlich auf
 * Normen und Befugnisse der Knowledge Base.
 */

/** Ein einzelner, rechtlich relevanter Sachverhaltsumstand. */
export interface ScenarioFact {
  id: string;
  /** Beschreibung des Umstands. */
  text: string;
  /** Ob dieser Umstand rechtlich relevant ist. */
  legallyRelevant: boolean;
}

/** Antwortauswertung einer einzelnen Option. */
export type OptionVerdict = 'RICHTIG' | 'TEILWEISE_RICHTIG' | 'FALSCH';

/** Eine Auswahloption mit Begründung und optionalem Denkfehler. */
export interface StageOption {
  id: string;
  /** Antworttext. */
  text: string;
  /** Bewertung der Option. */
  verdict: OptionVerdict;
  /** Begründung, warum die Option richtig, teilweise richtig oder falsch ist. */
  explanation: string;
  /**
   * Bei falschen Antworten: kurze Beschreibung des typischen Denkfehlers
   * (Bibel-Kapitel 11 und 13).
   */
  misconception?: string;
  /** Referenzierte Normen zur Begründung. */
  normIds?: string[];
}

/** Stufe 1 – „Wie verhalten Sie sich?“ (Umgang mit Menschen). */
export interface StageOne {
  prompt: string;
  options: StageOption[];
  /** IDs der als richtig gewerteten Optionen. */
  correctOptions: string[];
  /** Übergreifende Erklärung der Stufe. */
  explanation: string;
}

/** Stufe 2 – „Was liegt rechtlich vor?“ */
export interface StageTwo {
  prompt: string;
  options: StageOption[];
  correctOptions: string[];
  explanation: string;
  /** IDs der referenzierten LegalClassifications. */
  classificationIds: string[];
}

/** Stufe 3 – „Mit welcher Rechtsgrundlage dürfen Sie eingreifen?“ */
export interface StageThree {
  prompt: string;
  options: StageOption[];
  correctOptions: string[];
  explanation: string;
  /** IDs der referenzierten LegalAuthorities. */
  authorityIds: string[];
}

/** Musterlösung gegliedert nach Bibel-Kapitel 11. */
export interface ModelSolution {
  /** 1. Verhalten. */
  behavior: string;
  /** 2. Rechtliche Einordnung. */
  legalClassification: string;
  /** 3. Rechtsgrundlage. */
  legalBasis: string;
  /** 4. Begründung. */
  reasoning: string;
  /** 5. Grenzen. */
  limits: string;
}

/** Musterlösung und Ergebniszusammenfassung eines Falls. */
export interface Result {
  /** Zusammenfassung des Verhaltens (Stufe 1). */
  behaviorResult: string;
  /** Zusammenfassung der rechtlichen Einordnung (Stufe 2). */
  legalResult: string;
  /** Zusammenfassung der Rechtsgrundlage (Stufe 3). */
  authorityResult: string;
  /** Gesamtbegründung. */
  explanation: string;
  /** Musterlösung in fünf Punkten (Bibel-Kapitel 11). */
  modelSolution: ModelSolution;
}

/** Vollständiges Szenario. */
export interface Scenario {
  id: string;
  title: string;
  /** Kurzbeschreibung für die Übersicht. */
  description: string;
  /** Ausgangssachverhalt. */
  facts: ScenarioFact[];
  stageOne: StageOne;
  stageTwo: StageTwo;
  stageThree: StageThree;
  result: Result;
}

/** Ergebnis einer einzelnen Stufe nach Auswertung durch die Rule Engine. */
export interface StageEvaluation {
  stage: 1 | 2 | 3;
  /** Vom Benutzer gewählte Options-IDs. */
  selectedOptionIds: string[];
  /** Bewertung der Stufe insgesamt. */
  verdict: OptionVerdict;
  /** Bewertung jeder einzelnen gewählten Option. */
  optionVerdicts: { optionId: string; verdict: OptionVerdict }[];
  /** Anzahl richtig gewählter Optionen. */
  correctCount: number;
  /** Anzahl falsch gewählter Optionen. */
  wrongCount: number;
  /** Gesamtbegründung der Stufe. */
  explanation: string;
}

/** Gesamtergebnis eines durchgespielten Falls. */
export interface CaseResult {
  scenarioId: string;
  evaluations: StageEvaluation[];
  /** Gesamtbewertung über alle drei Stufen. */
  overallVerdict: OptionVerdict;
  /** Anteil richtig bewerteter Optionen (0–100). */
  score: number;
  result: Result;
}
