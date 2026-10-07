import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { LearningTopic, TopicNature } from '../../core/models';
import {
  LearningTopicService,
  TOPIC_NATURE_LABELS,
  TopicQuery,
} from '../../core/services/learning-topic.service';
import { AuthorityMatrixComponent } from '../../shared/components/authority-matrix.component';
import { CoreCategoriesComponent } from '../../shared/components/core-categories.component';
import { TopicCardComponent } from '../../shared/components/topic-card.component';
import { TopicDetailComponent } from '../../shared/components/topic-detail.component';

interface NatureOption {
  value: TopicNature;
  label: string;
}

/**
 * Lernseite „Jedermannsrechte“.
 *
 * Behandelt nur die für die Sachkunde §34a GewO relevanten Jedermannsrechte und
 * Rechtfertigungs-/Entschuldigungsgründe: §127 Abs. 1 StPO sowie §§32–35 StGB.
 * Bewusst keine allgemeine Polizeirechts- oder StPO-Seite.
 *
 * Die Seite verlinkt auf die unmittelbar zugehörigen BGB-Normen der BGB-Seite
 * und dupliziert diese nicht mit eigener Volltext-Erklärung.
 */
@Component({
  selector: 'app-jedermannsrechte',
  imports: [
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    AuthorityMatrixComponent,
    CoreCategoriesComponent,
    TopicCardComponent,
  ],
  template: `
    <div class="ft-container ft-page">
      <header class="ft-page-head">
        <span class="ft-eyebrow">Lernseite</span>
        <h1>Jedermannsrechte</h1>
        <p>
          Welche Rechte und Rechtfertigungsgründe stehen Privatpersonen unter gesetzlichen
          Voraussetzungen zu?
        </p>
        <p class="intro">
          Diese Seite behandelt ausschließlich die für die Sachkunde relevanten Jedermannsrechte und
          Rechtfertigungs-/Entschuldigungsgründe. Sie ist keine allgemeine Polizeirechts- oder
          StPO-Seite: Im Mittelpunkt steht die vorläufige Festnahme nach §127 Abs. 1 StPO sowie
          Notwehr und Notstand nach §§32–35 StGB.
        </p>
      </header>

      <section class="ft-section" aria-label="Anspruch, Befugnis, Rechtfertigung, Entschuldigung">
        <app-core-categories [categories]="coreCategories" />
      </section>

      <section class="ft-section" aria-label="Welches Recht könnte greifen">
        <app-authority-matrix [rows]="matrix" (openNorm)="openNorm($event)" />
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
              aria-label="Jedermannsrechte durchsuchen"
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
            <strong>{{ visible().length }} von {{ total }}</strong> Lernkarten
          } @else {
            <strong>{{ total }} Lernkarten</strong>
          }
          <span class="result-breakdown">
            Nur sachkunderelevante Jedermannsrechte und Rechtfertigungs-/Entschuldigungsgründe.
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
              Für diese Suche und Filterkombination ist keine Lernkarte hinterlegt. Bitte Suche oder
              Filter anpassen.
            </p>
            <button mat-flat-button type="button" (click)="reset()">Filter zurücksetzen</button>
          </div>
        </section>
      }

      <section class="ft-section" aria-label="Zugehörige BGB-Normen">
        <div class="ft-section-head">
          <h2>Verbindung zum BGB</h2>
          <p>
            Die zivilrechtliche Einordnung dieser Normen steht auf der BGB-Seite – hier steht die
            praktische Frage „Darf ich eingreifen?“. Dieselbe Norm wird nicht doppelt erklärt.
          </p>
        </div>
        <ul class="bgb-links">
          @for (link of bgbLinks; track link.normId) {
            <li>
              <a class="bgb-link" routerLink="/bgb">
                {{ link.label }}
                <mat-icon aria-hidden="true">arrow_forward</mat-icon>
              </a>
            </li>
          }
        </ul>
      </section>

      <p class="source-note">
        <mat-icon aria-hidden="true">verified</mat-icon>
        <span>
          Fachliche Grundlage: § 34a Legal Knowledge Base V5.3.1 (Rechtsstand 01.10.2026). Amtliche
          Gesetzestexte aus „Gesetze im Internet“ (BMJ / Bundesamt für Justiz).
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

      .bgb-links {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
      }
      .bgb-link {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.55rem 0.9rem;
        border: 1px solid var(--ft-border-strong);
        border-radius: 999px;
        background: var(--ft-surface);
        color: var(--ft-text);
        font-weight: 600;
        text-decoration: none;
        transition:
          border-color var(--ft-transition),
          color var(--ft-transition);
      }
      .bgb-link:hover {
        border-color: var(--ft-accent);
        color: var(--ft-accent-strong);
      }
      .bgb-link mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
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
export class JedermannsrechteComponent {
  private readonly service = inject(LearningTopicService);
  private readonly dialog = inject(MatDialog);

  readonly coreCategories = this.service.getCoreCategories();
  readonly matrix = this.service.getAuthorityMatrix();
  readonly bgbLinks = this.service.getBgbLinks();
  readonly families = this.service.getJedermannsrechteFamilies();
  readonly total = this.service.getJedermannsrechteTopics().length;
  readonly natureOptions: NatureOption[] = (
    ['ANSPRUCH', 'BEFUGNIS', 'RECHTFERTIGUNG', 'ENTSCHULDIGUNG', 'GRUNDLAGE'] as TopicNature[]
  ).map((value) => ({ value, label: TOPIC_NATURE_LABELS[value] }));

  /** Alle Lernkarten beider Seiten – Basis für die Modal-Navigation via Matrix. */
  private readonly allTopics = computed<LearningTopic[]>(() => [
    ...this.service.getJedermannsrechteTopics(),
    ...this.service.getBgbTopics(),
  ]);

  readonly text = signal('');
  readonly natures = signal<TopicNature[]>([]);
  readonly familyId = signal<string | undefined>(undefined);

  private readonly query = computed<TopicQuery>(() => ({
    text: this.text(),
    nature: this.natures(),
    familyId: this.familyId(),
  }));

  readonly visible = computed(() =>
    this.service.query(this.service.getJedermannsrechteTopics(), this.query()),
  );
  readonly groups = computed(() => this.service.groupByFamily(this.visible(), this.families));
  readonly hasActive = computed(() => this.service.hasActiveQuery(this.query()));

  openDetail(topic: LearningTopic): void {
    this.openIn(this.visible(), topic.id);
  }

  openNorm(normId: string): void {
    this.openIn(this.allTopics(), normId);
  }

  reset(): void {
    this.text.set('');
    this.natures.set([]);
    this.familyId.set(undefined);
  }

  private openIn(list: LearningTopic[], id: string): void {
    const index = list.findIndex((item) => item.id === id);
    if (index < 0) {
      return;
    }
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
}
