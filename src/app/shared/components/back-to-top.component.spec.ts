import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { BackToTopComponent, BACK_TO_TOP_THRESHOLD } from './back-to-top.component';

describe('BackToTopComponent', () => {
  let fixture: ComponentFixture<BackToTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackToTopComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();
    fixture = TestBed.createComponent(BackToTopComponent);
    fixture.detectChanges();
  });

  function setScrollY(value: number): void {
    Object.defineProperty(window, 'scrollY', { value, writable: true, configurable: true });
  }

  it('ist oben am Seitenanfang nicht sichtbar', () => {
    setScrollY(0);
    fixture.componentInstance.onWindowScroll();
    fixture.detectChanges();

    expect(fixture.componentInstance.visible()).toBe(false);
    expect((fixture.nativeElement as HTMLElement).querySelector('.back-to-top')).toBeNull();
  });

  it('wird nach der Schwelle sichtbar', () => {
    setScrollY(BACK_TO_TOP_THRESHOLD + 100);
    fixture.componentInstance.onWindowScroll();
    fixture.detectChanges();

    expect(fixture.componentInstance.visible()).toBe(true);
    const button = (fixture.nativeElement as HTMLElement).querySelector('.back-to-top');
    expect(button).toBeTruthy();
    expect(button?.getAttribute('aria-label')).toBe('Nach oben');
  });

  it('scrollt bei Klick nach oben', () => {
    const scrollTo = spyOn(window, 'scrollTo');
    fixture.componentInstance.scrollToTop();

    expect(scrollTo).toHaveBeenCalled();
    const options = scrollTo.calls.mostRecent().args[0] as ScrollToOptions;
    expect(options.top).toBe(0);
  });
});
