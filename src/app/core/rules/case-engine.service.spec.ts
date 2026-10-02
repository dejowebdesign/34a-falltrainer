import { TestBed } from '@angular/core/testing';
import { CaseEngineService } from './case-engine.service';
import { Scenario, StageOption } from '../models';
import { SCENARIOS } from '../data/scenarios.data';

const options: StageOption[] = [
  { id: 'a', text: 'richtig', verdict: 'RICHTIG', explanation: '' },
  { id: 'b', text: 'teilweise', verdict: 'TEILWEISE_RICHTIG', explanation: '' },
  { id: 'c', text: 'falsch', verdict: 'FALSCH', explanation: '', misconception: 'Denkfehler C' },
];

describe('CaseEngineService', () => {
  let service: CaseEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseEngineService);
  });

  describe('evaluateStage', () => {
    it('bewertet eine vollständig richtige Auswahl als RICHTIG', () => {
      const result = service.evaluateStage(1, options, ['a'], 'Erklärung', ['a']);
      expect(result.verdict).toBe('RICHTIG');
      expect(result.correctCount).toBe(1);
      expect(result.wrongCount).toBe(0);
    });

    it('bewertet eine falsche Auswahl als FALSCH', () => {
      const result = service.evaluateStage(1, options, ['a'], 'Erklärung', ['c']);
      expect(result.verdict).toBe('FALSCH');
      expect(result.wrongCount).toBe(1);
    });

    it('bewertet eine unvollständige Auswahl als TEILWEISE_RICHTIG', () => {
      const result = service.evaluateStage(1, options, ['a', 'b'], 'Erklärung', ['a']);
      expect(result.verdict).toBe('TEILWEISE_RICHTIG');
    });

    it('bewertet eine teilweise richtige Auswahl als TEILWEISE_RICHTIG', () => {
      const result = service.evaluateStage(1, options, ['a'], 'Erklärung', ['b']);
      expect(result.verdict).toBe('TEILWEISE_RICHTIG');
      expect(result.correctCount).toBe(0);
    });

    it('ignoriert unbekannte Options-IDs', () => {
      const result = service.evaluateStage(1, options, ['a'], 'Erklärung', ['a', 'unbekannt']);
      expect(result.selectedOptionIds).toEqual(['a']);
      expect(result.verdict).toBe('RICHTIG');
    });

    it('behandelt fehlende Daten (keine korrekten Optionen) als TEILWEISE_RICHTIG', () => {
      const result = service.evaluateStage(1, options, [], 'Erklärung', ['a']);
      expect(result.verdict).toBe('TEILWEISE_RICHTIG');
    });
  });

  describe('evaluateCase', () => {
    const scenario = SCENARIOS[0];

    it('liefert ein Gesamtergebnis mit drei Stufen', () => {
      const result = service.evaluateCase(scenario, [
        { stage: 1, selectedOptionIds: scenario.stageOne.correctOptions },
        { stage: 2, selectedOptionIds: scenario.stageTwo.correctOptions },
        { stage: 3, selectedOptionIds: scenario.stageThree.correctOptions },
      ]);
      expect(result.evaluations.length).toBe(3);
      expect(result.overallVerdict).toBe('RICHTIG');
      expect(result.score).toBe(100);
      expect(result.result).toBe(scenario.result);
    });

    it('führt eine falsche Stufe zu einem falschen Gesamtergebnis', () => {
      const result = service.evaluateCase(scenario, [
        { stage: 1, selectedOptionIds: scenario.stageOne.correctOptions },
        { stage: 2, selectedOptionIds: scenario.stageTwo.correctOptions },
        { stage: 3, selectedOptionIds: ['s3-c'] },
      ]);
      expect(result.overallVerdict).toBe('FALSCH');
      expect(result.score).toBeLessThan(100);
    });

    it('liefert bei fehlender Auswahl einen Punktwert von 0', () => {
      const result = service.evaluateCase(scenario, [
        { stage: 1, selectedOptionIds: [] },
        { stage: 2, selectedOptionIds: [] },
        { stage: 3, selectedOptionIds: [] },
      ]);
      expect(result.score).toBe(0);
      expect(result.overallVerdict).toBe('TEILWEISE_RICHTIG');
    });
  });

  describe('collectMisconceptions', () => {
    it('sammelt Denkfehler nur aus nicht-richtigen gewählten Optionen', () => {
      const result = service.collectMisconceptions(options, ['a', 'c']);
      expect(result).toEqual(['Denkfehler C']);
    });
  });

  it('kennt für jedes Seed-Szenario eine Musterlösung', () => {
    for (const seed of SCENARIOS) {
      expect(seed.result.modelSolution.behavior.length).toBeGreaterThan(0);
      expect(seed.result.modelSolution.limits.length).toBeGreaterThan(0);
    }
  });

  it('enthält in keinem Szenario einen leeren Sachverhalt', () => {
    const empty: Scenario[] = SCENARIOS.filter((entry) => entry.facts.length === 0);
    expect(empty.length).toBe(0);
  });
});
