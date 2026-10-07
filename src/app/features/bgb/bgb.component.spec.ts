import { ApplicationRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BgbComponent } from './bgb.component';

describe('BgbComponent', () => {
  let fixture: ComponentFixture<BgbComponent>;
  let element: HTMLElement;
  let overlay: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BgbComponent],
      providers: [provideNoopAnimations(), provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(BgbComponent);
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

  it('zeigt Titel und Untertitel der Lernseite', () => {
    expect(element.querySelector('h1')?.textContent?.trim()).toBe('Bürgerliches Gesetzbuch');
    expect(element.textContent).toContain(
      'Relevante Vorschriften des BGB für die Sachkundeprüfung §34a GewO',
    );
  });

  it('zeigt nur die sachkunderelevanten BGB-Normen als Karten', () => {
    const paragraphs = cards().map((card) => card.textContent ?? '');
    expect(paragraphs.some((text) => text.includes('§ 859'))).toBe(true);
    expect(paragraphs.some((text) => text.includes('§ 858'))).toBe(true);
    expect(paragraphs.some((text) => text.includes('§ 903'))).toBe(true);
    expect(paragraphs.some((text) => text.includes('§ 854'))).toBe(true);
    // Bewusst nicht enthalten:
    expect(paragraphs.some((text) => text.includes('§ 985'))).toBe(false);
    expect(paragraphs.some((text) => text.includes('§ 1004'))).toBe(false);
  });

  it('zeigt die vier Kernkategorien', () => {
    expect(element.querySelector('app-core-categories')).toBeTruthy();
    expect(element.textContent).toContain('Anspruch');
    expect(element.textContent).toContain('Befugnis');
    expect(element.textContent).toContain('Rechtfertigung');
    expect(element.textContent).toContain('Entschuldigung');
  });

  it('filtert über die Suche', () => {
    const input = element.querySelector<HTMLInputElement>('input[type="search"]')!;
    input.value = 'Selbsthilfe';
    input.dispatchEvent(new Event('input'));
    flush();

    const texts = cards().map((card) => card.textContent ?? '');
    expect(texts.some((text) => text.includes('§ 859'))).toBe(true);
    expect(texts.some((text) => text.includes('§ 229'))).toBe(true);
    expect(texts.some((text) => text.includes('§ 903'))).toBe(false);
  });

  it('zeigt bei leerem Treffer einen Leerzustand', () => {
    const input = element.querySelector<HTMLInputElement>('input[type="search"]')!;
    input.value = 'Quantenphysik';
    input.dispatchEvent(new Event('input'));
    flush();

    expect(cards().length).toBe(0);
    expect(element.querySelector('.empty-state')).toBeTruthy();
  });

  it('öffnet das Detail-Modal mit den Lernabschnitten', () => {
    cardFor('§ 859').querySelector<HTMLButtonElement>('.topic-card')!.click();
    flush();

    const dialog = overlay.querySelector('app-topic-detail');
    expect(dialog).toBeTruthy();
    expect(dialog?.textContent).toContain('Selbsthilfe des Besitzers');
    expect(dialog?.textContent).toContain('Kurz erklärt');
    expect(dialog?.textContent).toContain('Prüfungshinweis');
    expect(dialog?.textContent).toContain('Amtlicher Wortlaut');
  });

  it('markiert fehlenden amtlichen Wortlaut im Modal als fehlend', () => {
    cardFor('§ 226').querySelector<HTMLButtonElement>('.topic-card')!.click();
    flush();

    const dialog = overlay.querySelector('app-topic-detail');
    expect(dialog?.textContent).toContain('als fehlend markiert');
  });

  it('navigiert im Modal zur nächsten Karte', () => {
    cardFor('§ 854').querySelector<HTMLButtonElement>('.topic-card')!.click();
    flush();

    const next = Array.from(overlay.querySelectorAll<HTMLButtonElement>('.nav-button')).find(
      (button) => button.textContent?.includes('Weiter'),
    )!;
    next.click();
    flush();

    expect(overlay.querySelector('app-topic-detail')?.textContent).toContain(
      'Verbotene Eigenmacht',
    );
  });
});
