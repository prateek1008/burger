import { IAuthResponse } from './auth-response.interface';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

  private errorHandling(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (errorRes.error && errorRes.error.error) {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists.';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exists.';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Incorrect Password';
          break;
      }
    }
    return throwError(errorMessage);
  }

  private userHandling(res: IAuthResponse) {
    const expirationDate = new Date(
      new Date().getTime() + +res.expiresIn * 1000
    );
    const user = new User(res.email, res.localId, res.idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(+res.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  signup(email: string, password: string) {
    const user = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this.http
      .post<IAuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
        user,
        {
          params: {
            key: 'AIzaSyAFfhundyT4odp-yllkYARfPNlJvkMFkDg',
          },
        }
      )
      .pipe(
        catchError(this.errorHandling),
        tap((res) => {
          this.userHandling(res);
        })
      );
  }

  signin(email: string, password: string) {
    const user = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this.http
      .post<IAuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
        user,
        {
          params: new HttpParams().set(
            'key',
            'AIzaSyAFfhundyT4odp-yllkYARfPNlJvkMFkDg'
          ),
        }
      )
      .pipe(
        catchError(this.errorHandling),
        tap((res) => {
          this.userHandling(res);
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDate: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDate);
  }
}
