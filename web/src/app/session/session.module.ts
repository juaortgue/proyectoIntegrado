import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionRoutingModule } from './session-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../material-module';


import {MatIconModule} from '@angular/material/icon'; 
@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
  
    CommonModule,
    MaterialModule,
    SessionRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class SessionModule { }
