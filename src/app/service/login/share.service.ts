import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Product} from "../../entity/product";

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }
  private subject = new Subject<any>();

  sendClickEvent() {
    this.subject.next();
  }
  sendIsLogged() {
    this.subject.next(true);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
