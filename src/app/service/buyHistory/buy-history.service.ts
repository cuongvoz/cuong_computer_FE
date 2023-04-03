import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Bill} from "../../entity/bill";
import {HttpClient} from "@angular/common/http";
import {BuyHistory} from "../../entity/buy-history";

@Injectable({
  providedIn: 'root'
})
export class BuyHistoryService {

  constructor(private http: HttpClient) {
  }
  historyofBill(id:string):Observable<BuyHistory[]> {
    return this.http.get<BuyHistory[]>('http://localhost:8080/api/buyHistory/check/'+id)
  }
}
