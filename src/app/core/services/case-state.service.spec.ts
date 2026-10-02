import { TestBed } from '@angular/core/testing';
import { CaseStateService } from './case-state.service';
import { SCENARIOS } from '../data/scenarios.data';

describe('CaseStateService', () => {
  let service: CaseStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseStateService);
  });

  it('startet einen Fall mit leerem Zustand', () => {
    const progress = service.start('ladendiebstahl');
    expect(progress.scenarioId).toBe('ladendiebstahl');
    expect(service.isAnswered(1)).toBe(false);
    expect(service.highestAnsweredStage()).toBe(0);
  });

  it('speichert und liest die Auswahl je Stufe', () => {
    service.start('ladendiebstahl');
    service.setSelection(1, ['s1-a', 's1-b']);
    expect(service.getSelection(1)).toEqual(['s1-a', 's1-b']);
    expect(service.isAnswered(1)).toBe(true);
    expect(service.highestAnsweredStage()).toBe(1);
  });

  it('ermittelt die höchste beantwortete Stufe', () => {
    service.start('ladendiebstahl');
    service.setSelection(1, ['s1-a']);
    service.setSelection(2, ['s2-a']);
    service.setSelection(3, ['s3-a']);
    expect(service.highestAnsweredStage()).toBe(3);
  });

  it('setzt keinen Zustand ohne start', () => {
    service.setSelection(1, ['s1-a']);
    expect(service.getSelection(1)).toEqual([]);
  });

  it('wertet einen Fall aus', () => {
    service.start('ladendiebstahl');
    service.setSelection(1, ['s1-a', 's1-b']);
    service.setSelection(2, ['s2-a', 's2-c']);
    service.setSelection(3, ['s3-a']);
    const result = service.evaluate();
    expect(result).toBeDefined();
    expect(result!.overallVerdict).toBe('RICHTIG');
    expect(result!.score).toBe(100);
  });

  it('liefert keine Auswertung für unbekannte Szenarien', () => {
    service.start('gibt-es-nicht');
    expect(service.evaluate()).toBeUndefined();
  });

  it('wertet eine einzelne Stufe aus', () => {
    service.start('ladendiebstahl');
    service.setSelection(1, ['s1-c']);
    const evaluation = service.evaluateSingle(1);
    expect(evaluation?.verdict).toBe('FALSCH');
  });

  it('kann den Zustand zurücksetzen', () => {
    service.start('ladendiebstahl');
    service.setSelection(1, ['s1-a']);
    service.reset();
    expect(service.getSelection(1)).toEqual([]);
  });

  it('ist für jedes Seed-Szenario startbar und auswertbar', () => {
    for (const scenario of SCENARIOS) {
      service.reset();
      service.start(scenario.id);
      service.setSelection(1, scenario.stageOne.correctOptions);
      service.setSelection(2, scenario.stageTwo.correctOptions);
      service.setSelection(3, scenario.stageThree.correctOptions);
      const result = service.evaluate();
      expect(result).toBeDefined();
      expect(result!.overallVerdict).toBe('RICHTIG');
    }
  });
});
