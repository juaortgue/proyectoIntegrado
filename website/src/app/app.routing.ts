import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';

export const AppRoutes: Routes = [
  
  //{path: '', redirectTo: 'signin', pathMatch: 'full'},
  {path: '', redirectTo: 'signin', pathMatch: 'full'},
  
  {
  path: '',
  component: AdminLayoutComponent,
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }]
  }, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: '',
    loadChildren: './session/session.module#SessionModule'
  }]
  }, {
  path: '**',
  redirectTo: 'session/404'
}];

