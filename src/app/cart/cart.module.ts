import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { BuyComponent } from './buy/buy.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [BuyComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    ReactiveFormsModule,
    BrowserModule
  ]
})
export class CartModule { }
