import { Component, OnInit } from '@angular/core';
import {Product} from "../../entity/product";
import {ProductService} from "../../service/product/product.service";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  products:Product[];
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.loader()
  }
  loader() {
    this.productService.getHome('?size=4').subscribe(
      next => {this.products = next['content']}
    )
  }
}
