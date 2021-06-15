import { IAuthResponse } from './../shared/auth/auth-response.interface';
import { AuthenticationService } from './../shared/auth/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  isSignin: boolean = true;
  errorMessage: string = null;
  isLoading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    this.isLoading = true;
    let authObs: Observable<IAuthResponse>;
    if (!this.isSignin) {
      authObs = this.authenticationService.signup(email, password);
    } else {
      authObs = this.authenticationService.signin(email, password);
    }

    authObs.subscribe(
      (res) => {
        this.router.navigate(['/recipes']);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error;
      }
    );

    loginForm.reset();
  }

  onToggle() {
    this.isSignin = !this.isSignin;
  }
}
