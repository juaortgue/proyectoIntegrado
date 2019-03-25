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
import { TrainingPhotoCreateDto } from 'src/app/dto/training-photo-dto';
import { UploadTrainingService } from '../../services/upload-training.service';
@Component({
  selector: 'app-create-training-dialog',
  templateUrl: './create-training-dialog.component.html',
  styleUrls: ['./create-training-dialog.component.scss']
})
export class CreateTrainingDialogComponent implements OnInit {
  form: FormGroup;
  targets:string[] = ['Lost weight', 'Keep in weight', 'Gaining muscle'];
  constructor(private uploadService:UploadTrainingService,private snackBar: MatSnackBar, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  private trainingService: TrainingService, private exerciseService: ExerciseService,public dialogRef: MatDialogRef<CreateTrainingDialogComponent>) { }
  exercises:ExerciseResponse[];
  @ViewChild('file') file;
  progress;
  canBeClosed = true;
  primaryButtonText = 'Subir';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  public files: Set<File> = new Set();
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
       picture: [null, Validators.compose ([ Validators.required ])]

      });
     this.form = newForm;
     this.getAllExercises();
   }
   onSubmit() {
    
      const newTraining :TrainingCreateDto = <TrainingCreateDto>this.form.value;
      //SOLUCION TEMPORAL FOTO

      //newTraining.picture = 'https://s.imgur.com/images/logo-1200-630.jpg?2';
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
  //foto

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    this.files = new Set();
    for (const key in files) {
      if (!isNaN(parseInt(key, 10))) {
        this.files.add(files[key]);
      }
    }
  }
  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close('confirm');

      /*this.trainingService.create(newTraining).subscribe(r => this.dialogRef.close('confirm'),
      e => this.snackBar.open('Failed to create.', 'Close', {duration: 3000}));*/
    }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    const newTraining :TrainingPhotoCreateDto = <TrainingPhotoCreateDto>this.form.value;
    
    this.progress = this.uploadService.upload(this.files, newTraining);
    // tslint:disable-next-line:forin
    for (const key in this.progress) {
      this.progress[key].progress.subscribe(val => console.log(val));
    }

    // convert the progress map into an array
    const allProgressObservables = [];
    // tslint:disable-next-line:forin
    for (const key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finalizar';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;

    });
  }
  //foto

   
}
