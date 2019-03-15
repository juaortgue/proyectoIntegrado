import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GymService } from 'src/app/services/gym.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, forkJoin } from 'rxjs';

import { GymCreateDto } from 'src/app/dto/gym-create.dto';
import { CityResponse } from 'src/app/interfaces/city-response.js';
import { GeoService } from 'src/app/services/geo.service';
import { UploadService } from 'src/app/services/upload.service';
import { TrainingService } from '../../services/training.service';
@Component({
  selector: 'app-create-training-dialog',
  templateUrl: './create-training-dialog.component.html',
  styleUrls: ['./create-training-dialog.component.scss']
})
export class CreateTrainingDialogComponent implements OnInit {
  form: FormGroup;
  targets:string[] = ['Lost weight', 'Keep in weight', 'Gaining muscle'];
  constructor(private uploadService:UploadService,private snackBar: MatSnackBar, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  private trainingService: TrainingService, public dialogRef: MatDialogRef<CreateTrainingDialogComponent>) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
       const newForm: FormGroup = this.fb.group ({
       name: [null, Validators.compose ([ Validators.required ])],
       target: [null, Validators.compose ([ Validators.required ])],
       time: [null, Validators.compose ([ Validators.required ])],
       description: [null, Validators.compose ([ Validators.required ])],
       picture: [null, Validators.compose ([ Validators.required ])],
       exercises: [null, Validators.compose ([ Validators.required ])]
      });
     this.form = newForm;
   }
   
}
