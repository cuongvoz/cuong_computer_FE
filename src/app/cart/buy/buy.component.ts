import {Component, OnInit} from '@angular/core';
import {Cart} from "../../entity/cart";
import {Product} from "../../entity/product";
import {User} from "../../entity/user";
import {TokenService} from "../../service/login/token.service";
import {ShareService} from "../../service/login/share.service";
import {Title} from "@angular/platform-browser";
import {CartService} from "../../service/cart/cart.service";
import {Router} from "@angular/router";
import {LoginService} from "../../service/login/login.service";
import {ProductService} from "../../service/product/product.service";
import Swal from "sweetalert2";
import {FormControl, FormGroup} from "@angular/forms";
import { render } from 'creditcardpayments/creditCardPayments';
import {CurrencyPipe, DatePipe, DecimalPipe} from "@angular/common";
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  cart: Cart[] = [];
  quantity = 0;
  total = 0;
  user: User;
  userInfo = true;
  form = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    phoneNumber: new FormControl(),
    address: new FormControl(),
  })
  isShow = false
  constructor(private datePipe:DatePipe,
              private token: TokenService,
              private share: ShareService,
              private title: Title,
              private cartService: CartService,
              private router: Router,
              private loginService: LoginService,
              private currencyPipe:CurrencyPipe,
              private decimalPipe:DecimalPipe
  ) {
  }

  ngOnInit(): void {

    this.check()
    this.getAllValue();
    this.share.getClickEvent().subscribe(next => {
      this.check()
      this.getAllValue();
    })

    this.title.setTitle('Thanh Toán');
    window.scroll(0, 0)


  }

  check() {
    this.loginService.profile(this.token.getId()).subscribe(
      next => {
        this.user = next;
        this.form.patchValue(next);
        this.cartService.getCartByUser(this.user.id).subscribe(
          next => {
            this.cart = next
            this.getAllValue();
          }
        );
      }
    )
  }
  show() {
    this.isShow = true
    let money = +(this.total / 23485.48).toFixed(2);
    render(
      {
        id: "#payments",
        currency: "USD",
        value: String(money),
        onApprove: (details) => {
         this.buy();
          this.router.navigateByUrl('/')
          this.share.sendClickEvent()
        }
      }
    );
  }
  getAll() {
    this.cartService.getCartByUser(this.user.id).subscribe(
      next => {
        this.cart = next
        this.getAllValue();
      }
    );
    this.share.getClickEvent().subscribe(
      next => {
        this.cartService.getCartByUser(this.user.id).subscribe(
          next => {
            this.cart = next
            this.getAllValue();
          }
        );
      }
    )
  }


  getAllValue() {
    this.quantity = 0;
    this.total = 0;
    if (this.cart != null) {
      for (let i = 0; i < this.cart.length; i++) {
        this.quantity += this.cart[i].quantity;
        this.total += this.cart[i].product.price * this.cart[i].quantity
      }
    }

  }

  detail(): string {
    let detail = '';
    let currentTime = new Date();
    let formattedTime = currentTime.toLocaleString();
    for (let i = 0; i < this.cart.length; i++) {
      if (i + 1 == this.cart.length) {

        detail += this.cart[i].quantity + ' ' + this.cart[i].product.category.name.toLowerCase() + ' ' + this.cart[i].product.name
      } else {
        detail += this.cart[i].quantity + ' ' + this.cart[i].product.category.name.toLowerCase() + ' ' + this.cart[i].product.name + ' và '
      }
    }
    detail += ' vào lúc ' + formattedTime;
    return detail
  }


  buy() {
    let currentTime = new Date();
    let formattedTime = currentTime.toLocaleString();
    this.cartService.buy(this.total, this.quantity, this.user.id, formattedTime).subscribe(
      next => {
        Swal.fire({
          title: 'Chúc mừng bạn ' + this.user.name + ' đã đặt hàng thành công!',
          imageUrl: 'https://cdn0.iconfinder.com/data/icons/people-137/513/gamer-512.png',
          text: 'Bạn đã mua ' + this.detail() +
            ', tổng hóa đơn thanh toán của bạn là ' + this.total + ' VNĐ!',
          showConfirmButton: true,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonText: 'Xác nhận',
          confirmButtonColor: '#005ec4',
        });
        this.share.sendClickEvent();
        this.getAll();
      }
    )
  }

}
