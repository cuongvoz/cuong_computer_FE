import { Component, OnInit } from '@angular/core';
import {ProductService} from "../service/product/product.service";
import {Title} from "@angular/platform-browser";
import {Product} from "../entity/product";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "../service/login/token.service";
import {ShareService} from "../service/login/share.service";
import {Cart} from "../entity/cart";
import Swal from "sweetalert2";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product:Product;
  category = '';
  cart:Cart[] = [];


  constructor(private router:Router,private token:TokenService,private share:ShareService,private productService:ProductService,private title:Title,private activate:ActivatedRoute) { }

  ngOnInit(): void {
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

        console.log(data)
      })
    })
  }

  buy(quantity:string) {
    // let newQuantity = parseInt(quantity);
    // if (this.token.getCart() == undefined) {
    //   let cart = {
    //     id: this.product.id,
    //     name: this.product.name,
    //     image: this.product.image,
    //     price: this.product.price,
    //     quantity: newQuantity
    //   }
    //   // this.cart.push(cart);
    //   this.token.setCart(this.cart);
    // } else {
    //   this.cart = this.token.getCart();
    //   if (!this.token.checkExist(this.product.id)) {
    //     let cart = {
    //       id: this.product.id,
    //       name: this.product.name,
    //       image: this.product.image,
    //       price: this.product.price,
    //       quantity: newQuantity
    //     }
    //     this.cart.push(cart)
    //   }
    //   this.token.setCart(this.cart)
    // }
    // this.share.sendClickEvent();
  }
  addToCart(quantity:string) {
   // let newQuantity = parseInt(quantity);
   //  console.log(this.token.getCart())
   //  if (this.token.getCart() == undefined) {
   //    let cart = {
   //      id: this.product.id,
   //      name: this.product.name,
   //      image: this.product.image,
   //      price: this.product.price,
   //      quantity: newQuantity
   //    }
   //    this.cart.push(cart);
   //    this.token.setCart(this.cart);
   //  } else {
   //    this.cart = this.token.getCart();
   //    if (this.token.checkExist(this.product.id)) {
   //      this.token.upQuantityNew(this.product.id,this.cart,newQuantity);
   //    } else {
   //      let cart = {
   //        id: this.product.id,
   //        name: this.product.name,
   //        image: this.product.image,
   //        price: this.product.price,
   //        quantity: newQuantity
   //      }
   //      this.cart.push(cart)
   // //    }
   //    this.token.setCart(this.cart)
   //
   //  }
   //
   //  Swal.fire({
   //    title:'Bạn đã thêm sản phẩm ' + this.product.name +' vào giỏ!',
   //    imageUrl: this.product.image,
   //    showConfirmButton: false,
   //    timer: 2000,
   //    imageWidth: 200,
   //    imageHeight: 200,
   //    imageAlt: 'Custom image',
   //  })
   //  this.share.sendClickEvent();
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
