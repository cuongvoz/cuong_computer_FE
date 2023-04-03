import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartComponent} from "./cart.component";
import {BuyComponent} from "./buy/buy.component";
import {BuyGuard} from "../security/buy.guard";


const routes: Routes = [
  {path: '',component:CartComponent},
  {path: 'buy',component:BuyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
