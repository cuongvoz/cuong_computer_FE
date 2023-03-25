import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login/login.service";
import {Router} from "@angular/router";
import {TokenService} from "../../service/login/token.service";
import {ShareService} from "../../service/login/share.service";
import {User} from "../../entity/user";
import {Cart} from "../../entity/cart";
import Swal from "sweetalert2";
import {CartService} from "../../service/cart/cart.service";

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

  constructor(private cartService: CartService, private login: LoginService, private token: TokenService, private router: Router, private share: ShareService) {

  }


  ngOnInit(): void {
    this.isLogged = this.token.isLogger()
    this.loader();
     // this.getAllSessionCart()
    this.share.getClickEvent().subscribe(next => {
      this.isLogged = this.token.isLogger()
      this.loader();
      // this.getAllSessionCart()

    })
  }

  loader() {
    if (this.isLogged) {
      this.login.profile(this.token.getId()).subscribe(next => {
        this.user = next;
        this.getAll()
      })
      this.role = this.token.getRole();
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
    this.role = 'none';
    this.isLogged = false;
    this.user = {id: 9999}
    // this.share.sendClickEvent();
    this.getAll();
    this.token.logout();
    this.router.navigateByUrl('/');
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
    for (let i = 0; i < this.cart.length; i++) {
      this.quantity += this.cart[i].quantity;
      this.total += this.cart[i].product.price * this.cart[i].quantity
    }
  }


  changeQuantity(operator: string, id: number) {
    this.cartService.changeQuantity(operator, id).subscribe(next => {
      this.share.sendClickEvent()
      this.cartService.getCartByUser(this.user.id).subscribe(
        next => {
          this.cart = next
          this.getAllValue();
        }
      )
    })
  }

  deleteCart(id: number) {
    this.cartService.deleteCart(id).subscribe(next => {
      this.share.sendClickEvent()
      this.share.getClickEvent().subscribe(next => {
        this.cartService.getCartByUser(this.user.id).subscribe(
          next => {
            this.cart = next
            this.getAllValue();
          }
        )
      })
    });
  }

  dropCart() {
    if (this.cart.length == 0) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Giỏ hàng trống ,vui lòng chọn mặt hàng!',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      this.token.dropCart(this.user.id)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Bạn đã xóa giỏ hàng thành công!',
        showConfirmButton: false,
        timer: 1500
      });
    }
    this.share.sendClickEvent()
    this.getAll();

  }

  chec2k() {
    this.getAllSessionCart()
    console.log(this.cart)
  }
}
