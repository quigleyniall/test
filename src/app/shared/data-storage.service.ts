import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http'
import { RecipeService } from '../recipes/recipe.service'
import { Recipe } from '../recipes/recipe.model'
import 'rxjs/Rx'

@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient, private recipeService: RecipeService) {}

  saveRecipe() {
    // return this.httpClient.put('https://food-recipes-aa47a.firebaseio.com/data.json', this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   // headers: new HttpHeaders().set('Authorization', 'Bearer adhfbldsfgblhsdf')
    // })
    const req = new HttpRequest('PUT', 'https://food-recipes-aa47a.firebaseio.com/data.json', this.recipeService.getRecipes(), {
    reportProgress: true
  })
   return this.httpClient.request(req)
  }

  getRecipes() {
    // return this.httpClient.get('https://food-recipes-aa47a.firebaseio.com/data.json')
    return this.httpClient.get<Recipe[]>('https://food-recipes-aa47a.firebaseio.com/data.json', {
    observe: 'body',
    responseType: 'json'
  })
    .map(
      (recipes) => {
        for(let recipe of recipes) {
          if(!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

}
