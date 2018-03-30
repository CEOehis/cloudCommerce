import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { CartService } from '../cart.service';

interface CartItem extends Item {
  qty?: number
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  subTotal: number;
  shipping: number = 10;
  constructor(public cartService: CartService) { }

  ngOnInit() {
    this.cart = this.cartService.cart;
    this.cartService.getSubTotal();
  }

  removeItem(i) {
    this.cartService.removeCartItem(i);
  }

}
