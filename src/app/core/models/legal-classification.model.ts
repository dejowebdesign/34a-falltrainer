/**
 * Rechtliche Einordnung (Stufe 2).
 *
 * Wichtig (Bibel-Kapitel 3 und 62): Ein möglicher Tatbestand ist nicht
 * automatisch ein feststehender Tatbestand. Der Typ unterscheidet daher
 * zwischen bloßem Verdacht ("MOEGLICH") und feststehender Einordnung.
 */

export type ClassificationCertainty =
  /** Sachverhalt deutet darauf hin – rechtliche Voraussetzungen sind noch zu prüfen. */
  | 'MOEGLICH'
  /** Voraussetzungen im Sachverhalt sind erfüllt. */
  | 'FESTSTEHEND'
  /** Rechtsbegriff, der die rechtliche Lage beschreibt (z. B. Gefahr, Angriff). */
  | 'RECHTSBEGRIFF';

/**
 * Rechtsgebiet der Einordnung (didaktisches Modell der Fallbeispiel-Unterlage).
 *
 * Die Unterlage ordnet Stufe 2 den Bereichen Strafrecht, Privatrecht und
 * öffentliches Recht zu. Reine Rechtsbegriffe ohne eigenes Rechtsgebiet
 * (z. B. Gefahr, Angriff) werden als RECHTSBEGRIFF geführt.
 */
export type LegalLevel =
  | 'STRAFRECHT'
  | 'PRIVATRECHT'
  | 'OEFFENTLICHES_RECHT'
  | 'RECHTSBEGRIFF';

/**
 * Eine rechtliche Einordnung, die zu einem Sachverhalt gehören kann.
 */
export interface LegalClassification {
  /** Eindeutige ID. */
  id: string;
  /** Name der Einordnung, z. B. "Möglicher Diebstahl". */
  name: string;
  /** Rechtsgebiet (Strafrecht, Privatrecht, öffentliches Recht, Rechtsbegriff). */
  level: LegalLevel;
  /** Referenzierte Normen. */
  normIds: string[];
  /** Gewissheitsgrad der Einordnung. */
  certainty: ClassificationCertainty;
  /** Voraussetzungen, die für diese Einordnung erfüllt sein müssen. */
  prerequisites: string[];
  /** Erklärung der Einordnung. */
  explanation: string;
}
