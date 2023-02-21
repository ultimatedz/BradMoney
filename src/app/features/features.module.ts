import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardHomeComponent } from './dashboard/pages/dashboard-home/dashboard-home.component';
import { ChartComponent } from './chart/chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TableHistoryComponent } from './table-history/table-history.component';
import { DashboardExitComponent } from './dashboard/pages/dashboard-exit/dashboard-exit.component';
import { DashboardContactComponent } from './dashboard/pages/dashboard-contact/dashboard-contact.component';



@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    DashboardExitComponent,
    DashboardContactComponent,
    ChartComponent,
    LineChartComponent,
    TableHistoryComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatPaginatorModule
  ],
  exports: [
    DashboardHomeComponent
  ]
})
export class FeaturesModule { }
