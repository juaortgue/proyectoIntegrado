import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { UserServiceService } from '../services/user-service.service';
import { UserResponse } from '../interfaces/user-response';
import { DeleteUserDialogComponent } from '../dialogs/delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  // tslint:disable-next-line:max-line-length
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private router: Router ,private authService: AuthenticationService, private userService: UserServiceService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource;
  busqueda = '';
  displayedColumns: string[] = ['picture', 'name', 'email', 'actions'];



  ngOnInit() {
    if (this.authService.getToken() == null) {
      this.router.navigate ( [ '/' ] );
    } else {
      this.getAllUsers();
    }
  }
  // it permits clients delete users
  openDialogDeleteUser(u: UserResponse) {
    const deleteUserDialogComponent = this.dialog.open(DeleteUserDialogComponent, { data: { user: u } });
    deleteUserDialogComponent.afterClosed().subscribe(result => {
      this.getAllUsers();
    });
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe(userList => {
      this.dataSource = new MatTableDataSource(userList.rows);
      this.dataSource.paginator = this.paginator;
    }, error => {
      this.snackBar.open('Error obtaining users', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

