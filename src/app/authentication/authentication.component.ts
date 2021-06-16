import { PlaceholderDirective } from './../shared/placeholder.directive';
import { IAuthResponse } from './../shared/auth/auth-response.interface';
import { AuthenticationService } from './../shared/auth/auth.service';
import { NgForm } from '@angular/forms';
import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  isSignin: boolean = true;
  errorMessage: string = null;
  isLoading: boolean = false;
  modalSubscription: Subscription;
  @ViewChild(PlaceholderDirective, { static: false })
  errorModal: PlaceholderDirective;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
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
        this.onErrorModal(error);
      }
    );

    loginForm.reset();
  }

  onToggle() {
    this.isSignin = !this.isSignin;
  }

  private onErrorModal(errorMessage: string) {
    const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.errorModal.viewComponentRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );
    componentRef.instance.errorMessage = errorMessage;

    this.modalSubscription = componentRef.instance.isClosed.subscribe(
      (isClosed) => {
        if (isClosed) {
          this.modalSubscription.unsubscribe();
          hostViewContainerRef.clear();
        }
      }
    );
  }
}
