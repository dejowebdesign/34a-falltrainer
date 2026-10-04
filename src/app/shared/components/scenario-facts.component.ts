import { Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Scenario } from '../../core/models';
import { FocusOverlayComponent } from './focus-overlay.component';

/**
 * FALLBESCHREIBUNG mit hervorgehobenen rechtlich relevanten Tatsachen.
 *
 * Der vollständige Originalfall bleibt unverändert erhalten und kann
 * schrittweise entdeckt werden:
 * – ein-/ausblendbar über „Sachverhalt anzeigen/ausblenden“
 * – vergrößerbar über eine Fokus-/Zoom-Ansicht (rein visuell)
 */
@Component({
  selector: 'app-scenario-facts',
  imports: [MatCardModule, MatButtonModule, MatIconModule, FocusOverlayComponent],
  template: `
    <mat-card appearance="outlined" class="facts-card ft-card--glass ft-elevation-2">
      <mat-card-header>
        <mat-card-title>{{ scenario().title }}</mat-card-title>
        <mat-card-subtitle>Fallbeschreibung</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        @if (scenario().originalCaseText) {
          <div class="case-block">
            <div class="case-block-head">
              <button
                #caseToggle
                type="button"
                class="case-toggle"
                [attr.aria-expanded]="showCase()"
                aria-controls="case-text-panel"
                (click)="toggleCase()"
              >
                <mat-icon aria-hidden="true">{{
                  showCase() ? 'visibility_off' : 'visibility'
                }}</mat-icon>
                {{ showCase() ? 'Sachverhalt ausblenden' : 'Sachverhalt anzeigen' }}
              </button>
              <button type="button" class="ft-focus-trigger" (click)="openFocus()">
                <mat-icon aria-hidden="true">zoom_out_map</mat-icon>
                Sachverhalt vergrößern
              </button>
            </div>
            @if (showCase()) {
              <p id="case-text-panel" class="case-text ft-reveal">{{ scenario().originalCaseText }}</p>
            }
          </div>
        }

        <h3 class="facts-title">Bearbeitungssachverhalt (Kurzfassung)</h3>
        <ul class="facts">
          @for (fact of scenario().facts; track fact.id) {
            <li [class.relevant]="fact.legallyRelevant">
              @if (fact.legallyRelevant) {
                <mat-icon aria-label="rechtlich relevant" class="fact-icon">gavel</mat-icon>
              } @else {
                <mat-icon aria-hidden="true" class="fact-icon neutral">info</mat-icon>
              }
              <span>{{ fact.text }}</span>
            </li>
          }
        </ul>
        <p class="legend">
          <mat-icon aria-hidden="true">gavel</mat-icon> Als rechtlich relevant markierte Tatsachen
        </p>
      </mat-card-content>
    </mat-card>

    @if (focusOpen()) {
      <app-focus-overlay
        heading="Sachverhalt"
        ariaLabel="Sachverhalt in Fokusansicht"
        (close)="closeFocus()"
      >
        <p class="focus-case-text">{{ scenario().originalCaseText }}</p>
      </app-focus-overlay>
    }
  `,
  styles: [
    `
      .facts-card {
        border-radius: var(--ft-radius-lg);
      }
      .case-block {
        margin: 0.25rem 0 1.15rem;
        border: 1px solid var(--ft-border);
        border-left: 3px solid var(--ft-accent);
        border-radius: var(--ft-radius-sm);
        background: var(--ft-surface-2);
        padding: 0.85rem 1rem;
      }
      .case-block-head {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem 0.75rem;
      }
      .case-toggle {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.3rem 0.7rem;
        border: 1px solid var(--ft-border);
        border-radius: 999px;
        background: var(--ft-surface);
        color: var(--ft-accent-strong);
        font-size: 0.78rem;
        font-weight: 600;
        line-height: 1.4;
        cursor: pointer;
        transition:
          color var(--ft-motion),
          border-color var(--ft-motion),
          background-color var(--ft-motion);
      }
      .case-toggle:hover {
        border-color: var(--ft-accent);
        background: var(--ft-accent-soft);
      }
      .case-toggle mat-icon {
        font-size: 17px;
        width: 17px;
        height: 17px;
      }
      .case-text {
        margin: 0.85rem 0 0;
        line-height: 1.7;
        font-size: 1.02rem;
      }
      .focus-case-text {
        margin: 0;
        white-space: pre-line;
      }
      .facts-title {
        margin: 0 0 0.6rem;
        color: var(--ft-muted);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        font-size: 0.78rem;
        font-weight: 700;
      }
      .facts {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.5rem;
      }
      .facts li {
        display: flex;
        gap: 0.6rem;
        align-items: flex-start;
        padding: 0.7rem 0.85rem;
        border-radius: var(--ft-radius-sm);
        background: var(--ft-surface-2);
        border: 1px solid var(--ft-border);
        line-height: 1.5;
      }
      .facts li.relevant {
        background: var(--ft-accent-soft);
        border-color: var(--ft-accent);
      }
      .fact-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        color: var(--ft-primary);
        flex: 0 0 auto;
        margin-top: 2px;
      }
      .fact-icon.neutral {
        color: var(--ft-muted);
      }
      .legend {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.8rem;
        color: var(--ft-muted);
        margin-top: 0.85rem;
      }
      .legend mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }
    `,
  ],
})
export class ScenarioFactsComponent {
  readonly scenario = input.required<Scenario>();

  readonly showCase = signal(false);
  readonly focusOpen = signal(false);

  private readonly caseToggle = viewChild<ElementRef<HTMLButtonElement>>('caseToggle');

  toggleCase(): void {
    this.showCase.update((open) => !open);
  }

  openFocus(): void {
    this.focusOpen.set(true);
  }

  /** Schließt den Fokus und gibt den Fokus an den Auslöser zurück. */
  closeFocus(): void {
    this.focusOpen.set(false);
    this.caseToggle()?.nativeElement.focus();
  }
}
