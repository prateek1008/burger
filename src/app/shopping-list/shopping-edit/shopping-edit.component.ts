import { Observable } from 'rxjs';
import { CanComponentDeactivate } from './../../shared/can-deactivate-guard.interface';
import { shoppingListService } from './../shooping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, CanComponentDeactivate{
  changesSaved: boolean = false;
  name: string = '';
  amount: number = 0;

  constructor(private slService : shoppingListService) { }

  ngOnInit(): void {
  }

  onIngredientAdded() {

    this.slService.addIngredient(new Ingredient(this.name,this.amount));
    this.changesSaved = true;
  }

  onChange() {
    this.changesSaved = false;
  }

  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean {
    if((this.name !== '' || this.amount !== 0) && !this.changesSaved ){
      return confirm("Changes are not saved. Do you want to discard the changes?");
    } else{
      return true;
    }
  }

}
