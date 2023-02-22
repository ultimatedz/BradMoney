import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardExitComponent } from './pages/dashboard-exit/dashboard-exit.component';
import { DashboardContactComponent } from './pages/dashboard-contact/dashboard-contact.component';
import { ChartComponent } from './components/chart/chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { TableHistoryComponent } from './components/table-history/table-history.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DashboardRoutingModule } from './dashboard-routing.module';

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
    RouterModule,
    DashboardRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatPaginatorModule,
  ],
  exports: [
    DashboardHomeComponent
  ]
})
export class DashboardModule { }