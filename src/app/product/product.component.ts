import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Location } from '@angular/common';

import { Item } from '../item';
import { Subcategory } from '../subCategory';
import { ShoppingService } from '../shopping.service';
import { CartService } from '../cart.service';

interface CartItem extends Item {
  qty?: number
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private shoppingService: ShoppingService,
    private location: Location,
    private cartService: CartService
  ) { }
  productName: string;
  currentProduct: Item;
  itemsList;
  quantity: number = 1;
  ngOnInit() {
    this.itemsList = this.shoppingService.getCategories();
    this.route.queryParams
      .filter(params => params.name)
      .subscribe(params => {
        this.productName = params.name;
      });

    this.currentProduct = this.getProduct(this.productName);
    console.log(this.currentProduct);
  }

  getProduct(productName: string): Item {
    var foundProduct: Item
    this.itemsList.forEach(category => {
      var subCategories: Subcategory[] = category.subcategories;
      subCategories.forEach(subCategory => {
        var products: Item[] = subCategory.items;
        products.forEach(product => {
          if(product.name == productName) {
            foundProduct = product;
            return;
          }
        })
      })
    })
    return foundProduct;
  }
  
  goBack() {
    this.location.back();
  }

  addToCart(currentProduct) {
    var cartItem: CartItem = currentProduct;
    cartItem.qty = this.quantity;
    console.log(currentProduct);
    this.cartService.cart.push(currentProduct);
    console.log(this.cartService.cart);
  }
  
}
