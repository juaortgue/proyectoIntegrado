import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  constructor(private router: Router
    ,private authService: AuthenticationService) {}

  ngOnInit() {
    
    if (this.authService.getToken()==null) {
      this.router.navigate ( [ '/' ] );    
    }
  }
}
