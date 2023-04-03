import {Component, OnInit} from '@angular/core';
import {Product} from "../entity/product";
import {ProductService} from "../service/product/product.service";
import {FormControl, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
import {ListService} from "../service/product/list.service";
import {LoginService} from "../service/login/login.service";
import {ShareService} from "../service/login/share.service";
import {TokenService} from "../service/login/token.service";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {Bill} from "../entity/bill";
import {BillService} from "../service/bill/bill.service";
import {BuyHistory} from "../entity/buy-history";
import {BuyHistoryService} from "../service/buyHistory/buy-history.service";
import {User} from "../entity/user";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  bills: Bill[] = []
  page = 0;
  first: boolean;
  last: boolean;
  userBill:User = {};
  type = 0;
  category: 0;
  name = '';
  bill:Bill = {};
  buyHistorys:BuyHistory[] = [];

  constructor(private buyHistoryService:BuyHistoryService,private billService: BillService, private share: ShareService, private token: TokenService, private title: Title) {

  }

  ngOnInit(): void {
    this.title.setTitle('Quản lí bán hàng')
    this.getAll()
    this.share.getClickEvent().subscribe(next => {
      this.getAll()
    })
  }

  getAll() {
    this.billService.getAll('').subscribe(
      next => {
        this.getList(next)
      }
    )
  }

  changePage(page) {
    this.billService.getAll('?page='+page).subscribe(
      next => {
        this.getList(next)
      }
    )
  }
  check(id:number,user:User,bill:Bill) {
    this.bill = bill
    this.userBill = user;
    this.buyHistoryService.historyofBill(id.toString()).subscribe(
      next => {
        this.buyHistorys = next
      } )
  }
  getList(what: any) {
    this.bills = what['content'];
    this.page = what['number'];
    this.first = what['first'];
    this.last = what['last']
  }
}
