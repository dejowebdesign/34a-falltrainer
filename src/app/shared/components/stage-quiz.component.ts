import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { StageEvaluation, StageOption } from '../../core/models';
import { VerdictBadgeComponent } from './verdict-badge.component';

/**
 * Wiederverwendbare Stufenansicht: Frage, Optionen, Feedback.
 *
 * Die juristische Logik liegt nicht im Template, sondern in den übergebenen
 * Optionen und der Auswertung der Fallengine.
 */
@Component({
  selector: 'app-stage-quiz',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    FormsModule,
    VerdictBadgeComponent,
  ],
  template: `
    <mat-card appearance="outlined" class="quiz-card">
      <mat-card-header>
        <mat-card-title>{{ heading() }}</mat-card-title>
        <mat-card-subtitle>{{ prompt() }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        @if (allowMultiple()) {
          <p class="hint">
            <mat-icon aria-hidden="true">checklist</mat-icon>
            Mehrere Antworten können zutreffen.
          </p>
        } @else {
          <p class="hint">
            <mat-icon aria-hidden="true">checklist</mat-icon>
            Wählen Sie die zutreffende Antwort.
          </p>
        }

        <div role="group" [attr.aria-label]="prompt()" class="options">
          @for (option of options(); track option.id) {
            <div
              class="option"
              [class.selected]="isSelected(option.id)"
              [class.verdict-ok]="submitted() && option.verdict === 'RICHTIG'"
              [class.verdict-partial]="submitted() && option.verdict === 'TEILWEISE_RICHTIG'"
              [class.verdict-bad]="submitted() && option.verdict === 'FALSCH'"
            >
              <div class="option-control">
                @if (allowMultiple()) {
                  <mat-checkbox
                    [checked]="isSelected(option.id)"
                    [disabled]="submitted()"
                    (change)="toggle(option.id)"
                    [attr.aria-label]="option.text"
                  />
                } @else {
                  <mat-radio-button
                    [checked]="isSelected(option.id)"
                    [disabled]="submitted()"
                    (change)="select(option.id)"
                    [attr.aria-label]="option.text"
                  />
                }
              </div>
              <div class="option-body">
                <p class="option-text">
                  @if (levelLabel(option); as level) {
                    <span class="level-chip">{{ level }}</span>
                  }
                  {{ option.text }}
                </p>
                @if (submitted()) {
                  <div class="option-feedback">
                    <app-verdict-badge [verdict]="option.verdict" />
                    <p class="explanation">{{ option.explanation }}</p>
                    @if (option.verdict !== 'RICHTIG' && option.misconception) {
                      <p class="misconception">
                        <mat-icon aria-hidden="true">lightbulb</mat-icon>
                        <span><strong>Denkfehler:</strong> {{ option.misconception }}</span>
                      </p>
                    }
                    @if (normsFor(option).length) {
                      <p class="norms">
                        <mat-icon aria-hidden="true">menu_book</mat-icon>
                        <span>{{ normsFor(option).join(' · ') }}</span>
                      </p>
                    }
                  </div>
                }
              </div>
            </div>
          }
        </div>

        @if (submitted() && evaluation(); as evalResult) {
          <div
            class="stage-summary"
            [class]="'summary-' + evalResult.verdict"
            role="status"
            aria-live="polite"
          >
            <app-verdict-badge [verdict]="evalResult.verdict" />
            <p>{{ evalResult.explanation }}</p>
            <p class="score-line">
              {{ evalResult.correctCount }} richtig · {{ evalResult.partialCount }} teilweise richtig ·
              {{ evalResult.wrongCount }} falsch · {{ evalResult.missedCount }} übersehen
            </p>
          </div>
        }
      </mat-card-content>
      <mat-card-actions align="end">
        @if (!submitted()) {
          <button
            mat-flat-button
            color="primary"
            [disabled]="selectedIds().length === 0"
            (click)="submit.emit()"
          >
            Antwort prüfen
          </button>
        } @else {
          <button mat-flat-button color="primary" (click)="next.emit()">
            {{ nextLabel() }}
            <mat-icon aria-hidden="true">arrow_forward</mat-icon>
          </button>
        }
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      .quiz-card {
        border-radius: 14px;
      }
      .hint {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        color: var(--ft-muted);
        font-size: 0.88rem;
        margin: 0.25rem 0 1rem;
      }
      .hint mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
      .options {
        display: grid;
        gap: 0.65rem;
      }
      .option {
        display: flex;
        gap: 0.5rem;
        align-items: flex-start;
        padding: 0.85rem;
        border: 1px solid var(--ft-border);
        border-radius: 12px;
        background: var(--ft-surface);
        transition: border-color 0.15s ease, background 0.15s ease;
      }
      .option.selected {
        border-color: var(--ft-primary);
        background: var(--ft-primary-soft);
      }
      .option.verdict-ok {
        border-color: var(--ft-ok-border);
        background: var(--ft-ok-surface);
      }
      .option.verdict-partial {
        border-color: var(--ft-partial-border);
        background: var(--ft-partial-surface);
      }
      .option.verdict-bad {
        border-color: var(--ft-danger-border);
        background: var(--ft-danger-surface);
      }
      .option-control {
        flex: 0 0 auto;
        padding-top: 2px;
      }
      .option-body {
        flex: 1 1 auto;
      }
      .option-text {
        margin: 0;
        font-weight: 500;
      }
      .level-chip {
        display: inline-block;
        margin-right: 0.45rem;
        padding: 0.1rem 0.5rem;
        border-radius: 999px;
        background: var(--ft-primary-soft);
        color: var(--ft-primary);
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        vertical-align: middle;
      }
      .option-feedback {
        margin-top: 0.5rem;
        display: grid;
        gap: 0.35rem;
      }
      .explanation {
        margin: 0;
        color: var(--ft-muted);
        font-size: 0.92rem;
      }
      .misconception,
      .norms {
        display: flex;
        gap: 0.4rem;
        align-items: flex-start;
        margin: 0;
        font-size: 0.88rem;
      }
      .misconception {
        color: var(--ft-danger-text);
      }
      .norms {
        color: var(--ft-primary);
      }
      .misconception mat-icon,
      .norms mat-icon {
        font-size: 17px;
        width: 17px;
        height: 17px;
        flex: 0 0 auto;
        margin-top: 2px;
      }
      .stage-summary {
        margin-top: 1rem;
        padding: 0.9rem 1rem;
        border-radius: 12px;
        display: grid;
        gap: 0.4rem;
      }
      .stage-summary p {
        margin: 0;
      }
      .score-line {
        color: var(--ft-muted);
        font-size: 0.85rem;
      }
      .summary-RICHTIG {
        background: var(--ft-ok-surface);
        border: 1px solid var(--ft-ok-border);
      }
      .summary-TEILWEISE_RICHTIG {
        background: var(--ft-partial-surface);
        border: 1px solid var(--ft-partial-border);
      }
      .summary-FALSCH {
        background: var(--ft-danger-surface);
        border: 1px solid var(--ft-danger-border);
      }
    `,
  ],
})
export class StageQuizComponent {
  readonly heading = input.required<string>();
  readonly prompt = input.required<string>();
  readonly options = input.required<StageOption[]>();
  readonly selectedIds = input<string[]>([]);
  readonly allowMultiple = input<boolean>(true);
  readonly submitted = input<boolean>(false);
  readonly evaluation = input<StageEvaluation | undefined>(undefined);
  readonly nextLabel = input<string>('Weiter');
  /** Auflösung von Norm-IDs zu Kurzbezeichnungen. */
  readonly normLabels = input<Record<string, string>>({});
  /** Auflösung der Rechtsgebiete (Stufe 2) zu Anzeigenamen. */
  readonly legalLevelLabels = input<Record<string, string>>({});

  readonly toggleOption = output<string>();
  readonly selectOption = output<string>();
  readonly submit = output<void>();
  readonly next = output<void>();

  isSelected(optionId: string): boolean {
    return this.selectedIds().includes(optionId);
  }

  toggle(optionId: string): void {
    this.toggleOption.emit(optionId);
  }

  select(optionId: string): void {
    this.selectOption.emit(optionId);
  }

  normsFor(option: StageOption): string[] {
    const labels = this.normLabels();
    return (option.normIds ?? []).map((id) => labels[id]).filter((label): label is string => !!label);
  }

  levelLabel(option: StageOption): string | undefined {
    if (!option.legalLevel) {
      return undefined;
    }
    return this.legalLevelLabels()[option.legalLevel];
  }
}
