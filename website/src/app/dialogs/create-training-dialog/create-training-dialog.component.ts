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
import { TrainingCreateDto } from '../../dto/training-create.dto';
import { ExerciseResponse } from '../../interfaces/exercise-response';
import { ExerciseService } from 'src/app/services/exercise.service';
@Component({
  selector: 'app-create-training-dialog',
  templateUrl: './create-training-dialog.component.html',
  styleUrls: ['./create-training-dialog.component.scss']
})
export class CreateTrainingDialogComponent implements OnInit {
  form: FormGroup;
  targets:string[] = ['Lost weight', 'Keep in weight', 'Gaining muscle'];
  constructor(private uploadService:UploadService,private snackBar: MatSnackBar, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  private trainingService: TrainingService, private exerciseService: ExerciseService,public dialogRef: MatDialogRef<CreateTrainingDialogComponent>) { }
  exercises:ExerciseResponse[];
  ngOnInit() {
    this.createForm();
  }
  createForm() {
       const newForm: FormGroup = this.fb.group ({
       name: [null, Validators.compose ([ Validators.required ])],
       target: [null, Validators.compose ([ Validators.required ])],
       time: [null, Validators.compose ([ Validators.required, Validators.min(1) ])],
       description: [null, Validators.compose ([ Validators.required ])],
       exercises: [null, Validators.compose ([ Validators.required ])],
       level: [null, Validators.compose ([ Validators.required, Validators.min(1), Validators.max(5), Validators.maxLength(5) ])],

      });
     this.form = newForm;
     this.getAllExercises();
   }
   onSubmit() {
    
      const newTraining :TrainingCreateDto = <TrainingCreateDto>this.form.value;
      //SOLUCION TEMPORAL FOTO

      newTraining.picture = 'https://s.imgur.com/images/logo-1200-630.jpg?2';
      console.log('NUEVO ENTRENAMIENTO')
      console.log(newTraining)
      this.trainingService.create(newTraining).subscribe(r => this.dialogRef.close('confirm'),
      e => this.snackBar.open('Failed to create.', 'Close', {duration: 3000}));
    
  }
  getAllExercises() {
    this.exerciseService.getAll().subscribe(list => {
      this.exercises=list.rows;
    }, error => {
      this.snackBar.open('Error obtaining training', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    });
  }
   
}
