import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScenarioService } from '../../core/services/scenario.service';

@Component({
  selector: 'app-scenario-list',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="ft-container page">
      <header class="page-head">
        <h1>Fälle</h1>
        <p>
          Wählen Sie einen Fall. Sie durchlaufen ihn in drei Stufen und erhalten am Ende eine
          Musterlösung mit Begründung und Grenzen.
        </p>
      </header>

      <div class="grid">
        @for (scenario of scenarios; track scenario.id) {
          <mat-card appearance="outlined" class="scenario-card">
            <mat-card-header>
              <mat-card-title>{{ scenario.title }}</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>{{ scenario.description }}</p>
            </mat-card-content>
            <mat-card-actions align="end">
              <a mat-flat-button color="primary" [routerLink]="['/scenarios', scenario.id]">
                Fall öffnen
                <mat-icon aria-hidden="true">arrow_forward</mat-icon>
              </a>
            </mat-card-actions>
          </mat-card>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .page {
        padding-block: 2rem 3.5rem;
        display: grid;
        gap: 1.5rem;
      }
      .page-head h1 {
        margin: 0 0 0.5rem;
        font-size: 1.9rem;
      }
      .page-head p {
        margin: 0;
        color: var(--ft-muted);
        max-width: 720px;
        line-height: 1.55;
      }
      .grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr;
      }
      @media (min-width: 768px) {
        .grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      .scenario-card {
        border-radius: 14px;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .scenario-card mat-card-content {
        flex: 1 1 auto;
      }
      .scenario-card p {
        color: var(--ft-muted);
        line-height: 1.55;
        margin: 0.25rem 0 0;
      }
    `,
  ],
})
export class ScenarioListComponent {
  private readonly scenarioService = inject(ScenarioService);
  readonly scenarios = this.scenarioService.getScenarios();
}
