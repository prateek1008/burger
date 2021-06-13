import { RecipeService } from './../recipe.service';
import { Observable } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { IRecipe } from '../recipe.interface';

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
