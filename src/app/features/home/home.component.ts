import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ScenarioService } from '../../core/services/scenario.service';
import { BehaviorReferenceComponent } from '../../shared/components/behavior-reference.component';

interface HomeStep {
  number: string;
  badge: string;
  title: string;
  icon: string;
  text: string;
}

interface Automatism {
  trigger: string;
  consequence: string;
}

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    BehaviorReferenceComponent,
  ],
  template: `
    <section class="hero">
      <div class="ft-container hero-inner">
        <div class="hero-text">
          <p class="eyebrow">Sachkundeprüfung §34a GewO</p>
          <h1>Juristisches Denken trainieren.</h1>
          <p class="hero-sub">
            Vom Verhalten zur rechtlichen Einordnung zur konkreten Rechtsgrundlage.
          </p>
          <p class="lead">
            Der Falltrainer führt Sie nicht einfach zur richtigen Paragraphennummer. Er trainiert den
            Weg dorthin – in drei aufeinander aufbauenden Stufen.
          </p>
          <div class="hero-actions">
            <a mat-flat-button class="cta" routerLink="/scenarios">
              <mat-icon aria-hidden="true">play_arrow</mat-icon>
              Fälle starten
            </a>
            <span class="count">{{ scenarioCount }} Fälle verfügbar</span>
          </div>
        </div>
        <div class="hero-art" aria-hidden="true">
          <mat-icon>balance</mat-icon>
        </div>
      </div>
    </section>

    <section class="ft-container content">
      <header class="section-head">
        <h2>Das 3-Stufen-System</h2>
        <p class="section-sub">
          Jede Stufe beantwortet genau eine Frage – erst danach folgt die nächste.
        </p>
      </header>

      <div class="steps">
        @for (step of steps; track step.number) {
          <mat-card appearance="outlined" class="step-card">
            <mat-card-content>
              <div class="step-top">
                <span class="step-icon"><mat-icon aria-hidden="true">{{ step.icon }}</mat-icon></span>
                <span class="step-index">{{ step.number }}</span>
              </div>
              <span class="step-badge">{{ step.badge }}</span>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </mat-card-content>
          </mat-card>
        }
      </div>

      <mat-card appearance="outlined" class="principle">
        <mat-card-content>
          <div class="principle-head">
            <mat-icon aria-hidden="true">balance</mat-icon>
            <div>
              <h3>Die Grundregel</h3>
              <p class="principle-sub">Nicht vom Sachverhalt direkt zur Rechtsfolge springen.</p>
            </div>
          </div>
          <ul class="automatisms">
            @for (item of automatisms; track item.trigger) {
              <li>
                <span class="trigger">{{ item.trigger }}</span>
                <mat-icon aria-hidden="true">arrow_forward</mat-icon>
                <span class="consequence">{{ item.consequence }}</span>
              </li>
            }
          </ul>
        </mat-card-content>
      </mat-card>

      <section class="lernhilfe">
        <h2>Lernhilfe: Umgang mit Menschen</h2>
        <p class="section-sub">
          Verhaltensgrundsätze für Stufe 1 – als Nachschlagewerk, nicht als Rechtsgrundlage.
        </p>
        <mat-accordion>
          <mat-expansion-panel class="lernhilfe-panel">
            <mat-expansion-panel-header>
              <mat-panel-title>Verhaltensgrundsätze anzeigen</mat-panel-title>
            </mat-expansion-panel-header>
            <app-behavior-reference />
          </mat-expansion-panel>
        </mat-accordion>
      </section>

      <p class="source-note">
        <mat-icon aria-hidden="true">verified</mat-icon>
        <span>
          Fachliche Grundlage: §34a Legal Knowledge Base V5.3.1 (Rechtsstand 01.10.2026). Amtliche
          Gesetzestexte aus „Gesetze im Internet“ (BMJ / Bundesamt für Justiz).
        </span>
      </p>
    </section>
  `,
  styles: [
    `
      .hero {
        background: linear-gradient(135deg, var(--ft-hero-from) 0%, var(--ft-hero-to) 100%);
        color: #fff;
        padding-block: 2.25rem 2.5rem;
        transition: background 0.2s ease;
      }
      .hero-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
      }
      .hero-text {
        max-width: 720px;
      }
      .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.78rem;
        font-weight: 600;
        opacity: 0.9;
        margin: 0 0 0.6rem;
      }
      .hero h1 {
        font-size: clamp(1.75rem, 3.6vw, 2.6rem);
        line-height: 1.12;
        margin: 0 0 0.6rem;
        font-weight: 700;
      }
      .hero-sub {
        font-size: clamp(1rem, 2vw, 1.15rem);
        font-weight: 500;
        opacity: 0.96;
        margin: 0 0 0.75rem;
      }
      .lead {
        font-size: 1rem;
        line-height: 1.55;
        max-width: 620px;
        opacity: 0.92;
        margin: 0;
      }
      .hero-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
        margin-top: 1.4rem;
      }
      .cta {
        background: #fff;
        color: #1e3a8a;
      }
      .count {
        font-size: 0.92rem;
        opacity: 0.9;
      }
      .hero-art {
        flex: 0 0 auto;
        display: none;
      }
      .hero-art mat-icon {
        font-size: 120px;
        width: 120px;
        height: 120px;
        opacity: 0.14;
      }
      @media (min-width: 900px) {
        .hero-art {
          display: block;
        }
      }
      .content {
        padding-block: 2.5rem 3rem;
        display: grid;
        gap: 1.75rem;
      }
      .section-head h2,
      .lernhilfe h2 {
        margin: 0 0 0.35rem;
        font-size: 1.5rem;
      }
      .section-sub {
        margin: 0;
        color: var(--ft-muted);
        line-height: 1.5;
      }
      .steps {
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr;
      }
      @media (min-width: 640px) {
        .steps {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (min-width: 900px) {
        .steps {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      .step-card {
        border-radius: 16px;
        height: 100%;
        transition:
          transform 0.15s ease,
          box-shadow 0.15s ease,
          border-color 0.15s ease;
      }
      .step-card:hover {
        transform: translateY(-3px);
        box-shadow: var(--ft-shadow);
        border-color: var(--ft-primary);
      }
      .step-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.75rem;
      }
      .step-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: var(--ft-primary-soft);
        color: var(--ft-primary);
      }
      .step-index {
        font-size: 1.6rem;
        font-weight: 700;
        color: var(--ft-border);
        letter-spacing: 0.02em;
      }
      .step-badge {
        display: inline-block;
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--ft-primary);
        background: var(--ft-primary-soft);
        padding: 0.22rem 0.55rem;
        border-radius: 999px;
      }
      .step-card h3 {
        margin: 0.6rem 0 0.45rem;
        font-size: 1.08rem;
      }
      .step-card p {
        margin: 0;
        color: var(--ft-muted);
        line-height: 1.55;
      }
      .principle {
        border-radius: 16px;
        background: var(--ft-rule-surface);
        border-color: var(--ft-rule-border);
      }
      .principle-head {
        display: flex;
        gap: 0.9rem;
        align-items: flex-start;
        margin-bottom: 1rem;
      }
      .principle-head mat-icon {
        color: var(--ft-rule-accent);
        flex: 0 0 auto;
      }
      .principle h3 {
        margin: 0 0 0.2rem;
        font-size: 1.1rem;
        color: var(--ft-rule-text);
      }
      .principle-sub {
        margin: 0;
        color: var(--ft-rule-text);
        opacity: 0.85;
        line-height: 1.5;
      }
      .automatisms {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.6rem;
        grid-template-columns: 1fr;
      }
      @media (min-width: 768px) {
        .automatisms {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      .automatisms li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.7rem;
        border-radius: 10px;
        background: var(--ft-rule-item);
        border: 1px solid var(--ft-rule-border);
      }
      .automatisms .trigger {
        font-weight: 600;
        color: var(--ft-text);
        flex: 0 0 auto;
      }
      .automatisms mat-icon {
        color: var(--ft-rule-accent);
        font-size: 18px;
        width: 18px;
        height: 18px;
        flex: 0 0 auto;
      }
      .automatisms .consequence {
        color: var(--ft-muted);
        font-size: 0.92rem;
      }
      .lernhilfe-panel {
        border-radius: 14px;
      }
      .source-note {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        color: var(--ft-muted);
        font-size: 0.82rem;
        line-height: 1.5;
        margin: 0;
      }
      .source-note mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
        flex: 0 0 auto;
        margin-top: 2px;
        color: var(--ft-accent);
      }
    `,
  ],
})
export class HomeComponent {
  private readonly scenarios = inject(ScenarioService);
  readonly scenarioCount = this.scenarios.getScenarios().length;

