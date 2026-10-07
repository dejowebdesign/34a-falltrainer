import { AuthorityMatrixRow, LearningTopic, TopicFamily } from '../models';

/**
 * Lernseite „Jedermannsrechte“ – welche Rechte und Rechtfertigungs-/
 * Entschuldigungsgründe stehen Privatpersonen unter gesetzlichen
 * Voraussetzungen zu?
 *
 * Bewusste Reduktion: keine allgemeine Polizeirechts- oder StPO-Seite. Behandelt
 * werden nur die für die Sachkunde §34a GewO relevanten Jedermannsrechte:
 * §127 Abs. 1 StPO sowie die Notwehr-/Notstandsvorschriften der §§32–35 StGB.
 *
 * Bewusst NICHT enthalten: Täterschaft und Teilnahme (§§25–27 StGB),
 * §§113–115 StGB sowie allgemeine StPO-Themen (Durchsuchung, Beschlagnahme,
 * Sicherstellung, Vernehmung, Polizeirecht).
 *
 * Quellenregel: Der amtliche Wortlaut stammt aus der Bibel V5.3.1. Es wird
 * nichts erfunden; fehlende Angaben werden als fehlend markiert.
 */

/** Lernfamilien der Jedermannsrechte-Seite. */
export const JEDERMANNSRECHTE_FAMILIES: TopicFamily[] = [
  {
    id: 'festnahme',
    label: 'Vorläufige Festnahme',
    description:
      'Die zentrale Jedermann-Befugnis: §127 Abs. 1 StPO – unter engen Voraussetzungen, keine allgemeine Polizeibefugnis.',
  },
  {
    id: 'notwehr',
    label: 'Notwehr',
    description: 'Verteidigung gegen einen gegenwärtigen rechtswidrigen Angriff – und ihre Grenzen.',
  },
  {
    id: 'notstand',
    label: 'Notstand',
    description:
      'Rechtfertigender und entschuldigender Notstand – Rechtfertigung (§34) und Entschuldigung (§35) klar getrennt.',
  },
];

/**
 * Vergleichsmatrix „Welches Recht könnte greifen?“. Didaktisch gedacht, nicht
 * als automatische Entscheidungsmaschine – die Auswahl ersetzt die Prüfung des
 * Einzelfalls nicht.
 */
export const AUTHORITY_MATRIX: AuthorityMatrixRow[] = [
  {
    situation: 'Angriff',
    legalBasis: '§ 32 StGB',
    normId: 'stgb-32',
    coreRequirement: 'gegenwärtiger rechtswidriger Angriff',
    purpose: 'Erforderliche Verteidigung (Notwehr/Nothilfe)',
  },
  {
    situation: 'Gefahr',
    legalBasis: '§ 34 StGB',
    normId: 'stgb-34',
    coreRequirement: 'gegenwärtige, nicht anders abwendbare Gefahr',
    purpose: 'Gefahrenabwehr mit Interessenabwägung (Rechtfertigung)',
  },
  {
    situation: 'Ausnahmesituation',
    legalBasis: '§ 35 StGB',
    normId: 'stgb-35',
    coreRequirement: 'Gefahr für Leben, Leib oder Freiheit; nahestehende Person',
    purpose: 'Schuldentfall (Entschuldigung) – keine Rechtfertigung',
  },
  {
    situation: 'Frische Straftat',
    legalBasis: '§ 127 Abs. 1 StPO',
    normId: 'stpo-127',
    coreRequirement: 'auf frischer Tat betroffen/verfolgt + Fluchtverdacht oder Identität nicht feststellbar',
    purpose: 'Vorläufige Festnahme (Jedermann-Befugnis)',
  },
  {
    situation: 'Besitzentziehung / verbotene Eigenmacht',
    legalBasis: '§ 859 BGB (i. V. m. § 858 BGB)',
    normId: 'bgb-859',
    coreRequirement: 'verbotene Eigenmacht gegen bestehenden Besitz',
    purpose: 'Unmittelbare Besitzerselbsthilfe (zivilrechtlich)',
  },
];

