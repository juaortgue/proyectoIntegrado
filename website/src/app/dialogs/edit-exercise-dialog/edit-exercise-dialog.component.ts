import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ExerciseService } from 'src/app/services/exercise.service';
import { CreateExerciseDialogComponent } from '../create-exercise-dialog/create-exercise-dialog.component';
import { CategoryResponse } from '../../interfaces/category-response';
import { ExerciseOneResponse } from 'src/app/interfaces/exercise-one-response';
import { ExerciseCreateDto } from '../../dto/exercise-create.dto';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-exercise-dialog',
  templateUrl: './edit-exercise-dialog.component.html',
  styleUrls: ['./edit-exercise-dialog.component.scss']
})
export class EditExerciseDialogComponent implements OnInit {

  form: FormGroup;
  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  private exerciseService: ExerciseService,public dialogRef: MatDialogRef<CreateExerciseDialogComponent>, private categoryService: CategoryService) { }
  categories:CategoryResponse[];
  exercise:ExerciseOneResponse;
  categoryExercise: CategoryResponse;
  ngOnInit() {
    console.log(this.data.exercise.id)
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
       categories: [null, Validators.compose ([ Validators.required ])],
       description: [null, Validators.compose ([ Validators.required ])],

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
     categories: [this.exercise.categoryId, Validators.compose ([ Validators.required ])],
     description: [this.exercise.description, Validators.compose ([ Validators.required ])],

    });
    this.form = newForm;
  
}
   onSubmit() {
    
      const editExercise :ExerciseCreateDto = <ExerciseCreateDto>this.form.value;
      //SOLUCION TEMPORAL FOTO
      editExercise.gif = 'https://media1.giphy.com/media/vR4YHeOn5TUEU/giphy.gif?cid=3640f6095c8e1c0a6343312f6f283441';

      console.log('EDITADO EJERCICIO')
      console.log(editExercise)
      this.exerciseService.update(this.data.exercise.id, editExercise).subscribe(r => this.dialogRef.close('confirm'),
      e => this.snackBar.open('Failed to create.', 'Close', {duration: 3000}));
    
  }
  getOneCategory(){
    console.log(this.exercise)
    this.categoryService.getOne(this.exercise.categoryId).subscribe(one => {
      this.categoryExercise=one;
     console.log('se obtiene la categoria')
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

}