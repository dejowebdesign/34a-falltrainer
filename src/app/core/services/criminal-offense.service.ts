import { Injectable } from '@angular/core';
import {
  CRIMINAL_OFFENSES,
  LEGAL_BASICS_CARDS,
  OFFENSE_CATEGORY_LABELS,
  OFFENSE_FAMILY_LABELS,
} from '../data/criminal-offenses.data';
import {
  CriminalOffense,
  LegalBasicsCard,
  OffenseClassification,
  OffenseFamily,
  OffenseQuery,
  OffenseSortKey,
  PenaltyClass,
  ProsecutionType,
  RelevanceLevel,
} from '../models';

/** Leerer, mehrfachauswahlfähiger Filterzustand der Lernseite. */
export const EMPTY_OFFENSE_QUERY: OffenseQuery = {
  text: '',
  categories: [],
  classifications: [],
  prosecutions: [],
  attempts: [],
  culpabilities: [],
  families: [],
  coreOnly: false,
  examRelevantOnly: false,
};

/** Anzeigenamen der Strafmaßklassen (fachlich aus dem Mindestmaß abgeleitet). */
export const PENALTY_CLASS_LABELS: Record<PenaltyClass, string> = {
  GELDSTRASSE: 'Geldstrafe bzw. kein gesetzliches Mindestmaß',
  FREIHEITSSTRAFE_UNTER_1_JAHR: 'Freiheitsstrafe unter 1 Jahr',
  VERBRECHEN_AB_1_JAHR: 'Verbrechen – Mindestmaß ab 1 Jahr',
  OHNE_EIGENE_STRAFANDROHUNG: 'Keine eigene Strafandrohung',
};

/** Reihenfolge der Strafmaßgruppen (niedriges Mindestmaß zuerst). */
export const PENALTY_CLASS_ORDER: PenaltyClass[] = [
  'GELDSTRASSE',
  'OHNE_EIGENE_STRAFANDROHUNG',
  'FREIHEITSSTRAFE_UNTER_1_JAHR',
  'VERBRECHEN_AB_1_JAHR',
];

/** Anzeigenamen der Sortieroptionen. */
export const OFFENSE_SORT_LABELS: Record<OffenseSortKey, string> = {
  RELEVANCE: 'Nach Relevanz',
  PARAGRAPH: 'Nach Paragraph',
  ALPHABETICAL: 'Alphabetisch',
  PENALTY_ASC: 'Mindeststrafe aufsteigend',
  PENALTY_DESC: 'Mindeststrafe absteigend',
  VERBRECHEN_FIRST: 'Verbrechen zuerst',
  VERGEHEN_FIRST: 'Vergehen zuerst',
};

/** Eine nach Deliktsfamilie gruppierte Teilmenge der Deliktsliste. */
export interface OffenseFamilyGroup {
  family: OffenseFamily;
  label: string;
  offenses: CriminalOffense[];
}

/** Eine nach Strafmaß gruppierte Teilmenge der Deliktsliste. */
export interface OffensePenaltyGroup {
  penaltyClass: PenaltyClass;
  label: string;
  offenses: CriminalOffense[];
}

/** Aus den Daten berechnete Kennzahlen der aktuellen Liste. */
export interface OffenseStats {
  total: number;
  antragsdelikte: number;
  verbrechen: number;
  vergehen: number;
  examRelevant: number;
}

const MONTHS_PER_YEAR = 12;

const NUMBER_WORDS: Record<string, number> = {
  einem: 1,
  einer: 1,
  eins: 1,
  zwei: 2,
  drei: 3,
  vier: 4,
  fünf: 5,
  sechs: 6,
  sieben: 7,
  acht: 8,
  neun: 9,
  zehn: 10,
};

/**
 * Ordnet ein Delikt anhand seines gesetzlichen Mindestmaßes einer Strafmaßklasse
 * zu. Maßgeblich ist ausschließlich das gesetzliche Mindestmaß, nicht die
 * tatsächlich verhängte Strafe. Delikte ohne eigene Strafandrohung
 * (z. B. Strafverfolgungsregelungen wie §247, §248a StGB) erhalten eine eigene
 * Klasse, damit sie nicht fälschlich als „Geldstrafe“ erscheinen.
 */