  readonly steps: HomeStep[] = [
    {
      number: '01',
      badge: 'Stufe 1',
      title: 'Wie verhalten Sie sich?',
      icon: 'support_agent',
      text: 'Umgang mit Menschen: Ruhe bewahren, deeskalieren, Eigensicherung, Polizei oder Rettungsdienst verständigen.',
    },
    {
      number: '02',
      badge: 'Stufe 2',
      title: 'Was liegt rechtlich vor?',
      icon: 'balance',
      text: 'Rechtliche Einordnung: möglicher Diebstahl, Körperverletzung, Hausfriedensbruch, Gefahr oder Angriff.',
    },
    {
      number: '03',
      badge: 'Stufe 3',
      title: 'Mit welcher Rechtsgrundlage?',
      icon: 'verified',
      text: 'Erst hier wird die konkrete Befugnis oder Rechtfertigung bestimmt – etwa §127 StPO, §859 BGB, §32 StGB oder §34 StGB.',
    },
  ];

  readonly automatisms: Automatism[] = [
    { trigger: 'Diebstahl', consequence: 'nicht automatisch Festhaltebefugnis' },
    { trigger: 'Hausverbot', consequence: 'nicht automatisch Gewalt' },
    { trigger: 'Eigentum', consequence: 'nicht automatisch Selbsthilfe' },
    { trigger: 'Gefahr', consequence: 'nicht automatisch §34 StGB' },
    { trigger: 'Angriff', consequence: 'nicht automatisch jede Gewalt' },
  ];
}
