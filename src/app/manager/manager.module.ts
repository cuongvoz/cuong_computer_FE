import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import {CreatePCComponent} from "./create-pc/create-pc.component";
import {CreateChairComponent} from "./create-chair/create-chair.component";
import {CreateKeyBoardComponent} from "./create-key-board/create-key-board.component";
import {CreateLaptopComponent} from "./create-laptop/create-laptop.component";
import {CreateMonitorComponent} from "./create-monitor/create-monitor.component";
import {CreateMouseComponent} from "./create-mouse/create-mouse.component";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "../app-routing.module";
import {HomeRoutingModule} from "../home/home-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [CreatePCComponent, CreateChairComponent, CreateKeyBoardComponent, CreateLaptopComponent, CreateMonitorComponent, CreateMouseComponent],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
