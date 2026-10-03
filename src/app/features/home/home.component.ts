import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorReferenceComponent } from '../../shared/components/behavior-reference.component';
import { LegalOrientationComponent } from '../../shared/components/legal-orientation.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    BehaviorReferenceComponent,
    LegalOrientationComponent,
  ],
  template: `
    <section class="hero">
      <div class="ft-container hero-inner">
        <div class="hero-text">
          <p class="eyebrow">Sachkundeprüfung § 34a GewO</p>
          <h1>Rechtssicher handeln. Situationen richtig einordnen.</h1>
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
              Fallbeispiele starten
            </a>
          </div>
        </div>
        <div class="hero-art" aria-hidden="true">
          <mat-icon>balance</mat-icon>
        </div>
      </div>
    </section>

    <div class="ft-container content">
      <section class="learning-block" aria-labelledby="umgang-title">
        <header class="block-head">
          <div>
            <h2 id="umgang-title">Umgang mit Menschen</h2>
            <p class="block-question">„Wie verhalten Sie sich?“</p>
          </div>
        </header>
        <app-behavior-reference />
      </section>

      <section class="learning-block" aria-label="Rechtliche Einordnung und Rechtsgrundlage">
        <app-legal-orientation />
      </section>

      <p class="source-note">
        <mat-icon aria-hidden="true">verified</mat-icon>
        <span>
          Fachliche Grundlage: § 34a Legal Knowledge Base V5.3.1 (Rechtsstand 01.10.2026). Amtliche
          Gesetzestexte aus „Gesetze im Internet“ (BMJ / Bundesamt für Justiz).
        </span>
      </p>
    </div>

    <footer class="site-footer">
      <p>© 2026 Dejan Popovic. Alle Rechte vorbehalten.</p>
    </footer>
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
        padding-block: 2rem 2.5rem;
        display: grid;
        gap: 1.75rem;
      }
      .learning-block {
        display: grid;
        gap: 0.9rem;
      }
      .block-head {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
      }
      .block-head h2 {
        margin: 0 0 0.2rem;
        font-size: 1.5rem;
      }
      .block-question {
        margin: 0;
        color: var(--ft-muted);
        line-height: 1.5;
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
      .site-footer {
        border-top: 1px solid var(--ft-border);
        background: var(--ft-surface);
        padding-block: 1.5rem;
        margin-top: 0.5rem;
      }
      .site-footer p {
        margin: 0;
        text-align: center;
        color: var(--ft-muted);
        font-size: 0.85rem;
      }
    `,
  ],
})
export class HomeComponent {}
