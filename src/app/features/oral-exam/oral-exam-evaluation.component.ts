import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OralExamService } from '../../core/services/oral-exam.service';
import { ExamQuestionRole } from '../../core/models';

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
          <span class="eyebrow">Auswertung</span>
          <h1>Ergebnis der Prüfungssimulation</h1>
        </header>

        <mat-card appearance="outlined" class="summary" [class.passed]="result.passed">
          <mat-card-content>
            <div class="verdict">
              <mat-icon aria-hidden="true">{{ result.passed ? 'verified' : 'cancel' }}</mat-icon>
              <span class="verdict-text">{{ result.passed ? 'BESTANDEN' : 'NICHT BESTANDEN' }}</span>
            </div>
            <dl class="stats">
              <div>
                <dt>Punkte</dt>
                <dd>{{ result.correctCount }} / {{ result.total }}</dd>
              </div>
              <div>
                <dt>Prozent</dt>
                <dd>{{ result.percent }} %</dd>
              </div>
              <div>
                <dt>Bestehensgrenze</dt>
                <dd>{{ result.thresholdPercent }} % ({{ result.requiredPoints }} Punkte)</dd>
              </div>
            </dl>
            <mat-progress-bar
              mode="determinate"
              [value]="result.percent"
              [attr.aria-label]="'Erreichte Punkte: ' + result.percent + ' Prozent'"
            ></mat-progress-bar>
          </mat-card-content>
        </mat-card>

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
                    {{ topic.categoryLabel }}
                  </mat-panel-title>
                  <mat-panel-description class="topic-score">
                    {{ topic.correctCount }} / {{ topic.total }} richtig
                  </mat-panel-description>
                </mat-expansion-panel-header>

                <ul class="question-list">
                  @for (item of topic.questions; track item.question.id) {
                    <li class="question-item" [class.correct]="item.correct">
                      <div class="q-head">
                        <span class="q-role">{{ roleLabel(item.question.role) }}</span>
                        <span class="q-flag" [class.ok]="item.correct" [class.bad]="!item.correct">
                          <mat-icon aria-hidden="true">{{
                            item.correct ? 'check' : 'close'
                          }}</mat-icon>
                          {{ item.correct ? 'richtig' : 'falsch' }}
                        </span>
                      </div>
                      <p class="q-text">{{ item.question.question }}</p>
                      <p class="q-line">
                        <span class="label">Ihre Antwort:</span>
                        <span [class.wrong]="!item.correct">{{ item.selectedText ?? '–' }}</span>
                      </p>
                      @if (!item.correct) {
                        <p class="q-line">
                          <span class="label">Richtige Antwort:</span>
                          <span class="right">{{ item.question.correctAnswer }}</span>
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
        max-width: 900px;
      }
      .eyebrow {
        display: inline-block;
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--ft-accent);
      }
      .page-head h1 {
        margin: 0.35rem 0 0;
        font-size: 1.9rem;
      }
      .summary {
        border-radius: 14px;
        border-left: 6px solid var(--ft-danger);
      }
      .summary.passed {
        border-left-color: var(--ft-ok);
      }
      .verdict {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }
      .verdict mat-icon {
        color: var(--ft-danger);
      }
      .summary.passed .verdict mat-icon {
        color: var(--ft-ok);
      }
      .verdict-text {
        font-size: 1.35rem;
        font-weight: 700;
        letter-spacing: 0.04em;
      }
      .stats {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(3, 1fr);
        margin: 0 0 1rem;
      }
      .stats dt {
        color: var(--ft-muted);
        font-size: 0.85rem;
      }
      .stats dd {
        margin: 0.15rem 0 0;
        font-size: 1.15rem;
        font-weight: 600;
      }
      .topics h2 {
        font-size: 1.25rem;
        margin: 0 0 0.35rem;
      }
      .hint {
        color: var(--ft-muted);
        margin: 0 0 0.75rem;
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
      .topic-status.ok {
        color: var(--ft-ok);
      }
      .topic-status.bad {
        color: var(--ft-danger);
      }
      .topic-score {
        justify-content: flex-end;
      }
      .question-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.75rem;
      }
      .question-item {
        border: 1px solid var(--ft-border);
        border-radius: 12px;
        padding: 0.85rem;
        background: var(--ft-surface-2);
      }
      .question-item.correct {
        border-color: var(--ft-ok-border);
      }
      .q-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        margin-bottom: 0.35rem;
      }
      .q-role {
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--ft-accent);
      }
      .q-flag {
        display: inline-flex;
        align-items: center;
        gap: 0.2rem;
        font-size: 0.85rem;
        font-weight: 600;
      }
      .q-flag.ok {
        color: var(--ft-ok);
      }
      .q-flag.bad {
        color: var(--ft-danger);
      }
      .q-text {
        margin: 0 0 0.5rem;
        font-weight: 600;
        line-height: 1.45;
      }
      .q-line {
        margin: 0.2rem 0;
        line-height: 1.5;
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
      .q-explanation {
        margin: 0.5rem 0 0;
        padding: 0.5rem 0.75rem;
        border-left: 3px solid var(--ft-accent);
        background: var(--ft-primary-soft);
        border-radius: 0 8px 8px 0;
        line-height: 1.5;
        font-size: 0.92rem;
      }
      .overall {
        border-radius: 14px;
      }
      .overall-line {
        margin: 0 0 0.5rem;
        line-height: 1.55;
      }
      .overall-verdict {
        margin: 0;
        font-weight: 700;
        font-size: 1.05rem;
      }
      .overall-verdict.ok {
        color: var(--ft-ok-text);
      }
      .overall-verdict.bad {
        color: var(--ft-danger-text);
      }
      .actions {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
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

  restart(): void {
    this.examService.start();
    void this.router.navigate(['/pruefungssimulation/durchfuehrung']);
  }
}
