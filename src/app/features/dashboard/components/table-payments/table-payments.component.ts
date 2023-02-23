import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-table-payments',
  templateUrl: './table-payments.component.html',
  styleUrls: ['./table-payments.component.scss']
})
export class TablePaymentsComponent implements OnInit {
  user!: any
  displayedColumns: string[] = ['name', 'weight', 'symbol', 'edit','delete'];
  dataSource!: any

  @Input() paymentsList: any

  constructor(
    private supaBaseService: SupabaseService,
  ) { }

  async ngOnInit() {
    const session = this.supaBaseService.session

    const { data } = await this.supaBaseService.getUser(session?.user.email!)
    this.user = await JSON.parse(JSON.stringify(data![0]))

    const paymentsList: any = []

    for(let i = 12; i > 0; i--){
      this.user.payments['2022'][i].forEach((element: any) => {
        paymentsList.push(element)
      })
    }

    this.dataSource = new MatTableDataSource<PeriodicElement>(paymentsList);

    this.dataSource.paginator = this.paginator;
    
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
}

export interface PeriodicElement {
  name: string;
  weight: string;
  symbol: string;
}