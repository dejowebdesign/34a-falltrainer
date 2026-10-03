import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { OralExamEvaluationComponent } from './oral-exam-evaluation.component';
import { OralExamService } from '../../core/services/oral-exam.service';
import { ExamQuestion } from '../../core/models';

describe('OralExamEvaluationComponent', () => {
  let fixture: ComponentFixture<OralExamEvaluationComponent>;
  let element: HTMLElement;
  let service: OralExamService;

  function answerAll(correct: boolean): void {
    const exam = service.exam()!;
    for (const question of exam.questions) {
      const option = correct
        ? question.options.find((o) => o.correct)!
        : question.options.find((o) => !o.correct)!;
      service.answer(question.id, option.id);
    }
  }

  async function create(): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [OralExamEvaluationComponent],
      providers: [provideNoopAnimations(), provideRouter([])],
    }).compileComponents();
    service = TestBed.inject(OralExamService);
    service.start();
    fixture = TestBed.createComponent(OralExamEvaluationComponent);
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
  }

  it('zeigt BESTANDEN mit 27/27 Punkten und 100 %', async () => {
    await create();
    answerAll(true);
    fixture.detectChanges();
    const text = element.textContent ?? '';
    expect(text).toContain('BESTANDEN');
    expect(text).toContain('27 / 27');
    expect(text).toContain('100 %');
  });

  it('zeigt NICHT BESTANDEN bei 0 Punkten', async () => {
    await create();
    answerAll(false);
    fixture.detectChanges();
    const text = element.textContent ?? '';
    expect(text).toContain('NICHT BESTANDEN');
    expect(text).toContain('0 / 27');
  });

  it('listet neun anklickbare Themengebiete mit Punktestand', async () => {
    await create();
    const panels = element.querySelectorAll('mat-expansion-panel');
    expect(panels.length).toBe(9);
    expect(element.textContent).toContain('0 / 3 richtig');
  });

  it('zeigt in der Detailansicht die gestellte Frage, Antwort und richtige Antwort', async () => {
    await create();
    answerAll(false);
    fixture.detectChanges();
    // Erste Frage falsch beantwortet → richtige Antwort wird angezeigt.
    expect(element.textContent).toContain('Ihre Antwort:');
    expect(element.textContent).toContain('Richtige Antwort:');
    expect(element.textContent).toContain('falsch');
  });

  it('zeigt bei richtigen Antworten keine „Richtige Antwort“-Zeile', async () => {
    await create();
    answerAll(true);
    fixture.detectChanges();
    expect(element.textContent).not.toContain('Richtige Antwort:');
    expect(element.textContent).toContain('richtig');
  });

  it('blendet technische Quellkennzeichnungen aus', async () => {
    await create();
    answerAll(true);
    fixture.detectChanges();
    const text = element.textContent ?? '';
    expect(text).not.toContain('UNVERIFIED');
    expect(text).not.toContain('AUTHORED_FROM');
    expect(text).not.toContain('QUESTIONS_TXT');
  });

  it('startet eine neue Prüfung beim Klick auf „Neue Prüfung starten“', async () => {
    await create();
    answerAll(true);
    fixture.detectChanges();
    const before = service.exam()!.id;
    fixture.componentInstance.restart();
    expect(service.answeredCount()).toBe(0);
    expect(service.exam()).not.toBeNull();
    expect(service.exam()!.questions.length).toBe(27);
    expect(service.exam()!.id).not.toBe(before);
  });

  it('zeigt Erklärungen nur, wenn vorhanden', async () => {
    await create();
    answerAll(true);
    fixture.detectChanges();
    const questionsWithExplanation = service
      .exam()!
      .questions.filter((q: ExamQuestion) => !!q.explanation).length;
    // Es gibt Fragen mit Erklärung im Pool (aus der Bibel abgeleitet).
    expect(questionsWithExplanation).toBeGreaterThan(0);
    expect(element.querySelectorAll('.q-explanation').length).toBeGreaterThan(0);
  });
});
