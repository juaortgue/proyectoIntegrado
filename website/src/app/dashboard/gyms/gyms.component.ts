import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gyms',
  templateUrl: './gyms.component.html',
  styleUrls: ['./gyms.component.scss']
})
export class GymsComponent implements OnInit {

  constructor(private router: Router
    ,private authService: AuthenticationService) {}

  ngOnInit() {
    
    if (this.authService.getToken()==null) {
      this.router.navigate ( [ '/' ] );    
    }

}
}
