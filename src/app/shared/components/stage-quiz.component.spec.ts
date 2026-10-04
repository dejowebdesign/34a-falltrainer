import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { StageQuizComponent } from './stage-quiz.component';
import { StageOption } from '../../core/models';

const OPTIONS: StageOption[] = [
  { id: 'o1', text: 'Option eins', verdict: 'RICHTIG', explanation: 'Erklärung eins' },
  { id: 'o2', text: 'Option zwei', verdict: 'FALSCH', explanation: 'Erklärung zwei' },
];

describe('StageQuizComponent (Frage-Interaktion)', () => {
  let fixture: ComponentFixture<StageQuizComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageQuizComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();
    fixture = TestBed.createComponent(StageQuizComponent);
    fixture.componentRef.setInput('heading', 'Stufe 1 – Wie verhalten Sie sich?');
    fixture.componentRef.setInput('prompt', 'Wie verhalten Sie sich?');
    fixture.componentRef.setInput('options', OPTIONS);
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
  });

  it('blendet die Fragekarte ein (reveal) und zeigt den Fokus-Trigger', () => {
    expect(element.querySelector('.quiz-card')?.classList.contains('ft-reveal')).toBe(true);
    expect(element.querySelector('.ft-focus-trigger')?.textContent).toContain('Frage fokussieren');
  });

  it('erzeugt genau eine Antwortfläche je Option', () => {
    expect(element.querySelectorAll('.option').length).toBe(OPTIONS.length);
  });

  it('markiert eine ausgewählte Option klar', () => {
    fixture.componentRef.setInput('selectedIds', ['o1']);
    fixture.detectChanges();
    const options = element.querySelectorAll('.option');
    expect(options[0].classList.contains('selected')).toBe(true);
    expect(options[1].classList.contains('selected')).toBe(false);
  });

  it('öffnet und schließt die Fokusansicht der Frage', () => {
    fixture.componentInstance.openFocus();
    fixture.detectChanges();
    expect(element.querySelector('app-focus-overlay')).toBeTruthy();

    fixture.componentInstance.closeFocus();
    fixture.detectChanges();
    expect(element.querySelector('app-focus-overlay')).toBeNull();
  });

  it('gibt den Fokus nach dem Schließen an den Auslöser zurück', () => {
    fixture.componentInstance.openFocus();
    fixture.detectChanges();
    const trigger = element.querySelector<HTMLButtonElement>('.ft-focus-trigger')!;
    fixture.componentInstance.closeFocus();
    fixture.detectChanges();
    expect(document.activeElement).toBe(trigger);
  });

  it('behält die Auswahl beim Öffnen und Schließen des Fokus bei', () => {
    fixture.componentRef.setInput('selectedIds', ['o2']);
    fixture.detectChanges();
    fixture.componentInstance.openFocus();
    fixture.detectChanges();
    fixture.componentInstance.closeFocus();
    fixture.detectChanges();
    expect(element.querySelectorAll('.option')[1].classList.contains('selected')).toBe(true);
  });

  it('blockiert die Antwortoptionen nicht durch das Overlay (Auswahl bleibt nutzbar)', () => {
    const selected: string[] = [];
    fixture.componentInstance.toggleOption.subscribe((id) => selected.push(id));
    fixture.componentInstance.openFocus();
    fixture.detectChanges();
    // Die Karte bleibt im DOM und bedienbar; das Overlay ist rein visuell.
    expect(element.querySelectorAll('.option').length).toBe(OPTIONS.length);
    fixture.componentInstance.toggle('o1');
    expect(selected).toEqual(['o1']);
  });
});
