import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { UploadService } from 'src/app/services/upload.service';
import { TrainingCreateDto } from '../../dto/training-create.dto';
import { ExerciseResponse } from '../../interfaces/exercise-response';
import { ExerciseService } from 'src/app/services/exercise.service';
import { ExerciseCreateDto } from 'src/app/dto/exercise-create.dto';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryResponse } from 'src/app/interfaces/category-response';
@Component({
  selector: 'app-create-exercise-dialog',
  templateUrl: './create-exercise-dialog.component.html',
  styleUrls: ['./create-exercise-dialog.component.scss']
})
export class CreateExerciseDialogComponent implements OnInit {

  form: FormGroup;
  categories:CategoryResponse[];
  constructor(private uploadService:UploadService,private snackBar: MatSnackBar, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
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

}
