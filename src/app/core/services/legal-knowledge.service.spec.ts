import { TestBed } from '@angular/core/testing';
import { LegalKnowledgeService } from './legal-knowledge.service';
import { LEGAL_NORMS } from '../data/legal-norms.data';
import { LEGAL_AUTHORITIES } from '../data/legal-authorities.data';
import { LEGAL_CLASSIFICATIONS } from '../data/legal-classifications.data';

describe('LegalKnowledgeService', () => {
  let service: LegalKnowledgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegalKnowledgeService);
  });

  it('liefert alle Normen der Knowledge Base', () => {
    expect(service.getNorms().length).toBe(LEGAL_NORMS.length);
    expect(service.getNorms().length).toBeGreaterThan(30);
  });

  it('liefert eine Norm über ihre ID', () => {
    expect(service.getNorm('stgb-242')?.title).toBe('Diebstahl');
  });

  it('liefert undefined für fehlende Normen', () => {
    expect(service.getNorm('gibt-es-nicht')).toBeUndefined();
  });

  it('löst Norm-IDs auf und überspringt unbekannte', () => {
    const norms = service.getNormsByIds(['stgb-242', 'unbekannt', 'bgb-859']);
    expect(norms.map((norm) => norm.id)).toEqual(['stgb-242', 'bgb-859']);
  });

  it('erkennt amtliche Gesetzestexte', () => {
    expect(service.hasOfficialText('stgb-242')).toBe(true);
  });

  it('erkennt fehlende amtliche Gesetzestexte (keine Halluzination)', () => {
    expect(service.hasOfficialText('stgb-252')).toBe(false);
    expect(service.getNorm('stgb-252')?.verificationStatus).toBe('MISSING');
    expect(service.getNorm('stgb-252')?.officialText).toBe('');
  });

  it('enthält für jede Norm eine amtliche Quelle', () => {
    for (const norm of LEGAL_NORMS) {
      expect(norm.source).toContain('gesetze-im-internet.de');
    }
  });

  it('verknüpft jede Klassifikation mit vorhandenen Normen', () => {
    for (const classification of LEGAL_CLASSIFICATIONS) {
      for (const normId of classification.normIds) {
        expect(service.getNorm(normId)).toBeDefined();
      }
    }
  });

  it('verknüpft jede Befugnis mit einer vorhandenen Norm', () => {
    for (const authority of LEGAL_AUTHORITIES) {
      expect(service.getNorm(authority.normId)).toBeDefined();
    }
  });
});
