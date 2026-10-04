import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OralExamService } from '../../core/services/oral-exam.service';
import {
  ExamQuestionRole,
  ORAL_EXAM_DURATION_SECONDS,
  formatExamClock,
  oralExamTimerLevel,
} from '../../core/models';

const ROLE_LABELS: Record<ExamQuestionRole, string> = {
  HAUPTFRAGE: 'Hauptfrage',
  FOLGEFRAGE_1: 'Folgefrage 1',
  FOLGEFRAGE_2: 'Folgefrage 2',
};

/** Antwortbuchstaben für die Optionen (rein visuell). */
const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E'];

/**
 * Durchführung der mündlichen Prüfungssimulation.
 *
 * Zeigt immer eine Frage mit fünf Antwortmöglichkeiten. Die Antworten werden
 * sofort im Dienst gespeichert; zwischen den Fragen kann vor- und zurück
 * navigiert werden. Erst die letzte Frage gibt die Prüfung zur Auswertung frei.
 */
@Component({
  selector: 'app-oral-exam-run',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    MatProgressBarModule,
  ],
  template: `
    @if (currentQuestion(); as question) {
      <div class="ft-container page">
        <header class="run-head">
          <div class="run-meta">
            <span class="topic-position">Themengebiet {{ topicPosition() }} von {{ topicCount() }}</span>
            <div class="run-meta-right">
              <span class="position">Frage {{ index() + 1 }} von {{ total() }}</span>
              <span
                class="exam-timer"
                [class.warning]="timerLevel() === 'warning'"
                [class.critical]="timerLevel() === 'critical'"
                [class.danger]="timerLevel() === 'danger'"
                [class.expired]="timerLevel() === 'expired'"
                role="timer"
                [attr.aria-label]="'Verbleibende Prüfungszeit: ' + timerLabel()"
              >
                <mat-icon aria-hidden="true">timer</mat-icon>
                <span class="timer-value">{{ timerLabel() }}</span>
              </span>
            </div>
          </div>
          <mat-progress-bar
            mode="determinate"
            [value]="progress()"
            [attr.aria-label]="'Fortschritt: ' + answered() + ' von ' + total() + ' beantwortet'"
          ></mat-progress-bar>
        </header>

        <mat-card appearance="outlined" class="question-card">
          <mat-card-header class="question-head">
            <div class="question-meta">
              <span class="meta-topic">{{ question.categoryLabel }}</span>
              <span class="meta-difficulty">Schwierigkeit {{ question.difficulty }}</span>
              <span class="meta-role">{{ roleLabel() }}</span>
            </div>
            <mat-card-title class="question-title">{{ question.question }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-radio-group
              class="options"
              [value]="selectedOptionId() ?? ''"
              (change)="select($event.value)"
              [disabled]="isLocked()"
              [attr.aria-label]="question.question"
            >
              @for (option of question.options; track option.id; let i = $index) {
                <mat-radio-button
                  class="option"
                  [class.selected]="selectedOptionId() === option.id"
                  [value]="option.id"
                >
                  <span class="option-letter" aria-hidden="true">{{ letter(i) }}</span>
                  <span class="option-text">{{ option.text }}</span>
                </mat-radio-button>
              }
            </mat-radio-group>
          </mat-card-content>
        </mat-card>

        @if (isLocked()) {
          <p class="timeout-note" role="status">
            <mat-icon aria-hidden="true">timer_off</mat-icon>
            Prüfung wegen Zeitablauf beendet.
          </p>
        }

        <nav class="run-actions" aria-label="Prüfungsnavigation">
          <button
            mat-stroked-button
            type="button"
            (click)="previous()"
            [disabled]="isFirst() || isLocked()"
          >
            <mat-icon aria-hidden="true">arrow_back</mat-icon>
            Zurück
          </button>
          @if (isLast()) {
            <button
              mat-flat-button
              color="primary"
              type="button"
              (click)="submit()"
              [disabled]="!canSubmit()"
            >
              Prüfung abgeben
              <mat-icon aria-hidden="true">flag</mat-icon>
            </button>
          } @else {
            <button
              mat-flat-button
              color="primary"
              type="button"
              (click)="next()"
              [disabled]="!hasAnswered() || isLocked()"
            >
              Weiter
              <mat-icon aria-hidden="true">arrow_forward</mat-icon>
            </button>
          }
        </nav>
      </div>
    }
  `,
  styles: [
    `
      .page {
        padding-block: 1.5rem 3rem;
        display: grid;
        gap: 1.35rem;
        max-width: 860px;
      }
      .run-head {
        display: grid;
        gap: 0.65rem;
        padding: 0.9rem 1.1rem;
        border: 1px solid var(--ft-glass-border);
        border-radius: var(--ft-radius);
        background: var(--ft-glass-surface);
        backdrop-filter: blur(var(--ft-blur-glass)) saturate(140%);
        -webkit-backdrop-filter: blur(var(--ft-blur-glass)) saturate(140%);
        box-shadow: var(--ft-elevation-1);
      }
      .run-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .run-meta-right {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .topic-position {
        font-weight: 700;
        font-size: 0.98rem;
      }
      .position {
        color: var(--ft-muted);
        font-size: 0.9rem;
        margin: 0;
      }
      /* Timer: kleine Glass-Capsule oben rechts, Material-Elevation. */
      .exam-timer {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.3rem 0.8rem;
        border-radius: 999px;
        border: 1px solid var(--ft-glass-border);
        background: var(--ft-glass-strong);
        backdrop-filter: blur(var(--ft-blur-soft)) saturate(140%);
        -webkit-backdrop-filter: blur(var(--ft-blur-soft)) saturate(140%);
        font-variant-numeric: tabular-nums;
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.4;
        box-shadow: var(--ft-elevation-1);
        transition:
          border-color var(--ft-motion),
          background-color var(--ft-motion),
          color var(--ft-motion);
      }
      .exam-timer mat-icon {
        font-size: 1.1rem;
        width: 1.1rem;
        height: 1.1rem;
        color: var(--ft-muted);
      }
      .exam-timer.warning {
        border-color: var(--ft-accent);
        color: var(--ft-accent-strong);
      }
      .exam-timer.warning mat-icon {
        color: var(--ft-accent-strong);
      }
      .exam-timer.critical {
        border-color: var(--ft-danger-border);
        background: var(--ft-danger-surface);
        color: var(--ft-danger-text);
      }
      .exam-timer.critical mat-icon {
        color: var(--ft-danger-text);
      }
      .exam-timer.danger {
        border-color: var(--ft-danger);
        background: var(--ft-danger-surface);
        color: var(--ft-danger-text);
        animation: timer-pulse 1.6s ease-in-out infinite;
      }
      .exam-timer.danger mat-icon {
        color: var(--ft-danger-text);
      }
      .exam-timer.expired {
        border-color: var(--ft-danger);
        background: var(--ft-danger);
        color: #fff;
      }
      .exam-timer.expired mat-icon {
        color: #fff;
      }
      @keyframes timer-pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.68;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .exam-timer.danger {
          animation: none;
        }
      }
      .timeout-note {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        margin: 0;
        padding: 0.7rem 0.9rem;
        border-radius: var(--ft-radius-sm);
        background: var(--ft-danger-surface);
        color: var(--ft-danger-text);
        font-weight: 600;
      }
      .question-card {
        border-radius: var(--ft-radius-lg);
      }
      .question-head {
        display: block;
      }
      .question-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem 0.75rem;
        margin-bottom: 0.7rem;
      }
      .meta-topic,
      .meta-difficulty,
      .meta-role {
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        border-radius: 999px;
        padding: 0.22rem 0.65rem;
        line-height: 1.4;
      }
      .meta-topic {
        background: var(--ft-primary-soft);
        color: var(--ft-text);
      }
      .meta-difficulty {
        background: var(--ft-surface-2);
        border: 1px solid var(--ft-border);
        color: var(--ft-text);
      }
      .meta-role {
        color: var(--ft-accent-strong);
      }
      .question-title {
        font-size: clamp(1.2rem, 2.4vw, 1.45rem);
        line-height: 1.45;
        white-space: normal;
      }
      .options {
        display: grid;
        gap: 0.6rem;
        margin-top: 1.15rem;
      }
      /* Jede Antwort als große, klickbare Fläche. */
      .option {
        display: flex;
        align-items: flex-start;
        width: 100%;
        border: 1px solid var(--ft-border);
        border-radius: var(--ft-radius);
        padding: 0.95rem 1.1rem;
        background: var(--ft-surface);
        transition:
          border-color var(--ft-motion),
          background-color var(--ft-motion),
          box-shadow var(--ft-motion);
      }
      .option:hover {
        border-color: var(--ft-border-strong);
        background: var(--ft-surface-2);
      }
      .option.selected {
        border-color: var(--ft-accent);
        background: var(--ft-accent-soft);
        box-shadow: 0 0 0 1px var(--ft-accent) inset;
      }
      .option-letter {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        flex: 0 0 auto;
        margin-right: 0.85rem;
        border-radius: 50%;
        background: var(--ft-surface-2);
        border: 1px solid var(--ft-border);
        font-weight: 700;
        font-size: 0.85rem;
        color: var(--ft-muted);
      }
      .option.selected .option-letter {
        background: var(--ft-accent);
        border-color: var(--ft-accent);
        color: var(--ft-on-accent);
      }
      .option-text {
        white-space: normal;
        line-height: 1.55;
        padding-top: 0.15rem;
      }
      .run-actions {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
      }
      /* Radio-Kreis visuell ausblenden, aber fokussierbar halten (A11y). */
      :host ::ng-deep .option .mdc-form-field {
        width: 100%;
        align-items: flex-start;
      }
      :host ::ng-deep .option .mdc-radio {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
        border: 0;
        opacity: 0;
      }
      :host ::ng-deep .option .mdc-label {
        padding-left: 0;
        width: 100%;
      }
      .option {
        position: relative;
      }
      .option:focus-within {
        outline: 3px solid var(--ft-accent);
        outline-offset: 2px;
      }
      @media (max-width: 560px) {
        .run-meta {
          gap: 0.5rem;
        }
        .run-meta-right {
          width: 100%;
          justify-content: space-between;
        }
        .option {
          padding: 0.85rem 0.9rem;
        }
      }
    `,
  ],
})
export class OralExamRunComponent {
  private readonly examService = inject(OralExamService);
  private readonly router = inject(Router);

