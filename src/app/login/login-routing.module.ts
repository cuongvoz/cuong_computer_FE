import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CartComponent} from "../cart/cart.component";
import {LoginComponent} from "./login.component";


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: ':cart', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
