import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { OralExamRunComponent } from './oral-exam-run.component';
import { OralExamService } from '../../core/services/oral-exam.service';
import { ORAL_EXAM_DURATION_SECONDS, formatExamClock } from '../../core/models';

describe('OralExamRunComponent', () => {
  let fixture: ComponentFixture<OralExamRunComponent>;
  let element: HTMLElement;
  let service: OralExamService;

  beforeEach(async () => {
    window.sessionStorage.clear();
    await TestBed.configureTestingModule({
      imports: [OralExamRunComponent],
      providers: [provideNoopAnimations(), provideRouter([])],
    }).compileComponents();
    service = TestBed.inject(OralExamService);
    fixture = TestBed.createComponent(OralExamRunComponent);
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => {
    service.reset();
    window.sessionStorage.clear();
  });

  it('startet automatisch einen Durchlauf, wenn keiner existiert', () => {
    expect(service.exam()).not.toBeNull();
  });

  it('zeigt die erste Frage mit genau fünf Antwortmöglichkeiten', () => {
    expect(element.querySelectorAll('mat-radio-button').length).toBe(5);
    expect(element.textContent).toContain('Frage 1 von 27');
    expect(element.querySelector('.meta-role')?.textContent).toContain('Hauptfrage');
    expect(element.querySelector('.meta-difficulty')?.textContent).toContain('Schwierigkeit');
    expect(element.querySelector('.meta-topic')?.textContent?.trim().length).toBeGreaterThan(0);
  });

  it('zeigt den Timer oben rechts mit 15:00 und ohne redundante Fortschrittszeile', () => {
    expect(element.querySelector('.exam-timer')).toBeTruthy();
    expect(element.querySelector('.exam-timer .timer-value')?.textContent).toContain('15:00');
    expect(element.textContent).not.toContain('Fragen beantwortet');
    expect(element.querySelector('.answered')).toBeNull();
    expect(element.textContent).toContain('Themengebiet 1 von 9');
    expect(element.querySelector('mat-progress-bar')).toBeTruthy();
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

  it('setzt den Timer bei der Navigation nicht zurück', () => {
    const exam = service.exam()!;
    const session = service.session()!;
    service.reset();
    window.sessionStorage.setItem(
      'ft.oral-exam.session.v1',
      JSON.stringify({ ...session, startedAt: Date.now() - 120_000 }),
    );
    service.restoreSession();
    fixture.detectChanges();

    const before = service.remainingSeconds();
    expect(before).toBeLessThan(ORAL_EXAM_DURATION_SECONDS);

    fixture.componentInstance.select(exam.questions[0].options[0].id);
    fixture.componentInstance.next();
    fixture.detectChanges();

    expect(service.remainingSeconds()).toBeLessThanOrEqual(before);
    expect(service.remainingSeconds()).not.toBe(ORAL_EXAM_DURATION_SECONDS);
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

  it('sperrt nach Zeitablauf Auswahl und Navigation', () => {
    const exam = service.exam()!;
    service.finish(Date.now(), true);
    fixture.detectChanges();

    expect(fixture.componentInstance.isLocked()).toBe(true);
    expect(element.querySelector('.timeout-note')?.textContent).toContain('Zeitablauf');

    const countBefore = service.answeredCount();
    fixture.componentInstance.select(exam.questions[0].options[0].id);
    expect(service.answeredCount()).toBe(countBefore);

    fixture.componentInstance.next();
    expect(fixture.componentInstance.index()).toBe(0);

    const navButtons = [...element.querySelectorAll('.run-actions button')] as HTMLButtonElement[];
    expect(navButtons.length).toBeGreaterThan(0);
    expect(navButtons.every((button) => button.disabled)).toBe(true);
  });

  it('zeigt die Warnstufe des Timers', () => {
    const timer = () => element.querySelector('.exam-timer')!;
    expect(timer().classList.contains('warning')).toBe(false);

    // Restzeit knapp unter 2 Minuten → Warnstufe.
    const session = service.session()!;
    service.reset();
    window.sessionStorage.setItem(
      'ft.oral-exam.session.v1',
      JSON.stringify({
        ...session,
        startedAt: Date.now() - (ORAL_EXAM_DURATION_SECONDS - 100) * 1000,
      }),
    );
    service.restoreSession();
    fixture.detectChanges();
    expect(timer().classList.contains('warning')).toBe(true);
    expect(timer().querySelector('.timer-value')?.textContent).toBe(
      formatExamClock(service.remainingSeconds()),
    );
  });
});
