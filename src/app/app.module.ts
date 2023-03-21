import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ProfileComponent } from './profile/profile.component';
import {HomeModule} from "./home/home.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProductComponent,
    CartComponent,
    ProfileComponent
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
      HomeModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
