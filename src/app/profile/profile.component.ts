import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {LoginService} from "../service/login/login.service";
import {TokenService} from "../service/login/token.service";
import {Router} from "@angular/router";
import {ShareService} from "../service/login/share.service";
import {User} from "../entity/user";
import {Bill} from "../entity/bill";
import {BillService} from "../service/bill/bill.service";
import {BuyHistory} from "../entity/buy-history";
import {BuyHistoryService} from "../service/buyHistory/buy-history.service";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import Swal from "sweetalert2";
import {FormControl, FormGroup} from "@angular/forms";
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isLogged = false;
  user: User;
  total = 0;
  role = 'none';
  type = 0;
  age = 0;
  first: boolean;
  last: boolean;
  page = 0;
  bills:Bill[] =[];
  selectedImage: any ;
  url: any;
  bill:Bill = {};
  isLoading =false;
  form = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    address: new FormControl(),
    phoneNumber: new FormControl(),
    dateOfBirth: new FormControl(),
    gender: new FormControl(),

  })
  errorForm = {
    id: '',
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: ''
  }
  downloadURL: Observable<string> | undefined;
  fb: string | undefined = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921';
  src: string | undefined;
  buyHistorys:BuyHistory[] =[];
  constructor(private storage: AngularFireStorage,private buyHistoryService:BuyHistoryService,private billService:BillService,private title:Title,private loginService: LoginService, private token: TokenService, private router: Router, private share: ShareService) { }

  ngOnInit(): void {
    window.scroll(0,130);
      this.loader();
      this.share.getClickEvent().subscribe(next => {
       this.loader();
      })
  }
  show(type:number) {
    this.type = type;
  }
  loadToPage(what:any) {
    this.bills = what['content'];
    this.first = what['first'];
    this.last = what['last'];
    this.page = what['number']
  }
  resetError() {
    this.errorForm = {
      id: '',
      name: '',
      email: '',
      address: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: ''
    }
  }
  loader() {
    this.isLogged = this.token.isLogger()
    if (this.isLogged) {
      this.loginService.profile(this.token.getId()).subscribe(next => {
        this.user = next;
        this.form.patchValue(next);
        // @ts-ignore
        let timeDiff = Math.abs(Date.now() - new Date(this.user.dateOfBirth));
        this.age =(Math.floor((timeDiff / (1000 * 3600 * 24)) / 365))
        this.title.setTitle('' + next.name )
      })
      this.billService.historyofUser(this.token.getId()).subscribe(next => this.loadToPage(next) );
      this.role = this.token.getRole();
    }
  }
  changPage(page) {
    this.billService.historyofUser(this.user.id + '?page='+page).subscribe(
      next => this.loadToPage(next)
    )
  }
  changeAvatar() {
    this.loginService.avatar(this.token.getId(),this.fb).subscribe(
      next => {
        document.getElementById('avatarDissmiss').click()
        Toast.fire({
          iconHtml: '<img style="width: 80px;height: 80px;padding: 10px;object-fit: cover;border-radius: 10px;" src="'+this.fb+'">',
          title: 'Bạn đã cập nhật ảnh đại diện thành công!'
        })
        this.src = undefined;
       this.share.sendClickEvent()
      }
    )
  }
  check(bill) {
    this.bill = bill;
    this.buyHistoryService.historyofBill(bill.id).subscribe(
      next => {
        this.buyHistorys = next
        for (let i = 0; i < this.buyHistorys.length; i++) {
          this.total += this.buyHistorys[i].quantity * this.buyHistorys[i].product.price
        }
      } )
  }
  showPreview(event: any) {
    this.src = 'https://image.vietstock.vn/avatar/Tran-Long_81690d74-e698-46dc-beb7-e8ca30fa78d1.png'
    this.selectedImage = event.target.files[0];
    const filePath = this.selectedImage.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedImage);
    this.isLoading = true
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            this.src = url;
            this.isLoading = false
          });
        })
      )
      .subscribe();
  }

  update() {
    this.resetError();
    this.loginService.update(this.form.value).subscribe(next => {
      Toast.fire({
        iconHtml: '<img style="width: 80px;height: 80px;padding: 10px;object-fit: cover;border-radius: 10px;" src="'+this.user.avatar+'">',
        title: 'Bạn đã cập nhật thông tin thành công!'
      })
      document.getElementById('disMisedit').click()
      this.share.sendClickEvent();
    },e => {
      for (let i = 0; i < e.error.length; i++) {
        if (e.error[i].field == 'name') {
          this.errorForm.name = e.error[i].defaultMessage;
        } else if (e.error[i].field == 'dateOfBirth') {
          this.errorForm.dateOfBirth = e.error[i].defaultMessage;
        }else if (e.error[i].field == 'email') {
          this.errorForm.email = e.error[i].defaultMessage;
        }else if (e.error[i].field == 'address') {
          this.errorForm.address = e.error[i].defaultMessage;
        }else if (e.error[i].field == 'phoneNumber') {
          this.errorForm.phoneNumber = e.error[i].defaultMessage;
        }else if (e.error[i].field == 'gender') {
          this.errorForm.gender = e.error[i].defaultMessage;
        }
      }
    })
  }
}
