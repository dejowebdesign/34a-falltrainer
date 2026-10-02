import { LEGAL_AUTHORITIES } from './legal-authorities.data';
import { LEGAL_CLASSIFICATIONS } from './legal-classifications.data';
import { LEGAL_NORMS } from './legal-norms.data';
import { SCENARIOS } from './scenarios.data';
import { BEHAVIOR_CATALOG } from './behavior-catalog.data';

const normIds = new Set(LEGAL_NORMS.map((norm) => norm.id));
const authorityIds = new Set(LEGAL_AUTHORITIES.map((authority) => authority.id));
const classificationIds = new Set(LEGAL_CLASSIFICATIONS.map((entry) => entry.id));

describe('Seed-Szenarien – Datenintegrität', () => {
  it('enthält mehrere eigenständige Szenarien', () => {
    expect(SCENARIOS.length).toBeGreaterThanOrEqual(3);
  });

  it('enthält die aus der Themenvertiefung abgeleiteten Szenarien', () => {
    const ids = SCENARIOS.map((scenario) => scenario.id);
    expect(ids).toContain('klopapier-einkaufswagen');
    expect(ids).toContain('marktschliessung-hausverbot');
  });

  it('vergibt eindeutige Szenario-IDs', () => {
    const ids = SCENARIOS.map((scenario) => scenario.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('ordnet Stufe-2-Optionen einem Rechtsgebiet zu (didaktisches Modell)', () => {
    for (const scenario of SCENARIOS) {
      for (const option of scenario.stageTwo.options) {
        expect(option.legalLevel).withContext(`${scenario.id}/${option.id}`).toBeDefined();
      }
    }
  });

  for (const scenario of SCENARIOS) {
    describe(scenario.id, () => {
      it('hat für jede Stufe mindestens eine korrekte Option', () => {
        expect(scenario.stageOne.correctOptions.length).toBeGreaterThan(0);
        expect(scenario.stageTwo.correctOptions.length).toBeGreaterThan(0);
      });

      it('referenziert nur vorhandene Options-IDs als korrekt', () => {
        const check = (options: { id: string }[], correct: string[]) =>
          correct.every((id) => options.some((option) => option.id === id));
        expect(check(scenario.stageOne.options, scenario.stageOne.correctOptions)).toBe(true);
        expect(check(scenario.stageTwo.options, scenario.stageTwo.correctOptions)).toBe(true);
        expect(check(scenario.stageThree.options, scenario.stageThree.correctOptions)).toBe(true);
      });

      it('verweist in Optionen nur auf vorhandene Normen', () => {
        const allOptions = [
          ...scenario.stageOne.options,
          ...scenario.stageTwo.options,
          ...scenario.stageThree.options,
        ];
        for (const option of allOptions) {
          for (const id of option.normIds ?? []) {
            expect(normIds.has(id)).withContext(`Norm ${id} fehlt in ${option.id}`).toBe(true);
          }
        }
      });

      it('verweist nur auf vorhandene Klassifikationen und Befugnisse', () => {
        for (const id of scenario.stageTwo.classificationIds) {
          expect(classificationIds.has(id)).withContext(`Klassifikation ${id} fehlt`).toBe(true);
        }
        for (const id of scenario.stageThree.authorityIds) {
          expect(authorityIds.has(id)).withContext(`Befugnis ${id} fehlt`).toBe(true);
        }
      });

      it('gibt für jede Option eine Begründung an', () => {
        const allOptions = [
          ...scenario.stageOne.options,
          ...scenario.stageTwo.options,
          ...scenario.stageThree.options,
        ];
        for (const option of allOptions) {
          expect(option.explanation.length).withContext(option.id).toBeGreaterThan(0);
        }
      });

      it('nennt bei falschen Optionen einen Denkfehler', () => {
        const allOptions = [
          ...scenario.stageOne.options,
          ...scenario.stageTwo.options,
          ...scenario.stageThree.options,
        ];
        for (const option of allOptions.filter((entry) => entry.verdict === 'FALSCH')) {
          expect(option.misconception).withContext(option.id).toBeDefined();
        }
      });

      it('enthält eine vollständige Musterlösung', () => {
        const solution = scenario.result.modelSolution;
        expect(solution.behavior.length).toBeGreaterThan(0);
        expect(solution.legalClassification.length).toBeGreaterThan(0);
        expect(solution.legalBasis.length).toBeGreaterThan(0);
        expect(solution.reasoning.length).toBeGreaterThan(0);
        expect(solution.limits.length).toBeGreaterThan(0);
      });
    });
  }
});

describe('Verhaltenskatalog – Stufe 1 (Themenvertiefung)', () => {
  it('enthält die didaktischen Kernbausteine', () => {
    const ids = BEHAVIOR_CATALOG.map((entry) => entry.id);
    expect(ids).toContain('ruhe-bewahren');
    expect(ids).toContain('vernebelungstechnik');
    expect(ids).toContain('eigensicherung');
    expect(ids).toContain('polizei-verstaendigen');
    expect(ids).toContain('rettungsdienst-verstaendigen');
    expect(ids).toContain('personalien-aufnehmen');
    expect(ids).toContain('vorfall-protokollieren');
    expect(ids).toContain('strafantrag-stellen');
    expect(ids).toContain('hausverbot-erteilen');
  });

  it('gibt zu jedem Baustein eine Begründung an', () => {
    for (const entry of BEHAVIOR_CATALOG) {
      expect(entry.explanation.length).withContext(entry.id).toBeGreaterThan(0);
    }
  });
});
