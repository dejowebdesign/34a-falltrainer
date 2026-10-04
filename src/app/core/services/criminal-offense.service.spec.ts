import { TestBed } from '@angular/core/testing';
import {
  CriminalOffenseService,
  EMPTY_OFFENSE_QUERY,
  minimumPenaltyMonths,
  penaltyClassOf,
} from './criminal-offense.service';

describe('CriminalOffenseService (Suche)', () => {
  let service: CriminalOffenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriminalOffenseService);
  });

  it('liefert ohne Suche alle Delikte', () => {
    expect(service.query(EMPTY_OFFENSE_QUERY).length).toBe(service.getOffenses().length);
  });

  it('findet ein Delikt über die Paragraphennummer', () => {
    const result = service.query({ ...EMPTY_OFFENSE_QUERY, text: '242' });
    expect(result.map((o) => o.paragraph)).toContain('§ 242');
  });

  it('findet ein Delikt über den Straftatnamen', () => {
    const result = service.query({ ...EMPTY_OFFENSE_QUERY, text: 'Diebstahl' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.some((o) => o.id === 'stgb-242')).toBe(true);
    // Ein inhaltlich unbeteiligtes Delikt darf nicht mitgelistet werden.
    expect(result.some((o) => o.paragraph === '§ 185')).toBe(false);
  });

  it('findet über den Fachbegriff „Antragsdelikt“ die Antragsdelikte', () => {
    const result = service.query({ ...EMPTY_OFFENSE_QUERY, text: 'Antragsdelikt' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((o) => o.prosecution.type === 'ANTRAGSDELIKT')).toBe(true);
  });

  it('findet über „Körperverletzung“ mehrere Delikte', () => {
    const result = service.query({ ...EMPTY_OFFENSE_QUERY, text: 'Körperverletzung' });
    expect(result.length).toBeGreaterThanOrEqual(4);
  });

  it('kombiniert Suche und Filter', () => {
    const result = service.query({
      ...EMPTY_OFFENSE_QUERY,
      text: 'Diebstahl',
      categories: ['DIEBSTAHL_UNTERSCHLAGUNG'],
      classifications: ['VERGEHEN'],
    });
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every(
        (o) => o.category === 'DIEBSTAHL_UNTERSCHLAGUNG' && o.classification === 'VERGEHEN',
      ),
    ).toBe(true);
  });

  it('liefert bei einem nicht auflösbaren Suchbegriff eine leere Liste', () => {
    const result = service.query({ ...EMPTY_OFFENSE_QUERY, text: 'xyz-gibt-es-nicht' });
    expect(result).toEqual([]);
  });

  it('löst verwandte Delikte über die Abgrenzungen auf', () => {
    const diebstahl = service.getOffense('stgb-242');
    expect(diebstahl).toBeDefined();
    const related = service.getRelated(diebstahl!);
    expect(related.map((o) => o.paragraph)).toContain('§ 246');
    // Ein Delikt verweist nie auf sich selbst.
    expect(related.every((o) => o.id !== 'stgb-242')).toBe(true);
  });

  it('liefert für Delikte ohne Abgrenzung keine verwandten Delikte', () => {
    const offense = service.getOffense('stgb-132a');
    expect(offense).toBeDefined();
    const related = service.getRelated(offense!);
    expect(related.every((o) => o.id !== 'stgb-132a')).toBe(true);
  });
});

