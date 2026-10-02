import { Injectable } from '@angular/core';
import { Scenario } from '../models';
import { SCENARIOS } from '../data/scenarios.data';

/**
 * Verwaltet die Szenarien (Seed-Daten). Szenarien sind strikt von der
 * juristischen Knowledge Base getrennt (Bibel-Kapitel 7).
 */
@Injectable({ providedIn: 'root' })
export class ScenarioService {
  private readonly scenarios = new Map<string, Scenario>(
    SCENARIOS.map((scenario) => [scenario.id, scenario]),
  );

  getScenarios(): Scenario[] {
    return [...this.scenarios.values()];
  }

  getScenario(id: string): Scenario | undefined {
    return this.scenarios.get(id);
  }
}
