import { Injectable } from '@angular/core';
import { CRIMINAL_OFFENSES, LEGAL_BASICS } from '../data/criminal-offenses.data';
import {
  CriminalOffense,
  LegalBasicsEntry,
  OffenseCategory,
  OffenseClassification,
  ProsecutionType,
} from '../models';

/** Ein aktiver Filterzustand der Lernseite. */
export interface OffenseFilter {
  /** Freitextsuche (Paragraph, Titel, Begriff, Deliktsgruppe). */
  query: string;
  /** Deliktsgruppe oder `null` für alle. */
  category: OffenseCategory | null;
  /** Verbrechen / Vergehen oder `null` für alle. */
  classification: OffenseClassification | null;
  /** Offizial- / Antragsdelikt oder `null` für alle. */
  prosecution: ProsecutionType | null;
  /** Versuch strafbar ja/nein oder `null` für alle. */
  attemptPunishable: boolean | null;
  /** Nur Delikte mit Vorsatz-Erfordernis (intentRequired). */
  intentOnly: boolean;
  /** Nur Delikte mit eigenständiger fahrlässiger Variante. */
  negligenceOnly: boolean;
}

export const EMPTY_OFFENSE_FILTER: OffenseFilter = {
  query: '',
  category: null,
  classification: null,
  prosecution: null,
  attemptPunishable: null,
  intentOnly: false,
  negligenceOnly: false,
};

/**
 * Suche und Filter der Lernseite „Strafgesetzbuch“.
 *
 * Reine, seiteneffektfreie Funktionen, damit die Filterlogik unabhängig vom UI
 * getestet werden kann (AGENTS.md: keine Rechtslogik in Templates).
 */
@Injectable({ providedIn: 'root' })
export class CriminalOffenseService {
  private readonly offenses: CriminalOffense[] = CRIMINAL_OFFENSES;
  private readonly basics: LegalBasicsEntry[] = LEGAL_BASICS;

  /** Alle kuratierten Straftatbestände. */
  getOffenses(): CriminalOffense[] {
    return this.offenses;
  }

  /** Grundlagen des Allgemeinen Teils (§12, §15, §22, §23 StGB). */
  getBasics(): LegalBasicsEntry[] {
    return this.basics;
  }

  /** Ein Delikt anhand seiner ID. */
  getOffense(id: string): CriminalOffense | undefined {
    return this.offenses.find((offense) => offense.id === id);
  }

  /**
   * Wendet Suche und Filter an. Die Reihenfolge bleibt stabil (Datenreihenfolge),
   * damit die Anzeige nicht springt.
   */
  filter(filter: OffenseFilter): CriminalOffense[] {
    const needle = filter.query.trim().toLowerCase();
    return this.offenses.filter((offense) => this.matches(offense, filter, needle));
  }

  /**
   * Liefert zu einem Delikt verwandte Delikte über die Abgrenzungen. Die
   * Verweise sind Freitext (z. B. „§246 StGB – Unterschlagung“); es wird über
   * die Paragraphennummer aufgelöst. Nicht auflösbare Verweise werden ausgelassen.
   */
  getRelated(offense: CriminalOffense): CriminalOffense[] {
    if (!offense.distinctions?.length) {
      return [];
    }
    const ownParagraph = offense.paragraph.replace(/\s+/g, '');
    const related: CriminalOffense[] = [];
    for (const distinction of offense.distinctions) {
      const match = distinction.match(/§\s*(\d+[a-z]?)/i);
      if (!match) {
        continue;
      }
      const paragraph = `§${match[1]}`;
      if (paragraph === ownParagraph) {
        continue;
      }
      const found = this.offenses.find(
        (candidate) => candidate.paragraph.replace(/\s+/g, '') === paragraph,
      );
      if (found && !related.includes(found)) {
        related.push(found);
      }
    }
    return related;
  }

  private matches(offense: CriminalOffense, filter: OffenseFilter, needle: string): boolean {
    if (filter.category && offense.category !== filter.category) {
      return false;
    }
    if (filter.classification && offense.classification !== filter.classification) {
      return false;
    }
    if (filter.prosecution && offense.prosecution.type !== filter.prosecution) {
      return false;
    }
    if (filter.attemptPunishable !== null && offense.attemptPunishable !== filter.attemptPunishable) {
      return false;
    }
    if (filter.intentOnly && !offense.intentRequired) {
      return false;
    }
    if (filter.negligenceOnly && !offense.negligence.negligentVariant) {
      return false;
    }
    if (needle.length > 0 && !this.matchesQuery(offense, needle)) {
      return false;
    }
    return true;
  }

  private matchesQuery(offense: CriminalOffense, needle: string): boolean {
    const haystack = [
      offense.paragraph,
      offense.officialTitle,
      offense.protectedInterest,
      offense.explanation,
      offense.relevance,
      offense.category,
      offense.minimumPenalty,
      offense.maximumPenalty,
      ...offense.objectiveElements,
      ...offense.subjectiveElements,
      ...(offense.specialSubjectiveElements ?? []),
      ...(offense.distinctions ?? []),
      offense.prosecution.type,
      offense.prosecution.applicationType ?? '',
      offense.classification,
      offense.attemptPunishable ? 'versuch strafbar' : 'versuch nicht strafbar',
      offense.intentRequired ? 'vorsatz' : 'fahrlässigkeit',
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(needle);
  }
}
