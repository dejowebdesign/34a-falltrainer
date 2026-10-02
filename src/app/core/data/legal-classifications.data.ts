import { LegalClassification } from '../models';

/**
 * Rechtliche Einordnungen (Stufe 2) aus der Knowledge Base.
 *
 * Die Bibel unterscheidet ausdrücklich zwischen Sachverhalt, Tatsachen,
 * rechtlicher Einordnung und feststehendem Ergebnis (Kapitel 3). Deshalb
 * trägt jede Einordnung einen `certainty`-Wert.
 */
export const LEGAL_CLASSIFICATIONS: LegalClassification[] = [
  {
    id: 'classification-diebstahl-verdacht',
    name: 'Möglicher Diebstahl (Tatverdacht)',
    normIds: ['stgb-242'],
    certainty: 'MOEGLICH',
    prerequisites: ['fremde bewegliche Sache', 'Wegnahme (Bruch fremden und Begründung neuen Gewahrsams)', 'Vorsatz', 'Absicht rechtswidriger Zueignung'],
    explanation:
      'Der Sachverhalt deutet auf einen Diebstahl hin. Ein Tatverdacht ist jedoch nicht automatisch eine feststehende Straftat; die Tatbestandsmerkmale sind zu prüfen.',
  },
  {
    id: 'classification-diebstahl',
    name: 'Diebstahl (Tatbestand erfüllt)',
    normIds: ['stgb-242'],
    certainty: 'FESTSTEHEND',
    prerequisites: ['fremde bewegliche Sache', 'Wegnahme', 'Vorsatz', 'Absicht rechtswidriger Zueignung'],
    explanation:
      'Die Voraussetzungen des §242 StGB sind im Sachverhalt erfüllt. Der Tatbestand ist nicht schon deshalb eine Eingriffsbefugnis.',
  },
  {
    id: 'classification-koerperverletzung',
    name: 'Körperverletzung',
    normIds: ['stgb-223'],
    certainty: 'MOEGLICH',
    prerequisites: ['andere Person', 'körperliche Misshandlung oder Gesundheitsschädigung', 'Vorsatz'],
    explanation:
      'Der Sachverhalt deutet auf eine Körperverletzung nach §223 StGB hin. Die Voraussetzungen sind am konkreten Tatsachenvortrag zu prüfen.',
  },
  {
    id: 'classification-hausfriedensbruch',
    name: 'Hausfriedensbruch',
    normIds: ['stgb-123'],
    certainty: 'MOEGLICH',
    prerequisites: ['geschützter Bereich', 'widerrechtliches Eindringen oder unbefugtes Verweilen trotz Aufforderung', 'Vorsatz', 'Rechtswidrigkeit'],
    explanation:
      'Der Sachverhalt deutet auf einen Hausfriedensbruch nach §123 StGB hin. Die Tat wird nur auf Antrag verfolgt.',
  },
  {
    id: 'classification-verbotene-eigenmacht',
    name: 'Verbotene Eigenmacht',
    normIds: ['bgb-858'],
    certainty: 'FESTSTEHEND',
    prerequisites: ['Besitz', 'Entzug oder Störung', 'ohne Willen des Besitzers', 'keine gesetzliche Gestattung'],
    explanation:
      'Wird dem Besitzer ohne dessen Willen der Besitz entzogen oder er im Besitz gestört und ist dies nicht gesetzlich gestattet, liegt verbotene Eigenmacht vor.',
  },
  {
    id: 'classification-besitzentziehung',
    name: 'Besitzentziehung (Anspruch)',
    normIds: ['bgb-861'],
    certainty: 'FESTSTEHEND',
    prerequisites: ['Besitz des Anspruchstellers', 'Entziehung durch verbotene Eigenmacht'],
    explanation:
      'Nach verbotener Eigenmacht kann der frühere Besitzer die Wiedereinräumung des Besitzes verlangen. §861 BGB ist ein Anspruch, keine unmittelbare Selbsthilfebefugnis.',
  },
  {
    id: 'classification-besitzstoerung',
    name: 'Besitzstörung (Anspruch)',
    normIds: ['bgb-862'],
    certainty: 'MOEGLICH',
    prerequisites: ['Besitz', 'Störung durch verbotene Eigenmacht'],
    explanation: 'Bei einer Besitzstörung kann der Besitzer Beseitigung und ggf. Unterlassung verlangen.',
  },
  {
    id: 'classification-herausgabeanspruch',
    name: 'Herausgabeanspruch',
    normIds: ['bgb-985'],
    certainty: 'MOEGLICH',
    prerequisites: ['Eigentum', 'Besitz eines anderen', 'kein Recht zum Besitz nach §986'],
    explanation:
      'Der Eigentümer kann vom Besitzer die Herausgabe der Sache verlangen. §985 BGB beantwortet nicht, ob die Sache selbst mit Gewalt zurückgenommen werden darf.',
  },
  {
    id: 'classification-eigentumsstoerung',
    name: 'Eigentumsstörung (Anspruch)',
    normIds: ['bgb-1004'],
    certainty: 'MOEGLICH',
    prerequisites: ['Eigentum', 'Beeinträchtigung in anderer Weise als durch Besitzentziehung'],
    explanation: 'Bei einer Eigentumsbeeinträchtigung kann der Eigentümer Beseitigung und ggf. Unterlassung verlangen.',
  },
  {
    id: 'classification-gegenwaertige-gefahr',
    name: 'Gegenwärtige Gefahr',
    normIds: ['stgb-34'],
    certainty: 'RECHTSBEGRIFF',
    prerequisites: ['Gefahr für ein geschütztes Rechtsgut', 'Gefahr besteht gegenwärtig'],
    explanation:
      'Eine gegenwärtige Gefahr ist Voraussetzung des §34 StGB. Aus dem Vorliegen einer Gefahr folgt nicht automatisch ein Notstand; die weiteren Voraussetzungen sind zu prüfen.',
  },
  {
    id: 'classification-drohende-gefahr',
    name: 'Drohende Gefahr',
    normIds: ['stgb-34'],
    certainty: 'RECHTSBEGRIFF',
    prerequisites: ['Gefahr für ein geschütztes Rechtsgut', 'Gefahr steht unmittelbar bevor'],
    explanation: 'Eine drohende Gefahr ist von der gegenwärtigen Gefahr zu unterscheiden.',
  },
  {
    id: 'classification-angriff',
    name: 'Gegenwärtiger rechtswidriger Angriff',
    normIds: ['stgb-32'],
    certainty: 'RECHTSBEGRIFF',
    prerequisites: ['Angriff', 'Gegenwärtigkeit', 'Rechtswidrigkeit'],
    explanation:
      'Ein Angriff ist Voraussetzung der Notwehr. Aus einem Angriff folgt nicht automatisch jede beliebige Gewalt; die Verteidigung muss erforderlich sein.',
  },
  {
    id: 'classification-beleidigung',
    name: 'Beleidigung',
    normIds: ['stgb-185'],
    certainty: 'MOEGLICH',
    prerequisites: ['konkrete Äußerung oder Handlung', 'ehrverletzender Charakter', 'Bezug zur betroffenen Person', 'Vorsatz'],
    explanation: 'Eine ehrverletzende Äußerung kann den Tatbestand des §185 StGB erfüllen. Tatbestand und Strafverfolgung sind getrennt zu prüfen.',
  },
  {
    id: 'classification-sachbeschaedigung',
    name: 'Sachbeschädigung',
    normIds: ['stgb-303'],
    certainty: 'MOEGLICH',
    prerequisites: ['fremde Sache', 'Beschädigung, Zerstörung oder erhebliche Veränderung', 'Rechtswidrigkeit', 'Vorsatz'],
    explanation: 'Die Beschädigung einer fremden Sache kann §303 StGB erfüllen. Die Tat wird grundsätzlich nur auf Antrag verfolgt (§303c).',
  },
  {
    id: 'classification-noetigung',
    name: 'Nötigung',
    normIds: ['stgb-240'],
    certainty: 'MOEGLICH',
    prerequisites: ['Gewalt oder Drohung mit empfindlichem Übel', 'Handlung, Duldung oder Unterlassung', 'Verwerflichkeit nach §240 Abs. 2'],
    explanation: 'Nicht jede Gewaltanwendung oder Drohung erfüllt automatisch die rechtswidrige Nötigung; die Verwerflichkeit ist gesondert zu prüfen.',
  },
  {
    id: 'classification-raub',
    name: 'Raub',
    normIds: ['stgb-249'],
    certainty: 'MOEGLICH',
    prerequisites: ['fremde bewegliche Sache', 'Wegnahme', 'Gewalt gegen eine Person oder Drohung mit gegenwärtiger Gefahr für Leib oder Leben'],
    explanation: 'Raub verbindet Wegnahme mit qualifizierter Gewalt bzw. Drohung. Das Vorliegen eines möglichen Raubes begründet keine beliebigen Zwangsmittel.',
  },
  {
    id: 'classification-straftat',
    name: 'Straftat (allgemein)',
    normIds: ['stgb-15'],
    certainty: 'MOEGLICH',
    prerequisites: ['tatbestandsmäßiges, rechtswidriges und schuldhaftes Verhalten'],
    explanation: 'Ein Sachverhalt kann eine Straftat darstellen. Der Tatbestand ist von der Frage der Verfolgung und der eigenen Eingriffsbefugnis zu trennen.',
  },
  {
    id: 'classification-besitzdienerschaft',
    name: 'Besitzdienerschaft',
    normIds: ['bgb-855'],
    certainty: 'FESTSTEHEND',
    prerequisites: ['tatsächliche Gewalt für einen anderen', 'Haushalt, Erwerbsgeschäft oder ähnliches Verhältnis', 'Weisungsgebundenheit'],
    explanation: 'Der Besitzdiener übt die tatsächliche Gewalt für einen anderen aus; Besitzer ist nur der andere.',
  },
  {
    id: 'classification-eigentum',
    name: 'Eigentum',
    normIds: ['bgb-903'],
    certainty: 'RECHTSBEGRIFF',
    prerequisites: ['Eigentum an der Sache'],
    explanation: 'Eigentum ist von Besitz zu unterscheiden. Eigentum ist nicht dasselbe wie Besitz.',
  },
];
