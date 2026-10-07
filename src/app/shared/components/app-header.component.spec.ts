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
    const stgbLink = host.querySelector('a[href="/strafgesetzbuch"]');
    expect(stgbLink).toBeTruthy();
    expect(stgbLink?.textContent?.trim()).toBe('Strafgesetzbuch');
    const bgbLink = host.querySelector('a[href="/bgb"]');
    expect(bgbLink).toBeTruthy();
    expect(bgbLink?.textContent?.trim()).toBe('BGB');
    const jedermannLink = host.querySelector('a[href="/jedermannsrechte"]');
    expect(jedermannLink).toBeTruthy();
    expect(jedermannLink?.textContent?.trim()).toBe('Jedermannsrechte');
  });

  it('hat ein aria-label am Theme-Toggle', () => {
    const toggle = (fixture.nativeElement as HTMLElement).querySelector('.theme-toggle');
    expect(toggle?.getAttribute('aria-label')?.length).toBeGreaterThan(0);
  });

  it('bietet einen Hamburger-Button mit ARIA-Attributen', () => {
    const host = fixture.nativeElement as HTMLElement;
    const menu = host.querySelector<HTMLButtonElement>('.menu-toggle');
    expect(menu).toBeTruthy();
    expect(menu?.getAttribute('aria-label')).toBe('Menü öffnen');
    expect(menu?.getAttribute('aria-expanded')).toBe('false');
    expect(menu?.getAttribute('aria-controls')).toBe('mobile-nav-panel');
    const panel = host.querySelector('#mobile-nav-panel');
    expect(panel).toBeTruthy();
  });

  it('öffnet und schließt das mobile Menü', () => {
    const host = fixture.nativeElement as HTMLElement;
    const menu = host.querySelector<HTMLButtonElement>('.menu-toggle')!;
    menu.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.menuOpen()).toBe(true);
    expect(host.querySelector('.mobile-menu')?.classList).toContain('open');
    expect(menu.getAttribute('aria-expanded')).toBe('true');

    fixture.componentInstance.closeMenu();
    fixture.detectChanges();
    expect(fixture.componentInstance.menuOpen()).toBe(false);
    expect(host.querySelector('.mobile-menu')?.classList).not.toContain('open');
    expect(menu.getAttribute('aria-expanded')).toBe('false');
  });

  it('schließt das mobile Menü per ESC', () => {
    fixture.componentInstance.openMenu();
    fixture.detectChanges();
    expect(fixture.componentInstance.menuOpen()).toBe(true);
    fixture.componentInstance.onEscape();
    fixture.detectChanges();
    expect(fixture.componentInstance.menuOpen()).toBe(false);
  });

  it('enthält dieselben Navigationsziele im mobilen Menü', () => {
    const panel = (fixture.nativeElement as HTMLElement).querySelector('#mobile-nav-panel');
    const hrefs = Array.from(panel?.querySelectorAll('a') ?? []).map((a) =>
      a.getAttribute('href'),
    );
    expect(hrefs).toContain('/');
    expect(hrefs).toContain('/scenarios');
    expect(hrefs).toContain('/strafgesetzbuch');
    expect(hrefs).toContain('/pruefungssimulation');
  });
});
