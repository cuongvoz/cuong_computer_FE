import {Injectable} from '@angular/core';
import {Cart} from "../../entity/cart";
import {Product} from "../../entity/product";
import {ShareService} from "./share.service";
import Swal from "sweetalert2";
import {CartService} from "../cart/cart.service";
import {User} from "../../entity/user";
import {LoginService} from "./login.service";

const TOKEN = 'Token_key';
const ID = 'Id_key';
const NAME = 'Name_key';
const USERNAME = 'Username_key';
const PHONENUMBER = 'PhoneNumber';
const EMAIL = 'Email_key';
const ADDRESS = 'Address_key';
const GENDER = 'Gender_key';
const DATEOFBIRTH = 'DateOfBirth_key';
const AVATAR = 'Avatar_key';
const ROLE = 'Role_key';
const STORAGE = 'Storage_key';
const CART = 'Cart_key';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  json = '';
  cart: Cart[] = [];

  constructor(private share: ShareService, private cartService: CartService) {
  }

  isLogger() {
    return !!this.getToken();
  }

  public setStorage(storage: string) {
    localStorage.removeItem(STORAGE);
    localStorage.setItem(STORAGE, storage);
    sessionStorage.removeItem(STORAGE);
    sessionStorage.setItem(STORAGE, storage);
  }

  public addToCart(product: Product, user: User) {
    this.cartService.addToCart(product, user).subscribe(next => {
      Swal.fire({
        title: 'Bạn đã thêm ' + product.category.name.toLowerCase() + ' ' + product.name + ' vào giỏ!',
        imageUrl: product.image,
        showConfirmButton: false,
        timer: 2000,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
    })
    this.share.sendClickEvent();

  }
  public dropCart(id:number) {
    this.cartService.dropCart(id).subscribe(
      next => {
        this.share.sendClickEvent();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bạn đã xóa giỏ hàng thành công!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    )
  }

  public getStorage() {
    this.setCart(this.cart);
    if (localStorage.getItem(STORAGE) == 'local' || sessionStorage.getItem(STORAGE) == 'local') {
      return localStorage.getItem(STORAGE);
    } else {
      return sessionStorage.getItem(STORAGE);
    }
  }
  public getCartSession() {
    const carts = sessionStorage.getItem(CART);
    if(carts == 'undefined') {
      return this.cart;
    } else {
      this.cart = JSON.parse(carts);
      return this.cart;
    }
  }
  public addCartSession(product:Product) {
    // if ( this.getCartSession() != undefined) {
      let cart:Cart[] = []
      let cartDto:Cart = {
        product:product,
        quantity:1
      }
       // if (!this.checkExistSession(product.id)) {
         cart.push(cartDto);
         this.setCart(cart);
       // }
      Swal.fire({
        title: 'Bạn đã thêm ' + product.category.name.toLowerCase() + ' ' + product.name + ' vào giỏ!',
        imageUrl: product.image,
        showConfirmButton: false,
        timer: 2000,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
    // }
    // else {
    //   let cart:Cart[] =[];
    //   let cartDto:Cart = {
    //     product:product,
    //     quantity:1
    //   }
    //   cart.push(cartDto);
    //   this.setCart(cart);
    //   Swal.fire({
    //     title: 'Bạn đã thêm ' + product.category.name.toLowerCase() + ' ' + product.name + ' vào giỏ!',
    //     imageUrl: product.image,
    //     showConfirmButton: false,
    //     timer: 2000,
    //     imageWidth: 200,
    //     imageHeight: 200,
    //     imageAlt: 'Custom image',
    //   })
    // }

  }
  public changeQuantitySession(operator:string,index:number) {
    let cart:Cart[] = this.getCartSession();
    if (operator == '-') {
      if (cart[index].quantity == 1) {
        cart.splice(index,1)
      } else {
        cart[index].quantity = cart[index].quantity -1;
      }
    } else {
      cart[index].quantity = cart[index].quantity +1;
    }
    this.setCart(cart)
  }
  public checkExistSession(id:number) {
    let cart = this.getCartSession();
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product.id == id) {
        cart[i].quantity = cart[i].quantity += 1;
        this.setCart(cart);
        return true;
      }
    }
    return false;
  }
  public setCart(cart: Cart[]) {
    sessionStorage.removeItem(CART);
    sessionStorage.setItem(CART, JSON.stringify(cart));
  }

  public dropCart2() {
    let cart = []
    this.setCart(cart);
    this.share.sendClickEvent();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Bạn đã xóa giỏ hàng thành công!',
      showConfirmButton: false,
      timer: 1500
    });
  }



  public setToken(token: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(TOKEN);
      localStorage.setItem(TOKEN, token);
    } else {
      sessionStorage.removeItem(TOKEN);
      sessionStorage.setItem(TOKEN, token);
    }
  }

  public getToken() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(TOKEN);
    } else {
      return sessionStorage.getItem(TOKEN);
    }
  }

  public setId(id: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(ID);
      localStorage.setItem(ID, id);
    } else {
      sessionStorage.removeItem(ID);
      sessionStorage.setItem(ID, id);
    }
  }

  public getId() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(ID);
    } else {
      return sessionStorage.getItem(ID);
    }
  }

  public setName(name: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(NAME);
      localStorage.setItem(NAME, name);
    } else {
      sessionStorage.removeItem(NAME);
      sessionStorage.setItem(NAME, name);
    }
  }

  public getName() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(NAME);
    } else {
      return sessionStorage.getItem(NAME);
    }
  }

  public setUsername(username: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(USERNAME);
      localStorage.setItem(USERNAME, username);
    } else {
      sessionStorage.removeItem(USERNAME);
      sessionStorage.setItem(USERNAME, username);
    }
  }

  public getUsername() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(USERNAME);
    } else {
      return sessionStorage.getItem(USERNAME);
    }
  }

  public setPhoneNumber(number: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(PHONENUMBER);
      localStorage.setItem(PHONENUMBER, number);
    } else {
      sessionStorage.removeItem(PHONENUMBER);
      sessionStorage.setItem(PHONENUMBER, number);
    }
  }

  public getPhoneNumber() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(PHONENUMBER);
    } else {
      return sessionStorage.getItem(PHONENUMBER);
    }
  }

  public setEmail(email: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(EMAIL);
      localStorage.setItem(EMAIL, email);
    } else {
      sessionStorage.removeItem(EMAIL);
      sessionStorage.setItem(EMAIL, email);
    }
  }

  public getEmail() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(EMAIL);
    } else {
      return sessionStorage.getItem(EMAIL);
    }
  }

  public setAddress(address: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(ADDRESS);
      localStorage.setItem(ADDRESS, address);
    } else {
      sessionStorage.removeItem(ADDRESS);
      sessionStorage.setItem(ADDRESS, address);
    }
  }

  public getAddress() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(ADDRESS);
    } else {
      return sessionStorage.getItem(ADDRESS);
    }
  }


  public setGender(gender: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(GENDER);
      localStorage.setItem(GENDER, gender);
    } else {
      sessionStorage.removeItem(GENDER);
      sessionStorage.setItem(GENDER, gender);
    }
  }

  public getGender() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(GENDER);
    } else {
      return sessionStorage.getItem(GENDER);
    }
  }

  public setDateOfBirth(date: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(DATEOFBIRTH);
      localStorage.setItem(DATEOFBIRTH, date);
    } else {
      sessionStorage.removeItem(DATEOFBIRTH);
      sessionStorage.setItem(DATEOFBIRTH, date);
    }
  }

  public getDateOfBirth() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(DATEOFBIRTH);
    } else {
      return sessionStorage.getItem(DATEOFBIRTH);
    }
  }

  public setAvatar(avatar: string) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(AVATAR);
      localStorage.setItem(AVATAR, avatar);
    } else {
      sessionStorage.removeItem(AVATAR);
      sessionStorage.setItem(AVATAR, avatar);
    }
  }

  public getAvatar() {
    if (this.getStorage() == 'local') {
      return localStorage.getItem(AVATAR);
    } else {
      return sessionStorage.getItem(AVATAR);
    }
  }

  public setRole(role: string[]) {
    if (this.getStorage() == 'local') {
      localStorage.removeItem(ROLE);
      localStorage.setItem(ROLE, JSON.stringify(role));
    } else {
      sessionStorage.removeItem(ROLE);
      sessionStorage.setItem(ROLE, JSON.stringify(role));
    }
  }

  public getRole(): string {
    if (this.getStorage() == 'local') {
      let roles = JSON.parse(<string>localStorage.getItem(ROLE));
      return roles[0].authority;
    } else {
      let roles = JSON.parse(<string>sessionStorage.getItem(ROLE));
      return roles[0].authority;
    }
  }

  rememberMe(token, id, name, username, phonenumber, email, address, age, gender, dateOfBirth, avatar, roles, storage) {
    this.setStorage(storage);
    this.setToken(token);
    this.setId(id);
    this.setName(name);
    this.setUsername(username);
    this.setPhoneNumber(phonenumber);
    this.setEmail(email);
    this.setAddress(address);
    this.setGender(gender);
    this.setDateOfBirth(dateOfBirth);
    this.setAvatar(avatar);
    this.setRole(roles);
  }

  logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
}
