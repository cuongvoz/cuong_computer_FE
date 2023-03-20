import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartComponent} from "../cart/cart.component";
import {ProductComponent} from "./product.component";


const routes: Routes = [{path: 'detail/:id',component:ProductComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
