import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LegalNorm } from '../../core/models';
import { LegalKnowledgeService } from '../../core/services/legal-knowledge.service';
import { formatFachlicheEinordnung, formatNorm } from '../../core/utils/norm-format';

interface OrientationArea {
  key: string;
  label: string;
  icon: string;
  /** Norm-IDs; leer, wenn der Bereich nur einen allgemeinen Rechtsbegriff zeigt. */
  normIds: string[];
  /** Allgemeine Rechtsbegriffe ohne Paragraph (z. B. Gefahrenbegriffe). */
  concepts: string[];
}

/**
 * Lernhilfe: Weg von der rechtlichen Einordnung zur möglichen Rechtsgrundlage.
 *
 * Die beiden Diagramme enthalten bewusst keine Merksätze. Die Struktur selbst
 * führt von "Was liegt rechtlich vor?" zu "Mit welcher Rechtsgrundlage darf ich
 * eingreifen?". Alle Paragraphen werden über die zentrale Normdatenquelle mit
 * offiziellem Gesetzestitel dargestellt.
 */
@Component({
  selector: 'app-legal-orientation',
  imports: [MatCardModule, MatIconModule],
  template: `
    <section class="orientation" aria-label="Lernhilfe zur rechtlichen Orientierung">
      <div class="diagram">
        <h3 class="diagram-title">
          <span class="diagram-index">1</span>
          Was liegt rechtlich vor?
        </h3>
        <div class="areas-row">
          @for (area of classificationAreas; track area.key; let last = $last) {
            <div class="area-col">
              <div class="area">
                <div class="area-head">
                  <mat-icon aria-hidden="true">{{ area.icon }}</mat-icon>
                  <span>{{ area.label }}</span>
                </div>
                <ul class="entries">
                  @for (norm of normsFor(area); track norm.id) {
                    <li class="entry">
                      <span class="norm">{{ formatNorm(norm) }}</span>
                      @if (formatFachlicheEinordnung(norm); as einordnung) {
                        <span class="einordnung">{{ einordnung }}</span>
                      }
                    </li>
                  }
                  @for (concept of area.concepts; track concept) {
                    <li class="entry concept">{{ concept }}</li>
                  }
                </ul>
              </div>
              <div class="area-arrow" aria-hidden="true">
                <mat-icon>south</mat-icon>
              </div>
            </div>
            @if (!last) {
              <div class="oder" aria-hidden="true">ODER</div>
            }
          }
        </div>
      </div>

      <div class="diagram">
        <h3 class="diagram-title">
          <span class="diagram-index">2</span>
          Mit welcher Rechtsgrundlage dürfen Sie eingreifen?
        </h3>
        <div class="areas">
          @for (area of authorityAreas; track area.key) {
            <div class="area">
              <div class="area-head">
                <mat-icon aria-hidden="true">{{ area.icon }}</mat-icon>
                <span>{{ area.label }}</span>
              </div>
              <ul class="entries">
                @for (norm of normsFor(area); track norm.id) {
                  <li class="entry">
                    <span class="norm">{{ formatNorm(norm) }}</span>
                    @if (formatFachlicheEinordnung(norm); as einordnung) {
                      <span class="einordnung">Fachliche Einordnung: {{ einordnung }}</span>
                    }
                  </li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .orientation {
        display: grid;
        gap: 0.5rem;
      }
      .diagram {
        border: 1px solid var(--ft-border);
        border-radius: 14px;
        padding: 1rem;
        background: var(--ft-surface);
      }
      .diagram-title {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        margin: 0 0 0.9rem;
        font-size: 1.05rem;
      }
      .diagram-index {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: var(--ft-primary);
        color: var(--ft-on-primary);
        font-size: 0.85rem;
        font-weight: 700;
        flex: 0 0 auto;
      }
      .areas {
        display: grid;
        gap: 0.85rem;
        grid-template-columns: 1fr;
      }
      @media (min-width: 768px) {
        .areas {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      /* Erste Reihe: Kästen + mittiges "ODER" + Pfeil unter jedem Kasten. */
      .areas-row {
        display: grid;
        gap: 0.6rem;
        align-items: stretch;
        grid-template-columns: 1fr;
      }
      @media (min-width: 768px) {
        .areas-row {
          grid-template-columns: 1fr auto 1fr auto 1fr;
          gap: 0.85rem;
        }
      }
      .area-col {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        min-width: 0;
      }
      .area-col .area {
        flex: 1;
      }
      .oder {
        align-self: center;
        justify-self: center;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--ft-muted);
        padding: 0.15rem 0;
      }
      .area-arrow {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--ft-primary);
      }
      .area-arrow mat-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
      }
      .area {
        border: 1px solid var(--ft-border);
        border-radius: 10px;
        background: var(--ft-surface-2);
        padding: 0.75rem 0.85rem;
      }
      .area-head {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-weight: 600;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--ft-primary);
        margin-bottom: 0.6rem;
      }
      .area-head mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
      .entries {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 0.45rem;
      }
      .entry {
        display: grid;
        gap: 0.15rem;
        font-size: 0.92rem;
        line-height: 1.4;
      }
      .entry .norm {
        color: var(--ft-text);
      }
      .entry.concept {
        color: var(--ft-text);
      }
      .einordnung {
        color: var(--ft-muted);
        font-size: 0.8rem;
        font-style: italic;
      }
    `,
  ],
})
export class LegalOrientationComponent {
  private readonly knowledge = inject(LegalKnowledgeService);

  readonly classificationAreas: OrientationArea[] = [
    {
      key: 'strafrecht',
      label: 'Strafrecht',
      icon: 'gavel',
      normIds: ['stgb-242', 'stgb-223', 'stgb-123'],
      concepts: [],
    },
    {
      key: 'privatrecht',
      label: 'Privatrecht',
      icon: 'handshake',
      normIds: ['bgb-858', 'bgb-861', 'bgb-862'],
      concepts: [],
    },
    {
      key: 'gefahr',
      label: 'Gefahr',
      icon: 'warning',
      normIds: [],
      concepts: ['drohende Gefahr', 'gegenwärtige Gefahr'],
    },
  ];

  readonly authorityAreas: OrientationArea[] = [
    {
      key: 'festnahme',
      label: 'Festnahme',
      icon: 'pan_tool',
      normIds: ['stpo-127'],
      concepts: [],
    },
    {
      key: 'selbsthilfe',
      label: 'Selbsthilfe des Besitzers / Besitzdieners',
      icon: 'front_hand',
      normIds: ['bgb-859', 'bgb-860'],
      concepts: [],
    },
    {
      key: 'notstand',
      label: 'Notstand / Rechtfertigung',
      icon: 'balance',
      normIds: ['bgb-228', 'bgb-904', 'stgb-34'],
      concepts: [],
    },
  ];

  private readonly resolved = computed(() => {
    const map = new Map<string, LegalNorm>();
    for (const norm of this.knowledge.getNorms()) {
      map.set(norm.id, norm);
    }
    return map;
  });

  normsFor(area: OrientationArea): LegalNorm[] {
    const map = this.resolved();
    return area.normIds.map((id) => map.get(id)).filter((norm): norm is LegalNorm => !!norm);
  }

  formatNorm = formatNorm;
  formatFachlicheEinordnung = formatFachlicheEinordnung;
}
