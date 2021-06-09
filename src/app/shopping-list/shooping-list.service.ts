import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class shoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients : Ingredient[] = [
    new Ingredient("Apple", 5),
    new Ingredient("Banana", 10)
  ]

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient : Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients);
  }
}
