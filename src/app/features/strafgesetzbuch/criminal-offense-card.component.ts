import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CriminalOffense } from '../../core/models';
import { OFFENSE_CATEGORY_LABELS } from '../../core/data/criminal-offenses.data';

/**
 * Kompakte Übersichtskarte eines Straftatbestands.
 *
 * Die Karte zeigt nur die Kernmerkmale (Paragraph, Titel, Deliktsgruppe,
 * Status-Chips, Mindeststrafe) und öffnet per Klick die vollständige
 * Detailansicht als Dialog. Der lange Tatbestandstext bleibt bewusst im Modal –
 * die Liste dient dem schnellen Finden, das Modal dem Lernen.
 */
@Component({
  selector: 'app-criminal-offense-card',
  imports: [MatIconModule],
  template: `
    <button
      type="button"
      class="offense-card"
      [attr.aria-label]="'Details zu ' + offense.paragraph + ' ' + offense.officialTitle + ' öffnen'"
      (click)="open.emit(offense)"
    >
      <span class="card-top">
        <span class="card-paragraph">{{ offense.paragraph }} {{ offense.law }}</span>
        @if (isExamRelevant) {
          <span class="card-star" aria-hidden="true">
            <mat-icon>star</mat-icon>
          </span>
        }
      </span>

      <span class="card-title">{{ offense.officialTitle }}</span>
      <span class="card-category">{{ categoryLabel }}</span>

      <span class="card-chips" aria-label="Kernmerkmale">
        <span class="ft-chip" [class.ft-chip--primary]="isVerbrechen">
          {{ isVerbrechen ? 'Verbrechen' : 'Vergehen' }}
        </span>
        <span class="ft-chip" [class.ft-chip--accent]="isAntragsdelikt">
          {{ isAntragsdelikt ? 'Antragsdelikt' : 'Offizialdelikt' }}
        </span>
        <span class="ft-chip">Versuch: {{ offense.attemptPunishable ? 'Ja' : 'Nein' }}</span>
      </span>

      <span class="card-penalty">
        <span class="card-penalty-label">Mindeststrafe</span>
        <span class="card-penalty-value">{{ offense.minimumPenalty }}</span>
      </span>

      <span class="card-cta">
        Details öffnen
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
      .offense-card {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
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
      .offense-card:hover {
        transform: translateY(-3px);
        box-shadow: var(--ft-elevation-3);
        border-color: var(--ft-border-strong);
      }
      .offense-card:focus-visible {
        outline: 3px solid var(--ft-accent);
        outline-offset: 2px;
      }

      .card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
      }
      .card-paragraph {
        font-weight: 700;
        font-size: 0.95rem;
        letter-spacing: 0.02em;
        color: var(--ft-accent-strong);
      }
      .card-star {
        display: inline-flex;
        color: var(--ft-warn);
      }
      .card-star mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      .card-title {
        font-size: 1.12rem;
        font-weight: 700;
        line-height: 1.3;
        overflow-wrap: anywhere;
      }
      .card-category {
        font-size: 0.8rem;
        color: var(--ft-muted);
      }

      .card-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
        margin-top: 0.15rem;
      }
      .card-chips .ft-chip {
        text-transform: none;
        letter-spacing: 0.02em;
      }

      .card-penalty {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
        margin-top: 0.35rem;
        padding-top: 0.7rem;
        border-top: 1px solid var(--ft-border);
      }
      .card-penalty-label {
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.07em;
        color: var(--ft-muted);
      }
      .card-penalty-value {
        font-size: 0.92rem;
        font-weight: 600;
        line-height: 1.4;
        overflow-wrap: anywhere;
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
      .offense-card:hover .card-cta mat-icon {
        transform: translateX(3px);
      }
    `,
  ],
})
export class CriminalOffenseCardComponent {
  @Input({ required: true }) offense!: CriminalOffense;
  @Output() open = new EventEmitter<CriminalOffense>();

  get categoryLabel(): string {
    return OFFENSE_CATEGORY_LABELS[this.offense.category];
  }

  get isVerbrechen(): boolean {
    return this.offense.classification === 'VERBRECHEN';
  }

  get isAntragsdelikt(): boolean {
    return this.offense.prosecution.type === 'ANTRAGSDELIKT';
  }

  get isExamRelevant(): boolean {
    return Boolean(this.offense.securityNote);
  }
}