export function penaltyClassOf(offense: CriminalOffense): PenaltyClass {
  if (/keine eigene Strafandrohung/i.test(offense.minimumPenalty)) {
    return 'OHNE_EIGENE_STRAFANDROHUNG';
  }
  if (offense.classification === 'VERBRECHEN') {
    return 'VERBRECHEN_AB_1_JAHR';
  }
  const months = minimumPenaltyMonths(offense.minimumPenalty);
  if (months !== null && months > 0) {
    return 'FREIHEITSSTRAFE_UNTER_1_JAHR';
  }
  return 'GELDSTRASSE';
}

/**
 * Wandelt das gesetzliche Mindestmaß in Monate um, um es vergleichbar zu
 * sortieren. `null` bedeutet „kein gesetzliches Mindestfreiheitsstrafmaß“
 * (Geldstrafe) und wird für die aufsteigende Sortierung als 0 behandelt.
 * Die Umrechnung liest ausschließlich die vorhandenen Wortlaute der Datenbasis.
 */
export function minimumPenaltyMonths(minimumPenalty: string): number | null {
  const text = minimumPenalty.toLowerCase();
  if (text.includes('keine eigene strafandrohung')) {
    return 0;
  }
  const numeric = text.match(/nicht unter (\d+)\s*(jahr|jahren|monat|monaten)/);
  if (numeric) {
    const value = Number(numeric[1]);
    return numeric[2].startsWith('monat') ? value : value * MONTHS_PER_YEAR;
  }
  const wordMatch = text.match(/nicht unter ([a-zäöüß]+)(?:\s*(jahr|jahren|monat|monaten))?/);
  if (wordMatch) {
    const value = NUMBER_WORDS[wordMatch[1]];
    const unit = wordMatch[2] ?? 'jahr';
    if (value !== undefined) {
      return unit.startsWith('monat') ? value : value * MONTHS_PER_YEAR;
    }
  }
  return null;
}

/**
 * Suche, Filter, Sortierung und Gruppierung der Lernseite „Strafgesetzbuch“.
 *
 * Reine, seiteneffektfreie Funktionen, damit die Logik unabhängig vom UI
 * getestet werden kann (AGENTS.md: keine Rechtslogik in Templates). Es werden
 * keine fachlichen Daten verändert – nur gefiltert, sortiert und gruppiert.
 */
@Injectable({ providedIn: 'root' })
export class CriminalOffenseService {
  private readonly offenses: CriminalOffense[] = CRIMINAL_OFFENSES.filter(
    (offense) => offense.relevanceLevel !== 'NOT_INCLUDE',
  );
  private readonly basics: LegalBasicsCard[] = LEGAL_BASICS_CARDS;

  /** Alle kuratierten Straftatbestände (nur sichtbare Relevanzstufen). */
  getOffenses(): CriminalOffense[] {
    return this.offenses;
  }

  /** Grundlagenkarten des Strafrechts (Allgemeiner Teil, Verfolgung, Unterlassen). */
  getBasics(): LegalBasicsCard[] {
    return this.basics;
  }

  /** Eine Grundlagenkarte anhand ihrer ID. */
  getBasic(id: string): LegalBasicsCard | undefined {
    return this.basics.find((card) => card.id === id);
  }

  /** Ein Delikt anhand seiner ID. */
  getOffense(id: string): CriminalOffense | undefined {
    return this.offenses.find((offense) => offense.id === id);
  }

  /**
   * Wendet den mehrfachauswahlfähigen Filter der Lernseite an.
   */
  query(query: OffenseQuery): CriminalOffense[] {
    const needle = query.text.trim().toLowerCase();
    return this.offenses.filter((offense) => this.matchesQuery(offense, query, needle));
  }

