import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent (Startseite als Lernseite)', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let element: HTMLElement;
  let text: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideNoopAnimations(), provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
    text = element.textContent ?? '';
  });

  it('zeigt die drei Prüfungsfragen in der richtigen Reihenfolge', () => {
    const q1 = text.indexOf('Wie verhalten Sie sich?');
    const q2 = text.indexOf('Was liegt rechtlich vor?');
    const q3 = text.indexOf('Mit welcher Rechtsgrundlage dürfen Sie eingreifen?');
    expect(q1).toBeGreaterThanOrEqual(0);
    expect(q2).toBeGreaterThan(q1);
    expect(q3).toBeGreaterThan(q2);
  });

  it('zeigt Umgang mit Menschen und die rechtliche Einordnung ohne Accordion', () => {
    expect(element.querySelector('app-behavior-reference')).toBeTruthy();
    expect(element.querySelector('app-legal-orientation')).toBeTruthy();
    expect(element.querySelector('mat-expansion-panel')).toBeNull();
    expect(element.querySelector('mat-accordion')).toBeNull();
  });

  it('zeigt § 862 BGB und die Gefahr-Begriffe mit "Mensch"', () => {
    expect(text).toContain('§ 862 BGB – Anspruch wegen Besitzstörung');
    expect(text).toContain('Gefahr geht von einem Menschen aus');
    expect(text).toContain('Gefahr geht von einer Sache aus');
    expect(text).not.toContain('Gefahr geht von einer Person aus');
  });

  it('stellt die Überschrift der zweiten Ebene unter die unteren Karten', () => {
    const bottomRow = element.querySelector('.areas-bottom')!;
    const bottomTitle = element.querySelector('.diagram-title-bottom')!;
    expect(bottomRow).toBeTruthy();
    expect(bottomTitle).toBeTruthy();
    expect(
      bottomRow.compareDocumentPosition(bottomTitle) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('endet mit dem Copyright-Footer', () => {
    const footer = element.querySelector('footer.site-footer');
    expect(footer).toBeTruthy();
    expect(footer?.textContent).toContain('© 2026 Dejan Popovic. Alle Rechte vorbehalten.');
  });

  it('enthält keine Merksätze', () => {
    expect(text).not.toContain('≠');
    expect(text).not.toContain('nicht automatisch');
  });

  it('bettet den Hero in einen abgerundeten Glass-Container ein', () => {
    const hero = element.querySelector('.hero');
    expect(hero).toBeTruthy();
    expect(hero?.classList).toContain('ft-glass-panel');
    expect(hero?.querySelector('.hero-media img')).toBeTruthy();
    expect(hero?.querySelector('.hero-bg')).toBeTruthy();
  });

  it('gestaltet die großen Inhaltsbereiche als Glass-Panels', () => {
    const panels = element.querySelectorAll('.content .ft-glass-panel.panel');
    expect(panels.length).toBe(3);
  });

  it('behält Hero-Inhalte vollständig', () => {
    const hero = element.querySelector('.hero')!;
    expect(hero.textContent).toContain('Sachkundeprüfung § 34a GewO');
    expect(hero.textContent).toContain('Fallbeispiele starten');
    expect(hero.textContent).toContain('Prüfungssimulation');
    expect(hero.querySelectorAll('.hero-badges li').length).toBe(3);
  });
});
