import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScenarioService } from '../../core/services/scenario.service';

/**
 * Übersicht aller Fälle als moderne, nummerierte Cards.
 *
 * Auf der Übersicht werden bewusst nur Nummer, Titel und Kurzeinordnung
 * gezeigt – die vollständigen Fälle erst auf der Detailseite.
 */
@Component({
  selector: 'app-scenario-list',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  template: `
    <div class="ft-container ft-page">
      <header class="ft-page-head">
        <span class="ft-eyebrow">Fallbeispiele</span>
        <h1>Fälle</h1>
        <p>
          Wählen Sie einen Fall. Sie durchlaufen ihn in drei Stufen und erhalten am Ende eine
          Musterlösung mit Begründung und Grenzen.
        </p>
      </header>

      <section class="ft-section ft-section--plain list-section" aria-label="Fallübersicht">
        <div class="grid">
          @for (scenario of scenarios; track scenario.id; let i = $index) {
            <a class="case-card" [routerLink]="['/scenarios', scenario.id]">
              <span class="case-number">Fall {{ pad(i + 1) }}</span>
              <h2 class="case-title">{{ scenario.title }}</h2>
              <p class="case-desc">{{ scenario.description }}</p>
              <span class="case-tags">
                <span class="ft-chip">3 Stufen</span>
                <span class="ft-chip">Musterlösung</span>
              </span>
              <span class="case-cta">
                Öffnen
                <mat-icon aria-hidden="true">arrow_forward</mat-icon>
              </span>
            </a>
          }
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .list-section {
        padding: 0;
      }
      .grid {
        display: grid;
        gap: 1.1rem;
        grid-template-columns: 1fr;
      }
      @media (min-width: 700px) {
        .grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      @media (min-width: 1040px) {
        .grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
      .case-card {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        padding: 1.5rem;
        border: 1px solid var(--ft-border);
        border-radius: var(--ft-radius-lg);
        background: linear-gradient(180deg, var(--ft-surface) 0%, var(--ft-surface-2) 100%);
        box-shadow: var(--ft-elevation-1);
        text-decoration: none;
        color: var(--ft-text);
        overflow: hidden;
        transition:
          transform var(--ft-motion),
          border-color var(--ft-motion),
          box-shadow var(--ft-motion);
      }
      /* Subtiler Glass-Schimmer oben – Material bleibt die Basis. */
      .case-card::after {
        content: '';
        position: absolute;
        inset: 0 0 auto 0;
        height: 42%;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent);
        pointer-events: none;
      }
      .case-card::before {
        content: '';
        position: absolute;
        inset: 0 auto 0 0;
        width: 4px;
        background: linear-gradient(180deg, var(--ft-accent), var(--ft-secondary));
        opacity: 0;
        transition: opacity var(--ft-motion);
      }
      .case-card:hover {
        transform: translateY(-4px);
        border-color: var(--ft-accent);
        box-shadow: var(--ft-elevation-3);
      }
      .case-card:hover::before {
        opacity: 1;
      }
      .case-card:focus-visible {
        outline: 3px solid var(--ft-accent);
        outline-offset: 2px;
      }
      .case-number {
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--ft-accent);
      }
      .case-title {
        margin: 0;
        font-size: 1.22rem;
        line-height: 1.25;
      }
      .case-desc {
        margin: 0;
        color: var(--ft-muted);
        line-height: 1.55;
        flex: 1 1 auto;
      }
      .case-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
      }
      .case-cta {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        margin-top: 0.35rem;
        font-weight: 600;
        color: var(--ft-accent-strong);
      }
      .case-cta mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        transition: transform var(--ft-motion);
      }
      .case-card:hover .case-cta mat-icon {
        transform: translateX(3px);
      }
      @media (prefers-reduced-motion: reduce) {
        .case-card:hover {
          transform: none;
        }
        .case-card:hover .case-cta mat-icon {
          transform: none;
        }
      }
    `,
  ],
})
export class ScenarioListComponent {
  private readonly scenarioService = inject(ScenarioService);
  readonly scenarios = this.scenarioService.getScenarios();

  pad(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
