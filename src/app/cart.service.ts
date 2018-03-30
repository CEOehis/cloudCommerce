import { Injectable } from '@angular/core';
import { Item } from './item';

interface CartItem extends Item {
  qty?: number;
}

@Injectable()
export class CartService {
  cart: CartItem[] = [];
  subTotal: number;
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
}
