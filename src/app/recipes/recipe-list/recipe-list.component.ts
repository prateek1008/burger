import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>()
  recipes: Recipe[] = [
    new Recipe(
      'Chowmein',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque provident.',
      'https://www.viniscookbook.com/wp-content/uploads/2019/02/20190214_164218.jpg'
    ),
    new Recipe(
      'Hakka Noodles',
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque provident.',
      'https://www.viniscookbook.com/wp-content/uploads/2019/02/20190214_164218.jpg'
    )
  ];

  constructor() {}

  ngOnInit(): void {}

  recipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe)
  }
  
}
