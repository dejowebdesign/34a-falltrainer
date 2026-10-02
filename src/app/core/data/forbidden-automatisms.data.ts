/**
 * Verbotene Automatismen (Bibel-Kapitel 13 und 62).
 *
 * Diese Kurzschlüsse dürfen in der Anwendung nicht verwendet werden. Sie
 * dienen der Rule Engine als Prüfmaßstab und der UI als Hinweis auf typische
 * Denkfehler.
 */
export interface ForbiddenAutomatism {
  id: string;
  /** Auslösendes Schlagwort. */
  trigger: string;
  /** Unzulässige automatische Folgerung. */
  forbiddenConclusion: string;
  /** Warum der Kurzschluss falsch ist. */
  reason: string;
  /** Norm, die stattdessen gesondert zu prüfen ist. */
  relatedNormIds: string[];
}

export const FORBIDDEN_AUTOMATISMS: ForbiddenAutomatism[] = [
  {
    id: 'auto-diebstahl-festhalten',
    trigger: 'Diebstahl erkannt',
    forbiddenConclusion: 'automatisch festhalten',
    reason:
      'Die Festhaltebefugnis folgt nicht allein aus dem Diebstahlsverdacht. Die konkreten Voraussetzungen der Befugnis (z. B. §127 StPO) müssen zusätzlich geprüft werden.',
    relatedNormIds: ['stgb-242', 'stpo-127'],
  },
  {
    id: 'auto-hausverbot-gewalt',
    trigger: 'Hausverbot',
    forbiddenConclusion: 'automatisch Gewalt anwenden',
    reason:
      'Aus einem Hausverbot oder Hausfriedensbruch folgt nicht automatisch eine Gewaltbefugnis. Die konkrete Rechtsgrundlage ist gesondert zu prüfen.',
    relatedNormIds: ['stgb-123'],
  },
  {
    id: 'auto-eigentuemer-wegnehmen',
    trigger: 'Eigentümer',
    forbiddenConclusion: 'darf die Sache immer selbst wegnehmen',
    reason:
      '§985 BGB ist ein Herausgabeanspruch, keine unmittelbare Gewaltbefugnis. Eigentum ist nicht dasselbe wie Besitz.',
    relatedNormIds: ['bgb-985', 'bgb-903'],
  },
  {
    id: 'auto-besitzer-gewalt',
    trigger: 'Besitzer',
    forbiddenConclusion: 'darf immer Gewalt anwenden',
    reason: '§859 BGB ist kein allgemeiner Freibrief zur Gewaltanwendung; er setzt verbotene Eigenmacht voraus.',
    relatedNormIds: ['bgb-859'],
  },
  {
    id: 'auto-gefahr-notstand',
    trigger: 'Gefahr',
    forbiddenConclusion: 'automatisch §34 StGB',
    reason:
      '§34 StGB verlangt eine gegenwärtige, nicht anders abwendbare Gefahr und ein wesentliches Überwiegen des geschützten Interesses.',
    relatedNormIds: ['stgb-34'],
  },
  {
    id: 'auto-angriff-notwehr',
    trigger: 'Angriff',
    forbiddenConclusion: 'automatisch Notwehr',
    reason: 'Notwehr setzt einen gegenwärtigen rechtswidrigen Angriff und eine erforderliche Verteidigung voraus.',
    relatedNormIds: ['stgb-32'],
  },
  {
    id: 'auto-uniform-polizei',
    trigger: 'Uniform',
    forbiddenConclusion: 'Polizeibefugnisse',
    reason:
      'Eine private Sicherheitskraft wird durch Uniform, Dienstausweis oder Tätigkeit nicht zu einem Polizeibeamten (§132 StGB). §127 StPO ist eine Jedermann-Befugnis, keine allgemeine Polizeibefugnis.',
    relatedNormIds: ['stgb-132', 'stpo-127'],
  },
  {
    id: 'auto-straftat-befugnis',
    trigger: 'Straftat',
    forbiddenConclusion: 'automatisch Eingriffsbefugnis',
    reason: 'Ein Straftatbestand ist nicht automatisch eine Festnahmebefugnis. Erst rechtlich einordnen, dann Anspruch/Befugnis/Rechtfertigung trennen.',
    relatedNormIds: ['stgb-15'],
  },
];
