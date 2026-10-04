import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriminalOffenseCardComponent } from './criminal-offense-card.component';
import { CriminalOffenseService } from '../../core/services/criminal-offense.service';

describe('CriminalOffenseCardComponent', () => {
  let fixture: ComponentFixture<CriminalOffenseCardComponent>;
  let element: HTMLElement;
  let service: CriminalOffenseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriminalOffenseCardComponent],
    }).compileComponents();
    service = TestBed.inject(CriminalOffenseService);
  });

  function render(id: string): void {
    fixture = TestBed.createComponent(CriminalOffenseCardComponent);
    fixture.componentRef.setInput('offense', service.getOffense(id)!);
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
  }

  it('zeigt die kompakten Kernmerkmale', () => {
    render('stgb-223');
    const text = element.textContent ?? '';
    expect(text).toContain('§ 223');
    expect(text).toContain('Körperverletzung');
    expect(text).toContain('Vergehen');
    expect(text).toContain('Antragsdelikt');
    expect(text).toContain('Versuch: Ja');
    expect(text).toContain('Mindeststrafe');
    expect(text).toContain('Details öffnen');
  });

  it('zeigt keine Tatbestandsmerkmale in der Übersichtskarte', () => {
    render('stgb-223');
    expect(element.textContent).not.toContain('Objektiver Tatbestand');
    expect(element.textContent).not.toContain('Subjektiver Tatbestand');
    expect(element.textContent).not.toContain('Amtlicher Gesetzeswortlaut');
  });

  it('emittiert beim Klick das Delikt', () => {
    render('stgb-242');
    let emitted: string | undefined;
    fixture.componentInstance.open.subscribe((offense) => (emitted = offense.id));
    element.querySelector<HTMLButtonElement>('.offense-card')!.click();
    expect(emitted).toBe('stgb-242');
  });

  it('markiert besonders §34a-relevante Delikte', () => {
    render('stgb-242');
    expect(element.querySelector('.card-star')).toBeTruthy();
    render('stgb-132a');
    expect(element.querySelector('.card-star')).toBeNull();
  });

  it('kennzeichnet Verbrechen mit dem passenden Chip', () => {
    render('stgb-226');
    const chip = element.querySelector('.ft-chip--primary');
    expect(chip?.textContent).toContain('Verbrechen');
  });
});