describe('CriminalOffenseService (Mehrfachauswahl-Filter)', () => {
  let service: CriminalOffenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriminalOffenseService);
  });

  it('liefert ohne Filter alle Delikte', () => {
    expect(service.query(EMPTY_OFFENSE_QUERY).length).toBe(service.getOffenses().length);
  });

  it('kombiniert mehrere Werte innerhalb einer Dimension per ODER', () => {
    const result = service.query({
      ...EMPTY_OFFENSE_QUERY,
      classifications: ['VERBRECHEN', 'VERGEHEN'],
    });
    expect(result.length).toBe(service.getOffenses().length);
  });

  it('kombiniert verschiedene Dimensionen per UND', () => {
    const result = service.query({
      ...EMPTY_OFFENSE_QUERY,
      classifications: ['VERGEHEN'],
      prosecutions: ['ANTRAGSDELIKT'],
    });
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every(
        (o) => o.classification === 'VERGEHEN' && o.prosecution.type === 'ANTRAGSDELIKT',
      ),
    ).toBe(true);
  });

  it('filtert mehrfach über Versuchsstrafbarkeit', () => {
    const punishable = service.query({ ...EMPTY_OFFENSE_QUERY, attempts: ['PUNISHABLE'] });
    const notPunishable = service.query({
      ...EMPTY_OFFENSE_QUERY,
      attempts: ['NOT_PUNISHABLE'],
    });
    expect(punishable.every((o) => o.attemptPunishable)).toBe(true);
    expect(notPunishable.every((o) => !o.attemptPunishable)).toBe(true);
    expect(punishable.length + notPunishable.length).toBe(service.getOffenses().length);
  });

  it('filtert über Vorsatz und Fahrlässigkeit', () => {
    const vorsatz = service.query({ ...EMPTY_OFFENSE_QUERY, culpabilities: ['VORSATZ'] });
    const fahrlaessig = service.query({
      ...EMPTY_OFFENSE_QUERY,
      culpabilities: ['FAEHLAESSIGKEIT'],
    });
    expect(vorsatz.every((o) => o.intentRequired)).toBe(true);
    expect(fahrlaessig.every((o) => o.negligence.negligentVariant)).toBe(true);
    expect(fahrlaessig.length).toBeGreaterThan(0);
  });

  it('filtert über mehrere Deliktsgruppen', () => {
    const result = service.query({
      ...EMPTY_OFFENSE_QUERY,
      categories: ['RAUB_ERPRESSUNG', 'DIEBSTAHL_UNTERSCHLAGUNG'],
    });
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every(
        (o) => o.category === 'RAUB_ERPRESSUNG' || o.category === 'DIEBSTAHL_UNTERSCHLAGUNG',
      ),
    ).toBe(true);
  });

  it('filtert über die kuratierte §34a-Relevanz', () => {
    const result = service.query({ ...EMPTY_OFFENSE_QUERY, examRelevantOnly: true });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((o) => service.isExamRelevant(o))).toBe(true);
  });

  it('filtert auf die Kern-Delikte (CORE_34A)', () => {
    const result = service.query({ ...EMPTY_OFFENSE_QUERY, coreOnly: true });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((o) => o.relevanceLevel === 'CORE_34A')).toBe(true);
    // RELATED_34A-Delikte dürfen nicht enthalten sein.
    expect(result.some((o) => o.relevanceLevel === 'RELATED_34A')).toBe(false);
  });

  it('filtert über die Deliktsfamilie', () => {
    const result = service.query({ ...EMPTY_OFFENSE_QUERY, families: ['DIEBSTAHL'] });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((o) => o.family === 'DIEBSTAHL')).toBe(true);
    expect(result.some((o) => o.id === 'stgb-242')).toBe(true);
  });

  it('blendet Delikte der Stufe NOT_INCLUDE nicht aus der Gesamtliste aus', () => {
    expect(service.getOffenses().every((o) => o.relevanceLevel !== 'NOT_INCLUDE')).toBe(true);
  });
});

describe('CriminalOffenseService (Sortierung)', () => {
  let service: CriminalOffenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriminalOffenseService);
  });

  it('sortiert standardmäßig nach Paragraph aufsteigend', () => {
    const sorted = service.sort(service.getOffenses(), 'PARAGRAPH');
    // §12/§15/§22/§23 sind Grundlagen (LEGAL_BASICS), nicht Teil der Deliktsliste.
    expect(sorted[0].paragraph).toBe('§ 123');
    const numbers = sorted.map((o) => Number(o.paragraph.replace(/[^0-9]/g, '')));
    const ascending = [...numbers].sort((a, b) => a - b);
    expect(numbers).toEqual(ascending);
  });

  it('sortiert Paragraphen mit Buchstabensuffix korrekt (§248a vor §248b)', () => {
    const sorted = service.sort(service.getOffenses(), 'PARAGRAPH');
    const paragraphs = sorted.map((o) => o.paragraph);
    expect(paragraphs.indexOf('§ 248a')).toBeLessThan(paragraphs.indexOf('§ 248b'));
    expect(paragraphs.indexOf('§ 303a')).toBeGreaterThan(paragraphs.indexOf('§ 303'));
    expect(paragraphs.indexOf('§ 132a')).toBeGreaterThan(paragraphs.indexOf('§ 132'));
  });

  it('sortiert alphabetisch nach Titel', () => {
    const sorted = service.sort(service.getOffenses(), 'ALPHABETICAL');
    expect(sorted[0].officialTitle).toBe('Amtsanmaßung');
  });

  it('sortiert nach Mindeststrafe aufsteigend mit Paragraph als Zweitkriterium', () => {
    const sorted = service.sort(service.getOffenses(), 'PENALTY_ASC');
    const ranks = sorted.map((o) => minimumPenaltyMonths(o.minimumPenalty) ?? 0);
    const ascending = [...ranks].sort((a, b) => a - b);
    expect(ranks).toEqual(ascending);
    // Delikte ohne Mindestfreiheitsstrafe stehen zuerst.
    expect(minimumPenaltyMonths(sorted[0].minimumPenalty) ?? 0).toBe(0);
  });

  it('sortiert nach Mindeststrafe absteigend', () => {
    const sorted = service.sort(service.getOffenses(), 'PENALTY_DESC');
    expect(sorted[0].paragraph).toBe('§ 227');
    const ranks = sorted.map((o) => minimumPenaltyMonths(o.minimumPenalty) ?? 0);
    const descending = [...ranks].sort((a, b) => b - a);
    expect(ranks).toEqual(descending);
  });

  it('sortiert Verbrechen zuerst, danach Vergehen', () => {
    const sorted = service.sort(service.getOffenses(), 'VERBRECHEN_FIRST');
    const firstVergehen = sorted.findIndex((o) => o.classification === 'VERGEHEN');
    const lastVerbrechen = sorted.map((o) => o.classification).lastIndexOf('VERBRECHEN');
    expect(lastVerbrechen).toBeLessThan(firstVergehen);
  });

  it('sortiert Vergehen zuerst', () => {
    const sorted = service.sort(service.getOffenses(), 'VERGEHEN_FIRST');
    expect(sorted[0].classification).toBe('VERGEHEN');
  });

  it('verändert die übergebene Liste nicht (reine Funktion)', () => {
    const original = service.getOffenses();
    const snapshot = original.map((o) => o.id);
    service.sort(original, 'ALPHABETICAL');
    expect(original.map((o) => o.id)).toEqual(snapshot);
  });
});

