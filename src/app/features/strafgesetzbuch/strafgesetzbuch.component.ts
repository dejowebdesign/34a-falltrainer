import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  CriminalOffenseService,
  EMPTY_OFFENSE_FILTER,
} from '../../core/services/criminal-offense.service';
import {
  OFFENSE_CATEGORY_LABELS,
  OFFENSE_CATEGORY_ORDER,
} from '../../core/data/criminal-offenses.data';
import { OffenseCategory, CriminalOffense } from '../../core/models';
import { CriminalOffenseCardComponent } from './criminal-offense-card.component';

interface CategoryOption {
  value: OffenseCategory;
  label: string;
}

/**
 * Lernseite „Strafgesetzbuch“ – kuratierte Übersicht der für die
 * Sachkundeprüfung §34a GewO relevanten Straftatbestände.
 *
 * Keine vollständige StGB-Datenbank: Auswahl und Rechtswerte stammen aus der
 * Bibel V5.3.1 bzw. – wo diese keinen amtlichen Wortlaut enthält – aus der
 * amtlichen Primärquelle gesetze-im-internet.de.
 */
@Component({
  selector: 'app-strafgesetzbuch',
  imports: [
    FormsModule,
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    CriminalOffenseCardComponent,
  ],
  template: `
    <div class="ft-container ft-page">
      <header class="ft-page-head">
        <span class="ft-eyebrow">Lernseite</span>
        <h1>Strafgesetzbuch</h1>
        <p>Relevante Straftaten für die Sachkundeprüfung §34a GewO</p>
        <p class="intro">
          Hier finden Sie die für die Sachkundeprüfung besonders relevanten Straftatbestände mit
          Tatbestandsmerkmalen, Strafrahmen, Verfahrensart und Versuchsstrafbarkeit.
        </p>
      </header>

      <section class="ft-section basics" aria-labelledby="basics-heading">
        <div class="ft-section-head">
          <h2 id="basics-heading">Grundlagen des Allgemeinen Teils</h2>
          <p>
            Diese Normen erklären, wie die Delikte eingeordnet werden – Verbrechen/Vergehen,
            Vorsatz/Fahrlässigkeit und die Strafbarkeit des Versuchs.
          </p>
        </div>
        <div class="basics-grid">
          @for (basic of basics; track basic.id) {
            <mat-expansion-panel class="basic-panel">
              <mat-expansion-panel-header [collapsedHeight]="'auto'" [expandedHeight]="'auto'">
                <span class="basic-head">
                  <strong>{{ basic.paragraph }} {{ 'StGB' }}</strong>
                  <span>{{ basic.officialTitle }}</span>
                </span>
              </mat-expansion-panel-header>
              <p class="basic-text">{{ basic.officialText }}</p>
              <p class="basic-explanation">{{ basic.explanation }}</p>
              <a class="basic-source" [href]="basic.sourceUrl" target="_blank" rel="noopener noreferrer">
                Amtliche Quelle
              </a>
            </mat-expansion-panel>
          }
        </div>
      </section>

      <section class="ft-section ft-section--plain" aria-label="Suche und Filter">
        <div class="filter-bar ft-glass--soft">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Suche</mat-label>
            <mat-icon matPrefix aria-hidden="true">search</mat-icon>
            <input
              matInput
              type="search"
              [ngModel]="query()"
              (ngModelChange)="query.set($event)"
              placeholder="Paragraph, Straftat, Fachbegriff …"
              aria-label="Straftaten durchsuchen"
            />
            @if (query()) {
              <button
                matSuffix
                mat-icon-button
                type="button"
                aria-label="Suche löschen"
                (click)="query.set('')"
              >
                <mat-icon aria-hidden="true">close</mat-icon>
              </button>
            }
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Deliktsgruppe</mat-label>
            <mat-select
              [ngModel]="category()"
              (ngModelChange)="category.set($event)"
              aria-label="Deliktsgruppe filtern"
            >
              <mat-option [value]="null">Alle Deliktsgruppen</mat-option>
              @for (option of categoryOptions; track option.value) {
                <mat-option [value]="option.value">{{ option.label }}</mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Einordnung</mat-label>
            <mat-select
              [ngModel]="classification()"
              (ngModelChange)="classification.set($event)"
              aria-label="Verbrechen oder Vergehen filtern"
            >
              <mat-option [value]="null">Verbrechen und Vergehen</mat-option>
              <mat-option value="VERBRECHEN">Verbrechen</mat-option>
              <mat-option value="VERGEHEN">Vergehen</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Verfolgung</mat-label>
            <mat-select
              [ngModel]="prosecution()"
              (ngModelChange)="prosecution.set($event)"
              aria-label="Offizial- oder Antragsdelikt filtern"
            >
              <mat-option [value]="null">Offizial und Antrag</mat-option>
              <mat-option value="OFFIZIALDELIKT">Offizialdelikte</mat-option>
              <mat-option value="ANTRAGSDELIKT">Antragsdelikte</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Versuch</mat-label>
            <mat-select
              [ngModel]="attemptPunishable()"
              (ngModelChange)="attemptPunishable.set($event)"
              aria-label="Versuchsstrafbarkeit filtern"
            >
              <mat-option [value]="null">Versuch: alle</mat-option>
              <mat-option [value]="true">Versuch strafbar</mat-option>
              <mat-option [value]="false">Versuch nicht strafbar</mat-option>
            </mat-select>
          </mat-form-field>

          <div class="toggle-row">
            <button
              mat-stroked-button
              type="button"
              [class.active]="intentOnly()"
              [attr.aria-pressed]="intentOnly()"
              (click)="intentOnly.set(!intentOnly())"
            >
              <mat-icon aria-hidden="true">psychology</mat-icon>
              Vorsatz
            </button>
            <button
              mat-stroked-button
              type="button"
              [class.active]="negligenceOnly()"
              [attr.aria-pressed]="negligenceOnly()"
              (click)="negligenceOnly.set(!negligenceOnly())"
            >
              <mat-icon aria-hidden="true">warning</mat-icon>
              Fahrlässigkeit
            </button>
            <button
              mat-button
              type="button"
              class="reset"
              (click)="resetFilters()"
              [disabled]="!hasActiveFilter()"
            >
              Filter zurücksetzen
            </button>
          </div>
        </div>

        <p class="result-count" role="status" aria-live="polite">
          {{ filtered().length }} von {{ total }} Straftatbeständen
        </p>

        @if (filtered().length) {
          <div class="offense-grid">
            @for (offense of filtered(); track offense.id) {
              <app-criminal-offense-card
                [offense]="offense"
                [related]="relatedFor(offense)"
                (selectRelated)="jumpToParagraph($event)"
              />
            }
          </div>
        } @else {
          <div class="empty-state ft-card" role="status">
            <mat-icon aria-hidden="true">search_off</mat-icon>
            <h2>Keine Treffer</h2>
            <p>
              Für diese Suche und Filterkombination ist kein Straftatbestand hinterlegt. Bitte
              Suche oder Filter anpassen.
            </p>
            <button mat-flat-button type="button" (click)="resetFilters()">
              Filter zurücksetzen
            </button>
          </div>
        }
      </section>
    </div>
  `,
  styles: [
    `
      .intro {
        margin-top: 0.4rem;
      }
      .basics-grid {
        display: grid;
        gap: 0.7rem;
        grid-template-columns: minmax(0, 1fr);
      }
      @media (min-width: 820px) {
        .basics-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      .basic-panel {
        border: 1px solid var(--ft-border);
        border-radius: var(--ft-radius);
        background: var(--ft-surface);
        box-shadow: var(--ft-elevation-1);
      }
      .basic-head {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
      }
      .basic-head strong {
        color: var(--ft-accent-strong);
      }
      .basic-head span {
        font-size: 0.9rem;
      }
      .basic-text {
        margin: 0 0 0.6rem;
        line-height: 1.6;
      }
      .basic-explanation {
        margin: 0 0 0.6rem;
        color: var(--ft-muted);
        line-height: 1.6;
      }
      .basic-source {
        color: var(--ft-primary);
        font-weight: 600;
      }

      .filter-bar {
        display: grid;
        gap: 0.75rem;
        grid-template-columns: minmax(0, 1fr);
        padding: 1rem;
        border-radius: var(--ft-radius-lg);
      }
      @media (min-width: 760px) {
        .filter-bar {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .search-field {
          grid-column: 1 / -1;
        }
      }
      @media (min-width: 1080px) {
        .filter-bar {
          grid-template-columns: 1.6fr repeat(4, minmax(0, 1fr));
          align-items: start;
        }
        .search-field {
          grid-column: auto;
        }
        .toggle-row {
          grid-column: 1 / -1;
        }
      }
      .search-field {
        width: 100%;
      }
      .filter-bar mat-form-field {
        width: 100%;
      }
      .toggle-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        align-items: center;
      }
      .toggle-row button.active {
        background: var(--ft-accent-soft);
        border-color: var(--ft-accent);
        color: var(--ft-accent-strong);
      }
      .toggle-row .reset {
        margin-left: auto;
      }
      .result-count {
        margin: 0.9rem 0 0;
        font-weight: 600;
        color: var(--ft-muted);
      }

      .offense-grid {
        margin-top: 1rem;
        display: grid;
        gap: 1rem;
        grid-template-columns: minmax(0, 1fr);
      }
      @media (min-width: 900px) {
        .offense-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      @media (min-width: 1400px) {
        .offense-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }

      .empty-state {
        margin-top: 1rem;
        padding: 2rem;
        text-align: center;
        display: grid;
        justify-items: center;
        gap: 0.5rem;
      }
      .empty-state mat-icon {
        font-size: 40px;
        width: 40px;
        height: 40px;
        color: var(--ft-muted);
      }
      .empty-state h2 {
        margin: 0;
      }
      .empty-state p {
        margin: 0;
        max-width: 480px;
        color: var(--ft-muted);
      }
    `,
  ],
})
export class StrafgesetzbuchComponent {
  private readonly service = inject(CriminalOffenseService);

