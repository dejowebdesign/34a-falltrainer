import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { LegalOrientationComponent } from './legal-orientation.component';

describe('LegalOrientationComponent (Lernhilfe)', () => {
  let fixture: ComponentFixture<LegalOrientationComponent>;
  let text: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalOrientationComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();
    fixture = TestBed.createComponent(LegalOrientationComponent);
    fixture.detectChanges();
    text = (fixture.nativeElement as HTMLElement).textContent ?? '';
  });

  it('zeigt beide Diagrammtitel', () => {
    expect(text).toContain('Was liegt rechtlich vor?');
    expect(text).toContain('Mit welcher Rechtsgrundlage dürfen Sie eingreifen?');
  });

  it('zeigt Paragraphen mit offiziellem Gesetzestitel', () => {
    expect(text).toContain('§ 242 StGB – Diebstahl');
    expect(text).toContain('§ 223 StGB – Körperverletzung');
    expect(text).toContain('§ 123 StGB – Hausfriedensbruch');
    expect(text).toContain('§ 858 BGB – Verbotene Eigenmacht');
    expect(text).toContain('§ 861 BGB – Anspruch wegen Besitzentziehung');
    expect(text).toContain('§ 862 BGB – Anspruch wegen Besitzstörung');
    expect(text).toContain('§ 127 Abs. 1 StPO – Vorläufige Festnahme');
    expect(text).toContain('§ 859 BGB – Selbsthilfe des Besitzers');
    expect(text).toContain('§ 860 BGB – Selbsthilfe des Besitzdieners');
    expect(text).toContain('§ 34 StGB – Rechtfertigender Notstand');
  });

  it('zeigt §228/§904 mit offiziellem Titel "Notstand" und getrennter Einordnung', () => {
    expect(text).toContain('§ 228 BGB – Notstand');
    expect(text).toContain('§ 904 BGB – Notstand');
    expect(text).toContain('Defensivnotstand');
    expect(text).toContain('Aggressivnotstand');
    expect(text).not.toContain('§ 228 BGB – Defensivnotstand');
    expect(text).not.toContain('§ 904 BGB – Aggressivnotstand');
  });

  it('zeigt die Gefahrenbegriffe nach Lage und Quelle, mit "Mensch"', () => {
    expect(text).toContain('Gefahrenlage');
    expect(text).toContain('drohende Gefahr');
    expect(text).toContain('gegenwärtige Gefahr');
    expect(text).toContain('Gefahrenquelle');
    expect(text).toContain('Gefahr geht von einem Menschen aus');
    expect(text).toContain('Gefahr geht von einer Sache aus');
    expect(text).not.toContain('Gefahr geht von einer Person aus');
  });

  it('verbindet die oberen Karten mit "ODER" im Zwischenraum', () => {
    const element = fixture.nativeElement as HTMLElement;
    const row = element.querySelector('.areas-row')!;
    const cards = row.querySelectorAll(':scope > .area');
    const oder = row.querySelectorAll(':scope > .oder');
    expect(cards.length).toBe(3);
    expect(oder.length).toBe(2);
    for (const node of Array.from(oder)) {
      expect((node.textContent ?? '').trim().toUpperCase()).toBe('ODER');
    }
  });

  it('zeigt genau EINEN zentralen Pfeil zwischen den Ebenen', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('.area-arrow').length).toBe(0);
    const link = element.querySelector('.level-link');
    expect(link).toBeTruthy();
    expect(link?.querySelector('mat-icon')?.textContent?.trim()).toBe('south');
    expect((link?.textContent ?? '')).toContain('rechtlich einordnen');
    expect(element.querySelectorAll('.level-link').length).toBe(1);
  });

  it('stellt die Überschrift der zweiten Ebene unter die unteren Karten', () => {
    const element = fixture.nativeElement as HTMLElement;
    const bottomRow = element.querySelector('.areas-bottom')!;
    const bottomTitle = element.querySelector('.diagram-title-bottom')!;
    expect(bottomTitle.textContent).toContain('Mit welcher Rechtsgrundlage dürfen Sie eingreifen?');
    // compareDocumentPosition: bottomTitle folgt nach bottomRow.
    expect(
      bottomRow.compareDocumentPosition(bottomTitle) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('hält die Karten einer Reihe auf gleicher Höhe und Breite', () => {
    const element = fixture.nativeElement as HTMLElement;
    for (const row of Array.from(element.querySelectorAll<HTMLElement>('.areas, .areas-row'))) {
      const cards = Array.from(row.querySelectorAll<HTMLElement>(':scope > .area'));
      if (cards.length < 2) {
        continue;
      }
      const heights = cards.map((card) => Math.round(card.getBoundingClientRect().height));
      const widths = cards.map((card) => Math.round(card.getBoundingClientRect().width));
      expect(new Set(heights).size)
        .withContext(`Kartenhöhen: ${heights.join(', ')}`)
        .toBe(1);
      expect(new Set(widths).size)
        .withContext(`Kartenbreiten: ${widths.join(', ')}`)
        .toBe(1);
    }
  });

  it('nutzt für obere und untere Reihe dieselben Spaltenbreiten', () => {
    const element = fixture.nativeElement as HTMLElement;
    const top = element.querySelector<HTMLElement>('.areas-row')!;
    const bottom = element.querySelector<HTMLElement>('.areas-bottom')!;
    const width = (row: HTMLElement, index: number) =>
      Math.round(row.querySelectorAll<HTMLElement>(':scope > .area')[index].getBoundingClientRect().width);
    for (let i = 0; i < 3; i++) {
      expect(width(top, i)).withContext(`Spalte ${i}`).toBe(width(bottom, i));
    }
  });

  it('positioniert das "ODER" im Zwischenraum, ohne die Karten zu verschmälern', () => {
    const element = fixture.nativeElement as HTMLElement;
    const row = element.querySelector<HTMLElement>('.areas-row')!;
    const cards = Array.from(row.querySelectorAll<HTMLElement>(':scope > .area')).map((card) =>
      card.getBoundingClientRect(),
    );
    const oder = Array.from(row.querySelectorAll<HTMLElement>(':scope > .oder')).map((node) =>
      node.getBoundingClientRect(),
    );
    expect(oder.length).toBe(2);
    const centers = oder.map((rect) => rect.left + rect.width / 2);
    // Das erste "ODER" liegt zwischen Karte 1 und 2, das zweite zwischen Karte 2 und 3.
    expect(centers[0]).toBeGreaterThan(cards[0].right);
    expect(centers[0]).toBeLessThan(cards[1].left);
    expect(centers[1]).toBeGreaterThan(cards[1].right);
    expect(centers[1]).toBeLessThan(cards[2].left);
  });

  it('enthält keine Merksätze (kein "≠" und keine Automatismus-Formulierungen)', () => {
    expect(text).not.toContain('≠');
    expect(text).not.toContain('automatisch');
    expect(text).not.toContain('nicht automatisch');
  });
});
