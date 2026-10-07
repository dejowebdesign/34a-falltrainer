/**
 * Lernkarten-Modell für die kompakten §34a-Lernseiten „Bürgerliches
 * Gesetzbuch“ und „Jedermannsrechte“.
 *
 * Bewusst getrennt von `criminal-offense.model.ts` (Straftatbestände) und von
 * der juristischen Knowledge Base `legal-norms.data.ts` (Normen der Fallengine).
 * Hier steht die pädagogische Lernkarte einer einzelnen Norm.
 *
 * Quellenregel (Bibel V5.3.1):
 *  - Der amtliche Wortlaut wird nur übernommen, wo die Bibel ihn enthält.
 *  - Ist eine Norm im Sachkunde-Stoff genannt, aber in der Bibel nicht mit
 *    amtlichem Wortlaut hinterlegt, wird `verificationStatus: 'MISSING'`
 *    gesetzt und `officialText` bleibt leer. Es wird nichts erfunden.
 *  - Die offizielle Bezeichnung stammt ausschließlich aus der Bibel bzw. aus
 *    der amtlichen Überschrift; fachliche Kurzbezeichnungen (z. B.
 *    „Defensivnotstand“) stehen getrennt in `fachlicheEinordnung`.
 */

/**
 * Rechtsnatur der Norm. Hält die von der Bibel geforderte Trennung
 * Anspruch ≠ Befugnis ≠ Rechtfertigung ≠ Entschuldigung ein.
 * `GRUNDLAGE` kennzeichnet Grundbegriffe ohne eigene Normzuordnung
 * (z. B. Eigentum/Besitz).
 */
export type TopicNature = 'ANSPRUCH' | 'BEFUGNIS' | 'RECHTFERTIGUNG' | 'ENTSCHULDIGUNG' | 'GRUNDLAGE';

/** Rechtsgebiet einer Lernkarte. */
export type TopicArea = 'Zivilrecht' | 'Strafrecht' | 'Strafprozessrecht';

/**
 * Interne §34a-Relevanzstufe.
 *  - CORE_34A    – ausdrücklich im Sachkunde-Rahmen bzw. unmittelbar prüfungsrelevant.
 *  - RELATED_34A – unmittelbar erforderlich für das Verständnis eines Kernthemas.
 * Nur diese beiden Stufen werden gerendert.
 */
export type TopicRelevance = 'CORE_34A' | 'RELATED_34A';

/** Verifikationsstatus des amtlichen Gesetzeswortlauts (Bibel-Kapitel 64/67). */
export type TopicVerificationStatus =
  | 'VERIFIED_OFFICIAL_TEXT'
  | 'MISSING'
  | 'UNCLEAR';

/** Eine Lernfamilie (didaktische Gruppe verwandter Normen). */
export interface TopicFamily {
  id: string;
  label: string;
  /** Kurzbeschreibung der Lernfamilie (optional). */
  description?: string;
}

/** Ein einzelner Voraussetzungs-/Prüfungspunkt mit kurzer Erläuterung. */
export interface TopicPoint {
  label: string;
  detail?: string;
}

/**
 * Eine kompakte Lernkarte einer einzelnen Norm.
 *
 * Die vollständige didaktische Aufbereitung (Worum geht es, Voraussetzungen,
 * Grenzen, Prüfungshinweis, typische Situation, Abgrenzung) wird im Detail-Modal
 * angezeigt. Auf der Karte erscheint nur Paragraph, offizieller Titel und eine
 * kurze Zusammenfassung.
 */
export interface LearningTopic {
  /** Eindeutige ID, z. B. "bgb-859". */
  id: string;
  /** Gesetz, z. B. "BGB", "StGB", "StPO". */
  law: string;
  /** Paragraph, z. B. "§ 859". */
  paragraph: string;
  /** Absatz, sofern für die Anzeige erforderlich, z. B. "Abs. 1". */
  absatz?: string;
  /** Offizieller Titel, z. B. "Selbsthilfe des Besitzers". */
  officialTitle: string;
  /**
   * Fachliche Kurzbezeichnung, soweit sie vom offiziellen Titel abweicht
   * (z. B. "Defensivnotstand"). Ausdrücklich keine amtliche Bezeichnung.
   */
  fachlicheEinordnung?: string;
  /** Rechtsgebiet. */
  area: TopicArea;
  /** Rechtsnatur – Anspruch/Befugnis/Rechtfertigung/Entschuldigung/Grundlage. */
  nature: TopicNature;
  /** Lernfamilie (didaktische Gruppe). */
  familyId: string;
  /** §34a-Relevanzstufe. */
  relevance: TopicRelevance;
  /** Warum die Norm in die Lernseite aufgenommen wurde (Kurzbegründung). */
  relevanceReason: string;
  /** Konkrete Prüfungsrelevanz für die Sachkundeprüfung §34a GewO. */
  examRelevance: string;
  /** Kurzfassung für die Karte (1–2 Sätze). */
  summary: string;
  /** Kurz erklärt – 2–4 verständliche Sätze für das Modal. */
  shortExplanation: string;
  /** Worum geht es? – Funktion der Norm in einfachen Worten. */
  purpose: string;
  /** Voraussetzungen – nur die sachkunderelevanten Punkte. */
  prerequisites: TopicPoint[];
  /** Wer darf handeln? Klar benannt. */
  whoActs: string;
  /** Gegen wen / wogegen? Klar benannt. */
  againstWhom: string;
  /** Grenzen – was darf nicht einfach gemacht werden. */
  limits: string[];
  /** Prüfungshinweis – „Was könnte die IHK dazu fragen?“. */
  examHint: string;
  /** Typische Situation aus dem Sicherheitsdienst. */
  typicalSituation: string;
  /** Abgrenzung – nur unmittelbar verwandte Normen. */
  distinctions: TopicPoint[];
  /** Amtlicher Gesetzeswortlaut (aus der Bibel). Leer, wenn nicht vorhanden. */
  officialText: string;
  /** Verifikationsstatus des Wortlauts. */
  verificationStatus: TopicVerificationStatus;
  /** Primärquellen-URL (gesetze-im-internet.de). */
  sourceUrl: string;
}

/** Eine Zeile der Vergleichsmatrix auf der Jedermannsrechte-Seite. */
export interface AuthorityMatrixRow {
  /** Situation in Kurzform, z. B. "Angriff". */
  situation: string;
  /** Rechtsgrundlage als Norm-Referenz, z. B. "§ 32 StGB". */
  legalBasis: string;
  /** Norm-ID für die Verlinkung zur Lernkarte (falls vorhanden). */
  normId?: string;
  /** Kernvoraussetzung in Kurzform. */
  coreRequirement: string;
  /** Zweck der Norm. */
  purpose: string;
}

/**
 * Die vier Kernkategorien als Merkkarte. Stellt sicher, dass
 * Anspruch/Befugnis/Rechtfertigung/Entschuldigung nicht vermischt werden.
 */
export interface CoreCategory {
  key: TopicNature;
  label: string;
  question: string;
}
