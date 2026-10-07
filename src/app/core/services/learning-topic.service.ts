import { Injectable } from '@angular/core';
import {
  AUTHORITY_MATRIX,
  JEDERMANNSRECHTE_BGB_LINKS,
  JEDERMANNSRECHTE_FAMILIES,
  JEDERMANNSRECHTE_TOPICS,
} from '../data/jedermannsrechte-topics.data';
import { BGB_FAMILIES, BGB_TOPICS, CORE_CATEGORIES } from '../data/bgb-topics.data';
import {
  AuthorityMatrixRow,
  CoreCategory,
  LearningTopic,
  TopicFamily,
  TopicNature,
  TopicRelevance,
} from '../models';

/** Anzeigenamen der Rechtsnatur. */
export const TOPIC_NATURE_LABELS: Record<TopicNature, string> = {
  ANSPRUCH: 'Anspruch',
  BEFUGNIS: 'Befugnis',
  RECHTFERTIGUNG: 'Rechtfertigung',
  ENTSCHULDIGUNG: 'Entschuldigung',
  GRUNDLAGE: 'Grundbegriff',
};

/** Kurze Erläuterung der Rechtsnatur (Merkkarte). */
export const TOPIC_NATURE_QUESTIONS: Record<TopicNature, string> = {
  ANSPRUCH: 'Was kann ich verlangen?',
  BEFUGNIS: 'Was darf ich selbst tun?',
  RECHTFERTIGUNG: 'Warum ist eine Handlung ausnahmsweise nicht rechtswidrig?',
  ENTSCHULDIGUNG:
    'Warum entfällt trotz Rechtswidrigkeit unter bestimmten Voraussetzungen die Schuld?',
  GRUNDLAGE: 'Grundbegriff ohne eigene Befugnis- oder Anspruchswirkung.',
};

/** Anzeigenamen der §34a-Relevanzstufen. */
export const TOPIC_RELEVANCE_LABELS: Record<TopicRelevance, string> = {
  CORE_34A: 'Ausdrücklich im Sachkunde-Rahmen',
  RELATED_34A: 'Unmittelbar für ein Kernthema erforderlich',
};

/** Eine nach Lernfamilie gruppierte Teilmenge der Themen. */
export interface TopicFamilyGroup {
  familyId: string;
  label: string;
  description?: string;
  topics: LearningTopic[];
}

/** Ein Such- und Filterzustand der Lernseite. */
export interface TopicQuery {
  text: string;
  nature: TopicNature[];
  familyId?: string;
}

/**
 * Suche, Filter und Gruppierung der kompakten Lernseiten „Bürgerliches
 * Gesetzbuch“ und „Jedermannsrechte“.
 *
 * Reine, seiteneffektfreie Funktionen – die Rechtslogik bleibt in den Daten,
 * nicht im Template (AGENTS.md). Es werden keine fachlichen Daten verändert.
 */
@Injectable({ providedIn: 'root' })
export class LearningTopicService {
  /** Alle BGB-Lernkarten. */
  getBgbTopics(): LearningTopic[] {
    return BGB_TOPICS;
  }

  /** Lernfamilien der BGB-Seite. */
  getBgbFamilies(): TopicFamily[] {
    return BGB_FAMILIES;
  }

  /** Alle Jedermannsrechte-Lernkarten. */
  getJedermannsrechteTopics(): LearningTopic[] {
    return JEDERMANNSRECHTE_TOPICS;
  }

  /** Lernfamilien der Jedermannsrechte-Seite. */
  getJedermannsrechteFamilies(): TopicFamily[] {
    return JEDERMANNSRECHTE_FAMILIES;
  }

  /** Die Vergleichsmatrix „Welches Recht könnte greifen?“. */
  getAuthorityMatrix(): AuthorityMatrixRow[] {
    return AUTHORITY_MATRIX;
  }

  /** Verweise der Jedermannsrechte-Seite auf unmittelbar zugehörige BGB-Normen. */
  getBgbLinks(): { normId: string; label: string }[] {
    return JEDERMANNSRECHTE_BGB_LINKS;
  }

  /** Die vier Kernkategorien als Merkkarte. */
  getCoreCategories(): CoreCategory[] {
    return CORE_CATEGORIES;
  }

  /** Eine Lernkarte anhand ihrer ID (seitenübergreifend). */
  getTopic(id: string): LearningTopic | undefined {
    return (
      BGB_TOPICS.find((topic) => topic.id === id) ??
      JEDERMANNSRECHTE_TOPICS.find((topic) => topic.id === id)
    );
  }

  /**
   * Filtert eine Themenliste nach Suchtext und Rechtsnatur.
   * Innerhalb einer Dimension ODER, zwischen den Dimensionen UND.
   */
  query(topics: LearningTopic[], query: TopicQuery): LearningTopic[] {
    const needle = query.text.trim().toLowerCase();
    return topics.filter((topic) => {
      if (query.nature.length && !query.nature.includes(topic.nature)) {
        return false;
      }
      if (query.familyId && topic.familyId !== query.familyId) {
        return false;
      }
      if (needle.length && !this.textMatches(topic, needle)) {
        return false;
      }
      return true;
    });
  }

  /**
   * Gruppiert eine Themenliste nach Lernfamilie in der Reihenfolge der
   * übergebenen Familien. Leere Gruppen werden weggelassen.
   */
  groupByFamily(topics: LearningTopic[], families: TopicFamily[]): TopicFamilyGroup[] {
    return families
      .map((family) => ({
        familyId: family.id,
        label: family.label,
        description: family.description,
        topics: topics.filter((topic) => topic.familyId === family.id),
      }))
      .filter((group) => group.topics.length > 0);
  }

  /** Ob ein Such- oder Filterzustand aktiv ist. */
  hasActiveQuery(query: TopicQuery): boolean {
    return query.text.trim().length > 0 || query.nature.length > 0 || Boolean(query.familyId);
  }

  /** Trifft der Suchtext auf Paragraph, Titel, Familie oder Kernbegriffe zu? */
  private textMatches(topic: LearningTopic, needle: string): boolean {
    const haystack = [
      topic.paragraph,
      topic.law,
      topic.officialTitle,
      topic.fachlicheEinordnung ?? '',
      topic.summary,
      topic.shortExplanation,
      topic.purpose,
      topic.whoActs,
      topic.againstWhom,
      topic.examRelevance,
      topic.relevanceReason,
      topic.examHint,
      topic.typicalSituation,
      TOPIC_NATURE_LABELS[topic.nature],
      ...topic.prerequisites.map((point) => point.label),
      ...topic.prerequisites.map((point) => point.detail ?? ''),
      ...topic.limits,
      ...topic.distinctions.map((point) => point.label),
      ...topic.distinctions.map((point) => point.detail ?? ''),
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(needle);
  }
}
