import {
  CriminalOffense,
  LegalBasicsEntry,
  OffenseCategory,
  OffenseSource,
} from '../models';

/**
 * Kuratierte Lernübersicht der für die Sachkundeprüfung §34a GewO relevanten
 * Straftatbestände des StGB.
 *
 * Auswahl und Rechtswerte wurden anhand der Bibel V5.3.1 und – wo die Bibel
 * keinen amtlichen Wortlaut enthält – der amtlichen Primärquelle
 * gesetze-im-internet.de erstellt (Rechtsstand 01.10.2026). Es wird nichts
 * erfunden; fehlende Angaben werden ausdrücklich als fehlend markiert.
 *
 * Wichtige Systematik nach dem Allgemeinen Teil:
 *  - §12 StGB: Verbrechen = Mindestmaß Freiheitsstrafe ≥ 1 Jahr; Vergehen =
 *    geringere Mindeststrafe oder Geldstrafe. Schärfungen/Milderungen für
 *    besonders schwere/minder schwere Fälle bleiben außer Betracht (§12 Abs. 3).
 *  - §15 StGB: Fahrlässigkeit nur strafbar, wenn ausdrücklich angeordnet.
 *  - §23 StGB: Versuch eines Verbrechens stets strafbar; Versuch eines
 *    Vergehens nur bei ausdrücklicher Bestimmung.
 */

const VERIFIED_AT = '2026-10-02';

const BIBEL_SOURCE: OffenseSource = {
  sourceType: 'SOURCE_BIBEL',
  sourceReference: '34a_bibel_v5_3_1.txt (VERIFIED_OFFICIAL_TEXT)',
  lastVerified: VERIFIED_AT,
};

const GII_SOURCE: OffenseSource = {
  sourceType: 'SOURCE_GESETZE_IM_INTERNET',
  sourceReference: 'https://www.gesetze-im-internet.de/stgb/',
  lastVerified: VERIFIED_AT,
};

const NOT_IN_BIBEL_SOURCE: OffenseSource = {
  sourceType: 'SOURCE_NOT_IN_BIBEL',
  sourceReference:
    '34a_bibel_v5_3_1.txt, Quellenregister 1.2 (in der V5.3 nicht enthalten); Wortlaut: gesetze-im-internet.de',
  lastVerified: VERIFIED_AT,
};

/** Anzeigenamen der Deliktsgruppen (Bibel-Kapitel 14). */
export const OFFENSE_CATEGORY_LABELS: Record<OffenseCategory, string> = {
  STRAFTATEN_GEGEN_PERSON: 'Straftaten gegen die Person (Leben/Freiheit)',
  EHRLICHKEITSDELIKTE: 'Ehrdelikte',
  KOERPERVERLETZUNG: 'Körperverletzungsdelikte',
  VERMOEGENSDELIKTE: 'Vermögensdelikte',
  DIEBSTAHL_UNTERSCHLAGUNG: 'Diebstahls- und Unterschlagungsdelikte',
  RAUB_ERPRESSUNG: 'Raub und Erpressung',
  SACHBESCHAEDIGUNG: 'Sachbeschädigungsdelikte',
  URKUNDENDELIKTE: 'Urkundendelikte',
  GEMEINGEFAEHRLICHE_DELIKTE: 'Gemeingefährliche und sonstige Delikte',
  AMTS_BEFUGNISDELIKTE: 'Amts- und Befugnisdelikte',
};

/** Reihenfolge der Deliktsgruppen in der Übersicht. */
export const OFFENSE_CATEGORY_ORDER: OffenseCategory[] = [
  'AMTS_BEFUGNISDELIKTE',
  'STRAFTATEN_GEGEN_PERSON',
  'EHRLICHKEITSDELIKTE',
  'KOERPERVERLETZUNG',
  'DIEBSTAHL_UNTERSCHLAGUNG',
  'RAUB_ERPRESSUNG',
  'VERMOEGENSDELIKTE',
  'SACHBESCHAEDIGUNG',
  'URKUNDENDELIKTE',
  'GEMEINGEFAEHRLICHE_DELIKTE',
];

/** Standardtexte, damit dieselben Formulierungen konsistent bleiben. */
const NO_MIN_FS = 'Geldstrafe bzw. keine gesetzliche Mindestfreiheitsstrafe';
const NO_NEGLIGENT =
  'Keine eigenständige fahrlässige Variante. Nach §15 StGB ist nur vorsätzliches Handeln strafbar.';

/** Grundlagen des Allgemeinen Teils, die die Einordnung erklären. */
export const LEGAL_BASICS: LegalBasicsEntry[] = [
  {
    id: 'stgb-12',
    paragraph: '§ 12',
    officialTitle: 'Verbrechen und Vergehen',
    officialText:
      '(1) Verbrechen sind rechtswidrige Taten, die im Mindestmaß mit Freiheitsstrafe von einem Jahr oder darüber bedroht sind. (2) Vergehen sind rechtswidrige Taten, die im Mindestmaß mit einer geringeren Freiheitsstrafe oder die mit Geldstrafe bedroht sind. (3) Schärfungen oder Milderungen, die nach den Vorschriften des Allgemeinen Teils oder für besonders schwere oder minder schwere Fälle vorgesehen sind, bleiben für die Einteilung außer Betracht.',
    explanation:
      'Die Einordnung richtet sich ausschließlich nach dem gesetzlichen Mindestmaß, nicht nach dem Höchstmaß und nicht nach der zu erwartenden Strafe. Schärfungen und Milderungen für besonders schwere oder minder schwere Fälle bleiben außer Betracht (§12 Abs. 3).',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__12.html',
    source: GII_SOURCE,
  },
  {
    id: 'stgb-15',
    paragraph: '§ 15',
    officialTitle: 'Vorsätzliches und fahrlässiges Handeln',
    officialText:
      'Strafbar ist nur vorsätzliches Handeln, wenn nicht das Gesetz fahrlässiges Handeln ausdrücklich mit Strafe bedroht.',
    explanation:
      'Vorsatz ist der Regelfall. Fahrlässigkeit ist nur strafbar, wenn das jeweilige Delikt sie ausdrücklich unter Strafe stellt (z. B. §229 StGB als eigenständige fahrlässige Körperverletzung).',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__15.html',
    source: BIBEL_SOURCE,
  },
  {
    id: 'stgb-22',
    paragraph: '§ 22',
    officialTitle: 'Begriffsbestimmung (Versuch)',
    officialText:
      'Eine Straftat versucht, wer nach seiner Vorstellung von der Tat zur Verwirklichung des Tatbestandes unmittelbar ansetzt.',
    explanation: 'Der Versuch beginnt mit dem unmittelbaren Ansetzen zur Tatbestandsverwirklichung.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__22.html',
    source: BIBEL_SOURCE,
  },
  {
    id: 'stgb-23',
    paragraph: '§ 23',
    officialTitle: 'Strafbarkeit des Versuchs',
    officialText:
      '(1) Der Versuch eines Verbrechens ist stets strafbar, der Versuch eines Vergehens nur dann, wenn das Gesetz es ausdrücklich bestimmt.',
    explanation:
      'Ob ein Versuch strafbar ist, folgt aus der Einordnung nach §12 StGB und einer etwaigen ausdrücklichen Anordnung im jeweiligen Tatbestand.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__23.html',
    source: BIBEL_SOURCE,
  },
];

