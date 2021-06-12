import { RecipeService } from './../recipe.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  activeTime: number;
  timeSubscription: Subscription;
  filteredTag: string = '';

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipeUpdated.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    const timeObservable = new Observable((observer) => {
      let count = 1;
      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000);
    });

    this.timeSubscription = timeObservable.subscribe((count: number) => {
      this.activeTime = count;
    });
  }

  onNewRecipe() {
    this.router.navigate(['new'], {
      relativeTo: this.route,
      queryParams: { editMode: false },
    });
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.timeSubscription.unsubscribe();
  }
}
