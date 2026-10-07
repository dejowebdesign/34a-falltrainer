import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { LearningTopic } from '../../core/models';
import { TOPIC_NATURE_LABELS, TOPIC_RELEVANCE_LABELS } from '../../core/services/learning-topic.service';

/** Datenübergabe an das Lernkarten-Modal: Liste und Startindex. */
export interface TopicDialogData {
  topics: LearningTopic[];
  index: number;
}

/**
 * Großes Detail-Modal einer Lernkarte (BGB / Jedermannsrechte).
 *
 * Aufbau nach Auftrag: Kopf mit Paragraph, offiziellem Titel und Kernmerkmalen,
 * dann „Kurz erklärt“, „Worum geht es?“, Voraussetzungen, Wer darf handeln?,
 * Gegen wen/wogegen?, Grenzen, Prüfungshinweis, typische Situation und
 * Abgrenzung. Der amtliche Wortlaut wird nur gezeigt, wenn er verifiziert
 * vorliegt; sonst wird ausdrücklich als fehlend markiert.
 */
@Component({
  selector: 'app-topic-detail',
  imports: [MatButtonModule, MatChipsModule, MatDialogModule, MatDividerModule, MatIconModule],
  template: `
    <header class="detail-head">
      <div class="head-main">
        <span class="head-paragraph">{{ paragraphLabel() }}</span>
        <h2 class="head-title" id="topic-dialog-title">{{ topic().officialTitle }}</h2>
        @if (topic().fachlicheEinordnung) {
          <span class="head-einordnung">{{ topic().fachlicheEinordnung }}</span>
        }
        <div class="head-chips">
          <span class="ft-chip" [class.ft-chip--accent]="isCore()">{{ natureLabel }}</span>
          <span class="ft-chip">{{ topic().area }}</span>
          <span class="ft-chip" [class.ft-chip--star]="isCore()">{{ relevanceLabel }}</span>
        </div>
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
      <section class="block kurz" aria-label="Kurz erklärt">
        <h3>Kurz erklärt</h3>
        <p>{{ topic().shortExplanation }}</p>
      </section>

      <section class="block" aria-label="Worum geht es">
        <h3>Worum geht es?</h3>
        <p>{{ topic().purpose }}</p>
      </section>

      <section class="block" aria-label="Voraussetzungen">
        <h3>Voraussetzungen</h3>
        <ul class="points">
          @for (point of topic().prerequisites; track point.label) {
            <li>
              <span class="point-label">{{ point.label }}</span>
              @if (point.detail) {
                <span class="point-detail">{{ point.detail }}</span>
              }
            </li>
          }
        </ul>
      </section>

      <div class="split">
        <section class="block" aria-label="Wer darf handeln">
          <h3>Wer darf handeln?</h3>
          <p>{{ topic().whoActs }}</p>
        </section>
        <section class="block" aria-label="Gegen wen oder wogegen">
          <h3>Gegen wen / wogegen?</h3>
          <p>{{ topic().againstWhom }}</p>
        </section>
      </div>

      <section class="block limits" aria-label="Grenzen">
        <h3>Grenzen</h3>
        <ul>
          @for (limit of topic().limits; track limit) {
            <li>{{ limit }}</li>
          }
        </ul>
      </section>

      <section class="block exam" aria-label="Prüfungshinweis">
        <mat-icon aria-hidden="true">school</mat-icon>
        <div>
          <h3>Prüfungshinweis</h3>
          <p>{{ topic().examHint }}</p>
        </div>
      </section>

      <section class="block" aria-label="Typische Situation">
        <h3>Typische Situation</h3>
        <p>{{ topic().typicalSituation }}</p>
      </section>

      @if (topic().distinctions.length) {
        <section class="block" aria-label="Abgrenzung">
          <h3>Abgrenzung</h3>
          <ul class="points">
            @for (point of topic().distinctions; track point.label) {
              <li>
                <span class="point-label">{{ point.label }}</span>
                @if (point.detail) {
                  <span class="point-detail">{{ point.detail }}</span>
                }
              </li>
            }
          </ul>
        </section>
      }

      <section class="block official" aria-label="Amtlicher Gesetzeswortlaut">
        <h3>Amtlicher Wortlaut</h3>
        @if (topic().officialText) {
          <p class="official-text">{{ topic().officialText }}</p>
        } @else {
          <p class="missing">
            <mat-icon aria-hidden="true">info</mat-icon>
            <span>
              Kein amtlicher Wortlaut in der Knowledge Base V5.3.1 hinterlegt – als fehlend
              markiert. Es wird bewusst nichts ergänzt.
            </span>
          </p>
        }
        <a class="source" [href]="topic().sourceUrl" target="_blank" rel="noopener noreferrer">
          Amtliche Quelle
          <mat-icon aria-hidden="true">open_in_new</mat-icon>
        </a>
      </section>
    </div>

    @if (topics().length > 1) {
      <footer class="detail-foot">
        <button mat-button type="button" class="nav-button" [disabled]="!hasPrev()" (click)="prev()">
          <mat-icon aria-hidden="true">chevron_left</mat-icon>
          Zurück
        </button>
        <span class="nav-position">{{ index() + 1 }} / {{ topics().length }}</span>
        <button mat-button type="button" class="nav-button" [disabled]="!hasNext()" (click)="next()">
          Weiter
          <mat-icon aria-hidden="true">chevron_right</mat-icon>
        </button>
      </footer>
    }
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
        justify-content: space-between;
        gap: 1rem;
        padding: 1.35rem 1.6rem 1.1rem;
        background: var(--ft-glass);
        backdrop-filter: blur(12px);
      }
      .head-main {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        min-width: 0;
      }
      .head-paragraph {
        font-weight: 700;
        color: var(--ft-accent-strong);
      }
      .head-title {
        margin: 0;
        font-size: 1.5rem;
        line-height: 1.25;
      }
      .head-einordnung {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--ft-muted);
      }
      .head-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
        margin-top: 0.2rem;
      }
      .head-chips .ft-chip {
        text-transform: none;
      }
      .head-close {
        flex: none;
      }

      .detail-body {
        overflow-y: auto;
        padding: 1.2rem 1.6rem 1.6rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .detail-body h3 {
        margin: 0 0 0.4rem;
        font-size: 0.98rem;
      }
      .detail-body p {
        margin: 0;
        line-height: 1.65;
      }
      .detail-body ul {
        margin: 0;
        padding-left: 1.2rem;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        line-height: 1.6;
      }

      .block {
        padding: 1rem 1.1rem;
        border: 1px solid var(--ft-border);
        border-radius: var(--ft-radius);
        background: var(--ft-surface);
      }
      .kurz {
        background: var(--ft-surface-2);
      }
      .split {
        display: grid;
        gap: 1rem;
        grid-template-columns: minmax(0, 1fr);
      }
      @media (min-width: 720px) {
        .split {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      .points {
        list-style: none;
        padding-left: 0;
      }
      .points li {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
      }
      .point-label {
        font-weight: 600;
      }
      .point-detail {
        font-size: 0.88rem;
        color: var(--ft-muted);
      }

      .limits {
        border-color: var(--ft-border-strong);
      }

      .exam {
        display: flex;
        gap: 0.7rem;
        align-items: flex-start;
        border-color: var(--ft-accent);
        background: var(--ft-glass);
      }
      .exam mat-icon {
        flex: none;
        color: var(--ft-accent-strong);
      }
      .exam h3 {
        color: var(--ft-accent-strong);
      }

      .official {
        background: var(--ft-surface-2);
      }
      .official-text {
        font-style: italic;
      }
      .missing {
        display: flex;
        gap: 0.5rem;
        align-items: flex-start;
        color: var(--ft-muted);
      }
      .missing mat-icon {
        flex: none;
        font-size: 18px;
        width: 18px;
        height: 18px;
        margin-top: 0.15rem;
      }
      .source {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        margin-top: 0.6rem;
        color: var(--ft-primary);
        font-weight: 600;
      }
      .source mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }

      .detail-foot {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        padding: 0.6rem 1.2rem;
        border-top: 1px solid var(--ft-border);
        background: var(--ft-glass);
      }
      .nav-position {
        font-size: 0.85rem;
        color: var(--ft-muted);
        font-variant-numeric: tabular-nums;
      }
    `,
  ],
})
export class TopicDetailComponent {
  private readonly data = inject<TopicDialogData>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<TopicDetailComponent>);

  readonly topics = signal<LearningTopic[]>(this.data.topics);
  readonly index = signal(Math.max(0, this.data.index));

  readonly topic = computed(() => this.topics()[this.index()]);
  readonly hasPrev = computed(() => this.index() > 0);
  readonly hasNext = computed(() => this.index() < this.topics().length - 1);

  get natureLabel(): string {
    return TOPIC_NATURE_LABELS[this.topic().nature];
  }

  get relevanceLabel(): string {
    return TOPIC_RELEVANCE_LABELS[this.topic().relevance];
  }

  isCore(): boolean {
    return this.topic().relevance === 'CORE_34A';
  }

  paragraphLabel(): string {
    const topic = this.topic();
    return [topic.paragraph, topic.absatz, topic.law].filter(Boolean).join(' ');
  }

  prev(): void {
    if (this.hasPrev()) {
      this.index.update((value) => value - 1);
    }
  }

  next(): void {
    if (this.hasNext()) {
      this.index.update((value) => value + 1);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
