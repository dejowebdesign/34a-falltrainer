import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  CriminalOffenseService,
  OFFENSE_SORT_LABELS,
} from '../../core/services/criminal-offense.service';
import {
  OFFENSE_CATEGORY_LABELS,
  OFFENSE_CATEGORY_ORDER,
  OFFENSE_FAMILY_LABELS,
} from '../../core/data/criminal-offenses.data';
import {
  AttemptFilter,
  CriminalOffense,
  CulpabilityFilter,
  LegalBasicsCard,
  OffenseCategory,
  OffenseClassification,
  OffenseFamily,
  OffenseSortKey,
  ProsecutionType,
} from '../../core/models';
import { CriminalOffenseCardComponent } from './criminal-offense-card.component';
import { CriminalOffenseDetailComponent } from './criminal-offense-detail.component';
import { LegalBasicsCardComponent } from './legal-basics-card.component';
import { LegalBasicsDetailComponent } from './legal-basics-detail.component';

interface CategoryOption {
  value: OffenseCategory;
  label: string;
}

interface FamilyOption {
  value: OffenseFamily;
  label: string;
}

/**
 * Lernseite „Strafgesetzbuch“ – kuratierte Übersicht der für die
 * Sachkundeprüfung §34a GewO relevanten Straftatbestände.
 *
 * Keine vollständige StGB-Datenbank: Auswahl und Rechtswerte stammen aus der
 * Bibel V5.3.1 bzw. – wo diese keinen amtlichen Wortlaut enthält – aus der
 * amtlichen Primärquelle gesetze-im-internet.de.
 *
 * Die Liste dient dem schnellen Finden (kompakte Karten + Suche/Filter/
 * Sortierung), das Modal dem vollständigen Lernen und Nachschlagen.
 */
