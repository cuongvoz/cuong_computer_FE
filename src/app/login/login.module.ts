import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
