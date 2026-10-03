import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { ORAL_EXAM_POOL } from '../../core/data/oral-exam-authored.data';
import { ORAL_EXAM_QUESTIONS } from '../../core/data/oral-exam-questions.data';
import {
  OralExamQuestionBlock,
  OralExamSource,
  OralExamVerification,
} from '../../core/models';
import { validatePoolQuality } from '../../core/rules/oral-exam-engine';

const SOURCE_LABELS: Record<OralExamSource, string> = {
  QUESTIONS_TXT: 'Fragen.txt',
  AUTHORED_FROM_BIBEL: '34a-Bibel',
  AUTHORED_FROM_FACHWISSEN: 'Fachwissen',
};

const VERIFICATION_LABELS: Record<OralExamVerification, string> = {
  VERIFIED_QUESTIONS_TXT: 'verifiziert (Fragen.txt)',
  VERIFIED_BIBEL: 'verifiziert (Bibel)',
  UNVERIFIED: 'unverifiziert',
};

interface AuditFollowUp {
  question: string;
  answer: string;
  source: OralExamSource;
  verification: OralExamVerification;
}

interface AuditBlock {
  block: OralExamQuestionBlock;
  /** Prüfungsgerechte Formulierung der Hauptfrage (Override oder Bank). */
  mainQuestion: string;
  /** Prüfungsgerechte richtige Antwort zur Hauptfrage (Override oder Bank). */
  mainAnswer: string;
  followUps: AuditFollowUp[];
}

/**
 * Interne Audit-/Entwickleransicht der Prüfungssimulation.
 *
 * Belegt für jeden Prüfungsblock die Herkunft aller Antworten:
 * - Hauptfrage und deren Antwort stammen unverändert aus `Fragen.txt`.
 * - Folgefrage-Antworten stammen entweder aus der 34a-Bibel
 *   (`AUTHORED_FROM_BIBEL`) oder – wo die Bibel das Thema nicht abdeckt – aus
 *   Fachwissen (`AUTHORED_FROM_FACHWISSEN`, unverifiziert).
 *
 * Diese Kennzeichnungen werden bewusst nur hier und im Datenmodell gezeigt,
 * nicht in der Teilnehmerprüfung.
 */
