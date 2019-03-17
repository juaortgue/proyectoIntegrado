import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { GymService } from 'src/app/services/gym.service';
import { MatDialog, MatSnackBar, MatPaginator, MatTableDataSource } from '@angular/material';
import { GymResponse } from 'src/app/interfaces/gym-response';
import { DeleteGymDialogComponent } from 'src/app/dialogs/delete-gym-dialog/delete-gym-dialog.component';
import { CreateGymDialogComponent } from 'src/app/dialogs/create-gym-dialog/create-gym-dialog.component';
import { GymCreateDto } from 'src/app/dto/gym-create.dto';
import { EditGymDialogComponent } from '../../dialogs/edit-gym-dialog/edit-gym-dialog.component';

@Component({
  selector: 'app-gyms',
  templateUrl: './gyms.component.html',
  styleUrls: ['./gyms.component.scss']
})
export class GymsComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService, private gymService: GymService,
    public snackBar: MatSnackBar, public dialog: MatDialog, private snackbar:MatSnackBar) { }
  displayedColumns: string[] = ['picture', 'name', 'address', 'actions'];

  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    if (this.authService.getToken()==null || !this.authService.isAdmin()) {      
      this.router.navigate(['/']);
      this.snackBar.open('You must be admin', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    } else {
      this.getAllGyms();
    }

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getAllGyms() {
    this.gymService.getAllGyms().subscribe(gymList => {
      this.dataSource = new MatTableDataSource(gymList.rows);
      this.dataSource.paginator = this.paginator;
    }, error => {
      this.snackBar.open('Error obtaining gyms', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    });
  }
  openDialogDeleteGym(g: GymResponse) {
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
  openDialogEditGym(gymResponse: GymResponse) {
    console.log('open dialog')
    console.log(gymResponse)
    const dialogUpdateGym = this.dialog.open(EditGymDialogComponent, { width: '500px', data: { gym: gymResponse } });
    dialogUpdateGym.afterClosed().subscribe(result => {
      this.getAllGyms();
    });
  }
}
