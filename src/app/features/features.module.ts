import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardHomeComponent } from './dashboard/pages/dashboard-home/dashboard-home.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class FeaturesModule { }
