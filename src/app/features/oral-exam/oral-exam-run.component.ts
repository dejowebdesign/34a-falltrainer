import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OralExamService } from '../../core/services/oral-exam.service';
import { ExamQuestionRole } from '../../core/models';

const ROLE_LABELS: Record<ExamQuestionRole, string> = {
  HAUPTFRAGE: 'Hauptfrage',
  FOLGEFRAGE_1: 'Folgefrage 1',
  FOLGEFRAGE_2: 'Folgefrage 2',
};

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
            <span class="position">Frage {{ index() + 1 }} von {{ total() }}</span>
          </div>
          <mat-progress-bar
            mode="determinate"
            [value]="progress()"
            [attr.aria-label]="'Fortschritt: ' + answered() + ' von ' + total() + ' beantwortet'"
          ></mat-progress-bar>
          <p class="answered">{{ answered() }} von {{ total() }} Fragen beantwortet</p>
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
              [attr.aria-label]="question.question"
            >
              @for (option of question.options; track option.id) {
                <mat-radio-button class="option" [value]="option.id">
                  <span class="option-text">{{ option.text }}</span>
                </mat-radio-button>
              }
            </mat-radio-group>
          </mat-card-content>
        </mat-card>

        <nav class="run-actions" aria-label="Prüfungsnavigation">
          <button
            mat-stroked-button
            type="button"
            (click)="previous()"
            [disabled]="isFirst()"
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
              [disabled]="!hasAnswered()"
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
        gap: 1.25rem;
        max-width: 820px;
      }
      .run-head {
        display: grid;
        gap: 0.5rem;
      }
      .run-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .topic-position {
        font-weight: 700;
        font-size: 0.95rem;
      }
      .position,
      .answered {
        color: var(--ft-muted);
        font-size: 0.9rem;
        margin: 0;
      }
      .question-card {
        border-radius: 14px;
      }
      .question-head {
        display: block;
      }
      .question-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem 0.75rem;
        margin-bottom: 0.6rem;
      }
      .meta-topic,
      .meta-difficulty,
      .meta-role {
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        border-radius: 999px;
        padding: 0.2rem 0.6rem;
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
        color: var(--ft-accent);
      }
      .question-title {
        font-size: 1.3rem;
        line-height: 1.4;
        white-space: normal;
      }
      .options {
        display: grid;
        gap: 0.5rem;
        margin-top: 1rem;
      }
      .option {
        display: block;
        border: 1px solid var(--ft-border);
        border-radius: 12px;
        padding: 0.75rem 0.9rem;
        background: var(--ft-surface-2);
      }
      .option-text {
        white-space: normal;
        line-height: 1.5;
      }
      .run-actions {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
      }
      :host ::ng-deep .option .mdc-form-field {
        width: 100%;
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
  readonly selectedOptionId = computed(() => {
    const question = this.currentQuestion();
    return question ? this.examService.selectedOptionId(question.id) : undefined;
  });

  constructor() {
    if (!this.examService.exam()) {
      this.examService.start();
    }
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

  select(optionId: string): void {
    const question = this.currentQuestion();
    if (question) {
      this.examService.answer(question.id, optionId);
    }
  }

  previous(): void {
    this.index.update((value) => Math.max(0, value - 1));
  }

  next(): void {
    if (this.hasAnswered()) {
      this.index.update((value) => Math.min(this.total() - 1, value + 1));
    }
  }

  submit(): void {
    if (this.canSubmit()) {
      void this.router.navigate(['/pruefungssimulation/auswertung']);
    }
  }
}
