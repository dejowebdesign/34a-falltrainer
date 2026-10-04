import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CriminalOffense } from '../../core/models';
import {
  FAMILY_RELATION_LABELS,
  OFFENSE_CATEGORY_LABELS,
  OFFENSE_FAMILY_LABELS,
  RELEVANCE_LEVEL_LABELS,
} from '../../core/data/criminal-offenses.data';
import { CriminalOffenseService } from '../../core/services/criminal-offense.service';

/** Datenübergabe an den Delikt-Dialog: die aktuelle Liste und der Startindex. */
export interface CriminalOffenseDialogData {
  /** Die aktuell gefilterte und sortierte Deliktsliste (Basis der Navigation). */
  offenses: CriminalOffense[];
  /** Index des zuerst anzuzeigenden Delikts. */
  index: number;
}

/**
 * Vollständige Detailansicht eines Straftatbestands als Material-Dialog.
 *
 * Die Liste bleibt dadurch kompakt: Gelern/ nachgeschlagen wird im Modal.
 * Der Kopf (Paragraph, Titel, Status-Chips) bleibt beim Scrollen stehen, nur
 * der Detailbereich scrollt. Vor/Zurück navigiert durch die übergebene
 * (gefilterte und sortierte) Liste, sodass die Modal-Navigation mit dem
 * Filter-/Sortierzustand der Seite kompatibel bleibt.
 */
