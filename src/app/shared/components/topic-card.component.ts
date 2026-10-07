import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LearningTopic } from '../../core/models';
import { TOPIC_NATURE_LABELS } from '../../core/services/learning-topic.service';

/**
 * Kompakte Lernkarte einer einzelnen Norm (BGB / Jedermannsrechte).
 *
 * Die Karte zeigt nur Paragraph, offiziellen Titel und eine kurze
 * Zusammenfassung und öffnet per Klick das große Detail-Modal. Der vollständige
 * Lernstoff bleibt bewusst im Modal – die Liste dient dem schnellen Finden.
 */
@Component({
  selector: 'app-topic-card',
  imports: [MatIconModule],
  template: `
    <button
      type="button"
      class="topic-card"
      [attr.aria-label]="'Details zu ' + paragraphLabel + ' ' + topic.officialTitle + ' öffnen'"
      (click)="open.emit(topic)"
    >
      <span class="card-top">
        <span class="card-paragraph">{{ paragraphLabel }}</span>
        @if (isCore) {
          <span class="card-star" aria-hidden="true">
            <mat-icon>star</mat-icon>
          </span>
        }
      </span>

      <span class="card-title">{{ topic.officialTitle }}</span>
      @if (topic.fachlicheEinordnung) {
        <span class="card-einordnung">{{ topic.fachlicheEinordnung }}</span>
      }

      <span class="card-chips">
        <span class="ft-chip" [class.ft-chip--accent]="isCore">{{ natureLabel }}</span>
        <span class="ft-chip">{{ topic.area }}</span>
      </span>

      <span class="card-summary">{{ topic.summary }}</span>

      <span class="card-cta">
        Mehr erfahren
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
      .topic-card {
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
      .topic-card:hover {
        transform: translateY(-3px);
        box-shadow: var(--ft-elevation-3);
        border-color: var(--ft-border-strong);
      }
      .topic-card:focus-visible {
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
      .card-einordnung {
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--ft-muted);
      }

      .card-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
      }
      .card-chips .ft-chip {
        text-transform: none;
        letter-spacing: 0.02em;
      }

      .card-summary {
        margin-top: 0.15rem;
        font-size: 0.92rem;
        line-height: 1.55;
        color: var(--ft-text);
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
      .topic-card:hover .card-cta mat-icon {
        transform: translateX(3px);
      }
    `,
  ],
})
export class TopicCardComponent {
  @Input({ required: true }) topic!: LearningTopic;
  @Output() open = new EventEmitter<LearningTopic>();

  get paragraphLabel(): string {
    return [this.topic.paragraph, this.topic.absatz, this.topic.law].filter(Boolean).join(' ');
  }

  get natureLabel(): string {
    return TOPIC_NATURE_LABELS[this.topic.nature];
  }

  get isCore(): boolean {
    return this.topic.relevance === 'CORE_34A';
  }
}
