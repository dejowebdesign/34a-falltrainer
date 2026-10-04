import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  CriminalOffenseDetailComponent,
  CriminalOffenseDialogData,
} from './criminal-offense-detail.component';
import { CriminalOffenseService } from '../../core/services/criminal-offense.service';
import { CriminalOffense } from '../../core/models';

describe('CriminalOffenseDetailComponent', () => {
  let service: CriminalOffenseService;

  async function create(data: CriminalOffenseDialogData): Promise<{
    fixture: ComponentFixture<CriminalOffenseDetailComponent>;
    element: HTMLElement;
  }> {
    await TestBed.configureTestingModule({
      imports: [CriminalOffenseDetailComponent],
      providers: [
        provideNoopAnimations(),
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: { close: () => undefined } },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(CriminalOffenseDetailComponent);
    fixture.detectChanges();
    return { fixture, element: fixture.nativeElement as HTMLElement };
  }

  function dataFor(id: string): CriminalOffenseDialogData {
    const offenses = service.getOffenses();
    return { offenses, index: offenses.findIndex((o) => o.id === id) };
  }

  beforeEach(() => {
    // Direkt instanziieren: `TestBed.inject` würde das Testmodul vorzeitig
    // instanziieren und `configureTestingModule` in `create()` blockieren.
    service = new CriminalOffenseService();
  });

  it('zeigt die vollständigen Angaben des Delikts', async () => {
    const { element } = await create(dataFor('stgb-223'));
    const text = element.textContent ?? '';
    expect(text).toContain('§ 223');
    expect(text).toContain('Körperverletzung');
    expect(text).toContain('Geschütztes Rechtsgut');
    expect(text).toContain('Objektiver Tatbestand');
    expect(text).toContain('Subjektiver Tatbestand');
    expect(text).toContain('Vorsatz / Fahrlässigkeit');
    expect(text).toContain('Mindeststrafe');
    expect(text).toContain('Einordnung (§ 12 StGB)');
    expect(text).toContain('Verfolgung');
    expect(text).toContain('Versuch');
    expect(text).toContain('Für §34a wichtig');
    expect(text).toContain('Amtlicher Gesetzeswortlaut');
  });

  it('kennzeichnet besonders §34a-relevante Delikte', async () => {
    const { element } = await create(dataFor('stgb-242'));
    expect(element.textContent).toContain('Besonders relevant für §34a');
  });

  it('zeigt ähnliche Delikte und wechselt auf Klick', async () => {
    const { fixture, element } = await create(dataFor('stgb-242'));
    const chip = Array.from(element.querySelectorAll<HTMLButtonElement>('.related-chip')).find(
      (item) => item.textContent?.includes('§ 246'),
    );
    expect(chip).toBeTruthy();
    chip!.click();
    fixture.detectChanges();
    expect(element.textContent).toContain('Unterschlagung');
  });

  it('navigiert vor und zurück durch die Liste', async () => {
    const { fixture, element } = await create(dataFor('stgb-242'));
    const buttons = Array.from(element.querySelectorAll<HTMLButtonElement>('.nav-button'));
    const previous = buttons.find((b) => b.textContent?.includes('Vorheriges'))!;
    const next = buttons.find((b) => b.textContent?.includes('Nächstes'))!;

    next.click();
    fixture.detectChanges();
    expect(element.textContent).toContain('§ 243');

    previous.click();
    fixture.detectChanges();
    expect(element.textContent).toContain('§ 242');
  });

  it('deaktiviert die Navigation an den Listenrändern', async () => {
    const { fixture, element } = await create({ offenses: service.getOffenses(), index: 0 });
    const previous = Array.from(element.querySelectorAll<HTMLButtonElement>('.nav-button')).find(
      (b) => b.textContent?.includes('Vorheriges'),
    )!;
    expect(previous.disabled).toBe(true);

    const last: CriminalOffense = service.getOffenses()[service.getOffenses().length - 1];
    fixture.componentInstance.showRelated(last);
    fixture.detectChanges();
    const next = Array.from(element.querySelectorAll<HTMLButtonElement>('.nav-button')).find((b) =>
      b.textContent?.includes('Nächstes'),
    )!;
    expect(next.disabled).toBe(true);
  });

  it('zeigt die Position in der Liste an', async () => {
    const offenses = service.getOffenses();
    const { element } = await create({ offenses, index: 2 });
    expect(element.querySelector('.nav-position')?.textContent).toContain(
      `3 von ${offenses.length}`,
    );
  });
});
