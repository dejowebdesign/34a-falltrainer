import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { StrafgesetzbuchComponent } from './strafgesetzbuch.component';
import { CriminalOffenseService } from '../../core/services/criminal-offense.service';

describe('StrafgesetzbuchComponent', () => {
  let fixture: ComponentFixture<StrafgesetzbuchComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrafgesetzbuchComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();
    fixture = TestBed.createComponent(StrafgesetzbuchComponent);
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
  });

  function cards(): HTMLElement[] {
    return Array.from(element.querySelectorAll('app-criminal-offense-card'));
  }

  it('zeigt Titel und Untertitel der Lernseite', () => {
    expect(element.querySelector('h1')?.textContent).toContain('Strafgesetzbuch');
    expect(element.textContent).toContain('Relevante Straftaten für die Sachkundeprüfung §34a GewO');
  });

  it('rendert je Datensatz eine Steckbrief-Card', () => {
    const service = TestBed.inject(CriminalOffenseService);
    expect(cards().length).toBe(service.getOffenses().length);
  });

  it('zeigt Paragraph und offiziellen Titel je Card', () => {
    const text = element.textContent ?? '';
    expect(text).toContain('§ 242');
    expect(text).toContain('Diebstahl');
    expect(text).toContain('§ 123');
    expect(text).toContain('Hausfriedensbruch');
  });

  it('blendet die Grundlagen des Allgemeinen Teils ein', () => {
    const basics = element.querySelectorAll('.basic-panel');
    expect(basics.length).toBe(4);
    expect(element.textContent).toContain('Verbrechen und Vergehen');
    expect(element.textContent).toContain('Strafbarkeit des Versuchs');
  });

  it('reduziert die Liste über die Suche', () => {
    fixture.componentInstance.query.set('Diebstahl');
    fixture.detectChanges();
    expect(cards().length).toBeGreaterThan(0);
    expect(cards().length).toBeLessThan(TestBed.inject(CriminalOffenseService).getOffenses().length);
    for (const card of cards()) {
      expect(card.textContent?.toLowerCase()).toContain('diebstahl');
    }
  });

  it('filtert über die Paragraphennummer', () => {
    fixture.componentInstance.query.set('§ 242');
    fixture.detectChanges();
    expect(cards().length).toBe(1);
    expect(cards()[0].textContent).toContain('§ 242');
  });

  it('filtert nach Antragsdelikten', () => {
    fixture.componentInstance.prosecution.set('ANTRAGSDELIKT');
    fixture.detectChanges();
    expect(cards().length).toBeGreaterThan(0);
    for (const card of cards()) {
      expect(card.textContent).toContain('Antragsdelikt');
    }
  });

  it('filtert nach Verbrechen', () => {
    fixture.componentInstance.classification.set('VERBRECHEN');
    fixture.detectChanges();
    expect(cards().length).toBeGreaterThan(0);
    for (const card of cards()) {
      expect(card.textContent).toContain('Verbrechen');
    }
  });

  it('zeigt bei keinem Treffer einen leeren Zustand', () => {
    fixture.componentInstance.query.set('xyz-gibt-es-nicht');
    fixture.detectChanges();
    expect(cards().length).toBe(0);
    expect(element.querySelector('.empty-state')?.textContent).toContain('Keine Treffer');
  });

  it('setzt Suche und Filter zurück', () => {
    fixture.componentInstance.query.set('Diebstahl');
    fixture.componentInstance.prosecution.set('ANTRAGSDELIKT');
    fixture.detectChanges();
    fixture.componentInstance.resetFilters();
    fixture.detectChanges();
    expect(fixture.componentInstance.query()).toBe('');
    expect(fixture.componentInstance.prosecution()).toBeNull();
    expect(cards().length).toBe(TestBed.inject(CriminalOffenseService).getOffenses().length);
  });

  it('meldet die Trefferzahl über eine Live-Region', () => {
    const status = element.querySelector('.result-count');
    expect(status?.getAttribute('aria-live')).toBe('polite');
    expect(status?.textContent).toContain('Straftatbeständen');
  });

  it('klappt einen Steckbrief auf und zeigt die Tatbestandsmerkmale', () => {
    const header = element.querySelector<HTMLElement>('app-criminal-offense-card .mat-expansion-panel-header');
    expect(header).toBeTruthy();
    header!.click();
    fixture.detectChanges();

    const text = element.textContent ?? '';
    expect(text).toContain('Objektiver Tatbestand');
    expect(text).toContain('Subjektiver Tatbestand');
    expect(text).toContain('Mindeststrafe');
    expect(text).toContain('Verfolgung');
    expect(text).toContain('Versuch');
  });

  it('kennzeichnet das anfänglich geschlossene Panel als nicht expandiert', () => {
    const panel = element.querySelector('app-criminal-offense-card mat-expansion-panel');
    expect(panel?.classList.contains('mat-expanded')).toBe(false);
  });
});
