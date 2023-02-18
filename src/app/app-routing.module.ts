import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { DashboardHomeComponent } from './features/dashboard/pages/dashboard-home/dashboard-home.component'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'recovery', component: RecoveryComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'new-password', component: NewPasswordComponent},
  {path: 'dashboard', component: DashboardHomeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
