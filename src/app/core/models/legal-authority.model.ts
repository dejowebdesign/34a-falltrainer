/**
 * Befugnis / Rechtfertigung (Stufe 3).
 *
 * Die Bibel (Kapitel 61) verlangt, dass jede Handlung getrennt nach
 * legal_basis, prerequisites, limits und proportionality gespeichert wird.
 * Eine Befugnis folgt niemals automatisch aus einem Straftatbestand
 * (Bibel-Kapitel 13, 62).
 */

export type AuthorityKind =
  /** Eigene Handlungsbefugnis, z. B. §127 StPO, §859 BGB. */
  | 'BEFUGNIS'
  /** Rechtfertigungsgrund, z. B. §32 StGB, §34 StGB. */
  | 'RECHTFERTIGUNG'
  /** Anspruch, z. B. §985 BGB – kein unmittelbares Eingriffsrecht. */
  | 'ANSPRUCH'
  /** Entschuldigungsgrund, z. B. §33 StGB, §35 StGB. */
  | 'ENTSCHULDIGUNG';

export interface LegalAuthority {
  /** Eindeutige ID. */
  id: string;
  /** Referenzierte Norm. */
  normId: string;
  /** Kategorie. */
  kind: AuthorityKind;
  /** Wer ist Inhaber der Befugnis? z. B. "jedermann" bei §127 Abs. 1 StPO. */
  holder: string;
  /** Voraussetzungen, die kumulativ erfüllt sein müssen. */
  prerequisites: string[];
  /** Erlaubte konkrete Handlung. */
  permittedAction: string;
  /** Grenzen der Handlung. */
  limits: string[];
  /** Verhältnismäßigkeit (Geeignetheit, Erforderlichkeit, Angemessenheit). */
  proportionality: string;
  /**
   * Bedingungen, unter denen die Befugnis ausdrücklich NICHT greift.
   * Dient der Vermeidung der in Kapitel 62 verbotenen Automatismen.
   */
  prohibitedConditions?: string[];
}
