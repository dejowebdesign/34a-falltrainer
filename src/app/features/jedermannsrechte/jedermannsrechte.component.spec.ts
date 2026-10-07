import { ApplicationRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { JedermannsrechteComponent } from './jedermannsrechte.component';

describe('JedermannsrechteComponent', () => {
  let fixture: ComponentFixture<JedermannsrechteComponent>;
  let element: HTMLElement;
  let overlay: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JedermannsrechteComponent],
      providers: [provideNoopAnimations(), provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(JedermannsrechteComponent);
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  });

  function flush(): void {
    fixture.detectChanges();
    TestBed.inject(ApplicationRef).tick();
    fixture.detectChanges();
  }

  function cards(): HTMLElement[] {
    return Array.from(element.querySelectorAll('app-topic-card'));
  }

  function cardFor(paragraph: string): HTMLElement {
    const card = cards().find((item) => item.textContent?.includes(paragraph));
    if (!card) {
      throw new Error(`Karte für ${paragraph} nicht gefunden`);
    }
    return card;
  }

  it('zeigt Titel und Untertitel', () => {
    expect(element.querySelector('h1')?.textContent?.trim()).toBe('Jedermannsrechte');
    expect(element.textContent).toContain(
      'Welche Rechte und Rechtfertigungsgründe stehen Privatpersonen unter gesetzlichen',
    );
  });

  it('enthält §127 Abs. 1 StPO sowie §§32–35 StGB und nichts darüber hinaus', () => {
    const paragraphs = cards().map((card) => card.textContent ?? '');
    expect(paragraphs.some((text) => text.includes('§ 127 Abs. 1 StPO'))).toBe(true);
    expect(paragraphs.some((text) => text.includes('§ 32'))).toBe(true);
    expect(paragraphs.some((text) => text.includes('§ 33'))).toBe(true);
    expect(paragraphs.some((text) => text.includes('§ 34'))).toBe(true);
    expect(paragraphs.some((text) => text.includes('§ 35'))).toBe(true);
    // Keine Täterschaft/Teilnahme:
    expect(paragraphs.some((text) => text.includes('§ 25'))).toBe(false);
    expect(paragraphs.some((text) => text.includes('§ 27'))).toBe(false);
  });

  it('zeigt die Vergleichsmatrix „Welches Recht könnte greifen?“', () => {
    expect(element.querySelector('app-authority-matrix')).toBeTruthy();
    expect(element.textContent).toContain('Welches Recht könnte greifen?');
    expect(element.textContent).toContain('§ 127 Abs. 1 StPO');
    expect(element.textContent).toContain('§ 32 StGB');
  });

  it('öffnet über die Matrix die zugehörige Lernkarte', () => {
    const link = Array.from(element.querySelectorAll<HTMLButtonElement>('.norm-link')).find(
      (button) => button.textContent?.includes('§ 127 Abs. 1 StPO'),
    )!;
    link.click();
    flush();

    const dialog = overlay.querySelector('app-topic-detail');
    expect(dialog).toBeTruthy();
    expect(dialog?.textContent).toContain('Vorläufige Festnahme');
    expect(dialog?.textContent).toContain('Prüfungshinweis');
  });

  it('verlinkt auf die zugehörigen BGB-Normen, ohne sie zu duplizieren', () => {
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('.bgb-link'));
    const hrefs = links.map((link) => link.getAttribute('href'));
    expect(hrefs.every((href) => href === '/bgb')).toBe(true);
    expect(element.textContent).toContain('§ 859 BGB – Selbsthilfe des Besitzers');
    // Die BGB-Normen erscheinen nicht als eigene Lernkarten auf dieser Seite:
    const paragraphs = cards().map((card) => card.textContent ?? '');
    expect(paragraphs.some((text) => text.includes('§ 859'))).toBe(false);
  });

  it('trennt Rechtfertigung und Entschuldigung sichtbar', () => {
    // Merkkarte der vier Kernkategorien ist vorhanden.
    expect(element.querySelector('app-core-categories')).toBeTruthy();
    expect(element.textContent).toContain('Warum ist eine Handlung ausnahmsweise nicht rechtswidrig?');
    expect(element.textContent).toContain('Entschuldigung');
  });

  it('filtert über die Suche', () => {
    const input = element.querySelector<HTMLInputElement>('input[type="search"]')!;
    input.value = 'Festnahme';
    input.dispatchEvent(new Event('input'));
    flush();

    const texts = cards().map((card) => card.textContent ?? '');
    expect(texts.some((text) => text.includes('§ 127'))).toBe(true);
    expect(texts.some((text) => text.includes('§ 32'))).toBe(false);
  });
});
