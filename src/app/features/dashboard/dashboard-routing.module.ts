import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { DashboardContactComponent } from "./pages/dashboard-contact/dashboard-contact.component";
import { DashboardExitComponent } from "./pages/dashboard-exit/dashboard-exit.component";
import { DashboardHomeComponent } from "./pages/dashboard-home/dashboard-home.component";

const routes: Routes = [
  {path: '', component: DashboardHomeComponent, pathMatch: 'full'},
  {path: 'exit', component: DashboardExitComponent},
  {path: 'contact', component: DashboardContactComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }