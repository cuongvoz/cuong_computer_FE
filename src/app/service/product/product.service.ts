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


  paging(page:string,category:number,name:string,type:number,min:number,max:number,brand:number[]) {
    switch (type) {
      case 0:
        return this.http.get<Product[]>('http://localhost:8080/api/products'+ page);
      case 1:
        return this.http.get<Product[]>('http://localhost:8080/api/products/category/' + category +page)
      case 2:
        return this.http.get<Product[]>('http://localhost:8080/api/products/all/' + name + page);
      case 3:
        return this.http.get<Product[]>('http://localhost:8080/api/products/category/' + category + '/' + name + page);
      case 4:
        return this.http.get<Product[]>('http://localhost:8080/api/products/searchPrice/' + min + '/' + max + '/' + category + page)
      case 5:
        let dto = {
          id:category,
          brand:brand
        }
        return this.http.post<Product[]>('http://localhost:8080/api/products/searchBrand'+page, dto )
      case 6:
        return this.http.post<Product[]>('http://localhost:8080/api/products/pcgaming/cpu'+page, brand)
    }
  }
  paging2(page:string,category:number,name:string,type:number) {
    switch (type) {
      case 0:
        return this.http.get<Product[]>('http://localhost:8080/api/products'+ page);
      case 1:
        return this.http.get<Product[]>('http://localhost:8080/api/products/category/' + category +page)
      case 2:
        return this.http.get<Product[]>('http://localhost:8080/api/products/all/' + name + page);
      case 3:
        return this.http.get<Product[]>('http://localhost:8080/api/products/category/' + category + '/' + name + page);
    }
  }
  // @ts-ignore
  getHome(size: string): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/api/products/hot' + size);
  }

  wareHouse(id,quantity): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/products/warehouse/' + id + '/' +quantity);
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
  searchBrand(id:number,brand: number[]): Observable<Product[]> {
    let dto = {
      id:id,
      brand:brand
    }
    return this.http.post<Product[]>('http://localhost:8080/api/products/searchBrand', dto)
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
