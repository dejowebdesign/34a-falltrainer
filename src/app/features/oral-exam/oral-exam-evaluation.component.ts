import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OralExamService } from '../../core/services/oral-exam.service';
import { ExamQuestionRole, formatExamClock } from '../../core/models';

const ROLE_LABELS: Record<ExamQuestionRole, string> = {
  HAUPTFRAGE: 'Hauptfrage',
  FOLGEFRAGE_1: 'Folgefrage 1',
  FOLGEFRAGE_2: 'Folgefrage 2',
};

/**
 * Auswertung der mündlichen Prüfungssimulation.
 *
 * Zeigt Gesamtpunkte, Prozentwert, Bestanden-Status und die Bewertung jedes
 * Themengebiets. Die Themengebiete sind anklickbar und enthalten die tatsächlich
 * gestellten Fragen mit gegebener und richtiger Antwort sowie – sofern vorhanden –
 * eine Erklärung. Technische Quellkennzeichnungen werden hier bewusst nicht
 * angezeigt (siehe Audit-Ansicht).
 */
@Component({
  selector: 'app-oral-exam-evaluation',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressBarModule,
  ],
  template: `
    @if (evaluation(); as result) {
      <div class="ft-container page">
        <header class="page-head">
          <span class="ft-eyebrow">Auswertung</span>
          <h1>Ergebnis der Prüfungssimulation</h1>
        </header>

        <!-- Prüfungsbericht -->
        <mat-card appearance="outlined" class="report" [class.passed]="result.passed" [class.failed]="!result.passed">
          <mat-card-content>
            <p class="report-label">Prüfung abgeschlossen</p>
            <div class="report-main">
              <div class="report-score">
                <span class="score-value">{{ result.correctCount }} / {{ result.total }}</span>
                <span class="score-percent">{{ result.percent }} %</span>
              </div>
              <div class="report-status">
                <span
                  class="status-badge"
                  [class.ok]="result.passed"
                  [class.bad]="!result.passed"
                >
                  <mat-icon aria-hidden="true">{{ result.passed ? 'verified' : 'cancel' }}</mat-icon>
                  {{ result.passed ? 'BESTANDEN' : 'NICHT BESTANDEN' }}
                </span>
                @if (result.timedOut) {
                  <span class="status-badge timeout">
                    <mat-icon aria-hidden="true">timer_off</mat-icon>
                    ZEITABLAUF
                  </span>
                }
              </div>
            </div>

            <mat-progress-bar
              mode="determinate"
              [value]="result.percent"
              [attr.aria-label]="'Erreichte Punkte: ' + result.percent + ' Prozent'"
            ></mat-progress-bar>

            <dl class="stats">
              <div>
                <dt>Bearbeitungszeit</dt>
                <dd>{{ clock(result.elapsedSeconds) }}</dd>
              </div>
              <div>
                <dt>Prüfungszeit</dt>
                <dd>{{ clock(result.durationSeconds) }}</dd>
              </div>
              <div>
                <dt>Bestehensgrenze</dt>
                <dd>{{ result.thresholdPercent }} % ({{ result.requiredPoints }} Punkte)</dd>
              </div>
              <div>
                <dt>Nicht beantwortet</dt>
                <dd>{{ result.unansweredCount }}</dd>
              </div>
            </dl>

            @if (result.timedOut) {
              <p class="timeout-note" role="status">
                <mat-icon aria-hidden="true">timer_off</mat-icon>
                Prüfung wegen Zeitablauf beendet.
              </p>
            }
          </mat-card-content>
        </mat-card>

        <!-- Themengebiete -->
        <section aria-labelledby="topics-heading" class="topics">
          <h2 id="topics-heading">Bewertung nach Themengebiet</h2>
          <p class="hint">Tippen Sie ein Themengebiet an, um die gestellten Fragen zu sehen.</p>

          <mat-accordion class="accordion">
            @for (topic of result.topics; track topic.category) {
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title class="topic-title">
                    <mat-icon
                      class="topic-status"
                      [class.ok]="topic.correctCount === topic.total"
                      [class.bad]="topic.correctCount < topic.total"
                      aria-hidden="true"
                    >
                      {{ topic.correctCount === topic.total ? 'check_circle' : 'error_outline' }}
                    </mat-icon>
                    <span class="topic-name">{{ topic.categoryLabel }}</span>
                  </mat-panel-title>
                  <mat-panel-description class="topic-score">
                    {{ topic.correctCount }} / {{ topic.total }} richtig
                  </mat-panel-description>
                </mat-expansion-panel-header>

                <div class="topic-bar">
                  <mat-progress-bar
                    mode="determinate"
                    [value]="topic.percent"
                    [attr.aria-label]="topic.categoryLabel + ': ' + topic.correctCount + ' von ' + topic.total"
                  ></mat-progress-bar>
                </div>

                <ul class="question-list">
                  @for (item of topic.questions; track item.question.id) {
                    <li
                      class="question-item"
                      [class.correct]="item.correct"
                      [class.unanswered]="!item.answered"
                    >
                      <div class="q-head">
                        <span class="q-meta">
                          <span class="q-topic">{{ item.question.categoryLabel }}</span>
                          <span class="q-difficulty">Schwierigkeit {{ item.question.difficulty }}</span>
                        </span>
                        @if (item.answered) {
                          <span class="q-flag" [class.ok]="item.correct" [class.bad]="!item.correct">
                            <mat-icon aria-hidden="true">{{
                              item.correct ? 'check' : 'close'
                            }}</mat-icon>
                            {{ item.correct ? 'richtig' : 'falsch' }}
                          </span>
                        } @else {
                          <span class="q-flag unanswered-flag">
                            <mat-icon aria-hidden="true">remove</mat-icon>
                            Nicht beantwortet – 0 Punkte
                          </span>
                        }
                      </div>
                      <p class="q-role-line">{{ roleLabel(item.question.role) }}</p>
                      <p class="q-text">{{ item.question.question }}</p>
                      @if (item.answered) {
                        <p class="q-line">
                          <span class="label">Ihre Antwort:</span>
                          <span [class.wrong]="!item.correct">{{ item.selectedText ?? '–' }}</span>
                        </p>
                      }
                      @if (!item.correct) {
                        <p class="q-line">
                          <span class="label">Richtige Antwort:</span>
                          <span class="right">{{ item.question.correctAnswer }}</span>
                        </p>
                      }
                      @if (item.question.legalBasis) {
                        <p class="q-legal">
                          <span class="label">Rechtsgrundlage:</span>
                          <span class="norm">{{ item.question.legalBasis }}</span>
                        </p>
                      }
                      @if (item.question.explanation) {
                        <p class="q-explanation">{{ item.question.explanation }}</p>
                      }
                    </li>
                  }
                </ul>
              </mat-expansion-panel>
            }
          </mat-accordion>
        </section>

        <mat-card appearance="outlined" class="overall">
          <mat-card-header>
            <mat-card-title>Gesamtbewertung</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p class="overall-line">
              Sie haben <strong>{{ result.correctCount }} von {{ result.total }}</strong> Fragen
              richtig beantwortet. Das entspricht <strong>{{ result.percent }} %</strong>.
            </p>
            <p class="overall-line">
              Prüfungszeit: <strong>{{ clock(result.durationSeconds) }}</strong> ·
              Bearbeitungszeit: <strong>{{ clock(result.elapsedSeconds) }}</strong>
              @if (result.unansweredCount > 0) {
                · Nicht beantwortet: <strong>{{ result.unansweredCount }}</strong> (0 Punkte)
              }
            </p>
            @if (result.timedOut) {
              <p class="overall-line">Prüfung wegen Zeitablauf beendet.</p>
            }
            <p class="overall-verdict" [class.ok]="result.passed" [class.bad]="!result.passed">
              {{ result.passed ? 'BESTANDEN' : 'NICHT BESTANDEN' }}
              – Bestehensgrenze {{ result.thresholdPercent }} %
              ({{ result.requiredPoints }} von {{ result.total }} Punkten).
            </p>
          </mat-card-content>
        </mat-card>

        <div class="actions">
          <button mat-flat-button color="primary" type="button" (click)="restart()">
            <mat-icon aria-hidden="true">restart_alt</mat-icon>
            Neue Prüfung starten
          </button>
          <a mat-stroked-button routerLink="/">Zur Startseite</a>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .page {
        padding-block: 2rem 3.5rem;
        display: grid;
        gap: 1.5rem;
        max-width: 940px;
      }
      .page-head h1 {
        margin: 0.35rem 0 0;
        font-size: clamp(1.7rem, 3.4vw, 2.2rem);
      }
      /* Prüfungsbericht */
      .report {
        border-radius: var(--ft-radius-lg);
        border-top: 4px solid var(--ft-danger);
      }
      .report.passed {
        border-top-color: var(--ft-ok);
      }
      .report-label {
        margin: 0 0 0.75rem;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--ft-muted);
      }
      .report-main {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
        margin-bottom: 1rem;
      }
      .report-score {
        display: flex;
        align-items: baseline;
        gap: 0.75rem;
      }
      .score-value {
        font-size: clamp(2.2rem, 6vw, 3.2rem);
        font-weight: 700;
        line-height: 1;
        letter-spacing: -0.03em;
        font-variant-numeric: tabular-nums;
      }
      .score-percent {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--ft-muted);
      }
      .report-status {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.4rem 0.9rem;
        border-radius: 999px;
        font-weight: 700;
        letter-spacing: 0.05em;
        font-size: 0.92rem;
        border: 1px solid transparent;
      }
      .status-badge mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
      .status-badge.ok {
        background: var(--ft-ok-surface);
        color: var(--ft-ok-text);
        border-color: var(--ft-ok-border);
      }
      .status-badge.bad {
        background: var(--ft-danger-surface);
        color: var(--ft-danger-text);
        border-color: var(--ft-danger-border);
      }
      .status-badge.timeout {
        background: var(--ft-warn-surface);
        color: var(--ft-warn-text);
        border-color: var(--ft-warn-border);
      }
      .stats {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        margin: 1.25rem 0 0;
      }
      .stats dt {
        color: var(--ft-muted);
        font-size: 0.82rem;
      }
      .stats dd {
        margin: 0.2rem 0 0;
        font-size: 1.2rem;
        font-weight: 700;
        font-variant-numeric: tabular-nums;
      }
      .topics h2 {
        font-size: 1.3rem;
        margin: 0 0 0.35rem;
      }
      .hint {
        color: var(--ft-muted);
        margin: 0 0 0.9rem;
      }
      .accordion {
        display: grid;
        gap: 0.5rem;
      }
      .topic-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
      }
      .topic-name {
        white-space: normal;
      }
      .topic-status.ok {
        color: var(--ft-ok);
      }
      .topic-status.bad {
        color: var(--ft-danger);
      }
      .topic-score {
        justify-content: flex-end;
      }
      .topic-bar {
        margin: 0.35rem 0 0.9rem;
      }
      .question-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.85rem;
      }
      .question-item {
        border: 1px solid var(--ft-border);
        border-radius: var(--ft-radius);
        padding: 1rem;
        background: var(--ft-surface-2);
      }
      .question-item.correct {
        border-color: var(--ft-ok-border);
        border-left: 3px solid var(--ft-ok);
      }
      .question-item:not(.correct):not(.unanswered) {
        border-left: 3px solid var(--ft-danger);
      }
      .question-item.unanswered {
        border-color: var(--ft-danger-border);
        background: var(--ft-danger-surface);
        border-left: 3px solid var(--ft-danger);
      }
      .q-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        margin-bottom: 0.4rem;
      }
      .q-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.35rem 0.5rem;
      }
      .q-topic,
      .q-difficulty {
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        border-radius: 999px;
        padding: 0.16rem 0.55rem;
        line-height: 1.4;
      }
      .q-topic {
        background: var(--ft-primary-soft);
      }
      .q-difficulty {
        background: var(--ft-surface);
        border: 1px solid var(--ft-border);
      }
      .q-role-line {
        margin: 0 0 0.35rem;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--ft-accent-strong);
      }
      .q-flag {
        display: inline-flex;
        align-items: center;
        gap: 0.2rem;
        font-size: 0.85rem;
        font-weight: 700;
        white-space: nowrap;
      }
      .q-flag.ok {
        color: var(--ft-ok);
      }
      .q-flag.bad {
        color: var(--ft-danger);
      }
      .q-flag.unanswered-flag {
        color: var(--ft-danger-text);
      }
      .q-text {
        margin: 0 0 0.6rem;
        font-weight: 600;
        line-height: 1.5;
      }
      .q-line {
        margin: 0.25rem 0;
        line-height: 1.55;
      }
      .q-line .label {
        color: var(--ft-muted);
      }
      .q-line .wrong {
        color: var(--ft-danger);
      }
      .q-line .right {
        color: var(--ft-ok-text);
      }
      .q-legal {
        margin: 0.35rem 0;
        line-height: 1.55;
      }
      .q-legal .label {
        color: var(--ft-muted);
      }
      .q-legal .norm {
        font-weight: 600;
        color: var(--ft-ok-text);
      }
      .q-explanation {
        margin: 0.6rem 0 0;
        padding: 0.6rem 0.85rem;
        border-left: 3px solid var(--ft-accent);
        background: var(--ft-accent-soft);
        border-radius: 0 var(--ft-radius-sm) var(--ft-radius-sm) 0;
        line-height: 1.55;
        font-size: 0.92rem;
      }
      .overall {
        border-radius: var(--ft-radius-lg);
      }
      .overall-line {
        margin: 0 0 0.5rem;
        line-height: 1.6;
      }
      .overall-verdict {
        margin: 0.5rem 0 0;
        font-weight: 700;
        font-size: 1.05rem;
      }
      .overall-verdict.ok {
        color: var(--ft-ok-text);
      }
      .overall-verdict.bad {
        color: var(--ft-danger-text);
      }
      .timeout-note {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        margin: 1rem 0 0;
        padding: 0.7rem 0.9rem;
        border-radius: var(--ft-radius-sm);
        background: var(--ft-danger-surface);
        color: var(--ft-danger-text);
        font-weight: 600;
      }
      .actions {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
      @media (max-width: 560px) {
        .report-main {
          align-items: flex-start;
        }
        .q-head {
          flex-wrap: wrap;
        }
      }
    `,
  ],
})
export class OralExamEvaluationComponent {
  private readonly examService = inject(OralExamService);
  private readonly router = inject(Router);

  readonly evaluation = computed(() => this.examService.evaluate());

  constructor() {
    if (!this.examService.exam()) {
      void this.router.navigate(['/pruefungssimulation']);
    }
  }

  roleLabel(role: ExamQuestionRole): string {
    return ROLE_LABELS[role];
  }

  clock(seconds: number): string {
    return formatExamClock(seconds);
  }

  restart(): void {
    this.examService.start();
    void this.router.navigate(['/pruefungssimulation/durchfuehrung']);
  }
}
