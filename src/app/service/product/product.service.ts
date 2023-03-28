import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../entity/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  // @ts-ignore
  getHome(size: string): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/hot' + size);
  }

  showMore(size: number): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/hot?size=' + size);
  }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/');
  }

  getAllProductByName(name: string) {
    return this.http.get<Product[]>('http://localhost:8080/api/products/all/' + name);
  }

  getProductByCategory(id: string): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/category/' + id)
  }

  getProductByCategoryAndName(id: string, name: string): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/category/' + id + '/' + name);
  }

  findById(id: string): Observable<Product> {
    return this.http.get<Product>('http://localhost:8080/api/products/detail/' + id);
  }

  createPC(obj): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/products/PC/', obj)
  }

  searchBrand(brand: string[]): Observable<Product[]> {
    return this.http.post<Product[]>('http://localhost:8080/api/products/searchBrand', brand)
  }

  searchBrandMouse(brand: string[]): Observable<Product[]> {
    return this.http.post<Product[]>('http://localhost:8080/api/products/searchBrandMouse', brand)
  }

  searchPrice(price: string, priceOld: string, category: number): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/searchPrice/' + price + '/' + priceOld + '/' + category)
  }

  searchCPUandCategory(cpu: string[]): Observable<Product[]> {
    return this.http.post<Product[]>('http://localhost:8080/api/products/pcgaming/cpu', cpu)
  }

  createChair(obj): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/products/Chair/', obj)
  }

  createKeyboard(obj): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/products/Keyboard/', obj)
  }

  createLaptop(obj): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/products/Laptop/', obj)
  }

  createMonitor(obj): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/products/Monitor/', obj)
  }


  createMouse(obj): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/products/Mouse/', obj)
  }

  deleteProduct(id): Observable<any> {
    return this.http.delete<any>('http://localhost:8080/api/products/delete/' + id)
  }
}
