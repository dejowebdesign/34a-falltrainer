import { Component, HostListener, input, output } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Fokus-/Zoom-Ansicht für Karten (Sachverhalt, Frage).
 *
 * Rein visuelle Darstellungsfunktion: Die Karte wird zentriert und größer
 * dargestellt, der Hintergrund leicht gedimmt. Es findet kein Seiten-Zoom und
 * keine Layout-Manipulation statt – die Fachlogik bleibt unberührt.
 *
 * Barrierefreiheit: Dialog-Semantik, Fokus-Falle, ESC schließt, Fokus wird
 * vom aufrufenden Element zurückgeholt (siehe `restoreFocus`).
 */
@Component({
  selector: 'app-focus-overlay',
  imports: [A11yModule, MatButtonModule, MatIconModule],
  template: `
    <div class="ft-focus-overlay" (click)="onBackdrop()">
      <div
        class="ft-focus-panel"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="ariaLabel()"
        cdkTrapFocus
        [cdkTrapFocusAutoCapture]="true"
        (click)="$event.stopPropagation()"
      >
        <div class="ft-focus-head">
          <h2>{{ heading() }}</h2>
          <button
            mat-icon-button
            type="button"
            class="ft-focus-close"
            aria-label="Fokusansicht schließen"
            (click)="close.emit()"
          >
            <mat-icon aria-hidden="true">close</mat-icon>
          </button>
        </div>
        <div class="ft-focus-body">
          <ng-content />
        </div>
      </div>
    </div>
  `,
})
export class FocusOverlayComponent {
  readonly heading = input.required<string>();
  readonly ariaLabel = input<string>('Fokusansicht');

  readonly close = output<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close.emit();
  }

  /** Klick auf den Hintergrund schließt; Klick in die Karte nicht. */
  onBackdrop(): void {
    this.close.emit();
  }
}
