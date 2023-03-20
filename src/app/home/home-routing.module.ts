import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {ListComponent} from "./list/list.component";
import {LaptopComponent} from "./laptop/laptop.component";
import {PcGamingComponent} from "./pc-gaming/pc-gaming.component";
import {KeyboardComponent} from "./keyboard/keyboard.component";
import {MouseComponent} from "./mouse/mouse.component";
import {MonitorComponent} from "./monitor/monitor.component";


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'body',component:HomeComponent},
  {path:'header',component:HeaderComponent},
  {path:'footer',component:FooterComponent},
  {path:'list',component:ListComponent},
  // {path:'list/all/:name',component:ListComponent},
  {path:'list/search/:category/:name',component:ListComponent},
  // {path:'laptop/search/:id/:name',component:LaptopComponent},
  {path:'laptop',component:LaptopComponent},
  {path:'pc',component:PcGamingComponent},
  {path:'keyboard',component:KeyboardComponent},
  {path:'mouse',component:MouseComponent},
  {path:'monitor',component:MonitorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
