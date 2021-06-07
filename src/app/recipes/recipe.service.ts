import { shoppingListService } from './../shopping-list/shooping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Chowmein',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque provident.',
      'https://www.viniscookbook.com/wp-content/uploads/2019/02/20190214_164218.jpg',
      [new Ingredient('Sauce',2), new Ingredient('Onions', 4)]
    ),
    new Recipe(
      'Hakka Noodles',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque provident.',
      'https://www.viniscookbook.com/wp-content/uploads/2019/02/20190214_164218.jpg',
      [new Ingredient('Sauce',2), new Ingredient('Onions', 4)]
    )
  ];

  constructor(private slService: shoppingListService) { }

  getRecipeById(index : number) {
    return this.recipes[index];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }




}