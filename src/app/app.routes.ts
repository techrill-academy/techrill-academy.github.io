import { Routes } from '@angular/router';
import { Overview } from './components/overview/overview';
import { CurriculumExplorer } from './components/curriculum-explorer/curriculum-explorer';
import { ModuleDetail } from './components/module-detail/module-detail';
import { ContentRoadmap } from './components/content-roadmap/content-roadmap';

export const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: Overview },
  { path: 'explorer', component: CurriculumExplorer },
  { path: 'module/:id', component: ModuleDetail },
  { path: 'roadmap', component: ContentRoadmap },
  { path: '**', redirectTo: '/overview' }
];
