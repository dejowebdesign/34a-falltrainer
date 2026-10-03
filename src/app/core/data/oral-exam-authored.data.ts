import { OralExamPoolBlock } from '../models';

/**
 * Prüfungspool der mündlichen Prüfungssimulation.
 *
 * Grundlage:
 * - Hauptfrage und deren Antwortschlüssel stammen fachlich aus `Fragen.txt`.
 *   Die Formulierung darf für die Prüfungsqualität überarbeitet werden
 *   (`questionOverride`, `answerOverride`); der fachliche Sinn bleibt erhalten.
 * - Folgefrage-Antworten sind ergänzt: `AUTHORED_FROM_BIBEL`, wo die 34a-Bibel
 *   das Thema abdeckt (BGB, StGB/StPO), sonst `AUTHORED_FROM_FACHWISSEN`
 *   (`UNVERIFIED`).
 *
 * Prüfungsqualität (didaktische Überarbeitung):
 * - Keine Frage ist allein über ein Akronym lösbar.
 * - Alle fünf Antworten sind vollständige, ausformulierte Sätze.
 * - Nur die richtige Antwort enthält – wenn für die Frage relevant – eine
 *   Paragraphenangabe mit offiziellem Titel (Konvention: § … Gesetz – Titel).
 * - Die Distraktoren sind fachlich plausibel und an genau einem Punkt falsch;
 *   offensichtlich falsche Aussagen und absolute Formulierungen sind entfernt.
 * - Alle Optionen sind sprachlich und in der Länge ausgewogen; die richtige
 *   Antwort fällt weder durch Umfang noch durch Sprachqualität auf.
 *
 * Quellen-Tags sind nur im Datenmodell und in der Audit-Ansicht sichtbar,
 * nicht in der Teilnehmerprüfung. `validatePoolQuality` prüft diese Regeln.
 */
