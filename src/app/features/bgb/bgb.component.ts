import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BGB_SOURCE_NOTE } from '../../core/data/bgb-topics.data';
import { LearningTopic, TopicNature } from '../../core/models';
import {
  LearningTopicService,
  TOPIC_NATURE_LABELS,
  TopicQuery,
} from '../../core/services/learning-topic.service';
import { CoreCategoriesComponent } from '../../shared/components/core-categories.component';
import { TopicCardComponent } from '../../shared/components/topic-card.component';
import { TopicDetailComponent } from '../../shared/components/topic-detail.component';

interface NatureOption {
  value: TopicNature;
  label: string;
}

/**
 * Lernseite „Bürgerliches Gesetzbuch“.
 *
 * Bewusst kompakt und auf den Sachkundestoff §34a GewO reduziert: keine
 * BGB-Datenbank. Die Normen sind nach Lernfamilien geordnet (Eigentum/Besitz,
 * Selbsthilfe, Notwehr/Notstand, Schadensersatz, Schikaneverbot). Alle
 * Rechtslogik liegt im Service, nicht im Template.
 */
@Component({
  selector: 'app-bgb',
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    CoreCategoriesComponent,
    TopicCardComponent,
  ],
  template: `
    <div class="ft-container ft-page">
      <header class="ft-page-head">
        <span class="ft-eyebrow">Lernseite</span>
        <h1>Bürgerliches Gesetzbuch</h1>
        <p>Relevante Vorschriften des BGB für die Sachkundeprüfung §34a GewO</p>
        <p class="intro">
          Diese Seite ist bewusst auf den Sachkundestoff reduziert – keine BGB-Datenbank. Gezeigt
          werden nur Normen, die die Sachkundeprüfung ausdrücklich nennt oder die für das
          Verständnis eines Kernthemas unmittelbar erforderlich sind. Die Normen sind nach
          Lernfamilien geordnet; ein Klick auf eine Karte öffnet die vollständige Detailansicht.
        </p>
      </header>

      <section class="ft-section" aria-label="Anspruch, Befugnis, Rechtfertigung, Entschuldigung">
        <app-core-categories [categories]="coreCategories" />
      </section>

      <section class="ft-section ft-section--plain" aria-label="Suche und Filter">
        <div class="controls ft-glass--soft">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Suche</mat-label>
            <mat-icon matPrefix aria-hidden="true">search</mat-icon>
            <input
              matInput
              type="search"
              [ngModel]="text()"
              (ngModelChange)="text.set($event)"
              placeholder="Paragraph oder Thema suchen …"
              aria-label="BGB-Normen durchsuchen"
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

          <div class="controls-row">
            <mat-form-field appearance="outline">
              <mat-label>Lernfamilie</mat-label>
              <mat-select
                [ngModel]="familyId()"
                (ngModelChange)="familyId.set($event)"
                aria-label="Lernfamilie filtern"
              >
                <mat-option [value]="undefined">Alle Lernfamilien</mat-option>
                @for (family of families; track family.id) {
                  <mat-option [value]="family.id">{{ family.label }}</mat-option>
                }
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Rechtsnatur</mat-label>
              <mat-select
                multiple
                [ngModel]="natures()"
                (ngModelChange)="natures.set($event)"
                aria-label="Rechtsnatur filtern"
              >
                @for (option of natureOptions; track option.value) {
                  <mat-option [value]="option.value">{{ option.label }}</mat-option>
                }
              </mat-select>
            </mat-form-field>

            <button
              mat-button
              type="button"
              class="reset"
              (click)="reset()"
              [disabled]="!hasActive()"
            >
              Filter zurücksetzen
            </button>
          </div>
        </div>

        <p class="result-count" role="status" aria-live="polite">
          @if (hasActive()) {
            <strong>{{ visible().length }} von {{ total }}</strong> Normen
          } @else {
            <strong>{{ total }} Normen</strong>
          }
          <span class="result-breakdown">
            Gezielt auf den Sachkundestoff §34a GewO reduzierte Auswahl.
          </span>
        </p>
      </section>

      @if (groups().length) {
        <div class="families">
          @for (group of groups(); track group.familyId) {
            <section class="ft-section" [attr.aria-label]="group.label">
              <div class="ft-section-head">
                <h2>{{ group.label }}</h2>
                @if (group.description) {
                  <p>{{ group.description }}</p>
                }
              </div>
              <div class="topic-grid">
                @for (topic of group.topics; track topic.id) {
                  <app-topic-card [topic]="topic" (open)="openDetail($event)" />
                }
              </div>
            </section>
          }
        </div>
      } @else {
        <section class="ft-section ft-section--plain">
          <div class="empty-state ft-card" role="status">
            <mat-icon aria-hidden="true">search_off</mat-icon>
            <h2>Keine Treffer</h2>
            <p>
              Für diese Suche und Filterkombination ist keine Norm hinterlegt. Bitte Suche oder
              Filter anpassen.
            </p>
            <button mat-flat-button type="button" (click)="reset()">Filter zurücksetzen</button>
          </div>
        </section>
      }

      <p class="source-note">
        <mat-icon aria-hidden="true">verified</mat-icon>
        <span>
          Fachliche Grundlage: {{ sourceNote.knowledgeBase }} (Rechtsstand
          {{ sourceNote.legalStand }}). Amtliche Gesetzestexte aus „Gesetze im Internet“ (BMJ /
          Bundesamt für Justiz).
        </span>
      </p>
    </div>
  `,
  styles: [
    `
      .intro {
        margin-top: 0.4rem;
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
      .controls-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.75rem;
      }
      .controls-row mat-form-field {
        min-width: 220px;
        flex: 1 1 220px;
      }
      .reset {
        margin-left: auto;
      }
      @media (max-width: 600px) {
        .reset {
          margin-left: 0;
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

      .families {
        display: grid;
        gap: 0.5rem;
      }
      .topic-grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: minmax(0, 1fr);
        align-items: stretch;
      }
      @media (min-width: 720px) {
        .topic-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      @media (min-width: 1080px) {
        .topic-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }

      .empty-state {
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

      .source-note {
        display: flex;
        gap: 0.5rem;
        align-items: flex-start;
        margin: 1.5rem 0 0;
        font-size: 0.85rem;
        color: var(--ft-muted);
      }
      .source-note mat-icon {
        flex: none;
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    `,
  ],
})
export class BgbComponent {
  private readonly service = inject(LearningTopicService);
  private readonly dialog = inject(MatDialog);

