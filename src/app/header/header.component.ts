import { AuthenticationService } from './../shared/auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  constructor(
    private dataStorage: DataStorageService,
    private authenticateService: AuthenticationService
  ) {}
  isAuthenticated = false;
  ngOnInit(): void {
    this.userSubscription = this.authenticateService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onSave() {
    this.dataStorage.saveData();
  }

  onFetch() {
    this.dataStorage.fetchData().subscribe();
  }

  onLogout() {
    this.authenticateService.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
