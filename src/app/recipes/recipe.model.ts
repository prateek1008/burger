import { IRecipe } from './recipe.interface';
import { Ingredient } from './../shared/ingredient.model';

export class Recipe implements IRecipe {
  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
    public tag: string,
    public ingredients?: Ingredient[]
  ) {}
}
