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
const Toast = Swal.mixin({
  toast: true,
  position: 'center-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
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
      Toast.fire({
        iconHtml: '<img style="background: white;width: 90px;height: 90px;object-fit: cover;padding: 10px"  src="'+ product.image+'">',
        title: 'Bạn đã thêm ' + product.category.name.toLowerCase() + ' ' + product.name + ' vào giỏ!'
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
          imageUrl: 'data:image/png;base64,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',
          imageWidth:180,
          imageHeight:170,
          customClass:'text',
          title: 'Bạn đã xóa giỏ hàng thành công!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    )
  }

  public getStorage() {
    if (localStorage.getItem(STORAGE) == 'local' || sessionStorage.getItem(STORAGE) == 'local') {
      return localStorage.getItem(STORAGE);
    } else {
      return sessionStorage.getItem(STORAGE);
    }
  }
  public getCartSession() {
    const carts = sessionStorage.getItem(CART);
      this.cart = JSON.parse(carts);
      return this.cart
  }
  public buyCartSessionDetail(product:Product,quantity:number) {
    if ( this.getCartSession() != undefined) {
      this.cart = this.getCartSession()
      let cartDto:Cart = {
        id:product.id,
        product:product,
        quantity:quantity
      }
      if (this.checkExistSession(product.id,this.cart) != -1) {
        this.cart[this.checkExistSession(product.id,this.cart)].quantity += quantity;
      } else {
        this.cart.push(cartDto)
      }
      this.setCart(this.cart)
    } else {
      let cart:Cart[] =[];
      let cartDto:Cart = {
        product:product,
        quantity:quantity
      }
      cart.push(cartDto);
      this.setCart(cart);
    }
    this.share.sendClickEvent()
  }
  public addCartSessionDetail(product:Product,quantity:number) {
    if ( this.getCartSession() != undefined) {
      this.cart = this.getCartSession()
      let cartDto:Cart = {
        id:product.id,
        product:product,
        quantity:quantity
      }
      if (this.checkExistSession(product.id,this.cart) != -1) {
        this.cart[this.checkExistSession(product.id,this.cart)].quantity += quantity;
      } else {
        this.cart.push(cartDto)
      }

    } else {
      let cart:Cart[] =[];
      let cartDto:Cart = {
        product:product,
        quantity:quantity
      }
      cart.push(cartDto);
      this.setCart(cart);
    }
    Swal.fire({
      title:'Bạn đã thêm sản phẩm ' + product.name +' vào giỏ!',
      imageUrl: product.image,
      showConfirmButton: false,
      timer: 2000,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
    this.share.sendClickEvent()
  }
  public addCartSession(product:Product,quantity) {
    // debugger
    if ( this.getCartSession() != undefined) {
      this.cart = this.getCartSession()
      let cartDto:Cart = {
        id:product.id,
        product:product,
        quantity:quantity
      }
       if (this.checkExistSession(product.id,this.cart) != -1) {
         this.cart[this.checkExistSession(product.id,this.cart)].quantity += quantity;
       } else {
          this.cart.push(cartDto)
       }
      this.setCart(this.cart);
    }
    else {
      let cart:Cart[] =[];
      let cartDto:Cart = {
        product:product,
        quantity:quantity
      }
      cart.push(cartDto);
      this.setCart(cart);
    }
    Toast.fire({
      iconHtml: '<img style="width: 90px;height: 90px;object-fit: cover;padding: 10px 10px 10px 10px"  src="'+ product.image+'">',
      title: 'Bạn đã thêm ' + product.category.name.toLowerCase() + ' ' + product.name + ' vào giỏ!'
    })
   this.share.sendClickEvent()
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
  public checkExistSession(id:number,cart:Cart[]) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product.id == id) {
        return i
      }
    }
    return -1;
  }
  public setCart(cart: Cart[]) {
    sessionStorage.removeItem(CART);
    sessionStorage.setItem(CART, JSON.stringify(cart));
  }

  public deleteCartSessionIndex(index:number) {
    this.cart = this.getCartSession();
    this.cart.splice(index,1)
    this.setCart(this.cart);
  }

  public dropCartSession() {
    let cart = []
    this.setCart(cart);
    this.share.sendClickEvent();
    Swal.fire({
      position: 'center',
      imageUrl: 'data:image/png;base64,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',
      imageWidth:180,
      imageHeight:170,
      customClass:'text',
      title: 'Bạn đã xóa giỏ hàng thành công!',
      showConfirmButton: false,
      timer: 1500
    });
  }
  public dropCartSessionToUser() {
      let cart = []
      this.setCart(cart);
      this.share.sendClickEvent();

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
