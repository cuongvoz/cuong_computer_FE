import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login/login.service";
import {Router} from "@angular/router";
import {TokenService} from "../../service/login/token.service";
import {ShareService} from "../../service/login/share.service";
import {User} from "../../entity/user";
import {Cart} from "../../entity/cart";
import Swal from "sweetalert2";
import {CartService} from "../../service/cart/cart.service";

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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cart: Cart[] = [];
  user: User;
  role = 'none';
  name = 'Đăng nhập'
  isLogged = false;
  quantity = 0;
  total = 0;
  isBuying = false;
  constructor(private cartService: CartService, private login: LoginService, private token: TokenService, private router: Router, private share: ShareService) {

    this.share.getClickEvent().subscribe(next => {
      this.isLogged = this.token.isLogger()
      this.loader()
      this.getAllValue()
      this.getAllSessionCart()
    })
  }


  ngOnInit(): void {
    this.isLogged = this.token.isLogger()
    this.loader();
    this.getAllValue()
    this.getAllSessionCart()
    this.share.getClickEvent().subscribe(next => {
      this.isLogged = this.token.isLogger()
      this.loader();
      this.getAllSessionCart()
    })
  }

  loader() {
    if (this.isLogged) {
      this.login.profile(this.token.getId()).subscribe(next => {
        this.user = next;
        this.getAll()
        this.role = this.token.getRole();
        this.getAllValue()
      })
    } else {
      this.cart = this.token.getCartSession()
      this.share.getClickEvent().subscribe(next => {
        this.cart = this.token.getCartSession()
        if (this.cart != null) {
          this.getAllValue()

        }
      })
    }

  }

  getAllSessionCart() {
    if (!this.isLogged) {
      this.cart = this.token.getCartSession()
    }
  }

  getAll() {
    this.cartService.getCartByUser(this.user.id).subscribe(next => {
      this.cart = next
      this.getAllValue();
    })
  }

  logout() {
    this.token.logout();
    Toast.fire({
      iconHtml: '<img style="width: 90px;height: 90px" src="https://i.imgur.com/dKc3V77.png">',
      title: 'Hẹn gặp lại quý khách ' + this.user.name + '!'
    })
    this.role = 'none';
    this.isLogged = false;
    this.user = {id: 9999}
    this.cart = [];
    this.getAllValue()
    this.router.navigateByUrl('/');
    this.share.sendClickEvent()
  }

  change(id: string) {
    this.router.navigate(['/list/search/' + id + '/null'])
  }

  search(name: string, category: string) {
    if (name == '') {
      name = null;
    }
    this.router.navigate(['/list/search/' + category + '/' + name]);

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


  changeQuantity(operator: string, id: number, index: number) {
    if (this.isLogged) {
      this.cartService.changeQuantity(operator, id).subscribe(next => {
        this.cartService.getCartByUser(this.user.id).subscribe(
          next => {
            this.cart = next
            this.getAllValue();
          }
        )
      })
      this.share.sendClickEvent()
    } else {
      this.token.changeQuantitySession(operator, index);
      this.share.sendClickEvent();
    }
  }

  deleteCart(id: number, index: number) {
    if (this.isLogged) {
      this.cartService.deleteCart(id).subscribe(next => {
        this.share.getClickEvent().subscribe(next => {
          this.cartService.getCartByUser(this.user.id).subscribe(
            next => {
              this.cart = next
              this.getAllValue();
            }
          )
        })
      });
    } else {
      this.token.deleteCartSessionIndex(index)
      this.getAllValue();
    }
    this.share.sendClickEvent()

  }

  dropCart() {
    if (this.cart == null) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Giỏ hàng trống ,vui lòng chọn mặt hàng!',
        showConfirmButton: false,
        timer: 1500
      });
    }
    else if (this.cart.length == 0) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Giỏ hàng trống ,vui lòng chọn mặt hàng!',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      if (this.isLogged) {
        this.token.dropCart(this.user.id)

      } else {
        this.token.dropCartSession()
      }
      this.share.sendClickEvent()
      this.getAll();
    }
  }

  chec2k() {
    this.getAllSessionCart()
    console.log(this.cart)
  }


}
