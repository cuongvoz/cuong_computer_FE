import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  username = ''
  constructor(private http: HttpClient,private tokenService:TokenService) { }

  login(obj): Observable<any> {
    return this.http.post('https://dirty-cream-production.up.railway.app/api/auth/login',{username: obj.username,password: obj.password})
  }

  register(obj):Observable<any> {
    return this.http.post('https://dirty-cream-production.up.railway.app/api/auth/signup',obj);
  }
  changePassword(obj):Observable<any> {
    return this.http.post('https://dirty-cream-production.up.railway.app/api/auth/change-password',{username: this.tokenService.getUsername(),password: obj.password,newPassword:obj.newPassword,confirmPassword:obj.confirmPassword})
  }

  profile(id):Observable<any> {
    return this.http.get<any>('https://dirty-cream-production.up.railway.app/api/auth/profile/'+id);
  }
  avatar(id,avatar):Observable<any> {
    let dto = {
      id:id,
      avatar:avatar
    }
    return this.http.post<any>('https://dirty-cream-production.up.railway.app/api/auth/avatar',dto);
  }
  update(obj):Observable<any> {
    return this.http.post<any>('https://dirty-cream-production.up.railway.app/api/auth/update',obj);
  }
}
