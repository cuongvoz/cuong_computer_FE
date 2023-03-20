import { Component, OnInit } from '@angular/core';
import {ProductService} from "../service/product/product.service";
import {Title} from "@angular/platform-browser";
import {Product} from "../entity/product";
import {ActivatedRoute} from "@angular/router";
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


  constructor(private token:TokenService,private share:ShareService,private productService:ProductService,private title:Title,private activate:ActivatedRoute) { }

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
    let newQuantity = parseInt(quantity);
    if (this.token.getCart() == undefined) {
      let cart = {
        id: this.product.id,
        name: this.product.name,
        image: this.product.image,
        price: this.product.price,
        quantity: newQuantity
      }
      this.cart.push(cart);
      this.token.setCart(this.cart);
    } else {
      this.cart = this.token.getCart();
      if (!this.token.checkExist(this.product.id)) {
        let cart = {
          id: this.product.id,
          name: this.product.name,
          image: this.product.image,
          price: this.product.price,
          quantity: newQuantity
        }
        this.cart.push(cart)
      }
      this.token.setCart(this.cart)
    }
    this.share.sendClickEvent();
  }
  addToCart(quantity:string) {
   let newQuantity = parseInt(quantity);
    console.log(this.token.getCart())
    if (this.token.getCart() == undefined) {
      let cart = {
        id: this.product.id,
        name: this.product.name,
        image: this.product.image,
        price: this.product.price,
        quantity: newQuantity
      }
      this.cart.push(cart);
      this.token.setCart(this.cart);
    } else {
      this.cart = this.token.getCart();
      if (this.token.checkExist(this.product.id)) {
        this.token.upQuantityNew(this.product.id,this.cart,newQuantity);
      } else {
        let cart = {
          id: this.product.id,
          name: this.product.name,
          image: this.product.image,
          price: this.product.price,
          quantity: newQuantity
        }
        this.cart.push(cart)
      }
      this.token.setCart(this.cart)
    }

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
}
