import {Component, OnInit} from '@angular/core';
import {Cart} from "../entity/cart";
import {TokenService} from "../service/login/token.service";
import {ShareService} from "../service/login/share.service";
import Swal from "sweetalert2";
import {Title} from "@angular/platform-browser";
import {CartService} from "../service/cart/cart.service";
import {Router} from "@angular/router";
import {User} from "../entity/user";
import {LoginService} from "../service/login/login.service";
import {Product} from "../entity/product";
import {ProductService} from "../service/product/product.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart[] = [];
  products: Product[] = []
  quantity = 0;
  total = 0;
  user: User;
  isLogged = false;
  constructor(private token: TokenService, private share: ShareService, private title: Title, private cartService: CartService, private router: Router, private loginService: LoginService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.isLogged = this.token.isLogger();
    this.check()
    this.title.setTitle('Giỏ hàng');
    window.scroll(0, 0)
    this.productService.getHome('?size=4').subscribe(
      next => {
        for (let i = 0; i < next['content'].length; i++) {
          if (i == 4) {
            break;
          }
          this.products.push(next['content'][i])
        }
      }
    )
  }

  check() {
    if (this.isLogged) {
      this.loginService.profile(this.token.getId()).subscribe(
        next => {
          this.user = next;
          this.cartService.getCartByUser(this.user.id).subscribe(
            next => {
              this.cart = next
              this.getAllValue();
            }
          );
        }
      )
    }
  }

  getAll() {
    this.cartService.getCartByUser(this.user.id).subscribe(
      next => {this.cart = next
        this.getAllValue();
      }
    );
      this.share.getClickEvent().subscribe(
        next => {
       this.cartService.getCartByUser(this.user.id).subscribe(
            next => {this.cart = next
              this.getAllValue();
            }
          );
        }
      )

  }
  changeQuantity(operator:string,id:number) {
    this.cartService.changeQuantity(operator,id).subscribe(next => {
      this.share.sendClickEvent()
      this.cartService.getCartByUser(this.user.id).subscribe(
        next => {this.cart = next
          this.getAllValue();
        }
      )
    })
  }
  deleteCart(id:number) {
    this.cartService.deleteCart(id).subscribe(next => {
      this.share.sendClickEvent()
      this.share.getClickEvent().subscribe(next => {
        this.cartService.getCartByUser(this.user.id).subscribe(
          next => {this.cart = next
            this.getAllValue();
          }
        )
      })

    });
  }
  getAllValue() {
    this.quantity = 0;
    this.total = 0;
    for (let i = 0; i < this.cart.length; i++) {
      this.quantity += this.cart[i].quantity;
      this.total += this.cart[i].product.price * this.cart[i].quantity
    }
  }


  click(product: Product) {
    this.token.addToCart(product, this.user)
    this.getAll()
    this.getAllValue();
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
      this.getAll();
      this.share.sendClickEvent()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Bạn đã xóa giỏ hàng thành công!',
        showConfirmButton: false,
        timer: 1500
      });
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
    if (this.cart.length == 0) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Giỏ hàng trống ,vui lòng chọn mặt hàng!',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (!this.token.isLogger()) {
      Swal.fire({
        title: 'Bạn chưa đăng nhập, hãy đăng nhập để tiếp tục thanh toán!',
        imageUrl: 'https://cdn0.iconfinder.com/data/icons/people-137/513/gamer-512.png',
        showConfirmButton: true,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonColor: '#005ec4',
        confirmButtonText: 'Đăng nhập',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login/true'])
        }
      });
    } else {
      let currentTime = new Date();
      let formattedTime = currentTime.toLocaleString();
      console.log(formattedTime)
      this.cartService.buy(this.total,this.quantity, this.user.id, formattedTime).subscribe(
        next => {
          Swal.fire({
            title: 'Chúc mừng bạn ' + this.user.name + ' đã mua hàng thành công!',
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

}
