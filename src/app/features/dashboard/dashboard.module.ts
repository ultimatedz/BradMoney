import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ChartComponent } from './components/chart/chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { TableHistoryComponent } from './components/table-history/table-history.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactComponent } from './pages/contact/contact.component';
import { ExitComponent } from './pages/exit/exit.component';
import { HomeComponent } from './pages/home/home.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { InvestmentsComponent } from './pages/investments/investments.component';
import { TablePaymentsComponent } from './components/table-payments/table-payments.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ModalComponent } from './components/modal/modal.component';
import { InvestmentPanelComponent } from './components/investment-panel/investment-panel.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenu, MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    ContactComponent,
    ExitComponent,
    ChartComponent,
    LineChartComponent,
    TableHistoryComponent,
    PaymentsComponent,
    InvestmentsComponent,
    TablePaymentsComponent,
    ModalComponent,
    InvestmentPanelComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatPaginatorModule,
    SharedModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatMenuModule
  ],
  exports: [
    HomeComponent
  ]
})
export class DashboardModule { }