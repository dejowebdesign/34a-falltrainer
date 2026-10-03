import { OralExamPoolBlock } from '../models';

/**
 * Ergänzte Antworten für die mündliche Prüfungssimulation.
 *
 * Die Fragenbank `Fragen.txt` enthält nur zu den Hauptfragen eine richtige
 * Antwort. Die Folgefragen sind reine Stichworte ohne Antwort. Für jeden
 * Prüfungsblock sind hier daher ergänzt:
 *
 * - vier Distraktoren zur Hauptfrage (der Antwortschlüssel der Hauptfrage
 *   bleibt unverändert aus `Fragen.txt`),
 * - die richtige Antwort und vier Distraktoren zu Folgefrage 1 und 2.
 *
 * Pro Themengebiet sind drei Fragenblöcke enthalten, damit je Durchlauf
 * tatsächlich zufällig ein Block ausgewählt wird.
 *
 * Quellenkennzeichnung:
 * - `AUTHORED_FROM_BIBEL`   – aus der 34a-Bibel (V5.3.1) abgeleitet.
 * - `AUTHORED_FROM_FACHWISSEN` / `UNVERIFIED` – ergänzt, weil die Bibel das
 *   Thema nicht abdeckt (Datenschutz, GewO/BewachV, Waffen, DGUV/UVV,
 *   Umgang mit Menschen, Technik, Rechtsordnung).
 *
 * Es werden keine Fragen oder Antworten aus `Fragen.txt` verändert.
 * Die Kennzeichnungen sind ausschließlich im Datenmodell und in der
 * Audit-Ansicht sichtbar, nicht in der Teilnehmerprüfung.
 */
