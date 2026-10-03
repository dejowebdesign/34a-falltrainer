import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AppHeaderComponent, HEADER_SCROLL_THRESHOLD } from './app-header.component';
import { ThemeService } from '../../core/services/theme.service';

describe('AppHeaderComponent', () => {
  let fixture: ComponentFixture<AppHeaderComponent>;

  beforeEach(async () => {
    window.localStorage.removeItem('ft-theme');
    await TestBed.configureTestingModule({
      imports: [AppHeaderComponent],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();
    fixture = TestBed.createComponent(AppHeaderComponent);
    fixture.detectChanges();
  });

  function setScrollY(value: number): void {
    Object.defineProperty(window, 'scrollY', { value, writable: true, configurable: true });
  }

  it('zeigt oben keinen Milchglas-Zustand', () => {
    setScrollY(0);
    fixture.componentInstance.onWindowScroll();
    fixture.detectChanges();

    expect(fixture.componentInstance.isScrolled()).toBe(false);
    expect((fixture.nativeElement as HTMLElement).querySelector('.app-toolbar')?.classList)
      .not.toContain('glass');
  });

  it('aktiviert den Milchglas-Zustand beim Scrollen', () => {
    setScrollY(HEADER_SCROLL_THRESHOLD + 50);
    fixture.componentInstance.onWindowScroll();
    fixture.detectChanges();

    expect(fixture.componentInstance.isScrolled()).toBe(true);
    expect((fixture.nativeElement as HTMLElement).querySelector('.app-toolbar')?.classList)
      .toContain('glass');
  });

  it('behält Theme-Toggle, Branding und Navigation', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('.theme-toggle')).toBeTruthy();
    expect(host.textContent).toContain('34a Falltrainer');
    const navLink = host.querySelector('a[href="/scenarios"]');
    expect(navLink).toBeTruthy();
    expect(navLink?.textContent?.trim()).toBe('Fallbeispiele');
    const examLink = host.querySelector('a[href="/pruefungssimulation"]');
    expect(examLink).toBeTruthy();
    expect(examLink?.textContent?.trim()).toBe('Prüfungssimulation');
  });

  it('hat ein aria-label am Theme-Toggle', () => {
    const toggle = (fixture.nativeElement as HTMLElement).querySelector('.theme-toggle');
    expect(toggle?.getAttribute('aria-label')?.length).toBeGreaterThan(0);
  });
});
