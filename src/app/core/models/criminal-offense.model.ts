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
  /** Didaktische Aufbereitung aus Grundlagen_Straftaten.pdf. */
  | 'SOURCE_GRUNDLAGEN_PDF'
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
  | 'HAUSRECHT'
  | 'AMTS_BEFUGNISDELIKTE';

/**
 * Deliktsfamilie – didaktische Gruppierung verwandter Normen (z. B. alle
 * Diebstahlsdelikte). Die Familie ist keine juristische Kategorie, sondern
 * bündelt Grunddelikt, Regelbeispiele und Qualifikationen für das Lernen.
 */
export type OffenseFamily =
  | 'DIEBSTAHL'
  | 'UNTERSCHLAGUNG'
  | 'KOERPERVERLETZUNG'
  | 'RAUB'
  | 'ERPRESSUNG'
  | 'FREIHEIT'
  | 'EHRE'
  | 'HAUSFRIEDENSBRUCH'
  | 'AMTSANMASSUNG'
  | 'VERMOEGEN'
  | 'SACHBESCHAEDIGUNG'
  | 'URKUNDE'
  | 'UNTERLASSUNG';

/**
 * Verhältnis einer Norm innerhalb ihrer Deliktsfamilie. Verhindert den falschen
 * Eindruck, jeder höhere Paragraph sei lediglich „dieselbe Tat mit mehr Gewalt“.
 */
export type FamilyRelation =
  /** Eigenständiger Grundtatbestand (z. B. §242, §223). */
  | 'GRUNDDELIKT'
  /** Benannter besonders schwerer Fall / Regelbeispiel (z. B. §243). */
  | 'REGELBEISPIEL'
  /** Eigenständige Qualifikation mit eigenen Tatbestandsmerkmalen (z. B. §244, §250). */
  | 'QUALIFIKATION'
  /** Eigenständige, selbständige Norm neben dem Grunddelikt (z. B. §246, §229). */
  | 'EIGENSTAENDIG'
  /** Erfolgsqualifikation (z. B. §227, §231). */
  | 'ERFOLGSQUALIFIKATION';

/**
 * Interne §34a-Relevanzstufe. Nur `CORE_34A` und `RELATED_34A` werden auf der
 * Lernseite gerendert; `NOT_INCLUDE` wird nicht angezeigt.
 */
export type RelevanceLevel = 'CORE_34A' | 'RELATED_34A' | 'NOT_INCLUDE';

/** Einordnung nach §12 StGB (Verbrechen / Vergehen). */
export type OffenseClassification = 'VERBRECHEN' | 'VERGEHEN';

/**
 * Strafmaßklasse, abgeleitet aus dem gesetzlichen Mindestmaß (nicht aus der
 * tatsächlich verhängten Strafe). Grundlage der optionalen Gruppierung.
 */
export type PenaltyClass =
  | 'GELDSTRASSE'
  | 'FREIHEITSSTRAFE_UNTER_1_JAHR'
  | 'VERBRECHEN_AB_1_JAHR'
  | 'OHNE_EIGENE_STRAFANDROHUNG';

/** Sortierschlüssel der Deliktsliste. */
export type OffenseSortKey =
  | 'RELEVANCE'
  | 'PARAGRAPH'
  | 'ALPHABETICAL'
  | 'PENALTY_ASC'
  | 'PENALTY_DESC'
  | 'VERBRECHEN_FIRST'
  | 'VERGEHEN_FIRST';

/** Versuchs-Schnellfilter. */
export type AttemptFilter = 'PUNISHABLE' | 'NOT_PUNISHABLE';

/** Vorsatz-/Fahrlässigkeits-Schnellfilter. */
export type CulpabilityFilter = 'VORSATZ' | 'FAEHLAESSIGKEIT';

/** Verfolgungsart. */
export type ProsecutionType = 'OFFIZIALDELIKT' | 'ANTRAGSDELIKT';

/** Bei Antragsdelikten: absolute oder relative Antragsdelikte. */
export type ApplicationType = 'ABSOLUTES_ANTRAGSDELIKT' | 'RELATIVES_ANTRAGSDELIKT';

