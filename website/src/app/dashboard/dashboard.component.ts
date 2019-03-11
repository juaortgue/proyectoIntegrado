import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  constructor(private router: Router
    ,private authService: AuthenticationService) {}
    dataSource;

  ngOnInit() {
    
    if (this.authService.getToken()==null) {
      this.router.navigate ( [ '/' ] );    
    }
  }
}
