import { Routes } from '@angular/router';
import { Landing } from './components/landing/landing';
import { Overview } from './components/overview/overview';
import { CurriculumExplorer } from './components/curriculum-explorer/curriculum-explorer';
import { ModuleDetail } from './components/module-detail/module-detail';
import { ContentRoadmap } from './components/content-roadmap/content-roadmap';
import { AdvancedSecurity } from './components/advanced-security/advanced-security';

export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: Landing },
  { path: 'overview', component: Overview },
  { path: 'copilot', component: CurriculumExplorer },
  { path: 'module/:id', component: ModuleDetail },
  { path: 'roadmap', component: ContentRoadmap },
  { path: 'advanced-security', component: AdvancedSecurity },
  { path: '**', redirectTo: '/landing' }
];
