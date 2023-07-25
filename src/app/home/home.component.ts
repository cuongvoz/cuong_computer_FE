import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Product} from "../entity/product";
import {ProductService} from "../service/product/product.service";
import swal from "sweetalert2";
import Swal from "sweetalert2";
import {Cart} from "../entity/cart";
import {TokenService} from "../service/login/token.service";
import {ShareService} from "../service/login/share.service";
import {User} from "../entity/user";
import {LoginService} from "../service/login/login.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cart: Cart[] = [];
  products: Product[];
  more = 'Xem thêm';
  user: User;
  isLogged = false;
  first: boolean;
  last: boolean;

  constructor(private login: LoginService,
              private share: ShareService,
              private title: Title,
              private productService: ProductService,
              private token: TokenService) {
  }

  ngOnInit(): void {
    this.isLogged = this.token.isLogger()
    this.share.getClickEvent().subscribe(next => {
      this.isLogged =this.token.isLogger()
    })
    this.title.setTitle('Cường Computer')
    window.scroll(0, 0)
    this.getAll()
  }

  getAll() {
    if (this.isLogged) {
      this.login.profile(this.token.getId()).subscribe(
        next => this.user = next
      )
    }
    this.productService.getHome('?size=4').subscribe(
      data => {
        this.products = data['content']
        this.first = data['first']
        this.last = data['last']
      }
    )
  }

  click(product: Product) {
    this.share.sendClickEvent();
    if (this.isLogged) {
      if (product.quantity > 0) {
        this.token.addToCart(product, this.user);

        this.share.sendClickEvent()
      } else {
        Swal.fire({
          title: 'Hết mất rồi :(',
          imageUrl: 'https://i.imgur.com/dKc3V77.png',
          text: 'Hiện tại ' + product.category.name.toLowerCase() + ' ' + product.name + ' của bên mình đã hết' +
            ' mong quý khách thông cảm cho sự bất tiện này, quý khách vui lòng chọn sản phẩm khác.',
          showConfirmButton: true,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonColor: '#005ec4',
          confirmButtonText: 'Xác nhận',
        })
      }
    } else {
      if (product.quantity > 0) {
        this.token.addCartSession(product,1)
        this.share.sendClickEvent()
      } else {
        Swal.fire({
          title: 'Hết mất rồi :(',
          imageUrl: 'https://i.imgur.com/dKc3V77.png',
          text: 'Hiện tại ' + product.category.name.toLowerCase() + ' ' + product.name + ' của bên mình đã hết' +
            ' mong quý khách thông cảm cho sự bất tiện này, quý khách vui lòng chọn sản phẩm khác.',
          showConfirmButton: true,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonColor: '#005ec4',
          confirmButtonText: 'Xác nhận',
        })
      }
    }
       this.share.sendClickEvent()
  }

  showMore() {
    if (!this.last) {
      this.productService.showMore(this.products.length + 4).subscribe(
        next => {
          this.products = next['content']
          this.last = next['last']
          if (this.products.length >= 8) {
            this.last = true
          }
          if (this.last) {
            this.more = 'Ẩn đi'
          }
        }
      )
    } else {
      window.scroll(0, 1000)
      this.productService.showMore(4).subscribe(
        next => {
          this.products = next['content']
          this.last = next['last']
          this.more = 'Xem thêm'
        }
      )
    }


  }


}
