import { Routes } from '@angular/router';

import { Birthday } from './pages/birthday/birthday';
import { Admin } from './pages/admin/admin';

export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'birthday/fatou'
  },

  {
    path: 'admin',
    component: Admin
  },

  {
    path: 'birthday/:slug',
    component: Birthday
  }

];