describe('CriminalOffenseService (Gruppierung nach Strafmaß)', () => {
  let service: CriminalOffenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriminalOffenseService);
  });

  it('leitet die Strafmaßklasse aus dem gesetzlichen Mindestmaß ab', () => {
    expect(penaltyClassOf(service.getOffense('stgb-242')!)).toBe('GELDSTRASSE');
    expect(penaltyClassOf(service.getOffense('stgb-224')!)).toBe(
      'FREIHEITSSTRAFE_UNTER_1_JAHR',
    );
    expect(penaltyClassOf(service.getOffense('stgb-226')!)).toBe('VERBRECHEN_AB_1_JAHR');
    expect(penaltyClassOf(service.getOffense('stgb-247')!)).toBe('OHNE_EIGENE_STRAFANDROHUNG');
  });

  it('rechnet Wortlaute korrekt in Monate um', () => {
    expect(minimumPenaltyMonths('Freiheitsstrafe nicht unter drei Monaten')).toBe(3);
    expect(minimumPenaltyMonths('Freiheitsstrafe nicht unter sechs Monaten')).toBe(6);
    expect(minimumPenaltyMonths('Freiheitsstrafe nicht unter einem Jahr')).toBe(12);
    expect(minimumPenaltyMonths('Freiheitsstrafe nicht unter drei Jahren')).toBe(36);
    expect(minimumPenaltyMonths('Keine eigene Strafandrohung (Strafverfolgungsregelung)')).toBe(0);
    expect(
      minimumPenaltyMonths('Geldstrafe bzw. keine gesetzliche Mindestfreiheitsstrafe'),
    ).toBeNull();
  });

  it('gruppiert alle Delikte lückenlos und ohne Duplikate', () => {
    const groups = service.group(service.getOffenses());
    const grouped = groups.flatMap((group) => group.offenses);
    expect(grouped.length).toBe(service.getOffenses().length);
    expect(new Set(grouped.map((o) => o.id)).size).toBe(service.getOffenses().length);
  });

  it('hält die Reihenfolge der Strafmaßgruppen ein (niedriges Mindestmaß zuerst)', () => {
    const groups = service.group(service.getOffenses());
    const order = groups.map((group) => group.penaltyClass);
    expect(order.indexOf('GELDSTRASSE')).toBeLessThan(order.indexOf('VERBRECHEN_AB_1_JAHR'));
    expect(order.indexOf('FREIHEITSSTRAFE_UNTER_1_JAHR')).toBeLessThan(
      order.indexOf('VERBRECHEN_AB_1_JAHR'),
    );
  });

  it('lässt leere Gruppen weg', () => {
    const onlyMoney = service
      .getOffenses()
      .filter((o) => penaltyClassOf(o) === 'GELDSTRASSE');
    const groups = service.group(onlyMoney);
    expect(groups.length).toBe(1);
    expect(groups[0].penaltyClass).toBe('GELDSTRASSE');
  });
});

describe('CriminalOffenseService (Kennzahlen)', () => {
  let service: CriminalOffenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriminalOffenseService);
  });

  it('berechnet die Kennzahlen aus den tatsächlichen Daten', () => {
    const stats = service.getStats(service.getOffenses());
    expect(stats.total).toBe(service.getOffenses().length);
    expect(stats.verbrechen + stats.vergehen).toBe(stats.total);
    expect(stats.antragsdelikte).toBeGreaterThan(0);
    expect(stats.examRelevant).toBe(
      service.getOffenses().filter((o) => service.isExamRelevant(o)).length,
    );
  });

  it('berechnet die Kennzahlen für eine gefilterte Liste', () => {
    const filtered = service.query({ ...EMPTY_OFFENSE_QUERY, classifications: ['VERBRECHEN'] });
    const stats = service.getStats(filtered);
    expect(stats.total).toBe(filtered.length);
    expect(stats.vergehen).toBe(0);
  });
});

