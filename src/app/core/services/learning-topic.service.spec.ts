import { TestBed } from '@angular/core/testing';
import { LearningTopicService, TOPIC_NATURE_LABELS } from './learning-topic.service';
import { BGB_FAMILIES, BGB_TOPICS } from '../data/bgb-topics.data';
import {
  JEDERMANNSRECHTE_FAMILIES,
  JEDERMANNSRECHTE_TOPICS,
} from '../data/jedermannsrechte-topics.data';
import { TopicQuery } from './learning-topic.service';

describe('LearningTopicService', () => {
  let service: LearningTopicService;

  const emptyQuery = (overrides: Partial<TopicQuery> = {}): TopicQuery => ({
    text: '',
    nature: [],
    ...overrides,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningTopicService);
  });

  it('liefert die kuratierten BGB- und Jedermannsrechte-Karten', () => {
    expect(service.getBgbTopics().length).toBe(BGB_TOPICS.length);
    expect(service.getJedermannsrechteTopics().length).toBe(JEDERMANNSRECHTE_TOPICS.length);
  });

  it('enthält nur sachkunderelevante BGB-Normen (keine reine Zivilrechts-Erweiterung)', () => {
    const ids = service.getBgbTopics().map((topic) => topic.id);
    expect(ids).toContain('bgb-859');
    expect(ids).toContain('bgb-858');
    expect(ids).toContain('bgb-903');
    expect(ids).toContain('bgb-854');
    expect(ids).toContain('bgb-229');
    expect(ids).toContain('bgb-227');
    expect(ids).toContain('bgb-228');
    expect(ids).toContain('bgb-904');
    expect(ids).toContain('bgb-823');
    // Bewusst NICHT als eigene Lernkarten aufgenommen:
    for (const excluded of ['bgb-985', 'bgb-986', 'bgb-1004', 'bgb-812', 'bgb-861', 'bgb-862']) {
      expect(ids).not.toContain(excluded);
    }
  });

  it('enthält auf der Jedermannsrechte-Seite nur §127 StPO und §§32–35 StGB', () => {
    const ids = service.getJedermannsrechteTopics().map((topic) => topic.id);
    expect(ids).toEqual(['stpo-127', 'stgb-32', 'stgb-33', 'stgb-34', 'stgb-35']);
    // Keine Täterschaft/Teilnahme, keine §§113–115 StGB:
    for (const excluded of ['stgb-25', 'stgb-26', 'stgb-27', 'stgb-113', 'stgb-114', 'stgb-115']) {
      expect(ids).not.toContain(excluded);
    }
  });

  it('trennt Rechtfertigung und Entschuldigung sauber', () => {
    const byId = (id: string) => service.getJedermannsrechteTopics().find((t) => t.id === id)!;
    expect(byId('stgb-32').nature).toBe('RECHTFERTIGUNG');
    expect(byId('stgb-34').nature).toBe('RECHTFERTIGUNG');
    expect(byId('stgb-33').nature).toBe('ENTSCHULDIGUNG');
    expect(byId('stgb-35').nature).toBe('ENTSCHULDIGUNG');
  });

  it('markiert fehlende amtliche Wortlaute als MISSING statt zu erfinden', () => {
    const bgb226 = service.getTopic('bgb-226')!;
    const bgb823 = service.getTopic('bgb-823')!;
    expect(bgb226.verificationStatus).toBe('MISSING');
    expect(bgb226.officialText).toBe('');
    expect(bgb823.verificationStatus).toBe('MISSING');
    expect(bgb823.officialText).toBe('');
  });

  it('verwendet für §228 und §904 den offiziellen Titel „Notstand“ mit fachlicher Einordnung', () => {
    const bgb228 = service.getTopic('bgb-228')!;
    const bgb904 = service.getTopic('bgb-904')!;
    expect(bgb228.officialTitle).toBe('Notstand');
    expect(bgb228.fachlicheEinordnung).toBe('Defensivnotstand');
    expect(bgb904.officialTitle).toBe('Notstand');
    expect(bgb904.fachlicheEinordnung).toBe('Aggressivnotstand');
  });

  describe('query', () => {
    it('filtert nach Paragraph', () => {
      const result = service.query(service.getBgbTopics(), emptyQuery({ text: '§859' }));
      const ids = result.map((topic) => topic.id);
      // §859 selbst ist immer dabei; weitere Treffer sind zulässige Querverweise
      // (z. B. §858 → §859, §229 → §859).
      expect(ids).toContain('bgb-859');
      expect(ids.every((id) => id !== 'bgb-903')).toBe(true);
    });

    it('filtert nach Thema', () => {
      const result = service.query(service.getBgbTopics(), emptyQuery({ text: 'Selbsthilfe' }));
      const ids = result.map((topic) => topic.id);
      expect(ids).toContain('bgb-229');
      expect(ids).toContain('bgb-859');
    });

    it('liefert bei unbekanntem Suchbegriff eine leere Liste', () => {
      const result = service.query(
        service.getBgbTopics(),
        emptyQuery({ text: 'Quantenphysik' }),
      );
      expect(result).toEqual([]);
    });

    it('filtert nach Rechtsnatur', () => {
      const result = service.query(
        service.getJedermannsrechteTopics(),
        emptyQuery({ nature: ['RECHTFERTIGUNG'] }),
      );
      expect(result.map((topic) => topic.id)).toEqual(['stgb-32', 'stgb-34']);
    });

    it('filtert nach Lernfamilie', () => {
      const result = service.query(
        service.getBgbTopics(),
        emptyQuery({ familyId: 'selbsthilfe' }),
      );
      expect(result.map((topic) => topic.id)).toEqual(['bgb-229', 'bgb-859']);
    });
  });

  describe('groupByFamily', () => {
    it('gruppiert in der Reihenfolge der Familien und lässt leere Gruppen weg', () => {
      const groups = service.groupByFamily(service.getBgbTopics(), BGB_FAMILIES);
      expect(groups.map((group) => group.familyId)).toEqual([
        'eigentum-besitz',
        'selbsthilfe',
        'notwehr-notstand',
        'schadensersatz',
        'schikaneverbot',
      ]);
      const selbsthilfe = groups.find((group) => group.familyId === 'selbsthilfe')!;
      expect(selbsthilfe.topics.map((topic) => topic.id)).toEqual(['bgb-229', 'bgb-859']);
    });

    it('lässt leere Gruppen weg', () => {
      const only = service.query(service.getBgbTopics(), emptyQuery({ familyId: 'schikaneverbot' }));
      const groups = service.groupByFamily(only, BGB_FAMILIES);
      expect(groups.length).toBe(1);
      expect(groups[0].familyId).toBe('schikaneverbot');
    });

    it('gruppiert die Jedermannsrechte nach ihren Familien', () => {
      const groups = service.groupByFamily(
        service.getJedermannsrechteTopics(),
        JEDERMANNSRECHTE_FAMILIES,
      );
      expect(groups.map((group) => group.familyId)).toEqual(['festnahme', 'notwehr', 'notstand']);
    });
  });

  it('erkennt einen aktiven Filterzustand', () => {
    expect(service.hasActiveQuery(emptyQuery())).toBe(false);
    expect(service.hasActiveQuery(emptyQuery({ text: '  ' }))).toBe(false);
    expect(service.hasActiveQuery(emptyQuery({ text: 'Notwehr' }))).toBe(true);
    expect(service.hasActiveQuery(emptyQuery({ nature: ['BEFUGNIS'] }))).toBe(true);
    expect(service.hasActiveQuery(emptyQuery({ familyId: 'selbsthilfe' }))).toBe(true);
  });

  it('liefert die Vergleichsmatrix mit §127 StPO und den StGB-Grundlagen', () => {
    const matrix = service.getAuthorityMatrix();
    const bases = matrix.map((row) => row.legalBasis);
    expect(bases).toContain('§ 32 StGB');
    expect(bases).toContain('§ 34 StGB');
    expect(bases).toContain('§ 35 StGB');
    expect(bases).toContain('§ 127 Abs. 1 StPO');
    expect(bases.some((basis) => basis.includes('§ 859 BGB'))).toBe(true);
  });

  it('liefert die vier Kernkategorien als Merkkarte', () => {
    const categories = service.getCoreCategories();
    expect(categories.map((category) => category.key)).toEqual([
      'ANSPRUCH',
      'BEFUGNIS',
      'RECHTFERTIGUNG',
      'ENTSCHULDIGUNG',
    ]);
  });

  it('hält für jede Rechtsnatur ein Label vor', () => {
    for (const topic of [...service.getBgbTopics(), ...service.getJedermannsrechteTopics()]) {
      expect(TOPIC_NATURE_LABELS[topic.nature]).toBeTruthy();
    }
  });
});
