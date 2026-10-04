import { LegalAuthority } from '../models';

/**
 * Befugnisse, Rechtfertigungen und Entschuldigungen (Stufe 3).
 *
 * Jede Grundlage wird getrennt nach holder, prerequisites, permittedAction,
 * limits und proportionality gespeichert (Bibel-Kapitel 61).
 *
 * `prohibitedConditions` hält fest, wann die Grundlage ausdrücklich NICHT
 * greift. Damit werden die in Bibel-Kapitel 62 verbotenen Automatismen
 * technisch abgebildet.
 */
export const LEGAL_AUTHORITIES: LegalAuthority[] = [
  {
    id: 'authority-stpo-127',
    normId: 'stpo-127',
    kind: 'BEFUGNIS',
    holder: 'jedermann (§127 Abs. 1 StPO)',
    prerequisites: [
      'Person auf frischer Tat betroffen oder auf frischer Tat verfolgt',
      'Fluchtverdacht oder Identität nicht sofort feststellbar',
    ],
    permittedAction: 'Vorläufige Festnahme der Person auch ohne richterliche Anordnung.',
    limits: [
      'Nur vorläufige Festnahme – keine Entscheidung über Untersuchungshaft',
      'Durchführung auf das erforderliche Maß begrenzen (Festhalten, Fixieren, körperliche Gewalt unterscheiden)',
      'Nach der Festnahme unverzüglich die Polizei hinzuziehen und die Person übergeben',
    ],
    proportionality:
      'Auch bei bestehender Festnahmebefugnis gilt: geeignet, erforderlich und angemessen. Eine bestehende Festnahmebefugnis bedeutet nicht automatisch, dass jedes Mittel zulässig ist.',
    prohibitedConditions: [
      'Diebstahl allein → automatische Festhaltebefugnis',
      'bloßer Verdacht ohne frische Tat',
      'Weggehen-Wollen ohne konkreten Fluchtverdacht',
    ],
  },
  {
    id: 'authority-bgb-859',
    normId: 'bgb-859',
    kind: 'BEFUGNIS',
    holder: 'Besitzer der Sache',
    prerequisites: ['Besitz', 'verbotene Eigenmacht (§858 BGB)', 'unmittelbare Reaktion'],
    permittedAction:
      'Der Besitzer darf sich verbotener Eigenmacht mit Gewalt erwehren und eine weggenommene bewegliche Sache dem auf frischer Tat betroffenen oder verfolgten Täter mit Gewalt wieder abnehmen.',
    limits: [
      'Kein allgemeiner Freibrief zur Gewaltanwendung',
      'Nur zum Schutz des eigenen Besitzes',
      'Bei Grundstücken nur sofort nach der Entziehung',
    ],
    proportionality: 'Die Selbsthilfe darf nicht weiter gehen, als zur Abwendung der Gefahr erforderlich ist.',
    prohibitedConditions: [
      'Besitz allein → automatisch immer Gewalt erlaubt',
      'keine verbotene Eigenmacht',
    ],
  },
  {
    id: 'authority-bgb-860',
    normId: 'bgb-860',
    kind: 'BEFUGNIS',
    holder: 'Besitzdiener (§855 BGB)',
    prerequisites: ['Besitzdienerschaft nach §855 BGB', 'Rechte des Besitzers nach §859 BGB'],
    permittedAction: 'Der Besitzdiener darf die dem Besitzer nach §859 BGB zustehenden Rechte ausüben.',
    limits: ['Nur abgeleitete Rechte des Besitzers', 'Keine allgemeine Festnahmebefugnis'],
    proportionality: 'Gleiche Grenzen wie bei §859 BGB.',
    prohibitedConditions: ['§860 BGB als allgemeine Festnahmebefugnis'],
  },
  {
    id: 'authority-bgb-229',
    normId: 'bgb-229',
    kind: 'BEFUGNIS',
    holder: 'Inhaber eines Anspruchs',
    prerequisites: [
      'bestehender Anspruch',
      'obrigkeitliche Hilfe nicht rechtzeitig zu erlangen',
      'ohne sofortiges Eingreifen Gefahr der Vereitelung oder wesentlichen Erschwerung des Anspruchs',
    ],
    permittedAction:
      'Wegnahme, Zerstörung oder Beschädigung einer Sache bzw. Festnahme eines fluchtverdächtigen Verpflichteten zur Sicherung des Anspruchs.',
    limits: [
      'Selbsthilfe darf nicht weiter gehen als zur Abwendung der Gefahr erforderlich (§230 BGB)',
      'Bei Festnahme: persönlicher Sicherheitsarrest beantragen, Verpflichteten unverzüglich vorführen',
    ],
    proportionality: 'Erforderlichkeitsgrenze des §230 BGB.',
    prohibitedConditions: ['kein Anspruch', 'obrigkeitliche Hilfe rechtzeitig erreichbar'],
  },
  {
    id: 'authority-bgb-985-claim',
    normId: 'bgb-985',
    kind: 'ANSPRUCH',
    holder: 'Eigentümer',
    prerequisites: ['Eigentum', 'Besitz eines anderen', 'kein Recht zum Besitz nach §986 BGB'],
    permittedAction: 'Der Eigentümer kann vom Besitzer die Herausgabe der Sache verlangen.',
    limits: ['Kein unmittelbares Eingriffsrecht', 'Keine Gewaltbefugnis'],
    proportionality: 'Nicht anwendbar – Anspruch, keine Befugnis.',
    prohibitedConditions: ['Eigentum → Sache automatisch selbst wegnehmen'],
  },
  {
    id: 'authority-bgb-861-claim',
    normId: 'bgb-861',
    kind: 'ANSPRUCH',
    holder: 'früherer Besitzer',
    prerequisites: ['Besitzentziehung durch verbotene Eigenmacht', 'kein Ausschluss nach §861 Abs. 2 BGB'],
    permittedAction: 'Wiedereinräumung des Besitzes verlangen.',
    limits: ['Keine unmittelbare Selbsthilfe – dafür §859 BGB prüfen'],
    proportionality: 'Nicht anwendbar – Anspruch, keine Befugnis.',
    prohibitedConditions: ['§861 BGB als Gewaltbefugnis'],
  },
  {
    id: 'authority-stgb-32',
    normId: 'stgb-32',
    kind: 'RECHTFERTIGUNG',
    holder: 'jedermann (Notwehrlage)',
    prerequisites: ['gegenwärtiger rechtswidriger Angriff', 'Verteidigung', 'Erforderlichkeit'],
    permittedAction: 'Erforderliche Verteidigung gegen einen gegenwärtigen rechtswidrigen Angriff.',
    limits: ['Erforderlichkeit', 'Keine beliebige Gewalt', 'Überschreitung kann nach §33 StGB entschuldigt sein'],
    proportionality: 'Das mildeste erforderliche Mittel ist einzusetzen.',
    prohibitedConditions: ['Angriff → automatisch jede beliebige Gewalt'],
  },
  {
    id: 'authority-stgb-34',
    normId: 'stgb-34',
    kind: 'RECHTFERTIGUNG',
    holder: 'jedermann (Notstandslage)',
    prerequisites: [
      'gegenwärtige, nicht anders abwendbare Gefahr',
      'Gefahr für ein geschütztes Rechtsgut',
      'Interessenabwägung mit wesentlichem Überwiegen',
      'angemessenes Mittel',
    ],
    permittedAction: 'Tat zur Abwendung einer gegenwärtigen, nicht anders abwendbaren Gefahr.',
    limits: ['Wesentliches Überwiegen des geschützten Interesses', 'Angemessenheit des Mittels'],
    proportionality: 'Interessenabwägung nach §34 StGB.',
    prohibitedConditions: ['Gefahr → automatisch §34 StGB'],
  },
  {
    id: 'authority-bgb-228',
    normId: 'bgb-228',
    kind: 'RECHTFERTIGUNG',
    holder: 'jedermann',
    prerequisites: ['Gefahr geht von der Sache aus', 'Beschädigung/Zerstörung erforderlich', 'Schaden nicht außer Verhältnis'],
    permittedAction: 'Beschädigung oder Zerstörung einer fremden Sache, um eine durch sie drohende Gefahr abzuwenden.',
    limits: ['Erforderlichkeit', 'Verhältnismäßigkeit'],
    proportionality: 'Der Schaden darf nicht außer Verhältnis zur Gefahr stehen.',
    prohibitedConditions: ['Gefahr, die nicht von der Sache ausgeht'],
  },
  {
    id: 'authority-bgb-904',
    normId: 'bgb-904',
    kind: 'RECHTFERTIGUNG',
    holder: 'jedermann',
    prerequisites: ['gegenwärtige Gefahr', 'Einwirkung auf fremde Sache notwendig', 'drohender Schaden unverhältnismäßig groß'],
    permittedAction: 'Einwirkung auf eine fremde Sache zur Abwendung einer gegenwärtigen Gefahr.',
    limits: ['Erforderlichkeit', 'Schadensersatzpflicht des Einwirkenden'],
    proportionality: 'Unverhältnismäßigkeitsprüfung nach §904 BGB.',
    prohibitedConditions: ['§904 BGB mit §228 BGB verwechseln'],
  },
  {
    id: 'authority-bgb-227',
    normId: 'bgb-227',
    kind: 'RECHTFERTIGUNG',
    holder: 'jedermann (zivilrechtliche Notwehrlage)',
    prerequisites: ['gegenwärtiger rechtswidriger Angriff', 'erforderliche Verteidigung'],
    permittedAction: 'Zivilrechtliche Notwehrhandlung.',
    limits: ['Erforderlichkeit'],
    proportionality: 'Erforderliches Maß.',
    prohibitedConditions: ['§227 BGB mit §32 StGB gleichsetzen'],
  },
  {
    id: 'authority-stgb-33',
    normId: 'stgb-33',
    kind: 'ENTSCHULDIGUNG',
    holder: 'Täter',
    prerequisites: ['Überschreitung der Grenzen der Notwehr', 'aus Verwirrung, Furcht oder Schrecken'],
    permittedAction: 'Entschuldigung der Notwehrüberschreitung – die Tat bleibt rechtswidrig.',
    limits: ['Nur bei den genannten Affekten'],
    proportionality: 'Nicht anwendbar – Schuldausschluss.',
    prohibitedConditions: ['§33 StGB als Rechtfertigung behandeln'],
  },
  {
    id: 'authority-stgb-35',
    normId: 'stgb-35',
    kind: 'ENTSCHULDIGUNG',
    holder: 'Täter',
    prerequisites: ['gegenwärtige, nicht anders abwendbare Gefahr für Leben, Leib oder Freiheit', 'Gefahr für sich, Angehörige oder nahestehende Person'],
    permittedAction: 'Entschuldigung – die rechtswidrige Tat wird ohne Schuld begangen.',
    limits: ['Kein Entschuldigungsgrund, wenn Zumutbarkeit der Gefahrübernahme besteht'],
    proportionality: 'Nicht anwendbar – Schuldausschluss.',
    prohibitedConditions: ['§34 StGB und §35 StGB vermischen'],
  },
  {
    id: 'authority-bgb-903-hausrecht',
    normId: 'bgb-903',
    kind: 'BEFUGNIS',
    holder: 'Eigentümer bzw. Betreiber der Räume (und seine Besitzdiener)',
    prerequisites: ['Eigentum oder abgeleitete Nutzungsbefugnis an den Räumen', 'keine entgegenstehenden gesetzlichen Schranken oder Rechte Dritter'],
    permittedAction:
      'Der Betreiber darf den Zutritt von Personen ausschließen und als Bedingung des Zutritts eine freiwillige Taschenkontrolle verlangen; verweigert die Person, darf der Zutritt verweigert bzw. zum Verlassen aufgefordert werden.',
    limits: [
      'Keine Durchsuchung gegen den Willen des Besuchers',
      'Keine Festnahme, keine körperliche Gewalt allein wegen der Verweigerung',
      'Zwang nur, wenn eine eigenständige Befugnis (z. B. §127 StPO, §859 BGB) vorliegt',
    ],
    proportionality: 'Das mildeste Mittel ist die Zutrittsverweigerung; Zwang ist nicht verhältnismäßig, solange kein Rechtsgut gefährdet ist.',
    prohibitedConditions: [
      'Hausrecht → automatisch Durchsuchungsbefugnis',
      'Hausrecht → automatisch Gewalt oder Festhalten',
    ],
  },
];
