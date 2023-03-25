import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {ListComponent} from "./list/list.component";
import {ManagerComponent} from "../manager/manager.component";

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'body',component:HomeComponent},
  {path:'header',component:HeaderComponent},
  {path:'footer',component:FooterComponent},
  {path:'list',component:ListComponent},
  {path:'manager',component:ManagerComponent},

  {path:'list/search/:category/:name',component:ListComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