  readonly sourceNote = BGB_SOURCE_NOTE;
  readonly coreCategories = this.service.getCoreCategories();
  readonly families = this.service.getBgbFamilies();
  readonly total = this.service.getBgbTopics().length;
  readonly natureOptions: NatureOption[] = (
    ['ANSPRUCH', 'BEFUGNIS', 'RECHTFERTIGUNG', 'ENTSCHULDIGUNG', 'GRUNDLAGE'] as TopicNature[]
  ).map((value) => ({ value, label: TOPIC_NATURE_LABELS[value] }));

  readonly text = signal('');
  readonly natures = signal<TopicNature[]>([]);
  readonly familyId = signal<string | undefined>(undefined);

  private readonly query = computed<TopicQuery>(() => ({
    text: this.text(),
    nature: this.natures(),
    familyId: this.familyId(),
  }));

  readonly visible = computed(() => this.service.query(this.service.getBgbTopics(), this.query()));
  readonly groups = computed(() => this.service.groupByFamily(this.visible(), this.families));
  readonly hasActive = computed(() => this.service.hasActiveQuery(this.query()));

  openDetail(topic: LearningTopic): void {
    const list = this.visible();
    const index = Math.max(
      0,
      list.findIndex((item) => item.id === topic.id),
    );
    this.dialog.open(TopicDetailComponent, {
      data: { topics: list, index },
      width: 'min(94vw, 1160px)',
      maxWidth: '94vw',
      maxHeight: '90vh',
      panelClass: 'topic-dialog',
      autoFocus: 'dialog',
      restoreFocus: true,
    });
  }

  reset(): void {
    this.text.set('');
    this.natures.set([]);
    this.familyId.set(undefined);
  }
}
