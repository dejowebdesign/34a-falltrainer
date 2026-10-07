import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthorityMatrixRow } from '../../core/models';

/**
 * Vergleichsmatrix „Welches Recht könnte greifen?“.
 *
 * Didaktische Orientierung, ausdrücklich keine automatische Entscheidungs-
 * maschine: Die Tabelle ersetzt die Prüfung des Einzelfalls nicht. Zeilen mit
 * `normId` lassen sich anklicken und öffnen die zugehörige Lernkarte.
 */
@Component({
  selector: 'app-authority-matrix',
  imports: [MatIconModule],
  template: `
    <section class="matrix" aria-label="Welches Recht könnte greifen">
      <header class="matrix-head">
        <span class="ft-eyebrow">Orientierung</span>
        <h2>Welches Recht könnte greifen?</h2>
        <p>
          Die Matrix ordnet typische Lagen den möglichen Rechtsgrundlagen zu. Sie ist eine
          Orientierungshilfe und keine automatische Entscheidung – die Voraussetzungen sind im
          Einzelfall zu prüfen.
        </p>
      </header>

      <div class="matrix-scroll">
        <table class="matrix-table">
          <caption class="visually-hidden">
            Vergleich von Situation, Rechtsgrundlage, Kernvoraussetzung und Zweck
          </caption>
          <thead>
            <tr>
              <th scope="col">Situation</th>
              <th scope="col">Rechtsgrundlage</th>
              <th scope="col">Kernvoraussetzung</th>
              <th scope="col">Zweck</th>
            </tr>
          </thead>
          <tbody>
            @for (row of rows; track row.situation) {
              <tr>
                <th scope="row">{{ row.situation }}</th>
                <td>
                  @if (row.normId) {
                    <button
                      type="button"
                      class="norm-link"
                      (click)="openNorm.emit(row.normId)"
                      [attr.aria-label]="'Lernkarte zu ' + row.legalBasis + ' öffnen'"
                    >
                      {{ row.legalBasis }}
                      <mat-icon aria-hidden="true">arrow_forward</mat-icon>
                    </button>
                  } @else {
                    {{ row.legalBasis }}
                  }
                </td>
                <td>{{ row.coreRequirement }}</td>
                <td>{{ row.purpose }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [
    `
      .matrix {
        display: grid;
        gap: 1rem;
      }
      .matrix-head h2 {
        margin: 0.35rem 0 0.4rem;
        font-size: clamp(1.2rem, 2.4vw, 1.5rem);
      }
      .matrix-head p {
        margin: 0;
        color: var(--ft-muted);
        max-width: 760px;
        line-height: 1.6;
      }

      .matrix-scroll {
        overflow-x: auto;
        border: 1px solid var(--ft-border);
        border-radius: var(--ft-radius-lg);
        background: var(--ft-surface);
      }
      .matrix-table {
        width: 100%;
        border-collapse: collapse;
        min-width: 640px;
      }
      .matrix-table th,
      .matrix-table td {
        text-align: left;
        padding: 0.75rem 0.9rem;
        border-bottom: 1px solid var(--ft-border);
        vertical-align: top;
        line-height: 1.5;
      }
      .matrix-table thead th {
        font-size: 0.78rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--ft-muted);
        background: var(--ft-surface-2);
      }
      .matrix-table tbody th {
        font-weight: 700;
        color: var(--ft-text);
      }
      .matrix-table tbody tr:last-child th,
      .matrix-table tbody tr:last-child td {
        border-bottom: none;
      }
      .norm-link {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0;
        border: none;
        background: none;
        font: inherit;
        font-weight: 700;
        color: var(--ft-primary);
        cursor: pointer;
      }
      .norm-link mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
        transition: transform var(--ft-motion);
      }
      .norm-link:hover mat-icon {
        transform: translateX(3px);
      }
      .norm-link:focus-visible {
        outline: 3px solid var(--ft-accent);
        outline-offset: 2px;
        border-radius: 4px;
      }

      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `,
  ],
})
export class AuthorityMatrixComponent {
  @Input({ required: true }) rows!: AuthorityMatrixRow[];
  @Output() openNorm = new EventEmitter<string>();
}
