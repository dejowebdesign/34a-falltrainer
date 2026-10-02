import { Component } from '@angular/core';
import { Scenario } from '../../core/models';
import { StageData, StagePageBase } from '../../shared/components/stage-page.base';
import { ProgressStepperComponent } from '../../shared/components/progress-stepper.component';
import { ScenarioFactsComponent } from '../../shared/components/scenario-facts.component';
import { StageQuizComponent } from '../../shared/components/stage-quiz.component';

@Component({
  selector: 'app-stage-three',
  imports: [ProgressStepperComponent, ScenarioFactsComponent, StageQuizComponent],
  template: `
    <div class="ft-container page">
      <app-progress-stepper [current]="3" />
      @if (scenario(); as current) {
        <app-scenario-facts [scenario]="current" />
        <app-stage-quiz
          heading="Stufe 3 – Mit welcher Rechtsgrundlage dürfen Sie eingreifen?"
          [prompt]="current.stageThree.prompt"
          [options]="current.stageThree.options"
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
export class StageThreeComponent extends StagePageBase {
  readonly stage = 3 as const;
  readonly heading = 'Stufe 3 – Mit welcher Rechtsgrundlage dürfen Sie eingreifen?';

  protected stageData(scenario: Scenario): StageData {
    return scenario.stageThree;
  }

  protected nextRoute(scenarioId: string): unknown[] {
    return ['/scenarios', scenarioId, 'result'];
  }
}
