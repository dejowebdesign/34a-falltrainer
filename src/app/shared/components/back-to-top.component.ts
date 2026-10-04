import { Component, HostListener, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

/** Ab dieser Scrollposition wird der Button eingeblendet. */
export const BACK_TO_TOP_THRESHOLD = 400;

/**
 * Globaler „Nach oben“-Button. Liegt in der App-Shell und funktioniert daher
 * auf allen Routen.
 */
@Component({
  selector: 'app-back-to-top',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
    @if (visible()) {
      <button
        mat-icon-button
        type="button"
        class="back-to-top"
        aria-label="Nach oben"
        matTooltip="Nach oben"
        (click)="scrollToTop()"
      >
        <mat-icon aria-hidden="true">keyboard_arrow_up</mat-icon>
      </button>
    }
  `,
  styles: [
    `
      .back-to-top {
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 60;
        width: 50px;
        height: 50px;
        color: var(--ft-accent-strong);
        background: var(--ft-glass-strong);
        backdrop-filter: blur(14px) saturate(140%);
        -webkit-backdrop-filter: blur(14px) saturate(140%);
        border: 1px solid var(--ft-glass-border);
        box-shadow: var(--ft-elevation-2);
        border-radius: 50%;
        animation: btt-in 200ms var(--ft-ease);
        transition:
          transform var(--ft-motion),
          background-color var(--ft-motion),
          border-color var(--ft-motion);
      }
      .back-to-top:hover {
        transform: translateY(-3px);
        border-color: var(--ft-accent);
      }
      .back-to-top:focus-visible {
        outline: 3px solid var(--ft-accent);
        outline-offset: 2px;
      }
      @keyframes btt-in {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @media (max-width: 600px) {
        .back-to-top {
          right: 16px;
          bottom: 16px;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .back-to-top {
          transition: none;
          animation: none;
        }
        .back-to-top:hover {
          transform: none;
        }
      }
    `,
  ],
})
export class BackToTopComponent {
  readonly visible = signal(false);

  constructor() {
    this.syncVisibility();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.syncVisibility();
  }

  scrollToTop(): void {
    if (typeof window === 'undefined') {
      return;
    }
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  private syncVisibility(): void {
    if (typeof window === 'undefined') {
      return;
    }
    this.visible.set(window.scrollY > BACK_TO_TOP_THRESHOLD);
  }
}
