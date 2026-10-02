import { Component } from '@angular/core';
import { Scenario } from '../../core/models';
import { StageData, StagePageBase } from '../../shared/components/stage-page.base';
import { ProgressStepperComponent } from '../../shared/components/progress-stepper.component';
import { ScenarioFactsComponent } from '../../shared/components/scenario-facts.component';
import { StageQuizComponent } from '../../shared/components/stage-quiz.component';

@Component({
  selector: 'app-stage-two',
  imports: [ProgressStepperComponent, ScenarioFactsComponent, StageQuizComponent],
  template: `
    <div class="ft-container page">
      <app-progress-stepper [current]="2" />
      @if (scenario(); as current) {
        <app-scenario-facts [scenario]="current" />
        <app-stage-quiz
          heading="Stufe 2 – Was liegt rechtlich vor?"
          [prompt]="current.stageTwo.prompt"
          [options]="current.stageTwo.options"
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
export class StageTwoComponent extends StagePageBase {
  readonly stage = 2 as const;
  readonly heading = 'Stufe 2 – Was liegt rechtlich vor?';

  protected stageData(scenario: Scenario): StageData {
    return scenario.stageTwo;
  }

  protected nextRoute(scenarioId: string): unknown[] {
    return ['/scenarios', scenarioId, 'stage', 3];
  }
}
