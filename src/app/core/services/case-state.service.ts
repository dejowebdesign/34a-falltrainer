import { Injectable, computed, signal } from '@angular/core';
import { CaseResult, OptionVerdict, StageEvaluation } from '../models';
import { CaseEngineService, StageSelection } from '../rules/case-engine.service';
import { ScenarioService } from './scenario.service';

/** Fortschritt eines Falls über die drei sichtbaren Stufen. */
export interface CaseProgress {
  scenarioId: string;
  /** Pro Stufe die gewählten Options-IDs. */
  selections: Record<1 | 2 | 3, string[]>;
}

/**
 * Hält den Bearbeitungszustand eines Falls (in-memory).
 *
 * Die drei sichtbaren Stufen bleiben getrennt; die interne Prüfkette der
 * Bibel wird hier nicht sichtbar gemacht.
 */
@Injectable({ providedIn: 'root' })
export class CaseStateService {
  private readonly state = signal<CaseProgress | null>(null);

  readonly progress = this.state.asReadonly();

  constructor(
    private readonly scenarios: ScenarioService,
    private readonly engine: CaseEngineService,
  ) {}

  /** Startet bzw. setzt den Zustand für ein Szenario. */
  start(scenarioId: string): CaseProgress {
    const existing = this.state();
    if (existing && existing.scenarioId === scenarioId) {
      return existing;
    }
    const progress: CaseProgress = { scenarioId, selections: { 1: [], 2: [], 3: [] } };
    this.state.set(progress);
    return progress;
  }

  /** Speichert die Auswahl einer Stufe. */
  setSelection(stage: 1 | 2 | 3, optionIds: string[]): void {
    const current = this.state();
    if (!current) {
      return;
    }
    this.state.set({
      ...current,
      selections: { ...current.selections, [stage]: [...optionIds] },
    });
  }

  getSelection(stage: 1 | 2 | 3): string[] {
    return this.state()?.selections[stage] ?? [];
  }

  /** Ob eine Stufe bereits beantwortet wurde. */
  isAnswered(stage: 1 | 2 | 3): boolean {
    return this.getSelection(stage).length > 0;
  }

  /** Höchste bereits beantwortete Stufe (0, wenn keine). */
  readonly highestAnsweredStage = computed<0 | 1 | 2 | 3>(() => {
    const current = this.state();
    if (!current) {
      return 0;
    }
    if (current.selections[3].length) return 3;
    if (current.selections[2].length) return 2;
    if (current.selections[1].length) return 1;
    return 0;
  });

  /** Wertet den aktuellen Fall aus. */
  evaluate(): CaseResult | undefined {
    const current = this.state();
    if (!current) {
      return undefined;
    }
    const scenario = this.scenarios.getScenario(current.scenarioId);
    if (!scenario) {
      return undefined;
    }
    const selections: StageSelection[] = [
      { stage: 1, selectedOptionIds: current.selections[1] },
      { stage: 2, selectedOptionIds: current.selections[2] },
      { stage: 3, selectedOptionIds: current.selections[3] },
    ];
    return this.engine.evaluateCase(scenario, selections);
  }

  /** Auswertung einer einzelnen Stufe (für Feedback). */
  evaluateSingle(stage: 1 | 2 | 3): StageEvaluation | undefined {
    const current = this.state();
    if (!current) {
      return undefined;
    }
    const scenario = this.scenarios.getScenario(current.scenarioId);
    if (!scenario) {
      return undefined;
    }
    if (stage === 1) {
      return this.engine.evaluateStage(
        1,
        scenario.stageOne.options,
        scenario.stageOne.correctOptions,
        scenario.stageOne.explanation,
        current.selections[1],
      );
    }
    if (stage === 2) {
      return this.engine.evaluateStage(
        2,
        scenario.stageTwo.options,
        scenario.stageTwo.correctOptions,
        scenario.stageTwo.explanation,
        current.selections[2],
      );
    }
    return this.engine.evaluateStage(
      3,
      scenario.stageThree.options,
      scenario.stageThree.correctOptions,
      scenario.stageThree.explanation,
      current.selections[3],
    );
  }

  /** Setzt den Zustand zurück. */
  reset(): void {
    this.state.set(null);
  }

  /** Verdict-Hilfen für Templates. */
  static verdictLabel(verdict: OptionVerdict): string {
    switch (verdict) {
      case 'RICHTIG':
        return 'Richtig';
      case 'TEILWEISE_RICHTIG':
        return 'Teilweise richtig';
      case 'FALSCH':
        return 'Falsch';
    }
  }
}
