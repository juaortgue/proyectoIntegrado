import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TrainingService } from 'src/app/services/training.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { ExerciseResponse } from 'src/app/interfaces/exercise-response';
import { TrainingCreateDto } from 'src/app/dto/training-create.dto';
import { TrainingOneResponse } from 'src/app/interfaces/training-one-response';

@Component({
  selector: 'app-edit-training-dialog',
  templateUrl: './edit-training-dialog.component.html',
  styleUrls: ['./edit-training-dialog.component.scss']
})
export class EditTrainingDialogComponent implements OnInit {

  form: FormGroup;
  targets:string[] = ['Lost weight', 'Keep in weight', 'Gaining muscle'];
  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  private trainingService: TrainingService, private exerciseService: ExerciseService,public dialogRef: MatDialogRef<EditTrainingDialogComponent>) { }
  exercises:ExerciseResponse[];
  training: TrainingOneResponse;
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

      });
     this.form = newForm;
     
   }
   createFormFilled() {
    const newForm: FormGroup = this.fb.group ({
    name: [this.training.name, Validators.compose ([ Validators.required ])],
    target: [this.training.target, Validators.compose ([ Validators.required ])],
    time: [this.training.time, Validators.compose ([ Validators.required, Validators.min(1) ])],
    description: [this.training.description, Validators.compose ([ Validators.required ])],
    exercises: [this.training.exercises, Validators.compose ([ Validators.required ])],
    level: [this.training.level, Validators.compose ([ Validators.required, Validators.min(1), Validators.max(5), Validators.maxLength(5) ])],

   });
  this.form = newForm;
  
}
   onSubmit() {
    
      const editTraining :TrainingCreateDto = <TrainingCreateDto>this.form.value;
      //SOLUCION TEMPORAL FOTO

      editTraining.picture = 'https://s.imgur.com/images/logo-1200-630.jpg?2';
      console.log('EDITADO ENTRENAMIENTO')
      console.log(editTraining)
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
      this.getAllExercises();
      this.createFormFilled();
      
    }, error => {
      this.snackBar.open('Error obtaining training', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    });
  }

}
