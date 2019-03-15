import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatSnackBar, MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService, private exerciseService: ExerciseService,
    public snackBar: MatSnackBar, public dialog: MatDialog) { }
  displayedColumns: string[] = ['name', 'series', 'repetitions'];

  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    
    if (this.authService.getToken()==null) {
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
    console.log('aqui')
    this.dataSource = new MatTableDataSource(list.rows);
    this.dataSource.paginator = this.paginator;
    console.log(list.rows);
  }, error => {
    this.snackBar.open('Error obtaining gyms', 'Close', {
      duration: 3000,
      verticalPosition: 'top'
    });
  });
}
/*openDialogDeleteGym(g: GymResponse) {
  const dialogDeleteGym = this.dialog.open(DeleteGymDialogComponent, { data: { gym: g } });
  dialogDeleteGym.afterClosed().subscribe(result => {
    this.getAllGyms();
  });
}
public openUploadDialog() {
  const dialogRef = this.dialog.open(CreateGymDialogComponent,
    {
      width: '50%',
      height: '50%',
      data: { id: 1 }
    });

  dialogRef.afterClosed().subscribe(result => {
    this.snackBar.open(
      'El fichero se subió correctamente', 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top'
    });
  });
}
openDialogNewGym() {
  const dialogNewGym = this.dialog.open(CreateGymDialogComponent, { width: '500px' });
  dialogNewGym.afterClosed().subscribe(res => (res === 'confirm') ? this.getAllGyms() : null,
    err => this.snackBar.open('There was an error when we were creating a new Gym.', 'Close', { duration: 3000 }));
}
openDialogEditGym(gymCreateDto: GymCreateDto) {
  const dialogUpdateGym = this.dialog.open(CreateGymDialogComponent, { width: '500px', data: { gym: GymCreateDto } });
  dialogUpdateGym.afterClosed().subscribe(result => {
    this.getAllGyms();
  });
}*/
}