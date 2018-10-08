import { Component } from '@angular/core';
// import { Reponse } from '@angular/forms'
import { HttpEvent, HttpEventType } from '@angular/common/http'
import { DataStorageService } from '../shared/data-storage.service'
import { RecipeService } from '../recipes/recipe.service'
import { Recipe } from '../recipes/recipe.model'

@Component({
  selector: "app-header",
  templateUrl: './header.component.html'
})
export class HeaderComponent {

constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}

  saveData() {
    this.dataStorageService.saveRecipe()
    .subscribe(
    (response) => console.log(response),
    (error) => console.log(error)
    )
  }

  fetchData() {
    this.dataStorageService.getRecipes()
  }
}