@Component({
  selector: 'app-criminal-offense-detail',
  imports: [MatButtonModule, MatChipsModule, MatDialogModule, MatDividerModule, MatIconModule],
  template: `
    <header class="detail-head">
      <div class="head-main">
        <span class="head-paragraph">{{ offense().paragraph }} {{ offense().law }}</span>
        <h2 class="head-title" id="offense-dialog-title">{{ offense().officialTitle }}</h2>
        <span class="head-category">{{ categoryLabel() }}</span>
        <div class="head-chips" aria-label="Kernmerkmale">
          <span class="ft-chip" [class.ft-chip--primary]="isVerbrechen()">
            {{ isVerbrechen() ? 'Verbrechen' : 'Vergehen' }}
          </span>
          <span class="ft-chip" [class.ft-chip--accent]="isAntragsdelikt()">
            {{ isAntragsdelikt() ? 'Antragsdelikt' : 'Offizialdelikt' }}
          </span>
          <span class="ft-chip">Versuch: {{ offense().attemptPunishable ? 'Ja' : 'Nein' }}</span>
          @if (isExamRelevant()) {
            <span class="ft-chip ft-chip--star">
              <mat-icon aria-hidden="true">star</mat-icon>
              Besonders relevant für §34a
            </span>
          }
        </div>
        <span class="head-family">
          {{ familyLabel() }} · {{ familyRelationLabel() }}
        </span>
      </div>
      <button
        mat-icon-button
        type="button"
        class="head-close"
        aria-label="Dialog schließen"
        (click)="close()"
      >
        <mat-icon aria-hidden="true">close</mat-icon>
      </button>
    </header>

    <mat-divider />

    <div class="detail-body">
      <p class="lead">{{ offense().explanation }}</p>

      <div class="detail-grid">
        <section class="detail" aria-label="Geschütztes Rechtsgut">
          <h3>Geschütztes Rechtsgut</h3>
          <p>{{ offense().protectedInterest }}</p>
        </section>

        <section class="detail" aria-label="Deliktsgruppe">
          <h3>Deliktsgruppe</h3>
          <p>{{ categoryLabel() }}</p>
        </section>

        <section class="detail" aria-label="Objektiver Tatbestand">
          <h3>Objektiver Tatbestand</h3>
          <ul>
            @for (element of offense().objectiveElements; track element) {
              <li>{{ element }}</li>
            }
          </ul>
        </section>

        <section class="detail" aria-label="Subjektiver Tatbestand">
          <h3>Subjektiver Tatbestand</h3>
          <ul>
            @for (element of offense().subjectiveElements; track element) {
              <li>{{ element }}</li>
            }
          </ul>
          @if (offense().specialSubjectiveElements?.length) {
            <p class="detail-note">
              Besondere subjektive Merkmale:
              {{ offense().specialSubjectiveElements?.join(', ') }}
            </p>
          }
        </section>

        <section class="detail" aria-label="Vorsatz und Fahrlässigkeit">
          <h3>Vorsatz / Fahrlässigkeit</h3>
          <p>Vorsatz: <strong>{{ offense().intentRequired ? 'Ja' : 'Nein' }}</strong></p>
          <p>
            Fahrlässige Variante:
            <strong>{{ offense().negligence.negligentVariant ? 'Ja' : 'Nein' }}</strong>
            @if (offense().negligence.negligentNorm) {
              <span> ({{ offense().negligence.negligentNorm }})</span>
            }
          </p>
          <p class="detail-note">{{ offense().negligence.explanation }}</p>
        </section>

        <section class="detail" aria-label="Strafrahmen">
          <h3>Strafrahmen</h3>
          <p class="detail-strong">Mindeststrafe: {{ offense().minimumPenalty }}</p>
          <p class="detail-note">Höchstmaß: {{ offense().maximumPenalty }}</p>
        </section>

        <section class="detail" aria-label="Einordnung">
          <h3>Einordnung (§ 12 StGB)</h3>
          <p class="detail-strong">{{ isVerbrechen() ? 'Verbrechen' : 'Vergehen' }}</p>
        </section>

        <section class="detail" aria-label="Verfolgung">
          <h3>Verfolgung</h3>
          <p class="detail-strong">
            {{ isAntragsdelikt() ? 'Antragsdelikt' : 'Offizialdelikt' }}
            @if (offense().prosecution.applicationType) {
              <span class="detail-note">
                ({{ offense().prosecution.applicationType === 'ABSOLUTES_ANTRAGSDELIKT'
                    ? 'absolut'
                    : 'relativ' }})
              </span>
            }
          </p>
          @if (offense().prosecution.applicationNorm) {
            <p class="detail-note">Regelung: {{ offense().prosecution.applicationNorm }}</p>
          }
          <p class="detail-note">{{ offense().prosecution.explanation }}</p>
        </section>

        <section class="detail" aria-label="Versuch">
          <h3>Versuch</h3>
          <p class="detail-strong">Strafbar: {{ offense().attemptPunishable ? 'Ja' : 'Nein' }}</p>
          <p class="detail-note">{{ offense().attemptExplanation }}</p>
        </section>
      </div>

      <section class="detail relevance" aria-label="Für §34a wichtig">
        <h3>Für §34a wichtig</h3>
        <p>{{ offense().examRelevance }}</p>
      </section>

      @if (offense().securityNote) {
        <section class="detail relevance" aria-label="Typische Situation im Sicherheitsdienst">
          <h3>Typische Situation im Sicherheitsdienst</h3>
          <p>{{ offense().securityNote }}</p>
        </section>
      }

      <section class="detail relevance" aria-label="Warum dieses Delikt hier steht">
        <h3>Warum dieses Delikt hier steht</h3>
        <p>{{ offense().relevanceReason }}</p>
        <p class="detail-note">
          Relevanzstufe:
          {{ relevanceLevelLabel() }}
        </p>
      </section>

      @if (related().length) {
        <section class="related" aria-label="Ähnliche Delikte">
          <h3>Ähnliche Delikte</h3>
          <div class="related-chips">
            @for (item of related(); track item.id) {
              <button type="button" class="related-chip" (click)="showRelated(item)">
                {{ item.paragraph }} {{ item.officialTitle }}
              </button>
            }
          </div>
        </section>
      }

      <details class="official-text">
        <summary>Amtlicher Gesetzeswortlaut</summary>
        <p>{{ offense().officialText }}</p>
        <p class="detail-note">
          Quelle:
          <a [href]="offense().sourceUrl" target="_blank" rel="noopener noreferrer">
            {{ offense().sourceUrl }}
          </a>
        </p>
        <p class="detail-note">
          Herkunft: {{ sourceLabel() }} · geprüft am {{ offense().source.lastVerified }}
        </p>
      </details>
    </div>

    <mat-divider />

    <footer class="detail-foot">
      <button
        mat-stroked-button
        type="button"
        class="nav-button"
        [disabled]="!canGoPrevious()"
        (click)="previous()"
      >
        <mat-icon aria-hidden="true">chevron_left</mat-icon>
        Vorheriges
      </button>
      <span class="nav-position" role="status" aria-live="polite">
        {{ positionLabel() }}
      </span>
      <button
        mat-stroked-button
        type="button"
        class="nav-button"
        [disabled]="!canGoNext()"
        (click)="next()"
      >
        Nächstes
        <mat-icon aria-hidden="true">chevron_right</mat-icon>
      </button>
    </footer>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        max-height: 90vh;
      }

      .detail-head {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1.4rem 1.5rem 1.1rem;
        position: sticky;
        top: 0;
        z-index: 2;
        background: var(--ft-glass-strong);
        backdrop-filter: blur(var(--ft-blur-glass)) saturate(150%);
        -webkit-backdrop-filter: blur(var(--ft-blur-glass)) saturate(150%);
      }
      .head-main {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        min-width: 0;
        flex: 1 1 auto;
      }
      .head-paragraph {
        font-weight: 700;
        font-size: 0.95rem;
        letter-spacing: 0.02em;
        color: var(--ft-accent-strong);
      }
      .head-title {
        margin: 0;
        font-size: clamp(1.3rem, 2.6vw, 1.8rem);
        line-height: 1.2;
      }
      .head-category {
        font-size: 0.85rem;
        color: var(--ft-muted);
      }
      .head-family {
        font-size: 0.8rem;
        color: var(--ft-muted);
      }
      .head-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-top: 0.35rem;
      }
      .head-close {
        flex: 0 0 auto;
      }

      .detail-body {
        flex: 1 1 auto;
        overflow-y: auto;
        padding: 1.2rem 1.5rem 1.6rem;
        display: grid;
        gap: 1rem;
        overscroll-behavior: contain;
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
        padding: 0.9rem 1.05rem;
        min-width: 0;
      }
      .detail h3 {
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
        padding: 0.9rem 1.05rem;
      }
      .security-note mat-icon {
        color: var(--ft-accent-strong);
        flex: 0 0 auto;
      }
      .security-note h3 {
        margin: 0 0 0.3rem;
        font-size: 0.9rem;
      }
      .security-note p {
        margin: 0;
        line-height: 1.55;
      }

      .related {
        display: grid;
        gap: 0.5rem;
      }
      .related h3 {
        margin: 0;
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.07em;
        color: var(--ft-muted);
      }
      .related-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .related-chip {
        border: 1px solid var(--ft-border-strong);
        background: var(--ft-surface);
        color: var(--ft-text);
        border-radius: 999px;
        padding: 0.4rem 0.85rem;
        font: inherit;
        font-size: 0.86rem;
        cursor: pointer;
        transition:
          border-color var(--ft-transition),
          background-color var(--ft-transition);
      }
      .related-chip:hover {
        border-color: var(--ft-accent);
        background: var(--ft-accent-soft);
      }
      .related-chip:focus-visible {
        outline: 3px solid var(--ft-accent);
        outline-offset: 2px;
      }

      .official-text {
        border: 1px dashed var(--ft-border-strong);
        border-radius: var(--ft-radius);
        padding: 0.7rem 1rem;
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

      .detail-foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        padding: 0.8rem 1.5rem;
        background: var(--ft-surface-2);
      }
      .nav-position {
        font-size: 0.82rem;
        color: var(--ft-muted);
        white-space: nowrap;
      }

      @media (max-width: 600px) {
        .detail-head {
          padding: 1.1rem 1rem 0.9rem;
        }
        .detail-body {
          padding: 1rem;
        }
        .detail-foot {
          padding: 0.7rem 1rem;
        }
        .nav-button .mdc-button__label {
          font-size: 0.82rem;
        }
      }
    `,
  ],
})
export class CriminalOffenseDetailComponent {
  private readonly dialogRef = inject(MatDialogRef<CriminalOffenseDetailComponent>);
  private readonly service = inject(CriminalOffenseService);
  private readonly data = inject<CriminalOffenseDialogData>(MAT_DIALOG_DATA);