/**
 * Mehrfachauswahl-Filter der Lernseite. Leere Arrays bedeuten „keine
 * Einschränkung“ in dieser Dimension; mehrere Werte innerhalb einer Dimension
 * werden ODER-verknüpft, verschiedene Dimensionen UND-verknüpft.
 */
export interface OffenseQuery {
  text: string;
  categories: OffenseCategory[];
  classifications: OffenseClassification[];
  prosecutions: ProsecutionType[];
  attempts: AttemptFilter[];
  culpabilities: CulpabilityFilter[];
  families: OffenseFamily[];
  /** Nur Delikte der Stufe `CORE_34A`. */
  coreOnly: boolean;
  /** Nur Delikte, die über `securityNote` als besonders §34a-relevant belegt sind. */
  examRelevantOnly: boolean;
}

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
  /** Didaktische Deliktsfamilie (z. B. alle Diebstahlsdelikte). */
  family: OffenseFamily;
  /** Stellung der Norm innerhalb ihrer Deliktsfamilie. */
  familyRelation: FamilyRelation;
  /**
   * §34a-Relevanzstufe. Nur `CORE_34A` und `RELATED_34A` werden gerendert.
   * Datensätze mit `NOT_INCLUDE` erscheinen nicht auf der Lernseite.
   */
  relevanceLevel: RelevanceLevel;
  /** Warum die Norm in die Lernseite aufgenommen (oder ausgeschlossen) wurde. */
  relevanceReason: string;
  /** Konkrete Prüfungsrelevanz für die Sachkundeprüfung §34a GewO. */
  examRelevance: string;
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
  /**
   * IDs verwandter Delikte derselben oder benachbarter Familien für die
   * „Ähnliche Delikte“-Navigation im Modal. Leer, wenn keine Beziehung bekannt ist.
   */
  relatedOffenses: string[];
  /** Amtlicher Gesetzeswortlaut (gekürzt, sofern sehr umfangreich). */
  officialText: string;
  /** Primärquellen-URL (gesetze-im-internet.de). */
  sourceUrl: string;
  /** Herkunft und Prüfdatum. */
  source: OffenseSource;
}

/** Ein inhaltsabschnitt einer Grundlagenkarte (Überschrift + Absätze/Stichpunkte). */
export interface LegalBasicsSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

/**
 * Grundlagenkarte des Strafrechts (Allgemeiner Teil).
 *
 * Didaktische Aufbereitung nach `Grundlagen_Straftaten.pdf`. Öffnet als große
 * Lernansicht (Modal). Nicht jede Karte beruht auf genau einer Norm (z. B.
 * Vorsatz/Fahrlässigkeit); deshalb ist `paragraph` optional und
 * `officialTextRefs` kann mehrere Normen benennen.
 *
 * Bewusst NICHT enthalten: Täterschaft und Teilnahme (§§25–27 StGB) – diese
 * werden als eigene Lerneinheit geführt.
 */
export interface LegalBasicsCard {
  id: string;
  /** Führende Norm, z. B. "§ 12"; leer, wenn keine einzelne Norm führt. */
  paragraph?: string;
  officialTitle: string;
  /** Rubrik, z. B. "Allgemeiner Teil" oder "Deliktsarten". */
  eyebrow: string;
  /** Kurzfassung für die Karte (1–2 Sätze). */
  summary: string;
  /** Amtlicher Wortlaut, sofern eine führende Norm existiert. */
  officialText?: string;
  /** Normen, auf die sich die Karte stützt (z. B. ["§ 22 StGB", "§ 23 StGB"]). */
  officialTextRefs?: string[];
  sections: LegalBasicsSection[];
  /** Didaktisch hervorgehobener Merksatz. */
  merksatz: string;
  /** Kurze, verständliche Beispiele. */
  examples: string[];
  /** Prüfungsrelevanz für die Sachkundeprüfung §34a GewO. */
  examRelevant: string;
  sourceUrl: string;
  source: OffenseSource;
}
