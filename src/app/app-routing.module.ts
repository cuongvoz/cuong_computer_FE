import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {ProductComponent} from "./product/product.component";
import {CartComponent} from "./cart/cart.component";


const routes: Routes = [
  {path: 'home',component: HomeComponent},
  {path: 'login',component: LoginComponent},
  {path: 'product',component: ProductComponent},
  {path: 'cart',component: CartComponent},
  {path: '',component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