  readonly index = signal(0);
  readonly total = this.examService.totalCount;
  readonly answered = this.examService.answeredCount;
  readonly isLocked = this.examService.isLocked;
  readonly selectedOptionId = computed(() => {
    const question = this.currentQuestion();
    return question ? this.examService.selectedOptionId(question.id) : undefined;
  });

  readonly timerLabel = computed(() =>
    formatExamClock(this.examService.remainingSeconds()),
  );
  readonly timerLevel = computed(() =>
    oralExamTimerLevel(this.examService.remainingSeconds()),
  );

  constructor() {
    if (!this.examService.exam()) {
      this.examService.start();
    }
    // Nach Zeitablauf (oder regulärem Ende) automatisch zur Auswertung.
    effect(() => {
      if (this.examService.isFinished()) {
        void this.router.navigate(['/pruefungssimulation/auswertung']);
      }
    });
  }

  readonly currentQuestion = computed(() => {
    const exam = this.examService.exam();
    return exam ? exam.questions[this.index()] : undefined;
  });

  readonly progress = computed(() =>
    this.total() === 0 ? 0 : Math.round((this.answered() / this.total()) * 100),
  );

  readonly topicCount = computed(() => this.examService.exam()?.topics.length ?? 0);

  readonly topicPosition = computed(() => {
    const question = this.currentQuestion();
    if (!question) {
      return 0;
    }
    const topics = this.examService.exam()?.topics ?? [];
    return topics.findIndex((topic) => topic.category === question.category) + 1;
  });

  isFirst(): boolean {
    return this.index() === 0;
  }

  isLast(): boolean {
    return this.index() === this.total() - 1;
  }

  hasAnswered(): boolean {
    return this.selectedOptionId() !== undefined;
  }

  canSubmit(): boolean {
    return this.examService.isComplete();
  }

  roleLabel(): string {
    const question = this.currentQuestion();
    return question ? ROLE_LABELS[question.role] : '';
  }

  letter(index: number): string {
    return OPTION_LETTERS[index] ?? '';
  }

  select(optionId: string): void {
    if (this.isLocked()) {
      return;
    }
    const question = this.currentQuestion();
    if (question) {
      this.examService.answer(question.id, optionId);
    }
  }

  previous(): void {
    if (this.isLocked()) {
      return;
    }
    this.index.update((value) => Math.max(0, value - 1));
  }

  next(): void {
    if (this.isLocked() || !this.hasAnswered()) {
      return;
    }
    this.index.update((value) => Math.min(this.total() - 1, value + 1));
  }

  submit(): void {
    if (!this.canSubmit()) {
      return;
    }
    this.examService.finish(Date.now(), false);
    void this.router.navigate(['/pruefungssimulation/auswertung']);
  }
}
