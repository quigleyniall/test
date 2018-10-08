import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model'
import { ShoppinglistService } from './shopping-list.service'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
ingredients: Ingredient[];
private subscription: Subscription;

  constructor(private shopplistService: ShoppinglistService) { }

  ngOnInit() {
    this.ingredients = this.shopplistService.getIngredients();
    this.subscription = this.shopplistService.ingredientsChanged.
    subscribe(
      (ingredients: Ingreident[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  onEditItem(index: number) {
    this.shopplistService.startedEditing.next(index)
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
