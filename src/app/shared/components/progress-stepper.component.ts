import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export interface ProgressStep {
  number: 1 | 2 | 3 | 4;
  label: string;
}

/**
 * Deutliche Fortschrittsanzeige: Stufe 1 → Stufe 2 → Stufe 3 → Ergebnis.
 */
@Component({
  selector: 'app-progress-stepper',
  imports: [MatIconModule],
  template: `
    <ol class="stepper" [attr.aria-label]="'Fortschritt: ' + ariaText()">
      @for (step of steps(); track step.number) {
        <li
          class="step"
          [class.done]="step.number < current()"
          [class.active]="step.number === current()"
          [attr.aria-current]="step.number === current() ? 'step' : null"
        >
          <span class="marker" aria-hidden="true">
            @if (step.number < current()) {
              <mat-icon>check</mat-icon>
            } @else {
              {{ step.number }}
            }
          </span>
          <span class="label">{{ step.label }}</span>
        </li>
      }
    </ol>
  `,
  styles: [
    `
      .stepper {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: 0.6rem;
        flex-wrap: wrap;
      }
      .step {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        flex: 1 1 auto;
        min-width: 150px;
        padding: 0.7rem 0.9rem;
        border-radius: var(--ft-radius);
        background: var(--ft-surface);
        border: 1px solid var(--ft-border);
        color: var(--ft-muted);
        font-size: 0.9rem;
        transition:
          border-color var(--ft-transition),
          background-color var(--ft-transition),
          color var(--ft-transition);
      }
      .marker {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: var(--ft-surface-2);
        border: 1px solid var(--ft-border);
        color: var(--ft-muted);
        font-weight: 700;
        flex: 0 0 auto;
      }
      .marker mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
      .step.active {
        border-color: var(--ft-accent);
        background: var(--ft-accent-soft);
        color: var(--ft-text);
      }
      .step.active .marker {
        background: var(--ft-accent);
        border-color: var(--ft-accent);
        color: var(--ft-on-accent);
      }
      .step.done {
        color: var(--ft-text);
        border-color: var(--ft-ok-border);
      }
      .step.done .marker {
        background: var(--ft-ok);
        border-color: var(--ft-ok);
        color: var(--ft-on-primary);
      }
    `,
  ],
})
export class ProgressStepperComponent {
  readonly steps = input<ProgressStep[]>([
    { number: 1, label: 'Wie verhalten Sie sich?' },
    { number: 2, label: 'Was liegt rechtlich vor?' },
    { number: 3, label: 'Rechtsgrundlage' },
    { number: 4, label: 'Ergebnis' },
  ]);
  readonly current = input<1 | 2 | 3 | 4>(1);

  ariaText(): string {
    return this.steps()
      .map((step) => step.label)
      .join(', ');
  }
}
