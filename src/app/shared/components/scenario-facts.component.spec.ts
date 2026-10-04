import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ScenarioFactsComponent } from './scenario-facts.component';
import { ScenarioService } from '../../core/services/scenario.service';

describe('ScenarioFactsComponent (Sachverhalt ein-/ausblenden + Fokus)', () => {
  let fixture: ComponentFixture<ScenarioFactsComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioFactsComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();
    const scenario = TestBed.inject(ScenarioService).getScenarios()[0];
    fixture = TestBed.createComponent(ScenarioFactsComponent);
    fixture.componentRef.setInput('scenario', scenario);
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
  });

  it('zeigt den Sachverhalt zunächst nicht an', () => {
    expect(fixture.componentInstance.showCase()).toBe(false);
    expect(element.querySelector('.case-text')).toBeNull();
    expect(element.querySelector('.case-toggle')?.textContent).toContain('Sachverhalt anzeigen');
    expect(element.querySelector('.case-toggle')?.getAttribute('aria-expanded')).toBe('false');
  });

  it('blendet den vollständigen Sachverhalt ein und wieder aus', () => {
    const scenario = fixture.componentInstance.scenario();
    fixture.componentInstance.toggleCase();
    fixture.detectChanges();
    expect(fixture.componentInstance.showCase()).toBe(true);
    const text = element.querySelector('.case-text')!;
    expect(text.textContent).toBe(scenario.originalCaseText);
    expect(element.querySelector('.case-toggle')?.textContent).toContain('Sachverhalt ausblenden');

    fixture.componentInstance.toggleCase();
    fixture.detectChanges();
    expect(element.querySelector('.case-text')).toBeNull();
  });

  it('öffnet die Fokusansicht mit dem vollständigen Sachverhalt', () => {
    const scenario = fixture.componentInstance.scenario();
    fixture.componentInstance.openFocus();
    fixture.detectChanges();
    const overlay = element.querySelector('app-focus-overlay');
    expect(overlay).toBeTruthy();
    expect(overlay?.querySelector('.focus-case-text')?.textContent).toBe(scenario.originalCaseText);
  });

  it('gibt den Fokus nach dem Schließen an den Auslöser zurück', () => {
    fixture.componentInstance.openFocus();
    fixture.detectChanges();
    const toggle = element.querySelector<HTMLButtonElement>('.case-toggle')!;
    fixture.componentInstance.closeFocus();
    fixture.detectChanges();
    expect(fixture.componentInstance.focusOpen()).toBe(false);
    expect(document.activeElement).toBe(toggle);
  });

  it('listet alle Tatsachen und markiert rechtlich relevante Umstände', () => {
    const scenario = fixture.componentInstance.scenario();
    const items = element.querySelectorAll('.facts li');
    expect(items.length).toBe(scenario.facts.length);
    const relevantCount = scenario.facts.filter((fact) => fact.legallyRelevant).length;
    expect(element.querySelectorAll('.facts li.relevant').length).toBe(relevantCount);
  });
});
