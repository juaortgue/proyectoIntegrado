import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginDto } from 'src/app/dto/login-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, public snackBar: MatSnackBar,
    private authService: AuthenticationService, private ngZone: NgZone) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

 onSubmit() {
  this.router.navigate(['/user']);

    const loginDto: LoginDto = this.form.value;
    console.log('OBSUBTMIT')
    this.authService.login(loginDto).subscribe(loginResp => {
      console.log('se mete')
      this.authService.setLoginData(loginResp);
    }, error => {
      this.snackBar.open('There was an error when we were trying to login.', 'Close', {
        duration: 3000
      });
    }
    );
  }

 
  

}
