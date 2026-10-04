import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { LegalBasicsCard } from '../../core/models';

/**
 * Großes Lern-Modal eines Grundlagenthemas.
 *
 * Aufbau nach Auftrag Nr. 8: Kopf mit Rubrik, Paragraph und Titel, dann die
 * Kurzfassung, der amtliche Wortlaut (falls vorhanden), die Lernabschnitte,
 * ein hervorgehobener Merksatz, Beispiele und die Prüfungsrelevanz.
 *
 * Der Kopf bleibt beim Scrollen stehen; nur der Inhaltsbereich scrollt.
 */
@Component({
  selector: 'app-legal-basics-detail',
  imports: [MatButtonModule, MatDialogModule, MatDividerModule, MatIconModule],
  template: `
    <header class="basics-head">
      <div class="head-main">
        <span class="head-eyebrow">{{ basics.eyebrow }}</span>
        @if (basics.paragraph) {
          <span class="head-paragraph">{{ basics.paragraph }} StGB</span>
        }
        <h2 class="head-title" id="basics-dialog-title">{{ basics.officialTitle }}</h2>
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

    <div class="basics-body">
      <p class="lead">{{ basics.summary }}</p>

      @if (basics.officialText) {
        <section class="official" aria-label="Amtlicher Gesetzeswortlaut">
          <h3>Amtlicher Wortlaut</h3>
          <p class="official-text">{{ basics.officialText }}</p>
          <a class="source" [href]="basics.sourceUrl" target="_blank" rel="noopener noreferrer">
            Amtliche Quelle
            <mat-icon aria-hidden="true">open_in_new</mat-icon>
          </a>
        </section>
      } @else if (basics.officialTextRefs?.length) {
        <section class="official" aria-label="Herangezogene Normen">
          <h3>Herangezogene Normen</h3>
          <ul class="norm-refs">
            @for (ref of basics.officialTextRefs; track ref) {
              <li>{{ ref }}</li>
            }
          </ul>
          <a class="source" [href]="basics.sourceUrl" target="_blank" rel="noopener noreferrer">
            Amtliche Quelle
            <mat-icon aria-hidden="true">open_in_new</mat-icon>
          </a>
        </section>
      }

      @for (section of basics.sections; track section.heading) {
        <section class="learn" aria-label="{{ section.heading }}">
          <h3>{{ section.heading }}</h3>
          @for (paragraph of section.paragraphs ?? []; track paragraph) {
            <p>{{ paragraph }}</p>
          }
          @if (section.bullets?.length) {
            <ul>
              @for (bullet of section.bullets; track bullet) {
                <li>{{ bullet }}</li>
              }
            </ul>
          }
        </section>
      }

      <section class="merksatz" aria-label="Merksatz">
        <mat-icon aria-hidden="true">lightbulb</mat-icon>
        <div>
          <h3>Merksatz</h3>
          <p>{{ basics.merksatz }}</p>
        </div>
      </section>

      @if (basics.examples.length) {
        <section class="learn" aria-label="Beispiele">
          <h3>Beispiele</h3>
          <ul>
            @for (example of basics.examples; track example) {
              <li>{{ example }}</li>
            }
          </ul>
        </section>
      }

      <section class="exam" aria-label="Prüfungsrelevant">
        <h3>Prüfungsrelevant</h3>
        <p>{{ basics.examRelevant }}</p>
      </section>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        max-height: 90vh;
      }
      .basics-head {
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
        gap: 0.2rem;
        min-width: 0;
      }
      .head-eyebrow {
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.09em;
        color: var(--ft-muted);
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
      .head-close {
        flex: none;
      }

      .basics-body {
        overflow-y: auto;
        padding: 1.2rem 1.6rem 1.6rem;
        display: flex;
        flex-direction: column;
        gap: 1.1rem;
      }
      .lead {
        margin: 0;
        font-size: 1.02rem;
        line-height: 1.6;
      }
      .basics-body h3 {
        margin: 0 0 0.35rem;
        font-size: 0.98rem;
      }
      .basics-body p {
        margin: 0 0 0.5rem;
        line-height: 1.65;
      }
      .basics-body ul {
        margin: 0;
        padding-left: 1.2rem;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        line-height: 1.6;
      }

      .official,
      .learn,
      .exam {
        padding: 1rem 1.1rem;
        border: 1px solid var(--ft-border);
        border-radius: var(--ft-radius);
        background: var(--ft-surface);
      }
      .official-text {
        font-style: italic;
      }
      .source {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        color: var(--ft-primary);
        font-weight: 600;
      }
      .source mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }
      .norm-refs {
        list-style: none;
        padding-left: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-bottom: 0.6rem;
      }
      .norm-refs li {
        padding: 0.2rem 0.6rem;
        border-radius: 999px;
        background: var(--ft-accent-soft);
        color: var(--ft-accent-strong);
        font-weight: 600;
        font-size: 0.85rem;
      }

      .merksatz {
        display: flex;
        gap: 0.7rem;
        align-items: flex-start;
        padding: 1rem 1.1rem;
        border-radius: var(--ft-radius);
        background: var(--ft-accent-soft);
        border: 1px solid var(--ft-border-strong);
      }
      .merksatz mat-icon {
        flex: none;
        color: var(--ft-accent-strong);
      }
      .merksatz h3 {
        color: var(--ft-accent-strong);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        font-size: 0.78rem;
      }
      .merksatz p {
        margin: 0;
        font-weight: 600;
        color: var(--ft-accent-strong);
      }

      .exam {
        border-color: var(--ft-accent);
        background: var(--ft-glass);
      }
    `,
  ],
})
export class LegalBasicsDetailComponent {
  readonly basics = inject<LegalBasicsCard>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<LegalBasicsDetailComponent>);

  close(): void {
    this.dialogRef.close();
  }
}
