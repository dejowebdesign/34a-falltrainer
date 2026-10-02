import { LEGAL_NORMS } from '../data/legal-norms.data';
import { LegalNorm } from '../models';
import { formatFachlicheEinordnung, formatNorm, formatNormReference } from './norm-format';

const normById = (id: string): LegalNorm => {
  const norm = LEGAL_NORMS.find((entry) => entry.id === id);
  if (!norm) {
    throw new Error(`Norm ${id} fehlt in der Knowledge Base`);
  }
  return norm;
};

describe('Zentrale Normdarstellung (formatNorm)', () => {
  it('bildet Paragraph, Absatz, Gesetz und offiziellen Titel ab', () => {
    expect(formatNorm(normById('stpo-127'))).toBe('§ 127 Abs. 1 StPO – Vorläufige Festnahme');
  });

  it('lässt den Absatz weg, wenn keiner hinterlegt ist', () => {
    expect(formatNorm(normById('bgb-859'))).toBe('§ 859 BGB – Selbsthilfe des Besitzers');
  });

  it('liefert die Kurzform ohne Titel', () => {
    expect(formatNormReference(normById('stpo-127'))).toBe('§ 127 Abs. 1 StPO');
    expect(formatNormReference(normById('bgb-861'))).toBe('§ 861 BGB');
  });

  it('verwendet für §228 BGB den offiziellen Titel "Notstand"', () => {
    expect(formatNorm(normById('bgb-228'))).toBe('§ 228 BGB – Notstand');
  });

  it('verwendet für §904 BGB den offiziellen Titel "Notstand"', () => {
    expect(formatNorm(normById('bgb-904'))).toBe('§ 904 BGB – Notstand');
  });

  it('trennt die fachliche Einordnung vom offiziellen Titel', () => {
    expect(formatFachlicheEinordnung(normById('bgb-228'))).toBe('Defensivnotstand');
    expect(formatFachlicheEinordnung(normById('bgb-904'))).toBe('Aggressivnotstand');
    expect(formatFachlicheEinordnung(normById('stgb-34'))).toBeUndefined();
  });
});

describe('Offizielle Gesetzestitel der Knowledge Base', () => {
  const expectedTitles: Record<string, string> = {
    'stpo-127': 'Vorläufige Festnahme',
    'bgb-859': 'Selbsthilfe des Besitzers',
    'bgb-860': 'Selbsthilfe des Besitzdieners',
    'bgb-861': 'Anspruch wegen Besitzentziehung',
    'bgb-858': 'Verbotene Eigenmacht',
    'bgb-903': 'Befugnisse des Eigentümers',
    'bgb-904': 'Notstand',
    'bgb-985': 'Herausgabeanspruch',
    'bgb-228': 'Notstand',
    'stgb-32': 'Notwehr',
    'stgb-34': 'Rechtfertigender Notstand',
    'stgb-123': 'Hausfriedensbruch',
    'stgb-185': 'Beleidigung',
    'stgb-223': 'Körperverletzung',
    'stgb-242': 'Diebstahl',
  };

  it('verwendet die offiziellen Titel statt fachlicher Kurzbezeichnungen', () => {
    for (const [id, title] of Object.entries(expectedTitles)) {
      expect(normById(id).title).withContext(id).toBe(title);
    }
  });

  it('führt "Defensivnotstand"/"Aggressivnotstand" nicht als offiziellen Titel', () => {
    const titles = LEGAL_NORMS.map((norm) => norm.title);
    expect(titles).not.toContain('Defensivnotstand');
    expect(titles).not.toContain('Defensiver Notstand');
    expect(titles).not.toContain('Aggressivnotstand');
    expect(titles).not.toContain('Aggressiver Notstand');
  });

  it('gibt jeder Norm einen nicht-leeren offiziellen Titel', () => {
    for (const norm of LEGAL_NORMS) {
      expect(norm.title.trim().length).withContext(norm.id).toBeGreaterThan(0);
    }
  });

  it('zeigt formatNorm niemals nur die Paragraphennummer', () => {
    for (const norm of LEGAL_NORMS) {
      const label = formatNorm(norm);
      expect(label).withContext(norm.id).toContain(' – ');
      expect(label).withContext(norm.id).toContain(norm.law);
      expect(label).withContext(norm.id).toContain(norm.title);
    }
  });
});
