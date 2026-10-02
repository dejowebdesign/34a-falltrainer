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

  it('verbindet die oberen Kästen mit "ODER" und zeigt Pfeile nach unten', () => {
    const element = fixture.nativeElement as HTMLElement;
    const oder = element.querySelectorAll('.areas-row .oder');
    expect(oder.length).toBe(2);
    for (const node of Array.from(oder)) {
      expect((node.textContent ?? '').trim().toUpperCase()).toBe('ODER');
    }
    const arrows = element.querySelectorAll('.areas-row .area-arrow');
    expect(arrows.length).toBe(3);
  });

  it('zeigt zwischen den Ebenen einen zentrierten Pfeil mit neutraler Beschriftung', () => {
    const element = fixture.nativeElement as HTMLElement;
    const link = element.querySelector('.level-link');
    expect(link).toBeTruthy();
    expect(link?.querySelector('mat-icon')?.textContent?.trim()).toBe('south');
    expect((link?.textContent ?? '')).toContain('rechtlich einordnen');
  });

  it('hält die Karten einer Reihe auf gleicher Höhe', () => {
    const element = fixture.nativeElement as HTMLElement;
    for (const row of Array.from(element.querySelectorAll<HTMLElement>('.areas, .areas-row'))) {
      const cards = Array.from(row.querySelectorAll<HTMLElement>(':scope > .area, :scope > .area-col > .area'));
      if (cards.length < 2) {
        continue;
      }
      const heights = cards.map((card) => Math.round(card.getBoundingClientRect().height));
      expect(new Set(heights).size)
        .withContext(`Kartenhöhen: ${heights.join(', ')}`)
        .toBe(1);
    }
  });

  it('enthält keine Merksätze (kein "≠" und keine Automatismus-Formulierungen)', () => {
    expect(text).not.toContain('≠');
    expect(text).not.toContain('automatisch');
    expect(text).not.toContain('nicht automatisch');
  });
});
