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
  formSignUp = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    roles: new FormControl(['customer']),
  });
  errorFormSignUp = {
    username:{message: '' , check:false},
    password:{message: '' , check:false},
    confirmPassword:{message: '' , check:false},
    name:{message: '' , check:false},
    email:{message: '' , check:false},
  }
  name = 'Thông tin cá nhân';
  message = ''
  isBuying = false;
  islogged = false;
  cart:Cart[] = []
  constructor(private cartService: CartService, private activate: ActivatedRoute, private title: Title, private loginService: LoginService, private token: TokenService, private router: Router, private share: ShareService) {

  }

 resetError() {
   this.errorFormSignUp = {
     username:{message: '' , check:false},
     password:{message: '' , check:false},
     confirmPassword:{message: '' , check:false},
     name:{message: '' , check:false},
     email:{message: '' , check:false},
   }
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
    this.message = '';
    if(this.islogged || this.token.isLogger()) {
      return
    }
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
        iconHtml: '<img style="width: 90px;height: 90px;padding: 10px;border-radius: 50%;object-fit: cover" src="'+next.avatar+'">',
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
        if ( error.status == 400) {
          for (let i = 0; i < error.error.length; i++) {
            this.message = error.error[i].defaultMessage
          }
        }  else {
          this.message = 'Sai tài khoản hoặc mật khẩu'
        }
      }
    )

  }
  register() {
    this.resetError()
    this.loginService.register(this.formSignUp.value).subscribe(
      next => {
        document.getElementById('dissMis').click()
        Toast.fire({
          iconHtml: '<img style="width: 90px;height: 90px;object-fit: cover" src="https://i.imgur.com/dKc3V77.png">',
          title: 'Chúc mừng bạn ' + this.formSignUp.controls.name.value + ' đã tạo tài khoản thành công!'
        })
        this.formSignUp.reset()
      } ,error => {
        for (let i = 0; i < error.error.length; i++) {
          if (error.error[i].field == 'name') {
            this.errorFormSignUp.name.message = error.error[i].defaultMessage;
            this.errorFormSignUp.name.check = true;
            this.formSignUp.controls.name.reset()
          } else if (error.error[i].field == 'username') {
            this.errorFormSignUp.username.check = true;
            this.errorFormSignUp.username.message = error.error[i].defaultMessage;
            this.formSignUp.controls.username.reset()
          } else if (error.error[i].field == 'email') {
            this.errorFormSignUp.email.message = error.error[i].defaultMessage;
            this.errorFormSignUp.email.check = true;
            this.formSignUp.controls.email.reset()
          }else if (error.error[i].field == 'password') {
            this.errorFormSignUp.password.check = true;
            this.errorFormSignUp.password.message = error.error[i].defaultMessage;
            this.formSignUp.controls.password.reset()
          }else if (error.error[i].field == 'confirmPassword') {
            this.errorFormSignUp.confirmPassword.check = true;
            this.errorFormSignUp.confirmPassword.message = error.error[i].defaultMessage;
            this.formSignUp.controls.confirmPassword.reset()
          }
        }
      }
    )
  }

}
