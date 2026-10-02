import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Scenario } from '../../core/models';
import { ScenarioService } from '../../core/services/scenario.service';
import { ScenarioFactsComponent } from '../../shared/components/scenario-facts.component';

@Component({
  selector: 'app-scenario-detail',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, ScenarioFactsComponent],
  template: `
    <div class="ft-container page">
      @if (scenario(); as current) {
        <a mat-button routerLink="/scenarios" class="back">
          <mat-icon aria-hidden="true">arrow_back</mat-icon>
          Alle Fälle
        </a>

        <app-scenario-facts [scenario]="current" />

        <mat-card appearance="outlined" class="start-card">
          <mat-card-content>
            <h2>Bearbeitung starten</h2>
            <p>
              Sie bearbeiten den Fall in genau drei Stufen: Verhalten, rechtliche Einordnung und
              Rechtsgrundlage. Am Ende erhalten Sie eine Musterlösung.
            </p>
            <ol class="stage-list">
              <li><strong>Stufe 1:</strong> Wie verhalten Sie sich?</li>
              <li><strong>Stufe 2:</strong> Was liegt rechtlich vor?</li>
              <li><strong>Stufe 3:</strong> Mit welcher Rechtsgrundlage dürfen Sie eingreifen?</li>
            </ol>
          </mat-card-content>
          <mat-card-actions align="end">
            <a mat-flat-button color="primary" [routerLink]="['/scenarios', current.id, 'stage', 1]">
              Stufe 1 starten
              <mat-icon aria-hidden="true">arrow_forward</mat-icon>
            </a>
          </mat-card-actions>
        </mat-card>
      } @else {
        <mat-card appearance="outlined">
          <mat-card-content>
            <h2>Fall nicht gefunden</h2>
            <p>Der gewünschte Fall ist nicht vorhanden.</p>
          </mat-card-content>
          <mat-card-actions align="end">
            <a mat-flat-button color="primary" routerLink="/scenarios">Zur Fallübersicht</a>
          </mat-card-actions>
        </mat-card>
      }
    </div>
  `,
  styles: [
    `
      .page {
        padding-block: 1.5rem 3.5rem;
        display: grid;
        gap: 1.25rem;
      }
      .back {
        justify-self: start;
      }
      .start-card {
        border-radius: 14px;
      }
      .start-card h2 {
        margin: 0 0 0.5rem;
        font-size: 1.3rem;
      }
      .start-card p {
        margin: 0 0 0.75rem;
        color: var(--ft-muted);
        line-height: 1.55;
      }
      .stage-list {
        margin: 0;
        padding-left: 1.2rem;
        color: var(--ft-text);
        line-height: 1.8;
      }
    `,
  ],
})
export class ScenarioDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly scenarioService = inject(ScenarioService);

  readonly scenario = signal<Scenario | undefined>(undefined);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.scenario.set(this.scenarioService.getScenario(id));
  }
}
