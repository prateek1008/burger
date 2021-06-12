import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  isLoggedIn: boolean;
  index: number;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.recipe = data['recipe'];
    });
    this.route.params.subscribe((params: Params) => {
      this.index = params['id'];
    });
    this.isLoggedIn = this.authService.getInfo();
  }

  onIngredientsAdd() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onRecipeEdit() {
    // this.router.navigate(['edit'], {relativeTo: this.route, queryParams: {editMode: true}, fragment: 'try'}) //for fragments
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParams: { editMode: true },
    });
  }

  onRecipeDelete() {
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(['recipes']);
  }
}
