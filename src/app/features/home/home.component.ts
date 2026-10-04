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
        <span class="hero-grid"></span>
        <span class="hero-orb hero-orb--a"></span>
        <span class="hero-orb hero-orb--b"></span>
        <span class="hero-sheen"></span>
      </div>
      <div class="ft-container hero-inner">
        <div class="hero-text">
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
      /* Feines, langsam driftendes technisches Raster. */
      .hero-grid {
        position: absolute;
        inset: -60px;
        background-image:
          linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        background-size: 54px 54px;
        mask-image: radial-gradient(circle at 72% 28%, #000 0%, transparent 74%);
        -webkit-mask-image: radial-gradient(circle at 72% 28%, #000 0%, transparent 74%);
        animation: hero-grid-drift 42s linear infinite;
        will-change: transform;
      }
      /* Zwei langsam wandernde Glow-Flächen in der Marken-Farbwelt. */
      .hero-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(46px);
        opacity: 0.5;
        will-change: transform, opacity;
      }
      .hero-orb--a {
        width: 420px;
        height: 420px;
        top: -140px;
        right: -80px;
        background: radial-gradient(circle, rgba(45, 212, 191, 0.5), transparent 68%);
        animation: hero-orb-a 26s ease-in-out infinite;
      }
      .hero-orb--b {
        width: 360px;
        height: 360px;
        bottom: -160px;
        left: -60px;
        background: radial-gradient(circle, rgba(110, 168, 254, 0.42), transparent 70%);
        animation: hero-orb-b 32s ease-in-out infinite;
      }
      /* Sehr langsame, breite Lichtbewegung über die Fläche. */
      .hero-sheen {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          100deg,
          transparent 30%,
          rgba(255, 255, 255, 0.06) 48%,
          transparent 66%
        );
        background-size: 220% 100%;
        animation: hero-sheen 30s ease-in-out infinite;
        will-change: background-position;
      }
      @keyframes hero-grid-drift {
        from {
          transform: translate3d(0, 0, 0);
        }
        to {
          transform: translate3d(-54px, -54px, 0);
        }
      }
      @keyframes hero-orb-a {
        0%,
        100% {
          transform: translate3d(0, 0, 0) scale(1);
          opacity: 0.46;
        }
        50% {
          transform: translate3d(-34px, 26px, 0) scale(1.08);
          opacity: 0.58;
        }
      }
      @keyframes hero-orb-b {
        0%,
        100% {
          transform: translate3d(0, 0, 0) scale(1);
          opacity: 0.42;
        }
        50% {
          transform: translate3d(30px, -22px, 0) scale(1.06);
          opacity: 0.52;
        }
      }
      @keyframes hero-sheen {
        0%,
        100% {
          background-position: 130% 0;
        }
        50% {
          background-position: -30% 0;
        }
      }
      /* Reduced Motion: Bewegung vollständig aus, statische, ruhige Fläche. */
      @media (prefers-reduced-motion: reduce) {
        .hero-grid,
        .hero-orb,
        .hero-sheen {
          animation: none !important;
        }
        .hero-orb--a {
          opacity: 0.5;
        }
        .hero-orb--b {
          opacity: 0.44;
        }
        .hero-sheen {
          background-position: 50% 0;
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
