import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../service/login/login.service";
import {Router} from "@angular/router";
import {TokenService} from "../../service/login/token.service";
import {ShareService} from "../../service/login/share.service";
import {User} from "../../entity/user";
import {Cart} from "../../entity/cart";
import Swal from "sweetalert2";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  carts : number= 0;
  cart: Cart[] = [];
  user: User;
  role = 'none';
  name = 'Đăng nhập'
  isLogged = false;
  quantity = 0;
  total = 0;
  constructor(private login:LoginService,private token: TokenService,private router: Router,private share: ShareService) {
  }


  ngOnInit(): void {
    this.loader();
    this.share.getClickEvent().subscribe(() => {
      this.loader();
    })
  }

  loader() {

    if (this.token.getCart() == undefined) {
      this.carts == 0;
    } else {
      this.carts =this.token.getCart().length;
      this.cart = this.token.getCart();
    }
  this.getAllValue()
    this.isLogged = this.token.isLogger()
    if (this.isLogged) {
      this.login.profile(this.token.getId()).subscribe(next => {
        this.user = next;
        this.name = this.user.name;
      })
      this.role = this.token.getRole();
    }
  }

  getAll() {
    if (this.token.getCart() != undefined) {
      this.cart = this.token.getCart();
      this.getAllValue();
    }
  }
  logout() {
    this.role = 'none';
    this.name = 'Đăng nhập';
    this.isLogged = false;
    this.token.logout();
    this.router.navigateByUrl('/');
  }
  change(id: string) {
    this.router.navigate(['/list/search/'+id+'/null'])
  }
  search(name: string, category: string) {
     if (name == '') {
       name = null;
     }
          this.router.navigate(['/list/search/'+category + '/' + name]);

  }
  getAllValue() {
    this.quantity = 0;
    this.total = 0;
    for (let i = 0; i < this.cart.length; i++) {
      this.quantity += this.cart[i].quantity;
      this.total += this.cart[i].price * this.cart[i].quantity
    }
  }
  delete(id:number) {
    for (let i = 0 ; i < this.cart.length;i++) {
      if (this.cart[i].id == id) {
        this.cart.splice(i,1);
        break;
      }
    }
    this.token.setCart(this.cart);
    this.share.sendClickEvent();
    this.getAll();
    this.getAllValue();
  }
  upQuantity(id:number) {
    for (let i = 0 ; i < this.cart.length;i++) {
      if (this.cart[i].id == id) {
        this.cart[i].quantity += 1;
        break;
      }
    }
    this.token.setCart(this.cart);
    this.share.sendClickEvent();
    this.getAll();
  }
  downQuantity(id:number) {
    for (let i = 0 ; i < this.cart.length;i++) {
      if (this.cart[i].id == id) {
        if (this.cart[i].quantity == 1) {
          this.cart.splice(i,1);
        } else {
          this.cart[i].quantity -= 1;
        }
        break;
      }
    }
    this.token.setCart(this.cart);
    this.share.sendClickEvent();
    this.getAll();
  }

  dropCart() {
    let cart = []
    this.token.setCart(cart);
    this.share.sendClickEvent();
    this.quantity = 0;
    this.total = 0;
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Bạn đã xóa giỏ hàng thành công!',
      showConfirmButton: false,
      timer: 1500
    });
    this.getAll();
  }
}
