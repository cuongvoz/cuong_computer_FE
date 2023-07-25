import { Component, OnInit } from '@angular/core';
import {ProductService} from "../service/product/product.service";
import {Title} from "@angular/platform-browser";
import {Product} from "../entity/product";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "../service/login/token.service";
import {ShareService} from "../service/login/share.service";
import {Cart} from "../entity/cart";
import Swal from "sweetalert2";
import {User} from "../entity/user";
import {LoginService} from "../service/login/login.service";
import {CartService} from "../service/cart/cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product:Product;
  category = '';
  cart:Cart[] = [];
  isLogged = false;
  user:User;
  role = '';
  constructor(private cartService:CartService,private login:LoginService,private router:Router,private token:TokenService,private share:ShareService,private productService:ProductService,private title:Title,private activate:ActivatedRoute) { }

  ngOnInit(): void {
    this.isLogged = this.token.isLogger();
    this.share.getClickEvent().subscribe(
      next => {
        this.isLogged = this.token.isLogger();
        this.loader()
      }
    )
    window.scroll(0,0)
    this.loader();
  }
  loader() {
    this.activate.paramMap.subscribe(next => {
      let id = next.get('id');
      console.log(id)
      this.productService.findById(id).subscribe(data => {
        this.product = data;
        this.title.setTitle('' + this.product.name +'')
      })
    })
    if (this.isLogged) {
      this.login.profile(this.token.getId()).subscribe(next => {
        this.user = next;
      })
      this.role = this.token.getRole();
    }
  }

  buy(quantity:string) {
     if (this.isLogged) {
       if (this.product.quantity > 0) {
         this.cartService.putQuantity(this.user.id,this.product.id,quantity,'buy').subscribe(
           next => {
             this.share.sendClickEvent();
           }
         )
         this.router.navigateByUrl('/cart')
       } else {
         Swal.fire({
           title: 'Hết mất rồi :(',
           imageUrl: 'https://i.imgur.com/dKc3V77.png',
           text: 'Hiện tại ' + this.product.category.name.toLowerCase() + ' ' + this.product.name + ' của bên mình đã hết' +
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
       if (this.product.quantity > 0) {
         this.token.buyCartSessionDetail(this.product,parseInt(quantity))
         this.router.navigateByUrl('/cart')
       } else {
         Swal.fire({
           title: 'Hết mất rồi :(',
           imageUrl: 'https://i.imgur.com/dKc3V77.png',
           text: 'Hiện tại ' + this.product.category.name.toLowerCase() + ' ' + this.product.name + ' của bên mình đã hết' +
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

  }
  addToCart(quantity:string) {
    if (this.isLogged) {
      if (this.product.quantity > 0) {
        this.cartService.putQuantity(this.user.id,this.product.id,quantity,'add').subscribe(
          next => {
            Swal.fire({
              title:'Bạn đã thêm sản phẩm ' + this.product.name +' vào giỏ!',
              imageUrl: this.product.image,
              showConfirmButton: false,
              timer: 2000,
              imageWidth: 200,
              imageHeight: 200,
              imageAlt: 'Custom image',
            })
            this.share.sendClickEvent();
          }
        )
      } else {
        Swal.fire({
          title: 'Hết mất rồi :(',
          imageUrl: 'https://i.imgur.com/dKc3V77.png',
          text: 'Hiện tại ' + this.product.category.name.toLowerCase() + ' ' + this.product.name + ' của bên mình đã hết' +
            ' mong quý khách thông cảm cho sự bất tiện này, quý khách vui lòng chọn sản phẩm khác.',
          showConfirmButton: true,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonColor: '#005ec4',
          confirmButtonText: 'Đồng ý',
        })
      }
    } else {
      if (this.product.quantity > 0) {
        this.token.addCartSession(this.product,parseInt(quantity))
      } else {
        Swal.fire({
          title: 'Hết mất rồi :(',
          imageUrl: 'https://i.imgur.com/dKc3V77.png',
          text: 'Hiện tại ' + this.product.category.name.toLowerCase() + ' ' + this.product.name + ' của bên mình đã hết' +
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


  }

  isDelete() {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa ' + this.product.category.name.toLowerCase() + ' ' + this.product.name + ' không ?',
      imageUrl: this.product.image,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom image',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Xác nhận!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(this.product.id).subscribe(
          next => { }
        )
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bạn đã xóa ' + this.product.category.name.toLowerCase() + ' ' + this.product.name + ' thành công!',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl('/')
      }
    })
  }
}
