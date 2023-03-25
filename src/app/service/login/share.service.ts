import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }
  private subject = new Subject<any>();

  sendClickEvent() {
    this.subject.next();
  }
  sendDataToSubscribers(data: any) {
    this.subject.next(data);
  }
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