  /**
   * Sortiert eine Kopie der Liste. Sekundärkriterium ist immer der Paragraph
   * aufsteigend, damit die Reihenfolge bei Gleichstand deterministisch bleibt.
   */
  sort(offenses: CriminalOffense[], key: OffenseSortKey): CriminalOffense[] {
    const sorted = [...offenses];
    const byParagraph = (a: CriminalOffense, b: CriminalOffense) =>
      compareParagraphs(a.paragraph, b.paragraph);
    switch (key) {
      case 'ALPHABETICAL':
        return sorted.sort(
          (a, b) => a.officialTitle.localeCompare(b.officialTitle, 'de') || byParagraph(a, b),
        );
      case 'PENALTY_ASC':
        return sorted.sort((a, b) => penaltyRank(a) - penaltyRank(b) || byParagraph(a, b));
      case 'PENALTY_DESC':
        return sorted.sort((a, b) => penaltyRank(b) - penaltyRank(a) || byParagraph(a, b));
      case 'VERBRECHEN_FIRST':
        return sorted.sort(
          (a, b) => classificationRank(a) - classificationRank(b) || byParagraph(a, b),
        );
      case 'VERGEHEN_FIRST':
        return sorted.sort(
          (a, b) => classificationRank(b) - classificationRank(a) || byParagraph(a, b),
        );
      case 'RELEVANCE':
        return sorted.sort((a, b) => relevanceRank(a) - relevanceRank(b) || byParagraph(a, b));
      case 'PARAGRAPH':
      default:
        return sorted.sort(byParagraph);
    }
  }

  /**
   * Gruppiert die Liste nach Strafmaßklasse (gesetzliches Mindestmaß). Leere
   * Gruppen werden weggelassen, die Reihenfolge folgt `PENALTY_CLASS_ORDER`.
   */
  group(offenses: CriminalOffense[]): OffensePenaltyGroup[] {
    return PENALTY_CLASS_ORDER.map((penaltyClass) => ({
      penaltyClass,
      label: PENALTY_CLASS_LABELS[penaltyClass],
      offenses: this.sort(
        offenses.filter((offense) => penaltyClassOf(offense) === penaltyClass),
        'PARAGRAPH',
      ),
    })).filter((group) => group.offenses.length > 0);
  }

  /**
   * Gruppiert die Liste nach Deliktsfamilie. Die Delikte innerhalb einer Gruppe
   * bleiben nach Paragraph sortiert, damit die didaktische Reihenfolge
   * (Grunddelikt vor Qualifikation) erhalten bleibt.
   */
  groupByFamily(offenses: CriminalOffense[]): OffenseFamilyGroup[] {
    const groups = new Map<OffenseFamily, CriminalOffense[]>();
    for (const offense of offenses) {
      const list = groups.get(offense.family) ?? [];
      list.push(offense);
      groups.set(offense.family, list);
    }
    return [...groups.entries()]
      .map(([family, list]) => ({
        family,
        label: OFFENSE_FAMILY_LABELS[family],
        offenses: this.sort(list, 'PARAGRAPH'),
      }))
      .sort((a, b) => a.label.localeCompare(b.label, 'de'));
  }

  /**
   * Besonders §34a-relevant sind Delikte mit einer kuratierten `securityNote`
   * oder der Relevanzstufe `CORE_34A`.
   */
  isExamRelevant(offense: CriminalOffense): boolean {
    return offense.relevanceLevel === 'CORE_34A' || Boolean(offense.securityNote);
  }

  /** Aus den tatsächlichen Daten berechnete Kennzahlen der übergebenen Liste. */
  getStats(offenses: CriminalOffense[]): OffenseStats {
    return {
      total: offenses.length,
      antragsdelikte: offenses.filter((o) => o.prosecution.type === 'ANTRAGSDELIKT').length,
      verbrechen: offenses.filter((o) => o.classification === 'VERBRECHEN').length,
      vergehen: offenses.filter((o) => o.classification === 'VERGEHEN').length,
      examRelevant: offenses.filter((o) => this.isExamRelevant(o)).length,
    };
  }

