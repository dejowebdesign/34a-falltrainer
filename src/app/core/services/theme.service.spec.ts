import { ThemeService } from './theme.service';

const STORAGE_KEY = 'ft-theme';

function stubPrefersDark(matches: boolean): void {
  spyOn(window, 'matchMedia').and.returnValue({ matches } as MediaQueryList);
}

describe('ThemeService', () => {
  beforeEach(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    document.documentElement.classList.remove('light', 'dark');
  });

  afterEach(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    document.documentElement.classList.remove('light', 'dark');
  });

  it('verwendet standardmäßig den hellen Modus ohne gespeicherte Einstellung', () => {
    stubPrefersDark(false);
    const service = new ThemeService();

    expect(service.theme()).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('berücksichtigt prefers-color-scheme: dark, wenn nichts gespeichert ist', () => {
    stubPrefersDark(true);
    const service = new ThemeService();

    expect(service.theme()).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('kann den dunklen Modus aktivieren und speichert ihn', () => {
    stubPrefersDark(false);
    const service = new ThemeService();

    service.set('dark');

    expect(service.theme()).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('dark');
  });

  it('kann zurück in den hellen Modus wechseln und speichert ihn', () => {
    stubPrefersDark(true);
    const service = new ThemeService();

    service.set('light');

    expect(service.theme()).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('light');
  });

  it('wechselt per toggle zwischen dark und light', () => {
    stubPrefersDark(false);
    const service = new ThemeService();

    service.toggle();
    expect(service.theme()).toBe('dark');
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('dark');

    service.toggle();
    expect(service.theme()).toBe('light');
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('light');
  });

  it('stellt die gespeicherte Einstellung beim erneuten Laden wieder her', () => {
    stubPrefersDark(false);
    window.localStorage.setItem(STORAGE_KEY, 'dark');

    const service = new ThemeService();

    expect(service.theme()).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('hat Vorrang vor prefers-color-scheme, wenn eine Einstellung gespeichert ist', () => {
    stubPrefersDark(true);
    window.localStorage.setItem(STORAGE_KEY, 'light');

    const service = new ThemeService();

    expect(service.theme()).toBe('light');
  });
});
