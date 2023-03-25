import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../entity/product";
import {ProductService} from "../../service/product/product.service";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {Cart} from "../../entity/cart";
import {TokenService} from "../../service/login/token.service";
import {ShareService} from "../../service/login/share.service";
import {User} from "../../entity/user";
import {LoginService} from "../../service/login/login.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  category = '';
  cart: Cart[] =[]
  products:Product[];
  user:User;
  isLogged = false;
  id:number;
  nameSearch= ''
  constructor(private loginService:LoginService,private share:ShareService,private token:TokenService,private title:Title,private router:Router,private productService:ProductService,private activate:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.isLogged = this.token.isLogger()
    window.scroll(0,0)
    this.loader();
  }
  loader() {
    if (this.isLogged) {
      this.loginService.profile(this.token.getId()).subscribe(next => this.user = next)
    }
    this.activate.paramMap.subscribe(next => {
      let name = next.get('name');
      this.nameSearch = name
      let category = next.get('category');
      this.findCategory(category);
      this.id = parseInt(category)
       if (name != null && name != 'null') {
         if (category != '7') {
           this.productService.getProductByCategoryAndName(category,name).subscribe(
             next => this.products = next['content']
           )
         } else {
           this.productService.getAllProductByName(name).subscribe(
             next => this.products = next['content']
           )
         }
       } else {
         if (category != '7') {
           this.productService.getProductByCategory(category).subscribe(
             next => this.products = next['content']
           )
         } else {
           this.productService.getAllProduct().subscribe(
             next => this.products = next['content']
           )
         }
       }

    })

  }

 findCategory(id :string) {
    switch (id) {
      case '7':
        this.category = 'Tất cả danh mục';
        this.title.setTitle('Tất cả danh mục');
        break;
      case "1":
        this.category = 'Laptop';
        this.title.setTitle('Laptop');
        break;
      case "2":
        this.category = 'PC Gaming';
        this.title.setTitle('PC Gaming');
        break;
      case "5":
        this.category = 'Chuột';
        this.title.setTitle('Chuột');
        break;
      case "3":
        this.category = 'Bàn phím';
        this.title.setTitle('Bàn phím');
        break;
      case "4":
        this.category = 'Màn hình';
        this.title.setTitle('Màn hình');
        break;
      case "6":
        this.category = 'Ghế';
        this.title.setTitle('Ghế');
        break;
    }
 }
  click(product:Product) {
   this.token.addToCart(product,this.user)
  }
  goHome() {
    this.router.navigateByUrl('/')
  }
}
