import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationRef } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { StrafgesetzbuchComponent } from './strafgesetzbuch.component';
import { CriminalOffenseService } from '../../core/services/criminal-offense.service';
import { OFFENSE_FAMILY_LABELS } from '../../core/data/criminal-offenses.data';

describe('StrafgesetzbuchComponent', () => {
  let fixture: ComponentFixture<StrafgesetzbuchComponent>;
  let element: HTMLElement;
  let overlay: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrafgesetzbuchComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();
    fixture = TestBed.createComponent(StrafgesetzbuchComponent);
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  });

  function cards(): HTMLElement[] {
    return Array.from(element.querySelectorAll('app-criminal-offense-card'));
  }

  function cardFor(paragraph: string): HTMLElement {
    const card = cards().find((item) => item.textContent?.includes(paragraph));
    if (!card) {
      throw new Error(`Card für ${paragraph} nicht gefunden`);
    }
    return card;
  }

  function openCard(paragraph: string): void {
    cardFor(paragraph).querySelector<HTMLButtonElement>('.offense-card')!.click();
    flush();
  }

  /**
   * Der Material-Dialog wird am Fixture vorbei an der ApplicationRef gerendert.
   * Ohne `ApplicationRef.tick()` bliebe sein Template leer, obwohl das Delikt
   * korrekt übergeben wurde.
   */
  function flush(): void {
    fixture.detectChanges();
    TestBed.inject(ApplicationRef).tick();
    fixture.detectChanges();
  }

  function navButton(label: string): HTMLButtonElement {
    const button = Array.from(overlay.querySelectorAll<HTMLButtonElement>('.nav-button')).find((b) =>
      b.textContent?.includes(label),
    );
    if (!button) {
      throw new Error(`Navigationsbutton ${label} nicht gefunden`);
    }
    return button;
  }

  function service(): CriminalOffenseService {
    return TestBed.inject(CriminalOffenseService);
  }

  it('zeigt Titel und Untertitel der Lernseite', () => {
    expect(element.querySelector('h1')?.textContent).toContain('Strafgesetzbuch');
    expect(element.textContent).toContain('Relevante Straftaten für die Sachkundeprüfung §34a GewO');
  });

  it('rendert je Datensatz eine kompakte Karte', () => {
    expect(cards().length).toBe(service().getOffenses().length);
    // Die Karten sind jetzt kompakt: keine Tatbestandsmerkmale in der Liste.
    expect(element.textContent).not.toContain('Objektiver Tatbestand');
  });

  it('zeigt Paragraph und offiziellen Titel je Karte', () => {
    const text = element.textContent ?? '';
    expect(text).toContain('§ 242');
    expect(text).toContain('Diebstahl');
    expect(text).toContain('§ 123');
    expect(text).toContain('Hausfriedensbruch');
  });

  it('zeigt die Mindeststrafe kompakt auf der Karte', () => {
    const card = cardFor('§ 242');
    expect(card.textContent).toContain('Mindeststrafe');
    expect(card.textContent).toContain('Details öffnen');
  });

  it('blendet die Grundlagen des Strafrechts als Lernkarten ein', () => {
    const basics = element.querySelectorAll('app-legal-basics-card');
    expect(basics.length).toBe(service().getBasics().length);
    expect(basics.length).toBeGreaterThanOrEqual(8);
    expect(element.textContent).toContain('Verbrechen und Vergehen');
    expect(element.textContent).toContain('Garantenstellung');
  });

  it('öffnet ein Grundlagenthema als Lern-Modal', () => {
    const card = element.querySelector<HTMLButtonElement>('app-legal-basics-card .basics-card')!;
    card.click();
    flush();
    const dialog = overlay.querySelector('app-legal-basics-detail');
    expect(dialog).toBeTruthy();
    const text = dialog?.textContent ?? '';
    expect(text).toContain('Merksatz');
    expect(text).toContain('Prüfungsrelevant');
    expect(text).toContain('Amtlicher Wortlaut');
  });

  it('reduziert die Liste über die Suche', () => {
    fixture.componentInstance.text.set('Diebstahl');
    fixture.detectChanges();
    expect(cards().length).toBeGreaterThan(0);
    expect(cards().length).toBeLessThan(service().getOffenses().length);
  });

  it('filtert über die Paragraphennummer', () => {
    fixture.componentInstance.text.set('§ 242');
    fixture.detectChanges();
    expect(cards().length).toBe(1);
    expect(cards()[0].textContent).toContain('§ 242');
  });

  it('filtert über den Schnellfilter Antragsdelikte', () => {
    fixture.componentInstance.toggleQuick('ANTRAGSDELIKT');
    fixture.detectChanges();
    expect(cards().length).toBeGreaterThan(0);
    for (const card of cards()) {
      expect(card.textContent).toContain('Antragsdelikt');
    }
  });

  it('filtert über den Schnellfilter Verbrechen', () => {
    fixture.componentInstance.toggleQuick('VERBRECHEN');
    fixture.detectChanges();
    expect(cards().length).toBeGreaterThan(0);
    for (const card of cards()) {
      expect(card.textContent).toContain('Verbrechen');
    }
  });

  it('kombiniert mehrere Schnellfilter (Mehrfachauswahl)', () => {
    fixture.componentInstance.toggleQuick('ANTRAGSDELIKT');
    fixture.componentInstance.toggleQuick('VERGEHEN');
    fixture.detectChanges();
    expect(cards().length).toBeGreaterThan(0);
    for (const card of cards()) {
      expect(card.textContent).toContain('Antragsdelikt');
      expect(card.textContent).toContain('Vergehen');
    }
  });

  it('kombiniert mehrere Werte innerhalb einer Dimension per ODER', () => {
    fixture.componentInstance.toggleQuick('VERBRECHEN');
    fixture.componentInstance.toggleQuick('VERGEHEN');
    fixture.detectChanges();
    expect(cards().length).toBe(service().getOffenses().length);
  });

  it('hebt den aktiven Schnellfilter über aria-pressed hervor', () => {
    const chip = Array.from(element.querySelectorAll<HTMLElement>('.quick-chip')).find((item) =>
      item.textContent?.includes('Verbrechen'),
    );
    expect(chip?.getAttribute('aria-pressed')).toBe('false');
    chip!.click();
    fixture.detectChanges();
    expect(chip?.getAttribute('aria-pressed')).toBe('true');
  });

  it('filtert über die erweiterten Filter', () => {
    fixture.componentInstance.prosecutions.set(['OFFIZIALDELIKT']);
    fixture.componentInstance.attempts.set(['PUNISHABLE']);
    fixture.detectChanges();
    expect(cards().length).toBeGreaterThan(0);
    for (const card of cards()) {
      expect(card.textContent).toContain('Offizialdelikt');
      expect(card.textContent).toContain('Versuch: Ja');
    }
  });

  it('filtert über die Deliktsgruppe', () => {
    fixture.componentInstance.categories.set(['RAUB_ERPRESSUNG']);
    fixture.detectChanges();
    expect(cards().length).toBeGreaterThan(0);
    const familyLabels = service()
      .getOffenses()
      .filter((o) => o.category === 'RAUB_ERPRESSUNG')
      .map((o) => o.family);
    for (const card of cards()) {
      const matches = familyLabels.some((family) =>
        card.textContent?.includes(OFFENSE_FAMILY_LABELS[family]),
      );
      expect(matches).toBe(true);
    }
  });

  it('filtert über die Deliktsfamilie', () => {
    fixture.componentInstance.families.set(['DIEBSTAHL']);
    fixture.detectChanges();
    expect(cards().length).toBeGreaterThan(0);
    for (const card of cards()) {
      expect(card.textContent).toContain('Diebstahlsdelikte');
    }
  });

  it('filtert über die Kategorie besonders §34a-relevant', () => {
    fixture.componentInstance.examRelevantOnly.set(true);
    fixture.detectChanges();
    const expected = service().getOffenses().filter((o) => service().isExamRelevant(o)).length;
    expect(cards().length).toBe(expected);
    expect(cards().length).toBeGreaterThan(0);
  });

  it('zeigt bei keinem Treffer einen leeren Zustand', () => {
    fixture.componentInstance.text.set('xyz-gibt-es-nicht');
    fixture.detectChanges();
    expect(cards().length).toBe(0);
    expect(element.querySelector('.empty-state')?.textContent).toContain('Keine Treffer');
  });

  it('setzt Suche und Filter zurück', () => {
    fixture.componentInstance.text.set('Diebstahl');
    fixture.componentInstance.toggleQuick('ANTRAGSDELIKT');
    fixture.componentInstance.examRelevantOnly.set(true);
    fixture.detectChanges();
    fixture.componentInstance.resetFilters();
    fixture.detectChanges();
    expect(fixture.componentInstance.text()).toBe('');
    expect(fixture.componentInstance.prosecutions()).toEqual([]);
    expect(fixture.componentInstance.examRelevantOnly()).toBe(false);
    expect(cards().length).toBe(service().getOffenses().length);
  });

  it('deaktiviert den Zurücksetzen-Button ohne aktive Filter', () => {
    const reset = element.querySelector<HTMLButtonElement>('.reset');
    expect(reset?.disabled).toBe(true);
    fixture.componentInstance.text.set('Diebstahl');
    fixture.detectChanges();
    expect(reset?.disabled).toBe(false);
  });

  it('berechnet die Trefferzahl und Kennzahlen aus den Daten', () => {
    const all = service().getStats(service().getOffenses());
    const status = element.querySelector('.result-count');
    expect(status?.getAttribute('aria-live')).toBe('polite');
    expect(status?.textContent).toContain(`${all.total} Straftatbestände`);
    expect(status?.textContent).toContain(`${all.antragsdelikte} Antragsdelikte`);
    expect(status?.textContent).toContain(`${all.verbrechen} Verbrechen`);
    expect(status?.textContent).toContain(`${all.vergehen} Vergehen`);
  });

  it('zeigt bei aktiven Filtern „x von y“', () => {
    fixture.componentInstance.text.set('§ 242');
    fixture.detectChanges();
    const status = element.querySelector('.result-count');
    expect(status?.textContent).toContain('1 von');
  });

  it('sortiert standardmäßig nach Relevanz (§34a-Kerndelikte zuerst)', () => {
    expect(cards()[0].textContent).toContain('Besonders §34a-relevant');
  });

  it('sortiert alphabetisch', () => {
    fixture.componentInstance.sortKey.set('ALPHABETICAL');
    fixture.detectChanges();
    expect(cards()[0].textContent).toContain('Amtsanmaßung');
  });

  it('sortiert nach Mindeststrafe aufsteigend (Geldstrafe zuerst)', () => {
    fixture.componentInstance.sortKey.set('PENALTY_ASC');
    fixture.detectChanges();
    const texts = cards().map((card) => card.textContent ?? '');
    const firstWithFs = texts.findIndex((text) => text.includes('Freiheitsstrafe nicht unter'));
    const firstWithout = texts.findIndex((text) => text.includes('Geldstrafe bzw.'));
    expect(firstWithout).toBe(0);
    expect(firstWithFs).toBeGreaterThan(firstWithout);
  });

  it('sortiert nach Mindeststrafe absteigend (höchstes Mindestmaß zuerst)', () => {
    fixture.componentInstance.sortKey.set('PENALTY_DESC');
    fixture.detectChanges();
    // §227 (nicht unter drei Jahren) hat das höchste Mindestmaß.
    expect(cards()[0].textContent).toContain('§ 227');
  });

  it('sortiert Verbrechen zuerst', () => {
    fixture.componentInstance.sortKey.set('VERBRECHEN_FIRST');
    fixture.detectChanges();
    const texts = cards().map((card) => card.textContent ?? '');
    const firstVergehen = texts.findIndex((text) => text.includes('Vergehen'));
    const lastVerbrechen = texts.reduce(
      (last, text, index) => (text.includes('Verbrechen') ? index : last),
      -1,
    );
    expect(lastVerbrechen).toBeLessThan(firstVergehen);
  });

  it('gruppiert nach Deliktsfamilie, wenn aktiviert', () => {
    fixture.componentInstance.grouped.set(true);
    fixture.detectChanges();
    const groups = element.querySelectorAll('.penalty-group');
    expect(groups.length).toBeGreaterThan(1);
    expect(element.textContent).toContain('Diebstahlsdelikte');
    expect(element.textContent).toContain('Körperverletzungsdelikte');
    expect(cards().length).toBe(service().getOffenses().length);
  });

  it('öffnet die Detailansicht als Modal mit den vollständigen Angaben', () => {
    openCard('§ 223');
    const dialog = overlay.querySelector('app-criminal-offense-detail');
    expect(dialog).toBeTruthy();
    const text = dialog?.textContent ?? '';
    expect(text).toContain('§ 223');
    expect(text).toContain('Körperverletzung');
    expect(text).toContain('Objektiver Tatbestand');
    expect(text).toContain('Subjektiver Tatbestand');
    expect(text).toContain('Mindeststrafe');
    expect(text).toContain('Verfolgung');
    expect(text).toContain('Versuch');
    expect(text).toContain('Geschütztes Rechtsgut');
    expect(text).toContain('Für §34a wichtig');
    expect(text).toContain('Amtlicher Gesetzeswortlaut');
  });

  it('öffnet das Modal nicht mehr als Inline-Bereich in der Liste', () => {
    openCard('§ 223');
    expect(element.querySelector('app-criminal-offense-detail')).toBeNull();
    expect(overlay.querySelector('app-criminal-offense-detail')).toBeTruthy();
  });

  it('schließt das Modal über die Schließen-Schaltfläche', async () => {
    openCard('§ 223');
    const closeButton = overlay.querySelector<HTMLButtonElement>('.head-close');
    expect(closeButton).toBeTruthy();
    closeButton!.click();
    // Das Schließen ist asynchron (Animation-/Promise-Kette des Dialogs).
    await fixture.whenStable();
    flush();
    expect(TestBed.inject(MatDialog).openDialogs.length).toBe(0);
  });

  it('navigiert im Modal zum nächsten Delikt', () => {
    fixture.componentInstance.sortKey.set('PARAGRAPH');
    fixture.detectChanges();
    openCard('§ 123');
    navButton('Nächstes').click();
    flush();
    expect(overlay.querySelector('app-criminal-offense-detail')?.textContent).toContain('§ 132');
  });

  it('navigiert über ähnliche Delikte im Modal', () => {
    openCard('§ 242');
    const related = Array.from(
      overlay.querySelectorAll<HTMLButtonElement>('.related-chip'),
    ).find((chip) => chip.textContent?.includes('§ 246'));
    expect(related).toBeTruthy();
    related!.click();
    flush();
    expect(overlay.querySelector('app-criminal-offense-detail')?.textContent).toContain(
      'Unterschlagung',
    );
  });

  it('gibt den Fokus nach dem Schließen an die auslösende Karte zurück', () => {
    const trigger = cardFor('§ 223').querySelector<HTMLButtonElement>('.offense-card')!;
    trigger.focus();
    trigger.click();
    fixture.detectChanges();
    const dialogRef = TestBed.inject(MatDialog).openDialogs[0];
    expect(dialogRef).toBeTruthy();
    dialogRef.close();
    flush();
    expect(document.activeElement).toBe(trigger);
  });

  it('stellt die Modal-Navigation mit dem Sortierzustand bereit', () => {
    fixture.componentInstance.sortKey.set('ALPHABETICAL');
    fixture.detectChanges();
    cards()[0].querySelector<HTMLButtonElement>('.offense-card')!.click();
    flush();
    // Erste Karte in alphabetischer Sortierung ist Amtsanmaßung.
    expect(overlay.querySelector('app-criminal-offense-detail')?.textContent).toContain(
      'Amtsanmaßung',
    );
  });
});
