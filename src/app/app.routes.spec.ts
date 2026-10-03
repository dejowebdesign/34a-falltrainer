import { routes } from './app.routes';

describe('App-Routen', () => {
  const paths = routes.map((route) => route.path);

  it('enthält die geforderten Routen', () => {
    expect(paths).toContain('');
    expect(paths).toContain('scenarios');
    expect(paths).toContain('scenarios/:id');
    expect(paths).toContain('scenarios/:id/stage/1');
    expect(paths).toContain('scenarios/:id/stage/2');
    expect(paths).toContain('scenarios/:id/stage/3');
    expect(paths).toContain('scenarios/:id/result');
  });

  it('enthält die Prüfungssimulations-Routen', () => {
    expect(paths).toContain('pruefungssimulation');
    expect(paths).toContain('pruefungssimulation/durchfuehrung');
    expect(paths).toContain('pruefungssimulation/auswertung');
    expect(paths).toContain('pruefungssimulation/audit');
  });

  it('hat für jede Route einen Lazy-Loader', () => {
    for (const route of routes.filter((entry) => entry.path !== '**')) {
      expect(route.loadComponent).withContext(route.path ?? '').toBeDefined();
    }
  });

  it('leitet unbekannte Pfade auf die Startseite um', () => {
    const wildcard = routes.find((route) => route.path === '**');
    expect(wildcard?.redirectTo).toBe('');
  });
});
