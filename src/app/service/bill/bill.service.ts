import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bill} from "../../entity/bill";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) {
  }

  historyofUser(id:string):Observable<Bill[]> {
    return this.http.get<Bill[]>('http://localhost:8080/api/bill/history/'+id)
  }
  getAll(what):Observable<Bill[]> {
    return this.http.get<Bill[]>('http://localhost:8080/api/bill'+what)
  }
}
