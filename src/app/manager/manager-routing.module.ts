import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreatePCComponent} from "./create-pc/create-pc.component";
import {CreateLaptopComponent} from "./create-laptop/create-laptop.component";
import {CreateChairComponent} from "./create-chair/create-chair.component";
import {CreateMonitorComponent} from "./create-monitor/create-monitor.component";
import {CreateKeyBoardComponent} from "./create-key-board/create-key-board.component";
import {CreateMouseComponent} from "./create-mouse/create-mouse.component";
import {ManagerComponent} from "./manager.component";
import {ProductManagerComponent} from "./product-manager/product-manager.component";
import {EmployeeGuard} from "../security/employee.guard";


const routes: Routes = [
  {path: '', component: ManagerComponent,canActivate:[EmployeeGuard]},
  {path: 'product', component: ProductManagerComponent},
  {path: 'create/2/:id', component: CreatePCComponent},
  {path: 'create/1/:id', component: CreateLaptopComponent},
  {path: 'create/6/:id', component: CreateChairComponent},
  {path: 'create/4/:id', component: CreateMonitorComponent},
  {path: 'create/3/:id', component: CreateKeyBoardComponent},
  {path: 'create/5/:id', component: CreateMouseComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule {
}
