import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./security/auth.guard";
import {LoginGuard} from "./security/login.guard";
import {NewsRoutingModule} from "./news/news-routing.module";
import {ErrorComponent} from "./error/error.component";
import {EmployeeGuard} from "./security/employee.guard";
import {UserGuard} from "./security/user.guard";


const routes: Routes = [
  {path: '',loadChildren: () => import('./home/home-routing.module').then(module => module.HomeRoutingModule)},
  {path: 'login',loadChildren: () => import('./login/login-routing.module').then(module => module.LoginRoutingModule),canActivate:[LoginGuard]},
  {path: 'product',loadChildren: () => import('./product/product-routing.module').then(module => module.ProductRoutingModule)},
  {path: 'cart',loadChildren: () => import('./cart/cart-routing.module').then(module => module.CartRoutingModule)},
  {path:'profile',loadChildren: () => import('./profile/profile-routing.module').then(module => module.ProfileRoutingModule),canActivate:[AuthGuard]},
  {path: 'manager',loadChildren: () => import('./manager/manager-routing.module').then(module => module.ManagerRoutingModule)},
  {path:'news',loadChildren: () => import('./news/news-routing.module').then(module => module.NewsRoutingModule)},
  {path:'error',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
