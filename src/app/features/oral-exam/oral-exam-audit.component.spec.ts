import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { OralExamAuditComponent } from './oral-exam-audit.component';
import { ORAL_EXAM_POOL } from '../../core/data/oral-exam-authored.data';

describe('OralExamAuditComponent', () => {
  let fixture: ComponentFixture<OralExamAuditComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OralExamAuditComponent],
      providers: [provideNoopAnimations(), provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(OralExamAuditComponent);
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
  });

  it('kennzeichnet die Hauptfrage als Fragen.txt-Quelle', () => {
    expect(element.textContent).toContain('Fragen.txt');
    expect(element.textContent).toContain('verifiziert (Fragen.txt)');
  });

  it('kennzeichnet Folgefragen aus Bibel und Fachwissen', () => {
    const text = element.textContent ?? '';
    expect(text).toContain('34a-Bibel');
    expect(text).toContain('verifiziert (Bibel)');
    expect(text).toContain('Fachwissen');
    expect(text).toContain('unverifiziert');
  });

  it('zählt Folgefragen aus Bibel und Fachwissen korrekt', () => {
    const followUps = ORAL_EXAM_POOL.flatMap((entry) => [entry.followUp1, entry.followUp2]);
    const fromBibel = followUps.filter((f) => f.source === 'AUTHORED_FROM_BIBEL').length;
    const fromFachwissen = followUps.filter(
      (f) => f.source === 'AUTHORED_FROM_FACHWISSEN',
    ).length;
    expect(fixture.componentInstance.fromBibel).toBe(fromBibel);
    expect(fixture.componentInstance.fromFachwissen).toBe(fromFachwissen);
    expect(fromBibel + fromFachwissen).toBe(ORAL_EXAM_POOL.length * 2);
  });

  it('meldet die fehlende Rechtslehre als Auffälligkeit', () => {
    const flagged = fixture.componentInstance.flagged;
    expect(flagged.some((q) => q.id === 'fragen-244')).toBe(true);
  });

  it('listet doppelt vorkommende Fragen der Bank', () => {
    const questions = fixture.componentInstance.duplicates.map((d) => d.question);
    expect(questions).toContain('Was ist Hausrecht?');
    expect(questions).toContain('Was ist Widerstandszeit?');
  });

  it('zeigt einen Audit-Eintrag je Prüfungsblock', () => {
    expect(element.querySelectorAll('mat-expansion-panel').length).toBe(ORAL_EXAM_POOL.length);
  });
});
