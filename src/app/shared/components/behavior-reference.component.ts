import { Component, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  BEHAVIOR_CATALOG,
  BEHAVIOR_CATEGORY_LABELS,
  BehaviorCategory,
} from '../../core/data/behavior-catalog.data';

interface BehaviorGroup {
  category: BehaviorCategory;
  label: string;
  entries: { id: string; label: string; explanation: string }[];
}

/**
 * Referenz der Stufe-1-Verhaltensbausteine (Umgang mit Menschen).
 *
 * Didaktische Grundlage ist die Themenvertiefung (30.09.2026). Die Bausteine
 * sind Verhaltensempfehlungen, keine Rechtsgrundlagen.
 */
@Component({
  selector: 'app-behavior-reference',
  imports: [MatCardModule, MatIconModule],
  template: `
    <mat-card appearance="outlined" class="behavior-card">
      <mat-card-content>
        <p class="behavior-note">
          Verhaltensbausteine, die in Stufe 1 trainiert werden. Sie sind Verhaltensempfehlungen,
          keine Rechtsgrundlagen.
        </p>
        <div class="groups">
          @for (group of groups(); track group.category) {
            <section class="group">
              <h3>{{ group.label }}</h3>
              <ul>
                @for (entry of group.entries; track entry.id) {
                  <li>
                    <mat-icon aria-hidden="true">check_circle</mat-icon>
                    <div>
                      <strong>{{ entry.label }}</strong>
                      <p>{{ entry.explanation }}</p>
                    </div>
                  </li>
                }
              </ul>
            </section>
          }
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .behavior-card {
        border-radius: var(--ft-radius-lg);
      }
      .behavior-note {
        margin: 0 0 1rem;
        color: var(--ft-muted);
        font-size: 0.85rem;
        line-height: 1.55;
      }
      .groups {
        column-count: 1;
        column-gap: 2rem;
      }
      @media (min-width: 768px) {
        .groups {
          column-count: 2;
        }
      }
      .group {
        break-inside: avoid;
        page-break-inside: avoid;
        margin-bottom: 1.25rem;
      }
      .group:last-child {
        margin-bottom: 0;
      }
      .group h3 {
        margin: 0 0 0.5rem;
        font-size: 0.95rem;
        color: var(--ft-primary);
      }
      .group ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.5rem;
      }
      .group li {
        display: flex;
        gap: 0.45rem;
        align-items: flex-start;
      }
      .group mat-icon {
        color: var(--ft-ok);
        font-size: 18px;
        width: 18px;
        height: 18px;
        flex: 0 0 auto;
        margin-top: 2px;
      }
      .group strong {
        font-size: 0.92rem;
      }
      .group p {
        margin: 0.1rem 0 0;
        color: var(--ft-muted);
        font-size: 0.84rem;
        line-height: 1.4;
      }
    `,
  ],
})
export class BehaviorReferenceComponent {
  readonly groups = computed<BehaviorGroup[]>(() =>
    (Object.keys(BEHAVIOR_CATEGORY_LABELS) as BehaviorCategory[]).map((category) => ({
      category,
      label: BEHAVIOR_CATEGORY_LABELS[category],
      entries: BEHAVIOR_CATALOG.filter((entry) => entry.category === category).map((entry) => ({
        id: entry.id,
        label: entry.label,
        explanation: entry.explanation,
      })),
    })),
  );
}
