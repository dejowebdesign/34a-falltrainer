import { Scenario } from '../models';

/**
 * Seed-Szenarien.
 *
 * Bewusst NICHT Teil der juristischen Knowledge Base (Bibel-Kapitel 7/63).
 * Jedes Szenario verweist ausschließlich auf Normen, Einordnungen und
 * Befugnisse der Knowledge Base und vermeidet die verbotenen Automatismen
 * aus Bibel-Kapitel 13/62.
 */
export const SCENARIOS: Scenario[] = [
  // ===========================================================================
  // FALL 1 – Ladendiebstahl: Diebstahl ≠ automatische Festhaltebefugnis
  // ===========================================================================
  {
    id: 'ladendiebstahl',
    title: 'Ladendiebstahl im Supermarkt',
    description:
      'Eine Person steckt eine Flasche Spirituosen ein und passiert den Kassenbereich, ohne zu zahlen.',
    originalCaseText:
      'Sie sind als Sicherheitsmitarbeiter in einem Supermarkt eingesetzt. Sie beobachten, wie eine Person eine Flasche Spirituosen in ihre Jacke steckt und anschließend den Kassenbereich passiert, ohne zu bezahlen. Danach geht die Person zügig in Richtung Ausgang. Sie kennen die Person nicht.',
    facts: [
      { id: 'f1', text: 'Sie sind als Sicherheitskraft im Verkaufsraum eines Supermarkts tätig.', legallyRelevant: false },
      { id: 'f2', text: 'Sie beobachten, wie eine Person eine Flasche Spirituosen in die Jacke steckt.', legallyRelevant: true },
      { id: 'f3', text: 'Die Person passiert den Kassenbereich, ohne die Flasche zu bezahlen.', legallyRelevant: true },
      { id: 'f4', text: 'Die Person geht zügig in Richtung Ausgang.', legallyRelevant: true },
      { id: 'f5', text: 'Die Person ist Ihnen namentlich nicht bekannt.', legallyRelevant: true },
    ],
    stageOne: {
      prompt: 'Wie verhalten Sie sich?',
      options: [
        {
          id: 's1-a',
          text: 'Ruhe bewahren, die Person ruhig und professionell ansprechen und die Situation deeskalieren.',
          verdict: 'RICHTIG',
          explanation:
            'Deeskalierende Kommunikation und professionelles Auftreten sind das Kernverhalten im Umgang mit Menschen und vermeiden eine Eskalation.',
          normIds: [],
        },
        {
          id: 's1-b',
          text: 'Eigensicherung beachten, Verstärkung hinzuziehen und die Polizei verständigen.',
          verdict: 'RICHTIG',
          explanation:
            'Eigensicherung und das Hinzuziehen von Verstärkung bzw. der Polizei sind sinnvolle Verhaltensweisen; die Sicherheitskraft hat keine Polizeibefugnisse.',
          normIds: ['stpo-127'],
        },
        {
          id: 's1-c',
          text: 'Die Person sofort körperlich festhalten und zu Boden werfen.',
          verdict: 'FALSCH',
          explanation:
            'Körperliche Gewalt ohne vorherige Prüfung der konkreten Rechtsgrundlage ist nicht zulässig. Der Verdacht allein rechtfertigt keinen sofortigen körperlichen Zugriff.',
          misconception:
            'Diebstahl erkannt → automatisch festhalten. Die Festhaltebefugnis folgt nicht allein aus dem Diebstahlsverdacht; die Voraussetzungen der Befugnis sind zusätzlich zu prüfen.',
          normIds: ['stgb-242', 'stpo-127'],
        },
        {
          id: 's1-d',
          text: 'Die Person laut beschimpfen, um sie zum Stehenbleiben zu bewegen.',
          verdict: 'FALSCH',
          explanation:
            'Beschimpfungen eskalieren die Lage und widersprechen deeskalierender Kommunikation. Zudem kann eine Ehrverletzung § 185 StGB erfüllen.',
          misconception: 'Beleidigungen eskalieren lassen, statt deeskalierend zu kommunizieren.',
          normIds: ['stgb-185'],
        },
      ],
      correctOptions: ['s1-a', 's1-b'],
      explanation:
        'Sinnvoll sind ruhiges, professionelles und deeskalierendes Auftreten sowie Eigensicherung und das Hinzuziehen von Verstärkung bzw. Polizei.',
    },
    stageTwo: {
      prompt: 'Was liegt rechtlich vor?',
      options: [
        {
          id: 's2-a',
          text: 'Möglicher Diebstahl nach § 242 StGB (Tatverdacht).',
          verdict: 'RICHTIG',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Die Beobachtungen deuten auf eine Wegnahme einer fremden beweglichen Sache mit Zueignungsabsicht hin. Es handelt sich um einen Tatverdacht, nicht um eine zweifelsfrei feststehende Straftat.',
          normIds: ['stgb-242'],
        },
        {
          id: 's2-b',
          text: 'Diebstahl ist zweifelsfrei feststehend und beweisbar.',
          verdict: 'FALSCH',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Ein Tatverdacht ist nicht automatisch eine feststehende Straftat. Die Tatbestandsmerkmale und ihre Beweisbarkeit sind gesondert zu prüfen.',
          misconception: 'Tatverdacht mit feststehender Straftat gleichsetzen.',
          normIds: ['stgb-242'],
        },
        {
          id: 's2-c',
          text: 'Verbotene Eigenmacht nach § 858 BGB.',
          verdict: 'RICHTIG',
          legalLevel: 'PRIVATRECHT',
          explanation:
            'Wird dem Besitzer (hier dem Supermarkt) ohne dessen Willen die Sache weggenommen, liegt eine verbotene Eigenmacht vor.',
          normIds: ['bgb-858'],
        },
        {
          id: 's2-d',
          text: 'Gegenwärtige Gefahr für Leben und Leib.',
          verdict: 'FALSCH',
          legalLevel: 'RECHTSBEGRIFF',
          explanation:
            'Eine Gefahr für Leben und Leib ist im Sachverhalt nicht erkennbar. Gefahr ist nicht dasselbe wie ein Diebstahlsverdacht.',
          misconception: 'Gefahr → automatisch Notstand; hier liegt keine Gefahrlage vor.',
          normIds: ['stgb-34'],
        },
      ],
      correctOptions: ['s2-a', 's2-c'],
      explanation:
        'Rechtlich liegen ein möglicher Diebstahl (§ 242 StGB) und eine verbotene Eigenmacht (§ 858 BGB) vor.',
      classificationIds: ['classification-diebstahl-verdacht', 'classification-verbotene-eigenmacht'],
    },
    stageThree: {
      prompt: 'Mit welcher Rechtsgrundlage dürfen Sie eingreifen?',
      options: [
        {
          id: 's3-a',
          text: '§ 127 Abs. 1 StPO – Vorläufige Festnahme prüfen: frische Tat und zusätzlich Fluchtverdacht oder Identität nicht sofort feststellbar.',
          verdict: 'RICHTIG',
          explanation:
            'Die Person ist auf frischer Tat betroffen und geht zügig in Richtung Ausgang (Fluchtverdacht); die Identität ist nicht bekannt. Damit sind die Voraussetzungen des § 127 Abs. 1 StPO zu prüfen.',
          normIds: ['stpo-127'],
        },
        {
          id: 's3-b',
          text: '§ 985 BGB – Herausgabeanspruch: als Eigentümer die Sache selbst mit Gewalt zurücknehmen.',
          verdict: 'FALSCH',
          explanation:
            '§ 985 BGB ist ein Herausgabeanspruch und keine unmittelbare Gewaltbefugnis.',
          misconception: 'Anspruch mit Befugnis verwechseln: § 985 BGB beantwortet nicht, ob die Sache selbst weggenommen werden darf.',
          normIds: ['bgb-985'],
        },
        {
          id: 's3-c',
          text: 'Allein wegen des Diebstahlsverdachts ist die Person automatisch festzuhalten.',
          verdict: 'FALSCH',
          explanation:
            'Die Festhaltebefugnis folgt nicht allein aus dem Diebstahlsverdacht. Die konkreten Voraussetzungen der Befugnis müssen zusätzlich geprüft werden.',
          misconception:
            'Diebstahl erkannt → automatisch festhalten. Diebstahl ≠ automatisch Festhaltebefugnis.',
          normIds: ['stgb-242', 'stpo-127'],
        },
        {
          id: 's3-d',
          text: '§ 34 StGB – Rechtfertigender Notstand wegen der Gefahr durch den Diebstahl.',
          verdict: 'FALSCH',
          explanation:
            '§ 34 StGB setzt eine gegenwärtige, nicht anders abwendbare Gefahr für ein Rechtsgut voraus. Ein Diebstahl begründet nicht automatisch einen Notstand.',
          misconception: 'Gefahr → automatisch § 34 StGB.',
          normIds: ['stgb-34'],
        },
      ],
      correctOptions: ['s3-a'],
      explanation:
        'Als Eingriffsgrundlage kommt § 127 Abs. 1 StPO in Betracht. Die Voraussetzungen (frische Tat + Fluchtverdacht oder Identität nicht sofort feststellbar) müssen kumulativ erfüllt sein.',
      authorityIds: ['authority-stpo-127'],
    },
    result: {
      behaviorResult:
        'Ruhiges, deeskalierendes Ansprechen, Eigensicherung und Hinzuziehen von Verstärkung bzw. Polizei.',
      legalResult:
        'Möglicher Diebstahl (§ 242 StGB) als Tatverdacht und verbotene Eigenmacht (§ 858 BGB).',
      authorityResult:
        '§ 127 Abs. 1 StPO prüfen – nur bei frischer Tat und Fluchtverdacht oder nicht sofort feststellbarer Identität.',
      explanation:
        'Ein Diebstahlsverdacht begründet keine automatische Festhaltebefugnis. Erst nach rechtlicher Einordnung wird die konkrete Befugnis geprüft. § 127 Abs. 1 StPO ist eine Jedermann-Befugnis unter engen Voraussetzungen.',
      modelSolution: {
        behavior:
          'Ruhe bewahren, professionell ansprechen, deeskalieren, Eigensicherung beachten, Verstärkung und Polizei hinzuziehen.',
        legalClassification:
          'Möglicher Diebstahl nach § 242 StGB (Tatverdacht) und verbotene Eigenmacht nach § 858 BGB.',
        legalBasis:
          '§ 127 Abs. 1 StPO – Vorläufige Festnahme, wenn die Person auf frischer Tat betroffen oder verfolgt wird und zusätzlich Fluchtverdacht besteht oder die Identität nicht sofort feststellbar ist.',
        reasoning:
          'Diebstahl ≠ automatisch Festhaltebefugnis. Der Tatverdacht ist von der Befugnis zu trennen; § 985 BGB ist ein Anspruch, keine Gewaltbefugnis.',
        limits:
          'Nur vorläufige Festnahme, Durchführung auf das erforderliche Maß begrenzen, Verhältnismäßigkeit beachten; nach der Festnahme unverzüglich die Polizei hinzuziehen.',
      },
    },
  },

  // ===========================================================================
  // FALL 2 – Hausverbot: Hausverbot ≠ automatisch Gewalt
  // ===========================================================================
  {
    id: 'hausverbot',
    title: 'Hausverbot im Einkaufszentrum',
    description:
      'Eine Person mit bestehendem Hausverbot betritt die Geschäftsräume und weigert sich, sie zu verlassen.',
    originalCaseText:
      'Sie sind als Sicherheitsmitarbeiter in einem Einkaufszentrum eingesetzt. Gegen eine Person besteht bereits ein Hausverbot. Trotzdem betritt sie erneut die Geschäftsräume und weigert sich trotz Aufforderung, diese zu verlassen. Die Person verhält sich verbal aggressiv, wird aber nicht tätlich.',
    facts: [
      { id: 'f1', text: 'Gegen die Person besteht ein wirksames Hausverbot für das Einkaufszentrum.', legallyRelevant: true },
      { id: 'f2', text: 'Die Person betritt die Geschäftsräume und verweilt dort.', legallyRelevant: true },
      { id: 'f3', text: 'Sie werden als Sicherheitskraft zum Berechtigten des Hausrechts hinzugerufen.', legallyRelevant: false },
      { id: 'f4', text: 'Die Person wird aufgefordert zu gehen, entfernt sich aber nicht.', legallyRelevant: true },
      { id: 'f5', text: 'Die Person verhält sich verbal aggressiv, aber nicht tätlich.', legallyRelevant: true },
    ],
    stageOne: {
      prompt: 'Wie verhalten Sie sich?',
      options: [
        {
          id: 's1-a',
          text: 'Das Hausverbot ruhig und eindeutig kommunizieren und die Person zum Verlassen auffordern.',
          verdict: 'RICHTIG',
          explanation:
            'Die klare, ruhige Kommunikation des Hausverbots ist das angemessene Vorgehen und entspricht der Aufforderung des Berechtigten.',
          normIds: ['stgb-123'],
        },
        {
          id: 's1-b',
          text: 'Deeskalierend sprechen, die Person begleiten und bei Bedarf die Polizei verständigen.',
          verdict: 'RICHTIG',
          explanation:
            'Deeskalation, Begleiten und Hinzuziehen der Polizei sind sinnvoll; die Sicherheitskraft hat keine Polizeibefugnisse.',
          normIds: ['stpo-127'],
        },
        {
          id: 's1-c',
          text: 'Die Person sofort mit körperlicher Gewalt aus dem Gebäude drängen.',
          verdict: 'FALSCH',
          explanation:
            'Aus einem Hausverbot oder Hausfriedensbruch folgt nicht automatisch eine Gewaltbefugnis. Die konkrete Rechtsgrundlage ist gesondert zu prüfen.',
          misconception:
            'Hausverbot → automatisch Gewalt. Ein Hausverbot begründet keine automatische Gewaltbefugnis.',
          normIds: ['stgb-123', 'bgb-859'],
        },
        {
          id: 's1-d',
          text: 'Die verbalen Angriffe erwidern und die Person provozieren.',
          verdict: 'FALSCH',
          explanation:
            'Provokationen eskalieren die Lage und widersprechen der Deeskalation.',
          misconception: 'Sich provozieren lassen und Beleidigungen eskalieren.',
          normIds: ['stgb-185'],
        },
      ],
      correctOptions: ['s1-a', 's1-b'],
      explanation:
        'Ruhige Kommunikation des Hausverbots, Deeskalation und ggf. Hinzuziehen der Polizei sind sinnvoll.',
    },
    stageTwo: {
      prompt: 'Was liegt rechtlich vor?',
      options: [
        {
          id: 's2-a',
          text: 'Möglicher Hausfriedensbruch nach § 123 StGB (unbefugtes Verweilen trotz Aufforderung).',
          verdict: 'RICHTIG',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Wer ohne Befugnis in geschützten Räumen verweilt und sich trotz Aufforderung des Berechtigten nicht entfernt, kann § 123 StGB erfüllen. Die Tat wird nur auf Antrag verfolgt.',
          normIds: ['stgb-123'],
        },
        {
          id: 's2-b',
          text: 'Verbotene Eigenmacht nach § 858 BGB durch das Verweilen.',
          verdict: 'RICHTIG',
          legalLevel: 'PRIVATRECHT',
          explanation:
            'Das unbefugte Verweilen kann eine Störung des Besitzes des Berechtigten darstellen.',
          normIds: ['bgb-858'],
        },
        {
          id: 's2-c',
          text: 'Schwerer Hausfriedensbruch nach § 124 StGB.',
          verdict: 'FALSCH',
          legalLevel: 'STRAFRECHT',
          explanation:
            '§ 124 StGB setzt Menschenmenge, öffentliches Zusammenrotten und Gewaltabsicht voraus. Diese Voraussetzungen sind hier nicht erkennbar.',
          misconception: '§ 123 StGB und § 124 StGB verwechseln; § 124 verlangt zusätzliche Voraussetzungen.',
          normIds: ['stgb-124'],
        },
        {
          id: 's2-d',
          text: 'Raub nach § 249 StGB.',
          verdict: 'FALSCH',
          legalLevel: 'STRAFRECHT',
          explanation: 'Eine Wegnahme mit qualifizierter Gewalt oder Drohung liegt nicht vor.',
          misconception: 'Hausfriedensbruch mit einem Raubdelikt verwechseln.',
          normIds: ['stgb-249'],
        },
      ],
      correctOptions: ['s2-a', 's2-b'],
      explanation:
        'Es kommt ein Hausfriedensbruch nach § 123 StGB (Antragsdelikt) sowie eine verbotene Eigenmacht nach § 858 BGB in Betracht.',
      classificationIds: ['classification-hausfriedensbruch', 'classification-verbotene-eigenmacht'],
    },
    stageThree: {
      prompt: 'Mit welcher Rechtsgrundlage dürfen Sie eingreifen?',
      options: [
        {
          id: 's3-a',
          text: '§ 860 BGB – Selbsthilfe des Besitzdieners i. V. m. § 859 BGB – Selbsthilfe des Besitzers: nur bei verbotener Eigenmacht und nur im erforderlichen Maß.',
          verdict: 'RICHTIG',
          explanation:
            'Als Besitzdiener darf die Sicherheitskraft die Rechte des Besitzers nach § 859 BGB ausüben. Voraussetzung ist eine verbotene Eigenmacht; die Selbsthilfe ist auf das erforderliche Maß begrenzt.',
          normIds: ['bgb-860', 'bgb-859', 'bgb-858'],
        },
        {
          id: 's3-b',
          text: 'Allein wegen des Hausverbots ist körperliche Gewalt automatisch erlaubt.',
          verdict: 'FALSCH',
          explanation:
            'Ein Hausverbot begründet keine automatische Gewaltbefugnis. § 859 BGB setzt verbotene Eigenmacht voraus und ist kein Freibrief zur Gewalt.',
          misconception: 'Hausverbot → automatisch Gewalt.',
          normIds: ['stgb-123', 'bgb-859'],
        },
        {
          id: 's3-c',
          text: '§ 127 Abs. 1 StPO – Vorläufige Festnahme, weil ein Hausverbot besteht.',
          verdict: 'FALSCH',
          explanation:
            '§ 127 StPO setzt eine frische Tat und zusätzlich Fluchtverdacht oder nicht sofort feststellbare Identität voraus. Das Hausverbot allein genügt nicht.',
          misconception: 'Aus einem Hausverbot automatisch eine Festnahmebefugnis ableiten.',
          normIds: ['stpo-127'],
        },
        {
          id: 's3-d',
          text: '§ 985 BGB – Herausgabeanspruch: die Person ist wie eine Sache herauszugeben.',
          verdict: 'FALSCH',
          explanation: '§ 985 BGB betrifft die Herausgabe einer Sache und ist kein Instrument gegen Personen.',
          misconception: 'Anspruch und Personenbezug vermischen.',
          normIds: ['bgb-985'],
        },
      ],
      correctOptions: ['s3-a'],
      explanation:
        'Als Besitzdiener kommen die §§ 860, 859 BGB in Betracht, aber nur bei verbotener Eigenmacht und nur im erforderlichen Maß. Ein Hausverbot allein begründet keine Gewaltbefugnis.',
      authorityIds: ['authority-bgb-860', 'authority-bgb-859'],
    },
    result: {
      behaviorResult:
        'Hausverbot ruhig kommunizieren, Deeskalation, Person begleiten, ggf. Polizei verständigen.',
      legalResult:
        'Möglicher Hausfriedensbruch nach § 123 StGB (Antragsdelikt) und verbotene Eigenmacht nach § 858 BGB.',
      authorityResult:
        '§§ 860, 859 BGB als Besitzdiener – nur bei verbotener Eigenmacht und nur im erforderlichen Maß.',
      explanation:
        'Ein Hausverbot oder Hausfriedensbruch begründet keine automatische Gewaltbefugnis. Die konkrete Selbsthilfebefugnis setzt verbotene Eigenmacht voraus und ist begrenzt.',
      modelSolution: {
        behavior:
          'Ruhig und eindeutig kommunizieren, deeskalieren, begleiten, bei Bedarf Polizei hinzuziehen.',
        legalClassification:
          'Möglicher Hausfriedensbruch (§ 123 StGB, nur auf Antrag) und verbotene Eigenmacht (§ 858 BGB).',
        legalBasis:
          '§ 860 BGB – Selbsthilfe des Besitzdieners i. V. m. § 859 BGB – Selbsthilfe des Besitzers: darf die Rechte des Besitzers ausüben, wenn verbotene Eigenmacht vorliegt.',
        reasoning:
          'Hausverbot ≠ automatisch Gewalt. § 123 StGB und § 858 BGB sind zunächst rechtlich einzuordnen; die Befugnis folgt daraus nicht automatisch.',
        limits:
          'Selbsthilfe nur im erforderlichen Maß; keine allgemeine Gewaltbefugnis; § 230 BGB – Grenzen der Selbsthilfe beachten.',
      },
    },
  },

  // ===========================================================================
  // FALL 3 – Tätlicher Angriff: Angriff ≠ automatisch jede Gewalt
  // ===========================================================================
  {
    id: 'koerperlicher-angriff',
    title: 'Tätlicher Angriff im Gastraum',
    description:
      'Ein Gast schlägt unvermittelt auf einen anderen Gast ein. Sie werden als Sicherheitskraft hinzugerufen.',
    originalCaseText:
      'Sie sind als Sicherheitsmitarbeiter in einem Gastraum eingesetzt. Plötzlich schlägt ein Gast einem anderen Gast mit der Faust ins Gesicht. Der Angriff dauert an, während weitere Gäste in unmittelbarer Nähe stehen. Der Angreifer ist Ihnen unbekannt und wirkt entschlossen, weiterzumachen.',
    facts: [
      { id: 'f1', text: 'Ein Gast schlägt einem anderen Gast mit der Faust ins Gesicht.', legallyRelevant: true },
      { id: 'f2', text: 'Der Angriff dauert an; der Angegriffene wehrt sich nicht.', legallyRelevant: true },
      { id: 'f3', text: 'Weitere Gäste sind in unmittelbarer Nähe.', legallyRelevant: true },
      { id: 'f4', text: 'Der Angreifer ist Ihnen unbekannt und wirkt entschlossen.', legallyRelevant: true },
    ],
    stageOne: {
      prompt: 'Wie verhalten Sie sich?',
      options: [
        {
          id: 's1-a',
          text: 'Eigensicherung beachten, Verstärkung rufen, die Personen trennen und den Angriff unterbinden.',
          verdict: 'RICHTIG',
          explanation:
            'Eigensicherung, Verstärkung und Trennen der Personen sind geeignete, erforderliche Verhaltensweisen.',
          normIds: ['stgb-32'],
        },
        {
          id: 's1-b',
          text: 'Rettungsdienst für den Verletzten verständigen und die Polizei hinzuziehen.',
          verdict: 'RICHTIG',
          explanation:
            'Erste Hilfe bzw. Rettungsdienst und Polizei sind sinnvoll, nachdem die Gefahr abgewehrt ist.',
          normIds: ['stgb-223'],
        },
        {
          id: 's1-c',
          text: 'Dem Angreifer sofort mit voller Härte ins Gesicht schlagen.',
          verdict: 'FALSCH',
          explanation:
            'Notwehr erlaubt nur die erforderliche Verteidigung. Ein Angriff rechtfertigt nicht automatisch jede beliebige Gewalt.',
          misconception: 'Angriff → automatisch jede beliebige Gewalt.',
          normIds: ['stgb-32'],
        },
        {
          id: 's1-d',
          text: 'Nichts tun, weil Sie keine Polizeibefugnisse haben.',
          verdict: 'FALSCH',
          explanation:
            'Auch ohne Polizeibefugnisse kann eine Notwehrlage bestehen. Untätigkeit lässt den Angriff fortdauern.',
          misconception: 'Uniform → Polizeibefugnisse bzw. umgekehrt Untätigkeit aus falscher Zurückhaltung.',
          normIds: ['stgb-32', 'stgb-132'],
        },
      ],
      correctOptions: ['s1-a', 's1-b'],
      explanation:
        'Eigensicherung, Verstärkung, Trennen der Personen und anschließend Rettungsdienst bzw. Polizei sind sinnvoll.',
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
            'Der fortdauernde Faustschlag ist ein gegenwärtiger rechtswidriger Angriff im Sinne des § 32 StGB.',
          normIds: ['stgb-32'],
        },
        {
          id: 's2-b',
          text: 'Mögliche Körperverletzung nach § 223 StGB.',
          verdict: 'RICHTIG',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Die körperliche Misshandlung kann den Tatbestand des § 223 StGB erfüllen.',
          normIds: ['stgb-223'],
        },
        {
          id: 's2-c',
          text: 'Mögliche gefährliche Körperverletzung nach § 224 StGB.',
          verdict: 'TEILWEISE_RICHTIG',
          legalLevel: 'STRAFRECHT',
          explanation:
            '§ 224 setzt eine besondere Begehungsweise voraus (z. B. Waffe, gefährliches Werkzeug, gemeinschaftliche Begehung). Ob eine solche vorliegt, ist gesondert zu prüfen.',
          misconception: 'Körperverletzung ohne Prüfung der Qualifikationsmerkmale als § 224 einordnen.',
          normIds: ['stgb-224'],
        },
        {
          id: 's2-d',
          text: 'Gegenwärtige Gefahr im Sinne des § 34 StGB.',
          verdict: 'FALSCH',
          legalLevel: 'RECHTSBEGRIFF',
          explanation:
            'Hier liegt ein Angriff vor, der über die Notwehr (§ 32 StGB) behandelt wird. Angriff ≠ automatisch Notstand.',
          misconception: 'Angriff und Gefahr vermischen.',
          normIds: ['stgb-34', 'stgb-32'],
        },
      ],
      correctOptions: ['s2-a', 's2-b'],
      explanation:
        'Es liegt ein gegenwärtiger rechtswidriger Angriff und eine mögliche Körperverletzung nach § 223 StGB vor.',
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
            'Notwehr erlaubt die erforderliche Verteidigung, um den gegenwärtigen rechtswidrigen Angriff abzuwenden.',
          normIds: ['stgb-32'],
        },
        {
          id: 's3-b',
          text: '§ 34 StGB – Rechtfertigender Notstand, weil eine Gefahr besteht.',
          verdict: 'FALSCH',
          explanation:
            'Ein Angriff ist über § 32 StGB zu behandeln. § 34 StGB verlangt eine nicht anders abwendbare Gefahr und eine Interessenabwägung.',
          misconception: 'Angriff → automatisch Notwehr bzw. Gefahr → automatisch § 34 StGB.',
          normIds: ['stgb-34'],
        },
        {
          id: 's3-c',
          text: 'Jede beliebige Gewalt ist zulässig, sobald ein Angriff vorliegt.',
          verdict: 'FALSCH',
          explanation:
            'Die Verteidigung muss erforderlich sein; das mildeste geeignete Mittel ist einzusetzen.',
          misconception: 'Angriff → automatisch jede beliebige Gewalt.',
          normIds: ['stgb-32'],
        },
        {
          id: 's3-d',
          text: '§ 127 Abs. 1 StPO – Vorläufige Festnahme, weil ein Angriff auf frischer Tat vorliegt.',
          verdict: 'TEILWEISE_RICHTIG',
          explanation:
            '§ 127 StPO kann zusätzlich in Betracht kommen, wenn die Person auf frischer Tat betroffen und Fluchtverdacht oder die Identität nicht sofort feststellbar ist. Die Notwehrlage selbst wird über § 32 StGB gelöst.',
          misconception: '§ 127 StPO mit der Notwehrlage gleichsetzen.',
          normIds: ['stpo-127', 'stgb-32'],
        },
      ],
      correctOptions: ['s3-a'],
      explanation:
        'Die Verteidigung richtet sich nach § 32 StGB. Sie muss erforderlich sein; § 127 StPO kann zusätzlich, aber nur unter seinen eigenen Voraussetzungen, in Betracht kommen.',
      authorityIds: ['authority-stgb-32'],
    },
    result: {
      behaviorResult:
        'Eigensicherung, Verstärkung, Personen trennen, Angriff unterbinden, danach Rettungsdienst und Polizei.',
      legalResult: 'Gegenwärtiger rechtswidriger Angriff und mögliche Körperverletzung nach § 223 StGB.',
      authorityResult: '§ 32 StGB – erforderliche Verteidigung gegen den gegenwärtigen rechtswidrigen Angriff.',
      explanation:
        'Ein Angriff begründet Notwehr, aber nicht jede beliebige Gewalt. Die Verteidigung muss erforderlich sein.',
      modelSolution: {
        behavior:
          'Eigensicherung, Verstärkung, Trennen der Personen, Unterbinden des Angriffs, Erste Hilfe, Polizei.',
        legalClassification:
          'Gegenwärtiger rechtswidriger Angriff und mögliche Körperverletzung nach § 223 StGB.',
        legalBasis:
          '§ 32 StGB – Notwehr als erforderliche Verteidigung gegen einen gegenwärtigen rechtswidrigen Angriff.',
        reasoning:
          'Angriff ≠ automatisch jede beliebige Gewalt. Die Verteidigung muss erforderlich und das mildeste geeignete Mittel sein.',
        limits:
          'Erforderlichkeit; Überschreitung kann nur unter den Voraussetzungen des § 33 StGB entschuldigt sein.',
      },
    },
  },

  // ===========================================================================
  // FALL 4 – Besitzentziehung: Eigentum ≠ automatische Gewalt
  // ===========================================================================
  {
    id: 'fahrraddiebstahl',
    title: 'Fahrraddiebstahl vor dem Markt',
    description:
      'Eine Person nimmt ein abgestelltes Fahrrad und fährt davon. Der Eigentümer beobachtet dies.',
    originalCaseText:
      'Sie sind als Sicherheitsmitarbeiter vor einem Markt eingesetzt. Ein Kunde kommt gerade aus dem Markt und sieht, wie eine fremde Person sein abgestelltes Fahrrad nimmt und damit wegfährt. Die Person befindet sich noch in Sichtweite und wird von mehreren Personen verfolgt.',
    facts: [
      { id: 'f1', text: 'Das Fahrrad gehört dem Eigentümer und stand in dessen Besitz.', legallyRelevant: true },
      { id: 'f2', text: 'Eine fremde Person nimmt das Fahrrad und fährt davon.', legallyRelevant: true },
      { id: 'f3', text: 'Der Eigentümer beobachtet die Wegnahme unmittelbar.', legallyRelevant: true },
      { id: 'f4', text: 'Der Täter ist noch in Sichtweite und wird von mehreren Personen verfolgt.', legallyRelevant: true },
      { id: 'f5', text: 'Sie sind als Sicherheitskraft des Marktes anwesend.', legallyRelevant: false },
    ],
    stageOne: {
      prompt: 'Wie verhalten Sie sich?',
      options: [
        {
          id: 's1-a',
          text: 'Ruhe bewahren, den Eigentümer unterstützen und die Polizei verständigen.',
          verdict: 'RICHTIG',
          explanation:
            'Professionelles, deeskalierendes Verhalten und Hinzuziehen der Polizei sind sinnvoll.',
          normIds: ['stpo-127'],
        },
        {
          id: 's1-b',
          text: 'Die Personen nicht gefährden und die Verfolgung nur im erforderlichen Maß fortführen.',
          verdict: 'RICHTIG',
          explanation:
            'Eigensicherung und Verhältnismäßigkeit sind zu beachten; eine Verfolgung darf niemanden gefährden.',
          normIds: ['bgb-859'],
        },
        {
          id: 's1-c',
          text: 'Den Täter sofort mit Gewalt vom Fahrrad reißen.',
          verdict: 'FALSCH',
          explanation:
            'Gewalt ist nur im Rahmen der konkreten Befugnis und nur erforderlich zulässig. Der Eigentümerstatus allein rechtfertigt keine beliebige Gewalt.',
          misconception: 'Eigentümer → darf die Sache immer selbst mit Gewalt wegnehmen.',
          normIds: ['bgb-985', 'bgb-859'],
        },
        {
          id: 's1-d',
          text: 'Die Beobachtung dokumentieren und Zeugen feststellen.',
          verdict: 'RICHTIG',
          explanation:
            'Dokumentation und Zeugenfeststellung sind sinnvoll und unterstützen die spätere Aufklärung.',
          normIds: [],
        },
      ],
      correctOptions: ['s1-a', 's1-b', 's1-d'],
      explanation:
        'Ruhiges Auftreten, Unterstützung des Eigentümers, Polizei, Eigensicherung, Dokumentation und Zeugen sind sinnvoll.',
    },
    stageTwo: {
      prompt: 'Was liegt rechtlich vor?',
      options: [
        {
          id: 's2-a',
          text: 'Möglicher Diebstahl nach § 242 StGB.',
          verdict: 'RICHTIG',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Die Wegnahme einer fremden beweglichen Sache mit Zueignungsabsicht deutet auf § 242 StGB hin.',
          normIds: ['stgb-242'],
        },
        {
          id: 's2-b',
          text: 'Verbotene Eigenmacht nach § 858 BGB.',
          verdict: 'RICHTIG',
          legalLevel: 'PRIVATRECHT',
          explanation:
            'Dem Besitzer wird ohne dessen Willen der Besitz entzogen; das ist verbotene Eigenmacht.',
          normIds: ['bgb-858'],
        },
        {
          id: 's2-c',
          text: 'Besitzentziehung mit Anspruch nach § 861 BGB.',
          verdict: 'RICHTIG',
          legalLevel: 'PRIVATRECHT',
          explanation:
            'Der frühere Besitzer kann unter den Voraussetzungen des § 861 BGB die Wiedereinräumung des Besitzes verlangen.',
          normIds: ['bgb-861'],
        },
        {
          id: 's2-d',
          text: 'Raub nach § 249 StGB.',
          verdict: 'FALSCH',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Für § 249 StGB fehlt es an Gewalt gegen eine Person oder an einer Drohung mit gegenwärtiger Gefahr für Leib oder Leben.',
          misconception: 'Jeden Diebstahl mit qualifiziertem Nötigungsmittel als Raub einordnen.',
          normIds: ['stgb-249'],
        },
      ],
      correctOptions: ['s2-a', 's2-b', 's2-c'],
      explanation:
        'Es liegen ein möglicher Diebstahl, verbotene Eigenmacht und ein Anspruch nach § 861 BGB vor.',
      classificationIds: [
        'classification-diebstahl-verdacht',
        'classification-verbotene-eigenmacht',
        'classification-besitzentziehung',
      ],
    },
    stageThree: {
      prompt: 'Mit welcher Rechtsgrundlage dürfen Sie eingreifen?',
      options: [
        {
          id: 's3-a',
          text: '§ 859 BGB – Selbsthilfe des Besitzers: die Sache dem auf frischer Tat betroffenen oder verfolgten Täter mit Gewalt wieder abnehmen.',
          verdict: 'RICHTIG',
          explanation:
            'Bei verbotener Eigenmacht darf sich der Besitzer mit Gewalt erwehren und die weggenommene Sache dem auf frischer Tat betroffenen oder verfolgten Täter mit Gewalt wieder abnehmen.',
          normIds: ['bgb-859'],
        },
        {
          id: 's3-b',
          text: '§ 985 BGB – Herausgabeanspruch: als Eigentümer die Sache selbst mit Gewalt wegnehmen.',
          verdict: 'FALSCH',
          explanation: '§ 985 BGB ist ein Herausgabeanspruch, keine unmittelbare Gewaltbefugnis.',
          misconception: '§ 985 BGB als automatische Gewaltbefugnis behandeln.',
          normIds: ['bgb-985'],
        },
        {
          id: 's3-c',
          text: '§ 903 BGB – Befugnisse des Eigentümers: als Eigentümer darf man mit der Sache nach Belieben verfahren.',
          verdict: 'FALSCH',
          explanation:
            '§ 903 BGB beschreibt die Eigentümerbefugnis, ist aber kein Herausgabeanspruch und keine Gewaltbefugnis gegen Personen.',
          misconception: '§ 903 BGB mit § 985 BGB bzw. einer Eingriffsbefugnis verwechseln.',
          normIds: ['bgb-903', 'bgb-985'],
        },
        {
          id: 's3-d',
          text: 'Automatisch, weil Eigentum besteht.',
          verdict: 'FALSCH',
          explanation:
            'Eigentum ist nicht dasselbe wie Besitz und begründet keine automatische Gewaltbefugnis.',
          misconception: 'Eigentum → automatisch Sache selbst wegnehmen.',
          normIds: ['bgb-903', 'bgb-859'],
        },
      ],
      correctOptions: ['s3-a'],
      explanation:
        'Als Besitzer kommt § 859 BGB in Betracht: Wiederabnahme der Sache vom auf frischer Tat betroffenen oder verfolgten Täter, nur im erforderlichen Maß. § 985 BGB ist nur ein Anspruch.',
      authorityIds: ['authority-bgb-859'],
    },
    result: {
      behaviorResult:
        'Ruhe bewahren, Eigentümer unterstützen, Polizei verständigen, Eigensicherung, Dokumentation und Zeugen.',
      legalResult:
        'Möglicher Diebstahl (§ 242 StGB), verbotene Eigenmacht (§ 858 BGB) und Anspruch nach § 861 BGB.',
      authorityResult:
        '§ 859 BGB – Selbsthilfe des Besitzers gegen verbotene Eigenmacht, nur im erforderlichen Maß.',
      explanation:
        'Eigentum ist nicht dasselbe wie Besitz. § 985 BGB ist ein Anspruch, keine Gewaltbefugnis; § 859 BGB erlaubt die Besitzerselbsthilfe nur bei verbotener Eigenmacht.',
      modelSolution: {
        behavior:
          'Ruhe bewahren, Eigentümer unterstützen, Polizei, Eigensicherung, Dokumentation, Zeugen.',
        legalClassification:
          'Möglicher Diebstahl (§ 242 StGB), verbotene Eigenmacht (§ 858 BGB), Anspruch nach § 861 BGB.',
        legalBasis:
          '§ 859 BGB – Selbsthilfe des Besitzers gegen verbotene Eigenmacht; Wiederabnahme vom auf frischer Tat betroffenen oder verfolgten Täter.',
        reasoning:
          '§ 985 BGB beantwortet nicht, ob die Sache selbst mit Gewalt zurückgenommen werden darf. Eigentum ≠ Besitz.',
        limits:
          'Gewalt nur im erforderlichen Maß; kein allgemeiner Freibrief; § 230 BGB – Grenzen der Selbsthilfe und Verhältnismäßigkeit.',
      },
    },
  },

  // ===========================================================================
  // FALL 5 – Gefahr: Die Richtung der Einwirkung entscheidet
  // Defensivnotstand (§ 228 BGB) vs. Aggressivnotstand (§ 904 BGB)
  // ===========================================================================
  {
    id: 'kind-im-auto',
    title: 'Kind im heißen Auto',
    description:
      'Ein kleines Kind ist bei großer Hitze allein in einem verschlossenen Auto eingeschlossen und wirkt apathisch.',
    originalCaseText:
      'Sie sind als Sicherheitsmitarbeiter vor einem Markt eingesetzt. Bei großer Hitze entdecken Sie ein kleines Kind allein in einem verschlossenen Auto. Das Kind wirkt apathisch und reagiert kaum. Die Eltern sind nicht auffindbar und der Rettungsdienst sowie die Polizei benötigen noch Zeit.',
    facts: [
      { id: 'f1', text: 'Bei sommerlicher Hitze ist ein kleines Kind allein in einem verschlossenen Auto.', legallyRelevant: true },
      { id: 'f2', text: 'Das Kind wirkt apathisch und reagiert kaum.', legallyRelevant: true },
      { id: 'f3', text: 'Die Eltern sind nicht auffindbar; ein Schlüssel ist nicht erreichbar.', legallyRelevant: true },
      { id: 'f4', text: 'Rettungsdienst und Polizei sind verständigt, benötigen aber Zeit.', legallyRelevant: true },
      { id: 'f5', text: 'Das Auto gehört einer fremden Person.', legallyRelevant: true },
    ],
    stageOne: {
      prompt: 'Wie verhalten Sie sich?',
      options: [
        {
          id: 's1-a',
          text: 'Sofort Rettungsdienst und Polizei verständigen und das Kind beobachten.',
          verdict: 'RICHTIG',
          explanation: 'Rettungsdienst und Polizei sind unverzüglich zu verständigen; die Lage ist zu beobachten.',
          normIds: ['stgb-34'],
        },
        {
          id: 's1-b',
          text: 'Eigensicherung beachten und weitere Personen zur Hilfe organisieren.',
          verdict: 'RICHTIG',
          explanation: 'Eigensicherung und Organisation von Hilfe sind sinnvoll.',
          normIds: [],
        },
        {
          id: 's1-c',
          text: 'Nichts tun und auf das Eintreffen des Rettungsdienstes warten.',
          verdict: 'FALSCH',
          explanation:
            'Bei gegenwärtiger Gefahr für Leben und Leib ist ein sofortiges Eingreifen geboten, wenn staatliche Hilfe nicht rechtzeitig erreichbar ist.',
          misconception: 'Gefahr unterschätzen und notwendiges sofortiges Eingreifen unterlassen.',
          normIds: ['stgb-34', 'bgb-228'],
        },
        {
          id: 's1-d',
          text: 'Die Seitenscheibe einschlagen, um das Kind zu befreien.',
          verdict: 'TEILWEISE_RICHTIG',
          explanation:
            'Das Einschlagen der Scheibe kann als letztes Mittel erforderlich sein. Es ist aber erst zu prüfen, ob mildere Mittel (z. B. Fahrzeugöffnung) rechtzeitig verfügbar sind.',
          misconception: 'Sofort die Sache beschädigen, ohne mildere Mittel zu prüfen.',
          normIds: ['bgb-228'],
        },
      ],
      correctOptions: ['s1-a', 's1-b'],
      explanation:
        'Rettungsdienst und Polizei verständigen, Eigensicherung beachten und Hilfe organisieren. Das Einschlagen der Scheibe ist nur als erforderliches letztes Mittel zulässig.',
    },
    stageTwo: {
      prompt: 'Was liegt rechtlich vor?',
      options: [
        {
          id: 's2-a',
          text: 'Gegenwärtige, nicht anders abwendbare Gefahr für Leben und Leib.',
          verdict: 'RICHTIG',
          legalLevel: 'RECHTSBEGRIFF',
          explanation:
            'Die Hitze im verschlossenen Auto und der apathische Zustand begründen eine gegenwärtige, nicht anders abwendbare Gefahr für Leben und Leib.',
          normIds: ['stgb-34'],
        },
        {
          id: 's2-b',
          text: 'Defensivnotstandslage: Die konkrete Gefahr geht vom Pkw als Gefahrenquelle aus.',
          verdict: 'RICHTIG',
          legalLevel: 'PRIVATRECHT',
          explanation:
            'Die Gefahr für das Kind geht von dem überhitzten, verschlossenen Pkw selbst aus. Wird zur Rettung auf genau diesen Pkw eingewirkt, ist die Richtung der Einwirkung entscheidend: Die Gefahr stammt aus der Sache, auf die eingewirkt wird – das ist die Fallgruppe des Defensivnotstands (§ 228 BGB). Das ist eine rechtlich zu prüfende Einordnung, keine bereits feststehende Subsumtion.',
          normIds: ['bgb-228'],
        },
        {
          id: 's2-c',
          text: 'Angriff im Sinne der Notwehr.',
          verdict: 'FALSCH',
          legalLevel: 'RECHTSBEGRIFF',
          explanation:
            'Es liegt kein Angriff einer Person vor, sondern eine Gefahr. Gefahr ≠ Angriff.',
          misconception: 'Gefahr und Angriff vermischen.',
          normIds: ['stgb-32'],
        },
        {
          id: 's2-d',
          text: 'Verbotene Eigenmacht an dem Fahrzeug.',
          verdict: 'FALSCH',
          legalLevel: 'PRIVATRECHT',
          explanation:
            'Die Einwirkung auf die fremde Sache dient der Gefahrenabwehr und ist gerade nicht ohne Weiteres verbotene Eigenmacht.',
          misconception: 'Gefahrenabwehr als verbotene Eigenmacht einordnen.',
          normIds: ['bgb-858'],
        },
      ],
      correctOptions: ['s2-a', 's2-b'],
      explanation:
        'Es liegt eine gegenwärtige, nicht anders abwendbare Gefahr für Leben und Leib vor. Weil die Gefahr vom Pkw als Gefahrenquelle ausgeht und die Rettung auf diesen Pkw einwirkt, liegt eine Defensivnotstandslage nach § 228 BGB vor (zu prüfen).',
      classificationIds: ['classification-gegenwaertige-gefahr', 'classification-defensivnotstandslage'],
    },
    stageThree: {
      prompt: 'Mit welcher Rechtsgrundlage dürfen Sie eingreifen?',
      options: [
        {
          id: 's3-a',
          text: '§ 228 BGB – Notstand (fachliche Einordnung: Defensivnotstand): Die Gefahr geht vom Pkw als Gefahrenquelle aus und die Einwirkung richtet sich gegen diese Sache selbst.',
          verdict: 'RICHTIG',
          explanation:
            'Da die Gefahr von dem Pkw als Gefahrenquelle ausgeht und die Rettung des Kindes eine Einwirkung auf eben diesen Pkw erfordert, ist zunächst § 228 BGB als spezieller zivilrechtlicher Rechtfertigungsgrund zu prüfen. Die Einwirkung muss erforderlich sein; mildere, gleich wirksame Mittel sind vorrangig zu prüfen. Die durch die Einwirkung verursachte Beschädigung darf nicht außer Verhältnis zur abgewehrten Gefahr stehen.',
          normIds: ['bgb-228'],
        },
        {
          id: 's3-b',
          text: '§ 904 BGB – Notstand (fachliche Einordnung: Aggressivnotstand): Einwirkung auf eine unbeteiligte fremde Sache.',
          verdict: 'FALSCH',
          explanation:
            '§ 904 BGB betrifft grundsätzlich den aggressiven Notstand und damit die Einwirkung auf eine unbeteiligte fremde Sache. Das ist hier nicht die primäre Einordnung, weil die Gefahr gerade vom betroffenen Pkw ausgeht. § 904 BGB kann abstrakt ergänzend diskutiert werden, ist für diesen konkreten Fall aber nicht die tragende Rechtsgrundlage.',
          misconception:
            'Fremde Sache → automatisch § 904 BGB (aggressiver Notstand), ohne die Richtung der Einwirkung zu prüfen.',
          normIds: ['bgb-904'],
        },
        {
          id: 's3-c',
          text: '§ 34 StGB – Rechtfertigender Notstand als ergänzender strafrechtlicher Rechtfertigungsgrund.',
          verdict: 'RICHTIG',
          explanation:
            'Ergänzend ist § 34 StGB als allgemeiner strafrechtlicher Rechtfertigungsgrund zu prüfen. Die §§ 228/904 BGB sind gegenüber § 34 StGB die spezielleren zivilrechtlichen Regelungen für die Einwirkung auf eine Sache; § 34 StGB tritt daher nicht an die Stelle der speziellen zivilrechtlichen Prüfung, sondern ergänzt sie.',
          normIds: ['stgb-34'],
        },
        {
          id: 's3-d',
          text: 'Gefahr → automatisch § 34 StGB, ohne weitere Prüfung.',
          verdict: 'FALSCH',
          explanation:
            '§ 34 StGB verlangt zusätzlich die nicht anders abwendbare Gefahr, die Interessenabwägung und ein angemessenes Mittel. Zudem ist hier zuerst die spezielle zivilrechtliche Rechtfertigung nach § 228 BGB zu prüfen.',
          misconception: 'Gefahr → automatisch § 34 StGB.',
          normIds: ['stgb-34'],
        },
      ],
      correctOptions: ['s3-a', 's3-c'],
      explanation:
        'Die Gefahr geht vom Pkw als Gefahrenquelle aus; die Rettung wirkt auf genau diesen Pkw ein. Deshalb ist zunächst § 228 BGB – Notstand (fachliche Einordnung: Defensivnotstand) als spezieller zivilrechtlicher Rechtfertigungsgrund zu prüfen – erforderlich und nicht außer Verhältnis zur Gefahr. Ergänzend ist § 34 StGB – Rechtfertigender Notstand als strafrechtlicher Rechtfertigungsgrund zu betrachten. § 904 BGB – Notstand (fachliche Einordnung: Aggressivnotstand) beträfe eine unbeteiligte fremde Sache und ist hier nicht die primäre Einordnung.',
      authorityIds: ['authority-bgb-228', 'authority-stgb-34'],
    },
    result: {
      behaviorResult:
        'Rettungsdienst und Polizei verständigen, Eigensicherung, Hilfe organisieren; Sacheingriff nur als erforderliches letztes Mittel.',
      legalResult:
        'Gegenwärtige, nicht anders abwendbare Gefahr für Leben und Leib; Defensivnotstandslage, weil die Gefahr vom Pkw als Gefahrenquelle ausgeht.',
      authorityResult:
        '§ 228 BGB – Notstand (fachliche Einordnung: Defensivnotstand; Gefahr geht vom Pkw aus); ergänzend § 34 StGB – Rechtfertigender Notstand.',
      explanation:
        'Die Gefahr geht in dieser Konstellation vom überhitzten, verschlossenen Pkw selbst aus. Wird zur Rettung auf genau diesen Pkw eingewirkt, ist die Richtung der Einwirkung entscheidend: Die Gefahr stammt aus der Sache – das ist der Defensivnotstand (§ 228 BGB). § 904 BGB betrifft dagegen den aggressiven Notstand und damit die Einwirkung auf eine unbeteiligte fremde Sache. Beide verlangen Erforderlichkeit und eine Prüfung der Verhältnismäßigkeit.',
      modelSolution: {
        behavior:
          'Rettungsdienst und Polizei verständigen, Eigensicherung, Hilfe organisieren, Kind beobachten.',
        legalClassification:
          'Gegenwärtige, nicht anders abwendbare Gefahr für Leben und Leib; Defensivnotstandslage, weil die Gefahr vom Pkw als Gefahrenquelle ausgeht.',
        legalBasis:
          '§ 228 BGB – Notstand (fachliche Einordnung: Defensivnotstand); ergänzend ist § 34 StGB – Rechtfertigender Notstand zu betrachten.',
        reasoning:
          'Es liegt eine gegenwärtige Gefahr für Leben und Leib des Kindes vor. Die Gefahr geht in der konkreten Konstellation vom überhitzten, verschlossenen Pkw aus. Wird zur Rettung des Kindes auf diesen Pkw selbst eingewirkt, ist zunächst der Defensivnotstand nach § 228 BGB zu prüfen. Das Einschlagen der Scheibe kann gerechtfertigt sein, wenn es zur Gefahrenabwehr erforderlich ist und die Beschädigung nicht außer Verhältnis zur abgewehrten Gefahr steht. Mildere gleich geeignete Mittel sind vorrangig zu prüfen. Die §§ 228/904 BGB sind gegenüber § 34 StGB die spezielleren zivilrechtlichen Regelungen; § 34 StGB ist ergänzend zu prüfen.',
        limits:
          'Erforderlichkeit und Verhältnismäßigkeit; mildere Mittel zuerst; bei verschuldeter Gefahr Schadensersatzpflicht nach § 228 BGB beachten.',
      },
    },
  },

  // ===========================================================================
  // FALL 6 – Beleidigung: Tatbestand ≠ Eingriffsbefugnis
  // ===========================================================================
  {
    id: 'beleidigung-deeskalation',
    title: 'Beleidigung an der Einlasskontrolle',
    description:
      'Ein Besucher beschimpft die Sicherheitskraft lautstark, wird aber nicht tätlich.',
    originalCaseText:
      'Sie sind als Sicherheitsmitarbeiter an der Einlasskontrolle einer Veranstaltung eingesetzt. Ein Besucher beschimpft Sie lautstark und ehrverletzend. Der Besucher wird dabei weder körperlich tätlich noch bedroht Sie. Mehrere andere Besucher beobachten die Situation.',
    facts: [
      { id: 'f1', text: 'Sie kontrollieren den Einlass einer Veranstaltung.', legallyRelevant: false },
      { id: 'f2', text: 'Ein Besucher beschimpft Sie lautstark und ehrverletzend.', legallyRelevant: true },
      { id: 'f3', text: 'Der Besucher wird nicht tätlich und bedroht Sie nicht.', legallyRelevant: true },
      { id: 'f4', text: 'Weitere Besucher beobachten die Situation.', legallyRelevant: true },
    ],
    stageOne: {
      prompt: 'Wie verhalten Sie sich?',
      options: [
        {
          id: 's1-a',
          text: 'Ruhig bleiben, sich nicht provozieren lassen und deeskalierend kommunizieren.',
          verdict: 'RICHTIG',
          explanation:
            'Selbstbeherrschung und deeskalierende, nicht-aggressive Wortwahl sind das Kernverhalten.',
          normIds: ['stgb-185'],
        },
        {
          id: 's1-b',
          text: 'Ich-Botschaften verwenden und die Situation sachlich klären.',
          verdict: 'RICHTIG',
          explanation: 'Ich-Botschaften und sachliche Klärung wirken deeskalierend.',
          normIds: [],
        },
        {
          id: 's1-c',
          text: 'Den Besucher zurückbeleidigen.',
          verdict: 'FALSCH',
          explanation:
            'Eine zurückbeleidigende Äußerung kann selbst § 185 StGB erfüllen und eskaliert die Lage.',
          misconception: 'Beleidigungen nicht eskalieren lassen – hier wird eskaliert.',
          normIds: ['stgb-185'],
        },
        {
          id: 's1-d',
          text: 'Den Besucher wegen der Beleidigung sofort festhalten.',
          verdict: 'FALSCH',
          explanation:
            'Eine Beleidigung begründet keine automatische Festhaltebefugnis. Die konkrete Rechtsgrundlage ist gesondert zu prüfen.',
          misconception: 'Straftatbestand → automatisch Festhaltebefugnis.',
          normIds: ['stgb-185', 'stpo-127'],
        },
      ],
      correctOptions: ['s1-a', 's1-b'],
      explanation:
        'Ruhig bleiben, nicht provozieren lassen, deeskalierend und mit Ich-Botschaften kommunizieren.',
    },
    stageTwo: {
      prompt: 'Was liegt rechtlich vor?',
      options: [
        {
          id: 's2-a',
          text: 'Mögliche Beleidigung nach § 185 StGB.',
          verdict: 'RICHTIG',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Eine ehrverletzende Äußerung kann § 185 StGB erfüllen. Tatbestand und Strafverfolgung sind getrennt zu prüfen.',
          normIds: ['stgb-185'],
        },
        {
          id: 's2-b',
          text: 'Mögliche Nötigung nach § 240 StGB.',
          verdict: 'FALSCH',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Für eine Nötigung fehlt es an Gewalt oder Drohung mit einem empfindlichen Übel zu einer Handlung, Duldung oder Unterlassung.',
          misconception: 'Beleidigung mit Nötigung verwechseln.',
          normIds: ['stgb-240'],
        },
        {
          id: 's2-c',
          text: 'Gegenwärtiger rechtswidriger Angriff im Sinne der Notwehr.',
          verdict: 'FALSCH',
          legalLevel: 'RECHTSBEGRIFF',
          explanation:
            'Eine bloße Beleidigung ist kein gegenwärtiger rechtswidriger Angriff, der eine Notwehrlage begründet.',
          misconception: 'Angriff → automatisch Notwehr; hier fehlt es bereits an einem Angriff.',
          normIds: ['stgb-32'],
        },
        {
          id: 's2-d',
          text: 'Antragsdelikt bzw. Privatklagedelikt.',
          verdict: 'RICHTIG',
          legalLevel: 'STRAFRECHT',
          explanation:
            '§ 185 StGB ist ein Antragsdelikt und gehört zu den in § 374 StPO genannten Privatklagedelikten.',
          normIds: ['stgb-185', 'stpo-374'],
        },
      ],
      correctOptions: ['s2-a', 's2-d'],
      explanation:
        'Es kommt eine mögliche Beleidigung nach § 185 StGB in Betracht; sie ist antrags- und privatklagefähig.',
      classificationIds: ['classification-beleidigung'],
    },
    stageThree: {
      prompt: 'Mit welcher Rechtsgrundlage dürfen Sie eingreifen?',
      options: [
        {
          id: 's3-a',
          text: 'Keine Gewaltbefugnis aus § 185 StGB; der Sachverhalt ist zu dokumentieren und ggf. Strafantrag/Privatklage zu prüfen.',
          verdict: 'RICHTIG',
          explanation:
            '§ 185 StGB begründet keine Eingriffs- oder Gewaltbefugnis. Bei Beleidigung kommt die Dokumentation und ggf. der Strafantrag bzw. die Privatklage in Betracht.',
          normIds: ['stgb-185', 'stpo-374', 'stpo-376'],
        },
        {
          id: 's3-b',
          text: '§ 127 Abs. 1 StPO – Vorläufige Festnahme: die Beleidigung rechtfertigt automatisch die Festnahme.',
          verdict: 'FALSCH',
          explanation:
            '§ 127 StPO verlangt frische Tat und zusätzlich Fluchtverdacht oder nicht sofort feststellbare Identität. Die Beleidigung allein genügt nicht.',
          misconception: 'Straftatbestand → automatisch Festhaltebefugnis.',
          normIds: ['stpo-127'],
        },
        {
          id: 's3-c',
          text: '§ 32 StGB – Notwehr gegen die Beleidigung.',
          verdict: 'FALSCH',
          explanation: 'Es fehlt an einem gegenwärtigen rechtswidrigen Angriff; eine Beleidigung begründet keine Notwehrlage.',
          misconception: 'Angriff → automatisch Notwehr.',
          normIds: ['stgb-32'],
        },
        {
          id: 's3-d',
          text: '§ 34 StGB – Rechtfertigender Notstand wegen der Ehrverletzung.',
          verdict: 'FALSCH',
          explanation: '§ 34 StGB verlangt eine gegenwärtige, nicht anders abwendbare Gefahr und eine Interessenabwägung.',
          misconception: 'Gefahr → automatisch § 34 StGB.',
          normIds: ['stgb-34'],
        },
      ],
      correctOptions: ['s3-a'],
      explanation:
        'Aus § 185 StGB folgt keine Gewaltbefugnis. Zu prüfen sind Dokumentation sowie Strafantrag bzw. Privatklage (§§ 374, 376 StPO).',
      authorityIds: [],
    },
    result: {
      behaviorResult:
        'Ruhig bleiben, nicht provozieren lassen, deeskalierend und mit Ich-Botschaften kommunizieren.',
      legalResult: 'Mögliche Beleidigung nach § 185 StGB (Antrags- und Privatklagedelikt).',
      authorityResult:
        'Keine Gewaltbefugnis aus § 185 StGB; Dokumentation und ggf. Strafantrag/Privatklage (§§ 374, 376 StPO).',
      explanation:
        'Ein Straftatbestand ist nicht automatisch eine Eingriffsbefugnis. Eine Beleidigung begründet weder Notwehr noch eine Festhaltebefugnis.',
      modelSolution: {
        behavior: 'Selbstbeherrschung, Deeskalation, nicht-aggressive Wortwahl, Ich-Botschaften.',
        legalClassification: 'Mögliche Beleidigung nach § 185 StGB; Antrags- und Privatklagedelikt.',
        legalBasis:
          'Keine Gewaltbefugnis. Dokumentation sowie Strafantrag bzw. Privatklage nach §§ 374, 376 StPO prüfen.',
        reasoning:
          'Straftatbestand ≠ Eingriffsbefugnis. § 185 StGB begründet keine Notwehrlage und keine Festhaltebefugnis.',
        limits: 'Keine Gewalt; Verhältnismäßigkeit; Strafverfolgungsart beachten.',
      },
    },
  },

  // ===========================================================================
  // FALL 7 – Besitzentziehung im Laden (Klopapier): Besitzer ≠ automatisch
  // beliebige Gewalt; § 859 BGB setzt verbotene Eigenmacht voraus.
  // Didaktische Grundlage: Fallbeispiel 4 der Themenvertiefung.
  // ===========================================================================
  {
    id: 'klopapier-einkaufswagen',
    title: 'Wegnahme aus dem Einkaufswagen',
    description:
      'Person B nimmt Person A die letzte Rolle Klopapier aus dem Einkaufswagen und legt sie in den eigenen Wagen.',
    originalCaseText:
      'Sie sind als Sicherheitsmitarbeiter in einem Supermarkt eingesetzt. Person A hat gerade die letzte Rolle Klopapier in ihren Einkaufswagen gelegt. Person B nimmt die Rolle ohne Zustimmung aus dem Einkaufswagen der A und legt sie in den eigenen Einkaufswagen.',
    facts: [
      { id: 'f1', text: 'Person A hat die letzte Rolle Klopapier aus der Verkaufsfläche genommen und in ihren Einkaufswagen gelegt.', legallyRelevant: true },
      { id: 'f2', text: 'Person B beobachtet dies und nimmt die Rolle aus dem Einkaufswagen der A.', legallyRelevant: true },
      { id: 'f3', text: 'Person B legt die Rolle in ihren eigenen Einkaufswagen.', legallyRelevant: true },
      { id: 'f4', text: 'Die Rolle ist noch nicht bezahlt; das Eigentum liegt beim Markt.', legallyRelevant: true },
      { id: 'f5', text: 'Sie sind als Sicherheitskraft des Marktes anwesend.', legallyRelevant: false },
    ],
    stageOne: {
      prompt: 'Wie verhalten Sie sich?',
      options: [
        {
          id: 's1-a',
          text: 'Ruhe bewahren, beide Personen ansprechen und die Situation sachlich und deeskalierend klären.',
          verdict: 'RICHTIG',
          explanation:
            'Ruhige, professionelle und deeskalierende Kommunikation ist im Umgang mit Menschen das Kernverhalten.',
          normIds: [],
        },
        {
          id: 's1-b',
          text: 'Die Beteiligten trennen, Personalien aufnehmen und den Vorfall dokumentieren.',
          verdict: 'RICHTIG',
          explanation:
            'Trennen, Personalienaufnahme und Dokumentation sind sinnvoll und unterstützen die weitere Klärung.',
          normIds: [],
        },
        {
          id: 's1-c',
          text: 'Person B sofort mit körperlicher Gewalt die Rolle wieder aus dem Wagen nehmen.',
          verdict: 'FALSCH',
          explanation:
            'Der Besitzstand allein rechtfertigt keine beliebige Gewalt. Eine Selbsthilfe setzt die konkreten Voraussetzungen der einschlägigen Norm voraus.',
          misconception:
            'Besitzer → darf immer Gewalt anwenden. § 859 BGB ist kein allgemeiner Freibrief zur Gewalt.',
          normIds: ['bgb-859', 'bgb-858'],
        },
        {
          id: 's1-d',
          text: 'Person B laut beschimpfen, damit sie die Rolle zurückgibt.',
          verdict: 'FALSCH',
          explanation:
            'Beschimpfungen eskalieren die Lage und widersprechen deeskalierender Kommunikation.',
          misconception: 'Beleidigungen eskalieren lassen, statt deeskalierend zu kommunizieren.',
          normIds: ['stgb-185'],
        },
      ],
      correctOptions: ['s1-a', 's1-b'],
      explanation:
        'Ruhige Klärung, Trennen, Personalienaufnahme und Dokumentation sind sinnvoll; körperliche Gewalt und Beschimpfungen sind es nicht.',
    },
    stageTwo: {
      prompt: 'Was liegt rechtlich vor?',
      options: [
        {
          id: 's2-a',
          text: 'Verbotene Eigenmacht nach § 858 BGB.',
          verdict: 'RICHTIG',
          legalLevel: 'PRIVATRECHT',
          explanation:
            'Person B entzieht der A den Besitz an der Rolle ohne deren Willen und ohne gesetzliche Gestattung; das ist verbotene Eigenmacht.',
          normIds: ['bgb-858'],
        },
        {
          id: 's2-b',
          text: 'Besitzentziehung mit Anspruch nach § 861 BGB.',
          verdict: 'RICHTIG',
          legalLevel: 'PRIVATRECHT',
          explanation:
            'Die frühere Besitzerin A kann unter den Voraussetzungen des § 861 BGB die Wiedereinräumung des Besitzes verlangen.',
          normIds: ['bgb-861'],
        },
        {
          id: 's2-c',
          text: 'Möglicher Diebstahl nach § 242 StGB.',
          verdict: 'FALSCH',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Das Eigentum liegt beim Markt; Person B nimmt die Rolle nicht einem Dritten weg, um sie sich rechtswidrig zuzueignen, sondern streitig aus dem Wagen. Die Voraussetzungen des § 242 StGB sind gesondert zu prüfen und hier nicht ohne Weiteres erfüllt.',
          misconception: 'Jede Wegnahme automatisch als Diebstahl einordnen.',
          normIds: ['stgb-242'],
        },
        {
          id: 's2-d',
          text: 'Mögliche Körperverletzung nach § 223 StGB.',
          verdict: 'FALSCH',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Es kommt zu keiner körperlichen Misshandlung oder Gesundheitsschädigung; eine Körperverletzung liegt nicht vor.',
          misconception: 'Einen Streit ohne körperliche Einwirkung als Körperverletzung einordnen.',
          normIds: ['stgb-223'],
        },
      ],
      correctOptions: ['s2-a', 's2-b'],
      explanation:
        'Rechtlich liegen eine verbotene Eigenmacht nach § 858 BGB und ein Anspruch nach § 861 BGB vor.',
      classificationIds: ['classification-verbotene-eigenmacht', 'classification-besitzentziehung'],
    },
    stageThree: {
      prompt: 'Mit welcher Rechtsgrundlage dürfen Sie eingreifen?',
      options: [
        {
          id: 's3-a',
          text: '§ 859 BGB – Selbsthilfe des Besitzers: der verbotenen Eigenmacht mit Gewalt begegnen bzw. die Sache dem auf frischer Tat betroffenen oder verfolgten Täter wieder abnehmen, nur im erforderlichen Maß.',
          verdict: 'RICHTIG',
          explanation:
            'Bei verbotener Eigenmacht darf sich der Besitzer nach § 859 BGB mit Gewalt erwehren und eine weggenommene bewegliche Sache dem auf frischer Tat betroffenen oder verfolgten Täter mit Gewalt wieder abnehmen.',
          normIds: ['bgb-859', 'bgb-858'],
        },
        {
          id: 's3-b',
          text: '§ 861 BGB – Anspruch wegen Besitzentziehung: die Wiedereinräumung des Besitzes selbst mit Gewalt durchsetzen.',
          verdict: 'FALSCH',
          explanation:
            '§ 861 BGB ist ein Anspruch auf Wiedereinräumung, keine unmittelbare Gewaltbefugnis.',
          misconception:
            'Anspruch mit Befugnis verwechseln: § 861 BGB beantwortet nicht, ob ich den Besitz selbst mit Gewalt wiederherstellen darf.',
          normIds: ['bgb-861'],
        },
        {
          id: 's3-c',
          text: '§ 985 BGB – Herausgabeanspruch: als Eigentümer die Sache selbst mit Gewalt wegnehmen.',
          verdict: 'FALSCH',
          explanation:
            '§ 985 BGB ist ein Herausgabeanspruch des Eigentümers, keine unmittelbare Gewaltbefugnis.',
          misconception: '§ 985 BGB als automatische Gewaltbefugnis behandeln.',
          normIds: ['bgb-985'],
        },
        {
          id: 's3-d',
          text: 'Allein wegen des Besitzes ist jede beliebige Gewalt erlaubt.',
          verdict: 'FALSCH',
          explanation:
            '§ 859 BGB ist kein allgemeiner Freibrief; die Selbsthilfe ist auf das erforderliche Maß begrenzt.',
          misconception: 'Besitzer → darf immer Gewalt anwenden.',
          normIds: ['bgb-859'],
        },
      ],
      correctOptions: ['s3-a'],
      explanation:
        'Als Besitzer kommt § 859 BGB in Betracht, aber nur bei verbotener Eigenmacht und nur im erforderlichen Maß. § 861 und § 985 BGB sind Ansprüche, keine Gewaltbefugnisse.',
      authorityIds: ['authority-bgb-859'],
    },
    result: {
      behaviorResult:
        'Ruhe bewahren, Beteiligte trennen, Personalien aufnehmen und Vorfall dokumentieren; keine Gewalt, keine Beschimpfungen.',
      legalResult:
        'Verbotene Eigenmacht (§ 858 BGB) und Anspruch auf Wiedereinräumung des Besitzes (§ 861 BGB).',
      authorityResult:
        '§ 859 BGB – Selbsthilfe des Besitzers gegen verbotene Eigenmacht, nur im erforderlichen Maß.',
      explanation:
        'Besitz begründet keine beliebige Gewalt. § 861 BGB ist ein Anspruch, keine Selbsthilfebefugnis; § 859 BGB setzt verbotene Eigenmacht voraus und ist auf das erforderliche Maß begrenzt.',
      modelSolution: {
        behavior:
          'Ruhe bewahren, Beteiligte trennen, Personalien aufnehmen, Vorfall dokumentieren.',
        legalClassification:
          'Verbotene Eigenmacht (§ 858 BGB) und Besitzentziehung mit Anspruch nach § 861 BGB.',
        legalBasis:
          '§ 859 BGB – Selbsthilfe des Besitzers gegen verbotene Eigenmacht; Wiederabnahme vom auf frischer Tat betroffenen oder verfolgten Täter.',
        reasoning:
          'Besitzer ≠ automatisch beliebige Gewalt. § 861 BGB ist ein Anspruch; die Selbsthilfebefugnis folgt aus § 859 BGB nur bei verbotener Eigenmacht.',
        limits:
          'Erforderlichkeit; § 859 BGB ist kein allgemeiner Freibrief; § 230 BGB – Grenzen der Selbsthilfe und Verhältnismäßigkeit.',
      },
    },
  },

  // ===========================================================================
  // FALL 8 – Hausverbot / Marktschließung: Hausrecht ≠ automatisch Gewalt
  // Didaktische Grundlage: Fallbeispiel 5 der Themenvertiefung.
  // ===========================================================================
  {
    id: 'marktschliessung-hausverbot',
    title: 'Marktschließung und Hausverbot',
    description:
      'Der Markt schließt; ein Kunde weigert sich trotz mehrfacher Aufforderung, das Geschäft zu verlassen.',
    originalCaseText:
      'Sie sind als Sicherheitsmitarbeiter in einem Markt eingesetzt. Der Markt soll geschlossen werden und die Mitarbeiterinnen A und B fordern den Kunden K mehrfach auf, das Geschäft zu verlassen. K ist mit seinem Einkauf noch nicht fertig und weigert sich trotzdem zu gehen. Er verhält sich dabei nicht körperlich aggressiv.',
    facts: [
      { id: 'f1', text: 'Der Markt wird geschlossen; die Mitarbeiterinnen A und B fordern den Kunden K zum Verlassen auf.', legallyRelevant: true },
      { id: 'f2', text: 'Der Kunde K ist mit seinem Einkauf noch nicht fertig.', legallyRelevant: false },
      { id: 'f3', text: 'Der Kunde K weigert sich trotz mehrfacher Aufforderung, das Geschäft zu verlassen.', legallyRelevant: true },
      { id: 'f4', text: 'Der Kunde verhält sich nicht tätlich, aber beharrlich ablehnend.', legallyRelevant: true },
      { id: 'f5', text: 'Sie sind als Sicherheitskraft hinzugezogen worden.', legallyRelevant: false },
    ],
    stageOne: {
      prompt: 'Wie verhalten Sie sich?',
      options: [
        {
          id: 's1-a',
          text: 'Ruhe bewahren, die Schließung und das Hausverbot ruhig und eindeutig kommunizieren.',
          verdict: 'RICHTIG',
          explanation:
            'Klare, ruhige Kommunikation des Hausrechts ist das angemessene Vorgehen und vermeidet eine Eskalation.',
          normIds: ['stgb-123'],
        },
        {
          id: 's1-b',
          text: 'Deeskalierend begleiten und bei fortgesetzter Weigerung die Polizei verständigen.',
          verdict: 'RICHTIG',
          explanation:
            'Deeskalation und Hinzuziehen der Polizei sind sinnvoll; die Sicherheitskraft hat keine Polizeibefugnisse.',
          normIds: ['stpo-127'],
        },
        {
          id: 's1-c',
          text: 'Den Kunden sofort mit körperlicher Gewalt aus dem Gebäude drängen.',
          verdict: 'FALSCH',
          explanation:
            'Aus dem Hausrecht oder einem Hausfriedensbruch folgt nicht automatisch eine Gewaltbefugnis. Die konkrete Rechtsgrundlage ist gesondert zu prüfen.',
          misconception:
            'Hausverbot → automatisch Gewalt. Ein Hausverbot begründet keine automatische Gewaltbefugnis.',
          normIds: ['stgb-123', 'bgb-859'],
        },
        {
          id: 's1-d',
          text: 'Den Kunden provozieren, damit er freiwillig geht.',
          verdict: 'FALSCH',
          explanation: 'Provokationen eskalieren die Lage und widersprechen der Deeskalation.',
          misconception: 'Sich provozieren lassen und die Lage eskalieren.',
          normIds: ['stgb-185'],
        },
      ],
      correctOptions: ['s1-a', 's1-b'],
      explanation:
        'Ruhige Kommunikation des Hausrechts, Deeskalation und ggf. Hinzuziehen der Polizei sind sinnvoll.',
    },
    stageTwo: {
      prompt: 'Was liegt rechtlich vor?',
      options: [
        {
          id: 's2-a',
          text: 'Möglicher Hausfriedensbruch nach § 123 StGB (unbefugtes Verweilen trotz Aufforderung).',
          verdict: 'RICHTIG',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Wer ohne Befugnis in Geschäftsräumen verweilt und sich trotz Aufforderung des Berechtigten nicht entfernt, kann § 123 StGB erfüllen. Die Tat wird nur auf Antrag verfolgt.',
          normIds: ['stgb-123'],
        },
        {
          id: 's2-b',
          text: 'Verbotene Eigenmacht nach § 858 BGB durch das Verweilen.',
          verdict: 'RICHTIG',
          legalLevel: 'PRIVATRECHT',
          explanation: 'Das unbefugte Verweilen kann eine Störung des Besitzes des Berechtigten darstellen.',
          normIds: ['bgb-858'],
        },
        {
          id: 's2-c',
          text: 'Schwerer Hausfriedensbruch nach § 124 StGB.',
          verdict: 'FALSCH',
          legalLevel: 'STRAFRECHT',
          explanation:
            '§ 124 StGB setzt eine Menschenmenge, öffentliches Zusammenrotten und Gewaltabsicht voraus. Diese Voraussetzungen sind hier nicht erkennbar.',
          misconception: '§ 123 StGB und § 124 StGB verwechseln; § 124 verlangt zusätzliche Voraussetzungen.',
          normIds: ['stgb-124'],
        },
        {
          id: 's2-d',
          text: 'Mögliche Nötigung nach § 240 StGB durch das Verweilen.',
          verdict: 'FALSCH',
          legalLevel: 'STRAFRECHT',
          explanation:
            'Für eine Nötigung fehlt es an Gewalt oder einer Drohung mit einem empfindlichen Übel; die Verwerflichkeit wäre gesondert zu prüfen.',
          misconception: 'Jedes hartnäckige Verweilen automatisch als Nötigung einordnen.',
          normIds: ['stgb-240'],
        },
      ],
      correctOptions: ['s2-a', 's2-b'],
      explanation:
        'Es kommt ein Hausfriedensbruch nach § 123 StGB (Antragsdelikt) sowie eine verbotene Eigenmacht nach § 858 BGB in Betracht.',
      classificationIds: ['classification-hausfriedensbruch', 'classification-verbotene-eigenmacht'],
    },
    stageThree: {
      prompt: 'Mit welcher Rechtsgrundlage dürfen Sie eingreifen?',
      options: [
        {
          id: 's3-a',
          text: '§ 860 BGB – Selbsthilfe des Besitzdieners i. V. m. § 859 BGB – Selbsthilfe des Besitzers: nur bei verbotener Eigenmacht und nur im erforderlichen Maß.',
          verdict: 'RICHTIG',
          explanation:
            'Als Besitzdiener darf die Sicherheitskraft die Rechte des Besitzers nach § 859 BGB ausüben. Voraussetzung ist eine verbotene Eigenmacht; die Selbsthilfe ist auf das erforderliche Maß begrenzt.',
          normIds: ['bgb-860', 'bgb-859', 'bgb-858'],
        },
        {
          id: 's3-b',
          text: 'Allein wegen des Hausverbots ist körperliche Gewalt automatisch erlaubt.',
          verdict: 'FALSCH',
          explanation:
            'Ein Hausverbot begründet keine automatische Gewaltbefugnis. § 859 BGB setzt verbotene Eigenmacht voraus.',
          misconception: 'Hausverbot → automatisch Gewalt.',
          normIds: ['stgb-123', 'bgb-859'],
        },
        {
          id: 's3-c',
          text: '§ 127 Abs. 1 StPO – Vorläufige Festnahme: der Hausfriedensbruch rechtfertigt automatisch die Festnahme.',
          verdict: 'FALSCH',
          explanation:
            '§ 127 StPO verlangt frische Tat und zusätzlich Fluchtverdacht oder nicht sofort feststellbare Identität. Der Hausfriedensbruch allein genügt nicht.',
          misconception: 'Straftatbestand → automatisch Festhaltebefugnis.',
          normIds: ['stpo-127', 'stgb-123'],
        },
        {
          id: 's3-d',
          text: '§ 32 StGB – Notwehr gegen das Verweilen.',
          verdict: 'FALSCH',
          explanation:
            'Ein bloßes Verweilen ohne gegenwärtigen rechtswidrigen Angriff begründet keine Notwehrlage.',
          misconception: 'Angriff → automatisch Notwehr; hier fehlt es bereits an einem Angriff.',
          normIds: ['stgb-32'],
        },
      ],
      correctOptions: ['s3-a'],
      explanation:
        'Als Besitzdiener kommen § 860 BGB i. V. m. § 859 BGB in Betracht, aber nur bei verbotener Eigenmacht und nur im erforderlichen Maß. Hausverbot ≠ automatisch Gewalt; § 127 StPO hat eigene Voraussetzungen.',
      authorityIds: ['authority-bgb-860', 'authority-bgb-859'],
    },
    result: {
      behaviorResult:
        'Ruhig und eindeutig kommunizieren, deeskalierend begleiten, ggf. Polizei verständigen; keine Gewalt.',
      legalResult:
        'Möglicher Hausfriedensbruch (§ 123 StGB, Antragsdelikt) und verbotene Eigenmacht (§ 858 BGB).',
      authorityResult:
        '§ 860 BGB – Selbsthilfe des Besitzdieners i. V. m. § 859 BGB – Selbsthilfe des Besitzers: nur bei verbotener Eigenmacht und nur im erforderlichen Maß.',
      explanation:
        'Hausverbot ≠ automatisch Gewalt. § 859 BGB ist kein allgemeiner Freibrief und setzt verbotene Eigenmacht voraus; § 127 StPO ist keine automatische Folge eines Straftatbestands.',
      modelSolution: {
        behavior:
          'Ruhe bewahren, Hausrecht ruhig und eindeutig kommunizieren, deeskalierend begleiten, Polizei verständigen.',
        legalClassification:
          'Möglicher Hausfriedensbruch (§ 123 StGB) und verbotene Eigenmacht (§ 858 BGB).',
        legalBasis:
          '§ 860 BGB – Selbsthilfe des Besitzdieners i. V. m. § 859 BGB – Selbsthilfe des Besitzers: Ausübung der Besitzerrechte durch den Besitzdiener, nur bei verbotener Eigenmacht.',
        reasoning:
          'Hausverbot → nicht automatisch Gewalt. Die Selbsthilfe setzt verbotene Eigenmacht voraus und ist auf das erforderliche Maß begrenzt.',
        limits:
          'Erforderlichkeit; keine Polizeibefugnisse; bei Nichtfreilassung bzw. weiterer Eskalation Polizei einschalten.',
      },
    },
  },
];
