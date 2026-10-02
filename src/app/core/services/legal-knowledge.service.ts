import { Injectable } from '@angular/core';
import { LEGAL_NORMS } from '../data/legal-norms.data';
import { LEGAL_CLASSIFICATIONS } from '../data/legal-classifications.data';
import { LEGAL_AUTHORITIES } from '../data/legal-authorities.data';
import { LegalAuthority, LegalClassification, LegalNorm } from '../models';

/**
 * Zugriff auf die juristische Knowledge Base (V5.3.1).
 *
 * Die Daten stammen ausschließlich aus 34a_bibel_v5_3_1.txt. Fehlende Daten
 * werden als fehlend zurückgegeben – es wird nichts hinzugedichtet.
 */
@Injectable({ providedIn: 'root' })
export class LegalKnowledgeService {
  private readonly norms = new Map<string, LegalNorm>(
    LEGAL_NORMS.map((norm) => [norm.id, norm]),
  );
  private readonly classifications = new Map<string, LegalClassification>(
    LEGAL_CLASSIFICATIONS.map((entry) => [entry.id, entry]),
  );
  private readonly authorities = new Map<string, LegalAuthority>(
    LEGAL_AUTHORITIES.map((entry) => [entry.id, entry]),
  );

  /** Alle Normen. */
  getNorms(): LegalNorm[] {
    return [...this.norms.values()];
  }

  /** Eine Norm anhand ihrer ID oder `undefined`, wenn sie fehlt. */
  getNorm(id: string): LegalNorm | undefined {
    return this.norms.get(id);
  }

  /** Mehrere Normen anhand ihrer IDs. Unbekannte IDs werden ausgelassen. */
  getNormsByIds(ids: string[]): LegalNorm[] {
    return ids.map((id) => this.norms.get(id)).filter((norm): norm is LegalNorm => !!norm);
  }

  /** Eine rechtliche Einordnung. */
  getClassification(id: string): LegalClassification | undefined {
    return this.classifications.get(id);
  }

  getClassificationsByIds(ids: string[]): LegalClassification[] {
    return ids
      .map((id) => this.classifications.get(id))
      .filter((entry): entry is LegalClassification => !!entry);
  }

  /** Eine Befugnis / Rechtfertigung. */
  getAuthority(id: string): LegalAuthority | undefined {
    return this.authorities.get(id);
  }

  getAuthoritiesByIds(ids: string[]): LegalAuthority[] {
    return ids
      .map((id) => this.authorities.get(id))
      .filter((entry): entry is LegalAuthority => !!entry);
  }

  /**
   * Prüft, ob eine Norm einen amtlichen Gesetzestext besitzt.
   * Fehlt er, liefert die UI einen Hinweis statt einer Erfindung.
   */
  hasOfficialText(id: string): boolean {
    const norm = this.norms.get(id);
    return !!norm && norm.verificationStatus === 'VERIFIED_OFFICIAL_TEXT' && norm.officialText.length > 0;
  }
}
