import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [{
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
},
{
  path: '',
  children: [{
    path: '',
    loadChildren: './session/session.module#SessionModule'
  }]
}
/*,
{
  path: '',
  canActivate: [AuthGuard],
  children: [{
    path: 'home',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }]
},*/
/*{
  path: '**',
  redirectTo: '404'
}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
