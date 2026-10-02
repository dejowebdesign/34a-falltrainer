/**
 * Grundlegende juristische Datentypen.
 *
 * Die Bibel V5.3.1 verlangt eine strikte Trennung von:
 *  - ANSPRUCH  (Wer kann von wem was verlangen?)
 *  - BEFUGNIS  (Was darf ich selbst tun?)
 *  - RECHTFERTIGUNG (Warum ist die Handlung trotz Tatbestand erlaubt?)
 *  - ENTSCHEIDUNG (Warum entfällt die Schuld?)
 *
 * Quelle: 34a_bibel_v5_3_1.txt, Kapitel 2, 73, 74.
 */

/**
 * Rechtsnatur einer Norm – die vier Kernkategorien der Bibel.
 * 'GRUNDLAGE' kennzeichnet allgemeine Definitionen (z. B. §15 StGB),
 * die keiner der vier Kategorien zugeordnet werden.
 */
export type LegalNature =
  | 'ANSPRUCH'
  | 'BEFUGNIS'
  | 'RECHTFERTIGUNG'
  | 'ENTSCHULDIGUNG'
  | 'GRUNDLAGE';

/** Rechtsgebiet einer Norm. */
export type LegalArea = 'Strafrecht' | 'Zivilrecht' | 'Strafprozessrecht';

/** Verifikationsstatus des amtlichen Gesetzestextes gemäß Bibel-Kapitel 64/67. */
export type VerificationStatus =
  | 'VERIFIED_OFFICIAL_TEXT'
  | 'UNVERIFIED'
  | 'MISSING'
  | 'UNCLEAR';

/**
 * Eine einzelne Rechtsnorm. Der amtliche Gesetzestext wird strikt vom
 * erklärenden Lerntext getrennt (Bibel-Kapitel 65).
 */
export interface LegalNorm {
  /** Eindeutige ID, z. B. "stgb-32" oder "bgb-859". */
  id: string;
  /** Gesetz, z. B. "StGB", "BGB", "StPO". */
  law: string;
  /** Paragraph, z. B. "§ 127". */
  paragraph: string;
  /** Amtlicher Titel. */
  title: string;
  /** Amtlicher Gesetzestext (Wortlaut aus der Bibel). Leer, wenn in der Bibel nicht vorhanden. */
  officialText: string;
  /** Vereinfachte didaktische Erklärung. */
  explanation: string;
  /** Prüfungsmerksatz aus der Bibel. */
  mnemonic: string;
  /** Rechtsgebiet. */
  area: LegalArea;
  /** Rechtsnatur – Anspruch/Befugnis/Rechtfertigung/Entschuldigung. */
  nature: LegalNature;
  /** Amtliche Quelle (Gesetze im Internet). */
  source: string;
  /** Verifikationsstatus des amtlichen Wortlauts. */
  verificationStatus: VerificationStatus;
  /** Voraussetzungen / Tatbestandsmerkmale, soweit in der Bibel beschrieben. */
  prerequisites?: string[];
  /** Rechtsfolge, soweit in der Bibel beschrieben. */
  legalConsequence?: string;
  /** Abgrenzungen zu anderen Normen. */
  distinctions?: string[];
  /** Bezug zur Tätigkeit einer Sicherheitskraft (§34a-Bezug). */
  securityContext?: string;
}
