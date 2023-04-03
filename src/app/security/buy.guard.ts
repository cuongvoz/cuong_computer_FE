import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from "../service/login/token.service";
import {CartService} from "../service/cart/cart.service";
import {Cart} from "../entity/cart";

@Injectable({
  providedIn: 'root'
})
export class BuyGuard implements CanActivate {
  cart:Cart[] = [];
  constructor(private token:TokenService,private cartService:CartService,private router:Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.cartService.getCartByUser(parseInt(this.token.getId())).subscribe(
      next => {
        this.cart = next;
      }
    )
    if (this.token.isLogger()) {
      if (this.cart.length == 0) {
        this.router.navigateByUrl('/cart')
        return false
      } else {
        return true
      }
    } else {
      this.router.navigateByUrl('/cart')
      return false
    }
  }

}
