import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Product} from "../entity/product";
import {ProductService} from "../service/product/product.service";
import swal from "sweetalert2";
import Swal from "sweetalert2";
import {Cart} from "../entity/cart";
import {TokenService} from "../service/login/token.service";
import {ShareService} from "../service/login/share.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cart: Cart[] = [];
  products: Product[];
  more = 'Xem thêm';
  first: boolean;
  last:boolean;
  constructor(private share:ShareService,private title:Title,private productService:ProductService,private token:TokenService) { }

  ngOnInit(): void {
    this.title.setTitle('Cường Computer')
    window.scroll(0,0)
    this.getAll()
  }
  getAll() {
    this.productService.getHome('?size=4').subscribe(
      data => {
        this.products = data['content']
        this.first = data['first']
        this.last = data['last']
      }
    )
  }
  click(product:Product) {
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
        this.token.upQuantity(product.id,this.cart);
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
  showMore() {

    if (!this.last) {
      this.productService.showMore(this.products.length + 4).subscribe(
        next => {this.products = next['content']
        this.last = next['last']
          if (this.last) {
            this.more = 'Ẩn đi'
          }
        }
      )
    } else {
      window.scroll(0,1000)
      this.productService.showMore(4).subscribe(
        next => {this.products = next['content']
          this.last = next['last']
            this.more = 'Xem thêm'
        }
      )
    }


  }
}
