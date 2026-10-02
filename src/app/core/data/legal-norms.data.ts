import { LegalNorm } from '../models';

/**
 * Juristische Knowledge Base.
 *
 * Quelle: 34a_bibel_v5_3_1.txt (Rechtsstand 01.10.2026).
 * Primärquelle der Gesetzestexte: Gesetze im Internet
 * (Bundesministerium der Justiz / Bundesamt für Justiz).
 *
 * Es werden ausschließlich Normen aufgenommen, die in der Bibel enthalten
 * sind. Amtlicher Gesetzestext, vereinfachte Erklärung und Prüfungsmerksatz
 * bleiben strikt getrennt (Bibel-Kapitel 65).
 *
 * Fehlt in der Bibel ein amtlicher Wortlaut, bleibt `officialText` leer und
 * `verificationStatus` wird auf MISSING gesetzt – es wird nichts hinzugedichtet.
 */
export const LEGAL_NORMS: LegalNorm[] = [
  // ---------------------------------------------------------------------------
  // TEIL 1 – STRAFRECHT: Allgemeiner Teil
  // ---------------------------------------------------------------------------
  {
    id: 'stgb-15',
    law: 'StGB',
    paragraph: '§ 15',
    title: 'Vorsätzliches und fahrlässiges Handeln',
    officialText:
      'Strafbar ist nur vorsätzliches Handeln, wenn nicht das Gesetz fahrlässiges Handeln ausdrücklich mit Strafe bedroht.',
    explanation:
      'Grundsätzlich setzt die Strafbarkeit vorsätzliches Handeln voraus. Fahrlässigkeit ist nur strafbar, wenn das jeweilige Gesetz dies ausdrücklich vorsieht.',
    mnemonic: '§15 = Vorsatz grundsätzlich erforderlich; Fahrlässigkeit nur bei ausdrücklicher Strafbarkeit.',
    area: 'Strafrecht',
    nature: 'GRUNDLAGE',
    source: 'https://www.gesetze-im-internet.de/stgb/__15.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },
  {
    id: 'stgb-16',
    law: 'StGB',
    paragraph: '§ 16',
    title: 'Irrtum über Tatumstände',
    officialText:
      '(1) Wer bei Begehung der Tat einen Umstand nicht kennt, der zum gesetzlichen Tatbestand gehört, handelt nicht vorsätzlich. Die Strafbarkeit wegen fahrlässiger Begehung bleibt unberührt. (2) Wer bei Begehung der Tat irrig Umstände annimmt, welche den Tatbestand eines milderen Gesetzes verwirklichen würden, kann wegen vorsätzlicher Begehung nur nach dem milderen Gesetz bestraft werden.',
    explanation:
      '§16 betrifft den Irrtum über tatsächliche Umstände, die zum gesetzlichen Tatbestand gehören. Kennt der Täter einen tatbestandlichen Umstand nicht, fehlt grundsätzlich der Vorsatz hinsichtlich dieses Umstands.',
    mnemonic: '§16 = Irrtum über Tatsachen des Tatbestands.',
    area: 'Strafrecht',
    nature: 'GRUNDLAGE',
    source: 'https://www.gesetze-im-internet.de/stgb/__16.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },
  {
    id: 'stgb-22',
    law: 'StGB',
    paragraph: '§ 22',
    title: 'Begriffsbestimmung (Versuch)',
    officialText:
      'Eine Straftat versucht, wer nach seiner Vorstellung von der Tat zur Verwirklichung des Tatbestandes unmittelbar ansetzt.',
    explanation:
      'Der Täter muss nach seiner Vorstellung die Schwelle zur unmittelbaren Tatbestandsverwirklichung überschritten haben.',
    mnemonic: '§22 = unmittelbares Ansetzen.',
    area: 'Strafrecht',
    nature: 'GRUNDLAGE',
    source: 'https://www.gesetze-im-internet.de/stgb/__22.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },
  {
    id: 'stgb-23',
    law: 'StGB',
    paragraph: '§ 23',
    title: 'Strafbarkeit des Versuchs',
    officialText:
      '(1) Der Versuch eines Verbrechens ist stets strafbar, der Versuch eines Vergehens nur dann, wenn das Gesetz es ausdrücklich bestimmt. (2) Der Versuch kann milder bestraft werden als die vollendete Tat (§ 49 Abs. 1). (3) Hat der Täter aus grobem Unverstand verkannt, daß der Versuch nach der Art des Gegenstandes, an dem, oder des Mittels, mit dem die Tat begangen werden sollte, überhaupt nicht zur Vollendung führen konnte, so kann das Gericht von Strafe absehen oder die Strafe nach seinem Ermessen mildern (§ 49 Abs. 2).',
    explanation: 'Regelt, wann ein Versuch strafbar ist.',
    mnemonic: '§23 = Wann ist der Versuch strafbar?',
    area: 'Strafrecht',
    nature: 'GRUNDLAGE',
    source: 'https://www.gesetze-im-internet.de/stgb/__23.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },
  {
    id: 'stgb-25',
    law: 'StGB',
    paragraph: '§ 25',
    title: 'Täterschaft',
    officialText:
      '(1) Als Täter wird bestraft, wer die Straftat selbst oder durch einen anderen begeht. (2) Begehen mehrere die Straftat gemeinschaftlich, so wird jeder als Täter bestraft (Mittäter).',
    explanation: 'Zu unterscheiden sind unmittelbare Täterschaft, mittelbare Täterschaft und Mittäterschaft.',
    mnemonic: '§25 = Wer ist Täter?',
    area: 'Strafrecht',
    nature: 'GRUNDLAGE',
    source: 'https://www.gesetze-im-internet.de/stgb/__25.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },
  {
    id: 'stgb-26',
    law: 'StGB',
    paragraph: '§ 26',
    title: 'Anstiftung',
    officialText:
      'Als Anstifter wird gleich einem Täter bestraft, wer vorsätzlich einen anderen zu dessen vorsätzlich begangener rechtswidriger Tat bestimmt hat.',
    explanation:
      'Anstiftung bedeutet das vorsätzliche Bestimmen eines anderen zu dessen vorsätzlich begangener rechtswidriger Tat.',
    mnemonic: '§26 = einen anderen zur Tat bestimmen.',
    area: 'Strafrecht',
    nature: 'GRUNDLAGE',
    source: 'https://www.gesetze-im-internet.de/stgb/__26.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },
  {
    id: 'stgb-27',
    law: 'StGB',
    paragraph: '§ 27',
    title: 'Beihilfe',
    officialText:
      '(1) Als Gehilfe wird bestraft, wer vorsätzlich einem anderen zu dessen vorsätzlich begangener rechtswidriger Tat Hilfe geleistet hat. (2) Die Strafe für den Gehilfen richtet sich nach der Strafdrohung für den Täter. Sie ist nach § 49 Abs. 1 zu mildern.',
    explanation:
      'Beihilfe ist die vorsätzliche Unterstützung einer vorsätzlich begangenen rechtswidrigen Tat eines anderen.',
    mnemonic: '§27 = fremde Tat vorsätzlich fördern/unterstützen.',
    area: 'Strafrecht',
    nature: 'GRUNDLAGE',
    source: 'https://www.gesetze-im-internet.de/stgb/__27.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },

  // ---------------------------------------------------------------------------
  // TEIL 1 – RECHTFERTIGUNG UND ENTSCHEIDUNG
  // ---------------------------------------------------------------------------
  {
    id: 'stgb-32',
    law: 'StGB',
    paragraph: '§ 32',
    title: 'Notwehr',
    officialText:
      '(1) Wer eine Tat begeht, die durch Notwehr geboten ist, handelt nicht rechtswidrig. (2) Notwehr ist die Verteidigung, die erforderlich ist, um einen gegenwärtigen rechtswidrigen Angriff von sich oder einem anderen abzuwenden.',
    explanation:
      'Notwehr setzt insbesondere voraus: Angriff, Gegenwärtigkeit, Rechtswidrigkeit, Verteidigung, Erforderlichkeit.',
    mnemonic: '§32 = gegenwärtiger rechtswidriger Angriff → erforderliche Verteidigung.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__32.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    prerequisites: ['Angriff', 'Gegenwärtigkeit', 'Rechtswidrigkeit des Angriffs', 'Verteidigung', 'Erforderlichkeit'],
    legalConsequence: 'Die Handlung ist nicht rechtswidrig (Rechtfertigung).',
    distinctions: ['§32 StGB rechtfertigt; §33 StGB kann entschuldigen.'],
  },
  {
    id: 'stgb-33',
    law: 'StGB',
    paragraph: '§ 33',
    title: 'Überschreitung der Notwehr',
    officialText:
      'Überschreitet der Täter die Grenzen der Notwehr aus Verwirrung, Furcht oder Schrecken, so wird er nicht bestraft.',
    explanation:
      '§33 betrifft die Überschreitung der Grenzen der Notwehr aus Verwirrung, Furcht oder Schrecken. Die Vorschrift ist eine Entschuldigungsregelung.',
    mnemonic: '§32 rechtfertigt – §33 kann entschuldigen.',
    area: 'Strafrecht',
    nature: 'ENTSCHULDIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__33.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },
  {
    id: 'stgb-34',
    law: 'StGB',
    paragraph: '§ 34',
    title: 'Rechtfertigender Notstand',
    officialText:
      'Wer in einer gegenwärtigen, nicht anders abwendbaren Gefahr für Leben, Leib, Freiheit, Ehre, Eigentum oder ein anderes Rechtsgut eine Tat begeht, um die Gefahr von sich oder einem anderen abzuwenden, handelt nicht rechtswidrig, wenn bei Abwägung der widerstreitenden Interessen, namentlich der betroffenen Rechtsgüter und des Grades der ihnen drohenden Gefahren, das geschützte Interesse das beeinträchtigte wesentlich überwiegt. Dies gilt jedoch nur, soweit die Tat ein angemessenes Mittel ist, die Gefahr abzuwenden.',
    explanation:
      'Zu prüfen sind: gegenwärtige Gefahr, Gefahr für ein geschütztes Rechtsgut, nicht anders abwendbare Gefahr, Handlung zur Gefahrenabwehr, Interessenabwägung, wesentliches Überwiegen, Angemessenheit des Mittels.',
    mnemonic: '§34 = gegenwärtige, nicht anders abwendbare Gefahr + Interessenabwägung.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__34.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    prerequisites: [
      'gegenwärtige Gefahr',
      'Gefahr für ein geschütztes Rechtsgut',
      'nicht anders abwendbare Gefahr',
      'Handlung zur Gefahrenabwehr',
      'Interessenabwägung mit wesentlichem Überwiegen',
      'Angemessenheit des Mittels',
    ],
    legalConsequence: 'Die Handlung ist nicht rechtswidrig (Rechtfertigung).',
  },
  {
    id: 'stgb-35',
    law: 'StGB',
    paragraph: '§ 35',
    title: 'Entschuldigender Notstand',
    officialText:
      '(1) Wer in einer gegenwärtigen, nicht anders abwendbaren Gefahr für Leben, Leib oder Freiheit eine rechtswidrige Tat begeht, um die Gefahr von sich, einem Angehörigen oder einer anderen ihm nahestehenden Person abzuwenden, handelt ohne Schuld. (2) Nimmt der Täter bei Begehung der Tat irrig Umstände an, welche ihn nach Absatz 1 entschuldigen würden, so wird er nur dann bestraft, wenn er den Irrtum vermeiden konnte.',
    explanation:
      '§35 betrifft den entschuldigenden Notstand. Im Unterschied zu §34 führt die Vorschrift nicht zur Rechtfertigung, sondern kann die Schuld entfallen lassen.',
    mnemonic: '§34 = Rechtfertigung. §35 = Entschuldigung.',
    area: 'Strafrecht',
    nature: 'ENTSCHULDIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__35.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },

  // ---------------------------------------------------------------------------
  // TEIL 1 – BESONDERER TEIL: Delikte
  // ---------------------------------------------------------------------------
  {
    id: 'stgb-123',
    law: 'StGB',
    paragraph: '§ 123',
    title: 'Hausfriedensbruch',
    officialText:
      '(1) Wer in die Wohnung, in die Geschäftsräume oder in das befriedete Besitztum eines anderen oder in abgeschlossene Räume, welche zum öffentlichen Dienst oder Verkehr bestimmt sind, widerrechtlich eindringt, oder wer, wenn er ohne Befugnis darin verweilt, auf die Aufforderung des Berechtigten sich nicht entfernt, wird mit Freiheitsstrafe bis zu einem Jahr oder mit Geldstrafe bestraft. (2) Die Tat wird nur auf Antrag verfolgt.',
    explanation:
      '§123 StGB schützt insbesondere das Hausrecht. Zu prüfen sind: geschützter Bereich, Eindringen gegen den Willen bzw. widerrechtliches Eindringen, unbefugtes Verweilen trotz Aufforderung, Vorsatz, Rechtswidrigkeit.',
    mnemonic: '§123 = unbefugt eindringen oder trotz Aufforderung unbefugt bleiben.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__123.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    prerequisites: ['geschützter Bereich', 'widerrechtliches Eindringen oder unbefugtes Verweilen trotz Aufforderung', 'Vorsatz', 'Rechtswidrigkeit'],
    legalConsequence: 'Freiheitsstrafe bis zu einem Jahr oder Geldstrafe; Tat wird nur auf Antrag verfolgt.',
    distinctions: ['§124 StGB = schwerer Hausfriedensbruch mit zusätzlichen Voraussetzungen.'],
    securityContext:
      'Hausrecht → Hausverbot/Aufforderung zum Verlassen → Verhalten der Person → ggf. §123 StGB. Der mögliche Hausfriedensbruch beantwortet nicht automatisch, welche Handlung die Sicherheitskraft vornehmen darf.',
  },
  {
    id: 'stgb-124',
    law: 'StGB',
    paragraph: '§ 124',
    title: 'Schwerer Hausfriedensbruch',
    officialText:
      'Wenn sich eine Menschenmenge öffentlich zusammenrottet und in der Absicht, Gewalttätigkeiten gegen Personen oder Sachen mit vereinten Kräften zu begehen, in die Wohnung, in die Geschäftsräume oder in das befriedete Besitztum eines anderen oder in abgeschlossene Räume, welche zum öffentlichen Dienst bestimmt sind, widerrechtlich eindringt, so wird jeder, welcher an diesen Handlungen teilnimmt, mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe bestraft.',
    explanation:
      '§124 ist kein allgemeiner verschärfter Hausfriedensbruch für jeden Verstoß gegen ein Hausverbot. Erforderlich sind Menschenmenge, öffentliches Zusammenrotten, Gewaltabsicht, widerrechtliches Eindringen und Teilnahme.',
    mnemonic: '§124 = Menschenmenge + Zusammenrottung + Gewaltabsicht + widerrechtliches Eindringen.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__124.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },
  {
    id: 'stgb-132',
    law: 'StGB',
    paragraph: '§ 132',
    title: 'Amtsanmaßung',
    officialText:
      'Wer unbefugt sich mit der Ausübung eines öffentlichen Amtes befaßt oder eine Handlung vornimmt, welche nur kraft eines öffentlichen Amtes vorgenommen werden darf, wird mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe bestraft.',
    explanation:
      '§132 StGB schützt die staatliche Hoheitsordnung vor dem unbefugten Auftreten als Amtsträger bzw. der unbefugten Vornahme hoheitlicher Handlungen.',
    mnemonic: '§132 = unbefugte Ausübung eines öffentlichen Amtes.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__132.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    distinctions: ['§132 StGB = Amtsanmaßung. §132a StGB = Missbrauch geschützter Titel/Abzeichen.'],
    securityContext:
      'Eine private Sicherheitskraft wird durch Uniform, Dienstausweis oder ihre Tätigkeit nicht zu einem Polizeibeamten. Sicherheitskraft ≠ Polizeibeamter; private Befugnis ≠ staatliche Hoheitsbefugnis.',
  },
  {
    id: 'stgb-132a',
    law: 'StGB',
    paragraph: '§ 132a',
    title: 'Mißbrauch von Titeln, Berufsbezeichnungen und Abzeichen',
    officialText:
      '(1) Wer unbefugt 1. inländische oder ausländische Amts- oder Dienstbezeichnungen, akademische Grade, Titel oder öffentliche Würden führt, 2. die Berufsbezeichnung Arzt, Zahnarzt, Psychologischer Psychotherapeut, Kinder- und Jugendlichenpsychotherapeut, Psychotherapeut, Tierarzt, Apotheker, Rechtsanwalt, Patentanwalt, Wirtschaftsprüfer, vereidigter Buchprüfer, Steuerberater oder Steuerbevollmächtigter führt, 3. die Bezeichnung öffentlich bestellter Sachverständiger führt oder 4. inländische oder ausländische Uniformen, Amtskleidungen oder Amtsabzeichen trägt, wird mit Freiheitsstrafe bis zu einem Jahr oder mit Geldstrafe bestraft.',
    explanation:
      '§132a betrifft den unbefugten Gebrauch bestimmter geschützter Amts- und Dienstbezeichnungen, akademischer Grade, Titel, öffentlicher Würden, Berufsbezeichnungen, Uniformen, Amtskleidungen und Amtsabzeichen.',
    mnemonic: '§132a = geschützte Bezeichnungen und Abzeichen nicht unbefugt führen oder tragen.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__132a.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },
  {
    id: 'stgb-185',
    law: 'StGB',
    paragraph: '§ 185',
    title: 'Beleidigung',
    officialText:
      'Die Beleidigung wird mit Freiheitsstrafe bis zu einem Jahr oder mit Geldstrafe und, wenn die Beleidigung öffentlich, in einer Versammlung, durch Verbreiten eines Inhalts (§ 11 Absatz 3) oder mittels einer Tätlichkeit begangen wird, mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe bestraft.',
    explanation:
      '§185 StGB schützt die Ehre. Für die Prüfung sind insbesondere Äußerung, objektiver Erklärungsinhalt, Kontext, Bezug zur betroffenen Person, Vorsatz und mögliche Rechtfertigungsgründe zu betrachten. Die Frage des Strafantrags darf nicht mit dem Tatbestand selbst vermischt werden.',
    mnemonic: '§185 = Beleidigung → Ehrverletzung; Tatbestand und Strafverfolgung getrennt prüfen.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__185.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },
  {
    id: 'stgb-223',
    law: 'StGB',
    paragraph: '§ 223',
    title: 'Körperverletzung',
    officialText:
      'Wer eine andere Person körperlich mißhandelt oder an der Gesundheit schädigt, wird mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe bestraft. Der Versuch ist strafbar.',
    explanation: 'Objektiv: andere Person, körperliche Misshandlung oder Gesundheitsschädigung. Subjektiv: Vorsatz.',
    mnemonic: '§223 = körperlich misshandeln oder Gesundheit schädigen.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__223.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    prerequisites: ['andere Person', 'körperliche Misshandlung oder Gesundheitsschädigung', 'Vorsatz'],
  },
  {
    id: 'stgb-224',
    law: 'StGB',
    paragraph: '§ 224',
    title: 'Gefährliche Körperverletzung',
    officialText:
      '(1) Wer die Körperverletzung 1. durch Beibringung von Gift oder anderen gesundheitsschädlichen Stoffen, 2. mittels einer Waffe oder eines anderen gefährlichen Werkzeugs, 3. mittels eines hinterlistigen Überfalls, 4. mit einem anderen Beteiligten gemeinschaftlich oder 5. mittels einer das Leben gefährdenden Behandlung begeht, wird mit Freiheitsstrafe von sechs Monaten bis zu zehn Jahren, in minder schweren Fällen mit Freiheitsstrafe von drei Monaten bis zu fünf Jahren bestraft. (2) Der Versuch ist strafbar.',
    explanation:
      '§224 ist eine Qualifikation zu §223. Zunächst muss eine Körperverletzung vorliegen; danach ist zu prüfen, ob eine der gesetzlichen Qualifikationen erfüllt ist.',
    mnemonic: '§223 + besondere Begehungsweise = §224 prüfen.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__224.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    distinctions: ['§224 setzt §223 voraus (Qualifikation).'],
  },
  {
    id: 'stgb-226',
    law: 'StGB',
    paragraph: '§ 226',
    title: 'Schwere Körperverletzung',
    officialText:
      '(1) Hat die Körperverletzung zur Folge, daß die verletzte Person 1. das Sehvermögen auf einem Auge oder beiden Augen, das Gehör, das Sprechvermögen oder die Fortpflanzungsfähigkeit verliert, 2. ein wichtiges Glied des Körpers verliert oder dauernd nicht mehr gebrauchen kann oder 3. in erheblicher Weise dauernd entstellt wird oder in Siechtum, Lähmung oder geistige Krankheit oder Behinderung verfällt, so ist die Strafe Freiheitsstrafe von einem Jahr bis zu zehn Jahren.',
    explanation:
      '§226 setzt eine Körperverletzung und zusätzlich eine gesetzlich bestimmte schwere Folge voraus. Eine bloße Verletzung reicht nicht automatisch für §226.',
    mnemonic: '§226 = Körperverletzung + gesetzlich bestimmte schwere Folge.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__226.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },
  {
    id: 'stgb-227',
    law: 'StGB',
    paragraph: '§ 227',
    title: 'Körperverletzung mit Todesfolge',
    officialText:
      'Hat der Täter durch die Körperverletzung (§§ 223 bis 226) den Tod der verletzten Person verursacht, so ist die Strafe Freiheitsstrafe nicht unter drei Jahren. In minder schweren Fällen ist auf Freiheitsstrafe von einem Jahr bis zu zehn Jahren zu erkennen.',
    explanation: '§227 = Körperverletzung, die den Tod der verletzten Person verursacht.',
    mnemonic: '§227 = Körperverletzung → Tod.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__227.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },
  {
    id: 'stgb-240',
    law: 'StGB',
    paragraph: '§ 240',
    title: 'Nötigung',
    officialText:
      '(1) Wer einen Menschen rechtswidrig mit Gewalt oder durch Drohung mit einem empfindlichen Übel zu einer Handlung, Duldung oder Unterlassung nötigt, wird mit Freiheitsstrafe bis zu drei Jahren oder mit Geldstrafe bestraft. (2) Rechtswidrig ist die Tat, wenn die Anwendung der Gewalt oder die Androhung des Übels zu dem angestrebten Zweck als verwerflich anzusehen ist. (3) Der Versuch ist strafbar.',
    explanation:
      'Geschützt wird die Freiheit der Willensentschließung und Willensbetätigung. Die Rechtswidrigkeit richtet sich nach der besonderen Verwerflichkeitsprüfung des §240 Abs. 2. Nicht jede Gewaltanwendung oder Drohung erfüllt automatisch die rechtswidrige Nötigung.',
    mnemonic: '§240 = Gewalt oder Drohung → Handlung, Duldung oder Unterlassung erzwingen.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__240.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    prerequisites: ['Mensch als Nötigungsopfer', 'Gewalt oder Drohung mit empfindlichem Übel', 'Nötigung zu Handlung, Duldung oder Unterlassung', 'Kausalität', 'Vorsatz', 'Verwerflichkeit nach §240 Abs. 2'],
    securityContext:
      'Eine Person darf nicht allein deshalb mit Gewalt zu einem Verhalten gezwungen werden, weil die Sicherheitskraft dieses Verhalten für wünschenswert hält. Vor einer Zwangshandlung sind Rechtsgrundlage, eigene Befugnis, Mittel, Erforderlichkeit und mildere Mittel zu prüfen.',
  },
  {
    id: 'stgb-242',
    law: 'StGB',
    paragraph: '§ 242',
    title: 'Diebstahl',
    officialText:
      '(1) Wer eine fremde bewegliche Sache einem anderen in der Absicht wegnimmt, die Sache sich oder einem Dritten rechtswidrig zuzueignen, wird mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe bestraft. (2) Der Versuch ist strafbar.',
    explanation:
      'Fremde bewegliche Sache → Wegnahme (Bruch fremden und Begründung neuen Gewahrsams) → Vorsatz → Zueignungsabsicht.',
    mnemonic: '§242 = fremde bewegliche Sache + Wegnahme + Zueignungsabsicht.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__242.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    prerequisites: ['fremde bewegliche Sache', 'Wegnahme', 'Vorsatz', 'Absicht rechtswidriger Zueignung'],
    securityContext:
      'Ein möglicher Diebstahl beantwortet nicht automatisch die Frage nach einer Festhaltebefugnis. Dafür ist eine gesonderte Prüfung der einschlägigen Befugnis erforderlich, insbesondere ggf. §127 StPO.',
  },
  {
    id: 'stgb-243',
    law: 'StGB',
    paragraph: '§ 243',
    title: 'Besonders schwerer Fall des Diebstahls',
    officialText:
      '(1) In besonders schweren Fällen wird der Diebstahl mit Freiheitsstrafe von drei Monaten bis zu zehn Jahren bestraft. Ein besonders schwerer Fall liegt in der Regel vor, wenn der Täter 1. zur Ausführung der Tat in ein Gebäude, einen Dienst- oder Geschäftsraum oder in einen anderen umschlossenen Raum einbricht, einsteigt, mit einem falschen Schlüssel oder einem anderen nicht zur ordnungsmäßigen Öffnung bestimmten Werkzeug eindringt oder sich in dem Raum verborgen hält, 2. eine Sache stiehlt, die durch ein verschlossenes Behältnis oder eine andere Schutzvorrichtung gegen Wegnahme besonders gesichert ist, 3. gewerbsmäßig stiehlt, 4. aus einer Kirche oder einem anderen der Religionsausübung dienenden Gebäude oder Raum eine Sache stiehlt, die dem Gottesdienst gewidmet ist oder der religiösen Verehrung dient, 5. eine Sache von Bedeutung für Wissenschaft, Kunst oder Geschichte oder für die technische Entwicklung stiehlt, die durch ein verschlossenes Behältnis oder eine andere Schutzvorrichtung gegen Wegnahme besonders gesichert ist.',
    explanation:
      '§243 enthält gesetzliche Regelbeispiele für besonders schwere Fälle. §243 ist nicht einfach ein eigener Grundtatbestand neben §242; zunächst ist der Diebstahl nach §242 zu prüfen.',
    mnemonic: '§242 = Diebstahl. §243 = besonders schwerer Fall.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__243.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    distinctions: ['§243 setzt §242 voraus (Regelbeispiel).'],
  },
  {
    id: 'stgb-247',
    law: 'StGB',
    paragraph: '§ 247',
    title: 'Haus- und Familiendiebstahl',
    officialText:
      'Ist durch einen Diebstahl oder eine Unterschlagung ein Angehöriger, der Vormund oder der Betreuer verletzt oder lebt der Verletzte mit dem Täter in häuslicher Gemeinschaft, so wird die Tat nur auf Antrag verfolgt.',
    explanation:
      '§247 enthält eine besondere Strafverfolgungsregelung für bestimmte persönliche Beziehungen. Die Norm verändert nicht den Grundtatbestand des Diebstahls.',
    mnemonic: '§247 = besondere persönliche Beziehung → nur auf Antrag.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__247.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    distinctions: ['§242 = Tatbestand Diebstahl; §247 = Strafverfolgungsregelung.'],
  },
  {
    id: 'stgb-248a',
    law: 'StGB',
    paragraph: '§ 248a',
    title: 'Diebstahl und Unterschlagung geringwertiger Sachen',
    officialText:
      'Der Diebstahl und die Unterschlagung geringwertiger Sachen werden in den Fällen der §§ 242 und 246 nur auf Antrag verfolgt, es sei denn, daß die Strafverfolgungsbehörde wegen des besonderen öffentlichen Interesses an der Strafverfolgung ein Einschreiten von Amts wegen für geboten hält.',
    explanation:
      '§248a ist eine Strafverfolgungsregelung. Die Vorschrift beseitigt nicht automatisch den Straftatbestand, sondern betrifft die Frage der Strafverfolgung.',
    mnemonic: '§248a = geringwertige Sache → grundsätzlich Strafantrag, Ausnahme öffentliches Interesse.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__248a.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    securityContext: 'Die Sicherheitskraft darf nicht aus §248a allein eine eigene Eingriffsbefugnis ableiten.',
  },
  {
    id: 'stgb-249',
    law: 'StGB',
    paragraph: '§ 249',
    title: 'Raub',
    officialText:
      '(1) Wer mit Gewalt gegen eine Person oder unter Anwendung von Drohungen mit gegenwärtiger Gefahr für Leib oder Leben eine fremde bewegliche Sache einem anderen in der Absicht wegnimmt, die Sache sich oder einem Dritten rechtswidrig zuzueignen, wird mit Freiheitsstrafe nicht unter einem Jahr bestraft. (2) In minder schweren Fällen ist die Strafe Freiheitsstrafe von sechs Monaten bis zu fünf Jahren.',
    explanation:
      'Raub verbindet eine Wegnahme mit qualifizierter Gewalt bzw. Drohung. §249 ist nicht lediglich ein schwerer Diebstahl.',
    mnemonic: '§249 = Wegnahme + Gewalt gegen Person oder Drohung mit gegenwärtiger Gefahr für Leib oder Leben.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__249.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    securityContext:
      'Das Vorliegen eines möglichen Raubes bedeutet nicht automatisch, dass jede Sicherheitskraft beliebige Zwangsmittel einsetzen darf. Eine eigene Festhaltebefugnis ist gesondert zu prüfen, insbesondere §127 StPO.',
  },
  {
    id: 'stgb-252',
    law: 'StGB',
    paragraph: '§ 252',
    title: 'Räuberischer Diebstahl',
    officialText: '',
    explanation:
      '§252 ist nicht Raub. Die Norm betrifft den Täter, der bei einem Diebstahl auf frischer Tat betroffen wird und bestimmte Gewalt-/Drohungshandlungen einsetzt, um den Besitz an der gestohlenen Sache zu behalten.',
    mnemonic: '§252 = Diebstahl bereits geschehen + Gewalt/Drohung zur Beutesicherung.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__252.html',
    verificationStatus: 'MISSING',
    distinctions: ['§249 = qualifiziertes Nötigungsmittel bei der Wegnahme; §252 = Gewalt/Drohung zur Beutesicherung nach dem Diebstahl.'],
  },
  {
    id: 'stgb-253',
    law: 'StGB',
    paragraph: '§ 253',
    title: 'Erpressung',
    officialText:
      '(1) Wer einen Menschen rechtswidrig mit Gewalt oder durch Drohung mit einem empfindlichen Übel zu einer Handlung, Duldung oder Unterlassung nötigt und dadurch dem Vermögen des Genötigten oder eines anderen Nachteil zufügt, um sich oder einen Dritten zu Unrecht zu bereichern, wird mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe bestraft. (2) Rechtswidrig ist die Tat, wenn die Anwendung der Gewalt oder die Androhung des Übels zu dem angestrebten Zweck als verwerflich anzusehen ist. (3) Der Versuch ist strafbar. (4) In besonders schweren Fällen ist die Strafe Freiheitsstrafe nicht unter einem Jahr.',
    explanation:
      'Erpressung betrifft die rechtswidrige Nötigung zu einer vermögensschädigenden Handlung, Duldung oder Unterlassung mit Bereicherungsabsicht.',
    mnemonic: '§253 = Nötigung + Vermögensnachteil + rechtswidrige Bereicherungsabsicht.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__253.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },
  {
    id: 'stgb-255',
    law: 'StGB',
    paragraph: '§ 255',
    title: 'Räuberische Erpressung',
    officialText:
      'Wird die Erpressung durch Gewalt gegen eine Person oder unter Anwendung von Drohungen mit gegenwärtiger Gefahr für Leib oder Leben begangen, so ist der Täter gleich einem Räuber zu bestrafen.',
    explanation:
      '§255 qualifiziert bestimmte Formen der Erpressung durch Anwendung von Gewalt gegen eine Person oder Drohung mit gegenwärtiger Gefahr für Leib oder Leben. Zunächst ist eine Erpressung nach §253 zu prüfen.',
    mnemonic: '§255 = Erpressung + Gewalt gegen Person oder Drohung mit gegenwärtiger Gefahr für Leib oder Leben.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__255.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    distinctions: ['§255 setzt §253 voraus (Qualifikation).'],
  },
  {
    id: 'stgb-303',
    law: 'StGB',
    paragraph: '§ 303',
    title: 'Sachbeschädigung',
    officialText:
      '(1) Wer rechtswidrig eine fremde Sache beschädigt oder zerstört, wird mit Freiheitsstrafe bis zu zwei Jahren oder mit Geldstrafe bestraft. (2) Ebenso wird bestraft, wer unbefugt das Erscheinungsbild einer fremden Sache nicht nur unerheblich und nicht nur vorübergehend verändert. (3) Der Versuch ist strafbar.',
    explanation:
      '§303 stellt die Beschädigung, Zerstörung oder bestimmte erhebliche Veränderung einer fremden Sache unter Strafe.',
    mnemonic: '§303 = fremde Sache beschädigen, zerstören oder bestimmte erhebliche Veränderungen vornehmen.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__303.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },
  {
    id: 'stgb-303c',
    law: 'StGB',
    paragraph: '§ 303c',
    title: 'Strafantrag',
    officialText:
      'In den Fällen der §§ 303, 303a Abs. 1 und 2 sowie § 303b Abs. 1 bis 3 wird die Tat nur auf Antrag verfolgt, es sei denn, daß die Strafverfolgungsbehörde wegen des besonderen öffentlichen Interesses an der Strafverfolgung ein Einschreiten von Amts wegen für geboten hält.',
    explanation: '§303c enthält die Strafantragsregelung für die Sachbeschädigung.',
    mnemonic: '§303 = Tatbestand; §303c = Strafantrag/Strafverfolgung.',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/stgb/__303c.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },

  // ---------------------------------------------------------------------------
  // TEIL 2 / 8 – STPO
  // ---------------------------------------------------------------------------
  {
    id: 'stpo-127',
    law: 'StPO',
    paragraph: '§ 127',
    title: 'Vorläufige Festnahme',
    officialText:
      '(1) Wird jemand auf frischer Tat betroffen oder verfolgt, so ist, wenn er der Flucht verdächtig ist oder seine Identität nicht sofort festgestellt werden kann, jedermann befugt, ihn auch ohne richterliche Anordnung vorläufig festzunehmen. Die Feststellung der Identität einer Person durch die Staatsanwaltschaft oder die Beamten des Polizeidienstes bestimmt sich nach § 163b Abs. 1. (2) Die Staatsanwaltschaft und die Beamten des Polizeidienstes sind bei Gefahr im Verzug auch dann zur vorläufigen Festnahme befugt, wenn die Voraussetzungen eines Haftbefehls oder eines Unterbringungsbefehls vorliegen. (3) Ist eine Straftat nur auf Antrag verfolgbar, so ist die vorläufige Festnahme auch dann zulässig, wenn ein Antrag noch nicht gestellt ist. (4) Für die vorläufige Festnahme durch die Staatsanwaltschaft und die Beamten des Polizeidienstes gelten die §§ 114a bis 114c entsprechend.',
    explanation:
      '§127 StPO ist eine gesetzliche Jedermann-Befugnis unter engen Voraussetzungen – keine allgemeine polizeiliche Befugnis und kein allgemeiner Anspruch. Für private Sicherheitskräfte ist §127 Abs. 1 relevant („jedermann“).',
    mnemonic: '§127 = frische Tat + Fluchtverdacht oder Identität nicht sofort feststellbar.',
    area: 'Strafprozessrecht',
    nature: 'BEFUGNIS',
    source: 'https://www.gesetze-im-internet.de/stpo/__127.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    prerequisites: [
      'Person auf frischer Tat betroffen ODER auf frischer Tat verfolgt',
      'Fluchtverdacht ODER Identität nicht sofort feststellbar',
    ],
    legalConsequence: 'Jedermann ist zur vorläufigen Festnahme befugt.',
    distinctions: [
      '§127 StPO = strafprozessuale vorläufige Festnahme.',
      '§859 BGB = Besitzerselbsthilfe.',
      '§229 BGB = zivilrechtliche Selbsthilfe.',
    ],
    securityContext:
      '§127 Abs. 1 StPO macht eine Sicherheitskraft nicht zur Polizei. Nicht jeder Verdacht rechtfertigt automatisch eine Festnahme. Auch bei bestehender Befugnis ist die Durchführung auf das erforderliche Maß zu begrenzen.',
  },
  {
    id: 'stpo-374',
    law: 'StPO',
    paragraph: '§ 374',
    title: 'Zulässigkeit; Privatklageberechtigte',
    officialText:
      '(1) Im Wege der Privatklage können vom Verletzten verfolgt werden, ohne daß es einer vorgängigen Anrufung der Staatsanwaltschaft bedarf, 1. ein Hausfriedensbruch (§ 123 des Strafgesetzbuches), 2. eine Beleidigung (§§ 185 bis 189 des Strafgesetzbuches), 4. eine Körperverletzung (§§ 223 und 229 des Strafgesetzbuches), 5. eine Nötigung (§ 240 Absatz 1 bis 3 des Strafgesetzbuches), 6. eine Sachbeschädigung (§ 303 des Strafgesetzbuches).',
    explanation: '§374 StPO bestimmt die Delikte, die im Wege der Privatklage verfolgt werden können.',
    mnemonic: '§374 = gesetzlich bestimmte Privatklagedelikte.',
    area: 'Strafprozessrecht',
    nature: 'BEFUGNIS',
    source: 'https://www.gesetze-im-internet.de/stpo/__374.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },
  {
    id: 'stpo-376',
    law: 'StPO',
    paragraph: '§ 376',
    title: 'Anklageerhebung bei Privatklagedelikten',
    officialText:
      'Die öffentliche Klage wird wegen der in § 374 bezeichneten Straftaten von der Staatsanwaltschaft nur dann erhoben, wenn dies im öffentlichen Interesse liegt.',
    explanation:
      'Bei den in §374 StPO genannten Straftaten besteht grundsätzlich die Möglichkeit der Privatklage. Die Staatsanwaltschaft erhebt die öffentliche Klage nur, wenn ein öffentliches Interesse besteht.',
    mnemonic: '§376 = öffentliche Klage bei Privatklagedelikten nur bei öffentlichem Interesse.',
    area: 'Strafprozessrecht',
    nature: 'BEFUGNIS',
    source: 'https://www.gesetze-im-internet.de/stpo/__376.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },

  // ---------------------------------------------------------------------------
  // TEIL 2 – BGB: BESITZ UND EIGENTUM
  // ---------------------------------------------------------------------------
  {
    id: 'bgb-854',
    law: 'BGB',
    paragraph: '§ 854',
    title: 'Erwerb des Besitzes',
    officialText:
      '(1) Der Besitz einer Sache wird durch die Erlangung der tatsächlichen Gewalt über die Sache erworben. (2) Die Einigung des bisherigen Besitzers und des Erwerbers genügt zum Erwerb, wenn der Erwerber in der Lage ist, die Gewalt über die Sache auszuüben.',
    explanation: 'Besitz knüpft grundsätzlich an die tatsächliche Sachherrschaft an.',
    mnemonic: '§854 = tatsächliche Gewalt über die Sache.',
    area: 'Zivilrecht',
    nature: 'ANSPRUCH',
    source: 'https://www.gesetze-im-internet.de/bgb/__854.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    securityContext:
      'Für Sicherheitskräfte ist zunächst zu unterscheiden: Wer besitzt die Sache? Wer ist Eigentümer? Wer hat ein Recht zum Besitz? Diese Fragen können unterschiedliche Personen betreffen.',
  },
  {
    id: 'bgb-855',
    law: 'BGB',
    paragraph: '§ 855',
    title: 'Besitzdiener',
    officialText:
      'Übt jemand die tatsächliche Gewalt über eine Sache für einen anderen in dessen Haushalt oder Erwerbsgeschäft oder in einem ähnlichen Verhältnis aus, vermöge dessen er den sich auf die Sache beziehenden Weisungen des anderen Folge zu leisten hat, so ist nur der andere Besitzer.',
    explanation:
      'Der Besitzdiener übt die tatsächliche Gewalt über eine Sache für einen anderen aus und ist dabei dessen Weisungen unterworfen.',
    mnemonic: '§855 = tatsächliche Gewalt für einen anderen.',
    area: 'Zivilrecht',
    nature: 'ANSPRUCH',
    source: 'https://www.gesetze-im-internet.de/bgb/__855.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    securityContext:
      'Ein Mitarbeiter eines Unternehmens kann unter den gesetzlichen Voraussetzungen Besitzdiener sein. Das ist für §860 BGB relevant.',
  },
  {
    id: 'bgb-858',
    law: 'BGB',
    paragraph: '§ 858',
    title: 'Verbotene Eigenmacht',
    officialText:
      '(1) Wer dem Besitzer ohne dessen Willen den Besitz entzieht oder ihn im Besitz stört, handelt, sofern nicht das Gesetz die Entziehung oder die Störung gestattet, widerrechtlich (verbotene Eigenmacht). (2) Der durch verbotene Eigenmacht erlangte Besitz ist fehlerhaft.',
    explanation:
      'Verbotene Eigenmacht liegt insbesondere vor, wenn jemand dem Besitzer ohne dessen Willen den Besitz entzieht oder den Besitz ohne gesetzliche Gestattung stört.',
    mnemonic: '§858 = verbotener Eingriff in fremden Besitz.',
    area: 'Zivilrecht',
    nature: 'ANSPRUCH',
    source: 'https://www.gesetze-im-internet.de/bgb/__858.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    prerequisites: ['Besitz', 'Entzug oder Störung', 'ohne Willen des Besitzers', 'keine gesetzliche Gestattung'],
  },
  {
    id: 'bgb-859',
    law: 'BGB',
    paragraph: '§ 859',
    title: 'Selbsthilfe des Besitzers',
    officialText:
      'Der Besitzer darf sich verbotener Eigenmacht mit Gewalt erwehren. Wird eine bewegliche Sache dem Besitzer mittels verbotener Eigenmacht weggenommen, so darf er sie dem auf frischer Tat betroffenen oder verfolgten Täter mit Gewalt wieder abnehmen. Wird dem Besitzer eines Grundstücks der Besitz durch verbotene Eigenmacht entzogen, so darf er sofort nach der Entziehung sich des Besitzes durch Entsetzung des Täters wieder bemächtigen. Die gleichen Rechte stehen dem Besitzer gegen denjenigen zu, welcher nach §858 Abs. 2 die Fehlerhaftigkeit des Besitzes gegen sich gelten lassen muss.',
    explanation:
      '§859 ist eine unmittelbare Besitzerselbsthilfe. Er ist kein allgemeiner Freibrief zur Gewaltanwendung.',
    mnemonic: '§859 = Besitzer darf sich unmittelbar gegen verbotene Eigenmacht wehren.',
    area: 'Zivilrecht',
    nature: 'BEFUGNIS',
    source: 'https://www.gesetze-im-internet.de/bgb/__859.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    prerequisites: ['Besitz', 'verbotene Eigenmacht', 'unmittelbare Reaktion', 'Gewalt nur zum Schutz des Besitzes'],
    legalConsequence: 'Der Besitzer darf sich verbotener Eigenmacht mit Gewalt erwehren und die Sache wieder abnehmen.',
    distinctions: ['§859 ≠ §861: §859 = was darf ich unmittelbar selbst tun? §861 = was kann ich verlangen?'],
  },
  {
    id: 'bgb-860',
    law: 'BGB',
    paragraph: '§ 860',
    title: 'Selbsthilfe des Besitzdieners',
    officialText:
      'Zur Ausübung der dem Besitzer nach §859 zustehenden Rechte ist auch derjenige befugt, welcher die tatsächliche Gewalt nach §855 für den Besitzer ausübt.',
    explanation:
      'Unter den Voraussetzungen der §§855 und 859 kann der Besitzdiener die entsprechenden Rechte des Besitzers ausüben.',
    mnemonic: '§860 = Besitzdiener darf §859-Rechte ausüben.',
    area: 'Zivilrecht',
    nature: 'BEFUGNIS',
    source: 'https://www.gesetze-im-internet.de/bgb/__860.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    prerequisites: ['Besitzdienerschaft nach §855', 'Rechte des Besitzers nach §859'],
    distinctions: ['§860 ≠ §859: §859 betrifft den Besitzer, §860 den Besitzdiener.'],
    securityContext: '§860 ist keine allgemeine Festnahmebefugnis.',
  },
  {
    id: 'bgb-861',
    law: 'BGB',
    paragraph: '§ 861',
    title: 'Anspruch wegen Besitzentziehung',
    officialText:
      '(1) Wird der Besitz durch verbotene Eigenmacht dem Besitzer entzogen, so kann dieser die Wiedereinräumung des Besitzes von demjenigen verlangen, welcher ihm gegenüber fehlerhaft besitzt. (2) Der Anspruch ist ausgeschlossen, wenn der entzogene Besitz dem gegenwärtigen Besitzer oder dessen Rechtsvorgänger gegenüber fehlerhaft war und in dem letzten Jahre vor der Entziehung erlangt worden ist.',
    explanation:
      'Nach einer Besitzentziehung kann der bisherige Besitzer unter den gesetzlichen Voraussetzungen Wiedereinräumung des Besitzes verlangen.',
    mnemonic: '§861 = Besitz zurückverlangen.',
    area: 'Zivilrecht',
    nature: 'ANSPRUCH',
    source: 'https://www.gesetze-im-internet.de/bgb/__861.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    prerequisites: ['Besitz des Anspruchstellers', 'Entziehung des Besitzes', 'Entziehung durch verbotene Eigenmacht', 'fehlerhafter Besitz des gegenwärtigen Besitzers', 'kein Ausschluss nach §861 Abs. 2'],
    legalConsequence: 'Der Anspruchsteller kann die Wiedereinräumung des Besitzes verlangen.',
    distinctions: ['§861 BGB = Was kann ich verlangen? §859 BGB = Was darf ich unmittelbar selbst tun?'],
  },
  {
    id: 'bgb-862',
    law: 'BGB',
    paragraph: '§ 862',
    title: 'Anspruch wegen Besitzstörung',
    officialText:
      '(1) Wird der Besitzer durch verbotene Eigenmacht im Besitz gestört, so kann er von dem Störer die Beseitigung der Störung verlangen. Sind weitere Störungen zu besorgen, so kann der Besitzer auf Unterlassung klagen. (2) Der Anspruch ist ausgeschlossen, wenn der Besitzer dem Störer oder dessen Rechtsvorgänger gegenüber fehlerhaft besitzt und der Besitz in dem letzten Jahre vor der Störung erlangt worden ist.',
    explanation:
      'Bei einer Besitzstörung kann der Besitzer unter den gesetzlichen Voraussetzungen Beseitigung und bei Wiederholungsgefahr Unterlassung verlangen.',
    mnemonic: '§862 = Besitzstörung → Beseitigung / Unterlassung.',
    area: 'Zivilrecht',
    nature: 'ANSPRUCH',
    source: 'https://www.gesetze-im-internet.de/bgb/__862.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },
  {
    id: 'bgb-903',
    law: 'BGB',
    paragraph: '§ 903',
    title: 'Befugnisse des Eigentümers',
    officialText:
      'Der Eigentümer einer Sache kann, soweit nicht das Gesetz oder Rechte Dritter entgegenstehen, mit der Sache nach Belieben verfahren und andere von jeder Einwirkung ausschließen. Der Eigentümer eines Tieres hat bei der Ausübung seiner Befugnisse die besonderen Vorschriften zum Schutz der Tiere zu beachten.',
    explanation:
      'Der Eigentümer darf grundsätzlich über die Sache verfügen und andere ausschließen, soweit keine gesetzlichen Schranken oder Rechte Dritter entgegenstehen.',
    mnemonic: '§903 = Eigentümerbefugnis.',
    area: 'Zivilrecht',
    nature: 'BEFUGNIS',
    source: 'https://www.gesetze-im-internet.de/bgb/__903.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    distinctions: ['§903 ist kein Herausgabeanspruch; §903 ≠ §985.'],
  },
  {
    id: 'bgb-985',
    law: 'BGB',
    paragraph: '§ 985',
    title: 'Herausgabeanspruch',
    officialText: 'Der Eigentümer kann von dem Besitzer die Herausgabe der Sache verlangen.',
    explanation: 'Der Eigentümer kann grundsätzlich vom Besitzer die Herausgabe der Sache verlangen.',
    mnemonic: '§985 = Eigentümer verlangt Sache vom Besitzer heraus.',
    area: 'Zivilrecht',
    nature: 'ANSPRUCH',
    source: 'https://www.gesetze-im-internet.de/bgb/__985.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    prerequisites: ['Eigentum des Anspruchstellers', 'Besitz des Anspruchsgegners', 'kein Recht zum Besitz nach §986'],
    legalConsequence: 'Anspruch auf Herausgabe der Sache.',
    distinctions: ['§985 = Anspruch; §985 ≠ §986. §985 beantwortet nicht, ob ich die Sache selbst mit Gewalt zurücknehmen darf.'],
  },
  {
    id: 'bgb-986',
    law: 'BGB',
    paragraph: '§ 986',
    title: 'Einwendungen des Besitzers',
    officialText:
      '(1) Der Besitzer kann die Herausgabe der Sache verweigern, wenn er oder der mittelbare Besitzer, von dem er sein Recht zum Besitz ableitet, dem Eigentümer gegenüber zum Besitz berechtigt ist. (2) Der Besitzer einer Sache, die nach § 931 durch Abtretung des Anspruchs auf Herausgabe veräußert worden ist, kann dem neuen Eigentümer die Einwendungen entgegensetzen, welche ihm gegen den abgetretenen Anspruch zustehen.',
    explanation: 'Der Besitzer kann dem Herausgabeanspruch insbesondere entgegenhalten, dass ihm ein Recht zum Besitz zusteht.',
    mnemonic: '§985 fragt: Herausgabe? §986 fragt: Darf der Besitzer die Sache behalten?',
    area: 'Zivilrecht',
    nature: 'ANSPRUCH',
    source: 'https://www.gesetze-im-internet.de/bgb/__986.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },
  {
    id: 'bgb-1004',
    law: 'BGB',
    paragraph: '§ 1004',
    title: 'Beseitigungs- und Unterlassungsanspruch',
    officialText:
      '(1) Wird das Eigentum in anderer Weise als durch Entziehung oder Vorenthaltung des Besitzes beeinträchtigt, so kann der Eigentümer von dem Störer die Beseitigung der Beeinträchtigung verlangen. Sind weitere Beeinträchtigungen zu besorgen, so kann der Eigentümer auf Unterlassung klagen. (2) Der Anspruch ist ausgeschlossen, wenn der Eigentümer zur Duldung verpflichtet ist.',
    explanation:
      'Bei einer Eigentumsbeeinträchtigung können unter den gesetzlichen Voraussetzungen Beseitigung und bei Wiederholungsgefahr Unterlassung verlangt werden.',
    mnemonic: '§1004 = Eigentumsstörung → Beseitigung / Unterlassung.',
    area: 'Zivilrecht',
    nature: 'ANSPRUCH',
    source: 'https://www.gesetze-im-internet.de/bgb/__1004.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },

  // ---------------------------------------------------------------------------
  // TEIL 2 – BGB: NOTWEHR, NOTSTAND, SELBSTHILFE
  // ---------------------------------------------------------------------------
  {
    id: 'bgb-227',
    law: 'BGB',
    paragraph: '§ 227',
    title: 'Notwehr',
    officialText:
      '(1) Eine durch Notwehr gebotene Handlung ist nicht widerrechtlich. (2) Notwehr ist diejenige Verteidigung, welche erforderlich ist, um einen gegenwärtigen rechtswidrigen Angriff von sich oder einem anderen abzuwenden.',
    explanation:
      '§227 BGB enthält die zivilrechtliche Notwehrregelung. Sie ist von §32 StGB (strafrechtliche Notwehr) zu unterscheiden.',
    mnemonic: '§227 BGB = zivilrechtliche Notwehr.',
    area: 'Zivilrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/bgb/__227.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    distinctions: ['§227 BGB = zivilrechtliche Notwehr; §32 StGB = strafrechtliche Notwehr.'],
  },
  {
    id: 'bgb-228',
    law: 'BGB',
    paragraph: '§ 228',
    title: 'Defensiver Notstand',
    officialText:
      'Wer eine fremde Sache beschädigt oder zerstört, um eine durch sie drohende Gefahr von sich oder einem anderen abzuwenden, handelt nicht widerrechtlich, wenn die Beschädigung oder die Zerstörung zur Abwendung der Gefahr erforderlich ist und der Schaden nicht außer Verhältnis zu der Gefahr steht. Hat der Handelnde die Gefahr verschuldet, so ist er zum Schadensersatz verpflichtet.',
    explanation: 'Bei §228 geht die Gefahr von der Sache aus.',
    mnemonic: '§228 = Gefahr geht von der Sache aus.',
    area: 'Zivilrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/bgb/__228.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    distinctions: ['§228 = Gefahr geht von der Sache aus; §904 = Einwirkung auf fremde Sache zur Gefahrenabwehr.'],
  },
  {
    id: 'bgb-229',
    law: 'BGB',
    paragraph: '§ 229',
    title: 'Selbsthilfe',
    officialText:
      'Wer zum Zwecke der Selbsthilfe eine Sache wegnimmt, zerstört oder beschädigt oder wer zum Zwecke der Selbsthilfe einen Verpflichteten, welcher der Flucht verdächtig ist, festnimmt oder den Widerstand des Verpflichteten gegen eine Handlung, die dieser zu dulden verpflichtet ist, beseitigt, handelt nicht widerrechtlich, wenn obrigkeitliche Hilfe nicht rechtzeitig zu erlangen ist und ohne sofortiges Eingreifen die Gefahr besteht, dass die Verwirklichung des Anspruchs vereitelt oder wesentlich erschwert werde.',
    explanation:
      '§229 BGB ist eine besondere zivilrechtliche Selbsthilferegelung. Voraussetzungen: Anspruch, obrigkeitliche Hilfe nicht rechtzeitig erreichbar, Gefahr der Vereitelung oder wesentlichen Erschwerung, sofortiges Eingreifen.',
    mnemonic: '§229 = Anspruch sichern, wenn staatliche Hilfe nicht rechtzeitig erreichbar ist.',
    area: 'Zivilrecht',
    nature: 'BEFUGNIS',
    source: 'https://www.gesetze-im-internet.de/bgb/__229.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    prerequisites: ['bestehender Anspruch', 'obrigkeitliche Hilfe nicht rechtzeitig erreichbar', 'Gefahr der Vereitelung oder wesentlichen Erschwerung', 'sofortiges Eingreifen'],
    distinctions: ['§229 BGB = zivilrechtliche Selbsthilfe; §127 StPO = strafprozessuale vorläufige Festnahme.'],
  },
  {
    id: 'bgb-230',
    law: 'BGB',
    paragraph: '§ 230',
    title: 'Grenzen der Selbsthilfe',
    officialText:
      '(1) Die Selbsthilfe darf nicht weiter gehen, als zur Abwendung der Gefahr erforderlich ist. (2) Im Falle der Wegnahme von Sachen ist, sofern nicht Zwangsvollstreckung erwirkt wird, der dingliche Arrest zu beantragen. (3) Im Falle der Festnahme des Verpflichteten ist, sofern er nicht wieder in Freiheit gesetzt wird, der persönliche Sicherheitsarrest bei dem Amtsgericht zu beantragen, in dessen Bezirk die Festnahme erfolgt ist; der Verpflichtete ist unverzüglich dem Gericht vorzuführen. (4) Wird der Arrestantrag verzögert oder abgelehnt, so hat die Rückgabe der weggenommenen Sachen und die Freilassung des Festgenommenen unverzüglich zu erfolgen.',
    explanation: '§230 begrenzt die Selbsthilfe nach §229 auf das zur Abwendung der Gefahr erforderliche Maß.',
    mnemonic: '§229 erlaubt Selbsthilfe – §230 begrenzt sie.',
    area: 'Zivilrecht',
    nature: 'BEFUGNIS',
    source: 'https://www.gesetze-im-internet.de/bgb/__230.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
  },
  {
    id: 'bgb-231',
    law: 'BGB',
    paragraph: '§ 231',
    title: 'Irrtümliche Selbsthilfe',
    officialText:
      'Wer eine der in § 229 bezeichneten Handlungen in der irrigen Annahme vornimmt, dass die für den Ausschluss der Widerrechtlichkeit erforderlichen Voraussetzungen vorhanden seien, ist dem anderen Teil zum Schadensersatz verpflichtet, auch wenn der Irrtum nicht auf Fahrlässigkeit beruht.',
    explanation:
      '§231 regelt die Folgen einer Selbsthilfe, wenn sich die Voraussetzungen später als nicht gegeben herausstellen.',
    mnemonic: '§231 = irrtümliche Selbsthilfe → Schadensersatz.',
    area: 'Zivilrecht',
    nature: 'BEFUGNIS',
    source: 'https://www.gesetze-im-internet.de/bgb/__231.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    securityContext:
      'Eine Sicherheitskraft darf nicht einfach davon ausgehen, dass eine Selbsthilfebefugnis besteht. Die Voraussetzungen müssen vor dem Eingriff geprüft werden.',
  },
  {
    id: 'bgb-904',
    law: 'BGB',
    paragraph: '§ 904',
    title: 'Aggressiver Notstand',
    officialText:
      'Der Eigentümer einer Sache ist nicht berechtigt, die Einwirkung eines anderen auf die Sache zu verbieten, wenn die Einwirkung zur Abwendung einer gegenwärtigen Gefahr notwendig und der drohende Schaden gegenüber dem aus der Einwirkung dem Eigentümer entstehenden Schaden unverhältnismäßig groß ist. Der Eigentümer kann Ersatz des ihm entstehenden Schadens verlangen.',
    explanation: 'Hier wird auf eine fremde Sache eingewirkt, um eine gegenwärtige Gefahr abzuwenden.',
    mnemonic: '§904 = fremde Sache benutzen, um größere gegenwärtige Gefahr abzuwenden.',
    area: 'Zivilrecht',
    nature: 'RECHTFERTIGUNG',
    source: 'https://www.gesetze-im-internet.de/bgb/__904.html',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    distinctions: ['§904 ≠ §228: bei §228 geht die Gefahr von der Sache aus, bei §904 wird auf eine fremde Sache eingewirkt.'],
  },
  {
    id: 'bgb-823',
    law: 'BGB',
    paragraph: '§ 823',
    title: 'Schadensersatzpflicht',
    officialText: '',
    explanation:
      '§823 BGB ist ein Schadensersatzanspruch (Anspruch, keine Befugnis). Die Bibel nennt §823 BGB nur als Beispiel für einen Anspruch (Kapitel 2.1 / 73); ein eigener Normabschnitt mit amtlichem Wortlaut ist in der Knowledge Base nicht vorhanden.',
    mnemonic: '§823 = Schadensersatzanspruch (Anspruch, keine Eingriffsbefugnis).',
    area: 'Zivilrecht',
    nature: 'ANSPRUCH',
    source: 'https://www.gesetze-im-internet.de/bgb/__823.html',
    verificationStatus: 'MISSING',
    distinctions: ['Anspruch ≠ Befugnis: §823 BGB begründet kein unmittelbares Eingriffsrecht.'],
  },
];
