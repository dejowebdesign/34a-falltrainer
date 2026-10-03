import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LegalNorm } from '../../core/models';
import { LegalKnowledgeService } from '../../core/services/legal-knowledge.service';
import { formatFachlicheEinordnung, formatNorm } from '../../core/utils/norm-format';

interface OrientationGroup {
  label: string;
  items: string[];
}

interface OrientationArea {
  key: string;
  label: string;
  icon: string;
  /** Norm-IDs; leer, wenn der Bereich nur allgemeine Rechtsbegriffe zeigt. */
  normIds: string[];
  /** Begriffgruppen ohne Paragraph (z. B. Gefahrenlage / Gefahrenquelle). */
  groups: OrientationGroup[];
}

/**
 * Lernhilfe: Weg von der rechtlichen Einordnung zur möglichen Rechtsgrundlage.
 *
 * Die beiden Diagramme enthalten bewusst keine Merksätze. Die Struktur selbst
 * führt von "Was liegt rechtlich vor?" zu "Mit welcher Rechtsgrundlage darf ich
 * eingreifen?". Alle Paragraphen werden über die zentrale Normdatenquelle mit
 * offiziellem Gesetzestitel dargestellt.
 *
 * Layout: Die drei Karten jeder Reihe liegen in einem echten 3-Spalten-Grid.
 * Das "ODER" ist absolut im Spaltenzwischenraum positioniert und zählt daher
 * nicht als eigene Spalte – die Karten bleiben dadurch gleich breit. Zwischen
 * den Ebenen führt genau ein zentraler Pfeil nach unten; die Überschrift der
 * zweiten Ebene steht unterhalb der unteren Karten.
 */
@Component({
  selector: 'app-legal-orientation',
  imports: [MatCardModule, MatIconModule],
  template: `
    <section class="orientation" aria-label="Lernhilfe zur rechtlichen Orientierung">
      <h3 class="diagram-title">
        <span class="diagram-index">1</span>
        Was liegt rechtlich vor?
      </h3>

      <div class="areas-row">
        @for (area of classificationAreas; track area.key; let i = $index) {
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
              @for (group of area.groups; track group.label) {
                <li class="group">
                  <span class="group-label">{{ group.label }}</span>
                  <ul class="group-items">
                    @for (item of group.items; track item) {
                      <li>{{ item }}</li>
                    }
                  </ul>
                </li>
              }
            </ul>
          </div>
          @if (i < 2) {
            <div class="oder" aria-hidden="true">ODER</div>
          }
        }
      </div>

      <div class="level-link" aria-hidden="true">
        <mat-icon>south</mat-icon>
        <span class="level-link-label">rechtlich einordnen</span>
      </div>

      <div class="areas areas-bottom">
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

      <h3 class="diagram-title diagram-title-bottom">
        <span class="diagram-index">2</span>
        Mit welcher Rechtsgrundlage dürfen Sie eingreifen?
      </h3>
    </section>
  `,
  styles: [
    `
      .orientation {
        display: grid;
        gap: 0.9rem;
      }
      .diagram-title {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        margin: 0;
        font-size: 1.05rem;
      }
      .diagram-title-bottom {
        margin-top: 0.15rem;
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
      /* Echtes 3-Spalten-Grid: die drei Karten sind exakt gleich breit. */
      .areas,
      .areas-row {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1.5rem;
        align-items: stretch;
      }
      /* Das "ODER" liegt absolut im Zwischenraum und ist keine eigene Spalte. */
      .areas-row {
        position: relative;
      }
      .oder {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--ft-muted);
        padding: 0.12rem 0.3rem;
        border-radius: 999px;
        background: var(--ft-surface);
        z-index: 1;
      }
      .areas-row > .oder:nth-child(2) {
        left: calc(33.333% - 0.25rem);
      }
      .areas-row > .oder:nth-child(4) {
        left: calc(66.666% + 0.25rem);
      }
      .level-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.15rem;
        color: var(--ft-primary);
        margin-block: 0.15rem;
      }
      .level-link-label {
        font-size: 0.72rem;
        letter-spacing: 0.04em;
        color: var(--ft-muted);
      }
      .level-link mat-icon {
        font-size: 26px;
        width: 26px;
        height: 26px;
      }
      .area {
        border: 1px solid var(--ft-border);
        border-radius: 10px;
        background: var(--ft-surface-2);
        padding: 0.75rem 0.85rem;
        display: flex;
        flex-direction: column;
        min-height: 8.5rem;
        min-width: 0;
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
      .group {
        display: grid;
        gap: 0.25rem;
        font-size: 0.92rem;
        line-height: 1.4;
      }
      .group-label {
        font-weight: 600;
        color: var(--ft-text);
      }
      .group-items {
        list-style: disc;
        margin: 0;
        padding-left: 1.15rem;
        display: grid;
        gap: 0.15rem;
        color: var(--ft-muted);
      }
      .einordnung {
        color: var(--ft-muted);
        font-size: 0.8rem;
        font-style: italic;
      }
      /* Mobile: Karten stapeln sich; das "ODER" wird zur eigenen Zeile. */
      @media (max-width: 767px) {
        .areas,
        .areas-row {
          grid-template-columns: 1fr;
          gap: 0.85rem;
        }
        .areas-row > .oder {
          position: static;
          transform: none;
          justify-self: center;
        }
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
      groups: [],
    },
    {
      key: 'privatrecht',
      label: 'Privatrecht',
      icon: 'handshake',
      normIds: ['bgb-858', 'bgb-861', 'bgb-862'],
      groups: [],
    },
    {
      key: 'gefahr',
      label: 'Gefahr',
      icon: 'warning',
      normIds: [],
      groups: [
        { label: 'Gefahrenlage', items: ['drohende Gefahr', 'gegenwärtige Gefahr'] },
        {
          label: 'Gefahrenquelle',
          items: ['Gefahr geht von einem Menschen aus', 'Gefahr geht von einer Sache aus'],
        },
      ],
    },
  ];

  readonly authorityAreas: OrientationArea[] = [
    {
      key: 'festnahme',
      label: 'Festnahme',
      icon: 'pan_tool',
      normIds: ['stpo-127'],
      groups: [],
    },
    {
      key: 'selbsthilfe',
      label: 'Selbsthilfe des Besitzers / Besitzdieners',
      icon: 'front_hand',
      normIds: ['bgb-859', 'bgb-860'],
      groups: [],
    },
    {
      key: 'notstand',
      label: 'Notstand / Rechtfertigung',
      icon: 'balance',
      normIds: ['bgb-228', 'bgb-904', 'stgb-34'],
      groups: [],
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