@Component({
  selector: 'app-oral-exam-audit',
  imports: [MatButtonModule, MatIconModule, MatCardModule, MatExpansionModule],
  template: `
    <div class="ft-container page">
      <header class="page-head">
        <span class="eyebrow">Interner Auditbereich</span>
        <h1>Quellenkennzeichnung der Prüfungsblöcke</h1>
        <p>
          Diese Ansicht ist für Entwicklung und fachliche Prüfung gedacht. Sie zeigt, woher jede
          Antwort stammt. In der eigentlichen Prüfung werden diese technischen Angaben nicht
          angezeigt.
        </p>
      </header>

      <section class="counts" aria-label="Kennzahlen">
        <div class="count">
          <strong>{{ questions.length }}</strong>
          <span>Blöcke in der Fragenbank</span>
        </div>
        <div class="count">
          <strong>{{ pool.length }}</strong>
          <span>Prüfungsblöcke im Pool</span>
        </div>
        <div class="count">
          <strong>{{ fromBibel }}</strong>
          <span>Folgefragen aus der Bibel</span>
        </div>
        <div class="count">
          <strong>{{ fromFachwissen }}</strong>
          <span>Folgefragen aus Fachwissen</span>
        </div>
        <div class="count">
          <strong>{{ overriddenBlocks }}</strong>
          <span>Redaktionell überarbeitete Hauptfragen</span>
        </div>
      </section>

      <mat-card appearance="outlined" class="flags">
        <mat-card-header>
          <mat-card-title>Formale Qualitätsprüfung des Pools</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          @if (qualityIssues.length === 0) {
            <p>
              Keine formalen Auffälligkeiten. Geprüft werden: genau fünf Optionen, vollständige
              Sätze, ausgewogene Längen, keine Paragraphen und keine absoluten Formulierungen in
              falschen Antworten.
            </p>
          } @else {
            <ul>
              @for (issue of qualityIssues; track issue.blockId + issue.role + issue.kind + issue.detail) {
                <li>
                  <strong>{{ issue.blockId }}</strong> ({{ issue.role }}, {{ issue.kind }}) –
                  {{ issue.detail }}
                </li>
              }
            </ul>
          }
        </mat-card-content>
      </mat-card>

      <mat-card appearance="outlined" class="flags">
        <mat-card-header>
          <mat-card-title>Auffälligkeiten in Fragen.txt</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          @if (flagged.length === 0) {
            <p>Keine Auffälligkeiten erfasst.</p>
          } @else {
            <ul>
              @for (item of flagged; track item.id) {
                <li>
                  <strong>{{ item.id }}</strong> – {{ item.question }}
                  <ul>
                    @for (note of item.notes; track note) {
                      <li>{{ note }}</li>
                    }
                  </ul>
                </li>
              }
            </ul>
          }
          <p class="dup">
            Doppelt vorkommende Fragen (mit abweichenden Antworten) in der Bank:
            <strong>{{ duplicates.length }}</strong>
          </p>
          <ul class="dup-list">
            @for (dup of duplicates; track dup.question) {
              <li>„{{ dup.question }}" – {{ dup.count }}×</li>
            }
          </ul>
        </mat-card-content>
      </mat-card>

      <section aria-labelledby="blocks-heading">
        <h2 id="blocks-heading">Prüfungspool</h2>
        <mat-accordion class="accordion" multi>
          @for (entry of auditBlocks; track entry.block.id) {
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title class="title">
                  <span class="chip">{{ entry.block.categoryLabel }}</span>
                  {{ entry.mainQuestion }}
                </mat-panel-title>
              </mat-expansion-panel-header>

              <div class="block-body">
                <div class="row">
                  <span class="row-label">Hauptfrage</span>
                  <p class="row-q">{{ entry.mainQuestion }}</p>
                  <p class="row-a">{{ entry.mainAnswer }}</p>
                  @if (entry.mainQuestion !== entry.block.question ||
                    entry.mainAnswer !== entry.block.correctAnswer) {
                    <p class="orig">
                      Ursprünglich in Fragen.txt: „{{ entry.block.question }}“ –
                      {{ entry.block.correctAnswer }}
                    </p>
                  }
                  <div class="tags">
                    <span class="tag src">{{ sourceLabel('QUESTIONS_TXT') }}</span>
                    <span class="tag ver">{{ verificationLabel('VERIFIED_QUESTIONS_TXT') }}</span>
                  </div>
                </div>

                @for (followUp of entry.followUps; track followUp.question) {
                  <div class="row">
                    <span class="row-label">Folgefrage</span>
                    <p class="row-q">{{ followUp.question }}</p>
                    <p class="row-a">{{ followUp.answer }}</p>
                    <div class="tags">
                      <span class="tag src">{{ sourceLabel(followUp.source) }}</span>
                      <span
                        class="tag ver"
                        [class.unverified]="followUp.verification === 'UNVERIFIED'"
                        >{{ verificationLabel(followUp.verification) }}</span
                      >
                    </div>
                  </div>
                }
              </div>
            </mat-expansion-panel>
          }
        </mat-accordion>
      </section>
    </div>
  `,
  styles: [
    `
      .page {
        padding-block: 2rem 3.5rem;
        display: grid;
        gap: 1.5rem;
        max-width: 960px;
      }
      .eyebrow {
        display: inline-block;
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--ft-warn);
      }
      .page-head h1 {
        margin: 0.35rem 0 0.6rem;
        font-size: 1.8rem;
      }
      .page-head p {
        margin: 0;
        color: var(--ft-muted);
        line-height: 1.6;
        max-width: 760px;
      }
      .counts {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 640px) {
        .counts {
          grid-template-columns: repeat(4, 1fr);
        }
      }
      .count {
        background: var(--ft-surface);
        border: 1px solid var(--ft-border);
        border-radius: 14px;
        padding: 1rem;
        display: grid;
        gap: 0.2rem;
      }
      .count strong {
        font-size: 1.5rem;
      }
      .count span {
        color: var(--ft-muted);
        font-size: 0.9rem;
      }
      .flags {
        border-radius: 14px;
        border-left: 6px solid var(--ft-warn);
      }
      .flags ul {
        margin: 0.25rem 0;
        padding-left: 1.2rem;
        line-height: 1.55;
      }
      .flags .dup {
        margin-top: 0.75rem;
      }
      .dup-list {
        margin: 0.25rem 0 0;
      }
      .accordion {
        display: grid;
        gap: 0.5rem;
      }
      .title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        white-space: normal;
      }
      .chip {
        flex: 0 0 auto;
        background: var(--ft-primary-soft);
        border-radius: 999px;
        padding: 0.15rem 0.6rem;
        font-size: 0.75rem;
        font-weight: 600;
      }
      .block-body {
        display: grid;
        gap: 0.75rem;
        padding-top: 0.5rem;
      }
      .row {
        border: 1px solid var(--ft-border);
        border-radius: 12px;
        padding: 0.85rem;
        background: var(--ft-surface-2);
      }
      .row-label {
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--ft-accent);
      }
      .row-q {
        margin: 0.3rem 0 0.35rem;
        font-weight: 600;
        line-height: 1.45;
      }
      .row-a {
        margin: 0 0 0.5rem;
        line-height: 1.5;
        color: var(--ft-text);
      }
      .orig {
        margin: 0 0 0.5rem;
        font-size: 0.85rem;
        color: var(--ft-muted);
        line-height: 1.45;
        font-style: italic;
      }
      .tags {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      .tag {
        font-size: 0.72rem;
        border-radius: 999px;
        padding: 0.15rem 0.6rem;
        border: 1px solid var(--ft-border);
      }
      .tag.src {
        background: var(--ft-primary-soft);
      }
      .tag.ver {
        background: var(--ft-ok-surface);
        color: var(--ft-ok-text);
        border-color: var(--ft-ok-border);
      }
      .tag.ver.unverified {
        background: var(--ft-warn-surface);
        color: var(--ft-warn-text);
        border-color: var(--ft-warn-border);
      }
    `,
  ],
})
export class OralExamAuditComponent {
  readonly questions = ORAL_EXAM_QUESTIONS;
  readonly pool = ORAL_EXAM_POOL;

