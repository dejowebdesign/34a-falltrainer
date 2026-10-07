import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CoreCategory } from '../../core/models';

/**
 * Merkkarte der vier Kernkategorien Anspruch ≠ Befugnis ≠ Rechtfertigung ≠
 * Entschuldigung. Rein strukturell – bewusst ohne Merksatz-Slogans.
 */
@Component({
  selector: 'app-core-categories',
  imports: [MatIconModule],
  template: `
    <section class="core" aria-label="Anspruch, Befugnis, Rechtfertigung und Entschuldigung">
      <header class="core-head">
        <h2>{{ heading }}</h2>
        <p>{{ intro }}</p>
      </header>
      <div class="core-grid">
        @for (category of categories; track category.key) {
          <article class="core-card ft-glass-card">
            <mat-icon aria-hidden="true">{{ icon(category.key) }}</mat-icon>
            <h3>{{ category.label }}</h3>
            <p>„{{ category.question }}“</p>
          </article>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .core {
        display: grid;
        gap: 1rem;
      }
      .core-head h2 {
        margin: 0 0 0.4rem;
        font-size: clamp(1.2rem, 2.4vw, 1.5rem);
      }
      .core-head p {
        margin: 0;
        color: var(--ft-muted);
        max-width: 720px;
        line-height: 1.6;
      }
      .core-grid {
        display: grid;
        gap: 0.85rem;
        grid-template-columns: minmax(0, 1fr);
      }
      @media (min-width: 640px) {
        .core-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      @media (min-width: 1080px) {
        .core-grid {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
      }
      .core-card {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        padding: 1.1rem 1.15rem;
        border-radius: var(--ft-radius-lg);
      }
      .core-card mat-icon {
        color: var(--ft-accent-strong);
      }
      .core-card h3 {
        margin: 0;
        font-size: 1.05rem;
      }
      .core-card p {
        margin: 0;
        color: var(--ft-muted);
        line-height: 1.55;
      }
    `,
  ],
})
export class CoreCategoriesComponent {
  @Input({ required: true }) categories!: CoreCategory[];
  @Input() heading = 'Anspruch, Befugnis, Rechtfertigung, Entschuldigung';
  @Input()
  intro =
    'Diese vier Ebenen werden strikt getrennt. Sie beantworten unterschiedliche Fragen und dürfen nicht vermischt werden.';

  icon(key: CoreCategory['key']): string {
    switch (key) {
      case 'ANSPRUCH':
        return 'gavel';
      case 'BEFUGNIS':
        return 'verified_user';
      case 'RECHTFERTIGUNG':
        return 'shield';
      case 'ENTSCHULDIGUNG':
        return 'psychology_alt';
      default:
        return 'info';
    }
  }
}
