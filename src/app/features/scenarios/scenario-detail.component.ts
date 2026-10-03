import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Scenario } from '../../core/models';
import { ScenarioService } from '../../core/services/scenario.service';

/**
 * Falldetailseite: hebt den Originalfall als zentrale Sachverhaltskarte hervor
 * und erklärt kurz den Ablauf der drei Stufen.
 */
@Component({
  selector: 'app-scenario-detail',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  template: `
    <div class="ft-container ft-page">
      @if (scenario(); as current) {
        <a mat-button routerLink="/scenarios" class="back">
          <mat-icon aria-hidden="true">arrow_back</mat-icon>
          Alle Fälle
        </a>

        <header class="case-head">
          <span class="ft-eyebrow">Sachverhalt</span>
          <h1>{{ current.title }}</h1>
        </header>

        <article class="case-card">
          <div class="case-card-head">
            <span class="case-badge">
              <mat-icon aria-hidden="true">description</mat-icon>
              Originalfall
            </span>
          </div>
          <p class="case-text">{{ current.originalCaseText }}</p>
          <div class="case-actions">
            <a mat-flat-button color="primary" [routerLink]="['/scenarios', current.id, 'stage', 1]">
              Fall bearbeiten
              <mat-icon aria-hidden="true">arrow_forward</mat-icon>
            </a>
          </div>
        </article>

        <section class="start-block" aria-labelledby="ablauf-title">
          <h2 id="ablauf-title">So läuft die Bearbeitung</h2>
          <p>
            Sie bearbeiten den Fall in genau drei Stufen: Verhalten, rechtliche Einordnung und
            Rechtsgrundlage. Am Ende erhalten Sie eine Musterlösung.
          </p>
          <ol class="stage-list">
            <li>
              <span class="stage-num" aria-hidden="true">1</span>
              <div>
                <strong>Wie verhalten Sie sich?</strong>
                <span>Umgang mit Menschen: Deeskalation, Eigensicherung, Dokumentation.</span>
              </div>
            </li>
            <li>
              <span class="stage-num" aria-hidden="true">2</span>
              <div>
                <strong>Was liegt rechtlich vor?</strong>
                <span>Straftat, verbotene Eigenmacht, Anspruch oder Gefahr einordnen.</span>
              </div>
            </li>
            <li>
              <span class="stage-num" aria-hidden="true">3</span>
              <div>
                <strong>Mit welcher Rechtsgrundlage dürfen Sie eingreifen?</strong>
                <span>Die konkrete Befugnis samt Voraussetzungen und Grenzen bestimmen.</span>
              </div>
            </li>
          </ol>
        </section>
      } @else {
        <div class="not-found">
          <h2>Fall nicht gefunden</h2>
          <p>Der gewünschte Fall ist nicht vorhanden.</p>
          <a mat-flat-button color="primary" routerLink="/scenarios">Zur Fallübersicht</a>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .back {
        justify-self: start;
      }
      .case-head h1 {
        margin: 0.3rem 0 0;
        font-size: clamp(1.7rem, 3.4vw, 2.3rem);
      }
      .case-card {
        position: relative;
        border: 1px solid var(--ft-border);
        border-radius: var(--ft-radius-lg);
        background:
          linear-gradient(180deg, var(--ft-surface-2), var(--ft-surface));
        box-shadow: var(--ft-shadow);
        padding: 1.75rem;
        overflow: hidden;
      }
      .case-card::before {
        content: '';
        position: absolute;
        inset: 0 0 auto 0;
        height: 4px;
        background: linear-gradient(90deg, var(--ft-accent), var(--ft-secondary));
      }
      .case-card-head {
        margin-bottom: 0.75rem;
      }
      .case-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.76rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--ft-accent-strong);
      }
      .case-badge mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
      .case-text {
        margin: 0;
        font-size: clamp(1.05rem, 2vw, 1.2rem);
        line-height: 1.75;
        color: var(--ft-text);
      }
      .case-actions {
        margin-top: 1.5rem;
      }
      .start-block {
        border: 1px solid var(--ft-border);
        border-radius: var(--ft-radius-lg);
        background: var(--ft-surface);
        padding: 1.6rem;
      }
      .start-block h2 {
        margin: 0 0 0.5rem;
        font-size: 1.3rem;
      }
      .start-block > p {
        margin: 0 0 1.1rem;
        color: var(--ft-muted);
        line-height: 1.6;
      }
      .stage-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.85rem;
      }
      .stage-list li {
        display: flex;
        gap: 0.85rem;
        align-items: flex-start;
      }
      .stage-num {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        flex: 0 0 auto;
        border-radius: 50%;
        background: var(--ft-primary-soft);
        color: var(--ft-primary);
        font-weight: 700;
        font-size: 0.9rem;
      }
      .stage-list strong {
        display: block;
        line-height: 1.4;
      }
      .stage-list span {
        color: var(--ft-muted);
        font-size: 0.92rem;
        line-height: 1.5;
      }
      .not-found {
        border: 1px solid var(--ft-border);
        border-radius: var(--ft-radius-lg);
        background: var(--ft-surface);
        padding: 1.75rem;
        display: grid;
        gap: 0.75rem;
        justify-items: start;
      }
      .not-found h2 {
        margin: 0;
      }
      .not-found p {
        margin: 0;
        color: var(--ft-muted);
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
