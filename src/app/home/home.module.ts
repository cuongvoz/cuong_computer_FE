import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ListComponent } from './list/list.component';
import {AppRoutingModule} from "../app-routing.module";
import {RouterModule} from "@angular/router";
import { LaptopComponent } from './laptop/laptop.component';
import { PcGamingComponent } from './pc-gaming/pc-gaming.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { ChairComponent } from './chair/chair.component';
import { MouseComponent } from './mouse/mouse.component';
import { MonitorComponent } from './monitor/monitor.component';
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [ListComponent, LaptopComponent, PcGamingComponent, KeyboardComponent, ChairComponent, MouseComponent, MonitorComponent],
  imports: [
    RouterModule,
    AppRoutingModule,
    CommonModule,
    HomeRoutingModule,
    BrowserModule
  ]
})
export class HomeModule { }
