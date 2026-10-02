import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OptionVerdict } from '../../core/models';

/** Sichtbare Darstellung RICHTIG / TEILWEISE RICHTIG / FALSCH. */
@Component({
  selector: 'app-verdict-badge',
  imports: [MatIconModule],
  template: `
    <span class="badge" [class]="'badge-' + tone()">
      <mat-icon aria-hidden="true">{{ icon() }}</mat-icon>
      {{ label() }}
    </span>
  `,
  styles: [
    `
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.3rem 0.7rem;
        border-radius: 999px;
        font-size: 0.82rem;
        font-weight: 600;
        letter-spacing: 0.01em;
        border: 1px solid transparent;
      }
      .badge mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }
      .badge-ok {
        background: #dcfce7;
        color: #14532d;
        border-color: #86efac;
      }
      .badge-partial {
        background: #fef3c7;
        color: #78350f;
        border-color: #fcd34d;
      }
      .badge-bad {
        background: #fee2e2;
        color: #7f1d1d;
        border-color: #fca5a5;
      }
    `,
  ],
})
export class VerdictBadgeComponent {
  readonly verdict = input<OptionVerdict>('RICHTIG');

  label(): string {
    switch (this.verdict()) {
      case 'RICHTIG':
        return 'Richtig';
      case 'TEILWEISE_RICHTIG':
        return 'Teilweise richtig';
      case 'FALSCH':
        return 'Falsch';
    }
  }

  icon(): string {
    switch (this.verdict()) {
      case 'RICHTIG':
        return 'check_circle';
      case 'TEILWEISE_RICHTIG':
        return 'error_outline';
      case 'FALSCH':
        return 'cancel';
    }
  }

  tone(): 'ok' | 'partial' | 'bad' {
    switch (this.verdict()) {
      case 'RICHTIG':
        return 'ok';
      case 'TEILWEISE_RICHTIG':
        return 'partial';
      case 'FALSCH':
        return 'bad';
    }
  }
}
