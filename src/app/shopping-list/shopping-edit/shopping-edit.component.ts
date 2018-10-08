import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppinglistService } from '../shopping-list.service'
import { Subscription } from 'rxjs/Subscription'
import { Ingredient } from '../../shared/ingredient.model'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slForm: NgForm
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingreident;

  constructor(private shoppinglistService: ShoppinglistService) { }

  ngOnInit() {
    this.subscription = this.shoppinglistService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppinglistService.getIngredient(index)
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onAddItem(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.shoppinglistService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      this.shoppinglistService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset()
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDeleteItem() {
    this.shoppinglistService.deleteIngredient(this.editedItemIndex)
    this.onClear();
  }

}
