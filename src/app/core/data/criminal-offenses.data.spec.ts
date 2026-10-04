import {
  CRIMINAL_OFFENSES,
  LEGAL_BASICS_CARDS,
  OFFENSE_CATEGORY_LABELS,
  OFFENSE_FAMILY_LABELS,
} from './criminal-offenses.data';
import { OffenseCategory, OffenseFamily, RelevanceLevel } from '../models';

/**
 * Fachliche Konsistenzprüfung der kuratierten Strafgesetzbuch-Daten.
 *
 * Geprüft werden die formalen Pflichtfelder (Aufgabenstellung Nr. 40) sowie die
 * rechtlichen Systematiken des Allgemeinen Teils:
 *  - §12 StGB – Verbrechen/Vergehen anhand des gesetzlichen Mindestmaßes
 *  - §15 StGB – Vorsatz/Fahrlässigkeit
 *  - §23 StGB – Strafbarkeit des Versuchs
 */
describe('Strafgesetzbuch-Daten (Konsistenz)', () => {
  it('enthält mindestens 30 kuratierte Straftatbestände', () => {
    expect(CRIMINAL_OFFENSES.length).toBeGreaterThanOrEqual(30);
  });

  it('verwendet eindeutige IDs und Paragraphen', () => {
    const ids = CRIMINAL_OFFENSES.map((offense) => offense.id);
    const paragraphs = CRIMINAL_OFFENSES.map((offense) => offense.paragraph);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(paragraphs).size).toBe(paragraphs.length);
  });

  it('führt jeden Datensatz unter einer bekannten Deliktsgruppe', () => {
    const known = new Set(Object.keys(OFFENSE_CATEGORY_LABELS) as OffenseCategory[]);
    for (const offense of CRIMINAL_OFFENSES) {
      expect(known.has(offense.category))
        .withContext(offense.paragraph)
        .toBe(true);
    }
  });

  it('prüft die Pflichtfelder jedes Datensatzes (Nr. 40)', () => {
    for (const offense of CRIMINAL_OFFENSES) {
      const context = offense.paragraph;
      expect(offense.paragraph.length).withContext(context).toBeGreaterThan(0);
      expect(offense.officialTitle.length).withContext(context).toBeGreaterThan(0);
      expect(offense.objectiveElements.length).withContext(context).toBeGreaterThan(0);
      expect(offense.subjectiveElements.length).withContext(context).toBeGreaterThan(0);
      expect(offense.minimumPenalty.length).withContext(context).toBeGreaterThan(0);
      expect(['VERBRECHEN', 'VERGEHEN']).withContext(context).toContain(offense.classification);
      expect(['OFFIZIALDELIKT', 'ANTRAGSDELIKT']).withContext(context).toContain(
        offense.prosecution.type,
      );
      expect(typeof offense.attemptPunishable).withContext(context).toBe('boolean');
      expect(offense.officialText.length).withContext(context).toBeGreaterThan(0);
      expect(offense.sourceUrl).withContext(context).toContain('gesetze-im-internet.de');
      expect(offense.source.lastVerified.length).withContext(context).toBeGreaterThan(0);
    }
  });

  it('formuliert Mindeststrafen ohne mathematische Ersatzwerte', () => {
    for (const offense of CRIMINAL_OFFENSES) {
      expect(offense.minimumPenalty).withContext(offense.paragraph).not.toMatch(/0\s*(Monate|Jahre)/i);
    }
  });

  it('ordnet Verbrechen und Vergehen nach §12 StGB korrekt ein', () => {
    for (const offense of CRIMINAL_OFFENSES) {
      const context = `${offense.paragraph} (${offense.classification})`;
      if (offense.classification === 'VERBRECHEN') {
        expect(offense.minimumPenalty)
          .withContext(context)
          .toMatch(/nicht unter (einem|zwei|drei|fünf|zehn) Jahr/);
      } else {
        expect(offense.minimumPenalty)
          .withContext(context)
          .toMatch(/Geldstrafe|nicht unter (drei|sechs) Monaten|Keine eigene Strafandrohung/);
      }
    }
  });

  it('macht den Versuch eines Verbrechens stets strafbar (§23 Abs. 1 StGB)', () => {
    // Ausnahme: §227 StGB ist erfolgsqualifiziert – strafbar ist nur der Versuch
    // der Grundtat (§§223, 224 StGB), nicht der Versuch der Todesfolge.
    const erfolgsqualifiziert = new Set(['stgb-227']);
    for (const offense of CRIMINAL_OFFENSES.filter(
      (o) => o.classification === 'VERBRECHEN' && !erfolgsqualifiziert.has(o.id),
    )) {
      expect(offense.attemptPunishable).withContext(offense.paragraph).toBe(true);
    }
  });

  it('stellt nur Delikte mit ausdrücklicher Anordnung als versuchsstrafbar dar (§23 StGB)', () => {
    // Vergehen ohne ausdrückliche Versuchsstrafbarkeit müssen "Nein" tragen.
    const notPunishable = CRIMINAL_OFFENSES.filter((o) => !o.attemptPunishable);
    for (const offense of notPunishable) {
      expect(offense.attemptExplanation.length).withContext(offense.paragraph).toBeGreaterThan(0);
    }
  });

  it('kennzeichnet Antragsdelikte mit Antragsnorm und Antragsart', () => {
    for (const offense of CRIMINAL_OFFENSES.filter(
      (o) => o.prosecution.type === 'ANTRAGSDELIKT',
    )) {
      const context = offense.paragraph;
      expect(offense.prosecution.applicationType).withContext(context).toBeDefined();
      expect(offense.prosecution.applicationNorm).withContext(context).toBeDefined();
      expect(offense.prosecution.applicationNorm).withContext(context).toMatch(/§/);
    }
  });

  it('gibt bei Offizialdelikten keine Antragsart an', () => {
    for (const offense of CRIMINAL_OFFENSES.filter(
      (o) => o.prosecution.type === 'OFFIZIALDELIKT',
    )) {
      expect(offense.prosecution.applicationType).withContext(offense.paragraph).toBeUndefined();
    }
  });

  it('trennt Vorsatz-Erfordernis und fahrlässige Variante nach §15 StGB', () => {
    for (const offense of CRIMINAL_OFFENSES) {
      const context = offense.paragraph;
      // §229 ist die einzige rein fahrlässige Strafnorm in dieser Auswahl.
      if (!offense.intentRequired) {
        expect(offense.negligence.negligentVariant).withContext(context).toBe(true);
      }
      if (offense.negligence.negligentVariant && offense.negligence.negligentNorm) {
        expect(offense.negligence.negligentNorm).withContext(context).toMatch(/§\s*229/);
      }
    }
  });

  it('führt die fahrlässige Variante von §223 auf §229 StGB zurück', () => {
    const kv = CRIMINAL_OFFENSES.find((o) => o.id === 'stgb-223');
    expect(kv?.negligence.negligentVariant).toBe(true);
    expect(kv?.negligence.negligentNorm).toContain('229');
  });

  it('enthält die im Auftrag ausdrücklich genannten Delikte', () => {
    const required = [
      '§ 123',
      '§ 132',
      '§ 185',
      '§ 186',
      '§ 187',
      '§ 223',
      '§ 224',
      '§ 226',
      '§ 227',
      '§ 229',
      '§ 231',
      '§ 239',
      '§ 240',
      '§ 241',
      '§ 242',
      '§ 243',
      '§ 244',
      '§ 246',
      '§ 248a',
      '§ 248b',
      '§ 249',
      '§ 250',
      '§ 252',
      '§ 253',
      '§ 255',
      '§ 259',
      '§ 263',
      '§ 265a',
      '§ 267',
      '§ 303',
      '§ 323c',
    ];
    const present = new Set(CRIMINAL_OFFENSES.map((o) => o.paragraph));
    for (const paragraph of required) {
      expect(present.has(paragraph)).withContext(paragraph).toBe(true);
    }
  });

  it('legt die Grundlagen des Strafrechts als Karten vor', () => {
    const ids = LEGAL_BASICS_CARDS.map((card) => card.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(LEGAL_BASICS_CARDS.length).toBeGreaterThanOrEqual(8);
    for (const card of LEGAL_BASICS_CARDS) {
      const context = card.id;
      expect(card.officialTitle.length).withContext(context).toBeGreaterThan(0);
      expect(card.summary.length).withContext(context).toBeGreaterThan(0);
      expect(card.merksatz.length).withContext(context).toBeGreaterThan(0);
      expect(card.sections.length).withContext(context).toBeGreaterThan(0);
      expect(card.examRelevant.length).withContext(context).toBeGreaterThan(0);
      expect(card.sourceUrl).withContext(context).toContain('gesetze-im-internet.de');
    }
  });

  it('enthält die im Auftrag genannten Grundlagenthemen aus Grundlagen_Straftaten.pdf', () => {
    const titles = LEGAL_BASICS_CARDS.map((card) => card.officialTitle);
    expect(titles).toContain('Verbrechen und Vergehen');
    expect(titles).toContain('Offizialdelikt und Antragsdelikt');
    expect(titles).toContain('Der Versuch');
    expect(titles).toContain('Rücktritt vom Versuch');
    expect(titles).toContain('Vorsatz – Wissen und Wollen');
    expect(titles).toContain('Fahrlässigkeit – Sorgfaltspflichtverletzung');
    expect(titles).toContain('Begehen durch Unterlassen');
    expect(titles).toContain('Garantenstellung');
  });

  it('nimmt Täterschaft und Teilnahme nicht in die Grundlagen auf', () => {
    // Auftrag Nr. 2/7: §§25–27 StGB sind eine eigene Lerneinheit.
    const joined = LEGAL_BASICS_CARDS.map((card) => JSON.stringify(card)).join(' ');
    expect(joined).not.toMatch(/Täterschaft/);
    expect(joined).not.toMatch(/Anstiftung/);
    expect(joined).not.toMatch(/Beihilfe/);
    expect(joined).not.toMatch(/gestohlene Wagen/);
  });

  it('ordnet jede Norm einer bekannten Deliktsfamilie und Relevanzstufe zu', () => {
    const families = new Set(Object.keys(OFFENSE_FAMILY_LABELS) as OffenseFamily[]);
    const levels: RelevanceLevel[] = ['CORE_34A', 'RELATED_34A', 'NOT_INCLUDE'];
    for (const offense of CRIMINAL_OFFENSES) {
      const context = offense.paragraph;
      expect(families.has(offense.family)).withContext(context).toBe(true);
      expect(levels).withContext(context).toContain(offense.relevanceLevel);
      expect(offense.relevanceReason.length).withContext(context).toBeGreaterThan(0);
      expect(offense.examRelevance.length).withContext(context).toBeGreaterThan(0);
      expect(Array.isArray(offense.relatedOffenses)).withContext(context).toBe(true);
    }
  });

  it('verweist in relatedOffenses nur auf vorhandene IDs', () => {
    const ids = new Set(CRIMINAL_OFFENSES.map((offense) => offense.id));
    for (const offense of CRIMINAL_OFFENSES) {
      for (const relatedId of offense.relatedOffenses) {
        expect(ids.has(relatedId))
          .withContext(`${offense.paragraph} → ${relatedId}`)
          .toBe(true);
      }
    }
  });

  it('führt §123 StGB in der eigenen Kategorie Hausrecht (Auftrag Nr. 15)', () => {
    const hausfriedensbruch = CRIMINAL_OFFENSES.find((o) => o.id === 'stgb-123');
    expect(hausfriedensbruch?.category).toBe('HAUSRECHT');
  });

  it('führt §244a StGB als eigenständige Qualifikation des Bandendiebstahls', () => {
    const schwererBandendiebstahl = CRIMINAL_OFFENSES.find((o) => o.id === 'stgb-244a');
    expect(schwererBandendiebstahl?.family).toBe('DIEBSTAHL');
    expect(schwererBandendiebstahl?.familyRelation).toBe('QUALIFIKATION');
    expect(schwererBandendiebstahl?.classification).toBe('VERBRECHEN');
  });

  it('stellt §243 StGB als Regelbeispiel und §244 StGB als Qualifikation dar', () => {
    expect(CRIMINAL_OFFENSES.find((o) => o.id === 'stgb-243')?.familyRelation).toBe(
      'REGELBEISPIEL',
    );
    expect(CRIMINAL_OFFENSES.find((o) => o.id === 'stgb-244')?.familyRelation).toBe(
      'QUALIFIKATION',
    );
  });
});
