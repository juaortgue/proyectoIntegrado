import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatSnackBar, MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { ExerciseService } from 'src/app/services/exercise.service';
import { ExerciseResponse } from 'src/app/interfaces/exercise-response';
import { DeleteExerciseDialogComponent } from '../../dialogs/delete-exercise-dialog/delete-exercise-dialog.component';
import { CreateExerciseDialogComponent } from '../../dialogs/create-exercise-dialog/create-exercise-dialog.component';
import { ExerciseCreateDto } from 'src/app/dto/exercise-create.dto';
import { EditExerciseDialogComponent } from '../../dialogs/edit-exercise-dialog/edit-exercise-dialog.component';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService, private exerciseService: ExerciseService,
    public snackBar: MatSnackBar, public dialog: MatDialog) { }
  displayedColumns: string[] = ['gif', 'name', 'series', 'repetitions', 'actions'];

  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    
    if (this.authService.getToken()==null || !this.authService.isAdmin()) {
      this.router.navigate ( [ '/' ] );    
    }else{
      this.getAll();
    }

}
applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}
getAll() {
  this.exerciseService.getAll().subscribe(list => {
    this.dataSource = new MatTableDataSource(list.rows);
    this.dataSource.paginator = this.paginator;
  }, error => {
    this.snackBar.open('Error obtaining exercises', 'Close', {
      duration: 3000,
      verticalPosition: 'top'
    });
  });
}
openDialogDelete(e: ExerciseResponse) {
  const dialogDelete = this.dialog.open(DeleteExerciseDialogComponent, { data: { exercise: e } });
  dialogDelete.afterClosed().subscribe(result => {
    this.getAll();
  });
}

openDialogNew() {
  const dialogNew = this.dialog.open(CreateExerciseDialogComponent, { width: '500px' });
  dialogNew.afterClosed().subscribe(res => (res === 'confirm') ? this.getAll() : null,
    err => this.snackBar.open('There was an error when we were creating a new exercise.', 'Close', { duration: 3000 }));
}
openDialogEdit(exerciseCreateDto: ExerciseCreateDto) {
  const dialogUpdate = this.dialog.open(EditExerciseDialogComponent, { width: '500px', data: { exercise: exerciseCreateDto } });
  dialogUpdate.afterClosed().subscribe(result => {
    this.getAll();
  });
}
}