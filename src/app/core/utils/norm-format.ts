import { LegalNorm } from '../models';

/**
 * Zentrale Darstellung von Rechtsnormen.
 *
 * Grundregel: Paragraphen werden immer mit offiziellem Gesetzestitel
 * angezeigt, damit in der App nicht mehrere Schreibweisen parallel existieren.
 *
 * Hauptdarstellung: "§ [Paragraph] [Absatz] [Gesetz] – [offizieller Titel]"
 * Beispiel: § 127 Abs. 1 StPO – Vorläufige Festnahme
 */
export function formatNorm(norm: LegalNorm): string {
  return `${formatNormReference(norm)} – ${norm.title}`;
}

/** Kurzform ohne Titel: "§ 127 Abs. 1 StPO". */
export function formatNormReference(norm: LegalNorm): string {
  const parts = [norm.paragraph];
  if (norm.absatz) {
    parts.push(norm.absatz);
  }
  parts.push(norm.law);
  return parts.join(' ');
}

/**
 * Fachliche Einordnung, soweit sie vom offiziellen Gesetzestitel abweicht
 * (z. B. §228 BGB → "Defensivnotstand"). Sie ist ausdrücklich keine amtliche
 * Titelangabe und wird deshalb getrennt von `formatNorm` angezeigt.
 */
export function formatFachlicheEinordnung(norm: LegalNorm): string | undefined {
  return norm.fachlicheEinordnung;
}
