import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ListComponent } from './list/list.component';
import {AppRoutingModule} from "../app-routing.module";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ListComponent],
    imports: [
        RouterModule,
        AppRoutingModule,
        CommonModule,
        HomeRoutingModule,
        BrowserModule,
        ReactiveFormsModule
    ]
})
export class HomeModule { }