  /** Basis der Vor/Zurück-Navigation (gefilterte und sortierte Liste). */
  private readonly list = signal<CriminalOffense[]>(this.data.offenses);
  private readonly index = signal(this.data.index);

  readonly offense = computed(() => this.list()[this.index()]);
  readonly related = computed(() => this.service.getRelated(this.offense()));

  readonly categoryLabel = computed(() => OFFENSE_CATEGORY_LABELS[this.offense().category]);
  readonly familyLabel = computed(() => OFFENSE_FAMILY_LABELS[this.offense().family]);
  readonly familyRelationLabel = computed(
    () => FAMILY_RELATION_LABELS[this.offense().familyRelation],
  );
  readonly relevanceLevelLabel = computed(
    () => RELEVANCE_LEVEL_LABELS[this.offense().relevanceLevel],
  );
  readonly isVerbrechen = computed(() => this.offense().classification === 'VERBRECHEN');
  readonly isAntragsdelikt = computed(
    () => this.offense().prosecution.type === 'ANTRAGSDELIKT',
  );
  readonly isExamRelevant = computed(() => this.service.isExamRelevant(this.offense()));

  readonly canGoPrevious = computed(() => this.index() > 0);
  readonly canGoNext = computed(() => this.index() < this.list().length - 1);
  readonly positionLabel = computed(
    () => `${this.index() + 1} von ${this.list().length}`,
  );

  readonly sourceLabel = computed(() => {
    switch (this.offense().source.sourceType) {
      case 'SOURCE_BIBEL':
        return 'Bibel V5.3.1 (amtlicher Wortlaut)';
      case 'SOURCE_GESETZE_IM_INTERNET':
        return 'gesetze-im-internet.de (Primärquelle)';
      case 'SOURCE_NOT_IN_BIBEL':
        return 'nicht in Bibel V5.3.1; Wortlaut gesetze-im-internet.de';
      default:
        return 'keine amtliche Quelle hinterlegt';
    }
  });

  close(): void {
    this.dialogRef.close();
  }

  previous(): void {
    if (this.canGoPrevious()) {
      this.index.update((value) => value - 1);
    }
  }

  next(): void {
    if (this.canGoNext()) {
      this.index.update((value) => value + 1);
    }
  }

  /**
   * Springt zu einem ähnlichen Delikt. Ist es in der aktuellen Liste enthalten,
   * bleibt die Navigation erhalten; andernfalls wird auf die Gesamtliste
   * zurückgegriffen, damit das Delikt weiterhin angezeigt werden kann.
   */
  showRelated(target: CriminalOffense): void {
    const inList = this.list().findIndex((item) => item.id === target.id);
    if (inList >= 0) {
      this.index.set(inList);
      return;
    }
    const full = this.service.getOffenses();
    const index = full.findIndex((item) => item.id === target.id);
    this.list.set(full);
    this.index.set(index >= 0 ? index : 0);
  }
}
