/**
 * Verhaltensbausteine der Stufe 1 („Wie verhalten Sie sich?“).
 *
 * Didaktische Grundlage ist die Unterlage „Fallbeispiele – Themenvertiefung“
 * (30.09.2026, Sachkundeprüfung § 34a GewO), Abschnitt „Umgang mit Menschen“.
 *
 * Diese Bausteine sind Verhaltensempfehlungen, keine Rechtsgrundlagen. Sie
 * werden deshalb strikt getrennt von der juristischen Knowledge Base gehalten
 * und in Szenarien nur über Stufe 1 referenziert.
 */

/** Oberkategorie eines Verhaltensbausteins. */
export type BehaviorCategory =
  | 'GRUNDHALTUNG'
  | 'KOMMUNIKATION'
  | 'EIGENSICHERUNG'
  | 'MASSNAHMEN'
  | 'NACHSORGE';

export interface BehaviorEntry {
  id: string;
  /** Kurzbezeichnung des Verhaltens. */
  label: string;
  category: BehaviorCategory;
  /** Warum das Verhalten sinnvoll ist. */
  explanation: string;
}

export const BEHAVIOR_CATEGORY_LABELS: Record<BehaviorCategory, string> = {
  GRUNDHALTUNG: 'Grundhaltung',
  KOMMUNIKATION: 'Kommunikation',
  EIGENSICHERUNG: 'Eigensicherung',
  MASSNAHMEN: 'Maßnahmen',
  NACHSORGE: 'Nachsorge und Dokumentation',
};

export const BEHAVIOR_CATALOG: BehaviorEntry[] = [
  {
    id: 'ruhe-bewahren',
    label: 'Ruhe bewahren',
    category: 'GRUNDHALTUNG',
    explanation: 'Eine ruhige Grundhaltung verhindert Eskalation und ermöglicht sachliches Handeln.',
  },
  {
    id: 'professionelles-auftreten',
    label: 'Sachgerechtes und professionelles Auftreten',
    category: 'GRUNDHALTUNG',
    explanation: 'Professionelles Auftreten schafft Akzeptanz und senkt die Konfliktbereitschaft.',
  },
  {
    id: 'selbstbeherrschung',
    label: 'Selbstbeherrschung / nicht provozieren lassen',
    category: 'GRUNDHALTUNG',
    explanation:
      'Wer sich nicht provozieren lässt, nimmt dem Gegenüber die Möglichkeit zur Eskalation.',
  },
  {
    id: 'freundliche-ansprache',
    label: 'Freundliche Ansprache / Ich-Botschaften',
    category: 'KOMMUNIKATION',
    explanation: 'Ich-Botschaften beschreiben die eigene Wahrnehmung, ohne das Gegenüber anzugreifen.',
  },
  {
    id: 'vernebelungstechnik',
    label: 'Beleidigungen überhören / Vernebelungstechnik',
    category: 'KOMMUNIKATION',
    explanation:
      'Beleidigungen werden nicht erwidert; die Aufmerksamkeit bleibt beim Sachziel statt beim Angriff.',
  },
  {
    id: 'nicht-aggressive-wortwahl',
    label: 'Nicht-aggressive Wortwahl und Verhaltensweisen',
    category: 'KOMMUNIKATION',
    explanation: 'Nicht-aggressive Sprache vermeidet zusätzliche Reibung und hält das Gespräch offen.',
  },
  {
    id: 'deeskalierende-kommunikation',
    label: 'Deeskalierende Kommunikation',
    category: 'KOMMUNIKATION',
    explanation: 'Deeskalierende Kommunikation senkt die Spannung und macht Lösungen möglich.',
  },
  {
    id: 'eigensicherung',
    label: 'Eigensicherung',
    category: 'EIGENSICHERUNG',
    explanation: 'Die eigene Sicherheit ist Grundlage jedes weiteren Handelns.',
  },
  {
    id: 'verstaerkung-rufen',
    label: 'Verstärkung rufen',
    category: 'EIGENSICHERUNG',
    explanation: 'Verstärkung reduziert Risiken und ermöglicht ein kontrolliertes Vorgehen.',
  },
  {
    id: 'polizei-verstaendigen',
    label: 'Polizei verständigen (lassen)',
    category: 'MASSNAHMEN',
    explanation: 'Die Polizei hat staatliche Befugnisse, die die Sicherheitskraft nicht hat.',
  },
  {
    id: 'rettungsdienst-verstaendigen',
    label: 'Rettungsdienst verständigen (lassen)',
    category: 'MASSNAHMEN',
    explanation: 'Bei Verletzungen oder Gesundheitsgefahr ist medizinische Hilfe vorrangig.',
  },
  {
    id: 'eintreffende-kraefte-informieren',
    label: 'Eintreffende Polizei und Rettungsdienst informieren',
    category: 'MASSNAHMEN',
    explanation: 'Eine geordnete Übergabe sichert Informationen und Zuständigkeiten.',
  },
  {
    id: 'personen-trennen',
    label: 'Personen trennen',
    category: 'MASSNAHMEN',
    explanation: 'Getrennte Parteien können sich nicht weiter unmittelbar beeinflussen.',
  },
  {
    id: 'erste-hilfe',
    label: 'Erste Hilfe leisten',
    category: 'MASSNAHMEN',
    explanation: 'Bei Verletzungen ist die gebotene Hilfe zu leisten.',
  },
  {
    id: 'zeugen-feststellen',
    label: 'Zeugen feststellen',
    category: 'NACHSORGE',
    explanation: 'Zeugen sichern die spätere Aufklärung des Sachverhalts.',
  },
  {
    id: 'personalien-aufnehmen',
    label: 'Personalien aufnehmen',
    category: 'NACHSORGE',
    explanation: 'Die Personalien ermöglichen die weitere Bearbeitung und Identifizierung.',
  },
  {
    id: 'vorfall-protokollieren',
    label: 'Vorfall protokollieren',
    category: 'NACHSORGE',
    explanation: 'Eine zeitnahe Dokumentation sichert den Sachverhalt nachvollziehbar.',
  },
  {
    id: 'strafanzeige-erstatten',
    label: 'Strafanzeige erstatten',
    category: 'NACHSORGE',
    explanation: 'Die Strafanzeige bringt den Sachverhalt zur Kenntnis der Strafverfolgungsbehörden.',
  },
  {
    id: 'strafantrag-stellen',
    label: 'Strafantrag stellen',
    category: 'NACHSORGE',
    explanation:
      'Bei Antragsdelikten ist neben der Anzeige der Strafantrag des Antragsberechtigten erforderlich.',
  },
  {
    id: 'hausverbot-erteilen',
    label: 'Hausverbot erteilen',
    category: 'NACHSORGE',
    explanation:
      'Das Hausverbot wird durch den Hausrechtsinhaber erteilt; es ist keine automatische Gewaltbefugnis.',
  },
];
