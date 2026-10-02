import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule],
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
        <nav aria-label="Hauptnavigation" class="nav">
          <a mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
            Start
          </a>
          <a mat-button routerLink="/scenarios" routerLinkActive="active">Fälle</a>
        </nav>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      .skip-link {
        position: absolute;
        left: -9999px;
        top: 0;
        background: #0f766e;
        color: #fff;
        padding: 0.75rem 1rem;
        z-index: 1000;
      }
      .skip-link:focus {
        left: 0;
      }
      .app-toolbar {
        background: var(--ft-primary);
        color: #fff;
        height: auto;
        min-height: 68px;
        padding-block: 0.5rem;
        box-shadow: 0 1px 3px rgba(15, 23, 42, 0.18);
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
      .nav {
        display: flex;
        gap: 0.25rem;
      }
      .nav a.active {
        background: rgba(255, 255, 255, 0.16);
      }
      @media (max-width: 480px) {
        .brand-text small {
          display: none;
        }
      }
    `,
  ],
})
export class AppHeaderComponent {}
