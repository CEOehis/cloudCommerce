import { Component, OnInit } from '@angular/core';
import * as data from '../itemsdata.json';

interface Item {
  name?: string,
  price?: number,
  imagelink?: string,
  category?: string,
  rating?: string,
  subcategory?: string,
  stock?: string,
  description?: string
}

interface Subcategory {
  name: string,
  items: Item[]
}

interface Category {
  category: string,
  subcategories: Subcategory[]
}


@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})


export class ShoppingComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit() {
  }
  public itemsList = data;

  public currentCategory: Category = this.itemsList[0];
  public currentSubcategory: Subcategory = this.currentCategory.subcategories[0];
  public displayedSubcategory: Subcategory = this.currentSubcategory;
  private stockToggle: boolean = false;
  

  // public subcategory: Subcategory = data[0].subcategories[0];

  // set default initial value 

  display(subcategory: Subcategory, category: Category) {
    console.log('sub:', subcategory);
    console.log('main:', category);
    this.currentCategory = category;
    this.currentSubcategory = subcategory;
    this.displayedSubcategory = subcategory;
    console.log(this.currentSubcategory);
  }

  toggleInStock(subcategory: Subcategory) {
    var itemsInStock = subcategory.items.filter(item => Number(item.stock) >= 1);
    var newSub: Subcategory = {
      name: subcategory.name,
      items: itemsInStock
    }
    console.log(newSub);
    if(this.stockToggle) {
      this.stockToggle = false;
      console.log(this.currentSubcategory);
      return this.displayedSubcategory = this.currentSubcategory;
    }
    this.displayedSubcategory = newSub;
    console.log(this.currentSubcategory);
    this.stockToggle = true;
  }

  sortItems(e) {
    switch (e.target.value) {
      case 'Alphabetical':
        console.log('alpha'); 
        this.sortAlphabetically();
        break;
      case 'Price':
        console.log('pricey'); 
        this.sortByPrice();    
        break;
      case 'Rating':
        console.log('top rated'); 
        this.sortByRating();       
        break;    
      default:
        console.log('none')
        this.resetSorting();
        break;
    }
  }

  sortAlphabetically() {

    let sortedItems = this.displayedSubcategory.items.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    this.displayedSubcategory = {
      name: this.displayedSubcategory.name,
      items: sortedItems
    }
  }

  sortByPrice() {
    let sortedItems = this.displayedSubcategory.items.sort((a, b) => {
      if (a.price < b.price) return -1;
      if (a.price > b.price) return 1;
      return 0;
    });
    this.displayedSubcategory = {
      name: this.displayedSubcategory.name,
      items: sortedItems
    }
  }

  sortByRating() {
    let sortedItems = this.displayedSubcategory.items.sort((a, b) => {
      if (a.rating < b.rating) return -1;
      if (a.rating > b.rating) return 1;
      return 0;
    });
    this.displayedSubcategory = {
      name: this.displayedSubcategory.name,
      items: sortedItems
    }
  }

  resetSorting() {
    // TODO: add reset sorting algorithm
  }
}
