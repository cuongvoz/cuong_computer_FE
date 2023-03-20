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

  constructor(private token: TokenService, private share: ShareService, private title: Title, private cartService: CartService, private router: Router, private loginService: LoginService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.title.setTitle('Giỏ hàng');
    this.getAll();
    this.check();
    window.scroll(0, 0)
    this.productService.getHome().subscribe(
      next => {
        for (let i = 0; i < next['content'].length; i++) {
          if (i == 4) {
            break;
          }
          this.products.push(next['content'][i])

        }
      }
    )
    console.log(this.products)
  }

  check() {
    if (this.token.isLogger()) {
      this.loginService.profile(this.token.getId()).subscribe(
        next => {
          this.user = next;
        }
      )
    }
  }

  getAll() {

    if (this.token.getCart() != undefined) {
      this.cart = this.token.getCart();
      this.getAllValue();
    }
  }

  getAllValue() {
    this.quantity = 0;
    this.total = 0;
    for (let i = 0; i < this.cart.length; i++) {
      this.quantity += this.cart[i].quantity;
      this.total += this.cart[i].price * this.cart[i].quantity
    }
    // for (let i = 0; i < this.cart.length; i++) {
    //   this.total += this.cart[i].price * this.cart[i].quantity
    // }
  }

  delete(id: number) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id == id) {
        this.cart.splice(i, 1);
        break;
      }
    }
    this.token.setCart(this.cart);
    this.share.sendClickEvent();
    this.getAll();
    this.getAllValue();
  }

  upQuantity(id: number) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id == id) {
        this.cart[i].quantity += 1;
        break;
      }
    }
    this.token.setCart(this.cart);
    this.share.sendClickEvent();
    this.getAll();
  }

  downQuantity(id: number) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id == id) {
        if (this.cart[i].quantity == 1) {
          this.cart.splice(i, 1);
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

  click(product: Product) {
    console.log(this.token.getCart())
    if (this.token.getCart() == undefined) {
      let cart = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1
      }
      this.cart.push(cart);
      this.token.setCart(this.cart);
    } else {
      this.cart = this.token.getCart();
      if (this.token.checkExist(product.id)) {
        this.token.upQuantity(product.id, this.cart);
      } else {
        let cart = {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: 1
        }
        this.cart.push(cart)
      }
      this.token.setCart(this.cart)
      this.getAllValue();
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
    this.share.sendClickEvent();
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
      let cart = []
      this.token.setCart(cart);
      this.share.sendClickEvent();
      this.quantity = 0;
      this.total = 0;
      this.getAll();
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Bạn đã xóa giỏ hàng thành công!',
        showConfirmButton: false,
        timer: 1500
      });
    }

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
        position: 'center',
        icon: 'warning',
        title: 'Bạn chưa đăng nhập, vui lòng đăng nhập để mua hàng!',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigateByUrl('/login')
    } else {
      let currentTime = new Date();
      let formattedTime = currentTime.toLocaleString();
      console.log(formattedTime)
      this.cartService.buy(this.total, this.cart, formattedTime).subscribe(
        next => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Chúc mừng bạn ' + this.user.name + ' đã mua hàng thành công :D',
            showConfirmButton: false,
            timer: 1500
          });
          let cart = []
          this.token.setCart(cart);
          this.share.sendClickEvent();
          this.quantity = 0;
          this.total = 0;
          this.getAll();
        }
      )
    }
  }

}
