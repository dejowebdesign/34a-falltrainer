import { Scenario } from '../models';

/**
 * Fall 09–16 – aus den Fallvorlagen der Themenvertiefung konstruiert.
 *
 * Diese Szenarien ergänzen die acht Bestandsfälle und sind wie diese reine
 * Seed-Daten (Bibel-Kapitel 7/63): Sie verweisen ausschließlich auf Normen,
 * Einordnungen und Befugnisse der Knowledge Base und vermeiden die verbotenen
 * Automatismen aus Bibel-Kapitel 13/62.
 *
 * Die fachlichen Grundlagen der Vorlagen (Themen, Rechtsbegriffe,
 * Rechtsgrundlagen und Folgefragen) bleiben erhalten. Rechtsgrundlagen, die
 * nicht in der Bibel V5.3.1 enthalten sind (z. B. § 19 StGB, § 13 StGB,
 * Art. 6 DSGVO, WaffG, DGUV V23, DIN EN 2, Versammlungsrecht), werden
 * ausdrücklich als „in der Knowledge Base nicht enthalten – als fehlend
 * markiert“ gekennzeichnet; es wird nichts hinzugedichtet.
 */
export const EXTENDED_SCENARIOS: Scenario[] = [
  // ===========================================================================
  // FALL 9 – Taschenkontrolle: Hausrecht ≠ Durchsuchungs-/Gewaltbefugnis
  // ===========================================================================
  {
    id: 'taschenkontrolle-verweigert',
    title: 'Besucher verweigert Taschenkontrolle',
    description:
      'Ein Besucher möchte ein Objekt betreten, verweigert aber die verlangte Taschenkontrolle.',
    topic: 'Rechtslehre',
    difficulty: 4,
    clusters: ['Hausrecht', '§903 BGB', 'Taschenkontrolle'],
    legalReference: '§903 BGB',
    followUp1:
      'Unter welchen Voraussetzungen kommt in dieser Situation eine Festhaltemaßnahme in Betracht?',
    followUp2: 'Wie ist bei aggressivem Verhalten des Besuchers zu reagieren?',
    originalCaseText:
      'Sie sind als Sicherheitskraft am Zugang eines Veranstaltungsgebäudes eingesetzt. Vor dem Betreten verlangen Sie von einem Besucher, seine Tasche zu öffnen und den Inhalt zu zeigen. Der Besucher weigert sich und möchte trotzdem passieren. Ein konkreter Verdacht auf eine Straftat besteht nicht. Der Besucher wird nicht tätlich, bleibt aber bei seiner Weigerung.',
    facts: [
      { id: 'f1', text: 'Sie sind als Sicherheitskraft am Zugang eines Veranstaltungsgebäudes eingesetzt.', legallyRelevant: false },
      { id: 'f2', text: 'Der Betreiber lässt den Zutritt nur nach einer Taschenkontrolle zu.', legallyRelevant: true },
      { id: 'f3', text: 'Der Besucher verweigert die Taschenkontrolle und möchte trotzdem eintreten.', legallyRelevant: true },
      { id: 'f4', text: 'Ein konkreter Verdacht auf eine Straftat besteht nicht.', legallyRelevant: true },
      { id: 'f5', text: 'Der Besucher verhält sich nicht tätlich.', legallyRelevant: true },
    ],
    stageOne: {
      prompt: 'Wie verhalten Sie sich?',
      options: [
        {
          id: 's1-a',
          text: 'Ruhig und höflich erklären, dass der Zutritt nur nach der Kontrolle möglich ist, und den Zutritt verweigern.',
          verdict: 'RICHTIG',
          explanation:
            'Die Zutrittsverweigerung ist das mildeste Mittel. Ruhige, professionelle Kommunikation vermeidet eine Eskalation.',
          normIds: ['bgb-903'],
        },
        {
          id: 's1-b',
          text: 'Die Tasche nicht gegen den Willen des Besuchers durchsuchen und keine Gewalt anwenden.',
          verdict: 'RICHTIG',
          explanation:
            'Ohne Einwilligung ist eine Durchsuchung nicht zulässig. Aus dem Hausrecht folgt keine Durchsuchungs- oder Gewaltbefugnis.',
          normIds: ['bgb-903'],
        },
        {
          id: 's1-c',
          text: 'Die Tasche mit körperlichem Zwang öffnen, um den Zutritt durchzusetzen.',
          verdict: 'FALSCH',
          explanation:
            'Körperlicher Zwang ist ohne eigenständige Befugnis unzulässig. Die Verweigerung der Kontrolle allein rechtfertigt keine Gewalt.',
          misconception:
            'Hausrecht → automatisch Durchsuchungs- oder Gewaltbefugnis. Aus dem Hausrecht folgt keine Zwangsbefugnis.',
          normIds: ['bgb-903', 'bgb-859'],
        },
        {
          id: 's1-d',
          text: 'Den Besucher festhalten, bis er die Tasche freiwillig öffnet.',
          verdict: 'FALSCH',
          explanation:
            'Ohne Straftat und ohne die Voraussetzungen des § 127 StPO besteht keine Festhaltebefugnis.',
          misconception:
            'Straftat vermutet → automatisch festhalten. Die Voraussetzungen der Festhaltebefugnis sind gesondert zu prüfen.',
          normIds: ['stpo-127'],
        },
      ],
      correctOptions: ['s1-a', 's1-b'],
      explanation:
        'Sinnvoll sind ruhige Kommunikation und die Zutrittsverweigerung. Durchsuchung und Gewalt gegen den Willen des Besuchers sind ohne eigenständige Befugnis unzulässig.',
    },
    stageTwo: {
      prompt: 'Was liegt rechtlich vor?',
      options: [
        {
          id: 's2-a',
          text: 'Hausrecht des Betreibers als Eigentümerbefugnis nach § 903 BGB.',
          verdict: 'RICHTIG',
          legalLevel: 'PRIVATRECHT',
          explanation:
            'Nach § 903 BGB kann der Eigentümer andere von jeder Einwirkung ausschließen. Daraus folgt das Hausrecht: Der Betreiber bestimmt, wer die Räume unter welchen Bedingungen betreten darf.',
          normIds: ['bgb-903'],
        },
        {
          id: 's2-b',
          text: 'Die Taschenkontrolle ist nur mit Einwilligung des Besuchers zulässig; die Verweigerung ist kein Rechtsverstoß.',
          verdict: 'RICHTIG',
          legalLevel: 'PRIVATRECHT',
          explanation:
            'Ohne Einwilligung darf die Tasche nicht durchsucht werden. Verweigert der Besucher, darf der Zutritt verweigert werden – mehr aber nicht.',
          normIds: ['bgb-903'],
        },
        {
          id: 's2-c',
          text: 'Hausfriedensbruch durch den Besucher, weil er sich der Kontrolle widersetzt.',
          verdict: 'FALSCH',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Ein Hausfriedensbruch setzt widerrechtliches Eindringen oder unbefugtes Verweilen voraus. Die Verweigerung einer Zutrittsbedingung ist noch kein Hausfriedensbruch.',
          misconception:
            'Die Weigerung, eine Zutrittsbedingung zu erfüllen, mit Hausfriedensbruch gleichsetzen.',
          normIds: ['stgb-123'],
        },
        {
          id: 's2-d',
          text: 'Gegenwärtige Gefahr für Leben und Leib.',
          verdict: 'FALSCH',
          legalLevel: 'RECHTSBEGRIFF',
          explanation:
            'Eine Gefahr für Leben und Leib ist im Sachverhalt nicht erkennbar. Die Verweigerung einer Kontrolle ist keine Gefahrenlage.',
          misconception: 'Gefahr → automatisch Notstand; hier liegt keine Gefahrlage vor.',
          normIds: ['stgb-34'],
        },
      ],
      correctOptions: ['s2-a', 's2-b'],
      explanation:
        'Es liegt das Hausrecht des Betreibers nach § 903 BGB vor. Die Durchsuchung ist nur mit Einwilligung zulässig; die Verweigerung erlaubt die Zutrittsverweigerung, aber keinen Zwang.',
      classificationIds: ['classification-hausrecht'],
    },
    stageThree: {
      prompt: 'Mit welcher Rechtsgrundlage dürfen Sie eingreifen?',
      options: [
        {
          id: 's3-a',
          text: '§ 903 BGB – Befugnisse des Eigentümers (Hausrecht): Zutritt von der Kontrolle abhängig machen und verweigern; keine Durchsuchung oder Festnahme ohne Einwilligung.',
          verdict: 'RICHTIG',
          explanation:
            'Das Hausrecht erlaubt, den Zutritt zu verweigern. Es ist jedoch keine Durchsuchungs- und keine Festhaltebefugnis. Zwang ist nur bei einer eigenständigen Grundlage zulässig.',
          normIds: ['bgb-903'],
        },
        {
          id: 's3-b',
          text: '§ 127 Abs. 1 StPO – vorläufige Festnahme wegen der Verweigerung der Taschenkontrolle.',
          verdict: 'FALSCH',
          explanation:
            '§ 127 StPO verlangt eine frische Tat und zusätzlich Fluchtverdacht oder nicht sofort feststellbare Identität. Die Verweigerung einer Kontrolle erfüllt dies nicht.',
          misconception: 'Aus der Verweigerung einer Kontrolle automatisch eine Festnahmebefugnis ableiten.',
          normIds: ['stpo-127'],
        },
        {
          id: 's3-c',
          text: '§ 859 BGB – Selbsthilfe: die Kontrolle mit Gewalt durchsetzen.',
          verdict: 'FALSCH',
          explanation:
            '§ 859 BGB setzt verbotene Eigenmacht voraus und ist kein Instrument, um eine Zutrittsbedingung zu erzwingen.',
          misconception: 'Hausrecht → automatisch Gewalt nach § 859 BGB.',
          normIds: ['bgb-859'],
        },
        {
          id: 's3-d',
          text: 'Körperliche Durchsuchung als unmittelbare Folge des Hausrechts.',
          verdict: 'FALSCH',
          explanation:
            'Eine Durchsuchung gegen den Willen des Besuchers ist vom Hausrecht nicht gedeckt; sie wäre nur bei einer eigenständigen Befugnis zulässig.',
          misconception: 'Hausrecht → automatisch Durchsuchungsbefugnis.',
          normIds: ['bgb-903'],
        },
      ],
      correctOptions: ['s3-a'],
      explanation:
        'Als Grundlage kommt § 903 BGB (Hausrecht) in Betracht: Der Zutritt darf von der Kontrolle abhängig gemacht und verweigert werden. Eine Durchsuchung oder Festnahme ohne Einwilligung ist nicht zulässig.',
      authorityIds: ['authority-bgb-903-hausrecht'],
    },
    result: {
      behaviorResult:
        'Ruhig und höflich kommunizieren, Zutritt verweigern; keine Durchsuchung und keine Gewalt gegen den Willen des Besuchers.',
      legalResult:
        'Hausrecht des Betreibers nach § 903 BGB; Taschenkontrolle nur mit Einwilligung.',
      authorityResult:
        '§ 903 BGB – Hausrecht: Zutrittsverweigerung zulässig; keine Durchsuchungs- oder Festhaltebefugnis.',
      explanation:
        'Aus dem Hausrecht folgt keine Durchsuchungs- und keine Gewaltbefugnis. Ohne Einwilligung darf die Tasche nicht durchsucht werden; ohne Straftat besteht keine Festhaltebefugnis nach § 127 StPO.',
      modelSolution: {
        behavior:
          'Ruhig erklären, den Zutritt verweigern, deeskalierend bleiben, keine Durchsuchung und keine Gewalt.',
        legalClassification:
          'Hausrecht als Eigentümerbefugnis nach § 903 BGB; Taschenkontrolle nur mit Einwilligung.',
        legalBasis:
          '§ 903 BGB – Befugnisse des Eigentümers (Hausrecht): Der Betreiber darf den Zutritt unter Bedingungen stellen und verweigern.',
        reasoning:
          'Hausrecht ≠ Durchsuchungs- oder Gewaltbefugnis. Die Verweigerung der Kontrolle ist kein Hausfriedensbruch und keine frische Tat im Sinne des § 127 StPO.',
        limits:
          'Kein Zwang, keine Durchsuchung ohne Einwilligung, keine Festnahme ohne eigenständige Befugnis; bei aggressivem Verhalten deeskalieren und ggf. die Polizei verständigen.',
      },
    },
  },

  // ===========================================================================
  // FALL 10 – 13-Jähriger: Strafunmündigkeit ≠ fehlende Eingriffsbefugnis
  // ===========================================================================
  {
    id: 'jugendlicher-diebstahl',
    title: '13-Jähriger begeht Diebstahl',
    description:
      'Ein dreizehnjähriger Jugendlicher nimmt in einem Supermarkt eine Sache an sich und passiert den Kassenbereich.',
    topic: 'Strafrecht / Jugendlicher',
    difficulty: 4,
    clusters: ['Strafunmündigkeit', 'Jedermannsrecht'],
    legalReference: '§19 StGB, §127 StPO',
    followUp1: 'Darf gegen den Jugendlichen eine Anzeige erstattet werden?',
    followUp2: 'Darf der Jugendliche durchsucht werden?',
    originalCaseText:
      'Sie sind als Sicherheitskraft in einem Supermarkt eingesetzt. Sie beobachten, wie ein dreizehnjähriger Jugendlicher eine Flasche Getränk in seinen Rucksack steckt und den Kassenbereich verlässt, ohne zu bezahlen. Der Jugendliche ist Ihnen namentlich nicht bekannt und macht keine Angaben. Seine Erziehungsberechtigten sind nicht anwesend.',
    facts: [
      { id: 'f1', text: 'Sie sind als Sicherheitskraft im Verkaufsraum eines Supermarkts tätig.', legallyRelevant: false },
      { id: 'f2', text: 'Ein dreizehnjähriger Jugendlicher steckt eine Flasche Getränk in seinen Rucksack.', legallyRelevant: true },
      { id: 'f3', text: 'Der Jugendliche verlässt den Kassenbereich, ohne zu bezahlen.', legallyRelevant: true },
      { id: 'f4', text: 'Der Jugendliche ist namentlich nicht bekannt und macht keine Angaben.', legallyRelevant: true },
      { id: 'f5', text: 'Die Erziehungsberechtigten sind nicht anwesend.', legallyRelevant: true },
    ],
    stageOne: {
      prompt: 'Wie verhalten Sie sich?',
      options: [
        {
          id: 's1-a',
          text: 'Den Jugendlichen ruhig ansprechen, die Situation deeskalieren und Verstärkung bzw. die Polizei hinzuziehen.',
          verdict: 'RICHTIG',
          explanation:
            'Bei einem Jugendlichen ist besondere Zurückhaltung geboten. Ruhiges, deeskalierendes Vorgehen und das Hinzuziehen der Polizei sind sinnvoll.',
          normIds: ['stpo-127'],
        },
        {
          id: 's1-b',
          text: 'Die Erziehungsberechtigten informieren und den Vorgang dokumentieren.',
          verdict: 'RICHTIG',
          explanation:
            'Bei Minderjährigen sind die Erziehungsberechtigten zu informieren; der Vorfall ist zu dokumentieren.',
          normIds: [],
        },
        {
          id: 's1-c',
          text: 'Den Jugendlichen sofort körperlich festhalten und zu Boden bringen.',
          verdict: 'FALSCH',
          explanation:
            'Körperliche Gewalt ist ohne Prüfung der konkreten Voraussetzungen unzulässig; gegenüber Jugendlichen ist besondere Zurückhaltung geboten.',
          misconception: 'Tat erkannt → automatisch körperlich festhalten.',
          normIds: ['stpo-127'],
        },
        {
          id: 's1-d',
          text: 'Den Rucksack gegen den Willen des Jugendlichen durchsuchen.',
          verdict: 'FALSCH',
          explanation:
            'Eine Durchsuchung gegen den Willen des Jugendlichen ist nicht zulässig; sie ist nur mit Einwilligung möglich.',
          misconception: 'Tat erkannt → automatisch durchsuchen.',
          normIds: [],
        },
      ],
      correctOptions: ['s1-a', 's1-b'],
      explanation:
        'Ruhiges, deeskalierendes Vorgehen, Information der Erziehungsberechtigten und Dokumentation sind sinnvoll; Gewalt und Durchsuchung ohne Einwilligung sind unzulässig.',
    },
    stageTwo: {
      prompt: 'Was liegt rechtlich vor?',
      options: [
        {
          id: 's2-a',
          text: 'Strafunmündigkeit des Jugendlichen nach § 19 StGB (in der Knowledge Base nicht enthalten – als fehlend markiert).',
          verdict: 'RICHTIG',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Ein Kind unter 14 Jahren ist schuldunfähig und kann nicht bestraft werden. Die Tat bleibt gleichwohl ein möglicher Diebstahl; die Schuld entfällt, nicht aber die Tatsache.',
          normIds: ['stgb-242'],
        },
        {
          id: 's2-b',
          text: 'Verbotene Eigenmacht nach § 858 BGB durch die Wegnahme.',
          verdict: 'RICHTIG',
          legalLevel: 'PRIVATRECHT',
          explanation:
            'Die Wegnahme ohne Willen des Besitzers ist verbotene Eigenmacht – unabhängig davon, wer sie begeht.',
          normIds: ['bgb-858'],
        },
        {
          id: 's2-c',
          text: 'Strafbarkeit des Jugendlichen wegen vollendeten Diebstahls.',
          verdict: 'FALSCH',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Wegen der Strafunmündigkeit kann der Jugendliche nicht bestraft werden. Tatbestand und Schuld sind zu trennen.',
          misconception: 'Strafunmündigkeit übersehen und von einer Strafbarkeit des Kindes ausgehen.',
          normIds: ['stgb-242'],
        },
        {
          id: 's2-d',
          text: 'Notwehrlage gegen den Jugendlichen.',
          verdict: 'FALSCH',
          legalLevel: 'RECHTSBEGRIFF',
          explanation:
            'Es fehlt an einem gegenwärtigen rechtswidrigen Angriff auf ein Rechtsgut der Sicherheitskraft.',
          misconception: 'Jede Straftat eines anderen als Angriff im Sinne der Notwehr einordnen.',
          normIds: ['stgb-32'],
        },
      ],
      correctOptions: ['s2-a', 's2-b'],
      explanation:
        'Der Jugendliche ist strafunmündig (§ 19 StGB, in der Knowledge Base nicht enthalten); die Wegnahme ist zugleich verbotene Eigenmacht nach § 858 BGB.',
      classificationIds: ['classification-diebstahl-verdacht', 'classification-verbotene-eigenmacht'],
    },
    stageThree: {
      prompt: 'Mit welcher Rechtsgrundlage dürfen Sie eingreifen?',
      options: [
        {
          id: 's3-a',
          text: '§ 127 Abs. 1 StPO – vorläufige Festnahme prüfen: frische Tat und zusätzlich Fluchtverdacht oder Identität nicht sofort feststellbar; auch bei strafunmündigen Personen möglich.',
          verdict: 'RICHTIG',
          explanation:
            'Die Festhaltebefugnis des § 127 StPO knüpft an die Tat, nicht an die Schuld. Die Person ist auf frischer Tat betroffen und nicht bekannt; die Voraussetzungen sind zu prüfen.',
          normIds: ['stpo-127'],
        },
        {
          id: 's3-b',
          text: '§ 19 StGB als Festhaltebefugnis.',
          verdict: 'FALSCH',
          explanation:
            '§ 19 StGB regelt die Schuldunfähigkeit und ist keine Eingriffsbefugnis.',
          misconception: 'Schuldunfähigkeit mit fehlender Eingriffsbefugnis verwechseln.',
          normIds: [],
        },
        {
          id: 's3-c',
          text: 'Durchsuchung des Rucksacks ohne Einwilligung.',
          verdict: 'FALSCH',
          explanation:
            'Eine Durchsuchung gegen den Willen ist nicht zulässig; sie ist nur mit Einwilligung möglich.',
          misconception: 'Tat erkannt → automatisch durchsuchen.',
          normIds: [],
        },
        {
          id: 's3-d',
          text: 'Allein wegen der Tat ist der Jugendliche automatisch festzuhalten.',
          verdict: 'FALSCH',
          explanation:
            'Die Festhaltebefugnis folgt nicht allein aus der Tat; die Voraussetzungen des § 127 StPO müssen zusätzlich vorliegen.',
          misconception: 'Tat erkannt → automatisch festhalten.',
          normIds: ['stgb-242', 'stpo-127'],
        },
      ],
      correctOptions: ['s3-a'],
      explanation:
        'Als Grundlage kommt § 127 Abs. 1 StPO in Betracht – auch bei einem strafunmündigen Jugendlichen. Eine Durchsuchung ist nur mit Einwilligung zulässig.',
      authorityIds: ['authority-stpo-127'],
    },
    result: {
      behaviorResult:
        'Ruhig ansprechen, deeskalieren, Erziehungsberechtigte informieren, dokumentieren; keine Gewalt und keine Durchsuchung ohne Einwilligung.',
      legalResult:
        'Strafunmündigkeit nach § 19 StGB (in der Knowledge Base nicht enthalten) und verbotene Eigenmacht nach § 858 BGB.',
      authorityResult:
        '§ 127 Abs. 1 StPO – vorläufige Festnahme unter ihren Voraussetzungen; Durchsuchung nur mit Einwilligung.',
      explanation:
        'Strafunmündigkeit verhindert die Bestrafung, nicht aber die Festhaltebefugnis nach § 127 StPO. Diese knüpft an die Tat und ihre Voraussetzungen, nicht an die Schuld. Eine Durchsuchung ist nur mit Einwilligung zulässig.',
      modelSolution: {
        behavior:
          'Ruhig ansprechen, deeskalieren, Erziehungsberechtigte informieren, Polizei hinzuziehen, dokumentieren.',
        legalClassification:
          'Strafunmündigkeit (§ 19 StGB, in der Knowledge Base nicht enthalten) und verbotene Eigenmacht (§ 858 BGB).',
        legalBasis:
          '§ 127 Abs. 1 StPO – vorläufige Festnahme bei frischer Tat und Fluchtverdacht oder nicht sofort feststellbarer Identität, auch bei strafunmündigen Personen.',
        reasoning:
          'Schuldunfähigkeit ≠ fehlende Eingriffsbefugnis. Die Festhaltebefugnis folgt nicht aus der Schuld, sondern aus den Voraussetzungen des § 127 StPO.',
        limits:
          'Besondere Zurückhaltung gegenüber Jugendlichen; keine Durchsuchung ohne Einwilligung; Verhältnismäßigkeit; Erziehungsberechtigte informieren.',
      },
    },
  },

  // ===========================================================================
  // FALL 11 – Schlägerei: Angriff ≠ automatisch jede beliebige Gewalt
  // ===========================================================================
  {
    id: 'schlaegerei-disko',
    title: 'Schlägerei vor Diskothek',
    description:
      'Vor einer Diskothek geraten mehrere Personen in eine handgreifliche Auseinandersetzung.',
    topic: 'Notwehrpraxis',
    difficulty: 3,
    clusters: ['Notwehr', 'Deeskalation'],
    legalReference: '§32 StGB',
    followUp1: 'Wann endet die Notwehr?',
    followUp2: 'Darf Pfefferspray eingesetzt werden?',
    originalCaseText:
      'Sie sind als Sicherheitskraft vor einer Diskothek eingesetzt. Kurz vor Mitternacht geraten zwei Männer vor dem Eingang in eine handgreifliche Auseinandersetzung; beide schlagen aufeinander ein. Eine dritte Person versucht mitzuwirken. Gäste weichen zurück und rufen um Hilfe. Sie treffen als erste Sicherheitskraft am Ort ein.',
    facts: [
      { id: 'f1', text: 'Sie sind als Sicherheitskraft vor einer Diskothek eingesetzt.', legallyRelevant: false },
      { id: 'f2', text: 'Zwei Männer schlagen vor dem Eingang aufeinander ein.', legallyRelevant: true },
      { id: 'f3', text: 'Eine dritte Person versucht mitzuwirken.', legallyRelevant: true },
      { id: 'f4', text: 'Gäste weichen zurück und rufen um Hilfe.', legallyRelevant: true },
      { id: 'f5', text: 'Sie treffen als erste Sicherheitskraft am Ort ein.', legallyRelevant: true },
    ],
    stageOne: {
      prompt: 'Wie verhalten Sie sich?',
      options: [
        {
          id: 's1-a',
          text: 'Eigensicherung beachten, Verstärkung und die Polizei hinzuziehen und die Beteiligten trennen.',
          verdict: 'RICHTIG',
          explanation:
            'Eigenschutz, Verstärkung und das Trennen der Beteiligten sind die Kernmaßnahmen in einer laufenden Auseinandersetzung.',
          normIds: ['stpo-127'],
        },
        {
          id: 's1-b',
          text: 'Ruhig und bestimmt ansprechen, deeskalieren und das mildeste erforderliche Mittel wählen.',
          verdict: 'RICHTIG',
          explanation:
            'Deeskalation und das mildeste erforderliche Mittel entsprechen dem Verhältnismäßigkeitsgrundsatz.',
          normIds: ['stgb-32'],
        },
        {
          id: 's1-c',
          text: 'Unvermittelt selbst auf die Beteiligten einschlagen.',
          verdict: 'FALSCH',
          explanation:
            'Eine Verteidigung muss erforderlich und auf das notwendige Maß begrenzt sein; unvermittelte Gewalt ist keine zulässige Reaktion.',
          misconception: 'Angriff → automatisch jede beliebige Gewalt.',
          normIds: ['stgb-32'],
        },
        {
          id: 's1-d',
          text: 'Alle Beteiligten ohne Prüfung festhalten.',
          verdict: 'FALSCH',
          explanation:
            'Eine Festnahme setzt die Voraussetzungen des § 127 StPO voraus und ist nicht automatisch bei jeder Auseinandersetzung zulässig.',
          misconception: 'Auseinandersetzung → automatisch alle festhalten.',
          normIds: ['stpo-127'],
        },
      ],
      correctOptions: ['s1-a', 's1-b'],
      explanation:
        'Eigensicherung, Verstärkung, Polizei, Trennung der Beteiligten und deeskalierendes Vorgehen mit dem mildesten Mittel sind sinnvoll.',
    },
    stageTwo: {
      prompt: 'Was liegt rechtlich vor?',
      options: [
        {
          id: 's2-a',
          text: 'Gegenwärtiger rechtswidriger Angriff.',
          verdict: 'RICHTIG',
          legalLevel: 'RECHTSBEGRIFF',
          explanation:
            'Die wechselseitigen Schläge begründen einen gegenwärtigen rechtswidrigen Angriff; er ist Voraussetzung der Notwehr.',
          normIds: ['stgb-32'],
        },
        {
          id: 's2-b',
          text: 'Mögliche Körperverletzung nach § 223 StGB.',
          verdict: 'RICHTIG',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Die Schläge können den Tatbestand der Körperverletzung erfüllen. Die Tatbestandsmerkmale sind am konkreten Geschehen zu prüfen.',
          normIds: ['stgb-223'],
        },
        {
          id: 's2-c',
          text: 'Rechtfertigender Notstand wegen der Gefahr.',
          verdict: 'FALSCH',
          legalLevel: 'RECHTSBEGRIFF',
          explanation:
            'Eine Gefahr ist nicht dasselbe wie ein Angriff. § 34 StGB ist nicht automatisch einschlägig.',
          misconception: 'Gefahr → automatisch Notstand.',
          normIds: ['stgb-34'],
        },
        {
          id: 's2-d',
          text: 'Raub nach § 249 StGB.',
          verdict: 'FALSCH',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Eine Wegnahme mit qualifizierter Gewalt oder Drohung zum Zweck der Zueignung ist nicht erkennbar.',
          misconception: 'Jede Gewalt mit einem Raubdelikt gleichsetzen.',
          normIds: ['stgb-249'],
        },
      ],
      correctOptions: ['s2-a', 's2-b'],
      explanation:
        'Es liegt ein gegenwärtiger rechtswidriger Angriff vor; zudem kommt eine mögliche Körperverletzung nach § 223 StGB in Betracht.',
      classificationIds: ['classification-angriff', 'classification-koerperverletzung'],
    },
    stageThree: {
      prompt: 'Mit welcher Rechtsgrundlage dürfen Sie eingreifen?',
      options: [
        {
          id: 's3-a',
          text: '§ 32 StGB – Notwehr: erforderliche Verteidigung gegen den gegenwärtigen rechtswidrigen Angriff.',
          verdict: 'RICHTIG',
          explanation:
            'Notwehr erlaubt die erforderliche Verteidigung. Sie ist auf das mildeste erforderliche Mittel begrenzt und endet mit dem Angriff.',
          normIds: ['stgb-32'],
        },
        {
          id: 's3-b',
          text: 'Allein wegen des Angriffs ist jede beliebige Gewalt erlaubt.',
          verdict: 'FALSCH',
          explanation:
            'Die Verteidigung muss erforderlich sein; ein Angriff rechtfertigt keine beliebige Gewalt.',
          misconception: 'Angriff → automatisch jede beliebige Gewalt.',
          normIds: ['stgb-32'],
        },
        {
          id: 's3-c',
          text: '§ 34 StGB – rechtfertigender Notstand wegen der Gefahr durch die Schlägerei.',
          verdict: 'FALSCH',
          explanation:
            'Die Notwehr ist gegenüber dem Notstand vorrangig; § 34 StGB ist nicht automatisch einschlägig.',
          misconception: 'Gefahr → automatisch § 34 StGB.',
          normIds: ['stgb-34'],
        },
        {
          id: 's3-d',
          text: 'Festnahme aller Beteiligten ohne Prüfung der Voraussetzungen.',
          verdict: 'FALSCH',
          explanation:
            '§ 127 StPO setzt frische Tat und zusätzlich Fluchtverdacht oder nicht sofort feststellbare Identität voraus.',
          misconception: 'Auseinandersetzung → automatisch alle festhalten.',
          normIds: ['stpo-127'],
        },
      ],
      correctOptions: ['s3-a'],
      explanation:
        'Als Grundlage kommt § 32 StGB (Notwehr) in Betracht: erforderliche Verteidigung, mildestes Mittel, Ende mit dem Angriff. Der Pfefferspray-Einsatz ist nur erforderlich und verhältnismäßig zulässig.',
      authorityIds: ['authority-stgb-32'],
    },
    result: {
      behaviorResult:
        'Eigensicherung, Verstärkung und Polizei hinzuziehen, Beteiligte trennen, deeskalieren, mildestes Mittel wählen.',
      legalResult:
        'Gegenwärtiger rechtswidriger Angriff und mögliche Körperverletzung nach § 223 StGB.',
      authorityResult:
        '§ 32 StGB – Notwehr: erforderliche Verteidigung, mildestes Mittel, Ende mit dem Angriff.',
      explanation:
        'Ein Angriff rechtfertigt keine beliebige Gewalt. Die Verteidigung muss erforderlich und verhältnismäßig sein und endet mit dem Angriff; Pfefferspray ist nur erforderlich und verhältnismäßig zulässig.',
      modelSolution: {
        behavior:
          'Eigensicherung, Verstärkung und Polizei, Beteiligte trennen, deeskalieren, mildestes Mittel.',
        legalClassification:
          'Gegenwärtiger rechtswidriger Angriff; mögliche Körperverletzung (§ 223 StGB).',
        legalBasis:
          '§ 32 StGB – Notwehr: erforderliche Verteidigung gegen einen gegenwärtigen rechtswidrigen Angriff.',
        reasoning:
          'Angriff ≠ automatisch jede beliebige Gewalt. Die Verteidigung muss erforderlich sein; die Notwehr endet mit dem Angriff.',
        limits:
          'Mildestes erforderliches Mittel; Verhältnismäßigkeit; Pfefferspray nur bei Erforderlichkeit; keine Festnahme ohne die Voraussetzungen des § 127 StPO.',
      },
    },
  },

  // ===========================================================================
  // FALL 12 – Fettbrand: Brandklasse F, kein Wasser
  // ===========================================================================
  {
    id: 'fettbrand-kueche',
    title: 'Fettbrand in Küche',
    description:
      'In einer Großküche entzündet sich erhitztes Speiseöl; eine Mitarbeiterin greift nach Wasser.',
    topic: 'Brandschutz',
    difficulty: 3,
    clusters: ['Brandklasse F', 'Löschmittel'],
    legalReference: 'DIN EN 2',
    followUp1: 'Warum darf kein Wasser eingesetzt werden?',
    followUp2: 'Welche Löschmittel sind geeignet?',
    originalCaseText:
      'Sie sind als Sicherheitskraft in einem Objekt mit angeschlossener Großküche eingesetzt. In der Küche entzündet sich erhitztes Speiseöl in einer Fritteuse; eine Flamme schlägt aus dem Behälter. Eine Mitarbeiterin greift nach einem Wassereimer, um das Feuer zu löschen. Weitere Personen befinden sich im Raum. Sie werden zur Unterstützung gerufen.',
    facts: [
      { id: 'f1', text: 'Sie sind als Sicherheitskraft in einem Objekt mit angeschlossener Großküche eingesetzt.', legallyRelevant: false },
      { id: 'f2', text: 'In einer Fritteuse entzündet sich erhitztes Speiseöl; eine Flamme schlägt aus dem Behälter.', legallyRelevant: true },
      { id: 'f3', text: 'Eine Mitarbeiterin will das Feuer mit Wasser löschen.', legallyRelevant: true },
      { id: 'f4', text: 'Weitere Personen befinden sich im Raum.', legallyRelevant: true },
      { id: 'f5', text: 'Sie werden zur Unterstützung gerufen.', legallyRelevant: false },
    ],
    stageOne: {
      prompt: 'Wie verhalten Sie sich?',
      options: [
        {
          id: 's1-a',
          text: 'Den Wassereinsatz sofort verhindern und einen Fettbrandlöscher oder eine Löschdecke verwenden.',
          verdict: 'RICHTIG',
          explanation:
            'Ein Fettbrand darf niemals mit Wasser gelöscht werden. Geeignet sind ein Fettbrandlöscher oder eine Löschdecke.',
          normIds: [],
        },
        {
          id: 's1-b',
          text: 'Personen warnen, den Bereich räumen und die Feuerwehr alarmieren.',
          verdict: 'RICHTIG',
          explanation:
            'Personenschutz, Räumung und Alarmierung der Feuerwehr haben Vorrang vor der Sachrettung.',
          normIds: ['stgb-34'],
        },
        {
          id: 's1-c',
          text: 'Das brennende Fett mit Wasser ablöschen.',
          verdict: 'FALSCH',
          explanation:
            'Wasser führt bei brennendem Fett zu einer schlagartigen Verdampfung und einer Fettexplosion.',
          misconception: 'Fettbrand → mit Wasser löschen.',
          normIds: [],
        },
        {
          id: 's1-d',
          text: 'Nichts tun und die Küche verlassen.',
          verdict: 'FALSCH',
          explanation:
            'Bei einer gegenwärtigen Gefahr für Personen ist ein sofortiges Handeln geboten; Warnen und Alarmieren sind Pflicht.',
          misconception: 'Gefahr unterschätzen und notwendiges Eingreifen unterlassen.',
          normIds: ['stgb-34'],
        },
      ],
      correctOptions: ['s1-a', 's1-b'],
      explanation:
        'Wasser verhindern, geeignete Löschmittel einsetzen, Personen warnen, räumen und die Feuerwehr alarmieren.',
    },
    stageTwo: {
      prompt: 'Was liegt rechtlich vor?',
      options: [
        {
          id: 's2-a',
          text: 'Gegenwärtige Gefahr für Leben, Leib und Sachen durch den Brand.',
          verdict: 'RICHTIG',
          legalLevel: 'RECHTSBEGRIFF',
          explanation:
            'Der offene Brand gefährdet Personen und Sachen unmittelbar; es liegt eine gegenwärtige Gefahr vor.',
          normIds: ['stgb-34'],
        },
        {
          id: 's2-b',
          text: 'Fettbrand (Brandklasse F): Wasser ist als Löschmittel ungeeignet.',
          verdict: 'RICHTIG',
          legalLevel: 'RECHTSBEGRIFF',
          explanation:
            'Ein Fettbrand gehört zur Brandklasse F. Wasser ist ungeeignet und gefährlich; einzusetzen sind Fettbrandlöscher oder Löschdecke (DIN EN 2).',
          normIds: [],
        },
        {
          id: 's2-c',
          text: 'Wasser ist das geeignete Löschmittel für brennendes Fett.',
          verdict: 'FALSCH',
          legalLevel: 'RECHTSBEGRIFF',
          explanation:
            'Wasser verdampft im heißen Fett schlagartig und reißt brennendes Fett mit sich – es kommt zur Fettexplosion.',
          misconception: 'Fettbrand → Wasser (Fettexplosion).',
          normIds: [],
        },
        {
          id: 's2-d',
          text: 'Gegenwärtiger rechtswidriger Angriff im Sinne der Notwehr.',
          verdict: 'FALSCH',
          legalLevel: 'RECHTSBEGRIFF',
          explanation:
            'Es liegt kein Angriff einer Person vor, sondern eine Gefahr. Gefahr ≠ Angriff.',
          misconception: 'Gefahr und Angriff vermischen.',
          normIds: ['stgb-32'],
        },
      ],
      correctOptions: ['s2-a', 's2-b'],
      explanation:
        'Es liegt eine gegenwärtige Gefahr für Personen und Sachen vor. Der Fettbrand (Brandklasse F) darf nicht mit Wasser gelöscht werden.',
      classificationIds: ['classification-gegenwaertige-gefahr'],
    },
    stageThree: {
      prompt: 'Mit welcher Rechtsgrundlage dürfen Sie eingreifen?',
      options: [
        {
          id: 's3-a',
          text: '§ 34 StGB – rechtfertigender Notstand: Eingreifen zur Abwendung der gegenwärtigen Gefahr für Personen und Sachen.',
          verdict: 'RICHTIG',
          explanation:
            'Die Gefahrenabwehr ist über § 34 StGB gerechtfertigt, wenn die Gefahr gegenwärtig und nicht anders abwendbar ist und das geschützte Interesse wesentlich überwiegt.',
          normIds: ['stgb-34'],
        },
        {
          id: 's3-b',
          text: 'Löschmittel nach Brandklasse F (DIN EN 2): Fettbrandlöscher oder Löschdecke.',
          verdict: 'RICHTIG',
          explanation:
            'Die technische Grundlage für die Mittelwahl ist die Brandklasse F nach DIN EN 2; sie bestimmt das geeignete Löschmittel.',
          normIds: [],
        },
        {
          id: 's3-c',
          text: 'Löschen mit Wasser als erste Wahl.',
          verdict: 'FALSCH',
          explanation:
            'Wasser ist bei Fettbränden unzulässig und lebensgefährlich.',
          misconception: 'Fettbrand → Wasser.',
          normIds: [],
        },
        {
          id: 's3-d',
          text: '§ 32 StGB – Notwehr gegen den Brand.',
          verdict: 'FALSCH',
          explanation:
            'Ein Brand ist kein Angriff im Sinne der Notwehr; hier ist die Gefahrenabwehr maßgeblich.',
          misconception: 'Gefahr → automatisch Notwehr.',
          normIds: ['stgb-32'],
        },
      ],
      correctOptions: ['s3-a', 's3-b'],
      explanation:
        'Das Eingreifen ist über § 34 StGB (rechtfertigender Notstand) gerechtfertigt. Die Mittelwahl richtet sich nach der Brandklasse F (DIN EN 2): Fettbrandlöscher oder Löschdecke, niemals Wasser.',
      authorityIds: ['authority-stgb-34'],
    },
    result: {
      behaviorResult:
        'Wassereinsatz verhindern, Fettbrandlöscher oder Löschdecke verwenden, Personen warnen und die Feuerwehr alarmieren.',
      legalResult:
        'Gegenwärtige Gefahr für Personen und Sachen; Fettbrand der Brandklasse F.',
      authorityResult:
        '§ 34 StGB – rechtfertigender Notstand; Löschmittel nach Brandklasse F (DIN EN 2).',
      explanation:
        'Wasser ist bei einem Fettbrand lebensgefährlich (Fettexplosion). Die Gefahrenabwehr ist über § 34 StGB gerechtfertigt; die Mittelwahl folgt der Brandklasse F nach DIN EN 2.',
      modelSolution: {
        behavior:
          'Wasser verhindern, Fettbrandlöscher oder Löschdecke nutzen, Personen warnen und räumen, Feuerwehr alarmieren.',
        legalClassification:
          'Gegenwärtige Gefahr für Leben, Leib und Sachen; Fettbrand der Brandklasse F.',
        legalBasis:
          '§ 34 StGB – rechtfertigender Notstand; Mittelwahl nach Brandklasse F (DIN EN 2): Fettbrandlöscher oder Löschdecke.',
        reasoning:
          'Gefahr → nicht automatisch jede Maßnahme; die Gefahrenabwehr ist über § 34 StGB gerechtfertigt. Wasser ist wegen der Fettexplosion unzulässig.',
        limits:
          'Erforderlichkeit und Angemessenheit; Eigenschutz; bei Unsicherheit Feuerwehr alarmieren und den Bereich räumen.',
      },
    },
  },

  // ===========================================================================
  // FALL 13 – Videoüberwachung: Datenschutz als Rechtsgrundlagenproblem
  // ===========================================================================
  {
    id: 'videoueberwachung',
    title: 'Videoüberwachung installiert',
    description:
      'Ein Einkaufszentrum lässt Videoüberwachung installieren; Zulässigkeit, Hinweise und Speicherdauer sind unklar.',
    topic: 'Datenschutz',
    difficulty: 4,
    clusters: ['Datenschutz', 'Videoüberwachung'],
    legalReference: 'Art. 6 DSGVO',
    followUp1: 'Wie lange dürfen die Aufnahmen gespeichert werden?',
    followUp2: 'Wo ist Videoüberwachung unzulässig?',
    originalCaseText:
      'Sie sind als Sicherheitskraft in einem Einkaufszentrum eingesetzt. Der Betreiber lässt eine Videoüberwachung installieren, die auch die Kundengänge und den Eingangsbereich erfasst. Die Bilder werden ohne Hinweisschild aufgenommen und mehrere Wochen gespeichert. Sie werden gefragt, ob dies zulässig ist. Auch Umkleidekabinen und Toiletten sollen erfasst werden.',
    facts: [
      { id: 'f1', text: 'Sie sind als Sicherheitskraft in einem Einkaufszentrum eingesetzt.', legallyRelevant: false },
      { id: 'f2', text: 'Eine Videoüberwachung erfasst Kundengänge und Eingangsbereich.', legallyRelevant: true },
      { id: 'f3', text: 'Die Bilder werden ohne Hinweisschild aufgenommen.', legallyRelevant: true },
      { id: 'f4', text: 'Die Aufnahmen werden mehrere Wochen gespeichert.', legallyRelevant: true },
      { id: 'f5', text: 'Auch Umkleidekabinen und Toiletten sollen erfasst werden.', legallyRelevant: true },
    ],
    stageOne: {
      prompt: 'Wie verhalten Sie sich?',
      options: [
        {
          id: 's1-a',
          text: 'Die Bedenken dem Vorgesetzten melden und auf Hinweisschilder sowie eine begrenzte Speicherdauer hinweisen.',
          verdict: 'RICHTIG',
          explanation:
            'Datenschutzrechtliche Bedenken gehören an den Betreiber bzw. den Datenschutzbeauftragten; Hinweispflicht und Speicherbegrenzung sind zentrale Anforderungen.',
          normIds: [],
        },
        {
          id: 's1-b',
          text: 'Anregen, die Überwachung von Toiletten und Umkleiden zu unterlassen und den Datenschutzbeauftragten einzuschalten.',
          verdict: 'RICHTIG',
          explanation:
            'Toiletten und Umkleiden sind besonders geschützte Bereiche; ihre Überwachung ist unzulässig. Der Datenschutzbeauftragte ist einzubinden.',
          normIds: [],
        },
        {
          id: 's1-c',
          text: 'Die Überwachung ohne weitere Prüfung gutheißen.',
          verdict: 'FALSCH',
          explanation:
            'Videoüberwachung ist nur bei einer Rechtsgrundlage und unter Beachtung der Verhältnismäßigkeit zulässig; sie darf nicht ungeprüft gebilligt werden.',
          misconception: 'Überwachung als Selbstverständlichkeit ansehen, ohne Rechtsgrundlage zu prüfen.',
          normIds: [],
        },
        {
          id: 's1-d',
          text: 'Aufnahmen heimlich an Dritte weitergeben.',
          verdict: 'FALSCH',
          explanation:
            'Eine zweckfremde Weitergabe von Aufnahmen ist datenschutzrechtlich unzulässig.',
          misconception: 'Überwachungsdaten beliebig verwenden.',
          normIds: [],
        },
      ],
      correctOptions: ['s1-a', 's1-b'],
      explanation:
        'Bedenken melden, Hinweispflicht und Speicherbegrenzung ansprechen, Toiletten und Umkleiden ausnehmen und den Datenschutzbeauftragten einschalten.',
    },
    stageTwo: {
      prompt: 'Was liegt rechtlich vor?',
      options: [
        {
          id: 's2-a',
          text: 'Verarbeitung personenbezogener Daten durch Videoüberwachung – sie bedarf einer Rechtsgrundlage.',
          verdict: 'RICHTIG',
          legalLevel: 'OEFFENTLICHES_RECHT',
          explanation:
            'Die Aufzeichnung identifizierbarer Personen ist eine Datenverarbeitung und nur mit Rechtsgrundlage zulässig (Art. 6 DSGVO; in der Knowledge Base nicht enthalten – als fehlend markiert).',
          normIds: [],
        },
        {
          id: 's2-b',
          text: 'Berechtigtes Interesse als mögliche Rechtfertigung – unter Verhältnismäßigkeit, Hinweispflicht und Speicherbegrenzung.',
          verdict: 'RICHTIG',
          legalLevel: 'OEFFENTLICHES_RECHT',
          explanation:
            'Ein berechtigtes Interesse des Betreibers kann die Verarbeitung tragen, wenn sie verhältnismäßig ist, darauf hingewiesen wird und die Speicherung begrenzt bleibt.',
          normIds: [],
        },
        {
          id: 's2-c',
          text: 'Die Überwachung von Toiletten und Umkleiden ist ohne Weiteres zulässig.',
          verdict: 'FALSCH',
          legalLevel: 'OEFFENTLICHES_RECHT',
          explanation:
            'Toiletten und Umkleiden sind besonders geschützte Bereiche; ihre Überwachung ist unzulässig.',
          misconception: 'Besonders geschützte Bereiche wie normale Flächen behandeln.',
          normIds: [],
        },
        {
          id: 's2-d',
          text: 'Aufnahmen dürfen ohne zeitliche Begrenzung gespeichert werden.',
          verdict: 'FALSCH',
          legalLevel: 'OEFFENTLICHES_RECHT',
          explanation:
            'Für die Speicherung gilt die Speicherbegrenzung: nur so lange, wie es für den Zweck erforderlich ist.',
          misconception: 'Daten unbegrenzt speichern.',
          normIds: [],
        },
      ],
      correctOptions: ['s2-a', 's2-b'],
      explanation:
        'Videoüberwachung ist eine Datenverarbeitung und braucht eine Rechtsgrundlage; ein berechtigtes Interesse kann sie tragen, wenn Verhältnismäßigkeit, Hinweispflicht und Speicherbegrenzung beachtet werden.',
      classificationIds: [],
    },
    stageThree: {
      prompt: 'Mit welcher Rechtsgrundlage dürfen Sie eingreifen?',
      options: [
        {
          id: 's3-a',
          text: 'Art. 6 DSGVO – berechtigtes Interesse als Rechtsgrundlage (in der Knowledge Base nicht enthalten – als fehlend markiert): nur verhältnismäßig, mit Hinweisschildern und Speicherbegrenzung.',
          verdict: 'RICHTIG',
          explanation:
            'Die Verarbeitung stützt sich auf eine Rechtsgrundlage nach Art. 6 DSGVO. Erforderlich sind Verhältnismäßigkeit, Hinweisschilder und eine begrenzte Speicherdauer; Toiletten und Umkleiden sind ausgenommen.',
          normIds: [],
        },
        {
          id: 's3-b',
          text: 'Videoüberwachung ist ohne jede Rechtsgrundlage frei zulässig.',
          verdict: 'FALSCH',
          explanation:
            'Ohne Rechtsgrundlage ist die Verarbeitung personenbezogener Daten unzulässig.',
          misconception: 'Überwachung ohne Rechtsgrundlage für zulässig halten.',
          normIds: [],
        },
        {
          id: 's3-c',
          text: 'Toiletten und Umkleiden dürfen überwacht werden, weil sie zum Objekt gehören.',
          verdict: 'FALSCH',
          explanation:
            'Der räumliche Bezug rechtfertigt keine Überwachung besonders geschützter Bereiche; sie ist unzulässig.',
          misconception: 'Hausrecht → automatisch Überwachungsbefugnis in allen Räumen.',
          normIds: [],
        },
        {
          id: 's3-d',
          text: 'Aufnahmen dürfen unbegrenzt gespeichert werden.',
          verdict: 'FALSCH',
          explanation:
            'Die Speicherbegrenzung verlangt, Aufnahmen nur so lange zu speichern, wie es erforderlich ist.',
          misconception: 'Daten unbegrenzt speichern.',
          normIds: [],
        },
      ],
      correctOptions: ['s3-a'],
      explanation:
        'Rechtsgrundlage ist Art. 6 DSGVO (berechtigtes Interesse) – verhältnismäßig, mit Hinweisschildern und Speicherbegrenzung; Toiletten und Umkleiden bleiben ausgenommen.',
      authorityIds: [],
    },
    result: {
      behaviorResult:
        'Bedenken melden, Hinweisschilder und Speicherbegrenzung ansprechen, geschützte Bereiche ausnehmen, Datenschutzbeauftragten einschalten.',
      legalResult:
        'Verarbeitung personenbezogener Daten durch Videoüberwachung; Rechtsgrundlage erforderlich.',
      authorityResult:
        'Art. 6 DSGVO – berechtigtes Interesse, verhältnismäßig, mit Hinweisen und Speicherbegrenzung (in der Knowledge Base nicht enthalten – als fehlend markiert).',
      explanation:
        'Videoüberwachung ist nur mit Rechtsgrundlage und unter Verhältnismäßigkeit zulässig. Erforderlich sind Hinweisschilder und Speicherbegrenzung; Toiletten und Umkleiden dürfen nicht überwacht werden.',
      modelSolution: {
        behavior:
          'Bedenken melden, Hinweispflicht und Speicherbegrenzung ansprechen, geschützte Bereiche ausnehmen, Datenschutzbeauftragten einschalten.',
        legalClassification:
          'Verarbeitung personenbezogener Daten; Rechtsgrundlage und Verhältnismäßigkeit erforderlich.',
        legalBasis:
          'Art. 6 DSGVO – berechtigtes Interesse (in der Knowledge Base nicht enthalten – als fehlend markiert); Verhältnismäßigkeit, Hinweisschilder, Speicherbegrenzung.',
        reasoning:
          'Überwachung ≠ automatisch zulässig. Sie braucht eine Rechtsgrundlage, muss verhältnismäßig sein und besonders geschützte Bereiche ausnehmen.',
        limits:
          'Speicherbegrenzung; Hinweispflicht; keine Überwachung von Toiletten und Umkleiden; Datenschutzbeauftragten einbinden.',
      },
    },
  },

  // ===========================================================================
  // FALL 14 – Schreckschusswaffe im Dienst: kein dienstliches Bedürfnis
  // ===========================================================================
  {
    id: 'schreckschusswaffe-dienst',
    title: 'Schreckschusswaffe im Dienst',
    description:
      'Ein Sicherheitsmitarbeiter führt ohne Anordnung eine Schreckschusswaffe im Objektschutzdienst mit.',
    topic: 'Waffenrecht',
    difficulty: 4,
    clusters: ['Waffenrecht', 'Dienstrecht'],
    legalReference: 'WaffG, DGUV V23',
    followUp1: 'Reicht der kleine Waffenschein für den Dienst aus?',
    followUp2: 'Ist eine Strafbarkeit möglich?',
    originalCaseText:
      'Sie sind als Sicherheitskraft bei einem Bewachungsunternehmen angestellt und werden für einen Objektschutzauftrag eingeteilt. Ein Kollege führt während des Dienstes eine Schreckschusswaffe mit sich und erklärt, diese nur zur Selbstverteidigung zu benötigen. Der Arbeitgeber hat das Mitführen weder angeordnet noch erlaubt. Ein dienstliches Bedürfnis für die Waffe ist nicht erkennbar. Sie werden gefragt, wie dies rechtlich zu bewerten ist.',
    facts: [
      { id: 'f1', text: 'Sie sind als Sicherheitskraft bei einem Bewachungsunternehmen angestellt.', legallyRelevant: false },
      { id: 'f2', text: 'Sie werden für einen Objektschutzauftrag eingeteilt.', legallyRelevant: true },
      { id: 'f3', text: 'Ein Kollege führt während des Dienstes eine Schreckschusswaffe mit sich.', legallyRelevant: true },
      { id: 'f4', text: 'Der Arbeitgeber hat das Mitführen weder angeordnet noch erlaubt.', legallyRelevant: true },
      { id: 'f5', text: 'Ein dienstliches Bedürfnis für die Waffe ist nicht erkennbar.', legallyRelevant: true },
    ],
    stageOne: {
      prompt: 'Wie verhalten Sie sich?',
      options: [
        {
          id: 's1-a',
          text: 'Den Vorgesetzten informieren und darauf hinwirken, dass das Mitführen unterbleibt.',
          verdict: 'RICHTIG',
          explanation:
            'Das Mitführen ohne Anordnung und ohne dienstliches Bedürfnis ist zu unterbinden; der Vorgesetzte ist zu informieren.',
          normIds: [],
        },
        {
          id: 's1-b',
          text: 'Die Dienstanweisung beachten und die Waffe nicht selbst im Dienst führen.',
          verdict: 'RICHTIG',
          explanation:
            'Dienstanweisungen und die waffenrechtlichen Vorgaben sind zu beachten; ein eigenmächtiges Mitführen ist unzulässig.',
          normIds: [],
        },
        {
          id: 's1-c',
          text: 'Die Waffe ohne Erlaubnis und ohne Bedürfnis selbst im Dienst tragen.',
          verdict: 'FALSCH',
          explanation:
            'Das Mitführen einer Schreckschusswaffe im Dienst ist ohne Erlaubnis und dienstliches Bedürfnis unzulässig.',
          misconception: 'Waffe im Dienst als Selbstverständlichkeit ansehen.',
          normIds: [],
        },
        {
          id: 's1-d',
          text: 'Die Waffe ohne konkreten Anlass einsetzen.',
          verdict: 'FALSCH',
          explanation:
            'Ein Waffeneinsatz setzt eine Rechtsgrundlage und eine konkrete Gefahren- oder Angriffslage voraus.',
          misconception: 'Waffe als allgemeines Einsatzmittel ansehen.',
          normIds: [],
        },
      ],
      correctOptions: ['s1-a', 's1-b'],
      explanation:
        'Vorgesetzten informieren, Mitführen unterbinden und die Dienstanweisung beachten; ein eigenmächtiges Mitführen oder Einsetzen ist unzulässig.',
    },
    stageTwo: {
      prompt: 'Was liegt rechtlich vor?',
      options: [
        {
          id: 's2-a',
          text: 'Waffenrechtliche Erlaubnispflicht: Das Mitführen einer Schreckschusswaffe im Dienst ist grundsätzlich unzulässig.',
          verdict: 'RICHTIG',
          legalLevel: 'OEFFENTLICHES_RECHT',
          explanation:
            'Das Führen einer Schusswaffe ist erlaubnispflichtig. Im Dienst tritt die waffenrechtliche zur dienstrechtlichen Bewertung hinzu (WaffG; in der Knowledge Base nicht enthalten – als fehlend markiert).',
          normIds: [],
        },
        {
          id: 's2-b',
          text: 'Kein dienstliches Bedürfnis; Verstoß gegen WaffG und DGUV V23.',
          verdict: 'RICHTIG',
          legalLevel: 'OEFFENTLICHES_RECHT',
          explanation:
            'Ohne dienstliches Bedürfnis und ohne Erlaubnis ist das Mitführen unzulässig; die DGUV V23 (Wach- und Sicherungsdienste) ist zu beachten.',
          normIds: [],
        },
        {
          id: 's2-c',
          text: 'Der kleine Waffenschein genügt für das dienstliche Mitführen.',
          verdict: 'FALSCH',
          legalLevel: 'OEFFENTLICHES_RECHT',
          explanation:
            'Der kleine Waffenschein deckt das Führen zu privaten Zwecken, nicht das dienstliche Mitführen im Bewachungsgewerbe.',
          misconception: 'Kleiner Waffenschein → automatisch Dienstbefugnis.',
          normIds: [],
        },
        {
          id: 's2-d',
          text: 'Das Mitführen ist ohne Weiteres erlaubt, weil es der Selbstverteidigung dient.',
          verdict: 'FALSCH',
          legalLevel: 'OEFFENTLICHES_RECHT',
          explanation:
            'Die behauptete Selbstverteidigungsabsicht ersetzt weder Erlaubnis noch dienstliches Bedürfnis.',
          misconception: 'Selbstverteidigungsabsicht als Erlaubnis ansehen.',
          normIds: [],
        },
      ],
      correctOptions: ['s2-a', 's2-b'],
      explanation:
        'Das Mitführen einer Schreckschusswaffe im Dienst ist grundsätzlich unzulässig: keine Erlaubnis, kein dienstliches Bedürfnis, Verstoß gegen WaffG und DGUV V23.',
      classificationIds: [],
    },
    stageThree: {
      prompt: 'Mit welcher Rechtsgrundlage dürfen Sie eingreifen?',
      options: [
        {
          id: 's3-a',
          text: 'WaffG i. V. m. DGUV V23 – Mitführen nur bei waffenrechtlicher Erlaubnis und dienstlichem Bedürfnis (in der Knowledge Base nicht enthalten – als fehlend markiert).',
          verdict: 'RICHTIG',
          explanation:
            'Ein Mitführen im Dienst kommt nur bei Erlaubnis und anerkanntem dienstlichem Bedürfnis in Betracht; die DGUV V23 verlangt zusätzliche Vorgaben. Hier fehlt beides.',
          normIds: [],
        },
        {
          id: 's3-b',
          text: 'Der kleine Waffenschein reicht für dienstliche Zwecke.',
          verdict: 'FALSCH',
          explanation:
            'Der kleine Waffenschein ist keine Grundlage für das dienstliche Mitführen.',
          misconception: 'Kleiner Waffenschein → Dienstbefugnis.',
          normIds: [],
        },
        {
          id: 's3-c',
          text: 'Die Waffe darf bei jeder Störung eingesetzt werden.',
          verdict: 'FALSCH',
          explanation:
            'Ein Einsatz setzt eine Rechtsgrundlage und eine konkrete Lage voraus; ein allgemeines Einsatzrecht besteht nicht.',
          misconception: 'Waffe als allgemeines Einsatzmittel ansehen.',
          normIds: [],
        },
        {
          id: 's3-d',
          text: 'Eine Strafbarkeit ist ausgeschlossen.',
          verdict: 'FALSCH',
          explanation:
            'Je nach Konstellation kann das Führen ohne Erlaubnis strafbar sein; ein Ausschluss besteht nicht.',
          misconception: 'Waffenrechtsverstöße für straflos halten.',
          normIds: [],
        },
      ],
      correctOptions: ['s3-a'],
      explanation:
        'Das Mitführen im Dienst ist nur bei waffenrechtlicher Erlaubnis und dienstlichem Bedürfnis zulässig (WaffG, DGUV V23 – in der Knowledge Base nicht enthalten). Der kleine Waffenschein genügt nicht; eine Strafbarkeit ist je nach Konstellation möglich.',
      authorityIds: [],
    },
    result: {
      behaviorResult:
        'Vorgesetzten informieren, Mitführen unterbinden, Dienstanweisung beachten; kein eigenmächtiges Mitführen oder Einsetzen.',
      legalResult:
        'Waffenrechtliche Erlaubnispflicht; kein dienstliches Bedürfnis; Verstoß gegen WaffG und DGUV V23.',
      authorityResult:
        'Mitführen nur bei Erlaubnis und dienstlichem Bedürfnis (WaffG, DGUV V23 – in der Knowledge Base nicht enthalten).',
      explanation:
        'Grundsätzlich unzulässig: Es fehlt an Erlaubnis und dienstlichem Bedürfnis. Der kleine Waffenschein deckt private Zwecke, nicht den Dienst; eine Strafbarkeit ist je nach Konstellation möglich.',
      modelSolution: {
        behavior:
          'Vorgesetzten informieren, Mitführen unterbinden, Dienstanweisung beachten.',
        legalClassification:
          'Waffenrechtliche Erlaubnispflicht; kein dienstliches Bedürfnis; Verstoß gegen WaffG und DGUV V23.',
        legalBasis:
          'WaffG i. V. m. DGUV V23 – Mitführen nur bei Erlaubnis und dienstlichem Bedürfnis (in der Knowledge Base nicht enthalten – als fehlend markiert).',
        reasoning:
          'Der kleine Waffenschein ≠ Dienstbefugnis. Ohne Erlaubnis und dienstliches Bedürfnis ist das Mitführen unzulässig.',
        limits:
          'Kein eigenmächtiges Mitführen; Waffeneinsatz nur bei Rechtsgrundlage und konkreter Lage; Dienstanweisung und DGUV V23 beachten.',
      },
    },
  },

  // ===========================================================================
  // FALL 15 – Garantenstellung: Unterlassen trotz Rechtspflicht
  // ===========================================================================
  {
    id: 'garantenstellung-unterlassen',
    title: 'Kollege greift bei Gefahr nicht ein',
    description:
      'Ein eingeteilter Sicherheitsmitarbeiter bemerkt eine hilflose Person, greift aber nicht ein.',
    topic: 'Garantenstellung',
    difficulty: 5,
    clusters: ['Unterlassungsdelikt'],
    legalReference: '§13 StGB',
    followUp1: 'Wann liegt eine Garantenstellung vor?',
    followUp2: 'Welche Folge hat die Verletzung der Garantenstellung?',
    originalCaseText:
      'Sie sind als Sicherheitskraft in einem Objekt eingesetzt und arbeiten mit einem Kollegen im Streifendienst. Während einer Schicht bemerkt der Kollege, wie ein Besucher auf einer Treppe stürzt und reglos liegen bleibt. Der Kollege steht in Rufweite, geht aber weiter und unternimmt nichts. Erst Sie werden später auf die Situation aufmerksam und leisten Hilfe. Der Kollege war ausdrücklich für diesen Bereich eingeteilt und zur Hilfe angehalten.',
    facts: [
      { id: 'f1', text: 'Sie arbeiten mit einem Kollegen im Streifendienst.', legallyRelevant: false },
      { id: 'f2', text: 'Ein Besucher stürzt auf einer Treppe und bleibt reglos liegen.', legallyRelevant: true },
      { id: 'f3', text: 'Der Kollege bemerkt die Situation, steht in Rufweite und geht weiter.', legallyRelevant: true },
      { id: 'f4', text: 'Der Kollege war für diesen Bereich eingeteilt und zur Hilfe angehalten.', legallyRelevant: true },
      { id: 'f5', text: 'Erst Sie werden später aufmerksam und leisten Hilfe.', legallyRelevant: true },
    ],
    stageOne: {
      prompt: 'Wie verhalten Sie sich?',
      options: [
        {
          id: 's1-a',
          text: 'Sofort Erste Hilfe leisten und den Rettungsdienst alarmieren.',
          verdict: 'RICHTIG',
          explanation:
            'Bei einer hilflosen Person sind sofortige Hilfe und die Alarmierung des Rettungsdienstes geboten.',
          normIds: [],
        },
        {
          id: 's1-b',
          text: 'Den Vorfall dokumentieren und das Verhalten des Kollegen dem Vorgesetzten melden.',
          verdict: 'RICHTIG',
          explanation:
            'Dokumentation und Meldung an den Vorgesetzten sind erforderlich, um den Vorgang aufzuklären.',
          normIds: [],
        },
        {
          id: 's1-c',
          text: 'Nichts tun, weil der Kollege bereits vor Ort war.',
          verdict: 'FALSCH',
          explanation:
            'Bei einer hilflosen Person besteht eine Handlungspflicht; das Untätigbleiben ist nicht hinnehmbar.',
          misconception: 'Auf das (untätige) Verhalten anderer vertrauen und selbst nicht handeln.',
          normIds: [],
        },
        {
          id: 's1-d',
          text: 'Die Situation ignorieren und weitergehen.',
          verdict: 'FALSCH',
          explanation:
            'Das Ignorieren einer Gefahrenlage für eine hilflose Person verstößt gegen die Handlungspflicht.',
          misconception: 'Gefahr für andere als nicht relevant ansehen.',
          normIds: [],
        },
      ],
      correctOptions: ['s1-a', 's1-b'],
      explanation:
        'Sofort Hilfe leisten, Rettungsdienst alarmieren, dokumentieren und den Vorgang dem Vorgesetzten melden.',
    },
    stageTwo: {
      prompt: 'Was liegt rechtlich vor?',
      options: [
        {
          id: 's2-a',
          text: 'Mögliche Garantenstellung des Kollegen – besondere Rechtspflicht zur Gefahrenabwehr.',
          verdict: 'RICHTIG',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Wer ausdrücklich für einen Bereich eingeteilt und zur Hilfe angehalten ist, kann eine besondere Rechtspflicht treffen (Garantenstellung). Ob sie vorliegt, ist an den Umständen zu prüfen (§ 13 StGB; in der Knowledge Base nicht enthalten – als fehlend markiert).',
          normIds: [],
        },
        {
          id: 's2-b',
          text: 'Unterlassen als mögliche Straftat (Begehen durch Unterlassen).',
          verdict: 'RICHTIG',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Bei bestehender Garantenpflicht kann das Nichtstun einem Begehen gleichstehen. Die Voraussetzungen sind gesondert zu prüfen.',
          normIds: [],
        },
        {
          id: 's2-c',
          text: 'Keine Rechtspflicht, weil nur der Staat für Sicherheit sorgen muss.',
          verdict: 'FALSCH',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Eine besondere Rechtspflicht kann sich aus der konkreten Aufgabenübertragung ergeben; sie ist nicht auf staatliche Stellen beschränkt.',
          misconception: 'Jede Handlungspflicht leugnen, weil Sicherheit „Sache des Staates“ sei.',
          normIds: [],
        },
        {
          id: 's2-d',
          text: 'Unterlassen ist strafrechtlich ohne Bedeutung.',
          verdict: 'FALSCH',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Das Unterlassen kann bei bestehender Garantenpflicht strafbar sein; es ist kein strafrechtlich bedeutungsloser Vorgang.',
          misconception: 'Nur aktives Tun für strafbar halten.',
          normIds: [],
        },
      ],
      correctOptions: ['s2-a', 's2-b'],
      explanation:
        'Es kommt eine Garantenstellung des Kollegen und damit ein mögliches Begehen durch Unterlassen in Betracht; beides ist an den konkreten Umständen zu prüfen.',
      classificationIds: [],
    },
    stageThree: {
      prompt: 'Mit welcher Rechtsgrundlage dürfen Sie eingreifen?',
      options: [
        {
          id: 's3-a',
          text: '§ 13 StGB – Begehen durch Unterlassen bei bestehender Garantenpflicht (in der Knowledge Base nicht enthalten – als fehlend markiert).',
          verdict: 'RICHTIG',
          explanation:
            'Wer rechtlich dafür einzustehen hat, dass ein Erfolg nicht eintritt, kann bei Nichtstun wie durch ein Tun haften. Ob eine Garantenpflicht besteht, ist an der Aufgabenübertragung zu messen.',
          normIds: [],
        },
        {
          id: 's3-b',
          text: 'Keine rechtliche Folge, weil der Kollege nicht gehandelt hat.',
          verdict: 'FALSCH',
          explanation:
            'Gerade das Unterlassen kann bei bestehender Garantenpflicht die Strafbarkeit begründen.',
          misconception: 'Unterlassen mit Straflosigkeit gleichsetzen.',
          normIds: [],
        },
        {
          id: 's3-c',
          text: '§ 32 StGB – Notwehr als Rechtfertigung für das Unterlassen.',
          verdict: 'FALSCH',
          explanation:
            'Es liegt kein gegenwärtiger rechtswidriger Angriff vor; Notwehr ist hier nicht einschlägig.',
          misconception: 'Jede Situation mit Notwehr zu verknüpfen.',
          normIds: ['stgb-32'],
        },
        {
          id: 's3-d',
          text: 'Eine Garantenstellung liegt bei jedem automatisch vor.',
          verdict: 'FALSCH',
          explanation:
            'Eine Garantenstellung setzt eine besondere Rechtspflicht voraus; sie besteht nicht automatisch für jeden.',
          misconception: 'Garantenstellung für jedermann annehmen.',
          normIds: [],
        },
      ],
      correctOptions: ['s3-a'],
      explanation:
        'Maßgeblich ist § 13 StGB (Begehen durch Unterlassen) bei bestehender Garantenpflicht. Ob der Kollege Garant war, ergibt sich aus seiner Einteilung und der Aufgabe zur Hilfe – die Prüfung bleibt dem Lernenden überlassen.',
      authorityIds: [],
    },
    result: {
      behaviorResult:
        'Sofort Hilfe leisten, Rettungsdienst alarmieren, dokumentieren und den Vorgang dem Vorgesetzten melden.',
      legalResult:
        'Mögliche Garantenstellung des Kollegen; Unterlassen als mögliche Straftat.',
      authorityResult:
        '§ 13 StGB – Begehen durch Unterlassen bei Garantenpflicht (in der Knowledge Base nicht enthalten – als fehlend markiert).',
      explanation:
        'Wer besonders zur Gefahrenabwehr verpflichtet ist, kann bei Untätigkeit wie durch ein Tun haften. Ob eine Garantenstellung vorliegt, ist an der konkreten Aufgabenübertragung zu prüfen – der Sachverhalt verrät die Lösung nicht.',
      modelSolution: {
        behavior:
          'Sofort Hilfe leisten, Rettungsdienst alarmieren, dokumentieren, Vorgesetzten informieren.',
        legalClassification:
          'Mögliche Garantenstellung; Unterlassen als mögliche Straftat.',
        legalBasis:
          '§ 13 StGB – Begehen durch Unterlassen bei bestehender Garantenpflicht (in der Knowledge Base nicht enthalten – als fehlend markiert).',
        reasoning:
          'Unterlassen ≠ automatisch straflos. Bei besonderer Rechtspflicht kann das Nichtstun dem Begehen gleichstehen; die Garantenstellung ist zu prüfen.',
        limits:
          'Garantenstellung nicht automatisch; sie folgt aus der konkreten Rechtspflicht. Handlungspflicht und Zumutbarkeit sind zu prüfen.',
      },
    },
  },

  // ===========================================================================
  // FALL 16 – Massenpanik: Gefahr ≠ automatisch §34, aber Notstand prüfen
  // ===========================================================================
  {
    id: 'massenpanik',
    title: 'Massenpanik entsteht',
    description:
      'Bei einer Großveranstaltung strömen Besucher gleichzeitig zu einem Ausgang; es droht eine Massenpanik.',
    topic: 'Großveranstaltung',
    difficulty: 4,
    clusters: ['Panik', 'Evakuierung'],
    legalReference: 'Versammlungsrecht',
    followUp1: 'Wo sollten Sie sich positionieren?',
    followUp2: 'Was ist zu vermeiden?',
    originalCaseText:
      'Sie sind als Sicherheitskraft bei einer größeren Veranstaltung in einer Halle eingesetzt. Kurz vor Ende strömen mehrere hundert Besucher gleichzeitig in Richtung des Hauptausgangs. Im Gedränge entsteht Unruhe, einzelne Personen rufen laut. Der Ausgang droht sich zu verengen. Ihre Kollegen sind über die Fläche verteilt im Einsatz.',
    facts: [
      { id: 'f1', text: 'Sie sind als Sicherheitskraft bei einer größeren Veranstaltung in einer Halle eingesetzt.', legallyRelevant: false },
      { id: 'f2', text: 'Mehrere hundert Besucher strömen gleichzeitig in Richtung des Hauptausgangs.', legallyRelevant: true },
      { id: 'f3', text: 'Im Gedränge entsteht Unruhe; einzelne Personen rufen laut.', legallyRelevant: true },
      { id: 'f4', text: 'Der Ausgang droht sich zu verengen.', legallyRelevant: true },
      { id: 'f5', text: 'Ihre Kollegen sind über die Fläche verteilt im Einsatz.', legallyRelevant: true },
    ],
    stageOne: {
      prompt: 'Wie verhalten Sie sich?',
      options: [
        {
          id: 's1-a',
          text: 'Ruhe bewahren, eine erhöhte und gut sichtbare Position einnehmen und die Menge ruhig lenken.',
          verdict: 'RICHTIG',
          explanation:
            'Eine sichtbare Position und ruhige Lenkung helfen, die Menge zu beruhigen und den Fluss zu steuern.',
          normIds: [],
        },
        {
          id: 's1-b',
          text: 'Fluchtwege freihalten, Rettungskräfte alarmieren und auf eine Verengung des Ausgangs hinwirken.',
          verdict: 'RICHTIG',
          explanation:
            'Freie Fluchtwege und das Verhindern einer Verengung (Flaschenhals) sind entscheidend; Rettungskräfte sind zu alarmieren.',
          normIds: ['stgb-34'],
        },
        {
          id: 's1-c',
          text: 'Die Fluchtwege absperren, um die Menge aufzuhalten.',
          verdict: 'FALSCH',
          explanation:
            'Absperrungen verengen die Fluchtwege und verstärken die Gefahr eines Gedränges.',
          misconception: 'Absperren als Beruhigungsmittel ansehen.',
          normIds: [],
        },
        {
          id: 's1-d',
          text: 'Mit der Menge zum Ausgang rennen.',
          verdict: 'FALSCH',
          explanation:
            'Mitrennen verstärkt den Druck auf den Ausgang und die Panik.',
          misconception: 'Selbst fliehen, statt die Menge zu lenken.',
          normIds: [],
        },
      ],
      correctOptions: ['s1-a', 's1-b'],
      explanation:
        'Ruhe bewahren, sichtbare erhöhte Position einnehmen, Fluchtwege freihalten, Rettungskräfte alarmieren und Flaschenhalsbildung vermeiden.',
    },
    stageTwo: {
      prompt: 'Was liegt rechtlich vor?',
      options: [
        {
          id: 's2-a',
          text: 'Gegenwärtige Gefahr für Leben und Leib vieler Personen.',
          verdict: 'RICHTIG',
          legalLevel: 'RECHTSBEGRIFF',
          explanation:
            'Das Gedränge mit drohender Verengung des Ausgangs begründet eine gegenwärtige Gefahr für Leben und Leib einer Vielzahl von Personen.',
          normIds: ['stgb-34'],
        },
        {
          id: 's2-b',
          text: 'Gefahrenlage durch die entstehende Massenpanik.',
          verdict: 'RICHTIG',
          legalLevel: 'RECHTSBEGRIFF',
          explanation:
            'Eine Massenpanik ist eine besondere Gefahrenlage; die notwendigen Maßnahmen sind an Erforderlichkeit und Angemessenheit zu messen.',
          normIds: [],
        },
        {
          id: 's2-c',
          text: 'Gegenwärtiger rechtswidriger Angriff der Besucher.',
          verdict: 'FALSCH',
          legalLevel: 'RECHTSBEGRIFF',
          explanation:
            'Die Besucher greifen niemanden an; es liegt eine Gefahr, kein Angriff vor.',
          misconception: 'Gefahr und Angriff vermischen.',
          normIds: ['stgb-32'],
        },
        {
          id: 's2-d',
          text: 'Straftat gegen die Sicherheitskraft.',
          verdict: 'FALSCH',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Ein strafbares Verhalten gegen die Sicherheitskraft ist nicht erkennbar.',
          misconception: 'Jede unübersichtliche Lage als Straftat einordnen.',
          normIds: [],
        },
      ],
      correctOptions: ['s2-a', 's2-b'],
      explanation:
        'Es liegt eine gegenwärtige Gefahr für Leben und Leib vieler Personen vor; die entstehende Massenpanik ist eine besondere Gefahrenlage.',
      classificationIds: ['classification-gegenwaertige-gefahr'],
    },
    stageThree: {
      prompt: 'Mit welcher Rechtsgrundlage dürfen Sie eingreifen?',
      options: [
        {
          id: 's3-a',
          text: '§ 34 StGB – rechtfertigender Notstand: Maßnahmen zur Abwendung der gegenwärtigen Gefahr für Leben und Leib.',
          verdict: 'RICHTIG',
          explanation:
            'Die Gefahrenabwehr ist über § 34 StGB gerechtfertigt, wenn die Gefahr gegenwärtig und nicht anders abwendbar ist und das geschützte Interesse wesentlich überwiegt.',
          normIds: ['stgb-34'],
        },
        {
          id: 's3-b',
          text: 'Absperren der Fluchtwege als Folge des Hausrechts.',
          verdict: 'FALSCH',
          explanation:
            'Das Absperren von Fluchtwegen erhöht die Gefahr und ist keine zulässige Maßnahme.',
          misconception: 'Hausrecht → automatisch jede Maßnahme.',
          normIds: [],
        },
        {
          id: 's3-c',
          text: '§ 32 StGB – Notwehr gegen die Besucher.',
          verdict: 'FALSCH',
          explanation:
            'Die Besucher greifen nicht an; Notwehr ist nicht einschlägig.',
          misconception: 'Menschenmenge als Angriff einordnen.',
          normIds: ['stgb-32'],
        },
        {
          id: 's3-d',
          text: 'Panik → automatisch Notstand, ohne Prüfung der Voraussetzungen.',
          verdict: 'FALSCH',
          explanation:
            '§ 34 StGB verlangt eine gegenwärtige, nicht anders abwendbare Gefahr, die Interessenabwägung und ein angemessenes Mittel.',
          misconception: 'Gefahr → automatisch § 34 StGB.',
          normIds: ['stgb-34'],
        },
      ],
      correctOptions: ['s3-a'],
      explanation:
        'Als Grundlage kommt § 34 StGB (rechtfertigender Notstand) in Betracht: gegenwärtige, nicht anders abwendbare Gefahr, Interessenabwägung, angemessenes Mittel. Versammlungsrechtliche Vorgaben (in der Knowledge Base nicht enthalten) sind zusätzlich zu beachten.',
      authorityIds: ['authority-stgb-34'],
    },
    result: {
      behaviorResult:
        'Ruhe bewahren, sichtbare erhöhte Position einnehmen, Fluchtwege freihalten, Rettungskräfte alarmieren, Flaschenhalsbildung vermeiden.',
      legalResult:
        'Gegenwärtige Gefahr für Leben und Leib vieler Personen; Gefahrenlage durch Massenpanik.',
      authorityResult:
        '§ 34 StGB – rechtfertigender Notstand; versammlungsrechtliche Vorgaben ergänzend.',
      explanation:
        'Die Gefahrenabwehr ist über § 34 StGB gerechtfertigt; ihre Voraussetzungen sind zu prüfen. Absperren von Fluchtwegen und Notwehr gegen die Besucher sind unzulässig.',
      modelSolution: {
        behavior:
          'Ruhe bewahren, erhöhte sichtbare Position, Fluchtwege freihalten, Rettungskräfte alarmieren.',
        legalClassification:
          'Gegenwärtige Gefahr für Leben und Leib vieler Personen; Gefahrenlage durch Massenpanik.',
        legalBasis:
          '§ 34 StGB – rechtfertigender Notstand: gegenwärtige, nicht anders abwendbare Gefahr, Interessenabwägung, angemessenes Mittel.',
        reasoning:
          'Gefahr ≠ automatisch jede Maßnahme; die Maßnahmen müssen erforderlich und angemessen sein. Absperren und Notwehr sind unzulässig.',
        limits:
          'Erforderlichkeit und Angemessenheit; Fluchtwege nicht verengen; sichtbare Position; Rettungskräfte einbinden.',
      },
    },
  },
];
