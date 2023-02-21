import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { DashboardHomeComponent } from './features/dashboard/pages/dashboard-home/dashboard-home.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { DashboardExitComponent } from './features/dashboard/pages/dashboard-exit/dashboard-exit.component';
import { DashboardContactComponent } from './features/dashboard/pages/dashboard-contact/dashboard-contact.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login/signUp', component: LoginComponent},
  {path: 'recovery', component: RecoveryComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'new-password', component: NewPasswordComponent},
  {path: 'dashboard', component: DashboardHomeComponent},
  {path: 'exit', component: DashboardExitComponent},
  {path: 'contact', component: DashboardContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
