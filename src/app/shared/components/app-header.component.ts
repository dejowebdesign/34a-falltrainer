import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../core/services/theme.service';

/** Ab dieser Scrollposition wird der Milchglas-Zustand gesetzt. */
export const HEADER_SCROLL_THRESHOLD = 16;

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  template: `
    <a class="skip-link" href="#main-content">Zum Inhalt springen</a>
    <mat-toolbar class="app-toolbar" role="banner" [class.glass]="isScrolled()">
      <div class="toolbar-inner">
        <a routerLink="/" class="brand" aria-label="34a Falltrainer Startseite">
          <span class="brand-mark" aria-hidden="true">
            <mat-icon>gavel</mat-icon>
          </span>
          <span class="brand-text">
            <strong>34a Falltrainer</strong>
            <small>Sachkundeprüfung § 34a GewO</small>
          </span>
        </a>
        <div class="toolbar-actions">
          <nav aria-label="Hauptnavigation" class="nav">
            <a
              mat-button
              routerLink="/"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
            >
              Start
            </a>
            <a mat-button routerLink="/scenarios" routerLinkActive="active">Fallbeispiele</a>
            <a mat-button routerLink="/strafgesetzbuch" routerLinkActive="active">Strafgesetzbuch</a>
            <a mat-button routerLink="/pruefungssimulation" routerLinkActive="active"
              >Prüfungssimulation</a
            >
          </nav>
          <button
            mat-icon-button
            type="button"
            class="theme-toggle"
            (click)="theme.toggle()"
            [attr.aria-label]="toggleLabel()"
            [matTooltip]="toggleLabel()"
          >
            <mat-icon aria-hidden="true">{{
              theme.theme() === 'dark' ? 'light_mode' : 'dark_mode'
            }}</mat-icon>
          </button>
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      :host {
        /* Sticky über die komplette Scrollstrecke: Der Containing Block ist
           der Body, der dank min-height mit dem Inhalt mitwächst. */
        position: sticky;
        top: 0;
        z-index: 40;
        display: block;
      }
      .skip-link {
        position: absolute;
        left: -9999px;
        top: 0;
        background: var(--ft-accent);
        color: var(--ft-on-accent);
        padding: 0.75rem 1rem;
        z-index: 1000;
      }
      .skip-link:focus {
        left: 0;
      }
      /* Shell für den schwebenden Zustand: Der Toolbar selbst übernimmt
         Breite, Rundung und den oberen Abstand (per transform). */
      .app-toolbar {
        background: transparent;
        color: var(--ft-header-text);
        height: auto;
        min-height: var(--ft-header-height);
        padding-block: 0.4rem;
        padding-inline: 1.1rem;
        border: 1px solid transparent;
        border-radius: 0;
        box-shadow: none;
        width: 100%;
        max-width: var(--ft-container-max);
        margin-inline: auto;
        transition:
          max-width var(--ft-motion),
          margin var(--ft-motion),
          padding var(--ft-motion),
          transform var(--ft-motion),
          background-color var(--ft-motion),
          backdrop-filter var(--ft-motion),
          -webkit-backdrop-filter var(--ft-motion),
          border-color var(--ft-motion),
          border-radius var(--ft-motion),
          box-shadow var(--ft-motion);
      }
      /* Beim Scrollen wird die Leiste per transform zur schwebenden,
         zentrierten Glass-Card: begrenzte Breite, Abstand zum Viewport,
         deutliche Rundung. transform verändert den Fluss nicht, daher
         entsteht kein Layout-Sprung. */
      .app-toolbar.glass {
        max-width: min(
          var(--ft-header-max),
          calc(100% - 2 * var(--ft-header-gap-x))
        );
        transform: translateY(var(--ft-header-gap-top));
        background: var(--ft-header-glass);
        backdrop-filter: blur(var(--ft-blur-header)) saturate(150%);
        -webkit-backdrop-filter: blur(var(--ft-blur-header)) saturate(150%);
        border-color: var(--ft-header-border);
        border-radius: var(--ft-header-radius);
        box-shadow: var(--ft-elevation-2);
      }
      .toolbar-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        width: 100%;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        color: var(--ft-header-text);
        text-decoration: none;
      }
      .brand-mark {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 12px;
        background: linear-gradient(140deg, var(--ft-accent) 0%, var(--ft-secondary) 100%);
        color: var(--ft-on-accent);
        box-shadow: var(--ft-elevation-1);
        flex: 0 0 auto;
      }
      .brand-mark mat-icon {
        font-size: 22px;
        width: 22px;
        height: 22px;
      }
      .brand-text {
        display: flex;
        flex-direction: column;
        line-height: 1.15;
      }
      .brand-text strong {
        font-size: 1.08rem;
        font-weight: 700;
        letter-spacing: -0.01em;
      }
      .brand-text small {
        font-size: 0.72rem;
        color: var(--ft-muted);
      }
      .toolbar-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .nav {
        display: flex;
        gap: 0.15rem;
      }
      .nav a {
        color: var(--ft-header-text);
        font-weight: 500;
        border-radius: var(--ft-radius-sm);
      }
      .nav a.active {
        background: var(--ft-accent-soft);
        color: var(--ft-accent-strong);
      }
      .theme-toggle {
        color: var(--ft-header-text);
      }
      @media (min-width: 768px) {
        .app-toolbar {
          padding-inline: 2rem;
        }
      }
      /* Auf schmalen Screens (inkl. Tablet-Hochformat) darf die Navigation
         in eine zweite Zeile umbrechen – so entsteht kein horizontaler
         Überlauf. Der schwebende Charakter (Abstand, Radius, Glass)
         bleibt dabei erhalten. */
      @media (max-width: 700px) {
        .app-toolbar {
          padding-inline: 0.9rem;
        }
        .toolbar-inner {
          flex-wrap: wrap;
          row-gap: 0.3rem;
        }
        .brand {
          flex: 1 1 auto;
        }
        .toolbar-actions {
          flex: 1 1 100%;
          flex-wrap: wrap;
          row-gap: 0.25rem;
          justify-content: space-between;
        }
        .nav {
          flex-wrap: wrap;
        }
      }
      @media (max-width: 640px) {
        .brand-text small {
          display: none;
        }
        .nav a {
          padding-inline: 0.55rem;
          font-size: 0.88rem;
        }
      }
      @media (max-width: 560px) {
        .app-toolbar {
          padding-inline: 0.75rem;
        }
        .nav a {
          padding-inline: 0.5rem;
          font-size: 0.85rem;
        }
      }
      @media (max-width: 430px) {
        .nav {
          justify-content: center;
        }
        .nav a {
          padding-inline: 0.35rem;
          font-size: 0.8rem;
        }
        .brand-text strong {
          font-size: 1rem;
        }
      }
      @media (max-width: 360px) {
        .nav a {
          padding-inline: 0.28rem;
          font-size: 0.76rem;
        }
      }
      /* Reduced Motion: direkt in den schwebenden Zustand, keine
         aufwendige Übergangsanimation. */
      @media (prefers-reduced-motion: reduce) {
        .app-toolbar {
          transition: none;
        }
      }
    `,
  ],
})
export class AppHeaderComponent {
  readonly theme = inject(ThemeService);
  readonly isScrolled = signal(false);

  constructor() {
    this.syncScrollState();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.syncScrollState();
  }

  toggleLabel(): string {
    return this.theme.theme() === 'dark' ? 'Light Mode aktivieren' : 'Dark Mode aktivieren';
  }

  private syncScrollState(): void {
    if (typeof window === 'undefined') {
      return;
    }
    this.isScrolled.set(window.scrollY > HEADER_SCROLL_THRESHOLD);
  }
}
