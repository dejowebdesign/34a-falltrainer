import { TestBed } from '@angular/core/testing';
import { LegalCheckService } from './legal-check.service';
import { CaseEngineService } from './case-engine.service';
import { LegalKnowledgeService } from '../services/legal-knowledge.service';
import { SCENARIOS } from '../data/scenarios.data';
import { LEGAL_AUTHORITIES } from '../data/legal-authorities.data';
import { LEGAL_CLASSIFICATIONS } from '../data/legal-classifications.data';
import { FORBIDDEN_AUTOMATISMS } from '../data/forbidden-automatisms.data';

/**
 * Regressionstests für die juristische Denkweise.
 *
 * Geprüft werden die in der Spezifikation und der Bibel (Kapitel 5, 13, 62)
 * ausdrücklich verbotenen Automatismen sowie die Trennung von Anspruch,
 * Befugnis, Rechtfertigung und Entschuldigung.
 */
describe('Juristische Denkweise – verbotene Automatismen', () => {
  let knowledge: LegalKnowledgeService;
  let legalCheck: LegalCheckService;
  let engine: CaseEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    knowledge = TestBed.inject(LegalKnowledgeService);
    legalCheck = TestBed.inject(LegalCheckService);
    engine = TestBed.inject(CaseEngineService);
  });

  const scenario = (id: string) => {
    const found = SCENARIOS.find((entry) => entry.id === id);
    expect(found).withContext(`Szenario ${id} fehlt`).toBeDefined();
    return found!;
  };

  describe('Straftat ≠ automatische Befugnis', () => {
    it('Diebstahl: korrekte Stufe-3-Grundlage ist §127 StPO nur unter eigenen Voraussetzungen', () => {
      const fall = scenario('ladendiebstahl');
      expect(fall.stageThree.correctOptions).toEqual(['s3-a']);
      const correct = fall.stageThree.options.find((option) => option.id === 's3-a')!;
      expect(correct.normIds).toContain('stpo-127');

      const authority = knowledge.getAuthority('authority-stpo-127')!;
      expect(authority.prerequisites.length).toBeGreaterThan(0);
      expect(authority.kind).toBe('BEFUGNIS');
    });

    it('Diebstahl: „automatisch festhalten“ ist als Denkfehler markiert', () => {
      const fall = scenario('ladendiebstahl');
      const option = fall.stageThree.options.find((entry) => entry.id === 's3-c')!;
      expect(option.verdict).toBe('FALSCH');
      expect(option.misconception).toContain('automatisch festhalten');
    });

    it('kein Szenario markiert eine FALSCH-Option als korrekt', () => {
      for (const fall of SCENARIOS) {
        const stages = [fall.stageOne, fall.stageTwo, fall.stageThree];
        for (const stage of stages) {
          for (const id of stage.correctOptions) {
            const option = stage.options.find((entry) => entry.id === id)!;
            expect(option.verdict)
              .withContext(`${fall.id}: ${id} ist korrekt, aber ${option.verdict}`)
              .not.toBe('FALSCH');
          }
        }
      }
    });
  });

  describe('Anspruch ≠ Befugnis', () => {
    it('§985 BGB ist ein Anspruch und keine Befugnis', () => {
      const check = legalCheck.classifyNorm('bgb-985');
      expect(check.category).toBe('ANSPRUCH');
      expect(check.isAuthority).toBe(false);
    });

    it('§861 BGB ist ein Anspruch und keine Befugnis', () => {
      const check = legalCheck.classifyNorm('bgb-861');
      expect(check.category).toBe('ANSPRUCH');
      expect(check.isAuthority).toBe(false);
    });

    it('§823 BGB ist ein Anspruch und keine Befugnis', () => {
      const check = legalCheck.classifyNorm('bgb-823');
      expect(check.category).toBe('ANSPRUCH');
      expect(check.isAuthority).toBe(false);
    });

    it('§859 BGB ist dagegen eine Befugnis', () => {
      const check = legalCheck.classifyNorm('bgb-859');
      expect(check.category).toBe('BEFUGNIS');
      expect(check.isAuthority).toBe(true);
    });

    it('§859 BGB trennt sich von §861 BGB (Befugnis ≠ Anspruch)', () => {
      const wehr = legalCheck.classifyNorm('bgb-859');
      const anspruch = legalCheck.classifyNorm('bgb-861');
      expect(wehr.isAuthority).toBe(true);
      expect(anspruch.isAuthority).toBe(false);
    });
  });

  describe('Befugnis ≠ Rechtfertigung, Rechtfertigung ≠ Entschuldigung', () => {
    it('§127 StPO ist Befugnis, §32 StGB Rechtfertigung', () => {
      expect(legalCheck.classifyNorm('stpo-127').category).toBe('BEFUGNIS');
      expect(legalCheck.classifyNorm('stgb-32').category).toBe('RECHTFERTIGUNG');
    });

    it('§33 StGB ist Entschuldigung und keine Rechtfertigung', () => {
      const check = legalCheck.classifyNorm('stgb-33');
      expect(check.category).toBe('ENTSCHULDIGUNG');
      expect(check.isAuthority).toBe(false);
      expect(check.warning).toContain('Entschuldigung');
    });
  });

  describe('Tatverdacht ≠ feststehende Straftat', () => {
    it('enthält sowohl „möglichen“ als auch „feststehenden“ Diebstahl getrennt', () => {
      const verdacht = LEGAL_CLASSIFICATIONS.find((entry) => entry.id === 'classification-diebstahl-verdacht')!;
      const feststehend = LEGAL_CLASSIFICATIONS.find((entry) => entry.id === 'classification-diebstahl')!;
      expect(verdacht.certainty).toBe('MOEGLICH');
      expect(feststehend.certainty).toBe('FESTSTEHEND');
    });

    it('markiert den Tatverdacht im Ladendiebstahl-Fall als möglich, nicht feststehend', () => {
      const fall = scenario('ladendiebstahl');
      expect(fall.stageTwo.classificationIds).toContain('classification-diebstahl-verdacht');
      expect(fall.stageTwo.classificationIds).not.toContain('classification-diebstahl');
    });
  });

  describe('Gefahr ≠ automatisch §34 StGB', () => {
    it('§34 StGB verlangt eigene Voraussetzungen', () => {
      const authority = knowledge.getAuthority('authority-stgb-34')!;
      expect(authority.prerequisites.join(' ')).toContain('nicht anders abwendbare Gefahr');
      expect(authority.prohibitedConditions).toContain('Gefahr → automatisch §34 StGB');
    });

    it('§228 und §904 BGB sind als verschiedene Rechtfertigungen geführt', () => {
      expect(knowledge.getAuthority('authority-bgb-228')!.kind).toBe('RECHTFERTIGUNG');
      expect(knowledge.getAuthority('authority-bgb-904')!.kind).toBe('RECHTFERTIGUNG');
    });
  });

  describe('Angriff ≠ automatisch jede Gewalt', () => {
    it('Notwehr verlangt Erforderlichkeit und begrenzt die Gewalt', () => {
      const authority = knowledge.getAuthority('authority-stgb-32')!;
      expect(authority.limits.join(' ')).toContain('Erforderlichkeit');
      expect(authority.prohibitedConditions).toContain('Angriff → automatisch jede beliebige Gewalt');
    });

    it('Angriff wird über §32 StGB, nicht über §34 StGB gelöst', () => {
      const fall = scenario('koerperlicher-angriff');
      expect(fall.stageThree.correctOptions).toEqual(['s3-a']);
      const correct = fall.stageThree.options.find((option) => option.id === 's3-a')!;
      expect(correct.normIds).toContain('stgb-32');
      expect(correct.normIds).not.toContain('stgb-34');
    });
  });

  describe('Uniform ≠ Polizeibefugnisse', () => {
    it('ist als verbotener Automatismus hinterlegt', () => {
      const automatism = FORBIDDEN_AUTOMATISMS.find((entry) => entry.id === 'auto-uniform-polizei')!;
      expect(automatism.relatedNormIds).toContain('stgb-132');
      expect(legalCheck.findAutomatisms('uniform').length).toBeGreaterThan(0);
    });
  });

  describe('Wegnahme aus dem Einkaufswagen (PDF-Fall 4)', () => {
    it('trennt Anspruch (§861 BGB) von der Selbsthilfebefugnis (§859 BGB)', () => {
      const fall = scenario('klopapier-einkaufswagen');
      expect(fall.stageThree.correctOptions).toEqual(['s3-a']);
      const correct = fall.stageThree.options.find((option) => option.id === 's3-a')!;
      expect(correct.normIds).toContain('bgb-859');

      const claim = fall.stageThree.options.find((option) => option.id === 's3-b')!;
      expect(claim.verdict).toBe('FALSCH');
      expect(claim.misconception).toContain('Anspruch mit Befugnis');
    });
  });

  describe('Marktschließung / Hausverbot (PDF-Fall 5)', () => {
    it('Hausverbot begründet keine automatische Gewalt', () => {
      const fall = scenario('marktschliessung-hausverbot');
      const option = fall.stageThree.options.find((entry) => entry.id === 's3-b')!;
      expect(option.verdict).toBe('FALSCH');
      expect(option.misconception).toContain('Hausverbot');
    });
  });

  describe('Wissensbasis – keine Erfindungen', () => {
    it('verweist in jedem Szenario nur auf vorhandene Normen', () => {
      for (const fall of SCENARIOS) {
        const options = [...fall.stageOne.options, ...fall.stageTwo.options, ...fall.stageThree.options];
        for (const option of options) {
          for (const id of option.normIds ?? []) {
            expect(knowledge.getNorm(id)).withContext(`${fall.id}/${option.id}: ${id}`).toBeDefined();
          }
        }
      }
    });

    it('führt §823 BGB als fehlenden amtlichen Text (keine Halluzination)', () => {
      expect(knowledge.hasOfficialText('bgb-823')).toBe(false);
      expect(knowledge.getNorm('bgb-823')?.verificationStatus).toBe('MISSING');
      expect(knowledge.getNorm('bgb-823')?.officialText).toBe('');
    });

    it('jede Befugnis hat eine vorhandene Norm und mindestens eine Voraussetzung', () => {
      for (const authority of LEGAL_AUTHORITIES) {
        expect(knowledge.getNorm(authority.normId)).withContext(authority.id).toBeDefined();
        expect(authority.prerequisites.length).withContext(authority.id).toBeGreaterThan(0);
      }
    });
  });

  describe('Ergebnisberechnung', () => {
    it('belohnt richtige Antworten voll und teilweise richtige zur Hälfte', () => {
      const fall = scenario('ladendiebstahl');
      const perfect = engine.evaluateCase(fall, [
        { stage: 1, selectedOptionIds: fall.stageOne.correctOptions },
        { stage: 2, selectedOptionIds: fall.stageTwo.correctOptions },
        { stage: 3, selectedOptionIds: fall.stageThree.correctOptions },
      ]);
      expect(perfect.score).toBe(100);
      expect(perfect.overallVerdict).toBe('RICHTIG');
    });

    it('eine falsche Stufe senkt den Punktwert unter 100', () => {
      const fall = scenario('ladendiebstahl');
      const mixed = engine.evaluateCase(fall, [
        { stage: 1, selectedOptionIds: fall.stageOne.correctOptions },
        { stage: 2, selectedOptionIds: fall.stageTwo.correctOptions },
        { stage: 3, selectedOptionIds: ['s3-c'] },
      ]);
      expect(mixed.score).toBeLessThan(100);
      expect(mixed.overallVerdict).toBe('FALSCH');
    });
  });
});
