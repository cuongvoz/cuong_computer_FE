import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Cart} from "../../entity/cart";
import {Observable} from "rxjs";
import {TokenService} from "../login/token.service";
import {Product} from "../../entity/product";
import {LoginService} from "../login/login.service";
import {User} from "../../entity/user";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
  }

  buy(total: number,quantity, id:number, time: string): Observable<any> {
    let buyDTO = {
      id:id,
      quantity:quantity,
      total:total,
      time:time
    }
    return this.http.post<any>('http://localhost:8080/api/cart/buy/',buyDTO)
  }
  putQuantity(id_user: number, id:number,quantity:string,type: string): Observable<any> {
    let putDto = {
      id: id,
      idUser: id_user,
      quantity:quantity,
      type:type
    }
    return this.http.post<any>('http://localhost:8080/api/cart/buyDetail',putDto)
  }
  changeQuantity(operator:string,id:number): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/cart/change/'+operator + '/' +id)
  }
  setCartToUser(cart:Cart[],id:number) {
    console.log(cart)
    let cartUserDto = {
      carts: cart,
      id: id
    }
    return this.http.post<any>('http://localhost:8080/api/cart/userCart',cartUserDto)
  }

  deleteCart(id:number): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/cart/delete/' +id)
  }
  getCartByUser(id:number): Observable<Cart[]> {
    return this.http.get<Cart[]>('http://localhost:8080/api/cart/' +id)
  }
  dropCart(id:number): Observable<Cart[]> {
    return this.http.get<Cart[]>('http://localhost:8080/api/cart/drop/' +id)
  }
  addToCart(product: Product,user:User): Observable<any> {
    let cart: Cart = {
      user: user, id: null, product: product, quantity: 1
    }
    return this.http.post<any>('http://localhost:8080/api/cart/add/',cart);
  }
}
