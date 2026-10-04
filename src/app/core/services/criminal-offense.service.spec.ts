import { TestBed } from '@angular/core/testing';
import { CriminalOffenseService, EMPTY_OFFENSE_FILTER } from './criminal-offense.service';

describe('CriminalOffenseService (Suche und Filter)', () => {
  let service: CriminalOffenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriminalOffenseService);
  });

  it('liefert ohne Filter alle Delikte', () => {
    expect(service.filter(EMPTY_OFFENSE_FILTER).length).toBe(service.getOffenses().length);
  });

  it('findet ein Delikt über die Paragraphennummer', () => {
    const result = service.filter({ ...EMPTY_OFFENSE_FILTER, query: '242' });
    expect(result.map((o) => o.paragraph)).toContain('§ 242');
  });

  it('findet ein Delikt über den Straftatnamen', () => {
    const result = service.filter({ ...EMPTY_OFFENSE_FILTER, query: 'Diebstahl' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.some((o) => o.id === 'stgb-242')).toBe(true);
    // Ein inhaltlich unbeteiligtes Delikt darf nicht mitgelistet werden.
    expect(result.some((o) => o.paragraph === '§ 185')).toBe(false);
  });

  it('findet über den Fachbegriff „Antragsdelikt“ die Antragsdelikte', () => {
    const result = service.filter({ ...EMPTY_OFFENSE_FILTER, query: 'Antragsdelikt' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((o) => o.prosecution.type === 'ANTRAGSDELIKT')).toBe(true);
  });

  it('findet über „Körperverletzung“ mehrere Delikte', () => {
    const result = service.filter({ ...EMPTY_OFFENSE_FILTER, query: 'Körperverletzung' });
    expect(result.length).toBeGreaterThanOrEqual(4);
  });

  it('filtert nach Deliktsgruppe', () => {
    const result = service.filter({ ...EMPTY_OFFENSE_FILTER, category: 'RAUB_ERPRESSUNG' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((o) => o.category === 'RAUB_ERPRESSUNG')).toBe(true);
  });

  it('filtert nach Verbrechen', () => {
    const result = service.filter({ ...EMPTY_OFFENSE_FILTER, classification: 'VERBRECHEN' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((o) => o.classification === 'VERBRECHEN')).toBe(true);
  });

  it('filtert nach Antragsdelikten', () => {
    const result = service.filter({ ...EMPTY_OFFENSE_FILTER, prosecution: 'ANTRAGSDELIKT' });
    expect(result.every((o) => o.prosecution.type === 'ANTRAGSDELIKT')).toBe(true);
  });

  it('filtert nach Versuchsstrafbarkeit', () => {
    const punishable = service.filter({ ...EMPTY_OFFENSE_FILTER, attemptPunishable: true });
    const notPunishable = service.filter({ ...EMPTY_OFFENSE_FILTER, attemptPunishable: false });
    expect(punishable.every((o) => o.attemptPunishable)).toBe(true);
    expect(notPunishable.every((o) => !o.attemptPunishable)).toBe(true);
    expect(punishable.length + notPunishable.length).toBe(service.getOffenses().length);
  });

  it('filtert nach Delikten mit fahrlässiger Variante', () => {
    const result = service.filter({ ...EMPTY_OFFENSE_FILTER, negligenceOnly: true });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((o) => o.negligence.negligentVariant)).toBe(true);
  });

  it('kombiniert Suche und Filter', () => {
    const result = service.filter({
      ...EMPTY_OFFENSE_FILTER,
      query: 'Diebstahl',
      category: 'DIEBSTAHL_UNTERSCHLAGUNG',
      classification: 'VERGEHEN',
    });
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every(
        (o) => o.category === 'DIEBSTAHL_UNTERSCHLAGUNG' && o.classification === 'VERGEHEN',
      ),
    ).toBe(true);
  });

  it('liefert bei einem nicht auflösbaren Filter eine leere Liste', () => {
    const result = service.filter({ ...EMPTY_OFFENSE_FILTER, query: 'xyz-gibt-es-nicht' });
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
