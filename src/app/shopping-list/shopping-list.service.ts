import {Ingredient} from '../shared/ingredient.model'
// import { EventEmitter } from '@angular/core'
import { Subject } from 'rxjs/Subject'

export class ShoppinglistService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient("apple", 3),
    new Ingredient("orange", 5)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index]
  }

  updateIngredient(index: number, newIngredient: Ingreident) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]) {
  //   for(let ingredient of ingredients) {
  //     this.addIngredient(ingredient)
  // }
  this.ingredients.push(...ingredients);
  this.ingredientsChanged.next(this.ingredients.slice())
}
}
