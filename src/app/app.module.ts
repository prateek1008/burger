import { FilterPipe } from './shared/filter.pipe';
import { RecipeService } from './recipes/recipe.service';
import { RecipeResolver } from './recipes/recipe-detail/recipe-detail-resolver.service';
import { CanDeactivateGuard } from './shared/can-deactivate-guard.service';
import { AuthGuard } from './shared/auth-guard.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { shoppingListService } from './shopping-list/shooping-list.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPrimaryDirective } from './shared/color-primary.directive';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { ErrorComponent } from './error/error.component';
import { AuthService } from './shared/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    HeaderComponent,
    ColorPrimaryDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    ErrorComponent,
    FilterPipe
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule],
  providers: [
    RecipeService,
    shoppingListService,
    AuthGuard,
    AuthService,
    CanDeactivateGuard,
    RecipeResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
