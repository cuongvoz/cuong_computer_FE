import { Component, OnInit } from '@angular/core';
import {ListService} from "../../service/product/list.service";
import {LoginService} from "../../service/login/login.service";
import {ShareService} from "../../service/login/share.service";
import {TokenService} from "../../service/login/token.service";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../service/product/product.service";
import {Product} from "../../entity/product";
import Swal from "sweetalert2";

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerComponent implements OnInit {
   products:Product[] = []
  page = 0;
   first:boolean;
   last:boolean;
   type = 0;
   category: 0;
   name = '';
   product:Product = {
     name: '',
     category: {name: ''}
   };
   role = '';
  constructor(private listService:ListService,private loginService: LoginService, private share: ShareService, private token: TokenService, private title: Title, private router: Router, private productService: ProductService, private activate: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.title.setTitle('Quản lí sản phẩm')
    this.getAll()
    this.share.getClickEvent().subscribe(next => {
      this.getAll()
    })
  }
  searchName(name,id) {
    this.name = name;
    this.category = id;
    if (name == "" && id == 7) {
      this.productService.getAllProduct().subscribe(
        next => this.getList(next)
      )
      this.type = 0;
    } else if (name == "" && id != 7) {
      this.productService.getProductByCategory(id).subscribe(
        next => this.getList(next)
      )
      this.type = 1;
    } else if (name != "" && id != 7) {
      this.productService.getProductByCategoryAndName(id, name).subscribe(
        next => this.getList(next)
      )
      this.type = 3;
    } else {
      this.productService.getAllProductByName(name).subscribe(
        next => this.getList(next)
      )
    }

  }
  changePage(page){
    this.productService.paging2('?size=6&page='+page,this.category,this.name,this.type).subscribe(
      next => this.getList(next)
    )
  }
  checkProduct(product:Product) {
    this.product = product;
  }
  upQuantity(quantity) {
    this.productService.wareHouse(this.product.id,quantity).subscribe(next => {
      Swal.fire({
        title:'Bạn đã nhập kho cho ' + this.product.category.name+ ' ' + this.product.name +' thành công!',
        imageUrl: this.product.image,
        showConfirmButton: false,
        timer: 2000,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
      document.getElementById('dissmiss').click();
      this.share.sendClickEvent()
      this.getAll()
    })
  }
  searchCategory(id) {
    if (id != 7) {
      this.productService.getProductByCategory(id).subscribe(
        next => this.getList(next)
      )
      this.type= 1;
    } else {
      this.productService.getAllProduct().subscribe(
        next => this.getList(next)
      )
      this.type= 0;

    }
   this.category = id;
  }
  getList(what:any){
    this.products = what['content'];
    this.page = what['number'];
    this.first = what['first'];
    this.last = what['last']
  }
  getAll() {
    this.role = this.token.getRole();
     this.productService.getHome('?size=6').subscribe(next => this.getList(next))
    this.type = 0
  }
  isDelete(id,category,name,image) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa ' + category.toLowerCase() + ' ' + name + ' không ?',
      imageUrl: image,
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
        this.productService.deleteProduct(id).subscribe(
          next => {

          }
        )
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bạn đã xóa ' + category.toLowerCase() + ' ' + name + ' thành công!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAll()
        this.share.sendClickEvent()
      }
    })
  }
}
