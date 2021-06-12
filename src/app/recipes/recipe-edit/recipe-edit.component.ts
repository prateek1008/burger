import { RecipeService } from './../recipe.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  index: number;
  editMode: string = 'false';
  recipeForm: FormGroup;
  selectedRecipe: Recipe;
  recipeIngredients = new FormArray([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {
    this.selectedRecipe = new Recipe('', '', '', '');
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.index = +params['id'];
      if (this.index >= 0) {
        this.selectedRecipe = this.recipeService.getRecipeById(this.index);
        console.log(this.selectedRecipe);
      }
    });

    this.route.queryParams.subscribe((params: Params) => {
      this.editMode = params['editMode'];
    });
    //const frg = this.route.snapshot.fragment; //For fragments

    this.preselection();

    this.recipeForm = new FormGroup({
      name: new FormControl(this.selectedRecipe.name, Validators.required),
      imagePath: new FormControl(
        this.selectedRecipe.imagePath,
        Validators.required
      ),
      description: new FormControl(
        this.selectedRecipe.description,
        Validators.required
      ),
      tag: new FormControl(this.selectedRecipe.tag, Validators.required),
      ingredients: this.recipeIngredients,
    });
  }

  // Initialize form with selected recipe
  preselection() {
    if (this.editMode === 'true') {
      if (this.selectedRecipe.ingredients) {
        this.selectedRecipe.ingredients.forEach((value) => {
          const ingredientGroup = new FormGroup({
            name: new FormControl(value.name, Validators.required),
            amount: new FormControl(value.amount, [
              Validators.required,
              Validators.min(1),
            ]),
          });
          this.recipeIngredients.push(ingredientGroup);
        });
      }
    }
  }

  onSubmit() {
    console.log(this.recipeForm);
    if (this.editMode === 'false') {
      this.recipeService.addRecipe(this.recipeForm.value);
    } else {
      this.recipeService.updateRecipe(this.index, this.recipeForm.value);
    }
    this.router.navigate(['/recipes']);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl(0, [Validators.required, Validators.min(1)]),
      })
    );
  }
}
