import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TrainingService } from 'src/app/services/training.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { ExerciseResponse } from 'src/app/interfaces/exercise-response';
import { TrainingCreateDto } from 'src/app/dto/training-create.dto';
import { TrainingOneResponse } from 'src/app/interfaces/training-one-response';
import { TrainingPhotoCreateDto } from '../../dto/training-photo-dto';
import { UploadTrainingService } from '../../services/upload-training.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-training-dialog',
  templateUrl: './edit-training-dialog.component.html',
  styleUrls: ['./edit-training-dialog.component.scss']
})
export class EditTrainingDialogComponent implements OnInit {
  @ViewChild('file') file;
  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  public files: Set<File> = new Set();
  form: FormGroup;
  targets:string[] = ['Lost weight', 'Keep in weight', 'Gaining muscle'];
  constructor(private uploadService: UploadTrainingService,private snackBar: MatSnackBar, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  private trainingService: TrainingService, private exerciseService: ExerciseService,public dialogRef: MatDialogRef<EditTrainingDialogComponent>) { }
  exercises:ExerciseResponse[];
  training: TrainingOneResponse;
  selected=false
  optionSelected:string[]=[];
  myExercises:ExerciseResponse[];
  t =['5c8dfa0562274718e10cdac1', '5c8c13baf51ba626edb5a2e8'];
    
  ngOnInit() {
    console.log(this.data.training.id)
    this.getOneTraining();
    this.createFormEmpty();


  
  }
  createFormEmpty() {
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
     
   }
  
   createFormFilled() {
    const newForm: FormGroup = this.fb.group ({
    name: [this.training.name, Validators.compose ([ Validators.required ])],
    target: [this.training.target, Validators.compose ([ Validators.required ])],
    time: [this.training.time, Validators.compose ([ Validators.required, Validators.min(1) ])],
    description: [this.training.description, Validators.compose ([ Validators.required ])],
    exercises: [null, Validators.compose ([ Validators.required ])],
    level: [this.training.level, Validators.compose ([ Validators.required, Validators.min(1), Validators.max(5), Validators.maxLength(5) ])],
    picture: [null, Validators.compose ([ Validators.required ])]

   });
  this.form = newForm;
  
}
   onSubmit() {
    
      const editTraining :TrainingCreateDto = <TrainingCreateDto>this.form.value;
      //SOLUCION TEMPORAL FOTO

     // editTraining.picture = 'https://s.imgur.com/images/logo-1200-630.jpg?2';
      
      this.trainingService.update(this.data.training.id, editTraining).subscribe(r => this.dialogRef.close('confirm'),
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
  getOneTraining() {
    this.trainingService.getOne(this.data.training.id).subscribe(one => {
      this.training=one;
      this.exercises = this.training.exercises;
      
      this.getAllExercises();
      this.createFormFilled();
      
      
      
    }, error => {
      this.snackBar.open('Error obtaining training', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    });
  }
  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    this.files = new Set();
    for (const key in files) {
      if (!isNaN(parseInt(key, 10))) {
        this.files.add(files[key]);
      }
    }
  }
  checkExercisesSelect(){
    let result=true;
    let exerciseList :string[] = this.form.controls['exercises'].value;
    if(exerciseList.length<=0){
      result=false;
    }
    return result;
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
    this.progress = this.uploadService.editWithPhoto(this.files, newTraining, this.data.training.id);
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
