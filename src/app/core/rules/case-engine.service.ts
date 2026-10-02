import { Injectable } from '@angular/core';
import {
  CaseResult,
  OptionVerdict,
  Scenario,
  StageEvaluation,
  StageOption,
} from '../models';

/** Eingabe für die Auswertung eines Falls: gewählte Options-IDs je Stufe. */
export interface StageSelection {
  stage: 1 | 2 | 3;
  selectedOptionIds: string[];
}

/**
 * Interne Fallengine.
 *
 * Sie ist bewusst frei von UI-Logik und arbeitet ausschließlich mit den
 * Stufen-Daten des Szenarios. Die interne Prüfkette der Bibel
 * (Kapitel 6/73) bleibt verborgen; sichtbar sind nur die drei Stufen.
 */
@Injectable({ providedIn: 'root' })
export class CaseEngineService {
  /**
   * Wertet eine einzelne Stufe aus.
   *
   * Die Bewertung folgt der Bibel-Logik: Ein als richtig gekennzeichneter
   * Punkt ist nicht dasselbe wie ein teilweise richtiger oder falscher Punkt.
   */
  evaluateStage(
    stage: 1 | 2 | 3,
    options: StageOption[],
    correctOptionIds: string[],
    explanation: string,
    selectedOptionIds: string[],
  ): StageEvaluation {
    const byId = new Map(options.map((option) => [option.id, option]));
    const correctSet = new Set(correctOptionIds);
    const selected = selectedOptionIds.filter((id) => byId.has(id));

    const optionVerdicts = selected.map((id) => ({
      optionId: id,
      verdict: byId.get(id)!.verdict,
    }));

    const correctCount = optionVerdicts.filter((entry) => entry.verdict === 'RICHTIG').length;
    const partialCount = optionVerdicts.filter(
      (entry) => entry.verdict === 'TEILWEISE_RICHTIG',
    ).length;
    const wrongCount = optionVerdicts.filter((entry) => entry.verdict === 'FALSCH').length;

    const missedCorrect = correctOptionIds.filter((id) => !selected.includes(id)).length;

    let verdict: OptionVerdict;
    if (correctOptionIds.length === 0) {
      // Fehlende Daten: ohne korrekte Optionen ist keine volle Bewertung möglich.
      verdict = 'TEILWEISE_RICHTIG';
    } else if (wrongCount > 0) {
      verdict = 'FALSCH';
    } else if (missedCorrect > 0 || partialCount > 0 || correctCount === 0) {
      verdict = 'TEILWEISE_RICHTIG';
    } else {
      verdict = 'RICHTIG';
    }

    return {
      stage,
      selectedOptionIds: selected,
      verdict,
      optionVerdicts,
      correctCount,
      partialCount,
      wrongCount,
      missedCount: missedCorrect,
      explanation,
    };
  }

  /** Wertet einen kompletten Fall über alle drei Stufen aus. */
  evaluateCase(scenario: Scenario, selections: StageSelection[]): CaseResult {
    const evaluations: StageEvaluation[] = [
      this.evaluateStage(
        1,
        scenario.stageOne.options,
        scenario.stageOne.correctOptions,
        scenario.stageOne.explanation,
        this.selectedFor(selections, 1),
      ),
      this.evaluateStage(
        2,
        scenario.stageTwo.options,
        scenario.stageTwo.correctOptions,
        scenario.stageTwo.explanation,
        this.selectedFor(selections, 2),
      ),
      this.evaluateStage(
        3,
        scenario.stageThree.options,
        scenario.stageThree.correctOptions,
        scenario.stageThree.explanation,
        this.selectedFor(selections, 3),
      ),
    ];

    const overallVerdict = this.aggregateVerdict(evaluations.map((entry) => entry.verdict));
    const score = this.computeScore(scenario, evaluations);

    return {
      scenarioId: scenario.id,
      evaluations,
      overallVerdict,
      score,
      result: scenario.result,
    };
  }

  /**
   * Ermittelt typische Denkfehler zu den gewählten Optionen.
   * Grundlage sind die in Bibel-Kapitel 13/62 verbotenen Automatismen.
   */
  collectMisconceptions(options: StageOption[], selectedOptionIds: string[]): string[] {
    const byId = new Map(options.map((option) => [option.id, option]));
    return selectedOptionIds
      .map((id) => byId.get(id))
      .filter((option): option is StageOption => !!option)
      .filter((option) => option.verdict !== 'RICHTIG' && !!option.misconception)
      .map((option) => option.misconception as string);
  }

  /**
   * Ermittelt die Denkfehler einer konkreten Stufe aus dem Gesamtergebnis.
   * Dadurch erscheinen Denkfehler auf der Ergebnisseite in jeder Stufe und
   * nicht nur in Stufe 3.
   */
  misconceptionsForStage(scenario: Scenario, stage: 1 | 2 | 3, selectedOptionIds: string[]): string[] {
    const options = this.optionsForStage(scenario, stage);
    return this.collectMisconceptions(options, selectedOptionIds);
  }

  /** Optionen einer Stufe. */
  private optionsForStage(scenario: Scenario, stage: 1 | 2 | 3): StageOption[] {
    if (stage === 1) return scenario.stageOne.options;
    if (stage === 2) return scenario.stageTwo.options;
    return scenario.stageThree.options;
  }

  /** Gesamtbewertung: eine falsche Stufe führt zu FALSCH. */
  private aggregateVerdict(verdicts: OptionVerdict[]): OptionVerdict {
    if (verdicts.some((verdict) => verdict === 'FALSCH')) {
      return 'FALSCH';
    }
    if (verdicts.some((verdict) => verdict === 'TEILWEISE_RICHTIG')) {
      return 'TEILWEISE_RICHTIG';
    }
    return 'RICHTIG';
  }

  /**
   * Punktwert 0–100.
   *
   * Richtig erkannte Optionen zählen voll, teilweise richtige zur Hälfte,
   * falsch gewählte und übersehene richtige Optionen werden abgezogen.
   * Fehlende Daten (keine korrekten Optionen) führen nicht zu Punkten.
   */
  private computeScore(scenario: Scenario, evaluations: StageEvaluation[]): number {
    const totalCorrect =
      scenario.stageOne.correctOptions.length +
      scenario.stageTwo.correctOptions.length +
      scenario.stageThree.correctOptions.length;

    if (totalCorrect === 0) {
      return 0;
    }

    const hit = evaluations.reduce((sum, entry) => sum + entry.correctCount, 0);
    const partial = evaluations.reduce((sum, entry) => sum + entry.partialCount, 0);
    const wrong = evaluations.reduce((sum, entry) => sum + entry.wrongCount, 0);
    const missed = evaluations.reduce((sum, entry) => sum + entry.missedCount, 0);

    const raw = ((hit + 0.5 * partial - wrong - missed) / totalCorrect) * 100;
    return Math.max(0, Math.min(100, Math.round(raw)));
  }

  private selectedFor(selections: StageSelection[], stage: 1 | 2 | 3): string[] {
    return selections.find((entry) => entry.stage === stage)?.selectedOptionIds ?? [];
  }
}
