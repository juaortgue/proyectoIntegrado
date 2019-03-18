import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';

import { ExerciseService } from 'src/app/services/exercise.service';
import { ExerciseCreateDto } from 'src/app/dto/exercise-create.dto';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryResponse } from 'src/app/interfaces/category-response';
import { ExercisePhotoDto } from '../../dto/exercise-photo-dto';
import { UploadExerciseService } from 'src/app/services/upload-exercise.service';
@Component({
  selector: 'app-create-exercise-dialog',
  templateUrl: './create-exercise-dialog.component.html',
  styleUrls: ['./create-exercise-dialog.component.scss']
})
export class CreateExerciseDialogComponent implements OnInit {
  @ViewChild('file') file;
  progress;
  canBeClosed = true;
  primaryButtonText = 'Subir';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  form: FormGroup;
  categories:CategoryResponse[];
  public files: Set<File> = new Set();

  constructor(public uploadExerciseService:UploadExerciseService,private snackBar: MatSnackBar, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  private exerciseService: ExerciseService,public dialogRef: MatDialogRef<CreateExerciseDialogComponent>, private categoryService:CategoryService) { }
  ngOnInit() {
    this.createForm();
  }
  createForm() {
       const newForm: FormGroup = this.fb.group ({
       name: [null, Validators.compose ([ Validators.required ])],
       series: [null, Validators.compose ([ Validators.required, Validators.min(1) ])],
       repetitions: [null, Validators.compose ([ Validators.required, Validators.min(1) ])],
       finishTime: [null, Validators.compose ([ Validators.required, Validators.min(1) ])],
       restTime: [null, Validators.compose ([ Validators.required, Validators.min(1) ])],
       categories: [null, Validators.compose ([ Validators.required ])],
       description: [null, Validators.compose ([ Validators.required ])]
      

      });
     this.form = newForm;
     this.getAllCategories();
     
   }
   onSubmit() {
    
      const newExercise :ExerciseCreateDto = <ExerciseCreateDto>this.form.value;
      //SOLUCION TEMPORAL FOTO

      newExercise.gif = 'https://media1.giphy.com/media/vR4YHeOn5TUEU/giphy.gif?cid=3640f6095c8e1c0a6343312f6f283441';
      console.log('NUEVO EJERCICIO')
      console.log(newExercise)
      this.exerciseService.create(newExercise).subscribe(r => this.dialogRef.close('confirm'),
      e => this.snackBar.open('Failed to create.', 'Close', {duration: 3000}));
    
  }
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(list => {
      this.categories=list.rows;
    }, error => {
      this.snackBar.open('Error obtaining categories', 'Close', {
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
    const newExercise :ExercisePhotoDto = <ExercisePhotoDto>this.form.value;
    console.log('MIRA CABESA')
    console.log(newExercise)
    this.progress = this.uploadExerciseService.upload(this.files, newExercise);
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
