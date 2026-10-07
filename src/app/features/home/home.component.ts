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
    <div class="ft-container ft-container--wide hero-wrap">
      <section class="hero ft-glass-panel">
        <!-- Dekorative Hintergrund-Ebene: Hero-Bild + Sternengruppe, ausschließlich im Hero. -->
        <div class="hero-bg" aria-hidden="true">
          <picture class="hero-media">
            <source srcset="hero/hero-upload.webp" type="image/webp" />
            <img
              src="hero/hero-upload.jpg"
              alt=""
              aria-hidden="true"
              decoding="async"
              fetchpriority="high"
            />
          </picture>
          <span class="hero-overlay"></span>
          <!-- Bestehender 5-Punkte-Effekt: als fünf dezente Sterne in den Himmel eingebettet. -->
          <span class="hero-stars">
            <span class="hero-star hero-star--1"></span>
            <span class="hero-star hero-star--2"></span>
            <span class="hero-star hero-star--3"></span>
            <span class="hero-star hero-star--4"></span>
            <span class="hero-star hero-star--5"></span>
          </span>
        </div>
        <div class="hero-inner">
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
        </div>
      </section>
    </div>

    <div class="ft-container content">
      <section class="ft-glass-panel panel learning-block" aria-labelledby="lernpfad-title">
        <app-learning-path />
      </section>

      <section class="ft-glass-panel panel learning-block" aria-labelledby="umgang-title">
        <header class="block-head">
          <span class="ft-eyebrow">Stufe 1</span>
          <h2 id="umgang-title">Umgang mit Menschen</h2>
          <p class="block-question">„Wie verhalten Sie sich?“</p>
        </header>
        <app-behavior-reference />
      </section>

      <section
        class="ft-glass-panel panel learning-block"
        aria-label="Rechtliche Einordnung und Rechtsgrundlage"
      >
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
      /* Nur Desktop: Der Hero nutzt den verfügbaren Content-Bereich deutlich
         breiter (ca. 92–94 % der Viewport-Breite) mit sinnvoller Obergrenze.
         Links und rechts bleibt ein moderater Rand, da die Container-Padding
         innerhalb der Breite liegen. Tablet (≤960px) und Mobile behalten die
         bestehende responsive Logik unverändert. */
      @media (min-width: 961px) {
        .hero-wrap {
          width: min(94vw, var(--ft-container-hero));
          max-width: var(--ft-container-hero);
        }
      }
      /* Abstand zwischen Header und schwebendem Hero-Container. */
      .hero-wrap {
        padding-top: clamp(1.1rem, 2.6vw, 1.9rem);
      }
      /* Hero als große, abgerundete Glass-Card: Bild und Inhalt liegen
         innerhalb des Containers und folgen dessen Rundung (overflow). */
      .hero {
        position: relative;
        overflow: hidden;
        isolation: isolate;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: clamp(520px, 70vh, 720px);
        background: linear-gradient(
          135deg,
          var(--ft-hero-from) 0%,
          var(--ft-hero-mid) 55%,
          var(--ft-hero-to) 100%
        );
        color: #fff;
        padding-block: clamp(2.6rem, 7vw, 4.75rem) clamp(2.6rem, 7vw, 4.5rem);
      }
      /* ---------- Hero-Hintergrundbild ----------
         Das Bild ist die visuelle Hauptebene (z-index 0), liegt hinter dem
         Inhalt (.hero-inner z-index 1) und ist rein dekorativ. */
      .hero-bg {
        position: absolute;
        inset: 0;
        z-index: 0;
        overflow: hidden;
        pointer-events: none;
      }
      .hero-media,
      .hero-media img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
      }
      /* Bildschwerpunkt rechts: Gebäude + Security bleiben sichtbar.
         Mobil wird der Ausschnitt nach rechts verschoben, damit das Motiv
         nicht verloren geht. */
      .hero-media img {
        object-fit: cover;
        object-position: 72% center;
      }
      /* Subtil dunkler Verlauf links → rechts: hält den Textbereich ruhig,
         lässt den Sternenhimmel oben links und das Gebäude rechts sichtbar. */
      .hero-overlay {
        position: absolute;
        inset: 0;
        background:
          linear-gradient(
            90deg,
            rgba(7, 13, 28, 0.88) 0%,
            rgba(7, 13, 28, 0.6) 40%,
            rgba(7, 13, 28, 0.2) 58%,
            rgba(7, 13, 28, 0.04) 100%
          ),
          linear-gradient(180deg, rgba(7, 13, 28, 0.3) 0%, rgba(7, 13, 28, 0) 34%);
      }
      /* Bestehender 5-Punkte-Effekt als kleine, dezente Sternengruppe im
         freien Sternenhimmel oben links, oberhalb des Hero-Textbereichs.
         Gleiche Farbwelt, weiterhin leicht animiert. */
      .hero-stars {
        position: absolute;
        left: 3%;
        top: 14px;
        width: 24%;
        height: 72px;
      }
      .hero-star {
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgba(180, 244, 238, 0.95);
        box-shadow: 0 0 6px rgba(45, 212, 191, 0.75);
        opacity: 0.55;
        will-change: transform, opacity;
        animation: hero-star-twinkle 6.5s ease-in-out infinite;
      }
      .hero-star--1 {
        left: 6%;
        top: 12%;
        animation-duration: 6s;
      }
      .hero-star--2 {
        left: 26%;
        top: 44%;
        animation-duration: 7.5s;
        animation-delay: -1.6s;
      }
      .hero-star--3 {
        left: 46%;
        top: 16%;
        animation-duration: 5.6s;
        animation-delay: -3.1s;
      }
      .hero-star--4 {
        left: 66%;
        top: 52%;
        animation-duration: 8.2s;
        animation-delay: -0.8s;
      }
      .hero-star--5 {
        left: 86%;
        top: 22%;
        animation-duration: 6.8s;
        animation-delay: -4.4s;
      }
      @keyframes hero-star-twinkle {
        0%,
        100% {
          transform: translate3d(0, 0, 0) scale(0.9);
          opacity: 0.4;
        }
        50% {
          transform: translate3d(2px, -4px, 0) scale(1.12);
          opacity: 0.95;
        }
      }
      /* Reduced Motion: Sternenbewegung aus, ruhige statische Punkte. */
      @media (prefers-reduced-motion: reduce) {
        .hero-star {
          animation: none !important;
          opacity: 0.6;
        }
      }
      /* Tablet: Text und Bild ausbalancieren. */
      @media (max-width: 960px) {
        .hero {
          min-height: clamp(480px, 66vh, 640px);
        }
        .hero-media img {
          object-position: 78% center;
        }
        .hero-overlay {
          background:
            linear-gradient(
              90deg,
              rgba(7, 13, 28, 0.9) 0%,
              rgba(7, 13, 28, 0.72) 46%,
              rgba(7, 13, 28, 0.34) 78%,
              rgba(7, 13, 28, 0.12) 100%
            ),
            linear-gradient(180deg, rgba(7, 13, 28, 0.4) 0%, rgba(7, 13, 28, 0) 40%);
        }
      }
      /* Mobil: Text vollständig lesbar, Ausschnitt nach rechts (Motiv erhalten). */
      @media (max-width: 600px) {
        .hero {
          min-height: 0;
          border-radius: var(--ft-radius-lg);
        }
        .hero-media img {
          object-position: 82% center;
        }
        .hero-overlay {
          background:
            linear-gradient(
              180deg,
              rgba(7, 13, 28, 0.86) 0%,
              rgba(7, 13, 28, 0.68) 55%,
              rgba(7, 13, 28, 0.5) 100%
            ),
            linear-gradient(90deg, rgba(7, 13, 28, 0.55) 0%, rgba(7, 13, 28, 0) 70%);
        }
        .hero-stars {
          left: 3%;
          top: 6px;
          width: 40%;
          height: 36px;
        }
        .hero-inner {
          padding-inline: 0;
        }
        .hero-surface {
          border-radius: var(--ft-radius-lg);
        }
        .hero-actions {
          gap: 0.6rem;
        }
        .hero-badges {
          gap: 0.5rem 1.25rem;
        }
      }
      .hero-inner {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;
        padding-inline: clamp(1.1rem, 3.4vw, 2.75rem);
      }
      /* Breite der linken Glass-Card: deutlich mehr horizontale Textfläche für
         die Headline. Die 78vw-Grenze hält die rechte Bildhälfte (Gebäude +
         Security) bei kleineren Desktopbreiten frei, damit der Mitarbeiter
         nicht von der Card überdeckt wird. */
      .hero-text {
        max-width: 680px;
      }
      /* Nur Desktop: breitere Textfläche. Tablet (≤960px) und Mobile behalten
         die bestehende responsive Logik unverändert. */
      @media (min-width: 961px) {
        .hero-text {
          max-width: min(840px, 78vw);
        }
      }
      /* Subtile Material-/Glass-Surface, die den Text vom Hero-Bild absetzt –
         dezent, nur um den Textblock, damit das Bild sichtbar bleibt. */
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
      .content {
        padding-block: 1.75rem 3rem;
        display: grid;
        gap: 1.75rem;
      }
      /* Große Inhaltsbereiche als schwebende Glass-Panels (Ebene 2). */
      .panel {
        padding: var(--ft-section-pad);
        display: grid;
        gap: 1.1rem;
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
