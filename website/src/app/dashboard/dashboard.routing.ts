import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { TrainingComponent } from './training/training.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { GymsComponent } from './gyms/gyms.component';

export const DashboardRoutes: Routes = [{
  path: 'dashboard',
  component: DashboardComponent
},
{
  path: 'training',
  component: TrainingComponent
},
{
  path: 'exercises',
  component: ExercisesComponent
},
{
  path: 'gyms',
  component: GymsComponent
}/*,
{
  path: 'usuario',
  component: ListausuarioComponent
}, {
  path: 'miperfil',
  component: MiPerfilComponent
}, {
  path: 'categoria',
  component: ListaCategoriaComponent
}, {
  path: 'supercategoria',
  component: SupercategoriaComponent
}*/];
