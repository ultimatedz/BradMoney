
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-table-history',
  templateUrl: './table-history.component.html',
  styleUrls: ['./table-history.component.scss']
})
export class TableHistoryComponent implements AfterViewInit{
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
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
}



const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Supermercado', weight: '09/02/2023', symbol: 'R$617,00'},
  { name: 'Farmacia', weight: '09/02/2023', symbol: 'R$32,80'},
  { name: 'Restaurante', weight: '09/02/2023', symbol: 'R$160,00'},
  { name: 'Estacionamento', weight: '09/02/2023', symbol: 'R$25,00'},
  { name: 'iFood', weight: '09/02/2023', symbol: 'R$24,58'},
  { name: 'Tia da Esquina', weight: '09/02/2023', symbol: 'R$2,30'},
  { name: 'Conta de Luz', weight: '09/02/2023', symbol: 'R$127,80'},
  { name: 'Aluguel', weight: '09/02/2023', symbol: 'R$1.200,00'},
  { name: 'Restaurante', weight: '09/02/2023', symbol: 'R$158,00'},
  { name: 'Restaurante', weight: '09/02/2023', symbol: 'R$345,55'},

];