/** Alle kuratierten Straftatbestände. */
export const CRIMINAL_OFFENSES: CriminalOffense[] = [
  // ---------------------------------------------------------------------------
  // Amts- und Befugnisdelikte
  // ---------------------------------------------------------------------------
  {
    id: 'stgb-132',
    law: 'StGB',
    paragraph: '§ 132',
    officialTitle: 'Amtsanmaßung',
    category: 'AMTS_BEFUGNISDELIKTE',
    protectedInterest: 'Staatliche Hoheitsordnung',
    objectiveElements: [
      'unbefugtes Sich-Befassen mit der Ausübung eines öffentlichen Amtes',
      'oder unbefugte Vornahme einer Handlung, die nur kraft eines öffentlichen Amtes vorgenommen werden darf',
    ],
    subjectiveElements: ['Vorsatz'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    minimumPenalty: NO_MIN_FS,
    maximumPenalty: 'Freiheitsstrafe bis zu zwei Jahren',
    classification: 'VERGEHEN',
    prosecution: {
      type: 'OFFIZIALDELIKT',
      explanation: 'Verfolgung von Amts wegen.',
    },
    attemptPunishable: false,
    attemptExplanation:
      'Versuch nicht ausdrücklich unter Strafe gestellt; §23 Abs. 1 StGB greift nicht ein (Vergehen).',
    explanation:
      'Die Norm schützt die staatliche Hoheitsordnung vor dem unbefugten Auftreten als Amtsträger bzw. der unbefugten Vornahme hoheitlicher Handlungen.',
    relevance:
      'Für Sicherheitskräfte zentral: Eine private Sicherheitskraft wird durch Uniform, Dienstausweis oder Tätigkeit nicht zum Polizeibeamten. Private Befugnis ≠ staatliche Hoheitsbefugnis.',
    securityNote:
      'Ein Sicherheitsmitarbeiter darf keine Maßnahmen ergreifen, die nur staatlichen Hoheitsträgern zustehen (z. B. Durchsuchung oder Identitätsfeststellung kraft Amtes).',
    distinctions: ['§132a StGB – Missbrauch von Titeln, Berufsbezeichnungen und Abzeichen'],
    officialText:
      'Wer unbefugt sich mit der Ausübung eines öffentlichen Amtes befaßt oder eine Handlung vornimmt, welche nur kraft eines öffentlichen Amtes vorgenommen werden darf, wird mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe bestraft.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__132.html',
    source: BIBEL_SOURCE,
  },
  {
    id: 'stgb-132a',
    law: 'StGB',
    paragraph: '§ 132a',
    officialTitle: 'Mißbrauch von Titeln, Berufsbezeichnungen und Abzeichen',
    category: 'AMTS_BEFUGNISDELIKTE',
    protectedInterest: 'Schutz bestimmter Amts-, Dienst- und Berufsbezeichnungen sowie Abzeichen',
    objectiveElements: [
      'unbefugtes Führen inländischer oder ausländischer Amts- oder Dienstbezeichnungen, akademischer Grade, Titel oder öffentlicher Würden',
      'unbefugtes Führen bestimmter Berufsbezeichnungen (z. B. Rechtsanwalt)',
      'unbefugtes Führen der Bezeichnung öffentlich bestellter Sachverständiger',
      'unbefugtes Tragen inländischer oder ausländischer Uniformen, Amtskleidungen oder Amtsabzeichen',
    ],
    subjectiveElements: ['Vorsatz'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    minimumPenalty: NO_MIN_FS,
    maximumPenalty: 'Freiheitsstrafe bis zu einem Jahr',
    classification: 'VERGEHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: false,
    attemptExplanation:
      'Versuch nicht ausdrücklich unter Strafe gestellt; Vergehen nach §12 StGB.',
    explanation:
      'Die Norm schützt die geschützte Verwendung bestimmter Titel, Berufsbezeichnungen und Abzeichen sowie ihnen zum Verwechseln ähnlicher Bezeichnungen.',
    relevance:
      'Für Sicherheitskräfte relevant: Eine Dienstkleidung darf nicht den Anschein einer Polizei- oder Amtsuniform erwecken.',
    distinctions: ['§132 StGB – Amtsanmaßung'],
    officialText:
      '(1) Wer unbefugt 1. inländische oder ausländische Amts- oder Dienstbezeichnungen, akademische Grade, Titel oder öffentliche Würden führt, ... 4. inländische oder ausländische Uniformen, Amtskleidungen oder Amtsabzeichen trägt, wird mit Freiheitsstrafe bis zu einem Jahr oder mit Geldstrafe bestraft. (2) Den in Absatz 1 genannten Bezeichnungen ... stehen solche gleich, die ihnen zum Verwechseln ähnlich sind.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__132a.html',
    source: BIBEL_SOURCE,
  },

  // ---------------------------------------------------------------------------
  // Straftaten gegen die Person (Leben / Freiheit)
  // ---------------------------------------------------------------------------
  {
    id: 'stgb-123',
    law: 'StGB',
    paragraph: '§ 123',
    officialTitle: 'Hausfriedensbruch',
    category: 'STRAFTATEN_GEGEN_PERSON',
    protectedInterest: 'Hausrecht / befriedeter Besitz',
    objectiveElements: [
      'geschützter Bereich: Wohnung, Geschäftsräume, befriedetes Besitztum oder abgeschlossene Räume, die zum öffentlichen Dienst oder Verkehr bestimmt sind',
      'widerrechtliches Eindringen gegen den Willen des Berechtigten',
      'oder unbefugtes Verweilen und Nicht-Entfernen trotz Aufforderung des Berechtigten',
    ],
    subjectiveElements: ['Vorsatz'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    minimumPenalty: NO_MIN_FS,
    maximumPenalty: 'Freiheitsstrafe bis zu einem Jahr',
    classification: 'VERGEHEN',
    prosecution: {
      type: 'ANTRAGSDELIKT',
      applicationType: 'ABSOLUTES_ANTRAGSDELIKT',
      applicationNorm: '§ 123 Abs. 2 StGB',
      explanation: 'Die Tat wird nur auf Antrag verfolgt (§123 Abs. 2 StGB).',
    },
    attemptPunishable: false,
    attemptExplanation:
      'Versuch nicht ausdrücklich unter Strafe gestellt; Vergehen nach §12 StGB.',
    explanation:
      'Hausfriedensbruch ist das widerrechtliche Eindringen in einen geschützten Bereich oder das Verweilen trotz Aufforderung des Berechtigten, sich zu entfernen.',
    relevance:
      'Für Sicherheitskräfte besonders relevant: Hausrecht, Hausverbot und die Aufforderung zum Verlassen sind zu unterscheiden. Der mögliche Hausfriedensbruch beantwortet nicht automatisch, welche Handlung die Sicherheitskraft selbst vornehmen darf.',
    securityNote:
      'Ein Hausverbot begründet keine automatische Gewaltbefugnis. Die konkrete eigene Befugnis (z. B. §859 BGB) ist gesondert zu prüfen.',
    distinctions: ['§240 StGB – Nötigung', '§124 StGB – schwerer Hausfriedensbruch'],
    officialText:
      '(1) Wer in die Wohnung, in die Geschäftsräume oder in das befriedete Besitztum eines anderen oder in abgeschlossene Räume, welche zum öffentlichen Dienst oder Verkehr bestimmt sind, widerrechtlich eindringt, oder wer, wenn er ohne Befugnis darin verweilt, auf die Aufforderung des Berechtigten sich nicht entfernt, wird mit Freiheitsstrafe bis zu einem Jahr oder mit Geldstrafe bestraft. (2) Die Tat wird nur auf Antrag verfolgt.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__123.html',
    source: BIBEL_SOURCE,
  },
  {
    id: 'stgb-239',
    law: 'StGB',
    paragraph: '§ 239',
    officialTitle: 'Freiheitsberaubung',
    category: 'STRAFTATEN_GEGEN_PERSON',
    protectedInterest: 'Fortbewegungsfreiheit / persönliche Freiheit',
    objectiveElements: [
      'Einsperren eines Menschen (räumliche Abgeschlossenheit)',
      'oder auf andere Weise der Freiheit berauben (Aufhebung der Fortbewegungsfreiheit)',
    ],
    subjectiveElements: ['Vorsatz'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    minimumPenalty: NO_MIN_FS,
    maximumPenalty: 'Freiheitsstrafe bis zu fünf Jahren',
    classification: 'VERGEHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: true,
    attemptExplanation: 'Der Versuch ist nach §239 Abs. 2 StGB ausdrücklich strafbar.',
    explanation:
      'Freiheitsberaubung ist das Einsperren oder sonstige Berauben der Fortbewegungsfreiheit eines Menschen.',
    relevance:
      'Für Sicherheitskräfte besonders sensibel: Jedes Festhalten gegen den Willen kann den Tatbestand berühren. Eine eigene Befugnis (z. B. §127 StPO) muss gesondert geprüft werden und ist zeitlich begrenzt.',
    securityNote:
      'Ein möglicher Diebstahl rechtfertigt nicht automatisch ein beliebig langes Festhalten. Die Dauer muss auf das Erforderliche beschränkt bleiben.',
    distinctions: ['§240 StGB – Nötigung', '§127 StPO – vorläufige Festnahme (Befugnis, kein Tatbestand)'],
    officialText:
      '(1) Wer einen Menschen einsperrt oder auf andere Weise der Freiheit beraubt, wird mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe bestraft. (2) Der Versuch ist strafbar. (3) ... (4) Verursacht der Täter ... den Tod des Opfers, so ist die Strafe Freiheitsstrafe nicht unter drei Jahren.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__239.html',
    source: GII_SOURCE,
  },
  {
    id: 'stgb-240',
    law: 'StGB',
    paragraph: '§ 240',
    officialTitle: 'Nötigung',
    category: 'STRAFTATEN_GEGEN_PERSON',
    protectedInterest: 'Freiheit der Willensentschließung und Willensbetätigung',
    objectiveElements: [
      'Nötigungsopfer: ein Mensch',
      'Nötigungsmittel: Gewalt oder Drohung mit einem empfindlichen Übel',
      'Nötigungserfolg: Handlung, Duldung oder Unterlassung',
      'Kausalität zwischen Nötigungsmittel und Nötigungserfolg',
    ],
    subjectiveElements: ['Vorsatz'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    minimumPenalty: NO_MIN_FS,
    maximumPenalty:
      'Freiheitsstrafe bis zu drei Jahren (besonders schwerer Fall: sechs Monate bis fünf Jahre)',
    classification: 'VERGEHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: true,
    attemptExplanation: 'Der Versuch ist nach §240 Abs. 3 StGB ausdrücklich strafbar.',
    explanation:
      'Nötigung ist das rechtswidrige Zwingen eines Menschen mit Gewalt oder Drohung mit einem empfindlichen Übel zu einer Handlung, Duldung oder Unterlassung.',
    relevance:
      'Für Sicherheitskräfte zentral: Eine Person darf nicht allein deshalb mit Gewalt zu einem Verhalten gezwungen werden, weil die Sicherheitskraft es für wünschenswert hält. Vor jeder Zwangshandlung ist die konkrete Rechtsgrundlage und das mildeste Mittel zu prüfen.',
    securityNote:
      'Die Rechtswidrigkeit richtet sich nach der besonderen Verwerflichkeitsprüfung des §240 Abs. 2 StGB. Nicht jede Gewaltanwendung oder Drohung erfüllt automatisch den rechtswidrigen Tatbestand.',
    distinctions: ['§241 StGB – Bedrohung', '§253 StGB – Erpressung'],
    officialText:
      '(1) Wer einen Menschen rechtswidrig mit Gewalt oder durch Drohung mit einem empfindlichen Übel zu einer Handlung, Duldung oder Unterlassung nötigt, wird mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe bestraft. (2) Rechtswidrig ist die Tat, wenn die Anwendung der Gewalt oder die Androhung des Übels zu dem angestrebten Zweck als verwerflich anzusehen ist. (3) Der Versuch ist strafbar. (4) In besonders schweren Fällen ... sechs Monaten bis zu fünf Jahren ...',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__240.html',
    source: BIBEL_SOURCE,
  },
  {
    id: 'stgb-241',
    law: 'StGB',
    paragraph: '§ 241',
    officialTitle: 'Bedrohung',
    category: 'STRAFTATEN_GEGEN_PERSON',
    protectedInterest: 'Rechtsfrieden / persönliche Sicherheit',
    objectiveElements: [
      'Bedrohung eines Menschen',
      'mit der Begehung einer gegen ihn oder eine ihm nahestehende Person gerichteten rechtswidrigen Tat gegen die sexuelle Selbstbestimmung, die körperliche Unversehrtheit, die persönliche Freiheit oder gegen eine Sache von bedeutendem Wert (Abs. 1)',
      'oder mit der Begehung eines Verbrechens (Abs. 2)',
    ],
    subjectiveElements: ['Vorsatz'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    minimumPenalty: NO_MIN_FS,
    maximumPenalty: 'Freiheitsstrafe bis zu einem Jahr (Abs. 2: bis zu zwei Jahren)',
    classification: 'VERGEHEN',
    prosecution: {
      type: 'OFFIZIALDELIKT',
      explanation:
        'Nach herrschender Auffassung Offizialdelikt. §241 Abs. 5 StGB verweist für den Strafantrag auf die Vorschriften der angedrohten Tat.',
    },
    attemptPunishable: false,
    attemptExplanation:
      'Versuch nicht ausdrücklich unter Strafe gestellt; Vergehen nach §12 StGB.',
    explanation:
      'Bedrohung ist das In-Aussicht-Stellen einer bestimmten rechtswidrigen Tat gegen eine Person oder eine bedeutende Sache.',
    relevance:
      'Für Sicherheitskräfte relevant: Bedrohungen im Eingangs- oder Türbereich ernst nehmen, dokumentieren und ggf. die Polizei verständigen.',
    distinctions: ['§240 StGB – Nötigung (verlangt ein Handeln/Dulden/Unterlassen)'],
    officialText:
      '(1) Wer einen Menschen mit der Begehung einer gegen ihn oder eine ihm nahestehende Person gerichteten rechtswidrigen Tat gegen die sexuelle Selbstbestimmung, die körperliche Unversehrtheit, die persönliche Freiheit oder gegen eine Sache von bedeutendem Wert bedroht, wird mit Freiheitsstrafe bis zu einem Jahr oder mit Geldstrafe bestraft. (2) Wer einen Menschen mit der Begehung eines gegen ihn ... gerichteten Verbrechens bedroht, wird mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe bestraft.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__241.html',
    source: GII_SOURCE,
  },

  // ---------------------------------------------------------------------------
  // Ehrdelikte
  // ---------------------------------------------------------------------------
  {
    id: 'stgb-185',
    law: 'StGB',
    paragraph: '§ 185',
    officialTitle: 'Beleidigung',
    category: 'EHRLICHKEITSDELIKTE',
    protectedInterest: 'Ehre',
    objectiveElements: [
      'konkrete Äußerung oder Handlung',
      'objektiv ehrverletzender Erklärungsgehalt',
      'Bezug zur betroffenen Person (Kundgabe gegenüber dem Betroffenen oder Dritten)',
    ],
    subjectiveElements: ['Vorsatz'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    minimumPenalty: NO_MIN_FS,
    maximumPenalty:
      'Freiheitsstrafe bis zu einem Jahr (qualifizierte Begehungsformen: bis zu zwei Jahren)',
    classification: 'VERGEHEN',
    prosecution: {
      type: 'ANTRAGSDELIKT',
      applicationType: 'ABSOLUTES_ANTRAGSDELIKT',
      applicationNorm: '§ 194 StGB',
      explanation:
        'Die Beleidigung wird nur auf Antrag verfolgt (§194 Abs. 1 StGB). Gesetzlich geregelte Ausnahmen (z. B. §194 Abs. 1 Sätze 2 und 3 StGB) sind möglich.',
    },
    attemptPunishable: false,
    attemptExplanation:
      'Versuch nicht ausdrücklich unter Strafe gestellt; Vergehen nach §12 StGB.',
    explanation:
      'Beleidigung ist der Angriff auf die Ehre eines anderen durch eine ehrverletzende Kundgabe. Nicht jede unhöfliche oder schroffe Äußerung ist automatisch strafbar; Inhalt und Kontext sind zu prüfen.',
    relevance:
      'Beleidigende Äußerungen kommen im Sicherheitsdienst häufig vor. Die Sicherheitskraft muss zwischen unangenehmer Äußerung und strafbarer Beleidigung unterscheiden.',
    distinctions: ['§186 StGB – Üble Nachrede (Tatsachenbehauptung)', '§187 StGB – Verleumdung (wider besseres Wissen)'],
    officialText:
      'Die Beleidigung wird mit Freiheitsstrafe bis zu einem Jahr oder mit Geldstrafe und, wenn die Beleidigung öffentlich, in einer Versammlung, durch Verbreiten eines Inhalts (§ 11 Absatz 3) oder mittels einer Tätlichkeit begangen wird, mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe bestraft.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__185.html',
    source: BIBEL_SOURCE,
  },
  {
    id: 'stgb-186',
    law: 'StGB',
    paragraph: '§ 186',
    officialTitle: 'Üble Nachrede',
    category: 'EHRLICHKEITSDELIKTE',
    protectedInterest: 'Ehre',
    objectiveElements: [
      'Behaupten oder Verbreiten einer Tatsache in Beziehung auf einen anderen',
      'die Tatsache ist geeignet, den anderen verächtlich zu machen oder in der öffentlichen Meinung herabzuwürdigen',
      'die Tatsache ist nicht erweislich wahr',
    ],
    subjectiveElements: ['Vorsatz'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    minimumPenalty: NO_MIN_FS,
    maximumPenalty:
      'Freiheitsstrafe bis zu einem Jahr (öffentlich/in Versammlung: bis zu zwei Jahren)',
    classification: 'VERGEHEN',
    prosecution: {
      type: 'ANTRAGSDELIKT',
      applicationType: 'ABSOLUTES_ANTRAGSDELIKT',
      applicationNorm: '§ 194 StGB',
      explanation: 'Verfolgung nur auf Antrag (§194 Abs. 1 StGB).',
    },
    attemptPunishable: false,
    attemptExplanation: 'Versuch nicht ausdrücklich unter Strafe gestellt; Vergehen nach §12 StGB.',
    explanation:
      'Üble Nachrede ist das Behaupten oder Verbreiten einer nicht erweislich wahren, ehrverletzenden Tatsache.',
    relevance:
      'Abgrenzung zur Beleidigung: Bei §186 wird eine Tatsache behauptet, bei §185 wird eine Wertung/ehrverletzende Kundgabe geäußert.',
    distinctions: ['§185 StGB – Beleidigung (Werturteil)', '§187 StGB – Verleumdung (wider besseres Wissen)'],
    officialText:
      'Wer in Beziehung auf einen anderen eine Tatsache behauptet oder verbreitet, welche denselben verächtlich zu machen oder in der öffentlichen Meinung herabzuwürdigen geeignet ist, wird, wenn nicht diese Tatsache erweislich wahr ist, mit Freiheitsstrafe bis zu einem Jahr oder mit Geldstrafe und, wenn die Tat öffentlich, in einer Versammlung oder durch Verbreiten eines Inhalts (§ 11 Absatz 3) begangen ist, mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe bestraft.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__186.html',
    source: GII_SOURCE,
  },
  {
    id: 'stgb-187',
    law: 'StGB',
    paragraph: '§ 187',
    officialTitle: 'Verleumdung',
    category: 'EHRLICHKEITSDELIKTE',
    protectedInterest: 'Ehre',
    objectiveElements: [
      'Behaupten oder Verbreiten einer unwahren Tatsache in Beziehung auf einen anderen',
      'wider besseres Wissen',
      'die Tatsache ist geeignet, den anderen verächtlich zu machen, herabzuwürdigen oder dessen Kredit zu gefährden',
    ],
    subjectiveElements: ['Vorsatz', 'Handeln wider besseres Wissen (Kenntnis der Unwahrheit)'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    specialSubjectiveElements: ['Handeln wider besseres Wissen'],
    minimumPenalty: NO_MIN_FS,
    maximumPenalty:
      'Freiheitsstrafe bis zu zwei Jahren (öffentlich/in Versammlung: bis zu fünf Jahren)',
    classification: 'VERGEHEN',
    prosecution: {
      type: 'ANTRAGSDELIKT',
      applicationType: 'ABSOLUTES_ANTRAGSDELIKT',
      applicationNorm: '§ 194 StGB',
      explanation: 'Verfolgung nur auf Antrag (§194 Abs. 1 StGB).',
    },
    attemptPunishable: false,
    attemptExplanation: 'Versuch nicht ausdrücklich unter Strafe gestellt; Vergehen nach §12 StGB.',
    explanation:
      'Verleumdung ist die Behauptung oder Verbreitung einer unwahren, ehrverletzenden Tatsache wider besseres Wissen.',
    relevance:
      'Abgrenzung zur üblen Nachrede: §187 verlangt positives Wissen von der Unwahrheit, §186 genügt die nicht erweisliche Wahrheit.',
    distinctions: ['§186 StGB – Üble Nachrede', '§185 StGB – Beleidigung'],
    officialText:
      'Wer wider besseres Wissen in Beziehung auf einen anderen eine unwahre Tatsache behauptet oder verbreitet, welche denselben verächtlich zu machen oder in der öffentlichen Meinung herabzuwürdigen oder dessen Kredit zu gefährden geeignet ist, wird mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe und, wenn die Tat öffentlich, in einer Versammlung oder durch Verbreiten eines Inhalts (§ 11 Absatz 3) begangen ist, mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe bestraft.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__187.html',
    source: GII_SOURCE,
  },

  // ---------------------------------------------------------------------------
  // Körperverletzungsdelikte
  // ---------------------------------------------------------------------------
  {
    id: 'stgb-223',
    law: 'StGB',
    paragraph: '§ 223',
    officialTitle: 'Körperverletzung',
    category: 'KOERPERVERLETZUNG',
    protectedInterest: 'Körperliche Unversehrtheit und Gesundheit',
    objectiveElements: [
      'andere Person',
      'körperliche Misshandlung (üble, unangemessene Behandlung)',
      'oder Gesundheitsschädigung (Hervorrufen oder Steigern eines krankhaften Zustands)',
    ],
    subjectiveElements: ['Vorsatz'],
    intentRequired: true,
    negligence: {
      intentional: true,
      negligentVariant: true,
      negligentNorm: '§ 229 StGB',
      explanation:
        '§223 StGB erfordert Vorsatz. Die fahrlässige Begehung ist in der eigenständigen Norm §229 StGB unter Strafe gestellt.',
    },
    minimumPenalty: NO_MIN_FS,
    maximumPenalty: 'Freiheitsstrafe bis zu fünf Jahren',
    classification: 'VERGEHEN',
    prosecution: {
      type: 'ANTRAGSDELIKT',
      applicationType: 'RELATIVES_ANTRAGSDELIKT',
      applicationNorm: '§ 230 StGB',
      explanation:
        'Die vorsätzliche Körperverletzung wird nur auf Antrag verfolgt, es sei denn, die Strafverfolgungsbehörde hält wegen besonderen öffentlichen Interesses ein Einschreiten von Amts wegen für geboten (§230 Abs. 1 StGB).',
    },
    attemptPunishable: true,
    attemptExplanation: 'Der Versuch ist in §223 Abs. 2 StGB ausdrücklich strafbar.',
    explanation:
      'Körperverletzung ist die körperliche Misshandlung oder Gesundheitsschädigung einer anderen Person.',
    relevance:
      'Für Sicherheitskräfte zentral: Jede körperliche Einwirkung auf eine Person ist am Tatbestand zu messen. Notwehr (§32 StGB) oder Notstand können rechtfertigen, müssen aber gesondert geprüft werden.',
    securityNote:
      'Zwangsmaßnahmen (z. B. Fixieren) sind nur im Rahmen einer konkreten Befugnis und nur erforderlich zulässig.',
    distinctions: [
      '§224 StGB – Gefährliche Körperverletzung',
      '§229 StGB – Fahrlässige Körperverletzung',
    ],
    officialText:
      'Wer eine andere Person körperlich mißhandelt oder an der Gesundheit schädigt, wird mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe bestraft. Der Versuch ist strafbar.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__223.html',
    source: BIBEL_SOURCE,
  },
  {
    id: 'stgb-224',
    law: 'StGB',
    paragraph: '§ 224',
    officialTitle: 'Gefährliche Körperverletzung',
    category: 'KOERPERVERLETZUNG',
    protectedInterest: 'Körperliche Unversehrtheit und Gesundheit',
    objectiveElements: [
      'eine Körperverletzung nach §223 StGB',
      'und mindestens eine gesetzliche Begehungsweise: Beibringung von Gift oder gesundheitsschädlichen Stoffen; Waffe oder anderes gefährliches Werkzeug; hinterlistiger Überfall; gemeinschaftliche Begehung mit einem anderen Beteiligten; lebensgefährdende Behandlung',
    ],
    subjectiveElements: ['Vorsatz', 'Vorsatz bezüglich der jeweiligen Qualifikation'],
    intentRequired: true,
    negligence: {
      intentional: true,
      negligentVariant: true,
      negligentNorm: '§ 229 StGB',
      explanation:
        '§224 StGB erfordert Vorsatz. Eine fahrlässige Begehung kann über die eigenständige Norm §229 StGB in Betracht kommen, nicht über §224 selbst.',
    },
    minimumPenalty: 'Freiheitsstrafe nicht unter sechs Monaten',
    maximumPenalty:
      'Freiheitsstrafe bis zu zehn Jahren (minder schwere Fälle: drei Monate bis fünf Jahre)',
    classification: 'VERGEHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: true,
    attemptExplanation: 'Der Versuch ist in §224 Abs. 2 StGB ausdrücklich strafbar.',
    explanation:
      '§224 StGB ist eine Qualifikation zu §223 StGB: Körperverletzung plus eine gesetzlich bestimmte gefährliche Begehungsweise.',
    relevance:
      'Nicht jede Körperverletzung ist automatisch gefährlich. Zuerst ist §223 zu prüfen, danach die konkrete Begehungsweise nach §224.',
    securityNote:
      'Der Einsatz eines gefährlichen Werkzeugs kann die Qualifikation auslösen. Deeskalation und Eigensicherung stehen deshalb im Vordergrund.',
    distinctions: ['§223 StGB – einfache Körperverletzung', '§226 StGB – schwere Körperverletzung'],
    officialText:
      '(1) Wer die Körperverletzung 1. durch Beibringung von Gift oder anderen gesundheitsschädlichen Stoffen, 2. mittels einer Waffe oder eines anderen gefährlichen Werkzeugs, 3. mittels eines hinterlistigen Überfalls, 4. mit einem anderen Beteiligten gemeinschaftlich oder 5. mittels einer das Leben gefährdenden Behandlung begeht, wird mit Freiheitsstrafe von sechs Monaten bis zu zehn Jahren, in minder schweren Fällen mit Freiheitsstrafe von drei Monaten bis zu fünf Jahren bestraft. (2) Der Versuch ist strafbar.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__224.html',
    source: BIBEL_SOURCE,
  },
  {
    id: 'stgb-226',
    law: 'StGB',
    paragraph: '§ 226',
    officialTitle: 'Schwere Körperverletzung',
    category: 'KOERPERVERLETZUNG',
    protectedInterest: 'Körperliche Unversehrtheit und Gesundheit',
    objectiveElements: [
      'eine Körperverletzung nach §§223 bis 225 StGB',
      'und eine gesetzlich bestimmte schwere Folge (z. B. Verlust des Sehvermögens, des Gehörs, des Sprechvermögens oder der Fortpflanzungsfähigkeit; Verlust oder dauernde Gebrauchsunfähigkeit eines wichtigen Gliedes; erhebliche dauernde Entstellung; Siechtum, Lähmung, geistige Krankheit oder Behinderung)',
    ],
    subjectiveElements: [
      'Vorsatz bezüglich der Körperverletzung',
      'Absatz 2: Absicht oder Wissentlichkeit bezüglich der schweren Folge',
    ],
    intentRequired: true,
    negligence: {
      intentional: true,
      negligentVariant: false,
      explanation:
        'Für die schwere Folge genügt in Absatz 1 Fahrlässigkeit; §226 selbst ist jedoch keine eigenständige fahrlässige Strafnorm. Die fahrlässige Körperverletzung bleibt §229 StGB.',
    },
    minimumPenalty: 'Freiheitsstrafe nicht unter einem Jahr',
    maximumPenalty:
      'Freiheitsstrafe bis zu zehn Jahren (Abs. 2: nicht unter drei Jahren; minder schwere Fälle nach Abs. 3)',
    classification: 'VERBRECHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: true,
    attemptExplanation:
      '§226 StGB ist Verbrechen (Mindestmaß Freiheitsstrafe ein Jahr); der Versuch ist nach §23 Abs. 1 StGB stets strafbar.',
    explanation:
      'Schwere Körperverletzung setzt eine Körperverletzung und zusätzlich eine gesetzlich bestimmte schwere Folge voraus.',
    relevance:
      'Eine starke Verletzung allein genügt nicht. Zuerst die konkrete Folge feststellen, dann mit dem gesetzlichen Katalog abgleichen.',
    distinctions: ['§224 StGB – gefährliche Begehungsweise', '§227 StGB – Todesfolge'],
    officialText:
      '(1) Hat die Körperverletzung zur Folge, daß die verletzte Person 1. das Sehvermögen auf einem Auge oder beiden Augen, das Gehör, das Sprechvermögen oder die Fortpflanzungsfähigkeit verliert, 2. ein wichtiges Glied des Körpers verliert oder dauernd nicht mehr gebrauchen kann oder 3. in erheblicher Weise dauernd entstellt wird oder in Siechtum, Lähmung oder geistige Krankheit oder Behinderung verfällt, so ist die Strafe Freiheitsstrafe von einem Jahr bis zu zehn Jahren. (2) Verursacht der Täter eine der in Absatz 1 bezeichneten Folgen absichtlich oder wissentlich, so ist die Strafe Freiheitsstrafe nicht unter drei Jahren.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__226.html',
    source: BIBEL_SOURCE,
  },
  {
    id: 'stgb-227',
    law: 'StGB',
    paragraph: '§ 227',
    officialTitle: 'Körperverletzung mit Todesfolge',
    category: 'KOERPERVERLETZUNG',
    protectedInterest: 'Leben und körperliche Unversehrtheit',
    objectiveElements: [
      'eine Körperverletzung nach §§223 bis 226 StGB',
      'und der dadurch verursachte Tod der verletzten Person',
      'Kausalität und objektive Zurechnung zwischen Körperverletzung und Tod',
    ],
    subjectiveElements: [
      'Vorsatz bezüglich der Körperverletzung',
      'Fahrlässigkeit bezüglich des Todes (erfolgsqualifiziertes Delikt)',
    ],
    intentRequired: true,
    negligence: {
      intentional: true,
      negligentVariant: false,
      explanation:
        'Erfolgsqualifiziertes Delikt: Vorsatz zur Grundtat, Fahrlässigkeit zur schweren Folge (Tod). Keine eigenständige fahrlässige Strafnorm.',
    },
    minimumPenalty: 'Freiheitsstrafe nicht unter drei Jahren',
    maximumPenalty: 'Freiheitsstrafe bis zu fünfzehn Jahren (minder schwere Fälle: ein Jahr bis zehn Jahre)',
    classification: 'VERBRECHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: false,
    attemptExplanation:
      'Als erfolgsqualifiziertes Delikt ist der Versuch der Todesfolge nicht strafbar; in Betracht kommt der Versuch der Grundtat (§§223, 224 StGB).',
    explanation:
      'Körperverletzung mit Todesfolge liegt vor, wenn der Täter durch die Körperverletzung den Tod der verletzten Person verursacht.',
    relevance:
      'Für Sicherheitskräfte: Bei erkennbarer Gefährdung (z. B. Kopfverletzung) Rettungsdienst und Erste Hilfe sind vorrangig.',
    distinctions: ['§226 StGB – schwere Folge (nicht Tod)'],
    officialText:
      'Hat der Täter durch die Körperverletzung (§§ 223 bis 226) den Tod der verletzten Person verursacht, so ist die Strafe Freiheitsstrafe nicht unter drei Jahren. In minder schweren Fällen ist auf Freiheitsstrafe von einem Jahr bis zu zehn Jahren zu erkennen.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__227.html',
    source: BIBEL_SOURCE,
  },
  {
    id: 'stgb-229',
    law: 'StGB',
    paragraph: '§ 229',
    officialTitle: 'Fahrlässige Körperverletzung',
    category: 'KOERPERVERLETZUNG',
    protectedInterest: 'Körperliche Unversehrtheit und Gesundheit',
    objectiveElements: [
      'Körperverletzung einer anderen Person (wie §223 StGB)',
      'verursacht durch Fahrlässigkeit (Verletzung der im Verkehr erforderlichen Sorgfalt)',
    ],
    subjectiveElements: ['Kein Vorsatz erforderlich – Fahrlässigkeit genügt'],
    intentRequired: false,
    negligence: {
      intentional: false,
      negligentVariant: true,
      negligentNorm: '§ 229 StGB',
      explanation:
        'Eigenständige fahrlässige Strafnorm nach §15 StGB. Vorsätzliche Begehung wird über §223 StGB erfasst.',
    },
    minimumPenalty: NO_MIN_FS,
    maximumPenalty: 'Freiheitsstrafe bis zu drei Jahren',
    classification: 'VERGEHEN',
    prosecution: {
      type: 'ANTRAGSDELIKT',
      applicationType: 'RELATIVES_ANTRAGSDELIKT',
      applicationNorm: '§ 230 StGB',
      explanation:
        'Die fahrlässige Körperverletzung wird nur auf Antrag verfolgt, es sei denn, die Strafverfolgungsbehörde hält wegen besonderen öffentlichen Interesses ein Einschreiten von Amts wegen für geboten (§230 Abs. 1 StGB).',
    },
    attemptPunishable: false,
    attemptExplanation: 'Der Versuch der Fahrlässigkeitstat ist nicht strafbar.',
    explanation:
      'Fahrlässige Körperverletzung ist die sorgfaltswidrige Verursachung einer Körperverletzung ohne Vorsatz.',
    relevance:
      'Für Sicherheitskräfte relevant: Sorgfaltspflichten bei Maßnahmen (z. B. unsachgemäßes Fixieren) können eine fahrlässige Körperverletzung begründen.',
    distinctions: ['§223 StGB – vorsätzliche Körperverletzung', '§15 StGB – Grundsatz Vorsatz/Fahrlässigkeit'],
    officialText:
      'Wer durch Fahrlässigkeit die Körperverletzung einer anderen Person verursacht, wird mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe bestraft.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__229.html',
    source: GII_SOURCE,
  },
  {
    id: 'stgb-231',
    law: 'StGB',
    paragraph: '§ 231',
    officialTitle: 'Beteiligung an einer Schlägerei',
    category: 'KOERPERVERLETZUNG',
    protectedInterest: 'Leben und körperliche Unversehrtheit',
    objectiveElements: [
      'Beteiligung an einer Schlägerei oder an einem von mehreren verübten Angriff',
      'und dadurch verursachter Tod eines Menschen oder schwere Körperverletzung (§226 StGB)',
    ],
    subjectiveElements: ['Vorsatz bezüglich der Beteiligung'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    minimumPenalty: NO_MIN_FS,
    maximumPenalty: 'Freiheitsstrafe bis zu drei Jahren',
    classification: 'VERGEHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: false,
    attemptExplanation:
      'Versuch nicht ausdrücklich unter Strafe gestellt; Vergehen nach §12 StGB.',
    explanation:
      'Wer sich an einer Schlägerei oder einem von mehreren verübten Angriff beteiligt, wird schon wegen der Beteiligung bestraft, wenn dadurch der Tod eines Menschen oder eine schwere Körperverletzung verursacht wurde.',
    relevance:
      'Für Sicherheitskräfte: Bei Schlägereien Personen trennen, Verstärkung rufen und Rettungsdienst verständigen; eigene Beteiligung vermeiden.',
    securityNote:
      'Nach §231 Abs. 2 StGB ist nicht strafbar, wer beteiligt war, ohne dass ihm dies vorzuwerfen ist.',
    distinctions: ['§223/§224 StGB – eigene Körperverletzungshandlung'],
    officialText:
      '(1) Wer sich an einer Schlägerei oder an einem von mehreren verübten Angriff beteiligt, wird schon wegen dieser Beteiligung mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe bestraft, wenn durch die Schlägerei oder den Angriff der Tod eines Menschen oder eine schwere Körperverletzung (§ 226) verursacht worden ist. (2) Nach Absatz 1 ist nicht strafbar, wer an der Schlägerei oder dem Angriff beteiligt war, ohne daß ihm dies vorzuwerfen ist.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__231.html',
    source: GII_SOURCE,
  },

  // ---------------------------------------------------------------------------
  // Diebstahls- und Unterschlagungsdelikte
  // ---------------------------------------------------------------------------
  {
    id: 'stgb-242',
    law: 'StGB',
    paragraph: '§ 242',
    officialTitle: 'Diebstahl',
    category: 'DIEBSTAHL_UNTERSCHLAGUNG',
    protectedInterest: 'Eigentum und Gewahrsam',
    objectiveElements: [
      'fremde Sache (nicht im Alleineigentum des Täters)',
      'bewegliche Sache',
      'Wegnahme = Bruch fremden und Begründung neuen Gewahrsams',
    ],
    subjectiveElements: ['Vorsatz', 'Absicht rechtswidriger Zueignung'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    specialSubjectiveElements: [
      'Absicht rechtswidriger Zueignung (Aneignung + Enteignungsvorsatz)',
    ],
    minimumPenalty: NO_MIN_FS,
    maximumPenalty: 'Freiheitsstrafe bis zu fünf Jahren',
    classification: 'VERGEHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: true,
    attemptExplanation: 'Der Versuch ist in §242 Abs. 2 StGB ausdrücklich strafbar.',
    explanation:
      'Diebstahl ist die Wegnahme einer fremden beweglichen Sache in der Absicht rechtswidriger Zueignung.',
    relevance:
      'Ein möglicher Diebstahl beantwortet nicht automatisch die Frage, ob und wie lange festgehalten werden darf. Dafür ist insbesondere §127 StPO gesondert zu prüfen.',
    securityNote:
      'Straftat und eigene Befugnis sind getrennte Prüfschritte: §242 erfüllt ≠ §127 StPO automatisch erfüllt.',
    distinctions: ['§246 StGB – Unterschlagung', '§249 StGB – Raub', '§243/§244 StGB – Qualifikationen'],
    officialText:
      '(1) Wer eine fremde bewegliche Sache einem anderen in der Absicht wegnimmt, die Sache sich oder einem Dritten rechtswidrig zuzueignen, wird mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe bestraft. (2) Der Versuch ist strafbar.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__242.html',
    source: BIBEL_SOURCE,
  },
  {
    id: 'stgb-243',
    law: 'StGB',
    paragraph: '§ 243',
    officialTitle: 'Besonders schwerer Fall des Diebstahls',
    category: 'DIEBSTAHL_UNTERSCHLAGUNG',
    protectedInterest: 'Eigentum und Gewahrsam',
    objectiveElements: [
      'ein Diebstahl nach §242 StGB',
      'und ein gesetzliches Regelbeispiel eines besonders schweren Falls (z. B. Einbruch/Eindringen in bestimmte Räume; besonders gesicherte Sache; gewerbsmäßiger Diebstahl; Ausnutzen von Hilflosigkeit, Unglücksfall oder gemeiner Gefahr)',
    ],
    subjectiveElements: ['Vorsatz; bezüglich der Regelbeispiele die entsprechenden Umstände'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    minimumPenalty: 'Freiheitsstrafe nicht unter drei Monaten',
    maximumPenalty: 'Freiheitsstrafe bis zu zehn Jahren',
    classification: 'VERGEHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: true,
    attemptExplanation:
      'Der Versuch des Diebstahls ist über §242 Abs. 2 StGB strafbar; §243 ist kein eigenständiger Grundtatbestand.',
    explanation:
      '§243 StGB ist kein eigener Grundtatbestand, sondern ein Regelbeispielskatalog für besonders schwere Fälle des Diebstahls. Zuerst ist §242 zu prüfen.',
    relevance:
      'Einordnung nach §12 StGB: Für die Verbrechen/Vergehen-Einteilung bleibt der besonders schwere Fall nach §12 Abs. 3 StGB außer Betracht – es gilt der Grundtatbestand §242 (Vergehen).',
    distinctions: ['§242 StGB – Grundtatbestand', '§244 StGB – eigenständige Qualifikation'],
    officialText:
      '(1) In besonders schweren Fällen wird der Diebstahl mit Freiheitsstrafe von drei Monaten bis zu zehn Jahren bestraft. Ein besonders schwerer Fall liegt in der Regel vor, wenn der Täter 1. zur Ausführung der Tat in ein Gebäude ... einbricht, einsteigt ... 2. eine Sache stiehlt, die durch ein verschlossenes Behältnis oder eine andere Schutzvorrichtung gegen Wegnahme besonders gesichert ist, 3. gewerbsmäßig stiehlt, ... 6. stiehlt, indem er die Hilflosigkeit einer anderen Person, einen Unglücksfall oder eine gemeine Gefahr ausnutzt ... (2) In den Fällen des Absatzes 1 Satz 2 Nummer 1 bis 6 ist ein besonders schwerer Fall ausgeschlossen, wenn sich die Tat auf eine geringwertige Sache bezieht.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__243.html',
    source: BIBEL_SOURCE,
  },
  {
    id: 'stgb-244',
    law: 'StGB',
    paragraph: '§ 244',
    officialTitle: 'Diebstahl mit Waffen; Bandendiebstahl; Wohnungseinbruchdiebstahl',
    category: 'DIEBSTAHL_UNTERSCHLAGUNG',
    protectedInterest: 'Eigentum und Gewahrsam',
    objectiveElements: [
      'ein Diebstahl, bei dem der Täter oder ein Beteiligter eine Waffe oder ein anderes gefährliches Werkzeug bei sich führt',
      'oder ein sonstiges Werkzeug/Mittel bei sich führt, um Widerstand durch Gewalt oder Drohung zu verhindern oder zu überwinden',
      'oder Diebstahl als Bandenmitglied unter Mitwirkung eines anderen Bandenmitglieds',
      'oder Wohnungseinbruchdiebstahl (Einbrechen/Einsteigen/Eindringen in eine Wohnung)',
    ],
    subjectiveElements: ['Vorsatz; hinsichtlich der Qualifikationsumstände entsprechender Vorsatz'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    minimumPenalty: 'Freiheitsstrafe nicht unter sechs Monaten',
    maximumPenalty:
      'Freiheitsstrafe bis zu zehn Jahren (Wohnungseinbruchdiebstahl in dauerhaft genutzte Privatwohnung: nicht unter einem Jahr; minder schwere Fälle: drei Monate bis fünf Jahre)',
    classification: 'VERGEHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: true,
    attemptExplanation: 'Der Versuch ist in §244 Abs. 2 StGB ausdrücklich strafbar.',
    explanation:
      '§244 StGB enthält eigenständige Qualifikationen des Diebstahls (Waffen/Bandendiebstahl/Wohnungseinbruchdiebstahl).',
    relevance:
      'Für Sicherheitskräfte: Bei Waffengebrauch oder Wohnungseinbruch besteht erhöhte Gefahr; Eigensicherung und Polizei verständigen stehen im Vordergrund.',
    distinctions: ['§242 StGB – Grundtatbestand', '§243 StGB – Regelbeispiel'],
    officialText:
      '(1) Mit Freiheitsstrafe von sechs Monaten bis zu zehn Jahren wird bestraft, wer 1. einen Diebstahl begeht, bei dem er oder ein anderer Beteiligter a) eine Waffe oder ein anderes gefährliches Werkzeug bei sich führt, ... 2. als Mitglied einer Bande ... stiehlt oder 3. einen Diebstahl begeht, bei dem er zur Ausführung der Tat in eine Wohnung einbricht, einsteigt ... (2) Der Versuch ist strafbar. (4) Betrifft der Wohnungseinbruchdiebstahl ... eine dauerhaft genutzte Privatwohnung, so ist die Strafe Freiheitsstrafe von einem Jahr bis zu zehn Jahren.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__244.html',
    source: GII_SOURCE,
  },
  {
    id: 'stgb-246',
    law: 'StGB',
    paragraph: '§ 246',
    officialTitle: 'Unterschlagung',
    category: 'DIEBSTAHL_UNTERSCHLAGUNG',
    protectedInterest: 'Eigentum',
    objectiveElements: [
      'fremde bewegliche Sache',
      'rechtswidrige Zueignung (keine Wegnahme erforderlich – die Sache ist bereits im Besitz/Gewahrsam)',
      'keine schwerere Strafdrohung in anderen Vorschriften',
    ],
    subjectiveElements: ['Vorsatz', 'Absicht rechtswidriger Zueignung'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    specialSubjectiveElements: ['Absicht rechtswidriger Zueignung'],
    minimumPenalty: NO_MIN_FS,
    maximumPenalty:
      'Freiheitsstrafe bis zu drei Jahren (Abs. 2 bei anvertrauter Sache: bis zu fünf Jahren)',
    classification: 'VERGEHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: true,
    attemptExplanation: 'Der Versuch ist in §246 Abs. 3 StGB ausdrücklich strafbar.',
    explanation:
      'Unterschlagung ist die rechtswidrige Zueignung einer fremden beweglichen Sache, ohne dass eine Wegnahme erfolgt.',
    relevance:
      'Abgrenzung zum Diebstahl: Beim Diebstahl wird die Sache weggenommen (Bruch fremden Gewahrsams), bei der Unterschlagung ist sie bereits im Gewahrsam des Täters.',
    distinctions: ['§242 StGB – Diebstahl (Wegnahme)', '§248a StGB – geringwertige Sachen'],
    officialText:
      '(1) Wer eine fremde bewegliche Sache sich oder einem Dritten rechtswidrig zueignet, wird mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe bestraft, wenn die Tat nicht in anderen Vorschriften mit schwererer Strafe bedroht ist. (2) Ist in den Fällen des Absatzes 1 die Sache dem Täter anvertraut, so ist die Strafe Freiheitsstrafe bis zu fünf Jahren oder Geldstrafe. (3) Der Versuch ist strafbar.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__246.html',
    source: GII_SOURCE,
  },
  {
    id: 'stgb-247',
    law: 'StGB',
    paragraph: '§ 247',
    officialTitle: 'Haus- und Familiendiebstahl',
    category: 'DIEBSTAHL_UNTERSCHLAGUNG',
    protectedInterest: 'Eigentum (Verfolgungsregelung, kein eigener Tatbestand)',
    objectiveElements: [
      'Diebstahl oder Unterschlagung',
      'zum Nachteil eines Angehörigen, des Vormunds oder des Betreuers',
      'oder der Verletzte lebt mit dem Täter in häuslicher Gemeinschaft',
    ],
    subjectiveElements: ['Vorsatz der Grundtat (Diebstahl/Unterschlagung)'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    minimumPenalty: 'Keine eigene Strafandrohung (Strafverfolgungsregelung)',
    maximumPenalty: 'Keine eigene Strafandrohung – es gilt der Strafrahmen der Grundtat',
    classification: 'VERGEHEN',
    prosecution: {
      type: 'ANTRAGSDELIKT',
      applicationType: 'ABSOLUTES_ANTRAGSDELIKT',
      applicationNorm: '§ 247 StGB',
      explanation:
        'Ist ein Angehöriger, der Vormund oder der Betreuer verletzt oder lebt der Verletzte mit dem Täter in häuslicher Gemeinschaft, wird die Tat nur auf Antrag verfolgt.',
    },
    attemptPunishable: false,
    attemptExplanation:
      '§247 StGB ist keine eigene Straftat, sondern eine Strafverfolgungsregelung zur Grundtat.',
    explanation:
      '§247 StGB ist keine eigene Straftat, sondern eine besondere Strafverfolgungsregelung für bestimmte persönliche Beziehungen. Der Grundtatbestand bleibt §242 bzw. §246 StGB.',
    relevance:
      'Prüfungsrelevant: Tatbestand und Verfolgungsart sind zwei verschiedene Fragen. §247 verändert den Tatbestand des Diebstahls nicht.',
    distinctions: ['§242 StGB – Tatbestand Diebstahl', '§248a StGB – geringwertige Sachen'],
    officialText:
      'Ist durch einen Diebstahl oder eine Unterschlagung ein Angehöriger, der Vormund oder der Betreuer verletzt oder lebt der Verletzte mit dem Täter in häuslicher Gemeinschaft, so wird die Tat nur auf Antrag verfolgt.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__247.html',
    source: BIBEL_SOURCE,
  },
  {
    id: 'stgb-248a',
    law: 'StGB',
    paragraph: '§ 248a',
    officialTitle: 'Diebstahl und Unterschlagung geringwertiger Sachen',
    category: 'DIEBSTAHL_UNTERSCHLAGUNG',
    protectedInterest: 'Eigentum (Verfolgungsregelung, kein eigener Tatbestand)',
    objectiveElements: [
      'Diebstahl (§242 StGB) oder Unterschlagung (§246 StGB)',
      'geringwertige Sache',
    ],
    subjectiveElements: ['Vorsatz der Grundtat'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    minimumPenalty: 'Keine eigene Strafandrohung (Strafverfolgungsregelung)',
    maximumPenalty: 'Keine eigene Strafandrohung – es gilt der Strafrahmen der Grundtat',
    classification: 'VERGEHEN',
    prosecution: {
      type: 'ANTRAGSDELIKT',
      applicationType: 'RELATIVES_ANTRAGSDELIKT',
      applicationNorm: '§ 248a StGB',
      explanation:
        'Geringwertige Sachen werden nur auf Antrag verfolgt, es sei denn, die Strafverfolgungsbehörde hält wegen besonderen öffentlichen Interesses ein Einschreiten von Amts wegen für geboten.',
    },
    attemptPunishable: false,
    attemptExplanation:
      '§248a StGB ist keine eigene Straftat, sondern eine Strafverfolgungsregelung zur Grundtat.',
    explanation:
      '§248a StGB ist eine Strafverfolgungsregelung für Diebstahl und Unterschlagung geringwertiger Sachen. Sie beseitigt den Tatbestand nicht.',
    relevance:
      'Für Sicherheitskräfte: §248a beantwortet die Frage der Strafverfolgung, nicht die Frage „Was darf ich selbst tun?“. Aus §248a folgt keine eigene Eingriffsbefugnis.',
    securityNote:
      '§248a StGB ≠ Festnahmebefugnis. Die Befugnisprüfung (§127 StPO) bleibt ein gesonderter Schritt.',
    distinctions: ['§242 StGB – Diebstahl', '§246 StGB – Unterschlagung'],
    officialText:
      'Der Diebstahl und die Unterschlagung geringwertiger Sachen werden in den Fällen der §§ 242 und 246 nur auf Antrag verfolgt, es sei denn, daß die Strafverfolgungsbehörde wegen des besonderen öffentlichen Interesses an der Strafverfolgung ein Einschreiten von Amts wegen für geboten hält.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__248a.html',
    source: BIBEL_SOURCE,
  },
  {
    id: 'stgb-248b',
    law: 'StGB',
    paragraph: '§ 248b',
    officialTitle: 'Unbefugter Gebrauch eines Fahrzeugs',
    category: 'DIEBSTAHL_UNTERSCHLAGUNG',
    protectedInterest: 'Gebrauchsrecht des Berechtigten am Fahrzeug',
    objectiveElements: [
      'Kraftfahrzeug oder Fahrrad',
      'Ingebrauchnahme gegen den Willen des Berechtigten',
      'keine schwerere Strafdrohung in anderen Vorschriften',
    ],
    subjectiveElements: ['Vorsatz (Gebrauchswille ohne Aneignungsabsicht)'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    minimumPenalty: NO_MIN_FS,
    maximumPenalty: 'Freiheitsstrafe bis zu drei Jahren',
    classification: 'VERGEHEN',
    prosecution: {
      type: 'ANTRAGSDELIKT',
      applicationType: 'ABSOLUTES_ANTRAGSDELIKT',
      applicationNorm: '§ 248b Abs. 3 StGB',
      explanation: 'Die Tat wird nur auf Antrag verfolgt (§248b Abs. 3 StGB).',
    },
    attemptPunishable: true,
    attemptExplanation: 'Der Versuch ist in §248b Abs. 2 StGB ausdrücklich strafbar.',
    explanation:
      'Unbefugter Gebrauch eines Fahrzeugs liegt vor, wenn ein Kraftfahrzeug oder Fahrrad gegen den Willen des Berechtigten in Gebrauch genommen wird.',
    relevance:
      'Abgrenzung zum Diebstahl: §248b erfasst den bloßen Gebrauch ohne Zueignungsabsicht; bei Zueignungsabsicht kommt §242 StGB in Betracht.',
    distinctions: ['§242 StGB – Diebstahl (Zueignungsabsicht)'],
    officialText:
      '(1) Wer ein Kraftfahrzeug oder ein Fahrrad gegen den Willen des Berechtigten in Gebrauch nimmt, wird mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe bestraft, wenn die Tat nicht in anderen Vorschriften mit schwererer Strafe bedroht ist. (2) Der Versuch ist strafbar. (3) Die Tat wird nur auf Antrag verfolgt.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__248b.html',
    source: GII_SOURCE,
  },

  // ---------------------------------------------------------------------------
  // Raub und Erpressung
  // ---------------------------------------------------------------------------
  {
    id: 'stgb-249',
    law: 'StGB',
    paragraph: '§ 249',
    officialTitle: 'Raub',
    category: 'RAUB_ERPRESSUNG',
    protectedInterest: 'Eigentum, Gewahrsam, persönliche Freiheit und körperliche Integrität',
    objectiveElements: [
      'fremde bewegliche Sache',
      'Wegnahme',
      'Gewalt gegen eine Person oder Drohung mit gegenwärtiger Gefahr für Leib oder Leben',
    ],
    subjectiveElements: ['Vorsatz', 'Absicht rechtswidriger Zueignung'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    specialSubjectiveElements: ['Absicht rechtswidriger Zueignung'],
    minimumPenalty: 'Freiheitsstrafe nicht unter einem Jahr',
    maximumPenalty:
      'Freiheitsstrafe bis zu fünfzehn Jahren (minder schwere Fälle: sechs Monate bis fünf Jahre)',
    classification: 'VERBRECHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: true,
    attemptExplanation:
      '§249 StGB ist Verbrechen (Mindestmaß Freiheitsstrafe ein Jahr); der Versuch ist nach §23 Abs. 1 StGB stets strafbar.',
    explanation:
      'Raub ist die Wegnahme einer fremden beweglichen Sache unter Gewalt gegen eine Person oder unter Drohung mit gegenwärtiger Gefahr für Leib oder Leben.',
    relevance:
      'Für Sicherheitskräfte: Bei Raub geht eine erhebliche Gefahr für Leib und Leben von der Person aus. Vorrang haben Eigensicherung, Deeskalation und Polizei verständigen.',
    securityNote:
      'Auch bei Raub gilt: Die Straftat begründet keine beliebige Zwangsbefugnis. Die eigene Festhaltebefugnis ist gesondert zu prüfen.',
    distinctions: ['§242 StGB – Diebstahl', '§252 StGB – räuberischer Diebstahl'],
    officialText:
      '(1) Wer mit Gewalt gegen eine Person oder unter Anwendung von Drohungen mit gegenwärtiger Gefahr für Leib oder Leben eine fremde bewegliche Sache einem anderen in der Absicht wegnimmt, die Sache sich oder einem Dritten rechtswidrig zuzueignen, wird mit Freiheitsstrafe nicht unter einem Jahr bestraft. (2) In minder schweren Fällen ist die Strafe Freiheitsstrafe von sechs Monaten bis zu fünf Jahren.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__249.html',
    source: BIBEL_SOURCE,
  },
  {
    id: 'stgb-250',
    law: 'StGB',
    paragraph: '§ 250',
    officialTitle: 'Schwerer Raub',
    category: 'RAUB_ERPRESSUNG',
    protectedInterest: 'Eigentum, Gewahrsam, persönliche Freiheit und körperliche Integrität',
    objectiveElements: [
      'ein Raub nach §249 StGB',
      'und ein gesetzlicher Qualifikationsfall (z. B. Waffe/gefährliches Werkzeug bei sich führen oder verwenden; Bandenraub; Gefahr einer schweren Gesundheitsschädigung oder des Todes; körperlich schwere Misshandlung)',
    ],
    subjectiveElements: ['Vorsatz; bezüglich der Qualifikationsumstände entsprechender Vorsatz'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    minimumPenalty: 'Freiheitsstrafe nicht unter drei Jahren',
    maximumPenalty:
      'Freiheitsstrafe bis zu fünfzehn Jahren (Abs. 2: nicht unter fünf Jahren; minder schwere Fälle: ein Jahr bis zehn Jahre)',
    classification: 'VERBRECHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: true,
    attemptExplanation:
      'Verbrechen; der Versuch ist nach §23 Abs. 1 StGB stets strafbar.',
    explanation: 'Schwerer Raub ist der Raub unter gesetzlich bestimmten erschwerenden Umständen.',
    relevance:
      'Für Sicherheitskräfte: Höchste Gefahrenlage. Keine eigenmächtigen Maßnahmen; Eigensicherung und Polizei.',
    distinctions: ['§249 StGB – Raub', '§255 StGB – räuberische Erpressung'],
    officialText:
      '(1) Auf Freiheitsstrafe nicht unter drei Jahren ist zu erkennen, wenn 1. der Täter oder ein anderer Beteiligter am Raub a) eine Waffe oder ein anderes gefährliches Werkzeug bei sich führt, ... c) eine andere Person durch die Tat in die Gefahr einer schweren Gesundheitsschädigung bringt oder 2. der Täter den Raub als Mitglied einer Bande ... begeht. (2) Auf Freiheitsstrafe nicht unter fünf Jahren ist zu erkennen, wenn der Täter oder ein anderer Beteiligter am Raub 1. bei der Tat eine Waffe oder ein anderes gefährliches Werkzeug verwendet, ...',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__250.html',
    source: GII_SOURCE,
  },
  {
    id: 'stgb-252',
    law: 'StGB',
    paragraph: '§ 252',
    officialTitle: 'Räuberischer Diebstahl',
    category: 'RAUB_ERPRESSUNG',
    protectedInterest: 'Eigentum, Gewahrsam und persönliche/körperliche Integrität',
    objectiveElements: [
      'Täter wird bei einem Diebstahl auf frischer Tat betroffen',
      'und verübt gegen eine Person Gewalt oder wendet Drohungen mit gegenwärtiger Gefahr für Leib oder Leben an',
      'um sich im Besitz des gestohlenen Gutes zu erhalten (Beutesicherung)',
    ],
    subjectiveElements: [
      'Vorsatz',
      'Absicht, sich im Besitz des gestohlenen Gutes zu erhalten',
    ],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    specialSubjectiveElements: ['Absicht der Beutesicherung'],
    minimumPenalty: 'Freiheitsstrafe nicht unter einem Jahr (Bestrafung gleich einem Räuber)',
    maximumPenalty: 'Freiheitsstrafe bis zu fünfzehn Jahren',
    classification: 'VERBRECHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: true,
    attemptExplanation:
      '§252 StGB ist Verbrechen (Bestrafung gleich einem Räuber, Mindestmaß ein Jahr); der Versuch ist nach §23 Abs. 1 StGB stets strafbar.',
    explanation:
      'Räuberischer Diebstahl ist kein Raub: Der Diebstahl ist bereits begangen; der Täter setzt Gewalt oder Drohung ein, um die Beute zu behalten.',
    relevance:
      'Für Sicherheitskräfte ist die „frische Tat“ besonders relevant. Davon getrennt ist die Frage, ob die Person festgehalten werden darf (§127 StPO).',
    distinctions: ['§249 StGB – Raub (Gewalt bei der Wegnahme)', '§242 StGB – Diebstahl'],
    officialText:
      'Wer, bei einem Diebstahl auf frischer Tat betroffen, gegen eine Person Gewalt verübt oder Drohungen mit gegenwärtiger Gefahr für Leib oder Leben anwendet, um sich im Besitz des gestohlenen Gutes zu erhalten, ist gleich einem Räuber zu bestrafen.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__252.html',
    source: BIBEL_SOURCE,
  },
  {
    id: 'stgb-253',
    law: 'StGB',
    paragraph: '§ 253',
    officialTitle: 'Erpressung',
    category: 'RAUB_ERPRESSUNG',
    protectedInterest: 'Vermögen sowie Freiheit der Willensentschließung und Willensbetätigung',
    objectiveElements: [
      'Nötigung eines Menschen mit Gewalt oder Drohung mit einem empfindlichen Übel zu einer Handlung, Duldung oder Unterlassung',
      'Vermögensnachteil des Genötigten oder eines anderen',
      'Kausalität zwischen Nötigung und Vermögensnachteil',
    ],
    subjectiveElements: [
      'Vorsatz',
      'Absicht, sich oder einen Dritten zu Unrecht zu bereichern (Bereicherungsabsicht)',
    ],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    specialSubjectiveElements: ['Absicht rechtswidriger Bereicherung'],
    minimumPenalty: NO_MIN_FS,
    maximumPenalty:
      'Freiheitsstrafe bis zu fünf Jahren (besonders schwerer Fall: nicht unter einem Jahr)',
    classification: 'VERGEHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: true,
    attemptExplanation: 'Der Versuch ist in §253 Abs. 3 StGB ausdrücklich strafbar.',
    explanation:
      'Erpressung ist die Nötigung zu einer vermögensschädigenden Handlung, Duldung oder Unterlassung mit Bereicherungsabsicht.',
    relevance:
      'Abgrenzung zur Nötigung: §253 verlangt zusätzlich einen Vermögensnachteil und Bereicherungsabsicht.',
    distinctions: ['§240 StGB – Nötigung', '§255 StGB – räuberische Erpressung'],
    officialText:
      '(1) Wer einen Menschen rechtswidrig mit Gewalt oder durch Drohung mit einem empfindlichen Übel zu einer Handlung, Duldung oder Unterlassung nötigt und dadurch dem Vermögen des Genötigten oder eines anderen Nachteil zufügt, um sich oder einen Dritten zu Unrecht zu bereichern, wird mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe bestraft. (2) Rechtswidrig ist die Tat, wenn die Anwendung der Gewalt oder die Androhung des Übels zu dem angestrebten Zweck als verwerflich anzusehen ist. (3) Der Versuch ist strafbar.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__253.html',
    source: BIBEL_SOURCE,
  },
  {
    id: 'stgb-255',
    law: 'StGB',
    paragraph: '§ 255',
    officialTitle: 'Räuberische Erpressung',
    category: 'RAUB_ERPRESSUNG',
    protectedInterest: 'Vermögen sowie persönliche/körperliche Integrität',
    objectiveElements: [
      'eine Erpressung nach §253 StGB',
      'begangen durch Gewalt gegen eine Person oder unter Anwendung von Drohungen mit gegenwärtiger Gefahr für Leib oder Leben',
    ],
    subjectiveElements: [
      'Vorsatz',
      'Absicht rechtswidriger Bereicherung',
    ],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    specialSubjectiveElements: ['Absicht rechtswidriger Bereicherung'],
    minimumPenalty: 'Freiheitsstrafe nicht unter einem Jahr (Bestrafung gleich einem Räuber)',
    maximumPenalty: 'Freiheitsstrafe bis zu fünfzehn Jahren',
    classification: 'VERBRECHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: true,
    attemptExplanation:
      '§255 StGB ist Verbrechen (Bestrafung gleich einem Räuber, Mindestmaß ein Jahr); der Versuch ist nach §23 Abs. 1 StGB stets strafbar.',
    explanation:
      'Räuberische Erpressung ist die Erpressung mit qualifiziertem Gewalt- oder Drohungsmittel.',
    relevance:
      'Für Sicherheitskräfte: Raub und räuberische Erpressung dürfen nicht allein anhand des Wortes „Gewalt“ gleichgesetzt werden; die konkrete Vermögensverschiebung ist zu prüfen.',
    distinctions: ['§249 StGB – Raub', '§253 StGB – Erpressung'],
    officialText:
      'Wird die Erpressung durch Gewalt gegen eine Person oder unter Anwendung von Drohungen mit gegenwärtiger Gefahr für Leib oder Leben begangen, so ist der Täter gleich einem Räuber zu bestrafen.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__255.html',
    source: BIBEL_SOURCE,
  },

  // ---------------------------------------------------------------------------
  // Vermögensdelikte
  // ---------------------------------------------------------------------------
  {
    id: 'stgb-259',
    law: 'StGB',
    paragraph: '§ 259',
    officialTitle: 'Hehlerei',
    category: 'VERMOEGENSDELIKTE',
    protectedInterest: 'Vermögen (insbesondere das Interesse des Vortatgeschädigten)',
    objectiveElements: [
      'eine Sache, die ein anderer gestohlen oder sonst durch eine gegen fremdes Vermögen gerichtete rechtswidrige Tat erlangt hat',
      'Ankaufen, Sich- oder-einem-Dritten-Verschaffen, Absetzen oder Absetzen-Helfen',
    ],
    subjectiveElements: ['Vorsatz', 'Bereicherungsabsicht'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    specialSubjectiveElements: ['Absicht, sich oder einen Dritten zu bereichern'],
    minimumPenalty: NO_MIN_FS,
    maximumPenalty: 'Freiheitsstrafe bis zu fünf Jahren',
    classification: 'VERGEHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: true,
    attemptExplanation: 'Der Versuch ist in §259 Abs. 3 StGB ausdrücklich strafbar.',
    explanation:
      'Hehlerei ist das Ausnutzen einer Vortat durch Verschaffen, Absetzen oder Absetzen-Helfen einer durch die Vortat erlangten Sache mit Bereicherungsabsicht.',
    relevance:
      'Für Sicherheitskräfte: Beim Verdacht auf Hehlerei die Polizei verständigen; keine eigenmächtige Sachentnahme.',
    distinctions: ['§242 StGB – Diebstahl (Vortat)'],
    officialText:
      '(1) Wer eine Sache, die ein anderer gestohlen oder sonst durch eine gegen fremdes Vermögen gerichtete rechtswidrige Tat erlangt hat, ankauft oder sonst sich oder einem Dritten verschafft, sie absetzt oder absetzen hilft, um sich oder einen Dritten zu bereichern, wird mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe bestraft. (2) Die §§ 247 und 248a gelten sinngemäß. (3) Der Versuch ist strafbar.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__259.html',
    source: GII_SOURCE,
  },
  {
    id: 'stgb-263',
    law: 'StGB',
    paragraph: '§ 263',
    officialTitle: 'Betrug',
    category: 'VERMOEGENSDELIKTE',
    protectedInterest: 'Vermögen',
    objectiveElements: [
      'Täuschung durch Vorspiegelung falscher oder Entstellung/Unterdrückung wahrer Tatsachen',
      'dadurch erregter oder unterhaltener Irrtum',
      'aufgrund des Irrtums verfügt das Opfer',
      'dadurch entsteht ein Vermögensschaden',
    ],
    subjectiveElements: [
      'Vorsatz',
      'Absicht, sich oder einem Dritten einen rechtswidrigen Vermögensvorteil zu verschaffen (Bereicherungsabsicht)',
    ],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    specialSubjectiveElements: ['Absicht rechtswidriger Bereicherung', 'Stoffgleichheit von Schaden und Vorteil'],
    minimumPenalty: NO_MIN_FS,
    maximumPenalty:
      'Freiheitsstrafe bis zu fünf Jahren (besonders schwerer Fall: sechs Monate bis zehn Jahre)',
    classification: 'VERGEHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: true,
    attemptExplanation: 'Der Versuch ist in §263 Abs. 2 StGB ausdrücklich strafbar.',
    explanation:
      'Betrug ist die täuschungsbedingte Vermögensschädigung in Bereicherungsabsicht.',
    relevance:
      'Für Sicherheitskräfte relevant bei Zutritts- und Ausweiskontrollen (z. B. erschlichene Berechtigungen).',
    distinctions: ['§265a StGB – Erschleichen von Leistungen'],
    officialText:
      '(1) Wer in der Absicht, sich oder einem Dritten einen rechtswidrigen Vermögensvorteil zu verschaffen, das Vermögen eines anderen dadurch beschädigt, daß er durch Vorspiegelung falscher oder durch Entstellung oder Unterdrückung wahrer Tatsachen einen Irrtum erregt oder unterhält, wird mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe bestraft. (2) Der Versuch ist strafbar.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__263.html',
    source: NOT_IN_BIBEL_SOURCE,
  },
  {
    id: 'stgb-265a',
    law: 'StGB',
    paragraph: '§ 265a',
    officialTitle: 'Erschleichen von Leistungen',
    category: 'VERMOEGENSDELIKTE',
    protectedInterest: 'Vermögen (Leistungsentgelt)',
    objectiveElements: [
      'Erschleichen der Leistung eines Automaten, eines öffentlichen Telekommunikationsnetzes, einer Beförderung oder des Zutritts zu einer Veranstaltung oder Einrichtung',
      'in der Absicht, das Entgelt nicht zu entrichten',
      'keine schwerere Strafdrohung in anderen Vorschriften',
    ],
    subjectiveElements: ['Vorsatz', 'Absicht, das Entgelt nicht zu entrichten'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    specialSubjectiveElements: ['Absicht der Nichtentrichtung des Entgelts'],
    minimumPenalty: NO_MIN_FS,
    maximumPenalty: 'Freiheitsstrafe bis zu einem Jahr',
    classification: 'VERGEHEN',
    prosecution: {
      type: 'OFFIZIALDELIKT',
      explanation:
        'Grundsätzlich Offizialdelikt. §265a Abs. 3 StGB erklärt die §§247 und 248a StGB für entsprechend anwendbar.',
    },
    attemptPunishable: true,
    attemptExplanation: 'Der Versuch ist in §265a Abs. 2 StGB ausdrücklich strafbar.',
    explanation:
      'Erschleichen von Leistungen ist die Inanspruchnahme einer Leistung in der Absicht, das Entgelt nicht zu zahlen (z. B. Schwarzfahren, Zutritt ohne Ticket).',
    relevance:
      'Für Sicherheitskräfte relevant bei Zutrittskontrollen (z. B. unbefugter Zutritt zu einer Veranstaltung).',
    distinctions: ['§263 StGB – Betrug (Täuschung über Tatsachen)'],
    officialText:
      '(1) Wer die Leistung eines Automaten oder eines öffentlichen Zwecken dienenden Telekommunikationsnetzes, die Beförderung durch ein Verkehrsmittel oder den Zutritt zu einer Veranstaltung oder einer Einrichtung in der Absicht erschleicht, das Entgelt nicht zu entrichten, wird mit Freiheitsstrafe bis zu einem Jahr oder mit Geldstrafe bestraft, wenn die Tat nicht in anderen Vorschriften mit schwererer Strafe bedroht ist. (2) Der Versuch ist strafbar. (3) Die §§ 247 und 248a gelten entsprechend.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__265a.html',
    source: NOT_IN_BIBEL_SOURCE,
  },

  // ---------------------------------------------------------------------------
  // Sachbeschädigungsdelikte
  // ---------------------------------------------------------------------------
  {
    id: 'stgb-303',
    law: 'StGB',
    paragraph: '§ 303',
    officialTitle: 'Sachbeschädigung',
    category: 'SACHBESCHAEDIGUNG',
    protectedInterest: 'Eigentum',
    objectiveElements: [
      'fremde Sache',
      'rechtswidriges Beschädigen oder Zerstören',
      'oder unbefugte, nicht nur unerhebliche und nicht nur vorübergehende Veränderung des Erscheinungsbildes (Abs. 2)',
    ],
    subjectiveElements: ['Vorsatz'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    minimumPenalty: NO_MIN_FS,
    maximumPenalty: 'Freiheitsstrafe bis zu zwei Jahren',
    classification: 'VERGEHEN',
    prosecution: {
      type: 'ANTRAGSDELIKT',
      applicationType: 'RELATIVES_ANTRAGSDELIKT',
      applicationNorm: '§ 303c StGB',
      explanation:
        'Die Tat wird nur auf Antrag verfolgt, es sei denn, die Strafverfolgungsbehörde hält wegen besonderen öffentlichen Interesses ein Einschreiten von Amts wegen für geboten (§303c StGB).',
    },
    attemptPunishable: true,
    attemptExplanation: 'Der Versuch ist in §303 Abs. 3 StGB ausdrücklich strafbar.',
    explanation:
      'Sachbeschädigung ist das rechtswidrige Beschädigen oder Zerstören einer fremden Sache (Abs. 1) oder die unbefugte erhebliche Veränderung ihres Erscheinungsbildes (Abs. 2).',
    relevance:
      'Für Sicherheitskräfte: Sachbeschädigungen dokumentieren, Beweise sichern und Strafantrag des Berechtigten anregen.',
    distinctions: ['§303a StGB – Datenveränderung', '§223 StGB – Körperverletzung (andere Person)'],
    officialText:
      '(1) Wer rechtswidrig eine fremde Sache beschädigt oder zerstört, wird mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe bestraft. (2) Ebenso wird bestraft, wer unbefugt das Erscheinungsbild einer fremden Sache nicht nur unerheblich und nicht nur vorübergehend verändert. (3) Der Versuch ist strafbar.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__303.html',
    source: BIBEL_SOURCE,
  },
  {
    id: 'stgb-303a',
    law: 'StGB',
    paragraph: '§ 303a',
    officialTitle: 'Datenveränderung',
    category: 'SACHBESCHAEDIGUNG',
    protectedInterest: 'Daten / Vermögen',
    objectiveElements: [
      'rechtswidriges Löschen, Unterdrücken, Unbrauchbarmachen oder Verändern von Daten (§202a Abs. 2 StGB)',
    ],
    subjectiveElements: ['Vorsatz'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    minimumPenalty: NO_MIN_FS,
    maximumPenalty: 'Freiheitsstrafe bis zu zwei Jahren',
    classification: 'VERGEHEN',
    prosecution: {
      type: 'ANTRAGSDELIKT',
      applicationType: 'RELATIVES_ANTRAGSDELIKT',
      applicationNorm: '§ 303c StGB',
      explanation:
        'Die Tat wird nur auf Antrag verfolgt, es sei denn, die Strafverfolgungsbehörde hält wegen besonderen öffentlichen Interesses ein Einschreiten von Amts wegen für geboten (§303c StGB).',
    },
    attemptPunishable: true,
    attemptExplanation: 'Der Versuch ist in §303a Abs. 2 StGB ausdrücklich strafbar.',
    explanation:
      'Datenveränderung ist das rechtswidrige Löschen, Unterdrücken, Unbrauchbarmachen oder Verändern von Daten.',
    relevance:
      'Für Sicherheitskräfte relevant bei Datenschutz-Vorfällen im Bewachungsgewerbe (z. B. Löschen von Videoaufzeichnungen).',
    distinctions: ['§303 StGB – Sachbeschädigung', '§303b StGB – Computersabotage'],
    officialText:
      '(1) Wer rechtswidrig Daten (§ 202a Abs. 2) löscht, unterdrückt, unbrauchbar macht oder verändert, wird mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe bestraft. (2) Der Versuch ist strafbar.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__303a.html',
    source: GII_SOURCE,
  },

  // ---------------------------------------------------------------------------
  // Urkundendelikte
  // ---------------------------------------------------------------------------
  {
    id: 'stgb-267',
    law: 'StGB',
    paragraph: '§ 267',
    officialTitle: 'Urkundenfälschung',
    category: 'URKUNDENDELIKTE',
    protectedInterest: 'Sicherheit und Zuverlässigkeit des Rechtsverkehrs mit Urkunden',
    objectiveElements: [
      'zur Täuschung im Rechtsverkehr',
      'Herstellen einer unechten Urkunde',
      'oder Verfälschen einer echten Urkunde',
      'oder Gebrauchen einer unechten oder verfälschten Urkunde',
    ],
    subjectiveElements: ['Vorsatz', 'Absicht der Täuschung im Rechtsverkehr'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    specialSubjectiveElements: ['Absicht der Täuschung im Rechtsverkehr'],
    minimumPenalty: NO_MIN_FS,
    maximumPenalty:
      'Freiheitsstrafe bis zu fünf Jahren (besonders schwerer Fall: sechs Monate bis zehn Jahre)',
    classification: 'VERGEHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: true,
    attemptExplanation: 'Der Versuch ist in §267 Abs. 2 StGB ausdrücklich strafbar.',
    explanation:
      'Urkundenfälschung ist das Herstellen einer unechten Urkunde, das Verfälschen einer echten Urkunde oder das Gebrauchen einer unechten/verfälschten Urkunde zur Täuschung im Rechtsverkehr.',
    relevance:
      'Für Sicherheitskräfte relevant bei Ausweis- und Zutrittskontrollen (gefälschte Ausweise, Besucherkarten).',
    distinctions: ['§263 StGB – Betrug'],
    officialText:
      '(1) Wer zur Täuschung im Rechtsverkehr eine unechte Urkunde herstellt, eine echte Urkunde verfälscht oder eine unechte oder verfälschte Urkunde gebraucht, wird mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe bestraft. (2) Der Versuch ist strafbar.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__267.html',
    source: GII_SOURCE,
  },

  // ---------------------------------------------------------------------------
  // Gemeingefährliche und sonstige Delikte
  // ---------------------------------------------------------------------------
  {
    id: 'stgb-323c',
    law: 'StGB',
    paragraph: '§ 323c',
    officialTitle: 'Unterlassene Hilfeleistung; Behinderung von hilfeleistenden Personen',
    category: 'GEMEINGEFAEHRLICHE_DELIKTE',
    protectedInterest: 'Solidarität / Hilfe in Notlagen',
    objectiveElements: [
      'Unglücksfall oder gemeine Gefahr oder Not',
      'erforderliche und zumutbare Hilfeleistung (ohne erhebliche eigene Gefahr, ohne Verletzung anderer wichtiger Pflichten)',
      'oder Behinderung einer hilfeleistenden Person (Abs. 2)',
    ],
    subjectiveElements: ['Vorsatz bezüglich der Hilfeleistungspflicht und ihrer Umstände'],
    intentRequired: true,
    negligence: { intentional: true, negligentVariant: false, explanation: NO_NEGLIGENT },
    minimumPenalty: NO_MIN_FS,
    maximumPenalty: 'Freiheitsstrafe bis zu einem Jahr',
    classification: 'VERGEHEN',
    prosecution: { type: 'OFFIZIALDELIKT', explanation: 'Verfolgung von Amts wegen.' },
    attemptPunishable: false,
    attemptExplanation: 'Echtes Unterlassungsdelikt; ein Versuch ist nicht strafbar.',
    explanation:
      'Unterlassene Hilfeleistung liegt vor, wenn bei Unglücksfall, gemeiner Gefahr oder Not die erforderliche und zumutbare Hilfe nicht geleistet wird.',
    relevance:
      'Für Sicherheitskräfte besonders relevant: Bei Unglücksfällen zuerst Hilfe leisten bzw. veranlassen (Erste Hilfe, Rettungsdienst) und dabei Eigensicherung beachten.',
    securityNote:
      'Hilfe ist nur geschuldet, wenn sie ohne erhebliche eigene Gefahr und ohne Verletzung anderer wichtiger Pflichten möglich ist.',
    distinctions: ['§13 StGB – Begehen durch Unterlassen (Garantenstellung)'],
    officialText:
      '(1) Wer bei Unglücksfällen oder gemeiner Gefahr oder Not nicht Hilfe leistet, obwohl dies erforderlich und ihm den Umständen nach zuzumuten, insbesondere ohne erhebliche eigene Gefahr und ohne Verletzung anderer wichtiger Pflichten möglich ist, wird mit Freiheitsstrafe bis zu einem Jahr oder mit Geldstrafe bestraft. (2) Ebenso wird bestraft, wer in diesen Situationen eine Person behindert, die einem Dritten Hilfe leistet oder leisten will.',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__323c.html',
    source: GII_SOURCE,
  },
];
