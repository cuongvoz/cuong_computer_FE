import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../entity/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  // @ts-ignore
  getHome(size: string):Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products' + size);
  }
  showMore(size:number):Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products?size=' + size );
  }
  getAllProduct():Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/');
  }
  getAllProductByName(name:string) {
    return this.http.get<Product[]>('http://localhost:8080/api/products/all/'+name);
  }
  getProductByCategory(id:string):Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/category/'+id)
  }
  getProductByCategoryAndName(id:string,name:string):Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/category/' + id +'/'+name);
  }
  findById(id:string) :Observable<Product> {
    return this.http.get<Product>('http://localhost:8080/api/products/detail/' + id);
  }
}
