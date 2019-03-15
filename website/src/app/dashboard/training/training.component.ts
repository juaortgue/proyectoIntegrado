import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { TrainingService } from 'src/app/services/training.service';
import { TrainingResponse } from '../../interfaces/training-response';
import { DeleteTrainingDialogComponent } from 'src/app/dialogs/delete-training-dialog/delete-training-dialog.component';
import { CreateTrainingDialogComponent } from '../../dialogs/create-training-dialog/create-training-dialog.component';
import { EditTrainingDialogComponent } from '../../dialogs/edit-training-dialog/edit-training-dialog.component';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService, private trainingService: TrainingService,
    public snackBar: MatSnackBar, public dialog: MatDialog) { }
  displayedColumns: string[] = ['name', 'target', 'type', 'actions'];

  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    if (this.authService.getToken() == null) {
      this.router.navigate(['/']);
    } else {
      this.getAll();
      
    }

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getAll() {
    this.trainingService.getAll().subscribe(list => {
      this.dataSource = new MatTableDataSource(list.rows);
      this.dataSource.paginator = this.paginator;
    }, error => {
      this.snackBar.open('Error obtaining training', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    });
  }
  openDialogDelete(t: TrainingResponse) {
    const dialogDelete = this.dialog.open(DeleteTrainingDialogComponent, { data: { training: t } });
    dialogDelete.afterClosed().subscribe(result => {
      this.getAll();
    });
  }
  openDialogNew() {
    const dialogNew = this.dialog.open(CreateTrainingDialogComponent, { width: '500px' });
    dialogNew.afterClosed().subscribe(res => (res === 'confirm') ? this.getAll() : null,
      err => this.snackBar.open('There was an error when we were creating a new training.', 'Close', { duration: 3000 }));
  }
  openDialogEdit(trainingResponse: TrainingResponse) {
    console.log('open dialog')
    console.log(trainingResponse)
    const dialogUpdate = this.dialog.open(EditTrainingDialogComponent, { width: '500px', data: { training: trainingResponse } });
    dialogUpdate.afterClosed().subscribe(result => {
      this.getAll();
    });
  }
}