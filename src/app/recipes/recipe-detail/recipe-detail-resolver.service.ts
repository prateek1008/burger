import { RecipeService } from './../recipe.service';
import { Observable } from 'rxjs';
import { Ingredient } from './../../shared/ingredient.model';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

interface IRecipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients?: Ingredient[];
}

@Injectable()
export class RecipeResolver implements Resolve<IRecipe> {
  constructor(private recipeService: RecipeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IRecipe> | Promise<IRecipe> | IRecipe {
    return this.recipeService.getRecipeById(+route.params['id']);
  }
}
