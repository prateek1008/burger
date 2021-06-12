import { AuthService } from 'src/app/shared/auth.service';
import { shoppingListService } from './shooping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getInfo();
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
