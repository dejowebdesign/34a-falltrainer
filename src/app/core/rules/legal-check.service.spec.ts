import { TestBed } from '@angular/core/testing';
import { LegalCheckService } from './legal-check.service';

describe('LegalCheckService', () => {
  let service: LegalCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegalCheckService);
  });

  it('ordnet §985 BGB als Anspruch ein und warnt vor Gewaltmissverständnis', () => {
    const check = service.classifyNorm('bgb-985');
    expect(check.category).toBe('ANSPRUCH');
    expect(check.isAuthority).toBe(false);
    expect(check.warning).toContain('Anspruch');
  });

  it('ordnet §127 StPO als Befugnis ein', () => {
    const check = service.classifyNorm('stpo-127');
    expect(check.category).toBe('BEFUGNIS');
    expect(check.isAuthority).toBe(true);
  });

  it('ordnet §32 StGB als Rechtfertigung ein', () => {
    const check = service.classifyNorm('stgb-32');
    expect(check.category).toBe('RECHTFERTIGUNG');
    expect(check.isAuthority).toBe(true);
  });

  it('ordnet §33 StGB als Entschuldigung ein', () => {
    const check = service.classifyNorm('stgb-33');
    expect(check.category).toBe('ENTSCHULDIGUNG');
    expect(check.isAuthority).toBe(false);
    expect(check.warning).toContain('Entschuldigung');
  });

  it('markiert fehlende Normen als fehlend statt zu erfinden', () => {
    const check = service.classifyNorm('unbekannt-999');
    expect(check.warning).toContain('fehlen');
    expect(check.isAuthority).toBe(false);
  });

  it('findet die verbotenen Automatismen zu „Diebstahl“', () => {
    const automatisms = service.findAutomatisms('diebstahl');
    expect(automatisms.length).toBeGreaterThan(0);
    expect(automatisms[0].forbiddenConclusion).toContain('festhalten');
  });

  it('kennt den Automatismus Uniform → Polizeibefugnisse', () => {
    const automatisms = service.findAutomatisms('uniform');
    expect(automatisms.some((entry) => entry.relatedNormIds.includes('stgb-132'))).toBe(true);
  });

  it('kennt alle in der Bibel genannten verbotenen Automatismen', () => {
    expect(service.getAutomatisms().length).toBeGreaterThanOrEqual(7);
  });
});
