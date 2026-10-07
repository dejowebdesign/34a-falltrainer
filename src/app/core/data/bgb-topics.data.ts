import { CoreCategory, LearningTopic, TopicFamily } from '../models';

/**
 * Lernseite „Bürgerliches Gesetzbuch“ – ausschließlich sachkunderelevante
 * BGB-Inhalte für die Sachkundeprüfung §34a GewO.
 *
 * Bewusste Reduktion: Diese Seite ist keine BGB-Datenbank. Aufgenommen sind nur
 * Normen, die die Bibel V5.3.1 ausdrücklich für die Sachkunde nennt bzw. die
 * für das Verständnis eines genannten Kernthemas unmittelbar erforderlich sind.
 *
 * Nicht als eigenständige Lernkarten enthalten (nur allgemeines Zivilrecht,
 * kein unmittelbarer Sachkunde-Stoff): §812, §828, §833, §855, §860, §861,
 * §862, §985, §986, §1004 BGB. Verwiesen wird nur, wo eine Abgrenzung
 * unmittelbar zum Verständnis nötig ist.
 *
 * Quellenregel: Der amtliche Wortlaut stammt aus der Bibel V5.3.1. Wo die Bibel
 * keinen Wortlaut enthält (z. B. §226 BGB), bleibt `officialText` leer und
 * `verificationStatus` ist 'MISSING' – es wird nichts erfunden.
 */

const BIBEL_URL = 'https://www.gesetze-im-internet.de/bgb/';

/** Lernfamilien der BGB-Seite (didaktische Gruppen, keine juristische Kategorie). */
export const BGB_FAMILIES: TopicFamily[] = [
  {
    id: 'eigentum-besitz',
    label: 'Eigentum und Besitz',
    description:
      'Eigentum und Besitz sind zu unterscheiden: Wem gehört die Sache, und wer hat die tatsächliche Sachherrschaft?',
  },
  {
    id: 'selbsthilfe',
    label: 'Selbsthilfe',
    description: 'Welche gesetzliche Selbsthilfemöglichkeit besteht – und unter welchen Grenzen?',
  },
  {
    id: 'notwehr-notstand',
    label: 'Notwehr / Notstand',
    description: 'Rechtfertigungsgründe des BGB: Wann ist eine Handlung ausnahmsweise nicht widerrechtlich?',
  },
  {
    id: 'schadensersatz',
    label: 'Schadensersatz',
    description: 'Ansprüche aus unerlaubter Handlung – Abgrenzung zur Eingriffsbefugnis.',
  },
  {
    id: 'schikaneverbot',
    label: 'Schikaneverbot',
    description: 'Grenze der Rechtsausübung: Ausübung nur zum Zweck der Schädigung.',
  },
];

/**
 * Die vier Kernkategorien der Bibel als Merkkarte. Werden identisch auch auf der
 * Jedermannsrechte-Seite verwendet, damit die Systematik nicht auseinanderläuft.
 */
export const CORE_CATEGORIES: CoreCategory[] = [
  {
    key: 'ANSPRUCH',
    label: 'Anspruch',
    question: 'Was kann ich verlangen?',
  },
  {
    key: 'BEFUGNIS',
    label: 'Befugnis',
    question: 'Was darf ich selbst tun?',
  },
  {
    key: 'RECHTFERTIGUNG',
    label: 'Rechtfertigung',
    question: 'Warum ist eine Handlung ausnahmsweise nicht rechtswidrig?',
  },
  {
    key: 'ENTSCHULDIGUNG',
    label: 'Entschuldigung',
    question:
      'Warum entfällt trotz Rechtswidrigkeit unter bestimmten Voraussetzungen die Schuld?',
  },
];

/**
 * BGB-Lernkarten. Reihenfolge folgt der didaktischen Struktur
 * (Eigentum/Besitz → Selbsthilfe → Notwehr/Notstand → Schadensersatz → Schikane).
 */