  readonly auditBlocks: AuditBlock[] = ORAL_EXAM_POOL.map((entry) => {
    const block = ORAL_EXAM_QUESTIONS.find((q) => q.id === entry.blockId)!;
    return {
      block,
      mainQuestion: entry.questionOverride ?? block.question,
      mainAnswer: entry.answerOverride ?? block.correctAnswer,
      followUps: [
        {
          question: entry.followUp1.question ?? block.followUp1,
          answer: entry.followUp1.answer,
          source: entry.followUp1.source,
          verification: entry.followUp1.verificationStatus,
        },
        {
          question: entry.followUp2.question ?? block.followUp2,
          answer: entry.followUp2.answer,
          source: entry.followUp2.source,
          verification: entry.followUp2.verificationStatus,
        },
      ],
    };
  });

  readonly fromBibel = this.auditBlocks
    .flatMap((entry) => entry.followUps)
    .filter((followUp) => followUp.source === 'AUTHORED_FROM_BIBEL').length;

  readonly fromFachwissen = this.auditBlocks
    .flatMap((entry) => entry.followUps)
    .filter((followUp) => followUp.source === 'AUTHORED_FROM_FACHWISSEN').length;

  /** Formale Qualitätsprüfung des Pools (Länge, Sätze, Paragraphen, Extreme). */
  readonly qualityIssues = validatePoolQuality(ORAL_EXAM_QUESTIONS, ORAL_EXAM_POOL);

  /** Anzahl der Blöcke, deren Hauptfrage oder -antwort redaktionell überarbeitet wurde. */
  readonly overriddenBlocks = ORAL_EXAM_POOL.filter(
    (entry) => entry.questionOverride !== undefined || entry.answerOverride !== undefined,
  ).length;

  readonly flagged = ORAL_EXAM_QUESTIONS.filter((q) => (q.notes?.length ?? 0) > 0);

  readonly duplicates = findDuplicateQuestions(ORAL_EXAM_QUESTIONS);

  sourceLabel(source: OralExamSource): string {
    return SOURCE_LABELS[source];
  }

  verificationLabel(verification: OralExamVerification): string {
    return VERIFICATION_LABELS[verification];
  }
}

function findDuplicateQuestions(
  questions: readonly OralExamQuestionBlock[],
): { question: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const question of questions) {
    counts.set(question.question, (counts.get(question.question) ?? 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([question, count]) => ({ question, count }));
}
