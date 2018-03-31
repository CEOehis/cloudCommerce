import { Injectable } from '@angular/core';
import { Item } from './item';

interface CartItem extends Item {
  qty?: number;
}

@Injectable()
export class CartService {
  cart: CartItem[] = [];
  subTotal: number;
  shipping: number = 10;
  total: number;  
  constructor() { 
  }

  removeCartItem(i) {
    this.cart.splice(i, 1);
  }

  getSubTotal() {
    var sum: number = 0;
    this.cart.forEach(item => {
      sum += item.qty * item.price;
    });
    this.subTotal = sum;
  }

  getToTal() {
    var _tempTotal = this.subTotal + (this.subTotal * 0.1);
    if(this.cart.length > 0) {
      this.total = _tempTotal + this.shipping;
    }
  }
}
