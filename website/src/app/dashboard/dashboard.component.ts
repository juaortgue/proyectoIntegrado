import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  constructor(private snackBar: MatSnackBar, private router: Router ,private authService: AuthenticationService, private userService: UserServiceService) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource;
  busqueda='';
  displayedColumns: string[] = ['picture', 'name', 'email', 'actions'];



  ngOnInit() {
    
    if (this.authService.getToken()==null) {
      this.router.navigate ( [ '/' ] );    
    }else{
      this.getAllUsers();
    }
  }
 
  getAllUsers() {
    this.userService.getAllUsers().subscribe(userList => {
      this.dataSource = new MatTableDataSource(userList.rows);
      this.dataSource.paginator = this.paginator;
      console.log('AQUI')
      console.log(userList.rows)
      this.snackBar.open('Users obtained successfully.', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }, error => {
      console.log('AQUI2')
      console.log(error)
      this.snackBar.open('Error obtaining users', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    });
  }
}

