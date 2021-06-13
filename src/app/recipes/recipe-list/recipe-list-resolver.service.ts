import { DataStorageService } from './../../shared/data-storage.service';
import { Observable } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Recipe } from './../recipe.model';
import { RecipeService } from '../recipe.service';

@Injectable()
export class RecipeListResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorage: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length) {
      return recipes;
    } else {
      return this.dataStorage.fetchData();
    }
  }
}
