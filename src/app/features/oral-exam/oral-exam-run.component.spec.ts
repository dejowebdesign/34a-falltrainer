import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { OralExamRunComponent } from './oral-exam-run.component';
import { OralExamService } from '../../core/services/oral-exam.service';

describe('OralExamRunComponent', () => {
  let fixture: ComponentFixture<OralExamRunComponent>;
  let element: HTMLElement;
  let service: OralExamService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OralExamRunComponent],
      providers: [provideNoopAnimations(), provideRouter([])],
    }).compileComponents();
    service = TestBed.inject(OralExamService);
    fixture = TestBed.createComponent(OralExamRunComponent);
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
  });

  it('startet automatisch einen Durchlauf, wenn keiner existiert', () => {
    expect(service.exam()).not.toBeNull();
  });

  it('zeigt die erste Frage mit genau fünf Antwortmöglichkeiten', () => {
    expect(element.querySelectorAll('mat-radio-button').length).toBe(5);
    expect(element.textContent).toContain('Frage 1 von 27');
    expect(element.querySelector('.role')?.textContent).toContain('Hauptfrage');
  });

  it('blockiert „Weiter“ bis die Frage beantwortet ist', () => {
    const buttons = [...element.querySelectorAll('button')];
    const next = buttons.find((b) => b.textContent?.includes('Weiter'))!;
    expect(next.disabled).toBe(true);

    fixture.componentInstance.select(service.exam()!.questions[0].options[0].id);
    fixture.detectChanges();
    expect(next.disabled).toBe(false);
  });

  it('wechselt zur nächsten Frage und wieder zurück', () => {
    const exam = service.exam()!;
    fixture.componentInstance.select(exam.questions[0].options[0].id);
    fixture.componentInstance.next();
    fixture.detectChanges();
    expect(element.textContent).toContain('Frage 2 von 27');
    expect(fixture.componentInstance.currentQuestion()?.role).toBe('FOLGEFRAGE_1');

    fixture.componentInstance.previous();
    fixture.detectChanges();
    expect(element.textContent).toContain('Frage 1 von 27');
  });

  it('bietet auf der letzten Frage „Prüfung abgeben“ erst bei Vollständigkeit an', () => {
    const exam = service.exam()!;
    for (const question of exam.questions) {
      service.answer(question.id, question.options[0].id);
    }
    fixture.componentInstance.index.set(26);
    fixture.detectChanges();

    expect(fixture.componentInstance.isLast()).toBe(true);
    expect(fixture.componentInstance.canSubmit()).toBe(true);
    const submit = [...element.querySelectorAll('button')].find((b) =>
      b.textContent?.includes('Prüfung abgeben'),
    );
    expect(submit).toBeTruthy();
    expect(submit?.disabled).toBe(false);
  });

  it('navigiert beim Abgeben zur Auswertung', () => {
    const exam = service.exam()!;
    for (const question of exam.questions) {
      service.answer(question.id, question.options[0].id);
    }
    fixture.componentInstance.index.set(26);
    const router = TestBed.inject(Router);
    const navigate = spyOn(router, 'navigate');
    fixture.componentInstance.submit();
    expect(navigate).toHaveBeenCalledWith(['/pruefungssimulation/auswertung']);
  });
});
