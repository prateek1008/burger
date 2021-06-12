import { shoppingListService } from './../shopping-list/shooping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Chowmein',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque provident.',
      'https://www.viniscookbook.com/wp-content/uploads/2019/02/20190214_164218.jpg',
      'veg',
      [new Ingredient('Sauce', 2), new Ingredient('Onions', 4)]
    ),
    new Recipe(
      'Hakka Noodles',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque provident.',
      'https://www.viniscookbook.com/wp-content/uploads/2019/02/20190214_164218.jpg',
      'nonveg'
    ),
  ];
  recipeUpdated = new Subject<Recipe[]>();

  constructor(private slService: shoppingListService) {}

  getRecipeById(index: number) {
    return this.recipes[index];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeUpdated.next(this.recipes);
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeUpdated.next(this.recipes);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeUpdated.next(this.recipes);
  }
}
