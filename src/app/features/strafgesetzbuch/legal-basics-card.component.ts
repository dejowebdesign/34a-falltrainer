import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LegalBasicsCard } from '../../core/models';

/**
 * Kompakte Lernkarte eines strafrechtlichen Grundlagenthemas.
 *
 * Die Karte zeigt nur Rubrik, Titel und Kurzfassung und öffnet per Klick das
 * große Lern-Modal (`LegalBasicsDetailComponent`). Der ausführliche Inhalt
 * bleibt bewusst im Modal – die Übersicht dient dem Einstieg, das Modal dem
 * Lernen.
 */
@Component({
  selector: 'app-legal-basics-card',
  imports: [MatIconModule],
  template: `
    <button
      type="button"
      class="basics-card"
      [attr.aria-label]="'Grundlagen öffnen: ' + basics.officialTitle"
      (click)="open.emit(basics)"
    >
      <span class="card-eyebrow">
        {{ basics.eyebrow }}
        @if (basics.paragraph) {
          <span class="card-paragraph">{{ basics.paragraph }} StGB</span>
        }
      </span>

      <span class="card-title">{{ basics.officialTitle }}</span>
      <span class="card-summary">{{ basics.summary }}</span>

      <span class="card-merksatz">
        <mat-icon aria-hidden="true">lightbulb</mat-icon>
        <span>{{ basics.merksatz }}</span>
      </span>

      <span class="card-cta">
        Grundlagen öffnen
        <mat-icon aria-hidden="true">arrow_forward</mat-icon>
      </span>
    </button>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
        min-width: 0;
      }
      .basics-card {
        display: flex;
        flex-direction: column;
        gap: 0.55rem;
        width: 100%;
        height: 100%;
        min-width: 0;
        text-align: left;
        font: inherit;
        color: inherit;
        cursor: pointer;
        padding: 1.1rem 1.15rem 1.2rem;
        background: var(--ft-surface);
        border: 1px solid var(--ft-border);
        border-radius: var(--ft-radius-lg);
        box-shadow: var(--ft-elevation-1);
        transition:
          transform var(--ft-motion),
          box-shadow var(--ft-motion),
          border-color var(--ft-motion);
      }
      .basics-card:hover {
        transform: translateY(-3px);
        box-shadow: var(--ft-elevation-3);
        border-color: var(--ft-border-strong);
      }
      .basics-card:focus-visible {
        outline: 3px solid var(--ft-accent);
        outline-offset: 2px;
      }

      .card-eyebrow {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--ft-muted);
      }
      .card-paragraph {
        font-weight: 700;
        letter-spacing: 0.02em;
        color: var(--ft-accent-strong);
        text-transform: none;
      }

      .card-title {
        font-size: 1.12rem;
        font-weight: 700;
        line-height: 1.3;
        overflow-wrap: anywhere;
      }
      .card-summary {
        font-size: 0.92rem;
        line-height: 1.55;
        color: var(--ft-text);
      }

      .card-merksatz {
        display: flex;
        gap: 0.45rem;
        align-items: flex-start;
        margin-top: 0.15rem;
        padding: 0.6rem 0.7rem;
        border-radius: var(--ft-radius);
        background: var(--ft-accent-soft);
        color: var(--ft-accent-strong);
        font-size: 0.86rem;
        font-weight: 600;
        line-height: 1.45;
      }
      .card-merksatz mat-icon {
        flex: none;
        font-size: 18px;
        width: 18px;
        height: 18px;
        margin-top: 0.1rem;
      }

      .card-cta {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        margin-top: auto;
        padding-top: 0.5rem;
        font-weight: 600;
        font-size: 0.88rem;
        color: var(--ft-primary);
      }
      .card-cta mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        transition: transform var(--ft-motion);
      }
      .basics-card:hover .card-cta mat-icon {
        transform: translateX(3px);
      }
    `,
  ],
})
export class LegalBasicsCardComponent {
  @Input({ required: true }) basics!: LegalBasicsCard;
  @Output() open = new EventEmitter<LegalBasicsCard>();
}
