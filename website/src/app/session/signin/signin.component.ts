import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginDto } from 'src/app/dto/login-dto';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private snackBar:MatSnackBar
    ,private authService: AuthenticationService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

 
  onSubmit() {
      const loginDto: LoginDto = this.form.value;
      this.authService.login(loginDto).subscribe(loginResp => {
        
        this.authService.setLoginData(loginResp);
        
        this.router.navigate ( [ '/dashboard' ] );

      }, error => {
        this.snackBar.open('There was an error when we were trying to login.', 'Close', {
          duration: 3000
        });
      }
      );
    }

}
