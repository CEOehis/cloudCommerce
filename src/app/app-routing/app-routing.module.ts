import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShoppingComponent } from '../shopping/shopping.component';
import { ProductComponent } from '../product/product.component';
import { CartComponent } from '../cart/cart.component';
import { ContactComponent } from '../contact/contact.component';
import { AboutComponent } from '../about/about.component';
import { HomepageComponent } from '../homepage/homepage.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'shopping', component: ShoppingComponent},
  {path: 'product', component: ProductComponent},
  {path: 'cart', component: CartComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'about', component: AboutComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
