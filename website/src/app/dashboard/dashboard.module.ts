import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatCardModule, MatButtonModule, MatListModule, MatProgressBarModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { TrainingComponent } from './training/training.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { GymsComponent } from './gyms/gyms.component';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { CategoryComponent } from './category/category.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [ DashboardComponent, TrainingComponent, ExercisesComponent, GymsComponent, CategoryComponent ]
})

export class DashboardModule {}
