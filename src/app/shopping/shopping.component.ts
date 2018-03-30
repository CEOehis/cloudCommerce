import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shopping.service';
import { CartService } from '../cart.service';

import * as data from '../itemsdata.json';

import { Item } from '../item';
import { Subcategory } from '../subCategory';
import { Category } from '../category';

interface CartItem extends Item {
  qty?: number
}

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})


export class ShoppingComponent implements OnInit {
  itemsList;
  currentCategory: Category;
  currentSubcategory: Subcategory;
  displayedSubcategory: Subcategory;
  private stockToggle: boolean = false;
  private sortedBy: string = 'None';

  constructor(private shoppingService: ShoppingService, private cartService: CartService) { 
  }

  ngOnInit() {
    this.getCategories();
    this.currentCategory = this.itemsList[0];
    this.currentSubcategory = this.currentCategory.subcategories[0];
    this.displayedSubcategory = this.currentSubcategory;
    this.stockToggle = false;
  }

  getCategories(): void {
    this.itemsList = this.shoppingService.getCategories();
  }

  populateProducts(subcategory: Subcategory) {
    // check state of controls and display appropriate products
    this.currentSubcategory = subcategory;
    // first fetch sorted products based on sort controls
    this.displayedSubcategory = this.sortItems(this.sortedBy);
    // conditionally get instock items of currently displayed products
    if(this.stockToggle) {
      this.displayedSubcategory = this.getInStock()
    } else {
      this.displayedSubcategory = this.displayedSubcategory;
    }
  }

  // private method that returns the items in stock of a subcategory
  private getInStock(): Subcategory {
    let itemsInStock = this.displayedSubcategory.items.filter(item => +item.stock >= 1);
    let _tempSubcategory: Subcategory = {
      name: this.currentSubcategory.name,
      items: itemsInStock
    }
    return _tempSubcategory;
  }

  sortProducts(): Subcategory {
    return this.sortItems(this.sortedBy);
  }

  toggleStock(): void {
    this.stockToggle = !this.stockToggle;
    this.populateProducts(this.currentSubcategory)
  }

  selectSorting(value: string): void {
    this.sortedBy = value;
    this.populateProducts(this.currentSubcategory);
  }

  sortItems(sortedBy): Subcategory {
    switch (sortedBy) {
      case 'Alphabetical':
        return this.sortAlphabetically();
      case 'Price':
        return this.sortByPrice();
      case 'Rating':
        return this.sortByRating();   
      default:
        return this.resetSorting();
    }
  }

  sortAlphabetically(): Subcategory {
    let sortedItems = this.currentSubcategory.items.slice().sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    let _temp: Subcategory = {
      name: this.currentSubcategory.name,
      items: sortedItems
    }
    return _temp;
  }

  sortByPrice() {
    let sortedItems = this.currentSubcategory.items.slice().sort((a, b) => {
      if (a.price < b.price) return -1;
      if (a.price > b.price) return 1;
      return 0;
    });
    let _temp: Subcategory = {
      name: this.currentSubcategory.name,
      items: sortedItems
    }
    return _temp;
  }

  sortByRating() {
    let sortedItems = this.currentSubcategory.items.slice().sort((a, b) => {
      if (a.rating < b.rating) return -1;
      if (a.rating > b.rating) return 1;
      return 0;
    });
    let _temp: Subcategory = {
      name: this.currentSubcategory.name,
      items: sortedItems
    }
    return _temp;
  }

  resetSorting(): Subcategory {
    return this.currentSubcategory;
  }

  addToCart(item) {
    console.log('item is: ', item);
    var cartItem: CartItem = item;
    cartItem.qty = 1;
    this.cartService.cart.push(cartItem);
    console.log(this.cartService.cart);
  }
}
