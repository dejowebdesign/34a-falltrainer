import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { OralExamService } from '../../core/services/oral-exam.service';
import { ORAL_EXAM_CATEGORIES, ORAL_EXAM_CATEGORY_LABELS } from '../../core/models';

/**
 * Einführung in die mündliche Prüfungssimulation.
 *
 * Erklärt Umfang, Bewertung und Bestehensgrenze und startet auf Wunsch einen
 * neuen, zufällig zusammengestellten Durchlauf.
 */
@Component({
  selector: 'app-oral-exam-intro',
  imports: [MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="ft-container page">
      <header class="page-head">
        <span class="eyebrow">Mündliche Prüfungssimulation</span>
        <h1>Prüfungssimulation § 34a GewO</h1>
        <p>
          Simulieren Sie die mündliche Sachkundeprüfung: In jedem der neun Themengebiete wird
          zufällig ein Fragenblock ausgewählt. Jeder Block besteht aus einer Hauptfrage und zwei
          Folgefragen.
        </p>
      </header>

      <section class="facts" aria-label="Prüfungsumfang">
        <div class="fact">
          <mat-icon aria-hidden="true">category</mat-icon>
          <strong>9</strong>
          <span>Themengebiete</span>
        </div>
        <div class="fact">
          <mat-icon aria-hidden="true">quiz</mat-icon>
          <strong>27</strong>
          <span>bewertete Fragen</span>
        </div>
        <div class="fact">
          <mat-icon aria-hidden="true">workspace_premium</mat-icon>
          <strong>14 / 27</strong>
          <span>Punkte zum Bestehen</span>
        </div>
        <div class="fact">
          <mat-icon aria-hidden="true">percent</mat-icon>
          <strong>50 %</strong>
          <span>Bestehensgrenze</span>
        </div>
      </section>

      <mat-card appearance="outlined" class="panel">
        <mat-card-header>
          <mat-card-title>So läuft die Simulation ab</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <ol class="steps">
            <li>
              Je Themengebiet wird <strong>ein Fragenblock</strong> zufällig ausgewählt – die
              Auswahl unterscheidet sich bei jedem Start.
            </li>
            <li>
              Sie beantworten je Block <strong>Hauptfrage, Folgefrage 1 und Folgefrage 2</strong> in
              dieser Reihenfolge.
            </li>
            <li>
              Jede Frage hat <strong>genau fünf Antwortmöglichkeiten</strong>; nur eine ist richtig.
            </li>
            <li>
              Für jede richtige Antwort gibt es <strong>1 Punkt</strong>. Ab
              <strong>14 von 27 Punkten (50 %)</strong> ist die Prüfung bestanden.
            </li>
          </ol>
        </mat-card-content>
      </mat-card>

      <section aria-labelledby="topics-heading" class="topics-block">
        <h2 id="topics-heading">Die neun Themengebiete</h2>
        <ul class="topics">
          @for (category of categories; track category) {
            <li>{{ labels[category] }}</li>
          }
        </ul>
      </section>

      <div class="actions">
        <button mat-flat-button color="primary" type="button" class="start" (click)="start()">
          <mat-icon aria-hidden="true">play_arrow</mat-icon>
          Prüfung starten
        </button>
      </div>
    </div>
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
        margin: 0.35rem 0 0.6rem;
        font-size: 2rem;
      }
      .page-head p {
        margin: 0;
        color: var(--ft-muted);
        line-height: 1.6;
        max-width: 720px;
      }
      .facts {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 640px) {
        .facts {
          grid-template-columns: repeat(4, 1fr);
        }
      }
      .fact {
        background: var(--ft-surface);
        border: 1px solid var(--ft-border);
        border-radius: 14px;
        padding: 1rem;
        display: grid;
        gap: 0.2rem;
        justify-items: start;
      }
      .fact mat-icon {
        color: var(--ft-accent);
      }
      .fact strong {
        font-size: 1.5rem;
      }
      .fact span {
        color: var(--ft-muted);
        font-size: 0.9rem;
      }
      .panel {
        border-radius: 14px;
      }
      .steps {
        margin: 0.5rem 0 0;
        padding-left: 1.25rem;
        display: grid;
        gap: 0.6rem;
        line-height: 1.55;
      }
      .topics-block h2 {
        font-size: 1.2rem;
        margin: 0 0 0.75rem;
      }
      .topics {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .topics li {
        background: var(--ft-primary-soft);
        color: var(--ft-text);
        border-radius: 999px;
        padding: 0.35rem 0.85rem;
        font-size: 0.9rem;
      }
      .actions {
        display: flex;
        justify-content: flex-start;
      }
      .start {
        padding-inline: 1.5rem;
      }
    `,
  ],
})
export class OralExamIntroComponent {
  private readonly examService = inject(OralExamService);
  private readonly router = inject(Router);

  readonly categories = ORAL_EXAM_CATEGORIES;
  readonly labels = ORAL_EXAM_CATEGORY_LABELS;

  start(): void {
    this.examService.start();
    void this.router.navigate(['/pruefungssimulation/durchfuehrung']);
  }
}