/**
 * Jedermannsrechte-Lernkarten. Reihenfolge: Festnahme zuerst (zentrale Karte),
 * dann Notwehr, dann Notstand.
 */
export const JEDERMANNSRECHTE_TOPICS: LearningTopic[] = [
  {
    id: 'stpo-127',
    law: 'StPO',
    paragraph: '§ 127',
    absatz: 'Abs. 1',
    officialTitle: 'Vorläufige Festnahme',
    area: 'Strafprozessrecht',
    nature: 'BEFUGNIS',
    familyId: 'festnahme',
    relevance: 'CORE_34A',
    relevanceReason:
      'Zentrale Jedermann-Befugnis für die Sachkunde: §127 Abs. 1 StPO erlaubt jedermann unter engen Voraussetzungen die vorläufige Festnahme.',
    examRelevance:
      'Prüfungsrelevant sind die Voraussetzungen (frische Tat + Fluchtverdacht oder Identität nicht sofort feststellbar), die Übergabe an die Polizei und die Grenzen der Maßnahme.',
    summary:
      'Wer auf frischer Tat betroffen oder verfolgt wird, darf unter engen Voraussetzungen von jedermann vorläufig festgenommen werden.',
    shortExplanation:
      '§127 Abs. 1 StPO ist eine gesetzliche Jedermann-Befugnis. Wer jemanden auf frischer Tat betrifft oder verfolgt, darf ihn vorläufig festnehmen, wenn Fluchtverdacht besteht oder die Identität nicht sofort feststellbar ist. Die weitere Behandlung erfolgt durch die Polizei.',
    purpose:
      'Die Norm ermöglicht es auch Privatpersonen – etwa Sicherheitskräften –, eine flüchtige Person bis zum Eintreffen der Polizei festzuhalten. Sie ist keine allgemeine polizeiliche Befugnis und kein allgemeiner Anspruch.',
    prerequisites: [
      { label: 'Person auf frischer Tat betroffen ODER auf frischer Tat verfolgt' },
      { label: 'Fluchtverdacht ODER Identität nicht sofort feststellbar' },
      { label: 'Übergabe an die Polizei' },
    ],
    whoActs:
      'Jedermann – also auch die Sicherheitskraft. Nicht auf die Polizei beschränkt, aber auch nicht auf sie erstreckt.',
    againstWhom: 'Gegen die auf frischer Tat betroffene oder verfolgte Person.',
    limits: [
      'Keine allgemeine polizeiliche Befugnis – §127 Abs. 1 StPO macht eine Sicherheitskraft nicht zur Polizei.',
      'Nicht jeder Verdacht rechtfertigt automatisch eine Festnahme.',
      'Die Durchführung ist auf das erforderliche Maß zu begrenzen (Verhältnismäßigkeit).',
      'Die weitere strafprozessuale Behandlung erfolgt durch die zuständigen staatlichen Stellen.',
    ],
    examHint:
      'Prüfungslogik: (betroffen ODER verfolgt auf frischer Tat) UND (Fluchtverdacht ODER Identität nicht sofort feststellbar). Bloßer Verdacht genügt nicht.',
    typicalSituation:
      'Ein Ladendieb wird auf frischer Tat betroffen und ist der Flucht verdächtig – jedermann darf ihn vorläufig festnehmen und der Polizei übergeben.',
    distinctions: [
      { label: '§ 229 BGB – Selbsthilfe', detail: '§127 StPO ist strafprozessuale vorläufige Festnahme; §229 BGB zivilrechtliche Selbsthilfe.' },
      { label: '§ 859 BGB – Selbsthilfe des Besitzers', detail: '§859 schützt den Besitz; §127 StPO verfolgt die frische Straftat.' },
    ],
    officialText:
      '(1) Wird jemand auf frischer Tat betroffen oder verfolgt, so ist, wenn er der Flucht verdächtig ist oder seine Identität nicht sofort festgestellt werden kann, jedermann befugt, ihn auch ohne richterliche Anordnung vorläufig festzunehmen. Die Feststellung der Identität einer Person durch die Staatsanwaltschaft oder die Beamten des Polizeidienstes bestimmt sich nach § 163b Abs. 1. (2) Die Staatsanwaltschaft und die Beamten des Polizeidienstes sind bei Gefahr im Verzug auch dann zur vorläufigen Festnahme befugt, wenn die Voraussetzungen eines Haftbefehls oder eines Unterbringungsbefehls vorliegen. (3) Ist eine Straftat nur auf Antrag verfolgbar, so ist die vorläufige Festnahme auch dann zulässig, wenn ein Antrag noch nicht gestellt ist. (4) Für die vorläufige Festnahme durch die Staatsanwaltschaft und die Beamten des Polizeidienstes gelten die §§ 114a bis 114c entsprechend.',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    sourceUrl: 'https://www.gesetze-im-internet.de/stpo/__127.html',
  },
  {
    id: 'stgb-32',
    law: 'StGB',
    paragraph: '§ 32',
    officialTitle: 'Notwehr',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    familyId: 'notwehr',
    relevance: 'CORE_34A',
    relevanceReason:
      'Ausdrücklich für die Sachkunde genannt: Notwehr und Nothilfe rechtfertigen die erforderliche Verteidigung.',
    examRelevance:
      'Prüfungsrelevant sind gegenwärtiger rechtswidriger Angriff, Verteidigung (Notwehr/Nothilfe) und Erforderlichkeit. Die Norm rechtfertigt die Handlung.',
    summary:
      'Wer einen gegenwärtigen rechtswidrigen Angriff erforderlich abwehrt, handelt nicht rechtswidrig.',
    shortExplanation:
      '§32 StGB rechtfertigt die Verteidigung gegen einen gegenwärtigen rechtswidrigen Angriff. Verteidigt man sich selbst, ist es Notwehr; verteidigt man einen anderen, ist es Nothilfe. Die Verteidigung muss erforderlich sein.',
    purpose:
      'Die Norm rechtfertigt die Abwehr eines Angriffs. Sie macht die Verteidigungshandlung ausnahmsweise nicht rechtswidrig.',
    prerequisites: [
      { label: 'Angriff' },
      { label: 'Gegenwärtigkeit des Angriffs' },
      { label: 'Rechtswidrigkeit des Angriffs' },
      { label: 'Verteidigung (Notwehr/Nothilfe)' },
      { label: 'Erforderlichkeit der Verteidigung' },
    ],
    whoActs: 'Der Angegriffene (Notwehr) oder ein Dritter (Nothilfe).',
    againstWhom: 'Gegen den Angreifer.',
    limits: [
      'Nur gegen einen gegenwärtigen, rechtswidrigen Angriff.',
      'Die Verteidigung muss erforderlich sein.',
      'Rechtfertigung (§32) ist von Entschuldigung (§33) zu trennen.',
    ],
    examHint:
      'Prüfungsschema: Angriff – Gegenwärtigkeit – Rechtswidrigkeit – Verteidigung – Erforderlichkeit. §32 rechtfertigt, §33 kann entschuldigen.',
    typicalSituation:
      'Ein Sicherheitsmitarbeiter wird tätlich angegriffen und wehrt den Angriff erforderlich ab – gerechtfertigt nach §32 StGB.',
    distinctions: [
      { label: '§ 33 StGB – Überschreitung der Notwehr', detail: '§32 rechtfertigt; §33 kann entschuldigen.' },
      { label: '§ 227 BGB – Notwehr', detail: '§32 StGB = strafrechtliche Notwehr; §227 BGB = zivilrechtliche Notwehr.' },
    ],
    officialText:
      '(1) Wer eine Tat begeht, die durch Notwehr geboten ist, handelt nicht rechtswidrig. (2) Notwehr ist die Verteidigung, die erforderlich ist, um einen gegenwärtigen rechtswidrigen Angriff von sich oder einem anderen abzuwenden.',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__32.html',
  },
  {
    id: 'stgb-33',
    law: 'StGB',
    paragraph: '§ 33',
    officialTitle: 'Überschreitung der Notwehr',
    area: 'Strafrecht',
    nature: 'ENTSCHULDIGUNG',
    familyId: 'notwehr',
    relevance: 'CORE_34A',
    relevanceReason:
      'Für die Sachkunde genannt: Grundzüge der Notwehrüberschreitung, klar von §32 getrennt.',
    examRelevance:
      'Prüfungsrelevant ist die Abgrenzung: §33 ist keine Rechtfertigung, sondern eine Entschuldigungsregelung bei Überschreitung der Notwehrgrenzen aus Verwirrung, Furcht oder Schrecken.',
    summary:
      'Überschreitet der Täter die Grenzen der Notwehr aus Verwirrung, Furcht oder Schrecken, wird er nicht bestraft.',
    shortExplanation:
      '§33 StGB betrifft die Überschreitung der Notwehrgrenzen aus Verwirrung, Furcht oder Schrecken. Anders als §32 rechtfertigt die Norm die Tat nicht, sondern lässt die Schuld entfallen.',
    purpose:
      'Die Norm mildert die Folgen einer Notwehrüberschreitung, wenn der Täter aus einem der genannten Affekte über das Erforderliche hinausgeht.',
    prerequisites: [
      { label: 'eine Notwehrlage' },
      { label: 'Überschreitung der Grenzen der Notwehr' },
      { label: 'aus Verwirrung, Furcht oder Schrecken' },
    ],
    whoActs: 'Der Verteidiger, der die Notwehrgrenzen überschreitet.',
    againstWhom: 'Gegen den Angreifer.',
    limits: [
      'Nur bei Verwirrung, Furcht oder Schrecken – nicht bei beliebiger Überschreitung.',
      'Keine Rechtfertigung: Die Tat bleibt rechtswidrig, nur die Schuld entfällt.',
    ],
    examHint:
      'Kernaussage: §32 rechtfertigt – §33 kann entschuldigen. Rechtfertigung und Entschuldigung dürfen nicht vermischt werden.',
    typicalSituation:
      'Ein Sicherheitsmitarbeiter geht in einem Schreckmoment über das erforderliche Maß der Verteidigung hinaus.',
    distinctions: [
      { label: '§ 32 StGB – Notwehr', detail: '§32 rechtfertigt die erforderliche Verteidigung; §33 betrifft deren Überschreitung.' },
      { label: '§ 35 StGB – Entschuldigender Notstand', detail: 'Beide sind Entschuldigungsregelungen, betreffen aber unterschiedliche Lagen.' },
    ],
    officialText:
      'Überschreitet der Täter die Grenzen der Notwehr aus Verwirrung, Furcht oder Schrecken, so wird er nicht bestraft.',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__33.html',
  },
  {
    id: 'stgb-34',
    law: 'StGB',
    paragraph: '§ 34',
    officialTitle: 'Rechtfertigender Notstand',
    area: 'Strafrecht',
    nature: 'RECHTFERTIGUNG',
    familyId: 'notstand',
    relevance: 'CORE_34A',
    relevanceReason:
      'Ausdrücklich für die Sachkunde genannt: rechtfertigender Notstand mit Interessenabwägung.',
    examRelevance:
      'Prüfungsrelevant sind gegenwärtige, nicht anders abwendbare Gefahr, Gefahr für ein Rechtsgut, Handlung zur Gefahrenabwehr, Interessenabwägung mit wesentlichem Überwiegen und Angemessenheit des Mittels.',
    summary:
      'Wer in einer gegenwärtigen, nicht anders abwendbaren Gefahr eine Tat zur Gefahrenabwehr begeht, handelt nicht rechtswidrig, wenn das geschützte Interesse wesentlich überwiegt.',
    shortExplanation:
      '§34 StGB rechtfertigt eine Handlung zur Abwendung einer gegenwärtigen, nicht anders abwendbaren Gefahr. Voraussetzung ist, dass das geschützte Interesse das beeinträchtigte wesentlich überwiegt und die Tat ein angemessenes Mittel ist.',
    purpose:
      'Die Norm erlaubt den Eingriff in ein Rechtsgut, um ein überwiegendes Interesse zu schützen – als Rechtfertigung, nicht als Entschuldigung.',
    prerequisites: [
      { label: 'gegenwärtige Gefahr' },
      { label: 'Gefahr für ein geschütztes Rechtsgut' },
      { label: 'nicht anders abwendbare Gefahr' },
      { label: 'Handlung zur Gefahrenabwehr' },
      { label: 'Interessenabwägung mit wesentlichem Überwiegen' },
      { label: 'Angemessenheit des Mittels' },
    ],
    whoActs: 'Der Handelnde, der die Gefahr von sich oder einem anderen abwendet.',
    againstWhom: 'Gegen das beeinträchtigte Rechtsgut bzw. dessen Inhaber.',
    limits: [
      'Nur bei gegenwärtiger, nicht anders abwendbarer Gefahr.',
      'Das geschützte Interesse muss wesentlich überwiegen.',
      'Die Tat muss ein angemessenes Mittel sein.',
      '§34 rechtfertigt – §35 entschuldigt. Nicht vermischen.',
    ],
    examHint:
      'Prüfungspunkte: gegenwärtige Gefahr – Rechtsgut – nicht anders abwendbar – Gefahrenabwehr – Interessenabwägung – Angemessenheit. Kein Automatismus: Gefahr ≠ automatisch §34.',
    typicalSituation:
      'Zur Abwendung einer gegenwärtigen Gefahr für Personen wird in ein geringeres Rechtsgut eingegriffen.',
    distinctions: [
      { label: '§ 35 StGB – Entschuldigender Notstand', detail: '§34 = Rechtfertigung; §35 = Entschuldigung.' },
      { label: '§ 32 StGB – Notwehr', detail: 'Notwehr reagiert auf einen Angriff; §34 auf eine Gefahr.' },
    ],
    officialText:
      'Wer in einer gegenwärtigen, nicht anders abwendbaren Gefahr für Leben, Leib, Freiheit, Ehre, Eigentum oder ein anderes Rechtsgut eine Tat begeht, um die Gefahr von sich oder einem anderen abzuwenden, handelt nicht rechtswidrig, wenn bei Abwägung der widerstreitenden Interessen, namentlich der betroffenen Rechtsgüter und des Grades der ihnen drohenden Gefahren, das geschützte Interesse das beeinträchtigte wesentlich überwiegt. Dies gilt jedoch nur, soweit die Tat ein angemessenes Mittel ist, die Gefahr abzuwenden.',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__34.html',
  },
  {
    id: 'stgb-35',
    law: 'StGB',
    paragraph: '§ 35',
    officialTitle: 'Entschuldigender Notstand',
    area: 'Strafrecht',
    nature: 'ENTSCHULDIGUNG',
    familyId: 'notstand',
    relevance: 'CORE_34A',
    relevanceReason:
      'Für die Sachkunde genannt: entschuldigender Notstand, klar vom rechtfertigenden Notstand (§34) getrennt.',
    examRelevance:
      'Prüfungsrelevant ist die Abgrenzung: §35 führt nicht zur Rechtfertigung, sondern kann die Schuld entfallen lassen. Geschützt sind Leben, Leib und Freiheit nahestehender Personen.',
    summary:
      'Wer in einer gegenwärtigen, nicht anders abwendbaren Gefahr für Leben, Leib oder Freiheit eine rechtswidrige Tat begeht, handelt ohne Schuld.',
    shortExplanation:
      '§35 StGB betrifft den entschuldigenden Notstand. Im Unterschied zu §34 führt die Vorschrift nicht zur Rechtfertigung, sondern kann die Schuld entfallen lassen. Geschützt sind Leben, Leib und Freiheit.',
    purpose:
      'Die Norm entschuldigt den Täter, der sich oder eine nahestehende Person aus einer Gefahr für Leben, Leib oder Freiheit rettet.',
    prerequisites: [
      { label: 'gegenwärtige, nicht anders abwendbare Gefahr' },
      { label: 'Gefahr für Leben, Leib oder Freiheit' },
      { label: 'Gefahr für sich, einen Angehörigen oder eine nahestehende Person' },
    ],
    whoActs: 'Der Täter, der die Gefahr von sich oder einer nahestehenden Person abwendet.',
    againstWhom: 'Gegen das beeinträchtigte Rechtsgut.',
    limits: [
      'Nicht, soweit dem Täter die Hinnahme der Gefahr zumutbar war.',
      'Keine Rechtfertigung: Die Tat bleibt rechtswidrig, nur die Schuld entfällt.',
      'Geschützt sind nur Leben, Leib und Freiheit nahestehender Personen.',
    ],
    examHint:
      'Kernaussage: §34 = Rechtfertigung. §35 = Entschuldigung. Rechtfertigung und Entschuldigung niemals vermischen.',
    typicalSituation:
      'Jemand begeht eine rechtswidrige Tat, um eine nahestehende Person aus einer Gefahr für Leib und Leben zu retten.',
    distinctions: [
      { label: '§ 34 StGB – Rechtfertigender Notstand', detail: '§34 rechtfertigt; §35 entschuldigt.' },
      { label: '§ 33 StGB – Überschreitung der Notwehr', detail: 'Beide sind Entschuldigungsregelungen, betreffen aber unterschiedliche Lagen.' },
    ],
    officialText:
      '(1) Wer in einer gegenwärtigen, nicht anders abwendbaren Gefahr für Leben, Leib oder Freiheit eine rechtswidrige Tat begeht, um die Gefahr von sich, einem Angehörigen oder einer anderen ihm nahestehenden Person abzuwenden, handelt ohne Schuld. Dies gilt nicht, soweit dem Täter nach den Umständen, namentlich weil er die Gefahr selbst verursacht hat oder weil er in einem besonderen Rechtsverhältnis stand, zugemutet werden konnte, die Gefahr hinzunehmen; jedoch kann die Strafe nach § 49 Abs. 1 gemildert werden, wenn der Täter nicht mit Rücksicht auf ein besonderes Rechtsverhältnis die Gefahr hinzunehmen hatte. (2) Nimmt der Täter bei Begehung der Tat irrig Umstände an, welche ihn nach Absatz 1 entschuldigen würden, so wird er nur dann bestraft, wenn er den Irrtum vermeiden konnte. Die Strafe ist nach § 49 Abs. 1 zu mildern.',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    sourceUrl: 'https://www.gesetze-im-internet.de/stgb/__35.html',
  },
];

/**
 * Unmittelbar zugehörige BGB-Normen, auf die die Jedermannsrechte-Seite
 * verweist. Sie werden NICHT mit eigener Volltext-Erklärung dupliziert; die
 * BGB-Seite liefert die zivilrechtliche Einordnung, diese Seite die praktische
 * Frage „Darf ich eingreifen?“.
 */
export const JEDERMANNSRECHTE_BGB_LINKS: { normId: string; label: string }[] = [
  { normId: 'bgb-227', label: '§ 227 BGB – Notwehr' },
  { normId: 'bgb-228', label: '§ 228 BGB – Notstand' },
  { normId: 'bgb-229', label: '§ 229 BGB – Selbsthilfe' },
  { normId: 'bgb-859', label: '§ 859 BGB – Selbsthilfe des Besitzers' },
  { normId: 'bgb-904', label: '§ 904 BGB – Notstand' },
];
