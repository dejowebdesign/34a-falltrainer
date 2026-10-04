import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorReferenceComponent } from '../../shared/components/behavior-reference.component';
import { LegalOrientationComponent } from '../../shared/components/legal-orientation.component';
import { LearningPathComponent } from '../../shared/components/learning-path.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    BehaviorReferenceComponent,
    LegalOrientationComponent,
    LearningPathComponent,
  ],
  template: `
    <section class="hero">
      <!-- Dekorative Hintergrund-Ebene: ausschließlich im Hero, pointer-events: none. -->
      <div class="hero-bg" aria-hidden="true">
        <span class="hero-glow"></span>
        <span class="hero-particle hero-particle--1"></span>
        <span class="hero-particle hero-particle--2"></span>
        <span class="hero-particle hero-particle--3"></span>
        <span class="hero-particle hero-particle--4"></span>
        <span class="hero-particle hero-particle--5"></span>
        <span class="hero-particle hero-particle--6"></span>
        <span class="hero-particle hero-particle--7"></span>
      </div>
      <div class="ft-container hero-inner">
        <div class="hero-text hero-surface">
          <p class="eyebrow">Sachkundeprüfung § 34a GewO</p>
          <h1>Rechtssicher handeln.<br />Situationen richtig einordnen.</h1>
          <p class="hero-sub">
            Vom Verhalten zur rechtlichen Einordnung zur konkreten Rechtsgrundlage.
          </p>
          <p class="lead">
            Der Falltrainer führt Sie nicht einfach zur richtigen Paragraphennummer. Er trainiert
            den Weg dorthin – in drei aufeinander aufbauenden Stufen.
          </p>
          <div class="hero-actions">
            <a mat-flat-button class="cta" routerLink="/scenarios">
              <mat-icon aria-hidden="true">play_arrow</mat-icon>
              Fallbeispiele starten
            </a>
            <a mat-stroked-button class="cta-secondary" routerLink="/pruefungssimulation">
              <mat-icon aria-hidden="true">quiz</mat-icon>
              Prüfungssimulation
            </a>
          </div>
          <ul class="hero-badges" aria-label="Umfang der Prüfung">
            <li><strong>9</strong> Themengebiete</li>
            <li><strong>3</strong> Stufen je Fall</li>
            <li><strong>27</strong> Fragen in der Simulation</li>
          </ul>
        </div>
        <div class="hero-art" aria-hidden="true">
          <mat-icon>balance</mat-icon>
        </div>
      </div>
    </section>

    <div class="ft-container content">
      <app-learning-path />

      <section class="learning-block" aria-labelledby="umgang-title">
        <header class="block-head">
          <span class="ft-eyebrow">Stufe 1</span>
          <h2 id="umgang-title">Umgang mit Menschen</h2>
          <p class="block-question">„Wie verhalten Sie sich?“</p>
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
        position: relative;
        overflow: hidden;
        isolation: isolate;
        background: linear-gradient(
          135deg,
          var(--ft-hero-from) 0%,
          var(--ft-hero-mid) 55%,
          var(--ft-hero-to) 100%
        );
        color: #fff;
        padding-block: clamp(3rem, 8vw, 5.5rem) clamp(3rem, 8vw, 5rem);
      }
      /* ---------- Hero-Hintergrund (einzige animierte Fläche) ----------
         Alle Ebenen liegen hinter dem Inhalt (z-index 0 < .hero-inner 1)
         und sind pointer-events: none. Rein CSS-basiert (transform/opacity). */
      .hero-bg {
        position: absolute;
        inset: 0;
        z-index: 0;
        overflow: hidden;
        pointer-events: none;
      }
      /* Statischer Marken-Glow im Hintergrund (keine Bewegung). */
      .hero-glow {
        position: absolute;
        inset: 0;
        background: radial-gradient(
          60% 80% at 78% 18%,
          rgba(45, 212, 191, 0.16),
          transparent 62%
        );
      }
      /* Schwebende Leuchtpunkte: sanftes Auf- und Abschweben (rein CSS). */
      .hero-particle {
        position: absolute;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: rgba(170, 240, 232, 0.9);
        box-shadow: 0 0 8px rgba(45, 212, 191, 0.8);
        opacity: 0.3;
        will-change: transform, opacity;
        animation: hero-particle-float 13s ease-in-out infinite;
      }
      .hero-particle--1 {
        left: 8%;
        top: 62%;
        animation-duration: 12s;
      }
      .hero-particle--2 {
        left: 22%;
        top: 30%;
        animation-duration: 15s;
        animation-delay: -3s;
      }
      .hero-particle--3 {
        left: 38%;
        top: 74%;
        animation-duration: 11s;
        animation-delay: -6s;
      }
      .hero-particle--4 {
        left: 52%;
        top: 42%;
        animation-duration: 17s;
        animation-delay: -2s;
      }
      .hero-particle--5 {
        left: 66%;
        top: 70%;
        animation-duration: 13s;
        animation-delay: -8s;
      }
      .hero-particle--6 {
        left: 80%;
        top: 28%;
        animation-duration: 16s;
        animation-delay: -5s;
      }
      .hero-particle--7 {
        left: 92%;
        top: 58%;
        animation-duration: 14s;
        animation-delay: -10s;
      }
      @keyframes hero-particle-float {
        0%,
        100% {
          transform: translate3d(0, 0, 0);
          opacity: 0.24;
        }
        50% {
          transform: translate3d(6px, -46px, 0);
          opacity: 0.95;
        }
      }
      /* Reduced Motion: Bewegung vollständig aus, statische ruhige Fläche. */
      @media (prefers-reduced-motion: reduce) {
        .hero-particle {
          animation: none !important;
          opacity: 0.4;
        }
      }
      .hero-inner {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;
      }
      .hero-text {
        max-width: 760px;
      }
      /* Subtile Material-/Glass-Surface, die den Text vom animierten
         Hintergrund absetzt – dezent, nur um den Textblock, nicht über den
         gesamten Hero. */
      .hero-surface {
        position: relative;
        padding: clamp(1.4rem, 3vw, 2.1rem);
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: var(--ft-radius-xl);
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.08) 0%,
          rgba(255, 255, 255, 0.03) 100%
        );
        backdrop-filter: blur(6px) saturate(120%);
        -webkit-backdrop-filter: blur(6px) saturate(120%);
        box-shadow: 0 24px 60px -34px rgba(0, 0, 0, 0.7);
      }
      .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.78rem;
        font-weight: 700;
        color: var(--ft-accent-strong);
        margin: 0 0 0.85rem;
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 3.35rem);
        line-height: 1.08;
        margin: 0 0 0.9rem;
        font-weight: 700;
        letter-spacing: -0.025em;
      }
      .hero-sub {
        font-size: clamp(1.05rem, 2.2vw, 1.3rem);
        font-weight: 500;
        opacity: 0.96;
        margin: 0 0 0.85rem;
      }
      .lead {
        font-size: 1rem;
        line-height: 1.6;
        max-width: 620px;
        opacity: 0.9;
        margin: 0;
      }
      .hero-actions {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        flex-wrap: wrap;
        margin-top: 1.75rem;
      }
      .cta {
        background: #fff;
        color: #0b1a3a;
        padding-inline: 1.35rem;
      }
      .cta-secondary {
        color: #fff;
        border-color: rgba(255, 255, 255, 0.45);
      }
      .cta-secondary:hover {
        border-color: #fff;
        background: rgba(255, 255, 255, 0.08);
      }
      .hero-badges {
        list-style: none;
        margin: 2rem 0 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem 1.75rem;
      }
      .hero-badges li {
        font-size: 0.88rem;
        color: rgba(255, 255, 255, 0.86);
      }
      .hero-badges strong {
        color: #fff;
        font-size: 1.05rem;
        margin-right: 0.15rem;
      }
      .hero-art {
        flex: 0 0 auto;
        display: none;
      }
      .hero-art mat-icon {
        font-size: 150px;
        width: 150px;
        height: 150px;
        opacity: 0.12;
      }
      @media (min-width: 960px) {
        .hero-art {
          display: block;
        }
      }
      .content {
        padding-block: 2.75rem 3rem;
        display: grid;
        gap: 2.75rem;
      }
      .learning-block {
        display: grid;
        gap: 1.1rem;
      }
      .block-head h2 {
        margin: 0.3rem 0 0.25rem;
        font-size: clamp(1.4rem, 2.6vw, 1.85rem);
      }
      .block-question {
        margin: 0;
        color: var(--ft-muted);
        font-size: 1.05rem;
        line-height: 1.5;
      }
      .source-note {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        color: var(--ft-muted);
        font-size: 0.82rem;
        line-height: 1.55;
        margin: 0;
        padding-top: 0.5rem;
        border-top: 1px solid var(--ft-border);
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
        padding-block: 1.75rem;
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
