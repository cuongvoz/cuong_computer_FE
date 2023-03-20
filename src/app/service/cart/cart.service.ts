import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Cart} from "../../entity/cart";
import {Observable} from "rxjs";
import {TokenService} from "../login/token.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient,private token:TokenService) { }

  buy(total:number,cart:Cart[],time:string):Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/cart',{userID:this.token.getId(),buyDay:time,total:total,cart:cart})
  }
}
