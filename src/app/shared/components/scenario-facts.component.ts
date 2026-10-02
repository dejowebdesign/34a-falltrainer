import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Scenario } from '../../core/models';

/** FALLBESCHREIBUNG mit hervorgehobenen rechtlich relevanten Tatsachen. */
@Component({
  selector: 'app-scenario-facts',
  imports: [MatCardModule, MatIconModule],
  template: `
    <mat-card appearance="outlined" class="facts-card">
      <mat-card-header>
        <mat-card-title>{{ scenario().title }}</mat-card-title>
        <mat-card-subtitle>Fallbeschreibung</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p class="description">{{ scenario().description }}</p>
        <h3 class="facts-title">Sachverhalt</h3>
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
        border-radius: 14px;
      }
      .description {
        color: var(--ft-muted);
        margin-top: 0.5rem;
      }
      .facts-title {
        font-size: 1rem;
        margin: 1rem 0 0.5rem;
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
        gap: 0.5rem;
        align-items: flex-start;
        padding: 0.6rem 0.75rem;
        border-radius: 10px;
        background: #f8fafc;
        border: 1px solid var(--ft-border);
      }
      .facts li.relevant {
        background: #eff6ff;
        border-color: #bfdbfe;
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
