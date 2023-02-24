
import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-table-history',
  templateUrl: './table-history.component.html',
  styleUrls: ['./table-history.component.scss']
})
export class TableHistoryComponent implements OnInit{
  user!: any
  displayedColumns: string[] = ['name', 'weight', 'symbol'];
  dataSource!: any;

  constructor(
    private supaBaseService: SupabaseService,
  ) { }

  async ngOnInit() {
    const session = this.supaBaseService.session

    const { data } = await this.supaBaseService.getUser(session?.user.email!)
    this.user = await JSON.parse(JSON.stringify(data![0]))

    if(this.user.payments){
      let historyList: any = await (await this.supaBaseService.getUser(this.user.email)).data![0].payments

      historyList = this.sortList(historyList)

      this.dataSource = new MatTableDataSource<PeriodicElement>(historyList);

      this.dataSource.paginator = this.paginator;
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  sortList(list: Array<any>){
    return list.sort(function(a:any,b:any){
      const dateOneSplit = a.date.split("/")
      const dateTwoSplit = b.date.split("/")

      const constDateOneFormatted: any = new Date(dateOneSplit[2], dateOneSplit[1] - 1, dateOneSplit[0])
      const constDateTwoFormatted: any = new Date(dateTwoSplit[2], dateTwoSplit[1] - 1, dateTwoSplit[0])

      return constDateTwoFormatted - constDateOneFormatted ;
    });
  }

}

export interface PeriodicElement {
  name: string;
  weight: string;
  symbol: string;
}