import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-table-payments',
  templateUrl: './table-payments.component.html',
  styleUrls: ['./table-payments.component.scss']
})
export class TablePaymentsComponent {

  displayedColumns: string[] = ['name', 'weight', 'symbol','note','edit','delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}


export interface PeriodicElement {
  name: string;
  weight: string;
  symbol: string;
  note: string;
}




const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Supermercado', weight: '09/02/2023', symbol: 'R$617,00', note: 'teste'},
  { name: 'Farmacia', weight: '09/02/2023', symbol: 'R$32,80', note: 'teste'},
  { name: 'Restaurante', weight: '09/02/2023', symbol: 'R$160,00', note: 'teste'},
  { name: 'Estacionamento', weight: '09/02/2023', symbol: 'R$25,00', note: 'teste'},
  { name: 'iFood', weight: '09/02/2023', symbol: 'R$24,58', note: 'teste'},
  { name: 'Tia da Esquina', weight: '09/02/2023', symbol: 'R$2,30', note: 'teste'},
  { name: 'Conta de Luz', weight: '09/02/2023', symbol: 'R$127,80', note: 'teste'},
  { name: 'Aluguel', weight: '09/02/2023', symbol: 'R$1.200,00', note: 'teste'},
  { name: 'Restaurante', weight: '09/02/2023', symbol: 'R$158,00', note: 'teste'},
  { name: 'Restaurante', weight: '09/02/2023', symbol: 'R$345,55', note: 'teste'},

];