import { Observable } from 'rxjs';
import { CanComponentDeactivate } from './../../shared/can-deactivate-guard.interface';
import { shoppingListService } from '../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, CanComponentDeactivate {
  @ViewChild('f', { static: false }) form: NgForm;
  selectedIndex: number = -1;

  constructor(private slService: shoppingListService) {}

  ngOnInit(): void {
    this.slService.selectedIngredientIndex.subscribe((index) => {
      this.selectedIndex = index;
      const selectedIngredient: Ingredient =
        this.slService.getIngredientByIndex(index);
      this.form.setValue({
        name: selectedIngredient.name,
        amount: selectedIngredient.amount,
      });
    });
  }

  onIngredientAdded() {
    const value = this.form.value;
    if (this.selectedIndex === -1) {
      this.slService.addIngredient(new Ingredient(value.name, value.amount));
    } else {
      this.slService.updateIngredient(this.selectedIndex, value);
    }
    this.onClear();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.form.dirty) {
      return confirm(
        'Changes are not saved. Do you want to discard the changes?'
      );
    } else {
      return true;
    }
  }

  onDelete() {
    this.slService.deleteIngredientByIndex(this.selectedIndex);
    this.onClear();
  }

  onClear() {
    this.form.reset({
      amount: 0,
    });
    this.selectedIndex = -1;
  }
}
