import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ExerciseService } from 'src/app/services/exercise.service';
import { CreateExerciseDialogComponent } from '../create-exercise-dialog/create-exercise-dialog.component';
import { CategoryResponse } from '../../interfaces/category-response';
import { ExerciseOneResponse } from 'src/app/interfaces/exercise-one-response';
import { ExerciseCreateDto } from '../../dto/exercise-create.dto';
import { CategoryService } from 'src/app/services/category.service';
import { UploadExerciseService } from 'src/app/services/upload-exercise.service';
import { ExercisePhotoDto } from 'src/app/dto/exercise-photo-dto';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-exercise-dialog',
  templateUrl: './edit-exercise-dialog.component.html',
  styleUrls: ['./edit-exercise-dialog.component.scss']
})
export class EditExerciseDialogComponent implements OnInit {
  @ViewChild('file') file;
  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  public files: Set<File> = new Set();

  form: FormGroup;
  constructor(public uploadExerciseService:UploadExerciseService, private snackBar: MatSnackBar, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  private exerciseService: ExerciseService,public dialogRef: MatDialogRef<CreateExerciseDialogComponent>, private categoryService: CategoryService) { }
  categories:CategoryResponse[];
  exercise:ExerciseOneResponse;
  categoryExercise: CategoryResponse;
  ngOnInit() {
    this.getOneExercise();
    this.createFormEmpty();
  }
  createFormEmpty() {
       const newForm: FormGroup = this.fb.group ({
       name: [null, Validators.compose ([ Validators.required ])],
       series: [null, Validators.compose ([ Validators.required, Validators.min(1) ])],
       repetitions: [null, Validators.compose ([ Validators.required, Validators.min(1) ])],
       finishTime: [null, Validators.compose ([ Validators.required, Validators.min(1) ])],
       restTime: [null, Validators.compose ([ Validators.required, Validators.min(1) ])],
       categoryId: [null, Validators.compose ([ Validators.required ])],
       description: [null, Validators.compose ([ Validators.required ])],
       gif: [null, Validators.compose ([ Validators.required ])]

      });
     this.form = newForm;
     
   }
   createFormFilled() {
    const newForm: FormGroup = this.fb.group ({
     name: [this.exercise.name, Validators.compose ([ Validators.required ])],
     series: [this.exercise.series, Validators.compose ([ Validators.required, Validators.min(1) ])],
     repetitions: [this.exercise.repetitions, Validators.compose ([ Validators.required, Validators.min(1) ])],
     finishTime: [this.exercise.finishTime, Validators.compose ([ Validators.required, Validators.min(1) ])],
     restTime: [this.exercise.restTime, Validators.compose ([ Validators.required, Validators.min(1) ])],
     categoryId: [this.exercise.categoryId.id, Validators.compose ([ Validators.required ])],
     description: [this.exercise.description, Validators.compose ([ Validators.required ])],
     gif: [null, Validators.compose ([ Validators.required ])]

    });
    this.form = newForm;
  
}
   onSubmit() {
    
      const editExercise :ExerciseCreateDto = <ExerciseCreateDto>this.form.value;
      

     
      this.exerciseService.update(this.data.exercise.id, editExercise).subscribe(r => this.dialogRef.close('confirm'),
      e => this.snackBar.open('Failed to create.', 'Close', {duration: 3000}));
    
  }
  getOneCategory(){
    this.categoryService.getOne(this.exercise.categoryId.id).subscribe(one => {
      this.categoryExercise=one;
    }, error => {
      this.snackBar.open('Error obtaining one category', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    });
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
  getOneExercise() {
    this.exerciseService.getOne(this.data.exercise.id).subscribe(one => {
      this.exercise=one;
      this.getAllCategories();
      
      this.createFormFilled();
      
    }, error => {
      this.snackBar.open('Error obtaining exercise', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    });
  }
  //PHOTO

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

     
    }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    const newExercise :ExercisePhotoDto = <ExercisePhotoDto>this.form.value;
    
    this.progress = this.uploadExerciseService.editWithPhoto(this.files, newExercise, this.data.exercise.id);
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
