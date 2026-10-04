import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { CriminalOffense } from '../../core/models';
import { OFFENSE_CATEGORY_LABELS } from '../../core/data/criminal-offenses.data';

/**
 * Einheitlicher Steckbrief einer Straftat als aufklappbares Panel.
 *
 * Die kompakte Kopfzeile zeigt Paragraph, offiziellen Titel und die drei
 * Kernmerkmale (Verbrechen/Vergehen, Verfolgung, Versuch). Erst beim Öffnen
 * werden Tatbestandsmerkmale und weitere Details eingeblendet.
 */
@Component({
  selector: 'app-criminal-offense-card',
  imports: [MatButtonModule, MatChipsModule, MatExpansionModule, MatIconModule],
  template: `
    <mat-expansion-panel class="offense-panel" [togglePosition]="'after'">
      <mat-expansion-panel-header [collapsedHeight]="'auto'" [expandedHeight]="'auto'">
        <div class="panel-head">
          <div class="panel-title">
            <span class="panel-paragraph">{{ offense.paragraph }} {{ offense.law }}</span>
            <h3 class="panel-name">{{ offense.officialTitle }}</h3>
            <span class="panel-category">{{ categoryLabel }}</span>
          </div>
          <div class="panel-chips" aria-label="Kernmerkmale">
            <span class="ft-chip" [class.ft-chip--primary]="isVerbrechen">
              {{ offense.classification === 'VERBRECHEN' ? 'Verbrechen' : 'Vergehen' }}
            </span>
            <span class="ft-chip" [class.ft-chip--accent]="isAntragsdelikt">
              {{ isAntragsdelikt ? 'Antragsdelikt' : 'Offizialdelikt' }}
            </span>
            <span class="ft-chip">Versuch: {{ offense.attemptPunishable ? 'Ja' : 'Nein' }}</span>
          </div>
        </div>
      </mat-expansion-panel-header>

      <div class="panel-body ft-reveal">
        <p class="lead">{{ offense.explanation }}</p>

        <div class="detail-grid">
          <section class="detail" aria-label="Geschütztes Rechtsgut">
            <h4>Geschütztes Rechtsgut</h4>
            <p>{{ offense.protectedInterest }}</p>
          </section>

          <section class="detail" aria-label="Objektiver Tatbestand">
            <h4>Objektiver Tatbestand</h4>
            <ul>
              @for (element of offense.objectiveElements; track element) {
                <li>{{ element }}</li>
              }
            </ul>
          </section>

          <section class="detail" aria-label="Subjektiver Tatbestand">
            <h4>Subjektiver Tatbestand</h4>
            <ul>
              @for (element of offense.subjectiveElements; track element) {
                <li>{{ element }}</li>
              }
            </ul>
            @if (offense.specialSubjectiveElements?.length) {
              <p class="detail-note">
                Besondere subjektive Merkmale:
                {{ offense.specialSubjectiveElements?.join(', ') }}
              </p>
            }
          </section>

          <section class="detail" aria-label="Vorsatz und Fahrlässigkeit">
            <h4>Vorsatz / Fahrlässigkeit</h4>
            <p>Vorsatz: <strong>{{ offense.intentRequired ? 'Ja' : 'Nein' }}</strong></p>
            <p>
              Fahrlässige Variante:
              <strong>{{ offense.negligence.negligentVariant ? 'Ja' : 'Nein' }}</strong>
              @if (offense.negligence.negligentNorm) {
                <span> ({{ offense.negligence.negligentNorm }})</span>
              }
            </p>
            <p class="detail-note">{{ offense.negligence.explanation }}</p>
          </section>

          <section class="detail" aria-label="Strafrahmen">
            <h4>Strafrahmen</h4>
            <p class="detail-strong">Mindeststrafe: {{ offense.minimumPenalty }}</p>
            <p class="detail-note">Höchstmaß: {{ offense.maximumPenalty }}</p>
          </section>

          <section class="detail" aria-label="Einordnung">
            <h4>Einordnung (§ 12 StGB)</h4>
            <p class="detail-strong">
              {{ offense.classification === 'VERBRECHEN' ? 'Verbrechen' : 'Vergehen' }}
            </p>
          </section>

          <section class="detail" aria-label="Verfolgung">
            <h4>Verfolgung</h4>
            <p class="detail-strong">
              {{ isAntragsdelikt ? 'Antragsdelikt' : 'Offizialdelikt' }}
              @if (offense.prosecution.applicationType) {
                <span class="detail-note">
                  ({{ offense.prosecution.applicationType === 'ABSOLUTES_ANTRAGSDELIKT'
                      ? 'absolut'
                      : 'relativ' }})
                </span>
              }
            </p>
            @if (offense.prosecution.applicationNorm) {
              <p class="detail-note">Regelung: {{ offense.prosecution.applicationNorm }}</p>
            }
            <p class="detail-note">{{ offense.prosecution.explanation }}</p>
          </section>

          <section class="detail" aria-label="Versuch">
            <h4>Versuch</h4>
            <p class="detail-strong">Strafbar: {{ offense.attemptPunishable ? 'Ja' : 'Nein' }}</p>
            <p class="detail-note">{{ offense.attemptExplanation }}</p>
          </section>
        </div>

        @if (offense.securityNote) {
          <aside class="security-note" aria-label="Besonderheit für Sicherheitsmitarbeiter">
            <mat-icon aria-hidden="true">shield</mat-icon>
            <div>
              <h4>Für die Sachkunde besonders wichtig</h4>
              <p>{{ offense.securityNote }}</p>
            </div>
          </aside>
        }

        <section class="detail relevance" aria-label="Prüfungsrelevanz">
          <h4>Prüfungsrelevanz</h4>
          <p>{{ offense.relevance }}</p>
        </section>

        @if (related.length) {
          <section class="detail" aria-label="Ähnliche Delikte">
            <h4>Ähnliche Delikte</h4>
            <mat-chip-set>
              @for (item of related; track item.id) {
                <mat-chip (click)="selectRelated.emit(item.paragraph)">
                  {{ item.paragraph }} {{ item.officialTitle }}
                </mat-chip>
              }
            </mat-chip-set>
          </section>
        }

        <details class="official-text">
          <summary>Amtlicher Gesetzeswortlaut</summary>
          <p>{{ offense.officialText }}</p>
          <p class="detail-note">
            Quelle:
            <a [href]="offense.sourceUrl" target="_blank" rel="noopener noreferrer">
              {{ offense.sourceUrl }}
            </a>
          </p>
          <p class="detail-note">
            Herkunft: {{ sourceLabel }} · geprüft am {{ offense.source.lastVerified }}
          </p>
        </details>
      </div>
    </mat-expansion-panel>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
      .offense-panel {
        height: 100%;
        border: 1px solid var(--ft-border);
        border-radius: var(--ft-radius-lg);
        background: var(--ft-surface);
        box-shadow: var(--ft-elevation-1);
      }
      .panel-head {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        width: 100%;
        padding-block: 0.35rem;
      }
      .panel-paragraph {
        font-weight: 700;
        font-size: 0.9rem;
        letter-spacing: 0.02em;
        color: var(--ft-accent-strong);
      }
      .panel-name {
        margin: 0.1rem 0 0.15rem;
        font-size: 1.15rem;
        line-height: 1.3;
      }
      .panel-category {
        font-size: 0.8rem;
        color: var(--ft-muted);
      }
      .panel-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
      }
      .panel-body {
        display: grid;
        gap: 1rem;
      }
      .lead {
        margin: 0;
        line-height: 1.6;
      }
      .detail-grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: minmax(0, 1fr);
      }
      @media (min-width: 720px) {
        .detail-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      .detail {
        background: var(--ft-surface-2);
        border: 1px solid var(--ft-border);
        border-radius: var(--ft-radius);
        padding: 0.85rem 1rem;
      }
      .detail h4 {
        margin: 0 0 0.45rem;
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.07em;
        color: var(--ft-muted);
      }
      .detail p {
        margin: 0 0 0.35rem;
        line-height: 1.55;
      }
      .detail ul {
        margin: 0;
        padding-left: 1.1rem;
        display: grid;
        gap: 0.3rem;
        line-height: 1.5;
      }
      .detail-strong {
        font-weight: 600;
      }
      .detail-note {
        font-size: 0.86rem;
        color: var(--ft-muted);
      }
      .detail.relevance {
        grid-column: 1 / -1;
      }
      .security-note {
        display: flex;
        gap: 0.7rem;
        align-items: flex-start;
        background: var(--ft-accent-soft);
        border: 1px solid var(--ft-glass-border);
        border-radius: var(--ft-radius);
        padding: 0.85rem 1rem;
      }
      .security-note mat-icon {
        color: var(--ft-accent-strong);
        flex: 0 0 auto;
      }
      .security-note h4 {
        margin: 0 0 0.3rem;
        font-size: 0.9rem;
      }
      .security-note p {
        margin: 0;
        line-height: 1.55;
      }
      .official-text {
        border: 1px dashed var(--ft-border-strong);
        border-radius: var(--ft-radius);
        padding: 0.6rem 0.9rem;
      }
      .official-text summary {
        cursor: pointer;
        font-weight: 600;
      }
      .official-text p {
        margin: 0.6rem 0 0;
        line-height: 1.6;
      }
      .official-text a {
        color: var(--ft-primary);
        word-break: break-all;
      }
      .detail mat-chip-set {
        display: block;
      }
      .detail .mdc-evolution-chip-set__chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
      }
      .detail mat-chip {
        max-width: 100%;
      }
      .detail mat-chip .mdc-evolution-chip__text-label {
        white-space: normal;
        line-height: 1.3;
      }
    `,
  ],
})
export class CriminalOffenseCardComponent {
  @Input({ required: true }) offense!: CriminalOffense;
  @Input() related: CriminalOffense[] = [];
  @Output() selectRelated = new EventEmitter<string>();

  get categoryLabel(): string {
    return OFFENSE_CATEGORY_LABELS[this.offense.category];
  }

  get isVerbrechen(): boolean {
    return this.offense.classification === 'VERBRECHEN';
  }

  get isAntragsdelikt(): boolean {
    return this.offense.prosecution.type === 'ANTRAGSDELIKT';
  }

  /** Transparente Herkunftsangabe des amtlichen Wortlauts. */
  get sourceLabel(): string {
    switch (this.offense.source.sourceType) {
      case 'SOURCE_BIBEL':
        return 'Bibel V5.3.1 (amtlicher Wortlaut)';
      case 'SOURCE_GESETZE_IM_INTERNET':
        return 'gesetze-im-internet.de (Primärquelle)';
      case 'SOURCE_NOT_IN_BIBEL':
        return 'nicht in Bibel V5.3.1; Wortlaut gesetze-im-internet.de';
      default:
        return 'keine amtliche Quelle hinterlegt';
    }
  }
}
