/**
 * Kuratierte Lernübersicht der für die Sachkundeprüfung §34a GewO relevanten
 * Straftatbestände des Strafgesetzbuches.
 *
 * Diese Datenhaltung ist bewusst von der juristischen Knowledge Base
 * (`legal-norms.data.ts`) getrennt: Dort stehen die Normen, die die Fall-Engine
 * (Anspruch/Befugnis/Rechtfertigung/Entschuldigung) verwendet. Hier steht die
 * pädagogische Steckbrief-Ansicht eines Delikts.
 *
 * Quellenregel:
 *  - Wo die Bibel V5.3.1 einen amtlichen Wortlaut enthält, wird dieser
 *    unverändert übernommen (`SOURCE_BIBEL`).
 *  - Wo die Bibel das Delikt in der Aufgabenstellung nennt, aber keinen
 *    amtlichen Wortlaut enthält, wurde der Wortlaut aus der amtlichen
 *    Primärquelle gesetze-im-internet.de übernommen (`SOURCE_GESETZE_IM_INTERNET`)
 *    bzw. – wo die Bibel das Delikt ausdrücklich aus dem Bestand ausschließt –
 *    als nicht im Bestand gekennzeichnet (`SOURCE_NOT_IN_BIBEL`).
 *  - Es wird nichts erfunden. Fehlt eine Angabe, wird sie als fehlend markiert.
 */

/** Amtliche Herkunft des gespeicherten Gesetzeswortlauts. */
export type OffenseSourceType =
  /** Amtlicher Wortlaut steht in der Bibel V5.3.1 (VERIFIED_OFFICIAL_TEXT). */
  | 'SOURCE_BIBEL'
  /** Amtlicher Wortlaut aus gesetze-im-internet.de (Primärquelle). */
  | 'SOURCE_GESETZE_IM_INTERNET'
  /** Bibel V5.3.1 enthält das Delikt ausdrücklich nicht; Wortlaut aus Primärquelle. */
  | 'SOURCE_NOT_IN_BIBEL'
  /** Kein amtlicher Wortlaut verfügbar – als fehlend markiert. */
  | 'SOURCE_MISSING';

/** Herkunft einer Information (Bibel, Primärquelle, Fragenbasis, fehlend). */
export interface OffenseSource {
  sourceType: OffenseSourceType;
  /** Konkrete Referenz (Datei, Kapitel oder URL). */
  sourceReference: string;
  /** Datum der letzten Prüfung (ISO, YYYY-MM-DD). */
  lastVerified: string;
}

/** Deliktsgruppe gemäß Bibel-Kapitel 14 und Sachkunde-Stoff. */
export type OffenseCategory =
  | 'STRAFTATEN_GEGEN_PERSON'
  | 'EHRLICHKEITSDELIKTE'
  | 'KOERPERVERLETZUNG'
  | 'VERMOEGENSDELIKTE'
  | 'DIEBSTAHL_UNTERSCHLAGUNG'
  | 'RAUB_ERPRESSUNG'
  | 'SACHBESCHAEDIGUNG'
  | 'URKUNDENDELIKTE'
  | 'GEMEINGEFAEHRLICHE_DELIKTE'
  | 'AMTS_BEFUGNISDELIKTE';

/** Einordnung nach §12 StGB (Verbrechen / Vergehen). */
export type OffenseClassification = 'VERBRECHEN' | 'VERGEHEN';

/** Verfolgungsart. */
export type ProsecutionType = 'OFFIZIALDELIKT' | 'ANTRAGSDELIKT';

/** Bei Antragsdelikten: absolute oder relative Antragsdelikte. */
export type ApplicationType = 'ABSOLUTES_ANTRAGSDELIKT' | 'RELATIVES_ANTRAGSDELIKT';

/**
 * Fahrlässigkeitsverhältnis nach §15 StGB. Trennt sauber zwischen
 * „Vorsatz erforderlich“ und „eigenständige fahrlässige Variante existiert“.
 */
export interface NegligenceRelation {
  /** Vorsätzliche Begehung ist strafbar. */
  intentional: boolean;
  /** Eigenständige fahrlässige Strafnorm vorhanden. */
  negligentVariant: boolean;
  /** Verweis auf die fahrlässige Variante, z. B. „§ 229 StGB“. */
  negligentNorm?: string;
  /** Erläuterung nach §15 StGB. */
  explanation: string;
}

/** Verfolgungsangaben inkl. Antragsart und Einschränkungen. */
export interface ProsecutionInfo {
  type: ProsecutionType;
  applicationType?: ApplicationType;
  /** Norm der Strafantragsregelung, z. B. „§ 230 StGB“. */
  applicationNorm?: string;
  /** Erläuterung (z. B. besonderes öffentliches Interesse). */
  explanation: string;
}

/** Ein kuratierter Straftatbestand als einheitlicher Steckbrief. */
export interface CriminalOffense {
  /** Eindeutige ID, z. B. "stgb-242". */
  id: string;
  /** Gesetz, i. d. R. "StGB". */
  law: string;
  /** Paragraph, z. B. "§ 242". */
  paragraph: string;
  /** Amtlicher Titel aus der Primärquelle. */
  officialTitle: string;
  /** Deliktsgruppe. */
  category: OffenseCategory;
  /** Geschütztes Rechtsgut. */
  protectedInterest: string;
  /** Objektiver Tatbestand – äußerlich feststellbare Merkmale. */
  objectiveElements: string[];
  /** Subjektiver Tatbestand. */
  subjectiveElements: string[];
  /** Vorsatz erforderlich (i. d. R. ja). */
  intentRequired: boolean;
  /** Fahrlässigkeitsverhältnis nach §15 StGB. */
  negligence: NegligenceRelation;
  /** Besondere subjektive Merkmale, sofern gesetzlich erforderlich. */
  specialSubjectiveElements?: string[];
  /** Gesetzliche Mindeststrafe in Worten (nie „0 Monate“). */
  minimumPenalty: string;
  /** Gesetzlicher Höchststrafrahmen (informativ). */
  maximumPenalty: string;
  /** Einordnung nach §12 StGB. */
  classification: OffenseClassification;
  /** Verfolgungsart inkl. Antragsart. */
  prosecution: ProsecutionInfo;
  /** Versuch strafbar (nach §23 StGB bzw. Sondervorschrift). */
  attemptPunishable: boolean;
  /** Begründung der Versuchsstrafbarkeit. */
  attemptExplanation: string;
  /** Kurze verständliche Erklärung. */
  explanation: string;
  /** Prüfungsrelevanz / typischer §34a-Bezug. */
  relevance: string;
  /** Besondere Prüfungsbesonderheit für Sicherheitsmitarbeiter (optional). */
  securityNote?: string;
  /** Wichtige Abgrenzungen zu anderen Delikten. */
  distinctions?: string[];
  /** Amtlicher Gesetzeswortlaut (gekürzt, sofern sehr umfangreich). */
  officialText: string;
  /** Primärquellen-URL (gesetze-im-internet.de). */
  sourceUrl: string;
  /** Herkunft und Prüfdatum. */
  source: OffenseSource;
}

/** Ein Grundlagenartikel des Allgemeinen Teils (z. B. §12, §15, §23 StGB). */
export interface LegalBasicsEntry {
  id: string;
  paragraph: string;
  officialTitle: string;
  officialText: string;
  explanation: string;
  sourceUrl: string;
  source: OffenseSource;
}
