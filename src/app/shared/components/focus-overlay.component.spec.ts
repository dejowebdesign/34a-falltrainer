import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { FocusOverlayComponent } from './focus-overlay.component';

describe('FocusOverlayComponent (Fokus-/Zoom-Ansicht)', () => {
  let fixture: ComponentFixture<FocusOverlayComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FocusOverlayComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();
    fixture = TestBed.createComponent(FocusOverlayComponent);
    fixture.componentRef.setInput('heading', 'Sachverhalt');
    fixture.componentRef.setInput('ariaLabel', 'Sachverhalt in Fokusansicht');
    fixture.detectChanges();
    element = fixture.nativeElement as HTMLElement;
  });

  it('rendert einen modalen Dialog mit Fokus-Falle', () => {
    const panel = element.querySelector('.ft-focus-panel')!;
    expect(panel).toBeTruthy();
    expect(panel.getAttribute('role')).toBe('dialog');
    expect(panel.getAttribute('aria-modal')).toBe('true');
    expect(panel.getAttribute('aria-label')).toBe('Sachverhalt in Fokusansicht');
    expect(panel.hasAttribute('cdktrapfocus')).toBe(true);
  });

  it('zeigt Überschrift und Schließen-Schaltfläche', () => {
    expect(element.querySelector('.ft-focus-head h2')?.textContent).toContain('Sachverhalt');
    const close = element.querySelector('.ft-focus-close')!;
    expect(close.getAttribute('aria-label')).toBe('Fokusansicht schließen');
  });

  it('schließt bei Klick auf den Hintergrund', () => {
    const closed = jasmine.createSpy('close');
    fixture.componentInstance.close.subscribe(closed);
    element.querySelector<HTMLElement>('.ft-focus-overlay')!.click();
    expect(closed).toHaveBeenCalled();
  });

  it('schließt nicht bei Klick in die Karte (Propagation gestoppt)', () => {
    const closed = jasmine.createSpy('close');
    fixture.componentInstance.close.subscribe(closed);
    element.querySelector<HTMLElement>('.ft-focus-panel')!.click();
    expect(closed).not.toHaveBeenCalled();
  });

  it('schließt mit der Escape-Taste', () => {
    const closed = jasmine.createSpy('close');
    fixture.componentInstance.close.subscribe(closed);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(closed).toHaveBeenCalled();
  });

  it('schließt über die Schließen-Schaltfläche', () => {
    const closed = jasmine.createSpy('close');
    fixture.componentInstance.close.subscribe(closed);
    element.querySelector<HTMLButtonElement>('.ft-focus-close')!.click();
    expect(closed).toHaveBeenCalled();
  });
});