export const BGB_TOPICS: LearningTopic[] = [
  {
    id: 'bgb-854',
    law: 'BGB',
    paragraph: '§ 854',
    officialTitle: 'Erwerb des Besitzes',
    area: 'Zivilrecht',
    nature: 'GRUNDLAGE',
    familyId: 'eigentum-besitz',
    relevance: 'CORE_34A',
    relevanceReason:
      'Ausdrücklich für die Sachkunde genannt: Besitz knüpft an die tatsächliche Sachherrschaft an und ist Grundlage jeder Besitzschutzprüfung.',
    examRelevance:
      'Besitz ist von Eigentum zu unterscheiden. Wer die tatsächliche Gewalt über eine Sache hat, ist Besitzer – unabhängig davon, wem die Sache gehört.',
    summary:
      'Besitz wird durch die Erlangung der tatsächlichen Gewalt über eine Sache erworben.',
    shortExplanation:
      'Besitz ist die tatsächliche Sachherrschaft über eine Sache. Wer die Sache tatsächlich in seiner Gewalt hat, ist Besitzer. Ob er auch Eigentümer ist, ist dafür nicht entscheidend.',
    purpose:
      'Die Norm erklärt, wer Besitzer einer Sache ist. Sie ist der Ausgangspunkt für Besitzschutz, verbotene Eigenmacht und Besitzerselbsthilfe.',
    prerequisites: [
      { label: 'Erlangung der tatsächlichen Gewalt über die Sache' },
      { label: 'Bei Einigung: Erwerber ist in der Lage, die Gewalt auszuüben', detail: '§854 Abs. 2 BGB' },
    ],
    whoActs: 'Der Erwerber der tatsächlichen Sachherrschaft wird Besitzer.',
    againstWhom:
      'Kein Gegenüber – die Norm beschreibt nur, wie Besitz entsteht (keine Befugnis, kein Anspruch).',
    limits: [
      'Besitz ist keine Befugnis zu Eingriffen – er sagt nur, wer die tatsächliche Sachherrschaft hat.',
      'Besitz und Eigentum können bei verschiedenen Personen liegen.',
    ],
    examHint:
      'Die IHK fragt gern: Wer ist Besitzer, wer ist Eigentümer? Merke: Besitz = tatsächliche Sachherrschaft, nicht Eigentum.',
    typicalSituation:
      'Ein Besucher hält eine im Geschäft entwendete Ware in der Hand. Wer sie tatsächlich in seiner Gewalt hat, ist Besitzer – die Frage nach dem Eigentum ist davon zu trennen.',
    distinctions: [
      { label: '§ 903 BGB – Befugnisse des Eigentümers', detail: 'Eigentum = rechtliche Herrschaft; Besitz = tatsächliche Sachherrschaft.' },
    ],
    officialText:
      '(1) Der Besitz einer Sache wird durch die Erlangung der tatsächlichen Gewalt über die Sache erworben. (2) Die Einigung des bisherigen Besitzers und des Erwerbers genügt zum Erwerb, wenn der Erwerber in der Lage ist, die Gewalt über die Sache auszuüben.',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    sourceUrl: 'https://www.gesetze-im-internet.de/bgb/__854.html',
  },
  {
    id: 'bgb-858',
    law: 'BGB',
    paragraph: '§ 858',
    officialTitle: 'Verbotene Eigenmacht',
    area: 'Zivilrecht',
    nature: 'GRUNDLAGE',
    familyId: 'eigentum-besitz',
    relevance: 'CORE_34A',
    relevanceReason:
      'Ausdrücklich für die Sachkunde genannt: beschreibt den verbotenen Eingriff in fremden Besitz und ist Voraussetzung der Besitzerselbsthilfe.',
    examRelevance:
      'Verbotene Eigenmacht liegt vor, wenn jemand dem Besitzer ohne dessen Willen den Besitz entzieht oder stört, ohne dass das Gesetz dies gestattet. Sie ist Grundlage des §859 BGB.',
    summary:
      'Verbotene Eigenmacht ist der widerrechtliche Entzug oder die Störung fremden Besitzes ohne den Willen des Besitzers.',
    shortExplanation:
      'Wer dem Besitzer ohne dessen Willen den Besitz entzieht oder ihn im Besitz stört, handelt widerrechtlich – es sei denn, das Gesetz gestattet es. Dieser Eingriff heißt verbotene Eigenmacht.',
    purpose:
      'Die Norm bestimmt, wann ein Eingriff in fremden Besitz rechtswidrig ist. Sie ist die Voraussetzung dafür, dass der Besitzer sich überhaupt wehren darf.',
    prerequisites: [
      { label: 'Bestehender Besitz' },
      { label: 'Entzug oder Störung des Besitzes' },
      { label: 'ohne den Willen des Besitzers' },
      { label: 'keine gesetzliche Gestattung des Eingriffs' },
    ],
    whoActs: 'Der Störer bzw. Entzieher handelt; betroffen ist der Besitzer.',
    againstWhom:
      'Gegen den Besitzer – die Norm beschreibt den Eingriff in dessen Besitz, nicht eine Befugnis.',
    limits: [
      'Nicht jeder Eingriff ist verbotene Eigenmacht – gesetzlich gestattete Eingriffe sind ausgenommen.',
      'Verbotene Eigenmacht ist noch keine Befugnis zur Reaktion; diese folgt erst aus §859 BGB.',
    ],
    examHint:
      'Prüfungsfrage: Besitz? Entzug oder Störung? ohne Willen? keine gesetzliche Gestattung? Erst dann liegt verbotene Eigenmacht vor.',
    typicalSituation:
      'Ein Kunde nimmt einem anderen die Ware aus der Hand und behält sie. Damit entzieht er dem Besitzer ohne dessen Willen den Besitz.',
    distinctions: [
      { label: '§ 859 BGB – Selbsthilfe des Besitzers', detail: '§858 beschreibt den verbotenen Eingriff; §859 die Reaktion darauf.' },
    ],
    officialText:
      '(1) Wer dem Besitzer ohne dessen Willen den Besitz entzieht oder ihn im Besitz stört, handelt, sofern nicht das Gesetz die Entziehung oder die Störung gestattet, widerrechtlich (verbotene Eigenmacht). (2) Der durch verbotene Eigenmacht erlangte Besitz ist fehlerhaft. Die Fehlerhaftigkeit muss der Nachfolger im Besitz gegen sich gelten lassen, wenn er Erbe des Besitzers ist oder die Fehlerhaftigkeit des Besitzes seines Vorgängers bei dem Erwerb kennt.',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    sourceUrl: 'https://www.gesetze-im-internet.de/bgb/__858.html',
  },
  {
    id: 'bgb-903',
    law: 'BGB',
    paragraph: '§ 903',
    officialTitle: 'Befugnisse des Eigentümers',
    area: 'Zivilrecht',
    nature: 'BEFUGNIS',
    familyId: 'eigentum-besitz',
    relevance: 'CORE_34A',
    relevanceReason:
      'Ausdrücklich für die Sachkunde genannt: beschreibt die Eigentümerbefugnis und die Grenze, die kein Herausgabeanspruch ist.',
    examRelevance:
      'Der Eigentümer darf grundsätzlich mit der Sache verfahren und andere ausschließen – aber nur, soweit Gesetz oder Rechte Dritter nicht entgegenstehen.',
    summary:
      'Der Eigentümer darf mit der Sache nach Belieben verfahren und andere von jeder Einwirkung ausschließen.',
    shortExplanation:
      'Eigentum ist die rechtliche Herrschaft über eine Sache. Der Eigentümer darf grundsätzlich über die Sache verfügen und andere ausschließen. Grenzen sind das Gesetz und Rechte Dritter.',
    purpose:
      'Die Norm zeigt, was der Eigentümer grundsätzlich darf. Sie ist keine Anspruchsnorm und kein Freibrief, sich die Sache selbst mit Gewalt zu holen.',
    prerequisites: [
      { label: 'Eigentum an der Sache' },
      { label: 'keine gesetzlichen Schranken' },
      { label: 'keine entgegenstehenden Rechte Dritter' },
    ],
    whoActs: 'Der Eigentümer.',
    againstWhom: 'Gegenüber jedem, der auf die Sache einwirkt (Ausschlussfunktion).',
    limits: [
      'Kein Herausgabeanspruch – §903 sagt nicht, wie der Eigentümer die Sache zurückerhält.',
      'Kein Recht, sich die Sache jederzeit selbst mit Gewalt zu nehmen.',
      'Gesetzliche Schranken und Rechte Dritter sind zu beachten.',
    ],
    examHint:
      'Die IHK trennt Eigentümerbefugnis (§903) und Herausgabeanspruch. §903 ist kein Anspruch und keine Gewaltbefugnis.',
    typicalSituation:
      'Der Eigentümer einer gestohlenen Sache darf den Dieb nicht einfach mit Gewalt festhalten – dafür braucht es eine eigene Befugnis.',
    distinctions: [
      { label: '§ 854 BGB – Erwerb des Besitzes', detail: 'Eigentum (Recht) ≠ Besitz (tatsächliche Sachherrschaft).' },
    ],
    officialText:
      'Der Eigentümer einer Sache kann, soweit nicht das Gesetz oder Rechte Dritter entgegenstehen, mit der Sache nach Belieben verfahren und andere von jeder Einwirkung ausschließen. Der Eigentümer eines Tieres hat bei der Ausübung seiner Befugnisse die besonderen Vorschriften zum Schutz der Tiere zu beachten.',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    sourceUrl: 'https://www.gesetze-im-internet.de/bgb/__903.html',
  },
  {
    id: 'bgb-229',
    law: 'BGB',
    paragraph: '§ 229',
    officialTitle: 'Selbsthilfe',
    area: 'Zivilrecht',
    nature: 'BEFUGNIS',
    familyId: 'selbsthilfe',
    relevance: 'CORE_34A',
    relevanceReason:
      'Ausdrücklich für die Sachkunde genannt: zivilrechtliche Selbsthilfebefugnis zur Sicherung eines Anspruchs.',
    examRelevance:
      'Selbsthilfe setzt einen bestehenden Anspruch voraus und ist nur zulässig, wenn obrigkeitliche Hilfe nicht rechtzeitig zu erlangen ist und sonst die Anspruchsverwirklichung vereitelt oder wesentlich erschwert würde.',
    summary:
      'Selbsthilfe sichert einen bestehenden Anspruch, wenn staatliche Hilfe nicht rechtzeitig erreichbar ist.',
    shortExplanation:
      '§229 BGB erlaubt, eine Sache wegzunehmen oder einen fluchtverdächtigen Verpflichteten festzunehmen, um einen Anspruch zu sichern. Voraussetzung ist, dass staatliche Hilfe nicht rechtzeitig kommt und ohne sofortiges Eingreifen der Anspruch vereitelt würde.',
    purpose:
      'Die Norm überbrückt die Zeit, bis staatliche Hilfe verfügbar ist. Sie sichert einen bereits bestehenden Anspruch, sie begründet keinen neuen.',
    prerequisites: [
      { label: 'bestehender Anspruch' },
      { label: 'obrigkeitliche Hilfe nicht rechtzeitig erreichbar' },
      { label: 'Gefahr der Vereitelung oder wesentlichen Erschwerung des Anspruchs' },
      { label: 'sofortiges Eingreifen erforderlich' },
    ],
    whoActs: 'Der Anspruchsinhaber (z. B. die Sicherheitskraft für ihren Auftraggeber).',
    againstWhom: 'Gegen den Verpflichteten bzw. dessen Sache.',
    limits: [
      'Nur zur Sicherung eines bestehenden Anspruchs – nicht zur Bestrafung.',
      'Nur wenn staatliche Hilfe nicht rechtzeitig erreichbar ist.',
      'Die Selbsthilfe darf nicht weiter gehen, als zur Abwendung der Gefahr erforderlich (§230 BGB).',
    ],
    examHint:
      'Prüfungsfrage: Besteht ein Anspruch? Ist staatliche Hilfe nicht rechtzeitig erreichbar? Besteht die Gefahr der Vereitelung? Erst dann greift §229.',
    typicalSituation:
      'Ein Ladendieb flüchtet mit der Ware, die Polizei ist nicht rechtzeitig vor Ort. §229 BGB kann die Selbsthilfe zur Sicherung des Anspruchs erlauben.',
    distinctions: [
      { label: '§ 127 Abs. 1 StPO – Vorläufige Festnahme', detail: '§229 BGB ist zivilrechtliche Selbsthilfe; §127 StPO strafprozessuale vorläufige Festnahme.' },
      { label: '§ 859 BGB – Selbsthilfe des Besitzers', detail: '§859 schützt den Besitz unmittelbar; §229 sichert einen Anspruch.' },
    ],
    officialText:
      'Wer zum Zwecke der Selbsthilfe eine Sache wegnimmt, zerstört oder beschädigt oder wer zum Zwecke der Selbsthilfe einen Verpflichteten, welcher der Flucht verdächtig ist, festnimmt oder den Widerstand des Verpflichteten gegen eine Handlung, die dieser zu dulden verpflichtet ist, beseitigt, handelt nicht widerrechtlich, wenn obrigkeitliche Hilfe nicht rechtzeitig zu erlangen ist und ohne sofortiges Eingreifen die Gefahr besteht, dass die Verwirklichung des Anspruchs vereitelt oder wesentlich erschwert werde.',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    sourceUrl: 'https://www.gesetze-im-internet.de/bgb/__229.html',
  },
  {
    id: 'bgb-859',
    law: 'BGB',
    paragraph: '§ 859',
    officialTitle: 'Selbsthilfe des Besitzers',
    area: 'Zivilrecht',
    nature: 'BEFUGNIS',
    familyId: 'selbsthilfe',
    relevance: 'CORE_34A',
    relevanceReason:
      'Ausdrücklich für die Sachkunde genannt: die zentrale Besitzerselbsthilfe gegen verbotene Eigenmacht.',
    examRelevance:
      'Der Besitzer darf sich verbotener Eigenmacht mit Gewalt erwehren und eine weggenommene bewegliche Sache dem auf frischer Tat betroffenen oder verfolgten Täter mit Gewalt wieder abnehmen.',
    summary:
      'Der Besitzer darf sich unter den gesetzlichen Voraussetzungen gegen eine verbotene Eigenmacht selbst zur Wehr setzen.',
    shortExplanation:
      '§859 BGB erlaubt dem Besitzer, sich gegen verbotene Eigenmacht mit Gewalt zu wehren. Wurde ihm eine bewegliche Sache weggenommen, darf er sie dem auf frischer Tat betroffenen oder verfolgten Täter mit Gewalt wieder abnehmen.',
    purpose:
      'Die Norm schützt den Besitz unmittelbar und sofort. Sie ist eine enge, unmittelbare Selbsthilfe – kein allgemeiner Freibrief zur Gewalt.',
    prerequisites: [
      { label: 'Bestehender Besitz' },
      { label: 'verbotene Eigenmacht (§858 BGB)' },
      { label: 'unmittelbare Reaktion' },
      { label: 'Gewalt nur zum Schutz des Besitzes, nicht darüber hinaus' },
    ],
    whoActs: 'Der Besitzer (und nach §860 BGB der Besitzdiener).',
    againstWhom: 'Gegen den Störer bzw. den auf frischer Tat betroffenen oder verfolgten Täter.',
    limits: [
      'Kein allgemeiner Freibrief zur Gewaltanwendung.',
      'Nur zur Abwehr der konkreten verbotenen Eigenmacht, nicht zur Bestrafung.',
      'Die Reaktion muss unmittelbar erfolgen.',
    ],
    examHint:
      'Prüfungsfrage: Liegt Besitz und verbotene Eigenmacht vor? Dann darf sich der Besitzer unmittelbar mit Gewalt wehren – aber nicht mehr als nötig.',
    typicalSituation:
      'Einem Mitarbeiter wird die Ware aus der Hand gerissen. Der Besitzer darf sie dem auf frischer Tat betroffenen Täter mit Gewalt wieder abnehmen.',
    distinctions: [
      { label: '§ 858 BGB – Verbotene Eigenmacht', detail: '§858 beschreibt den Eingriff, §859 die Reaktion darauf.' },
      { label: '§ 229 BGB – Selbsthilfe', detail: '§859 schützt den Besitz; §229 sichert einen Anspruch.' },
    ],
    officialText:
      'Der Besitzer darf sich verbotener Eigenmacht mit Gewalt erwehren. Wird eine bewegliche Sache dem Besitzer mittels verbotener Eigenmacht weggenommen, so darf er sie dem auf frischer Tat betroffenen oder verfolgten Täter mit Gewalt wieder abnehmen. Wird dem Besitzer eines Grundstücks der Besitz durch verbotene Eigenmacht entzogen, so darf er sofort nach der Entziehung sich des Besitzes durch Entsetzung des Täters wieder bemächtigen. Die gleichen Rechte stehen dem Besitzer gegen denjenigen zu, welcher nach § 858 Abs. 2 die Fehlerhaftigkeit des Besitzes gegen sich gelten lassen muss.',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    sourceUrl: 'https://www.gesetze-im-internet.de/bgb/__859.html',
  },
  {
    id: 'bgb-227',
    law: 'BGB',
    paragraph: '§ 227',
    officialTitle: 'Notwehr',
    area: 'Zivilrecht',
    nature: 'RECHTFERTIGUNG',
    familyId: 'notwehr-notstand',
    relevance: 'CORE_34A',
    relevanceReason:
      'Ausdrücklich für die Sachkunde genannt: zivilrechtliche Notwehrregelung, Gegenstück zu §32 StGB.',
    examRelevance:
      'Die zivilrechtliche Notwehr rechtfertigt die erforderliche Verteidigung gegen einen gegenwärtigen rechtswidrigen Angriff. Sie ist von §32 StGB zu unterscheiden.',
    summary:
      'Eine durch Notwehr gebotene Handlung ist nicht widerrechtlich – Verteidigung gegen einen gegenwärtigen rechtswidrigen Angriff.',
    shortExplanation:
      '§227 BGB ist die zivilrechtliche Notwehrregelung. Wie §32 StGB verlangt sie einen gegenwärtigen rechtswidrigen Angriff und eine erforderliche Verteidigung. Sie ist von §32 StGB zu unterscheiden.',
    purpose:
      'Die Norm rechtfertigt die Verteidigung gegen einen Angriff im Zivilrecht. Sie verhindert, dass der Verteidiger wegen der Abwehr schadensersatzpflichtig wird.',
    prerequisites: [
      { label: 'gegenwärtiger rechtswidriger Angriff' },
      { label: 'Verteidigung' },
      { label: 'Erforderlichkeit der Verteidigung' },
    ],
    whoActs: 'Der Angegriffene oder ein Dritter (Nothilfe).',
    againstWhom: 'Gegen den Angreifer.',
    limits: [
      'Nur gegen einen gegenwärtigen, rechtswidrigen Angriff.',
      'Die Verteidigung muss erforderlich sein.',
      'Keine zivilrechtliche Notwehr ohne Angriff.',
    ],
    examHint:
      'Die IHK unterscheidet §227 BGB (zivilrechtliche Notwehr) und §32 StGB (strafrechtliche Notwehr). Beide verlangen Angriff, Gegenwärtigkeit, Rechtswidrigkeit und Erforderlichkeit.',
    typicalSituation:
      'Ein Sicherheitsmitarbeiter wird tätlich angegriffen und wehrt den Angriff ab – zivilrechtlich über §227 BGB gerechtfertigt.',
    distinctions: [
      { label: '§ 32 StGB – Notwehr', detail: '§227 BGB = zivilrechtliche Notwehr; §32 StGB = strafrechtliche Notwehr.' },
    ],
    officialText:
      '(1) Eine durch Notwehr gebotene Handlung ist nicht widerrechtlich. (2) Notwehr ist diejenige Verteidigung, welche erforderlich ist, um einen gegenwärtigen rechtswidrigen Angriff von sich oder einem anderen abzuwenden.',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    sourceUrl: 'https://www.gesetze-im-internet.de/bgb/__227.html',
  },
  {
    id: 'bgb-228',
    law: 'BGB',
    paragraph: '§ 228',
    officialTitle: 'Notstand',
    fachlicheEinordnung: 'Defensivnotstand',
    area: 'Zivilrecht',
    nature: 'RECHTFERTIGUNG',
    familyId: 'notwehr-notstand',
    relevance: 'CORE_34A',
    relevanceReason:
      'Ausdrücklich für die Sachkunde genannt: defensiver Notstand, wenn die Gefahr von der Sache selbst ausgeht.',
    examRelevance:
      'Bei §228 BGB geht die Gefahr von der Sache aus. Die Beschädigung oder Zerstörung der fremden Sache ist gerechtfertigt, wenn sie zur Gefahrenabwehr erforderlich ist und nicht außer Verhältnis zur Gefahr steht.',
    summary:
      'Wer eine fremde Sache beschädigt oder zerstört, um eine durch sie drohende Gefahr abzuwenden, handelt nicht widerrechtlich.',
    shortExplanation:
      'Beim defensiven Notstand geht die Gefahr von der Sache selbst aus. Wer diese Sache beschädigt oder zerstört, um die Gefahr abzuwenden, handelt nicht widerrechtlich – wenn die Einwirkung erforderlich ist und nicht außer Verhältnis steht.',
    purpose:
      'Die Norm rechtfertigt den Eingriff in eine fremde Sache, wenn gerade von dieser Sache eine Gefahr ausgeht.',
    prerequisites: [
      { label: 'Gefahr, die von der Sache ausgeht' },
      { label: 'Beschädigung oder Zerstörung zur Gefahrenabwehr' },
      { label: 'Erforderlichkeit der Einwirkung' },
      { label: 'Schaden nicht außer Verhältnis zur Gefahr' },
    ],
    whoActs: 'Der Handelnde, der die Gefahr abwendet.',
    againstWhom: 'Gegen die gefährliche fremde Sache.',
    limits: [
      'Die Gefahr muss von der Sache ausgehen – sonst greift §228 nicht.',
      'Der Schaden darf nicht außer Verhältnis zur Gefahr stehen.',
      'Wer die Gefahr verschuldet hat, ist zum Schadensersatz verpflichtet.',
    ],
    examHint:
      'Prüfungsfrage: Woher kommt die Gefahr? Bei §228 geht sie von der Sache aus – bei §904 wird auf eine fremde Sache zur Gefahrenabwehr eingewirkt.',
    typicalSituation:
      'Ein umstürzender Gegenstand droht Personen zu treffen; die Sache wird beschädigt, um die Gefahr abzuwenden.',
    distinctions: [
      { label: '§ 904 BGB – Notstand', detail: '§228 = Gefahr geht von der Sache aus; §904 = Einwirkung auf fremde Sache zur Gefahrenabwehr.' },
    ],
    officialText:
      'Wer eine fremde Sache beschädigt oder zerstört, um eine durch sie drohende Gefahr von sich oder einem anderen abzuwenden, handelt nicht widerrechtlich, wenn die Beschädigung oder die Zerstörung zur Abwendung der Gefahr erforderlich ist und der Schaden nicht außer Verhältnis zu der Gefahr steht. Hat der Handelnde die Gefahr verschuldet, so ist er zum Schadensersatz verpflichtet.',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    sourceUrl: 'https://www.gesetze-im-internet.de/bgb/__228.html',
  },
  {
    id: 'bgb-904',
    law: 'BGB',
    paragraph: '§ 904',
    officialTitle: 'Notstand',
    fachlicheEinordnung: 'Aggressivnotstand',
    area: 'Zivilrecht',
    nature: 'RECHTFERTIGUNG',
    familyId: 'notwehr-notstand',
    relevance: 'CORE_34A',
    relevanceReason:
      'Ausdrücklich für die Sachkunde genannt: aggressiver Notstand, Einwirkung auf eine fremde Sache zur Gefahrenabwehr.',
    examRelevance:
      'Bei §904 BGB wird auf eine fremde Sache eingewirkt, um eine gegenwärtige Gefahr abzuwenden. Der Eigentümer kann Ersatz des Schadens verlangen.',
    summary:
      'Der Eigentümer muss die Einwirkung auf seine Sache dulden, wenn sie zur Abwendung einer gegenwärtigen Gefahr notwendig ist und der drohende Schaden unverhältnismäßig groß ist.',
    shortExplanation:
      'Beim aggressiven Notstand wird auf eine fremde Sache eingewirkt, um eine gegenwärtige Gefahr abzuwenden. Der Eigentümer darf die Einwirkung dann nicht verbieten, kann aber Schadensersatz verlangen.',
    purpose:
      'Die Norm rechtfertigt den Eingriff in eine fremde Sache, die selbst nicht gefährlich ist, zur Abwendung einer größeren Gefahr.',
    prerequisites: [
      { label: 'gegenwärtige Gefahr' },
      { label: 'Einwirkung auf eine fremde Sache zur Abwendung notwendig' },
      { label: 'drohender Schaden unverhältnismäßig groß gegenüber dem Schaden am Eigentum' },
    ],
    whoActs: 'Der Handelnde, der auf die fremde Sache einwirkt.',
    againstWhom: 'Gegen den Eigentümer der fremden Sache.',
    limits: [
      'Nur wenn die Einwirkung zur Abwendung notwendig ist.',
      'Der drohende Schaden muss unverhältnismäßig groß sein.',
      'Der Eigentümer kann Ersatz des ihm entstehenden Schadens verlangen.',
    ],
    examHint:
      'Abgrenzung: §228 = Gefahr geht von der Sache aus; §904 = auf eine fremde Sache wird eingewirkt, um eine andere Gefahr abzuwenden.',
    typicalSituation:
      'Eine fremde Sache wird beschädigt, um eine größere gegenwärtige Gefahr für Personen abzuwenden.',
    distinctions: [
      { label: '§ 228 BGB – Notstand', detail: '§228 = Gefahr geht von der Sache aus; §904 = Einwirkung auf fremde Sache.' },
    ],
    officialText:
      'Der Eigentümer einer Sache ist nicht berechtigt, die Einwirkung eines anderen auf die Sache zu verbieten, wenn die Einwirkung zur Abwendung einer gegenwärtigen Gefahr notwendig und der drohende Schaden gegenüber dem aus der Einwirkung dem Eigentümer entstehenden Schaden unverhältnismäßig groß ist. Der Eigentümer kann Ersatz des ihm entstehenden Schadens verlangen.',
    verificationStatus: 'VERIFIED_OFFICIAL_TEXT',
    sourceUrl: 'https://www.gesetze-im-internet.de/bgb/__904.html',
  },
  {
    id: 'bgb-823',
    law: 'BGB',
    paragraph: '§ 823',
    officialTitle: 'Schadensersatzpflicht',
    area: 'Zivilrecht',
    nature: 'ANSPRUCH',
    familyId: 'schadensersatz',
    relevance: 'CORE_34A',
    relevanceReason:
      'Ausdrücklich für die Sachkunde genannt (§§823 ff. BGB): Schadensersatz aus unerlaubter Handlung. Nur der sachkunderelevante Zusammenhang – kein gesamter Deliktsrechtsabschnitt.',
    examRelevance:
      '§823 BGB begründet einen Schadensersatzanspruch (Anspruch), keine Eingriffsbefugnis. Die Bibel nennt §823 BGB als Beispiel für einen Anspruch; ein eigener Normabschnitt mit amtlichem Wortlaut ist dort nicht vorhanden.',
    summary:
      'Wer einem anderen widerrechtlich und schuldhaft Schaden zufügt, kann ihm zum Schadensersatz verpflichtet sein – ein Anspruch, keine Befugnis.',
    shortExplanation:
      '§823 BGB ist ein Schadensersatzanspruch aus unerlaubter Handlung. Er beantwortet die Frage „Wer kann von wem was verlangen?“ – nicht, was die Sicherheitskraft selbst tun darf.',
    purpose:
      'Die Norm regelt die zivilrechtliche Haftung für zugefügten Schaden. Sie ist eine Anspruchsnorm und darf nicht als Eingriffsbefugnis missverstanden werden.',
    prerequisites: [
      { label: 'Rechtsgutverletzung (z. B. Eigentum, Körper, Gesundheit)' },
      { label: 'widerrechtliche Handlung' },
      { label: 'Verschulden' },
      { label: 'ursächlicher Schaden' },
    ],
    whoActs: 'Der Geschädigte kann den Schädiger in Anspruch nehmen.',
    againstWhom: 'Gegen den Schädiger.',
    limits: [
      'Anspruch ≠ Befugnis: §823 BGB begründet kein unmittelbares Eingriffsrecht.',
      'Nur der unerlaubte-Handlung-Zusammenhang der §§823 ff. BGB ist sachkunderelevant.',
    ],
    examHint:
      'Die IHK unterscheidet Anspruch und Befugnis. §823 BGB ist ein Anspruch (Schadensersatz) – keine Erlaubnis, selbst einzugreifen.',
    typicalSituation:
      'Eine zu Unrecht festgehaltene Person kann Schadensersatzansprüche gegen die Sicherheitskraft geltend machen.',
    distinctions: [
      { label: '§ 227 BGB – Notwehr', detail: 'Gerechtfertigte Notwehr schließt die Widerrechtlichkeit und damit den Anspruch aus §823 aus.' },
    ],
    officialText: '',
    verificationStatus: 'MISSING',
    sourceUrl: 'https://www.gesetze-im-internet.de/bgb/__823.html',
  },
  {
    id: 'bgb-226',
    law: 'BGB',
    paragraph: '§ 226',
    officialTitle: 'Schikaneverbot',
    area: 'Zivilrecht',
    nature: 'GRUNDLAGE',
    familyId: 'schikaneverbot',
    relevance: 'RELATED_34A',
    relevanceReason:
      'Für die Sachkunde genannt (Schikaneverbot): grenzt die zulässige Rechtsausübung ab. In der Bibel ohne amtlichen Wortlaut – daher als fehlend markiert.',
    examRelevance:
      'Die Ausübung eines Rechts ist unzulässig, wenn sie nur den Zweck haben kann, einem anderen Schaden zuzufügen. Für Sicherheitskräfte zeigt die Norm die Grenze zwischen Rechtsausübung und Schikane.',
    summary:
      'Die Ausübung eines Rechts ist unzulässig, wenn sie nur den Zweck haben kann, einem anderen Schaden zuzufügen.',
    shortExplanation:
      'Das Schikaneverbot setzt der Rechtsausübung eine Grenze: Ein Recht darf nicht allein dazu genutzt werden, einem anderen zu schaden. Es geht um die innere Zielrichtung der Rechtsausübung.',
    purpose:
      'Die Norm verhindert, dass formale Rechte missbräuchlich nur zur Schädigung anderer eingesetzt werden.',
    prerequisites: [
      { label: 'Ausübung eines Rechts' },
      { label: 'die Ausübung kann nur den Zweck haben, einem anderen Schaden zuzufügen' },
    ],
    whoActs: 'Der Rechtsinhaber, dessen Rechtsausübung unzulässig wäre.',
    againstWhom: 'Gegenüber dem Betroffenen der schikanösen Rechtsausübung.',
    limits: [
      'Nur bei reiner Schädigungsabsicht – ein eigenes berechtigtes Interesse schließt Schikane aus.',
      'Kein Eingriffsrecht: Die Norm begrenzt nur die Rechtsausübung.',
    ],
    examHint:
      'Prüfungsfrage: Kann die Rechtsausübung nur den Zweck haben zu schaden? Dann ist sie unzulässig (Schikane).',
    typicalSituation:
      'Ein Hausverbot wird nicht zum Schutz des Hausrechts, sondern nur aus persönlicher Missgunst ausgesprochen – der Gedanke des Schikaneverbots.',
    distinctions: [
      { label: '§ 903 BGB – Befugnisse des Eigentümers', detail: '§903 gibt die Eigentümerbefugnis; §226 setzt ihr die Schikane-Grenze.' },
    ],
    officialText: '',
    verificationStatus: 'MISSING',
    sourceUrl: 'https://www.gesetze-im-internet.de/bgb/__226.html',
  },
];

/** Primärquellen-Hinweis für die Seite (für Fußzeilen/Source-Angaben). */
export const BGB_SOURCE_NOTE = {
  knowledgeBase: '34a_bibel_v5_3_1.txt',
  primarySource: BIBEL_URL,
  legalStand: '01.10.2026',
};
