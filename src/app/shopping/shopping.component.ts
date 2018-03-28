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
      return this.displayedSubcategory = this.currentSubcategory;
    }
    this.displayedSubcategory = newSub;
    this.stockToggle = true;
  }
}