export const ORAL_EXAM_POOL: OralExamPoolBlock[] = [
  // ===========================================================================
  // 1. Rechtsordnung / Staatskunde
  // ===========================================================================
  {
    blockId: 'fragen-013',
    questionOverride:
      'Darf das staatliche Gewaltmonopol auf Sicherheitsmitarbeiter übertragen werden?',
    answerOverride:
      'Nein, Sicherheitsmitarbeiter handeln auch bei öffentlichen Auftraggebern nur auf privatrechtlicher Grundlage ohne hoheitliche Befugnisse.',
    main: {
      distractors: [
        'Ja, mit einem öffentlichen Auftrag gehen die hoheitlichen Befugnisse der Behörde auf den Sicherheitsdienst über.',
        'Ja, hoheitliche Maßnahmen sind zulässig, solange die Behörde den Sicherheitsdienst ausdrücklich damit beauftragt.',
        'Ja, bei öffentlichen Auftraggebern gelten Sicherheitsmitarbeiter als Beliehene mit polizeigleichen Rechten.',
        'Nein, für öffentliche Auftraggeber dürfen Sicherheitsdienste überhaupt nicht tätig werden, weil solche Aufgaben der Polizei vorbehalten sind.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      question:
        'Auf welcher rechtlichen Grundlage dürfen Sicherheitsmitarbeiter gegenüber Personen tätig werden?',
      answer:
        'Auf privatrechtlicher Grundlage aus Hausrecht, Besitzschutz und den Jedermann-Rechten, die jedermann zustehen.',
      legalBasis: '§ 127 Abs. 1 StPO – Vorläufige Festnahme',
      distractors: [
        'Auf hoheitlicher Grundlage, weil Sicherheitsmitarbeiter zur Gefahrenabwehr gegenüber jedermann befugt sind.',
        'Auf richterlicher Grundlage, weil jede Maßnahme zuvor durch Beschluss des zuständigen Gerichts angeordnet und genehmigt werden müsste.',
        'Auf grundrechtlicher Grundlage, weil sich jede Person gegenüber Dritten auf ihre Grundrechte berufen kann.',
        'Auf gewerberechtlicher Grundlage, weil die Bewachungserlaubnis zugleich Eingriffsbefugnisse verleiht.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation:
        'Die Bibel stellt in Kapitel 43 klar: Der Sicherheitsdienst ist kein staatlicher Hoheitsträger.',
    },
    followUp2: {
      question:
        'Worin unterscheiden sich die Handlungsmöglichkeiten eines Sicherheitsmitarbeiters von denen eines Polizeivollzugsbeamten?',
      answer:
        'Die Polizei handelt hoheitlich nach den Polizeigesetzen, der Sicherheitsmitarbeiter nur im Rahmen privatrechtlicher Rechtfertigungsgründe.',
      distractors: [
        'Sicherheitsmitarbeiter haben dieselben Zwangsbefugnisse wie die Polizei, sobald sie im Dienst Uniform tragen.',
        'Sicherheitsmitarbeiter dürfen als Hilfsbeamte der Staatsanwaltschaft selbstständig Platzverweise erteilen.',
        'Die Polizei darf nach dieser Auffassung nur präventiv tätig werden, während Sicherheitsmitarbeiter umfassend zur Strafverfolgung berechtigt sind.',
        'Sicherheitsmitarbeiter haben weitergehende Befugnisse, weil sie unmittelbar für den Eigentümer handeln.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation:
        'Die Bibel betont die Abgrenzung zwischen hoheitlicher und privatrechtlicher Tätigkeit (Kapitel 43).',
    },
  },
  {
    blockId: 'fragen-012',
    questionOverride: 'Wer ist Inhaber des staatlichen Gewaltmonopols?',
    answerOverride:
      'Das Gewaltmonopol liegt beim Staat, der hoheitliche Gewalt ausübt und sie Privaten nicht überträgt.',
    main: {
      distractors: [
        'Das Gewaltmonopol liegt beim einzelnen Bürger, der es als Notwehrrecht gegenüber Angreifern ausübt.',
        'Das Gewaltmonopol liegt bei den Sicherheitsunternehmen, die mit Erlaubnis der Gewerbebehörde tätig werden.',
        'Das Gewaltmonopol liegt bei den Gemeinden, die für die öffentliche Sicherheit vor Ort verantwortlich sind.',
        'Das Gewaltmonopol liegt bei der Europäischen Union, die die Sicherheitsgewährleistung koordiniert.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      question:
        'Unter welchen Voraussetzungen dürfen Sicherheitsmitarbeiter körperliche Gewalt anwenden?',
      answer:
        'Nur wenn ein Rechtfertigungsgrund wie Notwehr oder rechtfertigender Notstand greift und die Gewalt nötig ist.',
      legalBasis: '§ 32 StGB – Notwehr; § 34 StGB – Rechtfertigender Notstand',
      distractors: [
        'Sobald der Auftraggeber oder der Vorgesetzte die Anwendung körperlicher Gewalt ausdrücklich anordnet.',
        'Nur nach vorheriger Einschaltung und Zustimmung der Polizei, weil Sicherheitsmitarbeiter keine eigenen Befugnisse besitzen.',
        'Sobald der Sicherheitsmitarbeiter von einer Person im Dienst beleidigt oder provoziert worden ist.',
        'Nur mit einer besonderen Erlaubnis der örtlichen Gewerbebehörde zur Ausübung körperlicher Gewalt.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp2: {
      question:
        'Warum dürfen Sicherheitsmitarbeiter keine staatliche Zwangsgewalt eigenständig ausüben?',
      answer:
        'Weil das Gewaltmonopol allein dem Staat zusteht und Private nur private Rechtfertigungsgründe haben.',
      distractors: [
        'Weil Sicherheitsmitarbeiter nicht über die körperliche Eignung verfügen, um hoheitlichen Zwang auszuüben.',
        'Weil Sicherheitsmitarbeiter auch in Notwehr nicht zu körperlicher Gewalt befugt sind.',
        'Weil das Sicherheitsgewerbe nur für die Beobachtung, nicht aber für den umfassenden Schutz von Personen zuständig ist.',
        'Weil jede Gewaltanwendung durch Private strafrechtlich verfolgt wird, unabhängig von ihrer Rechtfertigung.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
  },
  {
    blockId: 'fragen-015',
    questionOverride: 'Welche Befugnis vermittelt das Hausrecht dem Berechtigten?',
    answerOverride:
      'Das Hausrecht berechtigt den Inhaber, über den Zutritt und den Aufenthalt in den Räumlichkeiten zu bestimmen.',
    main: {
      distractors: [
        'Das Hausrecht berechtigt den Inhaber, jede angetroffene Person ohne weiteren Grund festzuhalten.',
        'Das Hausrecht berechtigt den Inhaber, die Sachen einer Person beim Betreten zu durchsuchen.',
        'Das Hausrecht berechtigt den Inhaber, Personen zu erkennungsdienstlichen Maßnahmen zu zwingen.',
        'Das Hausrecht berechtigt den Inhaber, gegen Besucher wegen Verstößen gegen die Hausordnung Bußgelder zu verhängen.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      question:
        'Wie kann der Inhaber des Hausrechts seine Befugnisse auf einen Sicherheitsmitarbeiter übertragen?',
      answer:
        'Durch vertragliche Beauftragung oder konkrete Weisung wird der Mitarbeiter Besitzdiener und handelt weisungsgebunden.',
      legalBasis: '§ 855 BGB – Besitzdiener',
      distractors: [
        'Durch die bloße Einstellung als Sicherheitsmitarbeiter, weil damit sämtliche Rechte des Arbeitgebers auf ihn übergehen.',
        'Durch die Aushändigung des Dienstausweises, weil dieser die Übertragung der Hausrechtsbefugnisse belegt.',
        'Durch eine Anzeige bei der örtlichen Gewerbebehörde, die die Befugnisse auf den Mitarbeiter überträgt.',
        'Durch die Eintragung des Mitarbeiters in das Bewacherregister bei der zuständigen Aufsichtsbehörde.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation: '§ 855 BGB: Der Besitzdiener handelt weisungsgebunden für den Besitzer.',
    },
    followUp2: {
      question:
        'Welche zwei Tathandlungen erfüllen den Hausfriedensbruch?',
      answer:
        'Das widerrechtliche Eindringen in geschützte Räume und das Verweilen darin trotz Aufforderung des Berechtigten.',
      legalBasis: '§ 123 StGB – Hausfriedensbruch',
      distractors: [
        'Die Beschädigung geschützter Räume und die unbefugte Nutzung des umfriedeten Grundstücks durch unbefugte Dritte.',
        'Die Wegnahme beweglicher Sachen und die Zueignung einer gefundenen Sache in den Räumen.',
        'Die Störung des Besitzes ohne Entziehung und die Entziehung des Besitzes durch Wegnahme.',
        'Die Belästigung von Besuchern und die Erregung öffentlichen Ärgernisses in den Räumen.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation:
        '§ 123 StGB: Eindringen oder Verweilen gegen den Willen des Berechtigten.',
    },
  },

  // ===========================================================================
  // 2. GewO / BewachV
  // ===========================================================================
  {
    blockId: 'fragen-029',
    mainDifficulty: 4,
    questionOverride:
      'Wie wird das Hausrecht des Berechtigten auf einen Sicherheitsmitarbeiter übertragen?',
    answerOverride:
      'Durch vertragliche Beauftragung oder Weisung des Berechtigten; der Mitarbeiter handelt dann als Besitzdiener.',
      mainLegalBasis: '§ 855 BGB – Besitzdiener',
    main: {
      distractors: [
        'Durch die behördliche Bewachungserlaubnis, die dem Sicherheitsunternehmen auch die Hausrechtsbefugnisse vermittelt.',
        'Durch das Tragen der Dienstkleidung, die nach außen die Berechtigung des Mitarbeiters dokumentiert.',
        'Durch einen Auszug aus dem Bewacherregister, in dem die Befugnisse jedes Mitarbeiters verzeichnet sind.',
        'Durch eine schriftliche Bestätigung der Polizei, dass der Mitarbeiter zum Schutz des Objekts befugt ist.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      question: 'Was kennzeichnet einen Besitzdiener?',
      answer:
        'Der Besitzdiener übt die tatsächliche Gewalt für einen anderen aus und ist dessen Weisungen unterworfen.',
      legalBasis: '§ 855 BGB – Besitzdiener',
      distractors: [
        'Der Besitzdiener übt die tatsächliche Gewalt im eigenen Namen aus und darf wie ein Eigentümer verfügen.',
        'Der Besitzdiener erwirbt mit der Übergabe der Sache das Recht zum Besitz und wird damit selbst Besitzer.',
        'Der Besitzdiener erlangt mit der Ausübung der Gewalt auch das Eigentum an der fremden Sache.',
        'Der Besitzdiener haftet persönlich für die Sache und muss für deren Erhalt einstehen.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation: '§ 855 BGB: tatsächliche Gewalt für einen anderen.',
    },
    followUp2: {
      question: 'Welche Grenzen gelten für die Befugnisse eines Besitzdieners?',
      answer:
        'Er bleibt an Weisungen gebunden und darf nur die Rechte des Besitzers ausüben, nichts darüber hinaus.',
      legalBasis: '§ 860 BGB – Selbsthilfe des Besitzdieners',
      distractors: [
        'Er darf die Rechte des Besitzers nach eigenem Ermessen ausweiten, solange er den Erfolg sichert.',
        'Er darf die Sache des Besitzers verwerten, wenn dieser nicht erreichbar ist und dringende Gefahr im Verzug besteht.',
        'Er darf gegen Besucher körperlichen Zwang anwenden, weil er die tatsächliche Gewalt innehat.',
        'Er ist an Weisungen nur gebunden, soweit sie mit den Interessen des Besitzers übereinstimmen.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation:
        'Die Bibel ordnet § 860 BGB als Ausübung der §§ 855/859-Rechte ein und betont: keine allgemeine Festnahmebefugnis.',
    },
  },
  {
    blockId: 'fragen-021',
    questionOverride: 'Welchen Regelungsgegenstand hat die Vorschrift zum Bewachungsgewerbe?',
    answerOverride:
      'Er regelt die Voraussetzungen der gewerblichen Bewachung, insbesondere Zuverlässigkeit, Sachkunde und Erlaubnispflichten.',
      mainLegalBasis: '§ 34a GewO – Bewachungsgewerbe',
    main: {
      distractors: [
        'Er regelt den Einsatz von Sicherheitsmitarbeitern bei der Strafverfolgung und überträgt ihnen dabei unmittelbar polizeiliche Befugnisse.',
        'Er regelt die technische Ausrüstung von Sicherheitsunternehmen und schreibt bestimmte Sicherheitssysteme vor.',
        'Er regelt die arbeitsrechtlichen Ansprüche von Wachpersonen und legt Mindestlöhne für das Gewerbe fest.',
        'Er regelt die Aufbewahrung von Schusswaffen und die Erteilung von Waffenscheinen im Sicherheitsgewerbe.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      question: 'Für welche Tätigkeiten ist die Sachkundeprüfung zwingend erforderlich?',
      answer:
        'Für Tätigkeiten mit erhöhtem Gefahrenpotenzial, etwa Kontrollgänge im öffentlichen Verkehrsraum oder Bewachung im Einlassbereich von Diskotheken.',
      distractors: [
        'Für die Bewachung privater Wohnungen und die Betreuung von Wohnanlagen im Auftrag der jeweiligen Eigentümergemeinschaft und der zuständigen Hausverwaltung.',
        'Für die reine Pfortentätigkeit in einem Verwaltungsgebäude, bei der lediglich Besucher angemeldet werden.',
        'Für die Ausübung des Bewachungsgewerbes als Gewerbetreibender, der selbst keinen Wachdienst mehr ausübt.',
        'Für Tätigkeiten, bei denen keine personenbezogenen Daten verarbeitet und keine Personen kontrolliert werden.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      question: 'Was bedeutet Zuverlässigkeit im Bewachungsgewerbe?',
      answer:
        'Zuverlässig ist, wer die Gewähr für eine ordnungsgemäße Ausübung des Gewerbes bietet, was die Behörde überprüft.',
      distractors: [
        'Zuverlässig ist, wer eine abgeschlossene Berufsausbildung und mindestens fünf Jahre Berufserfahrung nachweist.',
        'Zuverlässig ist, wer über eine gültige Haftpflichtversicherung verfügt und seine Beiträge fristgerecht entrichtet.',
        'Zuverlässig ist, wer Mitglied in einem anerkannten Berufsverband ist und dessen Verhaltenskodex befolgt.',
        'Zuverlässig ist, wer die Sachkundeprüfung bei der Industrie- und Handelskammer erfolgreich abgelegt hat.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-028',
    questionOverride: 'Was ist unter dem Hausrecht zu verstehen?',
    answerOverride:
      'Das Hausrecht ist die Befugnis des Inhabers, über Zutritt und Aufenthalt in seinen Räumlichkeiten zu bestimmen.',
    main: {
      distractors: [
        'Das Hausrecht ist die Befugnis des Sicherheitsunternehmens, über die Nutzung eines Objekts im eigenen Namen zu bestimmen.',
        'Das Hausrecht ist das Recht der Behörden, private Räume zum Zweck der Gefahrenabwehr jederzeit zu betreten.',
        'Das Hausrecht ist das Recht des Staates, private Grundstücke für öffentliche Zwecke in Anspruch zu nehmen.',
        'Das Hausrecht ist das Recht des Besitzers, jede angetroffene Person ohne weiteren Grund festzuhalten.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      question: 'Wie wird das Hausrecht auf einen Sicherheitsmitarbeiter übertragen?',
      answer:
        'Durch Beauftragung oder Weisung des Berechtigten; der Mitarbeiter wird dadurch zum Besitzdiener und handelt weisungsgebunden.',
      distractors: [
        'Durch eine behördliche Genehmigung, welche die Hausrechtsbefugnisse auf das Sicherheitsunternehmen überträgt und ihn berechtigt.',
        'Durch die bloße Anwesenheit im Objekt, weil sich die Befugnisse aus der tatsächlichen Sachherrschaft ergeben.',
        'Durch einen Gerichtsbeschluss, der die Übertragung der Hausrechtsbefugnisse auf private Dritte regelt.',
        'Durch die Eintragung des Mitarbeiters in das Bewacherregister bei der zuständigen Aufsichtsbehörde.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      question:
        'Wann kommt eine Strafbarkeit wegen Hausfriedensbruchs in Betracht?',
      answer:
        'Wenn jemand widerrechtlich eindringt oder trotz Aufforderung des Berechtigten in den geschützten Räumen verweilt.',
      legalBasis: '§ 123 StGB – Hausfriedensbruch',
      distractors: [
        'Wenn jemand eine fremde bewegliche Sache beschädigt oder zerstört, die sich in den geschützten Räumen des Berechtigten befindet.',
        'Wenn jemand eine fremde bewegliche Sache wegnimmt, um sie sich oder einem Dritten zuzueignen.',
        'Wenn jemand einen anderen durch Gewalt oder Drohung zu einer Handlung oder Duldung nötigt.',
        'Wenn jemand den Besitz eines anderen ohne dessen Willen stört, ohne ihn vollständig zu entziehen.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },

  // ===========================================================================
  // 3. Datenschutz
  // ===========================================================================
  {
    blockId: 'fragen-047',
    questionOverride: 'Was schützt das Recht auf informationelle Selbstbestimmung?',
    answerOverride:
      'Es schützt die Befugnis jeder Person, selbst über Preisgabe und Verwendung ihrer personenbezogenen Daten zu bestimmen.',
    main: {
      distractors: [
        'Es schützt die Befugnis des Verantwortlichen, Daten für eigene Zwecke zu erheben, ohne die Betroffenen zu informieren.',
        'Es schützt das Eigentum an Datenträgern und sichert dem Inhaber die Verfügungsgewalt über gespeicherte Dateien.',
        'Es schützt die Vertraulichkeit von Betriebs- und Geschäftsgeheimnissen gegenüber Wettbewerbern und der Öffentlichkeit.',
        'Es schützt die Ehre und den Ruf einer Person vor wahrheitswidrigen Tatsachenbehauptungen Dritter.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      question: 'Welche Informationen gelten als personenbezogene Daten?',
      answer:
        'Alle Informationen, die sich auf eine identifizierte oder identifizierbare Person beziehen, etwa Name oder Bildaufnahmen.',
      distractors: [
        'Nur Informationen, die den vollständigen Namen enthalten und vom Verantwortlichen dauerhaft gespeichert und genutzt werden.',
        'Alle in einem Unternehmen vorhandenen Informationen, unabhängig davon, ob ein Personenbezug besteht.',
        'Nur Informationen, die zu einer besonders sensiblen Kategorie wie Gesundheits- oder Religionsdaten gehören.',
        'Informationen über juristische Personen wie Firmenname, Sitz und Handelsregistereintrag.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      question: 'Was bedeutet der Grundsatz der Zweckbindung?',
      answer:
        'Daten dürfen nur für den festgelegten, eindeutigen und legitimen Zweck verarbeitet und nicht zweckfremd genutzt werden.',
      distractors: [
        'Daten dürfen so lange aufbewahrt werden, wie es für die Geschäftstätigkeit des Verantwortlichen nützlich und vorteilhaft ist.',
        'Daten dürfen an Dritte übermittelt werden, sobald diese ein eigenes berechtigtes Interesse geltend machen.',
        'Daten dürfen für neue Zwecke verwendet werden, wenn der Betroffene die ursprüngliche Erhebung geduldet hat.',
        'Daten dürfen ohne zeitliche Begrenzung gespeichert werden, solange sie technisch verfügbar sind.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-048',
    questionOverride: 'Was bezweckt der Datenschutz?',
    answerOverride:
      'Er schützt natürliche Personen bei der Verarbeitung ihrer Daten und regelt, wann diese erhoben, gespeichert und gelöscht werden dürfen.',
    main: {
      distractors: [
        'Er schützt Unternehmen vor der unerlaubten Ausspähung ihrer Betriebs- und Geschäftsgeheimnisse durch Wettbewerber.',
        'Er schützt den Staat vor der unerlaubten Verbreitung amtlicher Informationen und Dokumente durch private Stellen und gewerbliche Unternehmen.',
        'Er schützt gespeicherte Datenbestände als solche vor Verlust, Beschädigung und technischem Ausfall der Systeme.',
        'Er schützt das Urheberrecht an digitalen Inhalten und regelt deren zulässige Nutzung durch Dritte.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      question: 'Für wen gilt die Datenschutz-Grundverordnung?',
      answer:
        'Sie gilt für die Verarbeitung personenbezogener Daten natürlicher Personen, auch durch private Sicherheitsdienste.',
      distractors: [
        'Sie gilt nur für staatliche Behörden und Gerichte, die personenbezogene Daten zu hoheitlichen Zwecken verarbeiten.',
        'Sie gilt nur für Unternehmen mit mehr als zweihundertfünfzig Beschäftigten oder mit Sitz außerhalb der Union.',
        'Sie gilt nur für Anbieter von Telemedien und sozialen Netzwerken, die Daten im Internet verarbeiten.',
        'Sie gilt für Sicherheitsdienste nicht, weil diese die Daten nur im Auftrag des Eigentümers verarbeiten.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      question: 'Welche Grundsätze prägen die Verarbeitung personenbezogener Daten?',
      answer:
        'Rechtmäßigkeit, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung sowie Integrität und Vertraulichkeit.',
      distractors: [
        'Vollständigkeit, Dauerhaftigkeit, freie Verfügbarkeit, wirtschaftliche Verwertbarkeit und Geheimhaltung.',
        'Freiwilligkeit, Anonymität, Unentgeltlichkeit, Schriftform und Zustimmung der Aufsichtsbehörde im Einzelfall.',
        'Transparenz, Gewinnorientierung, zentrale Speicherung, uneingeschränkte Weitergabe und technische Machbarkeit.',
        'Sparsamkeit, Vertraulichkeit, Richtigkeit, schnelle Löschung und die unbedingte Gleichbehandlung aller betroffenen Personen.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-052',
    questionOverride: 'Was sind personenbezogene Daten?',
    answerOverride:
      'Alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen.',
    main: {
      distractors: [
        'Nur der vollständige Name und die Anschrift einer natürlichen Person, andere Angaben fallen nicht darunter.',
        'Angaben über Sachen wie Fahrzeugdaten, solange kein Bezug zu einer konkreten Person herstellbar ist.',
        'Alle Daten, die verschlüsselt auf einem Server gespeichert sind und besonders geschützt werden müssen.',
        'Nur Daten, die von staatlichen Stellen zu hoheitlichen Zwecken erhoben und verarbeitet werden.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      question:
        'Welche Daten gehören zu den besonders geschützten Kategorien personenbezogener Daten?',
      answer:
        'Daten über Gesundheit, biometrische Merkmale, politische Meinungen, Religion sowie Sexualleben oder Orientierung.',
      distractors: [
        'Daten über Name, Anschrift, Geburtsdatum und Kfz-Kennzeichen einer Person, die im Alltag besonders häufig erhoben werden.',
        'Daten über das Einkommen, die Kreditwürdigkeit und bestehende Verbindlichkeiten einer Person.',
        'Daten über die berufliche Tätigkeit, den Arbeitgeber und die Dienstanschrift eines Beschäftigten.',
        'Daten über die Mitgliedschaft in einem Sportverein, einer Partei oder einem Arbeitgeberverband.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      question: 'Welche Angaben sind typische Beispiele für personenbezogene Daten?',
      answer:
        'Name, Geburtsdatum, Anschrift, Fahrzeugkennzeichen, Ausweisnummer sowie Foto- und Videoaufnahmen einer Person.',
      distractors: [
        'Die Öffnungszeiten eines Betriebs, die Anzahl der Parkplätze und die Anschrift des Unternehmens.',
        'Wetterdaten, Uhrzeiten und technische Messwerte ganz ohne Bezug zu einer natürlichen Person.',
        'Kennzahlen zur Betriebsleistung und Angaben zur Auslastung einer öffentlichen Einrichtung.',
        'Daten, die der Betroffene selbst im Internet veröffentlicht hat, weil diese für jedermann öffentlich zugänglich sind.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },

  // ===========================================================================
  // 4. BGB
  // ===========================================================================
  {
    blockId: 'fragen-084',
    questionOverride: 'Worin unterscheiden sich Besitz und Eigentum?',
    answerOverride:
      'Besitz ist die tatsächliche Sachherrschaft, Eigentum das umfassende rechtliche Herrschaftsrecht; beides kann auseinanderfallen.',
      mainLegalBasis: '§§ 854, 903 BGB – Besitz und Eigentum',
    main: {
      distractors: [
        'Besitz ist das rechtliche Herrschaftsrecht, Eigentum die tatsächliche Sachherrschaft über eine Sache.',
        'Besitz und Eigentum fallen zusammen, weil der Besitzer einer Sache zugleich ihr Eigentümer ist.',
        'Besitz ist ein dingliches Recht an einer fremden Sache, Eigentum lediglich die bloße Möglichkeit der tatsächlichen Einwirkung auf die Sache.',
        'Besitz kann nur der Eigentümer haben, während dingliche Rechte Dritter am Besitz nichts ändern.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      question:
        'In welcher Konstellation fallen Besitz und Eigentum an einer Sache auseinander?',
      answer:
        'Beim Mietverhältnis: Der Mieter ist Besitzer der Wohnung, während der Vermieter deren Eigentümer bleibt.',
      legalBasis: '§§ 854, 903 BGB – Besitz und Eigentum',
      distractors: [
        'Beim Erwerb einer Sache: Der Käufer wird mit dem Abschluss des Kaufvertrags zugleich Besitzer und Eigentümer der Sache.',
        'Bei der Erbschaft: Der Erbe wird mit dem Erbfall Besitzer, ohne jemals Eigentümer zu werden.',
        'Bei der Fundunterschlagung: Der Finder wird mit dem Besitz auch Eigentümer der gefundenen Sache.',
        'Bei der Verwahrung: Der Verwahrer wird Besitzer und zugleich Eigentümer der anvertrauten Sache.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp2: {
      question: 'Was ist ein Besitzdiener?',
      answer:
        'Ein Besitzdiener übt die tatsächliche Gewalt für einen anderen aus und unterliegt dessen Weisungen.',
      legalBasis: '§ 855 BGB – Besitzdiener',
      distractors: [
        'Ein Besitzdiener übt die tatsächliche Gewalt über eine Sache im eigenen Namen für sich selbst aus.',
        'Ein Besitzdiener ist der Eigentümer einer Sache, der sie einem Dritten zum Gebrauch überlassen hat.',
        'Ein Besitzdiener ist der Gläubiger eines Anspruchs, der sich zur Sicherung eine Sache verschafft.',
        'Ein Besitzdiener ist der Finder einer Sache, der sie zum Zweck der Rückgabe an sich nimmt.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation: '§ 855 BGB: Besitzdiener übt die tatsächliche Gewalt für einen anderen aus.',
    },
  },
  {
    blockId: 'fragen-081',
    questionOverride: 'Wodurch unterscheiden sich öffentliches Recht und privates Recht?',
    answerOverride:
      'Öffentliches Recht regelt das Verhältnis zwischen Staat und Bürger, privates Recht das Verhältnis gleichgeordneter Rechtssubjekte.',
    main: {
      distractors: [
        'Öffentliches Recht regelt das Verhältnis zwischen gleichgeordneten Bürgern, privates Recht das Verhältnis zwischen Staat und seinen Bürgern.',
        'Öffentliches Recht ist das Strafrecht, privates Recht ist das Zivilrecht einschließlich des Verwaltungsrechts.',
        'Öffentliches Recht gilt nur gegenüber Behörden, privates Recht nur gegenüber juristischen Personen.',
        'Öffentliches Recht ist ungeschriebenes Richterrecht, privates Recht ist gesetztes Recht des Bundes.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      question: 'Welcher Bereich ist dem öffentlichen Recht zuzuordnen?',
      answer:
        'Das Polizei- und Ordnungsrecht, weil der Staat dem Bürger dabei hoheitlich gegenübertritt.',
      distractors: [
        'Der Kaufvertrag, weil er die Rechte und Pflichten zweier gleichgeordneter Privatpersonen regelt.',
        'Das Mietverhältnis, weil es auf der freien Einigung zweier gleichgeordneter Parteien beruht.',
        'Der Arbeitsvertrag, weil er zwischen Arbeitgeber und Arbeitnehmer abgeschlossen wird.',
        'Die unerlaubte Handlung, weil sie einen Schadensersatzanspruch zwischen Privaten begründet.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp2: {
      question: 'Wie ist die Tätigkeit eines Sicherheitsmitarbeiters rechtlich einzuordnen?',
      answer:
        'Sie ist dem privaten Recht zuzuordnen, weil er auf privatrechtlicher Grundlage handelt.',
      distractors: [
        'Sie ist dem öffentlichen Recht zuzuordnen, weil der Sicherheitsmitarbeiter wie eine Behörde tätig wird.',
        'Sie ist dem Strafrecht zuzuordnen, weil der Sicherheitsmitarbeiter vorrangig Straftaten verfolgt.',
        'Sie ist dem Völkerrecht zuzuordnen, weil grenzüberschreitende Sicherheitsaufgaben betroffen sind.',
        'Sie ist dem öffentlichen Recht zuzuordnen, weil sie gewerberechtlich überlagert wird.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
  },
  {
    blockId: 'fragen-092',
    questionOverride:
      'Wozu berechtigt die Selbsthilfe des Besitzers?',
    answerOverride:
      'Der Besitzer darf sich verbotener Eigenmacht mit Gewalt erwehren und sich sofort wieder in den Besitz setzen.',
      mainLegalBasis: '§ 859 BGB – Selbsthilfe des Besitzers',
    main: {
      distractors: [
        'Der Besitzer darf den Störer festnehmen und bis zum Eintreffen der Polizei in einem Raum einschließen.',
        'Der Besitzer darf die Sache des Störers als Sicherheit behalten und sie nach Ablauf einer angemessenen Frist verwerten.',
        'Der Besitzer darf jede Person, die sich im Umkreis der Störung aufhält, des Objekts verweisen.',
        'Der Besitzer darf zur Abwehr der Störung eine Waffe einsetzen, wenn er sich bedroht fühlt.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      question: 'Was bedeutet das Merkmal „sofort“ bei der Besitzerselbsthilfe?',
      answer:
        '„Sofort“ bedeutet unmittelbar im Anschluss an die Störung und ohne schuldhaftes Zögern zu handeln.',
      legalBasis: '§ 859 BGB – Selbsthilfe des Besitzers',
      distractors: [
        '„Sofort“ bedeutet, innerhalb einer angemessenen Frist von wenigen Tagen nach der Störung zu handeln.',
        '„Sofort“ bedeutet, jederzeit auch noch Wochen später gegen die Störung vorzugehen.',
        '„Sofort“ bedeutet, erst nach Einschaltung der Polizei und deren Zustimmung zur Selbsthilfe zu handeln.',
        '„Sofort“ bedeutet, nach Ablauf einer Überlegungsfrist zu handeln, sofern der Störer noch anwesend ist.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation: '§ 859 BGB: unmittelbare Besitzerselbsthilfe ohne schuldhaftes Zögern.',
    },
    followUp2: {
      question: 'Was bedeutet das Merkmal der Angemessenheit bei der Besitzwehr?',
      answer:
        'Die Verteidigung muss erforderlich sein und darf nicht außer Verhältnis zur Störung stehen.',
      legalBasis: '§ 859 BGB – Selbsthilfe des Besitzers',
      distractors: [
        'Die Verteidigung muss den Störer möglichst nachhaltig abschrecken, damit er von weiteren Störungen absieht.',
        'Die Verteidigung muss vor der Ausübung gegenüber dem Störer angekündigt und begründet werden.',
        'Die Verteidigung muss von einem Zeugen beobachtet werden, um später beweisbar zu sein.',
        'Die Verteidigung muss durch den Besitzer selbst erfolgen und darf nicht delegiert werden.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation: 'Die Bibel betont: § 859 ist kein allgemeiner Freibrief zur Gewaltanwendung.',
    },
  },

  // ===========================================================================
  // 5. StGB / StPO
  // ===========================================================================
  {
    blockId: 'fragen-124',
    questionOverride:
      'Unter welchen Voraussetzungen ist die vorläufige Festnahme zulässig?',
    answerOverride:
      'Wenn die Person auf frischer Tat betroffen oder verfolgt wird und zusätzlich Fluchtverdacht besteht oder die Identität unklar ist.',
      mainLegalBasis: '§ 127 Abs. 1 StPO – Vorläufige Festnahme',
    main: {
      distractors: [
        'Wenn gegen die Person ein dringender Tatverdacht wegen einer schweren Straftat und ein richterlicher Haftbefehl zur Untersuchungshaft vorliegen.',
        'Wenn die Person die Tat gegenüber dem Sicherheitsmitarbeiter gestanden und die Beute vollständig übergeben hat.',
        'Wenn die Person einer Straftat verdächtigt wird und der Auftraggeber der Festhaltung ausdrücklich zustimmt.',
        'Wenn die Person sich ohne Ausweis im Objekt aufhält und keine Angaben zu ihrer Identität machen kann.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      question: 'Wann ist eine Person auf frischer Tat betroffen?',
      answer:
        'Wer bei der Tat, unmittelbar danach oder in Verfolgung durch Tatopfer oder Zeugen angetroffen wird.',
      legalBasis: '§ 127 Abs. 1 StPO – Vorläufige Festnahme',
      distractors: [
        'Wer innerhalb einer Woche nach der Tat aufgrund von Ermittlungen der Polizei angetroffen wird.',
        'Wer die Tat später gesteht, auch wenn er erst nach mehreren Wochen von der Polizei angetroffen wird.',
        'Wer von Zeugen namentlich benannt wird, ohne bei der Tat selbst anwesend gewesen zu sein.',
        'Wer sich am Tatort aufhält und erst durch die späteren Ermittlungen mit der Tat in Verbindung gebracht wird.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation: '§ 127 StPO verlangt das Betreffen oder Verfolgen auf frischer Tat.',
    },
    followUp2: {
      question: 'Was ist unter Fluchtverdacht im Sinne der Festnahmebefugnis zu verstehen?',
      answer:
        'Die aufgrund konkreter Umstände begründete Befürchtung, dass sich die Person der Strafverfolgung entziehen wird.',
      legalBasis: '§ 127 Abs. 1 StPO – Vorläufige Festnahme',
      distractors: [
        'Die bloße Möglichkeit, dass gegen die Person irgendein Verdacht einer Straftat im Raum steht oder künftig stehen könnte.',
        'Die Absicht der Person, eine Auslandsreise zu unternehmen und einen Flug gebucht zu haben.',
        'Die Weigerung der Person, sich zu äußern und eine Aussage gegenüber der Polizei zu machen.',
        'Der Umstand, dass die Person über keinen festen Arbeitsplatz verfügt oder arbeitslos ist.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation: '§ 127 StPO: Fluchtverdacht ist eng am konkreten Sachverhalt zu prüfen.',
    },
  },
  {
    blockId: 'fragen-127',
    questionOverride:
      'Welche Handlungen erfüllen den Hausfriedensbruch?',
    answerOverride:
      'Das widerrechtliche Eindringen in geschützte Räume oder das Verweilen trotz Aufforderung.',
      mainLegalBasis: '§ 123 StGB – Hausfriedensbruch',
    main: {
      distractors: [
        'Das Beschädigen einer fremden beweglichen Sache, die sich in den geschützten Räumen befindet.',
        'Das Wegnehmen einer fremden beweglichen Sache, um sie sich oder einem Dritten zuzueignen.',
        'Das körperliche Misshandeln oder Gesundheitsschädigen einer anderen Person.',
        'Das Nötigen einer anderen Person mit Gewalt oder Drohung zu einer Handlung.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      question: 'Welche beiden Handlungsvarianten kennt der Hausfriedensbruch?',
      answer: 'Das Eindringen in geschützte Räume und das Verweilen trotz Aufforderung, sich zu entfernen.',
      legalBasis: '§ 123 StGB – Hausfriedensbruch',
      distractors: [
        'Das Beschädigen der Räume und das unbefugte Nutzen der darin befindlichen Einrichtungen.',
        'Das Entziehen des Besitzes und die Störung des Besitzes ohne Entziehung der Sache.',
        'Das offene und das heimliche Vorgehen gegen den Willen des Berechtigten.',
        'Das Betreten in Begleitung mehrerer Personen und das Betreten unter Mitführung eines Werkzeugs.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp2: {
      question: 'Wie ist Hausfriedensbruch verfolgungsrechtlich einzuordnen?',
      answer:
        'Hausfriedensbruch ist ein Antragsdelikt; die Strafverfolgung setzt grundsätzlich einen Strafantrag des Berechtigten voraus.',
      distractors: [
        'Hausfriedensbruch ist ein Offizialdelikt und wird von der Staatsanwaltschaft ohne Weiteres verfolgt.',
        'Hausfriedensbruch ist ein reines Privatklagedelikt, das nur zivilrechtlich und nicht strafrechtlich verfolgt werden kann und darf.',
        'Hausfriedensbruch ist ein Verbrechen und wird mit einer Freiheitsstrafe von mindestens einem Jahr geahndet.',
        'Hausfriedensbruch wird nur auf Anordnung der Polizei verfolgt, wenn Gefahr im Verzug besteht.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation: '§ 123 StGB ist Antragsdelikt.',
    },
  },
  {
    blockId: 'fragen-114',
    mainDifficulty: 4,
    questionOverride: 'Wann ist eine Verteidigungshandlung im Sinne der Notwehr erforderlich?',
    answerOverride:
      'Erforderlich ist die Verteidigung, die den gegenwärtigen rechtswidrigen Angriff sicher und sofort beendet und das mildeste wirksame Mittel darstellt.',
      mainLegalBasis: '§ 32 StGB – Notwehr',
    main: {
      distractors: [
        'Erforderlich ist die Verteidigung, die dem Angreifer den nachhaltigsten Schaden zufügt und ihn abschreckt.',
        'Erforderlich ist die Verteidigung, die der Angegriffene selbst für angemessen und richtig hält, auch wenn ein milderes Mittel zur Verfügung stehen würde.',
        'Erforderlich ist die Verteidigung, die zuvor angekündigt und dem Angreifer zur Kenntnis gebracht worden ist.',
        'Erforderlich ist die Verteidigung, die von mehreren Personen gemeinsam und arbeitsteilig ausgeübt wird.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      question: 'Was ist unter dem mildesten Mittel im Rahmen der Notwehr zu verstehen?',
      answer:
        'Das Mittel, das den Angriff sicher beendet und den Angreifer dabei am geringsten beeinträchtigt.',
      legalBasis: '§ 32 StGB – Notwehr',
      distractors: [
        'Das schwächste verfügbare Mittel, auch wenn es den gegenwärtigen Angriff nicht sicher zu beenden vermag.',
        'Der Rückzug aus der Gefahrenzone, und zwar unabhängig von den Umständen des Einzelfalls.',
        'Das Gespräch, das jeder körperlichen Einwirkung auf den Angreifer zwingend vorausgehen muss.',
        'Das Mittel, das der Angreifer am wenigsten bemerkt und am wenigsten erwartet.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp2: {
      question: 'Wann ist ein Verteidigungsmittel zur Abwehr eines Angriffs geeignet?',
      answer:
        'Geeignet ist ein Mittel, das den gegenwärtigen rechtswidrigen Angriff tatsächlich und sofort beenden kann.',
      legalBasis: '§ 32 StGB – Notwehr',
      distractors: [
        'Geeignet ist ein Mittel, das dem Angegriffenen gut vertraut ist und das er sicher und routiniert beherrscht.',
        'Geeignet ist ein Mittel, das keine sichtbaren Verletzungen beim Angreifer hinterlässt.',
        'Geeignet ist ein Mittel, das zuvor mit dem Angreifer abgestimmt und akzeptiert wurde.',
        'Geeignet ist ein Mittel, das der Angreifer seinerseits zuerst eingesetzt hat.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation: '§ 32 StGB: erforderliche Verteidigung = geeignetes, mildestes Mittel.',
    },
  },

  // ===========================================================================
  // 6. Waffen
  // ===========================================================================
  {
    blockId: 'fragen-151',
    questionOverride: 'Was ist eine Waffe im Sinne des Waffengesetzes?',
    answerOverride:
      'Ein Gegenstand, der seiner Natur nach dazu bestimmt ist, Angriffe abzuwehren oder zuzufügen.',
    main: {
      distractors: [
        'Eine Schusswaffe, mit der Geschosse durch einen Lauf verschossen werden können, und gar nichts anderes.',
        'Jeder beliebige Gegenstand, der im Einzelfall dazu geeignet ist, eine Person zu verletzen.',
        'Nur ein Gegenstand, dessen Erwerb und Besitz nach dem Waffengesetz ausdrücklich verboten sind.',
        'Nur ein Gegenstand, den Sicherheitskräfte im Dienst zu führen berechtigt sind.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      question: 'Was sind verbotene Waffen?',
      answer:
        'Gegenstände, deren Erwerb, Besitz und Führen allgemein untersagt sind, etwa Schlagringe oder Butterflymesser.',
      distractors: [
        'Alle Schusswaffen, für die bislang noch keine gültige Waffenbesitzkarte oder waffenrechtliche Erlaubnis erteilt worden ist.',
        'Nur Gegenstände, die ausdrücklich unter das Kriegswaffenkontrollgesetz fallen und verboten sind.',
        'Alle Gegenstände, die im Einzelfall geeignet sind, einer Person erhebliche Verletzungen zuzufügen.',
        'Feuerwaffen, deren Kaliber einen bestimmten gesetzlichen Grenzwert deutlich überschreitet.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      question: 'Was bedeutet das Führen einer Waffe?',
      answer:
        'Die Ausübung der tatsächlichen Gewalt über eine Waffe außerhalb der eigenen Wohnung oder Geschäftsräume.',
      distractors: [
        'Die Aufbewahrung einer Waffe im eigenen Zuhause in einem dafür zugelassenen und geprüften Sicherheitsbehältnis.',
        'Der Transport einer ungeladenen Waffe im verschlossenen Behältnis zu einem anderen Ort.',
        'Der rechtmäßige Erwerb einer Waffe und die Begründung von Eigentum an ihr.',
        'Das gezielte Schießen mit einer Waffe auf einem dafür zugelassenen Schießstand.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-164',
    questionOverride:
      'Unter welchen Voraussetzungen darf ein Sicherheitsmitarbeiter im Dienst eine Waffe führen?',
    answerOverride:
      'Nur wenn eine waffenrechtliche Erlaubnis vorliegt und der Arbeitgeber den Waffeneinsatz für die konkrete Tätigkeit zulässt.',
    main: {
      distractors: [
        'Sobald der Auftraggeber den Waffeneinsatz ausdrücklich wünscht und die Kosten für Ausrüstung und Ausbildung vollständig übernimmt.',
        'Sobald der Mitarbeiter die Sachkundeprüfung für das Bewachungsgewerbe erfolgreich abgelegt hat.',
        'Sobald der Mitarbeiter die Waffe von einem berechtigten Kollegen übernimmt und dessen Erlaubnis vorlegt.',
        'Sobald der Einsatz im Nachtdienst erfolgt und dadurch ein erhöhtes Gefährdungspotenzial besteht.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      question: 'Welche Stelle erteilt die waffenrechtliche Erlaubnis zum Führen einer Waffe?',
      answer:
        'Die zuständige Waffenbehörde; zusätzlich muss der Arbeitgeber den Waffeneinsatz für die Tätigkeit freigeben.',
      distractors: [
        'Die örtliche Gewerbebehörde erteilt die Erlaubnis zusammen mit der Bewachungserlaubnis.',
        'Die Polizei erteilt die Erlaubnis für den Bewachungsdienst im jeweiligen Einzelfall.',
        'Die Industrie- und Handelskammer erteilt die Erlaubnis zusammen mit dem Sachkundenachweis für das Bewachungsgewerbe.',
        'Der Auftraggeber erteilt die Erlaubnis, weil er die Bewachungsleistung bestellt hat.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      question: 'Für welche Tätigkeiten kommt eine Bewaffnung von Sicherheitsmitarbeitern in Betracht?',
      answer:
        'Nur für Tätigkeiten mit besonders hohem Gefährdungspotenzial, etwa Geld- und Werttransporte.',
      distractors: [
        'Für jede Tätigkeit im Einlassbereich einer Diskothek, weil dort gewalttätige Auseinandersetzungen drohen.',
        'Für alle Kontrollgänge im öffentlichen Verkehrsraum, weil dort kein Hausrecht des Auftraggebers besteht.',
        'Für die Bewachung von Bürogebäuden, weil dort besonders hochwertige Sachen gelagert werden.',
        'Für jede Großveranstaltung mit mehr als hundert Besuchern, unabhängig von der Art der Veranstaltung.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-156',
    questionOverride:
      'Welche Erlaubnis benötigt man, um eine erlaubnispflichtige Schusswaffe zu führen?',
    answerOverride:
      'Einen Waffenschein, der die Ausübung der tatsächlichen Gewalt über die Waffe außerhalb der eigenen Räume erlaubt.',
    main: {
      distractors: [
        'Eine Waffenbesitzkarte, die den Erwerb und den Besitz der Waffe erlaubt, aber nicht das Führen.',
        'Eine Gewerbeerlaubnis für das Bewachungsgewerbe in Verbindung mit der Sachkundeprüfung.',
        'Einen Jagdschein, sofern die Waffe zum Zweck des Jagdschutzes erworben und geführt wird.',
        'Ein polizeiliches Führungszeugnis ohne Eintragung in Verbindung mit einem anerkannten und nachgewiesenen Bedürfnis.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      question: 'Wer erhält einen Waffenschein?',
      answer:
        'Wer zuverlässig und persönlich geeignet ist, ein anerkanntes Bedürfnis nachweist, sachkundig und alt genug ist.',
      distractors: [
        'Wer volljährig ist und einen Auszug aus dem Führungszeugnis ohne Eintragung vorlegt.',
        'Wer Mitglied in einem anerkannten Schützenverein ist und dort regelmäßig trainiert.',
        'Wer eine Waffe geerbt hat und deren Besitz binnen eines Monats bei der Behörde anmeldet.',
        'Wer im Sicherheitsgewerbe bereits mindestens fünf Jahre ununterbrochen und ohne Beanstandung beschäftigt gewesen ist.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      question:
        'Welche Voraussetzungen werden für die Erteilung einer waffenrechtlichen Erlaubnis geprüft?',
      answer:
        'Zuverlässigkeit, persönliche Eignung, ein anerkanntes Bedürfnis, die Sachkunde und das vorgeschriebene Mindestalter.',
      distractors: [
        'Das Mindestalter, die vollständige Entrichtung der amtlichen Gebühr und die Vorlage eines gültigen Lichtbildausweises.',
        'Die berufliche Erfahrung, ein ärztliches Attest und die Mitgliedschaft in einem Verband.',
        'Die Wohnverhältnisse, die Höhe des Einkommens und die Anzahl bereits vorhandener Schusswaffen.',
        'Ein polizeiliches Führungszeugnis, ein Waffenschrank und eine Haftpflichtversicherung.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },

  // ===========================================================================
  // 7. DGUV / UVV
  // ===========================================================================
  {
    blockId: 'fragen-166',
    questionOverride:
      'Welche berufsgenossenschaftlichen Vorschriften sind für Wach- und Sicherungsdienste besonders bedeutsam?',
    answerOverride:
      'Die DGUV Vorschrift 1 „Grundsätze der Prävention“ und die DGUV Vorschrift 23 „Wach- und Sicherungsdienste“.',
    main: {
      distractors: [
        'Die DGUV Vorschrift 2 über Betriebsärzte und die DGUV Vorschrift 25 über die Sicherheits- und Gesundheitsschutzkennzeichnung.',
        'Die Straßenverkehrs-Ordnung und die Gewerbeordnung mit ihren Vorschriften zum Bewachungsgewerbe.',
        'Die DGUV Vorschrift 3 über Arbeitsstätten und die Unfallverhütungsvorschrift für Bauarbeiten.',
        'Allein die DGUV Vorschrift 1, weil für Wachdienste keine besondere Vorschrift besteht.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      question: 'Was regelt die DGUV Vorschrift 1 „Grundsätze der Prävention“?',
      answer:
        'Die allgemeinen Pflichten von Unternehmern und Versicherten zu Arbeitsschutz, Unterweisung und Erster Hilfe.',
      distractors: [
        'Die Zulassung von Sicherheitsunternehmen und die Eintragung der einzelnen Wachpersonen in das Bewacherregister.',
        'Den Brandschutz in Industriebetrieben und die Aufstellung und Kennzeichnung von Feuerlöschern.',
        'Die Bewaffnung von Wachpersonen und die Aufbewahrung der Dienstwaffen im bewachten Objekt.',
        'Die Dienstkleidung von Wachdiensten und die Kennzeichnung der Mitarbeiter nach außen.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      question: 'Was regelt die DGUV Vorschrift 23 „Wach- und Sicherungsdienste“?',
      answer:
        'Besondere Sicherheitsanforderungen für Wachdienste, etwa zu Ausrüstung, Verhalten, Waffen und Eigensicherung.',
      distractors: [
        'Die Sachkundeprüfung für das Bewachungsgewerbe und die vorgeschriebene Unterrichtung der Wachpersonen durch die Kammer.',
        'Den Datenschutz bei der Videoüberwachung und die zulässige Speicherdauer von Bildaufnahmen.',
        'Die Erste-Hilfe-Ausbildung in allen Betrieben und die Anzahl der betrieblichen Ersthelfer.',
        'Die Aufbewahrung von Schusswaffen in Privathaushalten und die Anforderungen an Waffenschränke.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-169',
    questionOverride: 'Was ist unter Eigensicherung zu verstehen?',
    answerOverride:
      'Der Sicherheitsmitarbeiter beachtet seine eigene Sicherheit und setzt sich keinen unnötigen Gefahren aus.',
    main: {
      distractors: [
        'Der Sicherheitsmitarbeiter bewahrt vorrangig den Auftraggeber und dessen Eigentum vor Schäden.',
        'Der Sicherheitsmitarbeiter macht sich durch eine besonders auffällige Dienstkleidung erkennbar.',
        'Der Sicherheitsmitarbeiter schreitet möglichst schnell und energisch ein, um die Situation sofort zu beenden.',
        'Der Sicherheitsmitarbeiter lässt den Einsatzort durch Kameras lückenlos und dauerhaft überwachen.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      question:
        'Wie kann ein Sicherheitsmitarbeiter Eigensicherung im Einsatz praktisch umsetzen?',
      answer:
        'Er hält Abstand, beobachtet den Rückzugsweg, sichert seine Position und zieht bei Gefahr Verstärkung hinzu.',
      distractors: [
        'Er schreitet sofort in eine Personengruppe ein und beendet die Störung durch energisches Auftreten.',
        'Er stellt sich frontal und in unmittelbarer Nähe vor den Störer, um Entschlossenheit zu zeigen.',
        'Er verzichtet auf Warnsignale und Beobachtung, um den Störer nicht zusätzlich zu reizen.',
        'Er entfernt sich ohne Meldung an den Vorgesetzten vom Einsatzort, sobald eine Auseinandersetzung wahrscheinlich erscheint.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      question: 'Warum kommt der Eigensicherung im Sicherheitsdienst besondere Bedeutung zu?',
      answer:
        'Weil die eigene Gesundheit Vorrang hat und ein verletzter Mitarbeiter weder sich noch andere wirksam schützen kann.',
      distractors: [
        'Weil die Eigensicherung in erster Linie dazu dient, mögliche Haftungsansprüche des Auftraggebers sicher abzuwenden.',
        'Weil der Arbeitgeber eine Verletzung im Dienst nur bei nachgewiesener Eigensicherung versichert.',
        'Weil die Eigensicherung die Dokumentationspflichten des Mitarbeiters bei Vorfällen ersetzt.',
        'Weil im Tagesdienst keine vergleichbaren Gefahren bestehen und Eigensicherung dort entbehrlich ist.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
      explanation:
        'DGUV Vorschrift 23 stellt die Eigensicherung des Wachpersonals in den Vordergrund.',
    },
  },
  {
    blockId: 'fragen-186',
    mainDifficulty: 2,
    questionOverride:
      'Welche zwei Verbote aus dem Regelwerk für Wach- und Sicherungsdienste sind im Dienst besonders bedeutsam?',
    answerOverride:
      'Das Verbot berauschender Mittel und das Verbot, nicht zugelassene Waffen im Dienst mitzuführen.',
    main: {
      distractors: [
        'Das Verbot, die Dienstkleidung eigenmächtig abzulegen, und das Verbot, ohne Begleitung Kontrollgänge zu machen.',
        'Das Verbot, Überstunden zu leisten, und das Verbot, ohne Pause durchgehend im Dienst zu sein.',
        'Das Verbot, Mobiltelefone im Dienst zu benutzen, und das Verbot, Erste Hilfe zu leisten.',
        'Das Verbot, allein Dienst zu versehen, und das Verbot, Vorfälle schriftlich zu dokumentieren.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      question:
        'Warum sind das Verbot berauschender Mittel und das Waffenverbot im Dienst so wichtig?',
      answer:
        'Weil berauschende Mittel und nicht zugelassene Waffen die Reaktions- und Urteilsfähigkeit beeinträchtigen und Dritte gefährden.',
      distractors: [
        'Weil Verstöße gegen diese Verbote nur das Ansehen des Auftraggebers in der Öffentlichkeit beeinträchtigen.',
        'Weil der Auftraggeber bei einem festgestellten Verstoß die vertraglich geschuldete Bewachungsleistung insgesamt nicht bezahlen muss.',
        'Weil diese Verbote nur bei Großveranstaltungen und in der Nachtzeit praktisch bedeutsam werden.',
        'Weil die Beachtung dieser Verbote die Voraussetzung für die Erteilung des Dienstausweises ist.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      question: 'Welche Folgen können Verstöße gegen diese Verbote haben?',
      answer:
        'Sie können arbeitsrechtliche, versicherungsrechtliche und strafrechtliche Folgen für den Mitarbeiter haben.',
      distractors: [
        'Sie haben regelmäßig keine weiteren Folgen, solange im Dienst kein konkreter Schaden entsteht.',
        'Sie führen in der Regel lediglich zu einer mündlichen Ermahnung durch den zuständigen Vorgesetzten im Betrieb.',
        'Sie führen zu einer Vertragsstrafe, welche der Auftraggeber an seinen Kunden zu zahlen hat.',
        'Sie sind nur dann von Bedeutung, wenn sie sich innerhalb eines Jahres wiederholen.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },

  // ===========================================================================
  // 8. Umgang mit Menschen
  // ===========================================================================
  {
    blockId: 'fragen-195',
    questionOverride: 'Welche Verhaltensweisen tragen in angespannten Situationen zur Deeskalation bei?',
    answerOverride:
      'Eine ruhige Ansprache, das Wahren von Distanz, Ich-Botschaften, aktives Zuhören und das Setzen klarer Grenzen.',
    main: {
      distractors: [
        'Eine laute und sehr bestimmte Ansprache, körperliche Nähe und deutliche Vorwürfe an die aufgebrachte Person im Objekt.',
        'Das sofortige körperliche Festhalten der aufgebrachten Person, bis diese sich wieder beruhigt hat.',
        'Das konsequente Ignorieren der Person, bis sie sich von selbst beruhigt und das Objekt verlässt.',
        'Die Androhung rechtlicher Konsequenzen und das sofortige Hinzuziehen weiterer Sicherheitskräfte.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      question:
        'Was kennzeichnet eine Ich-Botschaft in der Kommunikation mit einer aufgebrachten Person?',
      answer:
        'Der Sprecher beschreibt seine eigene Wahrnehmung und Wirkung, statt die andere Person anzugreifen.',
      distractors: [
        'Der Sprecher beschreibt das Verhalten der anderen Person und benennt die daraus entstandenen Probleme.',
        'Der Sprecher benennt die Fehler und das Fehlverhalten der anderen Person deutlich.',
        'Der Sprecher droht der anderen Person mit rechtlichen Konsequenzen für ihr bisheriges Verhalten im Objekt.',
        'Der Sprecher äußert eine allgemeine Vermutung über die Absichten der anderen Person.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
      explanation: 'Die Bibel ordnet Ich-Botschaft und aktives Zuhören als Deeskalationsbausteine ein.',
    },
    followUp2: {
      question: 'Was bedeutet aktives Zuhören?',
      answer:
        'Dem Gegenüber Aufmerksamkeit zeigen, nachfragen und das Gesagte mit eigenen Worten zusammenfassen.',
      distractors: [
        'Dem Gegenüber sachlich widersprechen und die eigene Position unmissverständlich klarmachen.',
        'Das Gespräch möglichst zügig zum Abschluss bringen und eine Entscheidung für alle Beteiligten treffen.',
        'Schweigend warten, bis die andere Person von selbst aufhört zu sprechen und sich beruhigt.',
        'Die Aussagen der anderen Person als Beweismittel schriftlich festhalten und dokumentieren.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-194',
    questionOverride: 'Was ist unter Deeskalation zu verstehen?',
    answerOverride:
      'Alle gezielten Maßnahmen, die eine angespannte Situation beruhigen und eine drohende Gewaltanwendung verhindern.',
    main: {
      distractors: [
        'Alle Maßnahmen, die eine angespannte Situation durch klare Machtworte, körperliche Präsenz und Rückendeckung beenden.',
        'Das bewusste Ignorieren eines Konflikts, bis sich die Beteiligten von selbst beruhigt haben.',
        'Die sofortige Anwendung körperlicher Gewalt, um eine Auseinandersetzung frühzeitig zu beenden.',
        'Die Androhung rechtlicher Schritte, um die andere Person unter Druck zu setzen und einzuschüchtern.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      question: 'Welche Techniken werden zur Deeskalation eingesetzt?',
      answer:
        'Ruhige Ansprache, Distanzwahrung, Ich-Botschaften, aktives Zuhören und das Setzen klarer Grenzen.',
      distractors: [
        'Eine sachliche Ansprache, die vor allem die rechtlichen Folgen des Verhaltens in den Mittelpunkt stellt.',
        'Das sofortige Festhalten der Person und das Verbringen in einen abgelegenen und gesicherten Nebenraum.',
        'Das Verlassen des Ortes und der vollständige Verzicht auf jede weitere Kommunikation.',
        'Der Einsatz von Reizstoffen und die Ankündigung weiterer Zwangsmittel.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      question:
        'Wie kann ein Sicherheitsmitarbeiter in einer konkreten angespannten Situation deeskalierend wirken?',
      answer:
        'Er hört ruhig zu, zeigt Verständnis für das Anliegen, bleibt sachlich und bietet eine nachvollziehbare Lösung an.',
      distractors: [
        'Er fordert die Person auf, sich unverzüglich zu entfernen, ohne auf ihr Anliegen einzugehen.',
        'Er hält die Person vorsorglich fest, bis die Polizei eintrifft und die Entscheidung übernimmt.',
        'Er verweist die Person des Objekts, ohne ihr Anliegen zu prüfen oder überhaupt anzuhören.',
        'Er ruft die Polizei, ohne zuvor selbst ein klärendes Gespräch mit der betroffenen Person geführt und eine Lösung angeboten zu haben.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-215',
    mainDifficulty: 3,
    questionOverride: 'Wie sollte man einer erkennbar betrunkenen Person gegenübertreten?',
    answerOverride:
      'Ruhig und respektvoll, mit klaren Anweisungen, ausreichend Abstand und dem Vermeiden jeder Eskalation.',
    main: {
      distractors: [
        'Laut und bestimmt, um sich gegenüber der betrunkenen Person energisch durchzusetzen.',
        'Abwartend und passiv, bis die Person das Objekt aus eigenem Antrieb verlässt.',
        'Freundlich und nachgiebig, indem auf klare Anweisungen verzichtet und die Person gewähren gelassen wird.',
        'Sachlich und distanziert, indem jede Kommunikation vermieden und nur die Polizei verständigt wird.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      question: 'Worauf ist im Umgang mit betrunkenen Personen besonders zu achten?',
      answer:
        'Auf eine ruhige und respektvolle Ansprache, klare Anweisungen, ausreichenden Abstand und das Vermeiden von Provokationen.',
      distractors: [
        'Auf möglichst engen körperlichen Kontakt, um die betrunkene Person dauerhaft unter Kontrolle zu halten.',
        'Auf schnelle, laute und kurze Kommandos, damit die betrunkene Person sofort gehorcht und sich fügt.',
        'Auf eine laute und sehr kurze Ansprache, weil betrunkene Personen nur auf deutliche Autorität und klare Ansagen reagieren.',
        'Auf eine deutliche Provokation, um die betrunkene Person zu einer vorhersehbaren Reaktion zu bewegen.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      question: 'Welche Gefahren gehen vom Umgang mit betrunkenen Personen aus?',
      answer:
        'Eine erhöhte Aggressions- und Gewaltbereitschaft, eine eingeschränkte Urteilsfähigkeit und eine gesteigerte Sturzgefahr.',
      distractors: [
        'Eine besonders ausgeprägte Kooperationsbereitschaft und leichte Führbarkeit der Person.',
        'Eine Gefährdung, die sich auf die betrunkene Person selbst und nicht auf Umstehende beschränkt.',
        'Eine Gefährdung, die erst dann auftritt, wenn die betrunkene Person zusätzlich mit einer gefährlichen Waffe bewaffnet ist.',
        'Ein auffälliges Verhalten, das erst nach dem vollständigen Abbau des Alkohols auftritt.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },

  // ===========================================================================
  // 9. Technik
  // ===========================================================================
  {
    blockId: 'fragen-220',
    questionOverride: 'Was umfasst die elektronische Sicherheit in einem Sicherheitskonzept?',
    answerOverride:
      'Die technische Überwachung des Objekts durch Alarmanlagen, Videoanlagen und elektronische Zutrittskontrollen.',
    main: {
      distractors: [
        'Die bauliche Sicherung des Objekts durch Türen, Schlösser, Zäune und besonders widerstandsfähiges Sicherheitsglas.',
        'Die organisatorischen Maßnahmen wie Dienstanweisungen, Kontrollgänge und das Schlüsselmanagement.',
        'Die Auswahl, Ausbildung und regelmäßige Unterweisung des eingesetzten Sicherheitspersonals.',
        'Die Absicherung von Sach- und Personenschäden durch Versicherungen gegen die Folgen von Einbrüchen.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      question: 'Welche Aufgabe erfüllt eine Einbruchmeldeanlage?',
      answer: 'Sie erkennt unbefugtes Eindringen frühzeitig und meldet dieses als Alarm an die zuständige Stelle.',
      distractors: [
        'Sie erkennt Brände frühzeitig und meldet diese an die zuständige Leitstelle oder die Feuerwehr.',
        'Sie steuert den Zutritt von Mitarbeitern zu bestimmten Bereichen eines Gebäudes.',
        'Sie beobachtet die Räume fortlaufend per Video und zeichnet die Bilder zur späteren Auswertung auf.',
        'Sie ersetzt mechanische Sicherungen wie Schlösser und Zäune durch elektronische Komponenten.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      question: 'Was ist unter einer Gefahrenmeldeanlage zu verstehen?',
      answer:
        'Der Oberbegriff für Anlagen, die Gefahren wie Einbruch, Brand oder Überfall erkennen und melden.',
      distractors: [
        'Eine Anlage, die speziell Brände erkennt, meldet und die zuständige Feuerwehr automatisch alarmiert.',
        'Eine mechanische Sicherung, die einem Angriff möglichst lange widersteht.',
        'Ein System zur Verwaltung und Ausgabe von Schlüsseln und Zutrittsrechten.',
        'Eine Einrichtung zur Kennzeichnung von Flucht- und Rettungswegen im Gebäude.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-218',
    questionOverride: 'Aus welchen drei Säulen setzt sich ein umfassendes Sicherheitskonzept zusammen?',
    answerOverride:
      'Aus der mechanischen Sicherheit, der elektronischen Sicherheit und der organisatorischen Sicherheit.',
    main: {
      distractors: [
        'Aus der baulichen Sicherheit, der personellen Sicherheit und der finanziellen Sicherheit eines Objekts.',
        'Aus der inneren Sicherheit, der äußeren Sicherheit und der rechtlichen Sicherheit eines Objekts.',
        'Aus der manuellen Sicherheit, der automatischen Sicherheit und der digitalen Sicherheit eines Objekts.',
        'Aus der präventiven Sicherheit, der repressiven Sicherheit und der dokumentarischen Sicherheit.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      question: 'Was kennzeichnet die drei Säulen der Sicherheit?',
      answer:
        'Mechanische Sicherheit sichert baulich, elektronische überwacht technisch und organisatorische regelt Abläufe und Verhalten.',
      distractors: [
        'Alle drei Säulen bezeichnen dieselbe Sicherungsart und unterscheiden sich nur in der Bezeichnung.',
        'Die mechanische Sicherheit bezeichnet die Ausbildung, die elektronische den Bau von Zäunen.',
        'Die elektronische Sicherheit bezeichnet die Dienstanweisungen, die organisatorische dagegen den regelmäßigen Einsatz von Kameras.',
        'Die organisatorische Sicherheit bezeichnet die Versicherung, die mechanische die Alarmierung.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      question: 'Wie wirken die drei Säulen der Sicherheit im Sicherheitskonzept zusammen?',
      answer:
        'Mechanik verzögert den Angriff, Elektronik erkennt und meldet ihn, die Organisation steuert die Reaktion darauf.',
      distractors: [
        'Es genügt, eine einzelne Säule konsequent einzusetzen, weil die übrigen keine Wirkung entfalten.',
        'Die drei Säulen schließen einander aus und dürfen deshalb nicht gleichzeitig in ein und demselben Objekt eingesetzt werden.',
        'Die elektronische Sicherheit ersetzt die mechanische und die organisatorische Sicherheit vollständig.',
        'Die organisatorische Sicherheit ist nur bei Großobjekten erforderlich, nicht bei kleinen Objekten.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-224',
    questionOverride: 'Wozu dient eine Brandmeldeanlage?',
    answerOverride:
      'Sie erkennt Brände frühzeitig und löst eine Meldung aus, damit Gegenmaßnahmen rechtzeitig möglich sind.',
    main: {
      distractors: [
        'Sie erkennt unbefugtes Eindringen und meldet dieses als Einbruchalarm an die Leitstelle.',
        'Sie steuert den Zutritt zu bestimmten Bereichen und protokolliert die Bewegungen aller anwesenden Personen.',
        'Sie überwacht die Räume fortlaufend per Video und zeichnet die Bilder zur späteren Auswertung auf.',
        'Sie löst mechanische Sicherungen aus, wenn ein Angriff auf das Objekt unmittelbar bevorsteht.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      question: 'Welche Arten von Brandmeldern werden eingesetzt?',
      answer:
        'Unter anderem Rauchmelder, Wärmemelder, Flammenmelder und Multifunktionsmelder.',
      distractors: [
        'Videokameras, die eine beginnende Rauchentwicklung anhand des Bildes erkennen und melden.',
        'Türen und Schlösser, die sich im Brandfall automatisch verriegeln und die Fluchtwege freigeben.',
        'Zutrittskontrollsysteme, die die Anwesenheit von Personen im Gebäude erfassen.',
        'Sprinkleranlagen, die bei Hitzeeinwirkung automatisch Wasser freigeben und den Brand löschen.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      question: 'Welche Brandklassen werden im Brandschutz unterschieden?',
      answer:
        'A für feste Stoffe, B für flüssige, C für Gase, D für Metalle und F für Fette und Öle.',
      distractors: [
        'Die Brandklassen 1, 2 und 3 für kleine, mittlere und große Brände im Gebäude.',
        'Die Brandklassen Rot, Gelb und Blau, die nach der Temperatur des Feuers unterschieden werden.',
        'Die Brandklassen Innenbrand, Außenbrand und Vollbrand nach dem Ort des Feuers.',
        'Die Brandklassen A, B, C und D für feste, flüssige, gasförmige und metallische Stoffe.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
];
