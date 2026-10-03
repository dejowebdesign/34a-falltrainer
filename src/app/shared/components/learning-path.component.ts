import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface LearningStep {
  number: string;
  question: string;
  detail: string;
  icon: string;
}

/**
 * Das didaktische Drei-Stufen-Modell als zentrales Lernmodell der Startseite.
 *
 * Rein visuelle Lernhilfe – die juristische Logik liegt in der Fallengine.
 */
@Component({
  selector: 'app-learning-path',
  imports: [MatIconModule],
  template: `
    <section class="path" aria-labelledby="learning-path-title">
      <header class="path-head">
        <span class="ft-eyebrow">Lernmodell</span>
        <h2 id="learning-path-title">In drei Stufen zur rechtlichen Einordnung</h2>
        <p>
          Der Falltrainer führt Sie nicht direkt zur Paragraphennummer, sondern trainiert den Weg
          dorthin – Schritt für Schritt.
        </p>
      </header>

      <ol class="steps">
        @for (step of steps; track step.number; let last = $last) {
          <li class="step">
            <span class="step-number" aria-hidden="true">{{ step.number }}</span>
            <span class="step-icon" aria-hidden="true">
              <mat-icon>{{ step.icon }}</mat-icon>
            </span>
            <h3>{{ step.question }}</h3>
            <p>{{ step.detail }}</p>
          </li>
          @if (!last) {
            <li class="flow" aria-hidden="true">
              <mat-icon>south</mat-icon>
            </li>
          }
        }
      </ol>
    </section>
  `,
  styles: [
    `
      .path {
        display: grid;
        gap: 1.25rem;
      }
      .path-head h2 {
        margin: 0.35rem 0 0.5rem;
        font-size: clamp(1.35rem, 2.6vw, 1.8rem);
      }
      .path-head p {
        margin: 0;
        color: var(--ft-muted);
        max-width: 680px;
        line-height: 1.6;
      }
      .steps {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.75rem;
      }
      .step {
        position: relative;
        overflow: hidden;
        background: linear-gradient(180deg, var(--ft-surface) 0%, var(--ft-surface-2) 100%);
        border: 1px solid var(--ft-border);
        border-radius: var(--ft-radius-lg);
        padding: 1.4rem 1.4rem 1.5rem;
        box-shadow: var(--ft-elevation-1);
        transition:
          transform var(--ft-motion),
          border-color var(--ft-motion),
          box-shadow var(--ft-motion);
      }
      /* Dezente Glass-Kante oben – Material bleibt die Basis. */
      .step::before {
        content: '';
        position: absolute;
        inset: 0 0 auto 0;
        height: 3px;
        background: linear-gradient(90deg, var(--ft-accent), var(--ft-secondary));
        opacity: 0.85;
      }
      .step::after {
        content: '';
        position: absolute;
        inset: 0 0 auto 0;
        height: 40%;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), transparent);
        pointer-events: none;
      }
      .step:hover {
        transform: translateY(-3px);
        border-color: var(--ft-accent);
        box-shadow: var(--ft-elevation-2);
      }
      .step-number {
        display: block;
        position: relative;
        z-index: 1;
        font-size: 2.4rem;
        font-weight: 700;
        line-height: 1;
        letter-spacing: -0.03em;
        color: var(--ft-accent);
        opacity: 0.9;
        margin-bottom: 0.75rem;
        font-variant-numeric: tabular-nums;
      }
      .step-icon {
        position: absolute;
        top: 1.35rem;
        right: 1.35rem;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: var(--ft-primary-soft);
        color: var(--ft-primary);
      }
      .step h3 {
        position: relative;
        z-index: 1;
        margin: 0 0 0.5rem;
        font-size: 1.12rem;
      }
      .step p {
        position: relative;
        z-index: 1;
        margin: 0;
        color: var(--ft-muted);
        line-height: 1.55;
        font-size: 0.95rem;
      }
      /* Mobile: vertikaler Flow zwischen den Karten. */
      .flow {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--ft-accent);
      }
      .flow mat-icon {
        font-size: 26px;
        width: 26px;
        height: 26px;
      }
      @media (min-width: 900px) {
        .steps {
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: stretch;
          gap: 0;
        }
        .step {
          height: 100%;
        }
        .flow {
          padding-inline: 0.5rem;
        }
        .flow mat-icon {
          transform: rotate(-90deg);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .step:hover {
          transform: none;
        }
      }
    `,
  ],
})
export class LearningPathComponent {
  readonly steps: LearningStep[] = [
    {
      number: '01',
      question: 'Wie verhalten Sie sich?',
      detail:
        'Deeskalierend, besonnen und professionell handeln: Kommunikation, Eigensicherung und der richtige Umgang mit Menschen.',
      icon: 'psychology_alt',
    },
    {
      number: '02',
      question: 'Was liegt rechtlich vor?',
      detail:
        'Den Sachverhalt sauber einordnen: Straftat, verbotene Eigenmacht, Anspruch oder Gefahr – und ob die Voraussetzungen wirklich erfüllt sind.',
      icon: 'balance',
    },
    {
      number: '03',
      question: 'Mit welcher Rechtsgrundlage dürfen Sie eingreifen?',
      detail:
        'Die konkrete Befugnis bestimmen – etwa vorläufige Festnahme, Besitzerselbsthilfe, Notwehr oder Notstand – samt Voraussetzungen und Grenzen.',
      icon: 'gavel',
    },
  ];
}
