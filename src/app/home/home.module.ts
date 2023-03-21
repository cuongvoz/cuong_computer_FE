import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ListComponent } from './list/list.component';
import {AppRoutingModule} from "../app-routing.module";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import { ManagerComponent } from './manager/manager.component';


@NgModule({
  declarations: [ListComponent, ManagerComponent],
  imports: [
    RouterModule,
    AppRoutingModule,
    CommonModule,
    HomeRoutingModule,
    BrowserModule
  ]
})
export class HomeModule { }
