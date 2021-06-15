import { AuthenticationComponent } from './authentication/authentication.component';
import { RecipeListResolverService } from './recipes/recipe-list/recipe-list-resolver.service';
import { RecipeResolver } from './recipes/recipe-detail/recipe-detail-resolver.service';
import { CanDeactivateGuard } from './shared/can-deactivate-guard.service';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ErrorComponent } from './error/error.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    resolve: { recipes: RecipeListResolverService },
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: { recipe: RecipeResolver },
      },
      { path: ':id/edit', component: RecipeEditComponent },
    ],
  },
  {
    path: 'shopping-list',
    canActivateChild: [AuthGuard],
    component: ShoppingListComponent,
    children: [
      {
        path: 'edit',
        component: ShoppingEditComponent,
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
  {
    path: 'auth',
    component: AuthenticationComponent,
  },
  {
    path: '**',
    component: ErrorComponent,
    data: { message: 'Page Not Found' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