export const ORAL_EXAM_POOL: OralExamPoolBlock[] = [
  // ===========================================================================
  // 1. Rechtsordnung / Staatskunde
  // ===========================================================================
  {
    blockId: 'fragen-013',
    main: {
      distractors: [
        'Ja, mit behördlicher Genehmigung dürfen Sicherheitsmitarbeiter hoheitliche Befugnisse ausüben.',
        'Ja, wenn der Auftraggeber eine öffentliche Stelle ist, gehen Polizeibefugnisse auf den Sicherheitsdienst über.',
        'Ja, Sicherheitsmitarbeiter sind Hilfspolizisten und dürfen daher hoheitliche Maßnahmen treffen.',
        'Nein, Sicherheitsmitarbeiter haben überhaupt keine Rechte und dürfen nicht tätig werden.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      answer:
        'Sicherheitsmitarbeiter haben keine hoheitlichen Befugnisse; sie handeln ausschließlich auf privatrechtlicher Grundlage, insbesondere aus Hausrecht, Besitzschutz und den Jedermann-Rechten (z. B. Notwehr, vorläufige Festnahme nach § 127 StPO).',
      distractors: [
        'Sicherheitsmitarbeiter haben dieselben Befugnisse wie die Polizei, solange sie im Dienst sind.',
        'Sicherheitsmitarbeiter dürfen Personen durchsuchen, festnehmen und Bußgelder verhängen.',
        'Sicherheitsmitarbeiter haben nur das Recht, Anzeige zu erstatten, sonst keine Befugnisse.',
        'Sicherheitsmitarbeiter dürfen hoheitliche Maßnahmen treffen, wenn der Auftraggeber eine Behörde ist.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation:
        'Die Bibel stellt in Kapitel 43 klar: Sicherheitsdienst ist nicht staatlicher Hoheitsträger.',
    },
    followUp2: {
      answer:
        'Die Polizei handelt hoheitlich auf Grundlage der Polizeigesetze und darf Zwang ausüben. Sicherheitsmitarbeiter handeln privat, ohne hoheitliche Befugnisse, und dürfen nur im Rahmen privatrechtlicher Rechtfertigungsgründe tätig werden.',
      distractors: [
        'Sicherheitsmitarbeiter sind Hilfsbeamte der Staatsanwaltschaft und der Polizei unterstellt.',
        'Die Polizei und Sicherheitsmitarbeiter haben identische Eingriffsbefugnisse, nur der Arbeitgeber unterscheidet sich.',
        'Sicherheitsmitarbeiter dürfen wie die Polizei Platzverweise erteilen und Personen in Gewahrsam nehmen.',
        'Polizei und Sicherheitsdienst unterscheiden sich nur durch die Dienstkleidung.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation:
        'Die Bibel betont die Abgrenzung zwischen hoheitlicher und privatrechtlicher Tätigkeit (Kapitel 43).',
    },
  },
  {
    blockId: 'fragen-012',
    main: {
      distractors: ['Die Polizei.', 'Die Bundeswehr.', 'Jeder einzelne Bürger.', 'Die Sicherheitsunternehmen.'],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      answer:
        'Nur im Rahmen privatrechtlicher Rechtfertigungsgründe, etwa Notwehr und Nothilfe, Besitzwehr und den Jedermann-Rechten; hoheitliche Gewalt dürfen sie nicht ausüben.',
      distractors: [
        'Ja, unbeschränkt wie die Polizei.',
        'Nein, Sicherheitsmitarbeiter dürfen niemals Gewalt anwenden.',
        'Ja, sobald der Auftraggeber es ausdrücklich erlaubt.',
        'Nur mit vorheriger Zustimmung der Polizei.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp2: {
      answer:
        'Weil das Gewaltmonopol beim Staat liegt und Private nur auf privatrechtlicher Grundlage handeln dürfen.',
      distractors: [
        'Weil Sicherheitsmitarbeiter keine Waffen tragen dürfen.',
        'Weil nur Beamte körperlich dazu in der Lage sind.',
        'Weil Gewalt im Sicherheitsdienst generell verboten ist.',
        'Weil der Auftraggeber keine Gewalt wünscht.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
  },
  {
    blockId: 'fragen-015',
    main: {
      distractors: [
        'Das Recht des Mieters, die Miete zu mindern.',
        'Das Recht der Polizei, Wohnungen zu durchsuchen.',
        'Das Recht des Besitzers, jede angetroffene Person festzunehmen.',
        'Das Recht des Staates, private Grundstücke zu enteignen.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      answer:
        'Durch vertragliche Beauftragung oder Weisung des Berechtigten; der Sicherheitsmitarbeiter handelt dann als Besitzdiener.',
      distractors: [
        'Nur durch notariell beurkundeten Vertrag.',
        'Durch eine mündliche Erlaubnis der Polizei.',
        'Allein durch das Tragen der Dienstkleidung.',
        'Nur durch Eintragung des Sicherheitsunternehmens ins Grundbuch.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation: '§ 855 BGB: Der Besitzdiener handelt weisungsgebunden für den Besitzer.',
    },
    followUp2: {
      answer:
        'Hausfriedensbruch ist das widerrechtliche Eindringen in Wohnung, Geschäftsräume oder befriedetes Besitztum oder das Verweilen trotz Aufforderung des Berechtigten.',
      distractors: [
        'Hausfriedensbruch ist die Beschädigung einer fremden Sache.',
        'Hausfriedensbruch ist die Wegnahme einer fremden beweglichen Sache.',
        'Hausfriedensbruch ist die bloße Störung des Besitzes ohne Entziehung.',
        'Hausfriedensbruch ist das Betreten mit Erlaubnis des Berechtigten.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation: '§ 123 StGB: Eindringen oder Verweilen gegen den Willen des Berechtigten.',
    },
  },

  // ===========================================================================
  // 2. GewO / BewachV
  // ===========================================================================
  {
    blockId: 'fragen-029',
    main: {
      distractors: [
        'Durch eine behördliche Erlaubnis der Gewerbebehörde.',
        'Allein durch das Tragen der Dienstkleidung des Sicherheitsunternehmens.',
        'Nur durch einen schriftlichen Vertrag mit der Polizei.',
        'Durch die Eintragung des Mitarbeiters ins Bewacherregister.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      answer:
        'Besitzdiener ist, wer die tatsächliche Gewalt über eine Sache für einen anderen ausübt und dessen Weisungen unterliegt; Besitzer ist dann nur der andere (§ 855 BGB).',
      distractors: [
        'Besitzdiener ist, wer eine Sache als Eigentümer besitzt und selbst darüber verfügen darf.',
        'Besitzdiener ist, wer eine Sache vorübergehend geliehen bekommt und sie selbst nutzen darf.',
        'Besitzdiener ist, wer eine Sache im Auftrag der Polizei sichert und dabei hoheitlich handelt.',
        'Besitzdiener ist, wer die Sache in eigenem Namen und für sich besitzt.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation: '§ 855 BGB: tatsächliche Gewalt für einen anderen.',
    },
    followUp2: {
      answer:
        'Der Besitzdiener handelt weisungsgebunden und nur für den Besitzer; seine Befugnisse enden an den Grenzen des Hausrechts, der Verhältnismäßigkeit und der privatrechtlichen Rechtfertigungsgründe. § 859 BGB ist kein Freibrief für Gewalt.',
      distractors: [
        'Der Besitzdiener darf unbegrenzt Gewalt einsetzen, weil er die tatsächliche Gewalt innehat.',
        'Der Besitzdiener darf die Sache wie ein Eigentümer veräußern.',
        'Der Besitzdiener hat dieselben Zwangsbefugnisse wie die Polizei.',
        'Für den Besitzdiener gelten keine Grenzen, solange der Besitzer es wünscht.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation:
        'Die Bibel ordnet § 859 BGB als unmittelbare Besitzerselbsthilfe ein und betont: kein allgemeiner Freibrief zur Gewaltanwendung.',
    },
  },
  {
    blockId: 'fragen-021',
    main: {
      distractors: [
        '§ 34a GewO regelt ausschließlich den Datenschutz im Sicherheitsgewerbe.',
        '§ 34a GewO regelt die Ausbildung und Ausrüstung der Polizei.',
        '§ 34a GewO regelt den privaten Waffenerwerb von Bürgern.',
        '§ 34a GewO regelt die Arbeitszeiten im Sicherheitsgewerbe.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      answer:
        'Für bestimmte Tätigkeiten mit erhöhtem Gefahrenpotenzial, z. B. Kontrollgänge im öffentlichen Verkehrsraum, Ladendetektiv, Einlassbereich von Diskotheken sowie leitende Funktion in Asylunterkünften und bei zugangsgeschützten Großveranstaltungen.',
      distractors: [
        'Nur wer ein eigenes Sicherheitsunternehmen gründet.',
        'Nur für die Bewachung privater Wohnungen.',
        'Für jede Tätigkeit im Sicherheitsgewerbe, auch reine Büroarbeit.',
        'Nur für den Einsatz mit Schusswaffen.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      answer:
        'Zuverlässig ist, wer die Gewähr dafür bietet, das Gewerbe ordnungsgemäß auszuüben; dies wird durch die Behörden geprüft, z. B. über Führungszeugnis und Auskünfte.',
      distractors: [
        'Zuverlässigkeit bedeutet, immer pünktlich zum Dienst zu erscheinen.',
        'Zuverlässigkeit ist die Fähigkeit, eine Waffe sicher zu bedienen.',
        'Zuverlässigkeit ist die Mitgliedschaft in einem Berufsverband.',
        'Zuverlässigkeit ist eine einmalige Schulung ohne Prüfung.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-028',
    main: {
      distractors: [
        'Das Recht des Besitzers, jede Person ohne Grund festzunehmen.',
        'Das Recht der Polizei, private Räume jederzeit zu betreten.',
        'Das Recht des Sicherheitsmitarbeiters, hoheitliche Anordnungen zu treffen.',
        'Das Recht des Staates, über private Räume zu verfügen.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      answer:
        'Durch vertragliche Beauftragung oder Weisung des Berechtigten; der Sicherheitsmitarbeiter wird dadurch zum Besitzdiener und handelt weisungsgebunden.',
      distractors: [
        'Nur durch eine behördliche Genehmigung.',
        'Allein durch das Tragen der Dienstkleidung.',
        'Nur durch einen Gerichtsbeschluss.',
        'Durch die Eintragung ins Handelsregister.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      answer:
        'Hausfriedensbruch ist das widerrechtliche Eindringen in Wohnung, Geschäftsräume oder befriedetes Besitztum oder das Verweilen trotz Aufforderung des Berechtigten.',
      distractors: [
        'Hausfriedensbruch ist die Beschädigung einer fremden Sache.',
        'Hausfriedensbruch ist die Wegnahme einer fremden beweglichen Sache.',
        'Hausfriedensbruch ist die Störung des Besitzes ohne Entziehung.',
        'Hausfriedensbruch ist das Betreten mit Erlaubnis des Berechtigten.',
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
    main: {
      distractors: [
        'Das Recht, die Herausgabe aller über einen gespeicherten Daten ohne Angabe von Gründen zu verlangen.',
        'Das Verbot, personenbezogene Daten überhaupt zu speichern.',
        'Das Recht des Unternehmens, Daten für jeden beliebigen Zweck zu nutzen.',
        'Die Pflicht, alle Daten dauerhaft und unbegrenzt aufzubewahren.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      answer:
        'Alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen, z. B. Name, Adresse, Kennzeichen oder Bild- und Videodaten.',
      distractors: [
        'Nur Daten, die unmittelbar den Namen einer Person enthalten.',
        'Alle Daten, die in einem Unternehmen gespeichert sind, auch reine Sachdaten.',
        'Nur besonders sensible Daten wie Gesundheitsdaten.',
        'Daten, die sich auf juristische Personen beziehen, z. B. Firmendaten.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      answer:
        'Personenbezogene Daten dürfen nur für den festgelegten, eindeutigen und legitimen Zweck verarbeitet und nicht zweckfremd weiterverwendet werden.',
      distractors: [
        'Daten dürfen beliebig oft für neue Zwecke weiterverwendet werden, solange sie gespeichert sind.',
        'Die Zweckbindung betrifft nur Videoaufnahmen.',
        'Daten dürfen ohne Einschränkung an Dritte weitergegeben werden.',
        'Die Zweckbindung endet, sobald der Betroffene die Räume verlassen hat.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-048',
    main: {
      distractors: [
        'Datenschutz schützt Unternehmen vor unerlaubtem Wettbewerb.',
        'Datenschutz verbietet grundsätzlich jede Datenverarbeitung.',
        'Datenschutz regelt ausschließlich den Schutz von Sachen und Eigentum.',
        'Datenschutz betrifft nur staatliche Stellen, nicht private Unternehmen.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      answer:
        'Für die Verarbeitung personenbezogener Daten natürlicher Personen; auch private Unternehmen wie Sicherheitsdienste sind betroffen, sofern sie nicht rein privat handeln.',
      distractors: [
        'Nur für staatliche Behörden und Gerichte.',
        'Nur für Unternehmen mit mehr als 250 Mitarbeitern.',
        'Nur für Online-Shops und soziale Netzwerke.',
        'Für Sicherheitsdienste gilt der Datenschutz nicht.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      answer:
        'Es gelten u. a. Rechtmäßigkeit, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung, Integrität und Vertraulichkeit sowie Rechenschaftspflicht.',
      distractors: [
        'Es gilt nur der Grundsatz, möglichst viele Daten zu sammeln.',
        'Es gilt nur die Pflicht, Daten dauerhaft zu speichern.',
        'Es gibt keine allgemeinen Grundsätze; alles ist freiwillig.',
        'Es gilt nur der Grundsatz der Geheimhaltung gegenüber der Aufsichtsbehörde.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-052',
    main: {
      distractors: [
        'Nur der vollständige Name einer Person.',
        'Angaben über Gegenstände und Sachen.',
        'Nur Daten, die verschlüsselt gespeichert sind.',
        'Nur Daten von Mitarbeitern eines Unternehmens.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      answer:
        'Besondere Kategorien sind z. B. Gesundheitsdaten, biometrische und genetische Daten, politische Meinungen, Religion, Gewerkschaftszugehörigkeit sowie Daten zum Sexualleben; sie sind besonders geschützt.',
      distractors: [
        'Besondere Kategorien sind Name und Adresse.',
        'Besondere Kategorien sind alle Daten, die auf Papier vorliegen.',
        'Besondere Kategorien sind Kennzeichen und Kontonummern.',
        'Besondere Kategorien sind nur Daten von Kindern.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      answer:
        'Beispiele sind Name, Geburtsdatum, Anschrift, Kfz-Kennzeichen, Personalausweisnummer, Foto- und Videoaufnahmen einer erkennbaren Person.',
      distractors: [
        'Beispiele sind die Anzahl der Parkplätze und die Öffnungszeiten.',
        'Beispiele sind Wetterdaten und Uhrzeiten.',
        'Beispiele sind ausschließlich Gesundheitsdaten.',
        'Beispiele sind nur Daten, die im Internet veröffentlicht sind.',
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
    main: {
      distractors: [
        'Besitz und Eigentum sind dasselbe; wer besitzt, ist auch Eigentümer.',
        'Eigentum ist die tatsächliche Herrschaft, Besitz die rechtliche Herrschaft.',
        'Besitz ist ein dingliches Recht, Eigentum nur eine tatsächliche Position.',
        'Besitz kann nur der Eigentümer haben.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      answer:
        'Der Mieter ist Besitzer der Wohnung, aber nicht Eigentümer; der Vermieter ist Eigentümer, ohne unmittelbarer Besitzer zu sein.',
      distractors: [
        'Der Dieb wird durch die Wegnahme Eigentümer der Sache.',
        'Der Käufer ist nach Abschluss des Kaufvertrags sofort Eigentümer der Sache.',
        'Der Besitzdiener ist immer auch Eigentümer der Sache.',
        'Wer eine Sache findet, wird automatisch Eigentümer.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp2: {
      answer:
        'Wer die tatsächliche Gewalt über eine Sache für einen anderen ausübt und dessen Weisungen unterliegt; Besitzer ist nur der andere (§ 855 BGB).',
      distractors: [
        'Wer die Sache im eigenen Namen für sich besitzt.',
        'Wer eine Sache vom Eigentümer geliehen hat und sie selbst nutzen darf.',
        'Wer eine Sache als Pfand verwahrt und darüber verfügen darf.',
        'Wer eine Sache vorübergehend findet und behalten will.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation: '§ 855 BGB: Besitzdiener übt die tatsächliche Gewalt für einen anderen aus.',
    },
  },
  {
    blockId: 'fragen-081',
    main: {
      distractors: [
        'Öffentliches Recht regelt Bürger–Bürger-Verhältnisse, privates Recht Staat–Bürger-Verhältnisse.',
        'Öffentliches Recht und privates Recht sind identisch.',
        'Öffentliches Recht gilt nur für Strafverfahren.',
        'Privates Recht gilt nur für Verträge zwischen Behörden.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      answer:
        'Ein Beispiel ist das Polizei- und Ordnungsrecht: Der Staat tritt dem Bürger hoheitlich im Über-/Unterordnungsverhältnis gegenüber.',
      distractors: [
        'Ein Beispiel ist der Kaufvertrag zwischen zwei Privatpersonen.',
        'Ein Beispiel ist die Miete zwischen Mieter und Vermieter.',
        'Ein Beispiel ist der Arbeitsvertrag zwischen zwei Privaten.',
        'Ein Beispiel ist der Tausch zwischen zwei Nachbarn.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp2: {
      answer:
        'Sicherheitsmitarbeiter sind dem privaten Recht zuzuordnen: Sie handeln auf privatrechtlicher Grundlage, insbesondere aus Hausrecht und Besitzschutz.',
      distractors: [
        'Sicherheitsmitarbeiter sind dem öffentlichen Recht zuzuordnen, weil sie hoheitlich handeln.',
        'Sicherheitsmitarbeiter sind dem Strafrecht zuzuordnen, weil sie Straftaten verfolgen.',
        'Sicherheitsmitarbeiter sind weder dem öffentlichen noch dem privaten Recht zuzuordnen.',
        'Sicherheitsmitarbeiter sind dem Völkerrecht zuzuordnen.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
  },
  {
    blockId: 'fragen-092',
    main: {
      distractors: [
        'Der Besitzer darf die Sache nur nach vorheriger polizeilicher Genehmigung verteidigen.',
        'Der Besitzer darf verbotene Eigenmacht nur mit einem Gerichtsbeschluss abwehren.',
        'Der Besitzer darf sich gegen verbotene Eigenmacht nur durch eine Anzeige wehren.',
        'Der Besitzer darf sich nur mit Zustimmung des Störers wehren.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      answer:
        '„Sofort“ bedeutet unmittelbar im Anschluss an die Besitzstörung, ohne schuldhaftes Zögern.',
      distractors: [
        '„Sofort“ bedeutet innerhalb einer Woche nach der Störung.',
        '„Sofort“ bedeutet jederzeit, auch Monate später.',
        '„Sofort“ bedeutet erst nach Einschaltung der Polizei.',
        '„Sofort“ bedeutet nach Ablauf einer Bedenkzeit.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation: '§ 859 BGB: unmittelbare Besitzerselbsthilfe ohne schuldhaftes Zögern.',
    },
    followUp2: {
      answer:
        'Angemessen ist ein Mittel, das zur Abwehr erforderlich ist und nicht außer Verhältnis zur Störung steht; es darf nicht mehr Gewalt als nötig eingesetzt werden.',
      distractors: [
        'Angemessen ist jedes Mittel, das den Störer möglichst stark trifft.',
        'Angemessen ist immer der Einsatz körperlicher Gewalt.',
        'Angemessen ist nur der Einsatz von Waffen.',
        'Angemessen ist jedes Mittel, solange der Besitzer es wünscht.',
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
    main: {
      distractors: [
        '1) Dringender Tatverdacht. 2) Ein Haftbefehl liegt vor.',
        '1) Auf frischer Tat betroffen. 2) Der Beschuldigte ist geständig.',
        '1) Anzeige erstattet. 2) Der Täter ist namentlich bekannt.',
        '1) Verdacht einer Straftat. 2) Der Auftraggeber stimmt der Festnahme zu.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      answer:
        'Auf frischer Tat betroffen ist, wer bei oder unmittelbar nach der Tat oder bei der Verfolgung durch Tatopfer oder Zeugen angetroffen wird.',
      distractors: [
        'Die Tat darf höchstens eine Woche zurückliegen.',
        'Es genügt der Verdacht, dass die Person irgendwann eine Straftat begangen hat.',
        'Frische Tat bedeutet, dass die Tat bereits rechtskräftig festgestellt ist.',
        'Frische Tat liegt nur vor, wenn die Person die Tat gesteht.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation: '§ 127 StPO verlangt das Betreffen oder Verfolgen auf frischer Tat.',
    },
    followUp2: {
      answer:
        'Fluchtgefahr besteht, wenn aufgrund konkreter Umstände zu befürchten ist, dass sich die Person der Strafverfolgung entziehen wird, z. B. Fluchtversuch oder fehlende Bindung zum Ort.',
      distractors: [
        'Fluchtgefahr besteht immer bei jedem Tatverdacht.',
        'Fluchtgefahr liegt vor, wenn die Person eine Auslandsreise plant.',
        'Fluchtgefahr besteht, wenn die Person die Aussage verweigert.',
        'Fluchtgefahr liegt vor, wenn die Person keinen festen Arbeitsplatz hat.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation: '§ 127 StPO: Fluchtverdacht ist eng am konkreten Sachverhalt zu prüfen.',
    },
  },
  {
    blockId: 'fragen-127',
    main: {
      distractors: [
        'Hausfriedensbruch ist die Beschädigung einer fremden beweglichen Sache.',
        'Hausfriedensbruch ist die Wegnahme einer fremden beweglichen Sache in Zueignungsabsicht.',
        'Hausfriedensbruch ist die Körperverletzung einer anderen Person.',
        'Hausfriedensbruch ist die Nötigung einer Person zu einer Handlung.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      answer:
        'Es gibt zwei Varianten: das Eindringen in geschützte Räume und das Verweilen trotz Aufforderung des Berechtigten, sich zu entfernen.',
      distractors: [
        'Es gibt nur die Variante des Eindringens.',
        'Es gibt nur die Variante der Beschädigung.',
        'Es gibt die Varianten Diebstahl und Raub.',
        'Es gibt die Varianten Bedrohung und Beleidigung.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp2: {
      answer:
        'Ja, Hausfriedensbruch ist regelmäßig ein Antragsdelikt; die Strafverfolgung setzt grundsätzlich einen Strafantrag des Berechtigten voraus.',
      distractors: [
        'Nein, Hausfriedensbruch ist immer ein Offizialdelikt.',
        'Nein, Hausfriedensbruch wird nur zivilrechtlich verfolgt.',
        'Ja, aber der Strafantrag kann nur von der Polizei gestellt werden.',
        'Nein, Hausfriedensbruch ist kein Straftatbestand.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
      explanation: '§ 123 StGB ist Antragsdelikt.',
    },
  },
  {
    blockId: 'fragen-114',
    main: {
      distractors: [
        'Erforderlich ist jedes Mittel, das dem Angreifer den größtmöglichen Schaden zufügt.',
        'Erforderlich ist immer der Einsatz einer Waffe.',
        'Erforderlich ist die Verteidigung, die dem Angegriffenen am einfachsten erscheint.',
        'Erforderlich ist jede Handlung, die der Angegriffene für richtig hält.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp1: {
      answer:
        'Mildestes Mittel ist dasjenige Verteidigungsmittel, das den Angriff sicher und sofort beendet und dabei die geringste Beeinträchtigung für den Angreifer verursacht.',
      distractors: [
        'Mildestes Mittel ist das schwächste Mittel, auch wenn es den Angriff nicht beendet.',
        'Mildestes Mittel ist immer der Rückzug.',
        'Mildestes Mittel ist immer das Gespräch.',
        'Mildestes Mittel ist das Mittel, das der Angreifer am wenigsten bemerkt.',
      ],
      source: 'AUTHORED_FROM_BIBEL',
      verificationStatus: 'VERIFIED_BIBEL',
    },
    followUp2: {
      answer:
        'Geeignet ist ein Mittel, das den gegenwärtigen rechtswidrigen Angriff tatsächlich und sofort beenden kann.',
      distractors: [
        'Geeignet ist jedes Mittel, das dem Angegriffenen gefällt.',
        'Geeignet ist jedes Mittel, das keine Verletzung verursacht.',
        'Geeignet ist nur ein Mittel, das die Polizei genehmigt hat.',
        'Geeignet ist jedes Mittel, das der Angreifer zuerst eingesetzt hat.',
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
    main: {
      distractors: [
        'Jeder Gegenstand, der geeignet ist, Verletzungen zuzufügen.',
        'Nur Schusswaffen und Munition.',
        'Nur verbotene Gegenstände wie Schlagring oder Butterflymesser.',
        'Jeder Gegenstand, den ein Sicherheitsmitarbeiter im Dienst führt.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      answer:
        'Verbotene Waffen sind Gegenstände, deren Besitz, Führen und Erwerb nach dem WaffG generell verboten sind, z. B. Schlagringe, Butterflymesser, Wurfsterne und Totschläger.',
      distractors: [
        'Verbotene Waffen sind alle Schusswaffen ohne Waffenbesitzkarte.',
        'Verbotene Waffen sind nur Gegenstände, die unter das Kriegswaffenkontrollgesetz fallen.',
        'Verbotene Waffen sind alle Gegenstände, die im Sicherheitsdienst verwendet werden.',
        'Verbotene Waffen sind ausschließlich Feuerwaffen.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      answer:
        'Führen ist die Ausübung der tatsächlichen Gewalt über eine Waffe außerhalb der eigenen Wohnung, Geschäftsräume oder des befriedeten Besitztums.',
      distractors: [
        'Führen ist der Erwerb und Besitz einer Waffe.',
        'Führen ist jede Aufbewahrung einer Waffe zu Hause.',
        'Führen ist das Transportieren einer Waffe in einem verschlossenen Behältnis.',
        'Führen ist nur das Schießen mit einer Waffe.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-164',
    main: {
      distractors: [
        'Ja, jeder Sicherheitsmitarbeiter darf im Dienst eine Schusswaffe tragen.',
        'Ja, wenn der Auftraggeber die Waffe bezahlt.',
        'Nein, Sicherheitsmitarbeiter dürfen niemals eine Waffe tragen.',
        'Ja, nach einer einmaligen Sicherheitsschulung.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      answer:
        'Die zuständige Waffenbehörde erteilt die waffenrechtliche Erlaubnis; zusätzlich muss der Arbeitgeber die Bewaffnung ausdrücklich zulassen.',
      distractors: [
        'Die Polizei genehmigt die Bewaffnung von Sicherheitsmitarbeitern.',
        'Der Auftraggeber genehmigt die Bewaffnung allein.',
        'Die Industrie- und Handelskammer genehmigt die Bewaffnung.',
        'Die Berufsgenossenschaft genehmigt die Bewaffnung.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      answer:
        'Nur bei Tätigkeiten mit besonders hohem Gefährdungspotenzial, etwa Geld- und Werttransporte, und nur mit besonderer waffenrechtlicher Genehmigung.',
      distractors: [
        'Bei jeder Tätigkeit im Einlassbereich einer Diskothek.',
        'Bei jedem Kontrollgang im öffentlichen Verkehrsraum.',
        'Bei jeder Bewachung eines Bürogebäudes.',
        'Bei jeder Veranstaltung mit mehr als 100 Besuchern.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-156',
    main: {
      distractors: [
        'Eine Waffenbesitzkarte.',
        'Einen Jagdschein.',
        'Eine Gewerbeerlaubnis nach § 34a GewO.',
        'Ein Führungszeugnis ohne Eintrag.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      answer:
        'Den Waffenschein erhält, wer zuverlässig und persönlich geeignet ist, ein anerkanntes Bedürfnis nachweist und die erforderliche Sachkunde besitzt.',
      distractors: [
        'Jeder volljährige Bürger ohne weitere Voraussetzungen.',
        'Nur Polizeibeamte und Soldaten.',
        'Jeder, der Mitglied in einem Schützenverein ist.',
        'Jeder, der eine Waffe geerbt hat.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      answer:
        'Voraussetzungen sind Zuverlässigkeit, persönliche Eignung, ein anerkanntes Bedürfnis, Sachkunde und das erforderliche Mindestalter.',
      distractors: [
        'Voraussetzungen sind nur das Mindestalter und ein Führungszeugnis.',
        'Voraussetzungen sind nur die Zahlung der Gebühr.',
        'Voraussetzungen sind nur ein ärztliches Attest.',
        'Voraussetzungen sind nur die Mitgliedschaft in einem Verein.',
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
    main: {
      distractors: [
        'DGUV Vorschrift 2 und DGUV Vorschrift 25.',
        'Die Straßenverkehrsordnung und die GewO.',
        'Die DGUV Vorschrift 3 und die Unfallverhütungsvorschrift Bau.',
        'Nur die DGUV Vorschrift 1; eine spezielle Vorschrift für Wachdienste gibt es nicht.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      answer:
        'DGUV Vorschrift 1 „Grundsätze der Prävention“ regelt die allgemeinen Pflichten von Unternehmern und Versicherten zu Arbeitsschutz, Unterweisung, Erster Hilfe und Prävention.',
      distractors: [
        'Sie regelt speziell die Bewaffnung von Sicherheitsmitarbeitern.',
        'Sie regelt ausschließlich den Brandschutz in Industriebetrieben.',
        'Sie regelt die Zulassung von Sicherheitsunternehmen.',
        'Sie regelt nur die Dienstkleidung von Wachdiensten.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      answer:
        'DGUV Vorschrift 23 „Wach- und Sicherungsdienste“ regelt spezielle Sicherheitsanforderungen für Wach- und Sicherungsdienste, z. B. Ausrüstung, Verhalten, Waffen, Alkoholverbot und Eigensicherung.',
      distractors: [
        'Sie regelt die Sachkundeprüfung nach § 34a GewO.',
        'Sie regelt den Datenschutz bei Videoüberwachung.',
        'Sie regelt die Erste-Hilfe-Ausbildung in allen Betrieben.',
        'Sie regelt die Aufbewahrung von Schusswaffen.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-169',
    main: {
      distractors: [
        'Eigensicherung bedeutet, den Auftraggeber vor Schäden zu bewahren.',
        'Eigensicherung bedeutet, die Dienstkleidung sauber zu halten.',
        'Eigensicherung bedeutet, möglichst schnell einzugreifen.',
        'Eigensicherung bedeutet, den Einsatzort videozuüberwachen.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      answer:
        'Ein Beispiel ist, vor dem Eingreifen Abstand zu halten, Verstärkung zu rufen und Fluchtwege sowie den Rücken zu sichern.',
      distractors: [
        'Ein Beispiel ist, sofort und allein in eine Gruppe einzuschreiten.',
        'Ein Beispiel ist, auf die Warnweste zu verzichten.',
        'Ein Beispiel ist, die Dienstwaffe offen zu tragen.',
        'Ein Beispiel ist, den Einsatzort ohne Meldung zu verlassen.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      answer:
        'Eigensicherung ist wichtig, weil die eigene Gesundheit Vorrang hat und ein handlungsunfähiger Mitarbeiter weder sich noch andere schützen kann.',
      distractors: [
        'Eigensicherung ist nur wichtig, wenn der Auftraggeber es verlangt.',
        'Eigensicherung dient nur dem Schutz des Eigentums.',
        'Eigensicherung ist nur bei Nachtdiensten wichtig.',
        'Eigensicherung ist rechtlich nicht vorgesehen.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-186',
    main: {
      distractors: [
        'Verbot von Dienstkleidung und Verbot von Kontrollgängen.',
        'Verbot von Pausen und Verbot von Schichtarbeit.',
        'Verbot von Mobiltelefonen und Verbot von Erste Hilfe.',
        'Verbot von Alleineinsatz und Verbot von Dokumentation.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      answer:
        'Beide Verbote sind wichtig, weil berauschende Mittel und nicht zugelassene Waffen die Einsatzfähigkeit und die Sicherheit gefährden.',
      distractors: [
        'Sie sind nur wichtig, damit der Auftraggeber zufrieden ist.',
        'Sie sind nur wichtig für die Dokumentation.',
        'Sie sind nur wichtig bei Großveranstaltungen.',
        'Sie sind rechtlich ohne Bedeutung.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      answer:
        'Verstöße können arbeitsrechtliche Konsequenzen bis zur Kündigung, versicherungsrechtliche Folgen und bei Straftaten auch strafrechtliche Konsequenzen haben.',
      distractors: [
        'Verstöße haben keine Konsequenzen.',
        'Verstöße führen nur zu einer mündlichen Ermahnung.',
        'Verstöße führen nur zu einer Geldstrafe für den Auftraggeber.',
        'Verstöße sind nur bei Wiederholung relevant.',
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
    main: {
      distractors: [
        'Laute Ansprache, körperliche Nähe, Du-Botschaften, Vorwürfe und unklare Grenzen.',
        'Sofortige körperliche Gewalt, um die Situation zu beenden.',
        'Ignorieren der Person, bis sie sich beruhigt.',
        'Mit Verstärkung drohen und die Person unter Druck setzen.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      answer:
        'Bei einer Ich-Botschaft beschreibt der Sprecher die eigene Wahrnehmung und Wirkung, statt den anderen anzugreifen, z. B. „Ich möchte, dass wir ruhig bleiben“ statt „Sie sind unverschämt“.',
      distractors: [
        'Eine Ich-Botschaft ist eine Anweisung, die mit „Sie müssen“ beginnt.',
        'Eine Ich-Botschaft ist ein Vorwurf, der die andere Person beschuldigt.',
        'Eine Ich-Botschaft ist eine Drohung mit rechtlichen Konsequenzen.',
        'Eine Ich-Botschaft ist eine Aussage über die andere Person.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      answer:
        'Aktives Zuhören bedeutet, dem Gegenüber Aufmerksamkeit zu zeigen, nachzufragen und das Gesagte mit eigenen Worten zusammenzufassen, um Verständnis zu signalisieren.',
      distractors: [
        'Aktives Zuhören bedeutet, dem Gegenüber ständig zu widersprechen.',
        'Aktives Zuhören bedeutet, das Gespräch schnell zu beenden.',
        'Aktives Zuhören bedeutet, nur auf die eigenen Argumente zu achten.',
        'Aktives Zuhören bedeutet, den anderen reden zu lassen, ohne zu reagieren.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-194',
    main: {
      distractors: [
        'Deeskalation ist das gezielte Verstärken eines Konflikts.',
        'Deeskalation ist das Ignorieren eines Konflikts.',
        'Deeskalation ist die sofortige Anwendung körperlicher Gewalt.',
        'Deeskalation ist die Androhung rechtlicher Schritte.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      answer:
        'Zu den Techniken gehören ruhige Ansprache, Wahrung von Distanz, Ich-Botschaften, aktives Zuhören und das Setzen klarer Grenzen.',
      distractors: [
        'Zu den Techniken gehören lautes Rufen und Drohungen.',
        'Zu den Techniken gehören körperliche Überlegenheit und Festhalten.',
        'Zu den Techniken gehören das Ignorieren und Weggehen.',
        'Zu den Techniken gehören der Einsatz von Pfefferspray und Waffen.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      answer:
        'Ein Beispiel ist, einer aufgebrachten Person ruhig zuzuhören, Verständnis zu zeigen und sachlich eine Lösung anzubieten.',
      distractors: [
        'Ein Beispiel ist, die Person anzuschreien, damit sie still ist.',
        'Ein Beispiel ist, die Person sofort festzuhalten.',
        'Ein Beispiel ist, die Person aus dem Objekt zu werfen.',
        'Ein Beispiel ist, die Polizei ohne Anlass zu rufen.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-215',
    main: {
      distractors: [
        'Laut und bestimmend auftreten, um Respekt zu erzwingen.',
        'Die Person ignorieren, bis sie von selbst geht.',
        'Sofort körperliche Gewalt anwenden.',
        'Die Person ohne Erklärung festhalten.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      answer:
        'Zu achten ist auf eine ruhige, respektvolle Ansprache, klare und einfache Anweisungen, ausreichenden Abstand und das Vermeiden von Provokationen.',
      distractors: [
        'Zu achten ist auf möglichst großen körperlichen Kontakt.',
        'Zu achten ist auf schnelle, laute Kommandos.',
        'Zu achten ist auf Ironie und Spott, um Distanz zu schaffen.',
        'Zu achten ist darauf, die Person zu provozieren.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      answer:
        'Gefahren sind eine erhöhte Aggressions- und Gewaltbereitschaft, eingeschränkte Urteilsfähigkeit und eine gesteigerte Sturz- und Verletzungsgefahr.',
      distractors: [
        'Gefahren bestehen nicht, weil Betrunkene harmlos sind.',
        'Gefahren bestehen nur für den Betrunkenen selbst.',
        'Gefahren bestehen nur bei Jugendlichen.',
        'Gefahren bestehen nur bei bewaffneten Personen.',
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
    main: {
      distractors: [
        'Physische Sicherung durch Türen, Schlösser und Zäune.',
        'Regelungen und Abläufe wie Dienstanweisungen und Kontrollgänge.',
        'Die Ausbildung und Qualifikation des Sicherheitspersonals.',
        'Die Versicherung von Sach- und Personenschäden.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      answer:
        'Eine Einbruchmeldeanlage (EMA) ist eine Anlage zur Erkennung und Meldung unbefugten Eindringens.',
      distractors: [
        'Eine Einbruchmeldeanlage ist eine Anlage zur Brandfrüherkennung.',
        'Eine Einbruchmeldeanlage ist ein Zutrittskontrollsystem für Mitarbeiter.',
        'Eine Einbruchmeldeanlage ist eine Videoanlage zur Live-Beobachtung.',
        'Eine Einbruchmeldeanlage ist eine mechanische Sicherung aus Stahl.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      answer:
        'Eine Gefahrenmeldeanlage (GMA) ist der Oberbegriff für technische Anlagen zur Meldung von Gefahren wie Einbruch, Brand oder Überfall.',
      distractors: [
        'Eine Gefahrenmeldeanlage ist ausschließlich eine Brandmeldeanlage.',
        'Eine Gefahrenmeldeanlage ist ein mechanisches Schloss.',
        'Eine Gefahrenmeldeanlage ist ein System zur Steuerung von Schließanlagen.',
        'Eine Gefahrenmeldeanlage ist eine Dienstkleidung mit Warnfunktion.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-218',
    main: {
      distractors: [
        'Bauliche, personelle und finanzielle Sicherheit.',
        'Innere, äußere und rechtliche Sicherheit.',
        'Manuelle, automatische und digitale Sicherheit.',
        'Präventive, repressive und dokumentarische Sicherheit.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      answer:
        'Mechanische Sicherheit sichert baulich (Türen, Schlösser, Zäune), elektronische Sicherheit überwacht technisch (Alarmanlagen, Video, Zutrittskontrolle), organisatorische Sicherheit regelt Abläufe (Dienstanweisungen, Kontrollgänge).',
      distractors: [
        'Alle drei Säulen bedeuten dasselbe.',
        'Mechanische Sicherheit ist die Ausbildung des Personals.',
        'Elektronische Sicherheit ist der Bau von Zäunen.',
        'Organisatorische Sicherheit ist der Einsatz von Videokameras.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      answer:
        'Ja, die Säulen wirken zusammen: Mechanik verzögert, Elektronik meldet und Organisation steuert die Reaktion; erst das Zusammenspiel ergibt ein wirksames Sicherheitskonzept.',
      distractors: [
        'Nein, es genügt, nur eine Säule einzusetzen.',
        'Nein, die Säulen schließen sich gegenseitig aus.',
        'Ja, aber nur bei Großobjekten.',
        'Nein, Elektronik ersetzt Mechanik und Organisation vollständig.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
  {
    blockId: 'fragen-224',
    main: {
      distractors: [
        'Eine Anlage zur Erkennung und Meldung unbefugten Eindringens.',
        'Eine Anlage zur Steuerung des Zutritts zu Bereichen.',
        'Eine Anlage zur Videoüberwachung von Räumen.',
        'Eine mechanische Sicherung aus Stahl.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp1: {
      answer:
        'Brandmelder sind z. B. Rauchmelder, Wärmemelder, Flammenmelder und Multifunktionsmelder (Kombination mehrerer Brandkenngrößen).',
      distractors: [
        'Brandmelder sind ausschließlich Videokameras.',
        'Brandmelder sind Türen und Schlösser.',
        'Brandmelder sind Zutrittskontrollsysteme.',
        'Brandmelder sind ausschließlich Handfeuerlöscher.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
    followUp2: {
      answer:
        'Brandklassen sind A (feste Stoffe), B (flüssige Stoffe), C (Gase), D (Metalle) und F (Fette und Öle).',
      distractors: [
        'Brandklassen sind 1, 2 und 3.',
        'Brandklassen sind rot, gelb und blau.',
        'Brandklassen sind klein, mittel und groß.',
        'Brandklassen sind nur A und B.',
      ],
      source: 'AUTHORED_FROM_FACHWISSEN',
      verificationStatus: 'UNVERIFIED',
    },
  },
];
