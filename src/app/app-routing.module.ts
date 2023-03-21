import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./security/auth.guard";
import {LoginGuard} from "./security/login.guard";


const routes: Routes = [
  {path: '',loadChildren: () => import('./home/home-routing.module').then(module => module.HomeRoutingModule)},
  {path: 'login',loadChildren: () => import('./login/login-routing.module').then(module => module.LoginRoutingModule),canActivate:[LoginGuard]},
  {path: 'product',loadChildren: () => import('./product/product-routing.module').then(module => module.ProductRoutingModule)},
  {path: 'cart',loadChildren: () => import('./cart/cart-routing.module').then(module => module.CartRoutingModule)},
  {path:'profile',loadChildren: () => import('./profile/profile-routing.module').then(module => module.ProfileRoutingModule),canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
