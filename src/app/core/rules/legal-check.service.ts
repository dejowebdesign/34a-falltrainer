import { Injectable, inject } from '@angular/core';
import { ForbiddenAutomatism, FORBIDDEN_AUTOMATISMS } from '../data/forbidden-automatisms.data';
import { LegalKnowledgeService } from '../services/legal-knowledge.service';
import { LegalAuthority } from '../models';

/** Ergebnis einer juristischen Trennpüfung. */
export interface SeparationCheck {
  /** Geprüfte Norm. */
  normId: string;
  /** Kategorie, in die die Norm gehört. */
  category: 'ANSPRUCH' | 'BEFUGNIS' | 'RECHTFERTIGUNG' | 'ENTSCHULDIGUNG' | 'GRUNDLAGE';
  /** Ob die Norm als Eingriffsbefugnis missverstanden werden kann. */
  isAuthority: boolean;
  /** Hinweis, falls die Norm keine unmittelbare Handlungsbefugnis ist. */
  warning?: string;
}

/**
 * Prüft die strikte juristische Trennung (Bibel-Kapitel 5, 74).
 *
 * Anspruch ≠ Befugnis, Befugnis ≠ Rechtfertigung,
 * Rechtfertigung ≠ Entschuldigung.
 */
@Injectable({ providedIn: 'root' })
export class LegalCheckService {
  private readonly knowledge = inject(LegalKnowledgeService);

  /** Ordnet eine Norm ihrer Kernkategorie zu. */
  classifyNorm(normId: string): SeparationCheck {
    const norm = this.knowledge.getNorm(normId);
    if (!norm) {
      return {
        normId,
        category: 'GRUNDLAGE',
        isAuthority: false,
        warning: 'Norm nicht in der Knowledge Base vorhanden – Daten fehlen.',
      };
    }

    const isAuthority = norm.nature === 'BEFUGNIS' || norm.nature === 'RECHTFERTIGUNG';
    let warning: string | undefined;
    if (norm.nature === 'ANSPRUCH') {
      warning = 'Anspruch ist nicht Befugnis – die Norm begründet kein unmittelbares Eingriffsrecht.';
    }
    if (norm.nature === 'ENTSCHULDIGUNG') {
      warning = 'Entschuldigung ist nicht Rechtfertigung – die Tat bleibt rechtswidrig.';
    }

    return { normId, category: norm.nature, isAuthority, warning };
  }

  /**
   * Findet verbotene Automatismen zu einem Schlagwort.
   * Grundlage: Bibel-Kapitel 13 und 62.
   */
  findAutomatisms(keyword: string): ForbiddenAutomatism[] {
    const needle = keyword.toLowerCase();
    return FORBIDDEN_AUTOMATISMS.filter((entry) => entry.trigger.toLowerCase().includes(needle));
  }

  /** Alle verbotenen Automatismen. */
  getAutomatisms(): ForbiddenAutomatism[] {
    return FORBIDDEN_AUTOMATISMS;
  }

  /**
   * Prüft, ob eine Befugnis für eine Handlung die Voraussetzungen erfüllt.
   * Eine Befugnis darf nie allein aus einem Straftatbestand abgeleitet werden.
   */
  authorityRequiresOwnPrerequisites(authority: LegalAuthority): boolean {
    return authority.prerequisites.length > 0 && authority.kind === 'BEFUGNIS';
  }
}
