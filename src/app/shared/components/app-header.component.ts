import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../core/services/theme.service';

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
    <mat-toolbar class="app-toolbar" role="banner">
      <div class="ft-container toolbar-inner">
        <a routerLink="/" class="brand" aria-label="34a Falltrainer Startseite">
          <mat-icon aria-hidden="true">gavel</mat-icon>
          <span class="brand-text">
            <strong>34a Falltrainer</strong>
            <small>Sachkundeprüfung §34a GewO</small>
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
            <a mat-button routerLink="/scenarios" routerLinkActive="active">Fälle</a>
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
      .skip-link {
        position: absolute;
        left: -9999px;
        top: 0;
        background: var(--ft-accent);
        color: var(--ft-on-primary);
        padding: 0.75rem 1rem;
        z-index: 1000;
      }
      .skip-link:focus {
        left: 0;
      }
      .app-toolbar {
        background: var(--ft-header);
        color: #fff;
        height: auto;
        min-height: 68px;
        padding-block: 0.5rem;
        box-shadow: var(--ft-shadow);
        transition: background-color 0.2s ease;
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
        gap: 0.6rem;
        color: #fff;
        text-decoration: none;
      }
      .brand-text {
        display: flex;
        flex-direction: column;
        line-height: 1.15;
      }
      .brand-text strong {
        font-size: 1.1rem;
        font-weight: 600;
      }
      .brand-text small {
        font-size: 0.72rem;
        opacity: 0.85;
      }
      .toolbar-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .nav {
        display: flex;
        gap: 0.25rem;
      }
      .nav a {
        color: #fff;
      }
      .nav a.active {
        background: rgba(255, 255, 255, 0.16);
      }
      .theme-toggle {
        color: #fff;
      }
      @media (max-width: 480px) {
        .brand-text small {
          display: none;
        }
      }
    `,
  ],
})
export class AppHeaderComponent {
  readonly theme = inject(ThemeService);

  toggleLabel(): string {
    return this.theme.theme() === 'dark' ? 'Light Mode aktivieren' : 'Dark Mode aktivieren';
  }
}
