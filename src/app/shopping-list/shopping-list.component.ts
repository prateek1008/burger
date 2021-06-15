import { AuthenticationService } from './../shared/auth/auth.service';
import { shoppingListService } from './shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  isLoggedIn: boolean;

  constructor(
    private slService: shoppingListService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authenticationService.user.pipe(take(1)).subscribe((user) => {
      this.isLoggedIn = !!user;
    });
    this.ingredients = this.slService.getIngredients();
    this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  onIngredients(index: number) {
    if (this.isLoggedIn) {
      this.slService.selectedIngredientIndex.next(index);
    }
  }
}
