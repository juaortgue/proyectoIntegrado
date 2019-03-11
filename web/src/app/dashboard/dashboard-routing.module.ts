import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { UserComponent } from './user/user.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'user',
      component: UserComponent
    }
  ]
  }
];

/*@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})*/
export class DashboardRoutingModule { }
