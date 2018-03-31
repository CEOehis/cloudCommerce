import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { CartService } from '../cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface CartItem extends Item {
  qty?: number
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  checkoutForm: FormGroup;
  name: FormControl;
  address: FormControl;
  city: FormControl;
  phone: FormControl;

  
  constructor(public cartService: CartService) { }

  ngOnInit() {
    this.cartService.getSubTotal();

    this.createFormControls();
    this.createForm();
  }
  
  createFormControls() {
    this.name = new FormControl('', [Validators.required, Validators.minLength(4)]),
    this.address = new FormControl('', Validators.required),
    this.city = new FormControl('', Validators.required),
    this.phone = new FormControl('', Validators.required)
  }
  
  createForm() {
    this.checkoutForm = new FormGroup({
      name: this.name,
      address: this.address,
      city: this.city,
      phone: this.phone
    })
  }

  removeItem(i) {
    this.cartService.removeCartItem(i);
  }

  processOrder() {
    if (this.checkoutForm.valid) {
      console.log(this.checkoutForm.value)
      var formValue = this.checkoutForm.value;
      var message = `${formValue.name} thanks for shopping with us. Your purchase worth ll has been processed and will be shipped to ${formValue.address}, ${formValue.city}!`
      alert(message);
      this.checkoutForm.reset();
    } else {
      Object.keys(this.checkoutForm.controls).forEach(field => { // {1}
        const control = this.checkoutForm.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
    }
  }

}
