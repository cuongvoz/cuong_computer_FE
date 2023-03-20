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
  getHome():Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products');
  }
  showMore(size:number):Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products?size=' + size );
  }
  getAllProduct():Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/list');
  }
  searchProduct(name:string):Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/list/search/' + name);
  }
  getAllLaptop():Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/laptops');
  }
  searchLaptop(name:string):Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/laptops/search/' + name);
  }
  getAllChairs():Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/chairs');
  }
  searchChairs(name:string):Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/chairs/search/' + name);
  }
  getAllMonitors():Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/monitors');
  }
  searchMonitors(name:string):Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/monitors/search/' + name);
  }
  getAllKeyBoard():Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/keyboards');
  }
  searchKeyBoard(name:string):Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/keyboards/search/' + name);
  }
  getAllPC():Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/pc');
  }
  searchPC(name:string):Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/pc/search/' + name);
  }
  getAllMouse():Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/mouse');
  }
  searchMouse(name:string):Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/mouse/search/' + name);
  }
  findById(id:string) :Observable<Product> {
    return this.http.get<Product>('http://localhost:8080/api/products/find/' + id);
  }
}