@Component({
  selector: 'app-strafgesetzbuch',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    CriminalOffenseCardComponent,
    LegalBasicsCardComponent,
  ],
  template: `
    <div class="ft-container ft-page">
      <header class="ft-page-head">
        <span class="ft-eyebrow">Lernseite</span>
        <h1>Strafgesetzbuch</h1>
        <p>Relevante Straftaten für die Sachkundeprüfung §34a GewO</p>
        <p class="intro">
          Hier finden Sie die für die Sachkundeprüfung besonders relevanten Straftatbestände mit
          Tatbestandsmerkmalen, Strafrahmen, Verfahrensart und Versuchsstrafbarkeit. Die Liste dient
          dem schnellen Finden – ein Klick auf eine Karte öffnet die vollständige Detailansicht.
        </p>
      </header>

      <section class="ft-section basics" aria-labelledby="basics-heading">
        <div class="ft-section-head">
          <h2 id="basics-heading">Grundlagen des Strafrechts</h2>
          <p>
            Die wichtigsten Grundlagen, die Sie für die strafrechtliche Einordnung in der
            Sachkundeprüfung benötigen.
          </p>
        </div>
        <div class="basics-grid">
          @for (basic of basics; track basic.id) {
            <app-legal-basics-card [basics]="basic" (open)="openBasics($event)" />
          }
        </div>
      </section>

      <section class="ft-section ft-section--plain" aria-labelledby="offenses-heading">
        <div class="ft-section-head">
          <h2 id="offenses-heading">Relevante Straftatbestände</h2>
          <p>
            Die für die Sachkundeprüfung nach §34a GewO besonders relevanten Straftaten – nach
            Deliktsfamilien geordnet.
          </p>
        </div>
      </section>

      <section class="ft-section ft-section--plain" aria-label="Suche, Filter und Sortierung">
        <div class="controls ft-glass--soft">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Suche</mat-label>
            <mat-icon matPrefix aria-hidden="true">search</mat-icon>
            <input
              matInput
              type="search"
              [ngModel]="text()"
              (ngModelChange)="text.set($event)"
              placeholder="Paragraph oder Straftat suchen …"
              aria-label="Straftaten durchsuchen"
            />
            @if (text()) {
              <button
                matSuffix
                mat-icon-button
                type="button"
                aria-label="Suche löschen"
                (click)="text.set('')"
              >
                <mat-icon aria-hidden="true">close</mat-icon>
              </button>
            }
          </mat-form-field>

          <div class="quick-filters" role="group" aria-label="Schnellfilter">
            @for (chip of quickFilters; track chip.key) {
              <button
                type="button"
                class="quick-chip"
                [class.quick-chip--active]="isQuickActive(chip.key)"
                [attr.aria-pressed]="isQuickActive(chip.key)"
                (click)="toggleQuick(chip.key)"
              >
                {{ chip.label }}
              </button>
            }
            <button
              type="button"
              class="quick-chip quick-chip--extended"
              [class.quick-chip--active]="hasExtendedFilter()"
              [attr.aria-expanded]="showExtended()"
              (click)="showExtended.set(!showExtended())"
            >
              <mat-icon aria-hidden="true">tune</mat-icon>
              Weitere Filter
              @if (extendedCount()) {
                <span class="quick-count">{{ extendedCount() }}</span>
              }
            </button>
          </div>

          @if (showExtended()) {
            <div class="extended ft-reveal" role="group" aria-label="Weitere Filter">
              <mat-form-field appearance="outline">
                <mat-label>Deliktsfamilie</mat-label>
                <mat-select
                  multiple
                  [ngModel]="families()"
                  (ngModelChange)="families.set($event)"
                  aria-label="Deliktsfamilie filtern"
                >
                  @for (option of familyOptions; track option.value) {
                    <mat-option [value]="option.value">{{ option.label }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Deliktsgruppe</mat-label>
                <mat-select
                  multiple
                  [ngModel]="categories()"
                  (ngModelChange)="categories.set($event)"
                  aria-label="Deliktsgruppe filtern"
                >
                  @for (option of categoryOptions; track option.value) {
                    <mat-option [value]="option.value">{{ option.label }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Einordnung</mat-label>
                <mat-select
                  multiple
                  [ngModel]="classifications()"
                  (ngModelChange)="classifications.set($event)"
                  aria-label="Verbrechen oder Vergehen filtern"
                >
                  <mat-option value="VERBRECHEN">Verbrechen</mat-option>
                  <mat-option value="VERGEHEN">Vergehen</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Verfolgung</mat-label>
                <mat-select
                  multiple
                  [ngModel]="prosecutions()"
                  (ngModelChange)="prosecutions.set($event)"
                  aria-label="Offizial- oder Antragsdelikt filtern"
                >
                  <mat-option value="OFFIZIALDELIKT">Offizialdelikte</mat-option>
                  <mat-option value="ANTRAGSDELIKT">Antragsdelikte</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Versuch</mat-label>
                <mat-select
                  multiple
                  [ngModel]="attempts()"
                  (ngModelChange)="attempts.set($event)"
                  aria-label="Versuchsstrafbarkeit filtern"
                >
                  <mat-option value="PUNISHABLE">Versuch strafbar</mat-option>
                  <mat-option value="NOT_PUNISHABLE">Versuch nicht strafbar</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Vorsatz / Fahrlässigkeit</mat-label>
                <mat-select
                  multiple
                  [ngModel]="culpabilities()"
                  (ngModelChange)="culpabilities.set($event)"
                  aria-label="Vorsatz oder Fahrlässigkeit filtern"
                >
                  <mat-option value="VORSATZ">Vorsatz</mat-option>
                  <mat-option value="FAEHLAESSIGKEIT">Fahrlässigkeit</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          }

          <div class="controls-foot">
            <mat-slide-toggle
              class="group-toggle"
              [checked]="grouped()"
              (change)="grouped.set($event.checked)"
            >
              Nach Deliktsfamilie gruppieren
            </mat-slide-toggle>

            <div class="controls-actions">
              <button
                mat-button
                type="button"
                class="reset"
                (click)="resetFilters()"
                [disabled]="!hasActiveFilter()"
              >
                Filter zurücksetzen
              </button>

              <mat-form-field appearance="outline" class="sort-field">
                <mat-label>Sortieren nach</mat-label>
                <mat-select
                  [ngModel]="sortKey()"
                  (ngModelChange)="sortKey.set($event)"
                  aria-label="Sortierung wählen"
                >
                  @for (option of sortOptions; track option.value) {
                    <mat-option [value]="option.value">{{ option.label }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
            </div>
          </div>
        </div>

        <p class="result-count" role="status" aria-live="polite">
          @if (hasActiveFilter()) {
            <strong>{{ stats().total }} von {{ total }}</strong> Straftatbeständen
          } @else {
            <strong>{{ total }} Straftatbestände</strong>
          }
          <span class="result-breakdown">
            {{ stats().antragsdelikte }} Antragsdelikte · {{ stats().verbrechen }} Verbrechen ·
            {{ stats().vergehen }} Vergehen
            @if (stats().examRelevant) {
              · {{ stats().examRelevant }} besonders §34a-relevant
            }
          </span>
        </p>

        @if (visibleCount()) {
          @if (grouped()) {
            <div class="penalty-groups">
              @for (group of familyGroups(); track group.family) {
                <section class="penalty-group" [attr.aria-label]="group.label">
                  <h2 class="penalty-group-head">
                    {{ group.label }}
                    <span class="penalty-group-count">{{ group.offenses.length }}</span>
                  </h2>
                  <div class="offense-grid">
                    @for (offense of group.offenses; track offense.id) {
                      <app-criminal-offense-card [offense]="offense" (open)="openDetail($event)" />
                    }
                  </div>
                </section>
              }
            </div>
          } @else {
            <div class="offense-grid">
              @for (offense of sorted(); track offense.id) {
                <app-criminal-offense-card [offense]="offense" (open)="openDetail($event)" />
              }
            </div>
          }
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
        gap: 0.9rem;
        grid-template-columns: minmax(0, 1fr);
      }
      @media (min-width: 720px) {
        .basics-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      @media (min-width: 1100px) {
        .basics-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }

      .controls {
        display: grid;
        gap: 0.85rem;
        padding: 1rem 1.05rem 1.1rem;
        border-radius: var(--ft-radius-lg);
      }
      .search-field {
        width: 100%;
      }
      .quick-filters {
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
      }
      .quick-chip {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.42rem 0.85rem;
        border-radius: 999px;
        border: 1px solid var(--ft-border-strong);
        background: var(--ft-surface);
        color: var(--ft-text);
        font: inherit;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        transition:
          border-color var(--ft-transition),
          background-color var(--ft-transition),
          color var(--ft-transition);
      }
      .quick-chip:hover {
        border-color: var(--ft-accent);
      }
      .quick-chip:focus-visible {
        outline: 3px solid var(--ft-accent);
        outline-offset: 2px;
      }
      .quick-chip--active {
        background: var(--ft-accent-soft);
        border-color: var(--ft-accent);
        color: var(--ft-accent-strong);
      }
      .quick-chip--extended mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
      .quick-count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 18px;
        height: 18px;
        padding-inline: 0.25rem;
        border-radius: 999px;
        background: var(--ft-accent);
        color: var(--ft-on-accent);
        font-size: 0.7rem;
      }

      .extended {
        display: grid;
        gap: 0.75rem;
        grid-template-columns: minmax(0, 1fr);
        padding: 0.9rem;
        border-radius: var(--ft-radius);
        background: var(--ft-surface-2);
        border: 1px solid var(--ft-border);
      }
      @media (min-width: 700px) {
        .extended {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      @media (min-width: 1100px) {
        .extended {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
      .extended mat-form-field {
        width: 100%;
      }

      .controls-foot {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.75rem 1rem;
      }
      .group-toggle {
        font-weight: 600;
      }
      .controls-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.75rem;
        margin-left: auto;
      }
      .sort-field {
        width: 260px;
        max-width: 100%;
      }
      @media (max-width: 600px) {
        .controls-actions {
          margin-left: 0;
          width: 100%;
        }
        .sort-field {
          width: 100%;
        }
      }

      .result-count {
        margin: 1rem 0 0;
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
      }
      .result-breakdown {
        font-size: 0.86rem;
        color: var(--ft-muted);
      }

      .offense-grid {
        margin-top: 1rem;
        display: grid;
        gap: 1rem;
        grid-template-columns: minmax(0, 1fr);
        align-items: stretch;
      }
      @media (min-width: 720px) {
        .offense-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      @media (min-width: 1080px) {
        .offense-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }

      .penalty-groups {
        display: grid;
        gap: 1.4rem;
        margin-top: 1rem;
      }
      .penalty-group-head {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        margin: 0 0 0.6rem;
        font-size: 1.05rem;
      }
      .penalty-group-count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 26px;
        height: 22px;
        padding-inline: 0.4rem;
        border-radius: 999px;
        background: var(--ft-surface-2);
        border: 1px solid var(--ft-border);
        color: var(--ft-muted);
        font-size: 0.78rem;
        font-weight: 700;
      }
      .penalty-group .offense-grid {
        margin-top: 0;
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
  private readonly dialog = inject(MatDialog);

  readonly basics = this.service.getBasics();
  readonly total = this.service.getOffenses().length;
  readonly categoryOptions: CategoryOption[] = OFFENSE_CATEGORY_ORDER.map((value) => ({
    value,
    label: OFFENSE_CATEGORY_LABELS[value],
  }));
  readonly familyOptions: FamilyOption[] = (
    Object.keys(OFFENSE_FAMILY_LABELS) as OffenseFamily[]
  )
    .map((value) => ({ value, label: OFFENSE_FAMILY_LABELS[value] }))
    .sort((a, b) => a.label.localeCompare(b.label, 'de'));
  readonly sortOptions = (Object.keys(OFFENSE_SORT_LABELS) as OffenseSortKey[]).map((value) => ({
    value,
    label: OFFENSE_SORT_LABELS[value],
  }));

  /** Schnellfilter: prüft, ob mindestens ein Delikt in der Liste passt. */
  readonly quickFilters: { key: string; label: string }[] = [
    { key: 'CORE_RELEVANT', label: 'Besonders relevant für §34a' },
    { key: 'VERBRECHEN', label: 'Verbrechen' },
    { key: 'VERGEHEN', label: 'Vergehen' },
    { key: 'OFFIZIALDELIKT', label: 'Offizialdelikt' },
    { key: 'ANTRAGSDELIKT', label: 'Antragsdelikt' },
    { key: 'ATTEMPT_PUNISHABLE', label: 'Versuch strafbar' },
    { key: 'ATTEMPT_NOT_PUNISHABLE', label: 'Versuch nicht strafbar' },
    { key: 'VORSATZ', label: 'Vorsatz' },
    { key: 'FAEHLAESSIGKEIT', label: 'Fahrlässigkeit' },
  ];

  readonly text = signal('');
  readonly categories = signal<OffenseCategory[]>([]);
  readonly classifications = signal<OffenseClassification[]>([]);
  readonly prosecutions = signal<ProsecutionType[]>([]);
  readonly attempts = signal<AttemptFilter[]>([]);
  readonly culpabilities = signal<CulpabilityFilter[]>([]);
  readonly families = signal<OffenseFamily[]>([]);
  readonly coreOnly = signal(false);
  readonly examRelevantOnly = signal(false);
  readonly sortKey = signal<OffenseSortKey>('RELEVANCE');
  readonly grouped = signal(false);
  readonly showExtended = signal(false);

  private readonly query = computed(() => ({
    text: this.text(),
    categories: this.categories(),
    classifications: this.classifications(),
    prosecutions: this.prosecutions(),
    attempts: this.attempts(),
    culpabilities: this.culpabilities(),
    families: this.families(),
    coreOnly: this.coreOnly(),
    examRelevantOnly: this.examRelevantOnly(),
  }));

  /** Gefilterte, aber noch nicht sortierte Trefferliste. */
  readonly filtered = computed(() => this.service.query(this.query()));
  readonly sorted = computed(() => this.service.sort(this.filtered(), this.sortKey()));
  readonly familyGroups = computed(() => this.service.groupByFamily(this.filtered()));
  readonly stats = computed(() => this.service.getStats(this.filtered()));
  readonly visibleCount = computed(() => this.filtered().length);

  readonly hasExtendedFilter = computed(
    () =>
      this.categories().length > 0 ||
      this.classifications().length > 0 ||
      this.prosecutions().length > 0 ||
      this.attempts().length > 0 ||
      this.culpabilities().length > 0 ||
      this.families().length > 0,
  );

  readonly extendedCount = computed(
    () =>
      this.categories().length +
      this.classifications().length +
      this.prosecutions().length +
      this.attempts().length +
      this.culpabilities().length +
      this.families().length,
  );

  readonly hasActiveFilter = computed(
    () =>
      this.text().trim().length > 0 ||
      this.hasExtendedFilter() ||
      this.coreOnly() ||
      this.examRelevantOnly(),
  );

  isQuickActive(key: string): boolean {
    switch (key) {
      case 'ANTRAGSDELIKT':
      case 'OFFIZIALDELIKT':
        return this.prosecutions().includes(key as ProsecutionType);
      case 'VERBRECHEN':
      case 'VERGEHEN':
        return this.classifications().includes(key as OffenseClassification);
      case 'ATTEMPT_PUNISHABLE':
        return this.attempts().includes('PUNISHABLE');
      case 'ATTEMPT_NOT_PUNISHABLE':
        return this.attempts().includes('NOT_PUNISHABLE');
      case 'VORSATZ':
        return this.culpabilities().includes('VORSATZ');
      case 'FAEHLAESSIGKEIT':
        return this.culpabilities().includes('FAEHLAESSIGKEIT');
      case 'EXAM_RELEVANT':
        return this.examRelevantOnly();
      case 'CORE_RELEVANT':
        return this.coreOnly();
      default:
        return false;
    }
  }

  toggleQuick(key: string): void {
    switch (key) {
      case 'ANTRAGSDELIKT':
      case 'OFFIZIALDELIKT':
        this.prosecutions.update((values) => toggleValue(values, key as ProsecutionType));
        return;
      case 'VERBRECHEN':
      case 'VERGEHEN':
        this.classifications.update((values) =>
          toggleValue(values, key as OffenseClassification),
        );
        return;
      case 'ATTEMPT_PUNISHABLE':
        this.attempts.update((values) => toggleValue(values, 'PUNISHABLE'));
        return;
      case 'ATTEMPT_NOT_PUNISHABLE':
        this.attempts.update((values) => toggleValue(values, 'NOT_PUNISHABLE'));
        return;
      case 'VORSATZ':
        this.culpabilities.update((values) => toggleValue(values, 'VORSATZ'));
        return;
      case 'FAEHLAESSIGKEIT':
        this.culpabilities.update((values) => toggleValue(values, 'FAEHLAESSIGKEIT'));
        return;
      case 'EXAM_RELEVANT':
        this.examRelevantOnly.update((value) => !value);
        return;
      case 'CORE_RELEVANT':
        this.coreOnly.update((value) => !value);
        return;
      default:
        return;
    }
  }

  openBasics(card: LegalBasicsCard): void {
    this.dialog.open(LegalBasicsDetailComponent, {
      data: card,
      width: 'min(95vw, 1320px)',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: 'basics-dialog',
      autoFocus: 'dialog',
      restoreFocus: true,
    });
  }

  openDetail(offense: CriminalOffense): void {
    const list = this.sorted();
    const index = Math.max(
      0,
      list.findIndex((item) => item.id === offense.id),
    );
    this.dialog.open(CriminalOffenseDetailComponent, {
      data: { offenses: list, index },
      width: 'min(94vw, 1320px)',
      maxWidth: '94vw',
      maxHeight: '90vh',
      panelClass: 'offense-dialog',
      autoFocus: 'dialog',
      restoreFocus: true,
    });
  }

  resetFilters(): void {
    this.text.set('');
    this.categories.set([]);
    this.classifications.set([]);
    this.prosecutions.set([]);
    this.attempts.set([]);
    this.culpabilities.set([]);
    this.families.set([]);
    this.coreOnly.set(false);
    this.examRelevantOnly.set(false);
  }
}

/** Fügt einen Wert einer Mehrfachauswahl hinzu oder entfernt ihn. */
function toggleValue<T>(values: T[], value: T): T[] {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}
