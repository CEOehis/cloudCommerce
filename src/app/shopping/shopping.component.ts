import { Component, OnInit } from '@angular/core';
import * as data from '../itemsdata.json';
interface Subcategory {
  name: string,
  items: Object[]
}

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})


export class ShoppingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  public itemsList = data;

  public subcategory: Subcategory = data[0].subcategories[0];

  display(subcategory: Subcategory) {
    console.log(subcategory);
    this.subcategory = subcategory;
    console.log('sub is: ', this.subcategory);
  }
}
