import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {LoginService} from "../service/login/login.service";
import {TokenService} from "../service/login/token.service";
import {Router} from "@angular/router";
import {ShareService} from "../service/login/share.service";
import {User} from "../entity/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isLogged = false;
  user: User;
  role = 'none';
  constructor(private title:Title,private loginService: LoginService, private token: TokenService, private router: Router, private share: ShareService) { }

  ngOnInit(): void {
    window.scroll(0,130);
      this.loader();
      this.share.getClickEvent().subscribe(next => {
       this.loader();
      })
  }
  loader() {
    this.isLogged = this.token.isLogger()
    if (this.isLogged) {
      this.loginService.profile(this.token.getId()).subscribe(next => {
        this.user = next;
        this.title.setTitle('' + next.name )
      })
      this.role = this.token.getRole();
    }
  }
}
