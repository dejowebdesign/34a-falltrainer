import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ScenarioService } from '../../core/services/scenario.service';
import { BehaviorReferenceComponent } from '../../shared/components/behavior-reference.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule, BehaviorReferenceComponent],
  template: `
    <section class="hero">
      <div class="ft-container hero-inner">
        <p class="eyebrow">Sachkundeprüfung nach §34a GewO</p>
        <h1>Juristisches Denken trainieren – in drei Stufen.</h1>
        <p class="lead">
          Der Falltrainer führt Sie nicht einfach zur richtigen Paragraphennummer. Er trainiert den
          Weg dorthin: erst das Verhalten, dann die rechtliche Einordnung, erst danach die konkrete
          Rechtsgrundlage.
        </p>
        <div class="hero-actions">
          <a mat-flat-button color="primary" routerLink="/scenarios">
            <mat-icon aria-hidden="true">play_arrow</mat-icon>
            Fälle starten
          </a>
          <span class="count">{{ scenarioCount }} Fälle verfügbar</span>
        </div>
      </div>
    </section>

    <section class="ft-container content">
      <h2>Die drei Stufen</h2>
      <div class="steps">
        <mat-card appearance="outlined" class="step-card">
          <mat-card-content>
            <span class="step-number">Stufe 1</span>
            <h3>Wie verhalten Sie sich?</h3>
            <p>
              Umgang mit Menschen: Ruhe bewahren, deeskalieren, Eigensicherung, Polizei oder
              Rettungsdienst verständigen. Die App erklärt, warum ein Verhalten sinnvoll oder
              problematisch ist.
            </p>
          </mat-card-content>
        </mat-card>
        <mat-card appearance="outlined" class="step-card">
          <mat-card-content>
            <span class="step-number">Stufe 2</span>
            <h3>Was liegt rechtlich vor?</h3>
            <p>
              Rechtliche Einordnung des Sachverhalts: möglicher Diebstahl, Körperverletzung,
              Hausfriedensbruch, verbotene Eigenmacht, Gefahr oder Angriff. Ein Tatverdacht ist nicht
              automatisch eine feststehende Straftat.
            </p>
          </mat-card-content>
        </mat-card>
        <mat-card appearance="outlined" class="step-card">
          <mat-card-content>
            <span class="step-number">Stufe 3</span>
            <h3>Mit welcher Rechtsgrundlage?</h3>
            <p>
              Erst hier wird die konkrete Befugnis oder Rechtfertigung bestimmt – etwa §127 StPO,
              §859 BGB, §229 BGB, §32 StGB oder §34 StGB.
            </p>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-card appearance="outlined" class="principle">
        <mat-card-content>
          <mat-icon aria-hidden="true">balance</mat-icon>
          <div>
            <h3>Grundsatz: keine Automatismen</h3>
            <p>
              Diebstahl ist nicht automatisch eine Festhaltebefugnis. Hausverbot ist nicht automatisch
              Gewalt. Eigentum ist nicht automatisch das Recht, die Sache selbst wegzunehmen. Gefahr ist
              nicht automatisch Notstand. Angriff ist nicht automatisch jede Gewalt. Uniform ist nicht
              Polizeibefugnis.
            </p>
          </div>
        </mat-card-content>
      </mat-card>

      <p class="source-note">
        Fachliche Grundlage: §34a Legal Knowledge Base V5.3.1 (Rechtsstand 01.10.2026). Amtliche
        Gesetzestexte aus „Gesetze im Internet“ (Bundesministerium der Justiz / Bundesamt für Justiz).
        Didaktische Grundlage der drei Stufen: Unterlage „Fallbeispiele – Themenvertiefung“
        (30.09.2026).
      </p>

      <app-behavior-reference />
    </section>
  `,
  styles: [
    `
      .hero {
        background: linear-gradient(135deg, #1e3a8a 0%, #0f766e 100%);
        color: #fff;
        padding-block: 3rem 3.5rem;
      }
      .hero-inner {
        max-width: 860px;
      }
      .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.8rem;
        opacity: 0.9;
        margin: 0 0 0.75rem;
      }
      .hero h1 {
        font-size: clamp(1.9rem, 4vw, 2.9rem);
        line-height: 1.15;
        margin: 0 0 1rem;
        font-weight: 700;
      }
      .lead {
        font-size: 1.1rem;
        line-height: 1.6;
        max-width: 720px;
        opacity: 0.95;
      }
      .hero-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
        margin-top: 1.75rem;
      }
      .hero-actions a {
        background: #fff;
        color: #1e3a8a;
      }
      .count {
        font-size: 0.95rem;
        opacity: 0.9;
      }
      .content {
        padding-block: 2.5rem 3.5rem;
        display: grid;
        gap: 1.5rem;
      }
      .content h2 {
        margin: 0;
        font-size: 1.5rem;
      }
      .steps {
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr;
      }
      @media (min-width: 768px) {
        .steps {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      .step-card {
        border-radius: 14px;
        height: 100%;
      }
      .step-number {
        display: inline-block;
        font-size: 0.78rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--ft-primary);
        background: var(--ft-primary-soft);
        padding: 0.25rem 0.6rem;
        border-radius: 999px;
      }
      .step-card h3 {
        margin: 0.75rem 0 0.5rem;
        font-size: 1.1rem;
      }
      .step-card p {
        margin: 0;
        color: var(--ft-muted);
        line-height: 1.55;
      }
      .principle {
        border-radius: 14px;
        background: #fffbeb;
        border-color: #fcd34d;
      }
      .principle mat-card-content {
        display: flex;
        gap: 0.9rem;
        align-items: flex-start;
      }
      .principle mat-icon {
        color: var(--ft-warn);
        flex: 0 0 auto;
      }
      .principle h3 {
        margin: 0 0 0.4rem;
        font-size: 1.05rem;
      }
      .principle p {
        margin: 0;
        color: #78350f;
        line-height: 1.55;
      }
      .source-note {
        color: var(--ft-muted);
        font-size: 0.85rem;
        line-height: 1.5;
      }
    `,
  ],
})
export class HomeComponent {
  private readonly scenarios = inject(ScenarioService);
  readonly scenarioCount = this.scenarios.getScenarios().length;
}
