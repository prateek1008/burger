import { Ingredient } from '../shared/ingredient.model';

export interface IRecipe {
  name: string;
  description: string;
  imagePath: string;
  tag: string;
  ingredients?: Ingredient[];
}
