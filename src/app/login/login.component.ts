import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {LoginService} from "../service/login/login.service";
import {TokenService} from "../service/login/token.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShareService} from "../service/login/share.service";
import Swal from "sweetalert2";
import {CartService} from "../service/cart/cart.service";
import {Cart} from "../entity/cart";

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    rememberMe: new FormControl(true),
  });
  name = 'Thông tin cá nhân';
  message = ''
  isBuying = false;
  islogged = false;
  cart:Cart[] = []
  constructor(private cartService: CartService, private activate: ActivatedRoute, private title: Title, private loginService: LoginService, private token: TokenService, private router: Router, private share: ShareService) {

  }


  ngOnInit(): void {
    window.scroll(0, 340)
    this.activate.paramMap.subscribe(next => {
      let cart = next.get('cart');
      if (cart == 'true') {
        this.isBuying = true;
      }
    })
    this.loadCart()
    this.share.getClickEvent().subscribe(next => {
       this.loadCart()
    })
    this.title.setTitle('Trang Đăng Nhập');
    this.islogged = this.token.isLogger();
    if (this.islogged) {
      this.router.navigateByUrl('/')
    }
  }
  loadCart() {
    this.islogged = this.token.isLogger();
    this.cart = this.token.getCartSession();
  }
  async login() {
    console.log('vao ben tren ne`')
    if(this.islogged || this.token.isLogger()) {
      return
    }
    console.log('vao login ne`')
    this.loginService.login(this.form.value).subscribe(next => {
        if (this.form.controls.rememberMe.value) {
          this.token.rememberMe(next.token, next.id, next.name, next.username, next.phoneNumber, next.email, next.address, next.age,
            next.gender, next.dateOfBirth, next.avatar, next.roles, 'local');

        } else {
          this.token.rememberMe(next.token, next.id, next.name, next.username, next.phoneNumber, next.email, next.address, next.age,
            next.gender, next.dateOfBirth, next.avatar, next.roles, 'session');
        }
      this.islogged = true


      Toast.fire({
        iconHtml: '<img style="width: 90px;height: 90px;" src="https://i.imgur.com/dKc3V77.png">',
        title: 'Chào mừng ' + next.name + ' đã quay trở lại!'
      })
      if (this.cart != null) {
        if (this.cart.length != 0) {
          this.cartService.setCartToUser(this.cart, next.id).subscribe(
            next => {
              this.cart = [];
              this.token.dropCartSessionToUser();
            }
          )
        }
      }
      this.share.sendClickEvent();
      if (this.isBuying) {
        this.router.navigateByUrl('/cart')
      } else {

        this.router.navigateByUrl('/')
      }
      }, error => {
        console.log(error)
        if (error.error) {
          for (let i = 0; i < error.error.length; i++) {
            this.message = error.error[i].defaultMessage
          }
        }
        if (error.error.message) {
          this.message = error.error.message
        }
      }
    )

  }


}
