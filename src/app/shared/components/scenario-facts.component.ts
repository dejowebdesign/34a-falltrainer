import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Scenario } from '../../core/models';

/** FALLBESCHREIBUNG mit hervorgehobenen rechtlich relevanten Tatsachen. */
@Component({
  selector: 'app-scenario-facts',
  imports: [MatCardModule, MatIconModule],
  template: `
    <mat-card appearance="outlined" class="facts-card ft-card--glass">
      <mat-card-header>
        <mat-card-title>{{ scenario().title }}</mat-card-title>
        <mat-card-subtitle>Fallbeschreibung</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        @if (scenario().originalCaseText) {
          <details class="case-details">
            <summary>Sachverhalt anzeigen</summary>
            <p class="case-text">{{ scenario().originalCaseText }}</p>
          </details>
        }
        <h3 class="facts-title">Bearbeitungssachverhalt (Kurzfassung)</h3>
        <ul class="facts">
          @for (fact of scenario().facts; track fact.id) {
            <li [class.relevant]="fact.legallyRelevant">
              @if (fact.legallyRelevant) {
                <mat-icon aria-label="rechtlich relevant" class="fact-icon">gavel</mat-icon>
              } @else {
                <mat-icon aria-hidden="true" class="fact-icon neutral">info</mat-icon>
              }
              <span>{{ fact.text }}</span>
            </li>
          }
        </ul>
        <p class="legend">
          <mat-icon aria-hidden="true">gavel</mat-icon> Als rechtlich relevant markierte Tatsachen
        </p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .facts-card {
        border-radius: var(--ft-radius-lg);
      }
      .case-details {
        margin: 0.25rem 0 1.15rem;
        border: 1px solid var(--ft-border);
        border-left: 3px solid var(--ft-accent);
        border-radius: var(--ft-radius-sm);
        background: var(--ft-surface-2);
        padding: 0.75rem 1rem;
      }
      .case-details summary {
        cursor: pointer;
        color: var(--ft-accent-strong);
        font-weight: 600;
      }
      .case-text {
        margin: 0.7rem 0 0;
        line-height: 1.7;
        font-size: 1.02rem;
      }
      .facts-title {
        margin: 0 0 0.6rem;
        color: var(--ft-muted);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        font-size: 0.78rem;
        font-weight: 700;
      }
      .facts {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.5rem;
      }
      .facts li {
        display: flex;
        gap: 0.6rem;
        align-items: flex-start;
        padding: 0.7rem 0.85rem;
        border-radius: var(--ft-radius-sm);
        background: var(--ft-surface-2);
        border: 1px solid var(--ft-border);
        line-height: 1.5;
      }
      .facts li.relevant {
        background: var(--ft-accent-soft);
        border-color: var(--ft-accent);
      }
      .fact-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        color: var(--ft-primary);
        flex: 0 0 auto;
        margin-top: 2px;
      }
      .fact-icon.neutral {
        color: var(--ft-muted);
      }
      .legend {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.8rem;
        color: var(--ft-muted);
        margin-top: 0.85rem;
      }
      .legend mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }
    `,
  ],
})
export class ScenarioFactsComponent {
  readonly scenario = input.required<Scenario>();
}