  /**
   * Liefert zu einem Delikt die verwandten Delikte. Grundlage sind die
   * kuratierten `relatedOffenses`-IDs; ältere Freitext-Verweise in
   * `distinctions` werden ergänzend über die Paragraphennummer aufgelöst.
   * Nicht auflösbare Verweise werden ausgelassen.
   */
  getRelated(offense: CriminalOffense): CriminalOffense[] {
    const related: CriminalOffense[] = [];
    const add = (candidate: CriminalOffense | undefined) => {
      if (candidate && candidate.id !== offense.id && !related.includes(candidate)) {
        related.push(candidate);
      }
    };
    for (const id of offense.relatedOffenses) {
      add(this.offenses.find((candidate) => candidate.id === id));
    }
    for (const distinction of offense.distinctions ?? []) {
      const match = distinction.match(/§\s*(\d+[a-z]?)/i);
      if (!match) {
        continue;
      }
      const paragraph = `§${match[1]}`;
      add(
        this.offenses.find(
          (candidate) => candidate.paragraph.replace(/\s+/g, '') === paragraph.replace(/\s+/g, ''),
        ),
      );
    }
    return related;
  }

  /**
   * Mehrfachauswahl-Filter: innerhalb einer Dimension ODER, zwischen den
   * Dimensionen UND.
   */
  private matchesQuery(offense: CriminalOffense, query: OffenseQuery, needle: string): boolean {
    if (query.categories.length && !query.categories.includes(offense.category)) {
      return false;
    }
    if (query.families.length && !query.families.includes(offense.family)) {
      return false;
    }
    if (query.classifications.length && !query.classifications.includes(offense.classification)) {
      return false;
    }
    if (query.prosecutions.length && !query.prosecutions.includes(offense.prosecution.type)) {
      return false;
    }
    if (query.attempts.length) {
      const matchesAttempt = query.attempts.some((attempt) =>
        attempt === 'PUNISHABLE' ? offense.attemptPunishable : !offense.attemptPunishable,
      );
      if (!matchesAttempt) {
        return false;
      }
    }
    if (query.culpabilities.length) {
      const matchesCulpability = query.culpabilities.some((culpability) =>
        culpability === 'VORSATZ' ? offense.intentRequired : offense.negligence.negligentVariant,
      );
      if (!matchesCulpability) {
        return false;
      }
    }
    if (query.coreOnly && offense.relevanceLevel !== 'CORE_34A') {
      return false;
    }
    if (query.examRelevantOnly && !this.isExamRelevant(offense)) {
      return false;
    }
    if (needle.length > 0 && !this.textMatches(offense, needle)) {
      return false;
    }
    return true;
  }

  private textMatches(offense: CriminalOffense, needle: string): boolean {
    const haystack = [
      offense.paragraph,
      offense.officialTitle,
      offense.protectedInterest,
      offense.explanation,
      offense.relevance,
      offense.relevanceReason,
      offense.examRelevance,
      offense.category,
      OFFENSE_CATEGORY_LABELS[offense.category],
      offense.family,
      OFFENSE_FAMILY_LABELS[offense.family],
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

/** Sortierrang nach Relevanz: 0 = besonders relevant, 1 = relevant. */
function relevanceRank(offense: CriminalOffense): number {
  const rank: Record<RelevanceLevel, number> = {
    CORE_34A: 0,
    RELATED_34A: 1,
    NOT_INCLUDE: 2,
  };
  return rank[offense.relevanceLevel];
}

/** Sortierrang nach Strafmaß: 0 = kein Mindestfreiheitsstrafmaß (Geldstrafe). */
function penaltyRank(offense: CriminalOffense): number {
  return minimumPenaltyMonths(offense.minimumPenalty) ?? 0;
}

/** 0 = Verbrechen, 1 = Vergehen (für die „… zuerst“-Sortierungen). */
function classificationRank(offense: CriminalOffense): number {
  return offense.classification === 'VERBRECHEN' ? 0 : 1;
}

/** Paragraphen aufsteigend, inkl. Buchstabensuffix (z. B. §248a nach §248). */
function compareParagraphs(a: string, b: string): number {
  const parsed = (value: string) => {
    const match = value.match(/(\d+)\s*([a-z]?)/i);
    return { number: match ? Number(match[1]) : 0, suffix: match?.[2]?.toLowerCase() ?? '' };
  };
  const left = parsed(a);
  const right = parsed(b);
  return left.number - right.number || left.suffix.localeCompare(right.suffix);
}
