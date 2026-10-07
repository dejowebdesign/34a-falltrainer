import {
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';
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
          <img
            class="brand-mark"
            src="brand/34a-falltrainer-mark.svg"
            alt=""
            width="96"
            height="96"
            aria-hidden="true"
          />
          <span class="brand-text">
            <strong>
              <span class="brand-34a">34<span class="brand-a">A</span></span>
              <span class="brand-name">FALLTRAINER</span>
            </strong>
            <small>Sachkundeprüfung § 34a GewO</small>
          </span>
        </a>
        <div class="toolbar-actions">
          <nav aria-label="Hauptnavigation" class="nav desktop-nav">
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
            <a mat-button routerLink="/bgb" routerLinkActive="active">BGB</a>
            <a mat-button routerLink="/jedermannsrechte" routerLinkActive="active"
              >Jedermannsrechte</a
            >
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
          <button
            #menuButton
            mat-icon-button
            type="button"
            class="menu-toggle"
            (click)="openMenu()"
            aria-label="Menü öffnen"
            aria-haspopup="true"
            aria-controls="mobile-nav-panel"
            [attr.aria-expanded]="menuOpen()"
            matTooltip="Menü"
          >
            <mat-icon aria-hidden="true">menu</mat-icon>
          </button>
        </div>
      </div>
    </mat-toolbar>

    <!-- Mobile Navigation: Sandwich-Menü als Overlay-Drawer. -->
    <div class="mobile-menu" [class.open]="menuOpen()">
      <div class="mobile-menu__scrim" (click)="closeMenu()" aria-hidden="true"></div>
      <nav
        #mobilePanel
        id="mobile-nav-panel"
        class="mobile-menu__panel"
        aria-label="Mobile Hauptnavigation"
        tabindex="-1"
      >
        <div class="mobile-menu__head">
          <span class="mobile-menu__title">Navigation</span>
          <button
            mat-icon-button
            type="button"
            class="mobile-menu__close"
            (click)="closeMenu()"
            aria-label="Menü schließen"
          >
            <mat-icon aria-hidden="true">close</mat-icon>
          </button>
        </div>
        <ul class="mobile-menu__list">
          <li>
            <a
              mat-button
              routerLink="/"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              (click)="closeMenu()"
            >
              Start
            </a>
          </li>
          <li>
            <a mat-button routerLink="/scenarios" routerLinkActive="active" (click)="closeMenu()">
              Fallbeispiele
            </a>
          </li>
          <li>
            <a
              mat-button
              routerLink="/strafgesetzbuch"
              routerLinkActive="active"
              (click)="closeMenu()"
            >
              Strafgesetzbuch
            </a>
          </li>
          <li>
            <a mat-button routerLink="/bgb" routerLinkActive="active" (click)="closeMenu()">
              Bürgerliches Gesetzbuch
            </a>
          </li>
          <li>
            <a
              mat-button
              routerLink="/jedermannsrechte"
              routerLinkActive="active"
              (click)="closeMenu()"
            >
              Jedermannsrechte
            </a>
          </li>
          <li>
            <a
              mat-button
              routerLink="/pruefungssimulation"
              routerLinkActive="active"
              (click)="closeMenu()"
            >
              Prüfungssimulation
            </a>
          </li>
        </ul>
      </nav>
    </div>
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
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        color: var(--ft-header-text);
        text-decoration: none;
      }
      /* Marken-Schild als SVG-Asset; die Wortmarke bleibt HTML-Text,
         damit sie in Light und Dark Mode lesbar bleibt. */
      .brand-mark {
        display: block;
        width: 38px;
        height: 38px;
        flex: 0 0 auto;
      }
      .brand-text {
        display: flex;
        flex-direction: column;
        line-height: 1.12;
      }
      .brand-text strong {
        display: inline-flex;
        align-items: baseline;
        gap: 0.3em;
        color: var(--ft-brand-word);
        font-weight: 800;
        letter-spacing: -0.01em;
        white-space: nowrap;
      }
      .brand-34a {
        font-size: 1.14rem;
      }
      .brand-a {
        color: #22d3ee;
      }
      .brand-name {
        font-size: 0.98rem;
        letter-spacing: 0.06em;
      }
      .brand-text small {
        font-size: 0.7rem;
        color: var(--ft-brand-sub);
      }
      .toolbar-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .nav {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
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
      /* Hamburger nur auf schmalen Screens: 44px Touch-Target. */
      .menu-toggle {
        display: none;
        width: 44px;
        height: 44px;
        padding: 0;
        color: var(--ft-header-text);
      }
      .menu-toggle mat-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
      }

      /* ---------- Mobile Navigation (Overlay-Drawer) ---------- */
      .mobile-menu {
        position: fixed;
        inset: 0;
        z-index: 60;
        visibility: hidden;
        pointer-events: none;
        /* Beim Schließen bleibt der Drawer kurz sichtbar, damit die
           Ausblend-Animation läuft. */
        transition: visibility 0s linear 320ms;
      }
      .mobile-menu.open {
        visibility: visible;
        pointer-events: auto;
        transition-delay: 0s;
      }
      .mobile-menu__scrim {
        position: absolute;
        inset: 0;
        background: var(--ft-overlay);
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
        opacity: 0;
        transition: opacity var(--ft-motion);
      }
      .mobile-menu.open .mobile-menu__scrim {
        opacity: 1;
      }
      .mobile-menu__panel {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: min(320px, 86vw);
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem 1rem 1.5rem;
        overflow-y: auto;
        background: var(--ft-header-glass);
        backdrop-filter: blur(var(--ft-blur-header)) saturate(150%);
        -webkit-backdrop-filter: blur(var(--ft-blur-header)) saturate(150%);
        border-left: 1px solid var(--ft-header-border);
        border-top-left-radius: var(--ft-radius-xl);
        border-bottom-left-radius: var(--ft-radius-xl);
        box-shadow: var(--ft-elevation-3);
        transform: translateX(100%);
        transition: transform var(--ft-motion-slow);
        outline: none;
      }
      .mobile-menu.open .mobile-menu__panel {
        transform: translateX(0);
      }
      .mobile-menu__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        margin-bottom: 0.25rem;
      }
      .mobile-menu__title {
        font-size: 0.76rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--ft-muted);
      }
      .mobile-menu__close {
        color: var(--ft-header-text);
      }
      .mobile-menu__list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.25rem;
      }
      .mobile-menu__list a {
        display: block;
        justify-content: flex-start;
        width: 100%;
        padding: 0.75rem 0.9rem;
        min-height: 44px;
        color: var(--ft-header-text);
        font-weight: 500;
        border-radius: var(--ft-radius-sm);
      }
      .mobile-menu__list a.active {
        background: var(--ft-accent-soft);
        color: var(--ft-accent-strong);
      }

      @media (min-width: 768px) {
        .app-toolbar {
          padding-inline: 2rem;
        }
      }
      /* Schmale Desktop-/Tablet-Breite: Der Untertitel entfällt (optional)
         und die Navigation wird kompakter, damit der Header einzeilig
         bleibt und nicht überläuft. */
      @media (max-width: 900px) {
        .app-toolbar {
          padding-inline: 1.1rem;
        }
        .brand-text small {
          display: none;
        }
        .nav a {
          padding-inline: 0.45rem;
          font-size: 0.9rem;
        }
      }
      /* Ab hier echte Hamburger-Navigation: Desktop-Links aus, Menü-Button an. */
      @media (max-width: 767.98px) {
        .desktop-nav {
          display: none;
        }
        .menu-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      }
      @media (max-width: 640px) {
        .brand-text small {
          display: none;
        }
      }
      @media (max-width: 430px) {
        .brand-text strong {
          font-size: 1rem;
        }
      }
      /* Reduced Motion: direkt in den schwebenden Zustand, keine
         aufwendige Übergangsanimation. */
      @media (prefers-reduced-motion: reduce) {
        .app-toolbar,
        .mobile-menu,
        .mobile-menu__scrim,
        .mobile-menu__panel {
          transition: none;
        }
      }
    `,
  ],
})
export class AppHeaderComponent {
  readonly theme = inject(ThemeService);
  readonly isScrolled = signal(false);
  readonly menuOpen = signal(false);

  private readonly menuButton = viewChild('menuButton', { read: ElementRef });
  private readonly mobilePanel = viewChild('mobilePanel', { read: ElementRef });

  constructor() {
    this.syncScrollState();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.syncScrollState();
  }

  /** ESC schließt das mobile Menü und gibt den Fokus zurück. */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menuOpen()) {
      this.closeMenu();
    }
  }

  openMenu(): void {
    this.menuOpen.set(true);
    setTimeout(() => this.mobilePanel()?.nativeElement.focus());
  }

  closeMenu(): void {
    if (!this.menuOpen()) {
      return;
    }
    this.menuOpen.set(false);
    this.menuButton()?.nativeElement.focus();
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
