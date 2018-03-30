import { Injectable } from '@angular/core';
import { Item } from './item';

interface CartItem extends Item {
  qty?: number;
}

@Injectable()
export class CartService {
  cart: CartItem[] = [];
  constructor() { 
  }

  removeCartItem(i) {
    this.cart.splice(i, 1);
  }
}
