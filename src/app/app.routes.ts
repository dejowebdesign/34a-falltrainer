import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: '34a Falltrainer – Start',
  },
  {
    path: 'scenarios',
    loadComponent: () =>
      import('./features/scenarios/scenario-list.component').then((m) => m.ScenarioListComponent),
    title: '34a Falltrainer – Fälle',
  },
  {
    path: 'scenarios/:id',
    loadComponent: () =>
      import('./features/scenarios/scenario-detail.component').then((m) => m.ScenarioDetailComponent),
    title: '34a Falltrainer – Fall',
  },
  {
    path: 'scenarios/:id/stage/1',
    loadComponent: () =>
      import('./features/stage-one/stage-one.component').then((m) => m.StageOneComponent),
    title: '34a Falltrainer – Stufe 1',
  },
  {
    path: 'scenarios/:id/stage/2',
    loadComponent: () =>
      import('./features/stage-two/stage-two.component').then((m) => m.StageTwoComponent),
    title: '34a Falltrainer – Stufe 2',
  },
  {
    path: 'scenarios/:id/stage/3',
    loadComponent: () =>
      import('./features/stage-three/stage-three.component').then((m) => m.StageThreeComponent),
    title: '34a Falltrainer – Stufe 3',
  },
  {
    path: 'scenarios/:id/result',
    loadComponent: () => import('./features/result/result.component').then((m) => m.ResultComponent),
    title: '34a Falltrainer – Ergebnis',
  },
  { path: '**', redirectTo: '' },
];
