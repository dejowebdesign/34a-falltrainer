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
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .step {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1 1 auto;
        min-width: 140px;
        padding: 0.6rem 0.8rem;
        border-radius: 10px;
        background: var(--ft-surface);
        border: 1px solid var(--ft-border);
        color: var(--ft-muted);
        font-size: 0.9rem;
      }
      .marker {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--ft-primary-soft);
        color: var(--ft-primary);
        font-weight: 600;
        flex: 0 0 auto;
      }
      .marker mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
      .step.active {
        border-color: var(--ft-primary);
        color: var(--ft-text);
        box-shadow: 0 0 0 2px rgba(30, 58, 138, 0.12);
      }
      .step.active .marker {
        background: var(--ft-primary);
        color: #fff;
      }
      .step.done {
        color: var(--ft-ok);
        border-color: #bbf7d0;
      }
      .step.done .marker {
        background: var(--ft-ok);
        color: #fff;
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
