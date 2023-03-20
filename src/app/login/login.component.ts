import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {LoginService} from "../service/login/login.service";
import {TokenService} from "../service/login/token.service";
import {Router} from "@angular/router";
import {ShareService} from "../service/login/share.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    rememberMe: new FormControl(true),
  });
  name = 'Thông tin cá nhân';
  message = ''
  islogged = false;
  constructor(private title:Title,private loginService: LoginService, private token: TokenService, private router: Router, private share: ShareService) {

  }


  ngOnInit(): void {
    this.title.setTitle('Trang Đăng Nhập');
    this.islogged = this.token.isLogger();
    if (this.islogged) {
      this.router.navigateByUrl('/')
    }
  }
  login() {
    this.loginService.login(this.form.value).subscribe(next => {
        if (this.form.controls.rememberMe.value) {
          this.token.rememberMe(next.token, next.id, next.name, next.username, next.phoneNumber, next.email, next.address, next.age,
            next.gender, next.dateOfBirth, next.avatar, next.roles, 'local');

        } else {
          this.token.rememberMe(next.token, next.id, next.name, next.username, next.phoneNumber, next.email, next.address, next.age,
            next.gender, next.dateOfBirth, next.avatar, next.roles, 'session');
        }
      console.log(next)
        this.share.sendClickEvent();
        this.router.navigateByUrl('/')
      }, error => {
        console.log(error)
        if (error.error) {
          for (let i = 0; i < error.error.length; i++) {
            this.message = error.error[i].defaultMessage
          }
        }
        if (error.error.message) {
          this.message = error.error.message
        }
      }
    )
  }
}
