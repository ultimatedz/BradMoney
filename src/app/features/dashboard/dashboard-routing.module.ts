import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from "./pages/contact/contact.component";
import { ExitComponent } from "./pages/exit/exit.component";
import { HomeComponent } from "./pages/home/home.component";
import { InvestmentsComponent } from "./pages/investments/investments.component";
import { PaymentsComponent } from "./pages/payments/payments.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent },
  {path: 'payments', component: PaymentsComponent},
  {path: 'investments', component: InvestmentsComponent},
  {path: 'exit', component: ExitComponent},
  {path: 'contact', component: ContactComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }