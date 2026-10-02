import { Component } from '@angular/core';
import { Scenario } from '../../core/models';
import { StageData, StagePageBase } from '../../shared/components/stage-page.base';
import { ProgressStepperComponent } from '../../shared/components/progress-stepper.component';
import { ScenarioFactsComponent } from '../../shared/components/scenario-facts.component';
import { StageQuizComponent } from '../../shared/components/stage-quiz.component';

@Component({
  selector: 'app-stage-one',
  imports: [ProgressStepperComponent, ScenarioFactsComponent, StageQuizComponent],
  template: `
    <div class="ft-container page">
      <app-progress-stepper [current]="1" />
      @if (scenario(); as current) {
        <app-scenario-facts [scenario]="current" />
        <app-stage-quiz
          heading="Stufe 1 – Wie verhalten Sie sich?"
          [prompt]="current.stageOne.prompt"
          [options]="current.stageOne.options"
          [selectedIds]="selected()"
          [allowMultiple]="allowMultiple()"
          [submitted]="submitted()"
          [evaluation]="evaluation()"
          [normLabels]="normLabels()"
          [nextLabel]="nextLabel()"
          (toggleOption)="toggleOption($event)"
          (selectOption)="toggleOption($event)"
          (submit)="submit()"
          (next)="next()"
        />
      }
    </div>
  `,
  styles: [
    `
      .page {
        display: grid;
        gap: 1.25rem;
        padding-block: 1.5rem 3rem;
      }
    `,
  ],
})
export class StageOneComponent extends StagePageBase {
  readonly stage = 1 as const;
  readonly heading = 'Stufe 1 – Wie verhalten Sie sich?';

  protected stageData(scenario: Scenario): StageData {
    return scenario.stageOne;
  }

  protected nextRoute(scenarioId: string): unknown[] {
    return ['/scenarios', scenarioId, 'stage', 2];
  }
}