  readonly basics = this.service.getBasics();
  readonly total = this.service.getOffenses().length;
  readonly categoryOptions: CategoryOption[] = OFFENSE_CATEGORY_ORDER.map((value) => ({
    value,
    label: OFFENSE_CATEGORY_LABELS[value],
  }));

  readonly query = signal('');
  readonly category = signal<OffenseCategory | null>(null);
  readonly classification = signal<'VERBRECHEN' | 'VERGEHEN' | null>(null);
  readonly prosecution = signal<'OFFIZIALDELIKT' | 'ANTRAGSDELIKT' | null>(null);
  readonly attemptPunishable = signal<boolean | null>(null);
  readonly intentOnly = signal(false);
  readonly negligenceOnly = signal(false);

  private readonly filter = computed(() => ({
    query: this.query(),
    category: this.category(),
    classification: this.classification(),
    prosecution: this.prosecution(),
    attemptPunishable: this.attemptPunishable(),
    intentOnly: this.intentOnly(),
    negligenceOnly: this.negligenceOnly(),
  }));

  readonly filtered = computed(() => this.service.filter(this.filter()));

  readonly hasActiveFilter = computed(
    () =>
      this.query().trim().length > 0 ||
      this.category() !== null ||
      this.classification() !== null ||
      this.prosecution() !== null ||
      this.attemptPunishable() !== null ||
      this.intentOnly() ||
      this.negligenceOnly(),
  );

  relatedFor(offense: CriminalOffense) {
    return this.service.getRelated(offense);
  }

  resetFilters(): void {
    this.query.set(EMPTY_OFFENSE_FILTER.query);
    this.category.set(EMPTY_OFFENSE_FILTER.category);
    this.classification.set(EMPTY_OFFENSE_FILTER.classification);
    this.prosecution.set(EMPTY_OFFENSE_FILTER.prosecution);
    this.attemptPunishable.set(EMPTY_OFFENSE_FILTER.attemptPunishable);
    this.intentOnly.set(EMPTY_OFFENSE_FILTER.intentOnly);
    this.negligenceOnly.set(EMPTY_OFFENSE_FILTER.negligenceOnly);
  }

  /** Springt über die Suche zu einem verwandten Delikt (Paragraph). */
  jumpToParagraph(paragraph: string): void {
    this.query.set(paragraph);
  }
}
