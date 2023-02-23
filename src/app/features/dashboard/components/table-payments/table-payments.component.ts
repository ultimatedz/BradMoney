import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { SupabaseService } from 'src/app/shared/services/supabase.service';
import { PaymentsForm } from '../../models/payments-form.model';

@Component({
  selector: 'app-table-payments',
  templateUrl: './table-payments.component.html',
  styleUrls: ['./table-payments.component.scss']
})
export class TablePaymentsComponent implements OnInit {
  user!: any
  displayedColumns: string[] = ['name', 'weight', 'symbol', 'edit','delete'];
  dataSource!: any
  paymentsForm!: FormGroup<PaymentsForm>
  showModal: boolean = false
  showTable: boolean = true
  elementEditId!: any 
  showPaginator: boolean = false


  @Input() paymentItem: any

  constructor(
    private supaBaseService: SupabaseService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    this.paymentsForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      date: ['', Validators.required],
      amount: ['', Validators.required]
    })

    const session = this.supaBaseService.session

    const { data } = await this.supaBaseService.getUser(session?.user.email!)
    this.user = await JSON.parse(JSON.stringify(data![0]))

    if(this.user.payments.length){

      this.showPaginator = true
  
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.user.payments);
  
      this.dataSource.paginator = this.paginator;
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  handleOpenModal(element: any){
    const date = element.date.split('/')

    this.paymentsForm.setValue({
      title: element.title,
      amount: element.amount,
      date: `${date[2]}-${date[1]}-${date[0]}`
    })

    this.elementEditId = element.id

    this.showModal = true
  }

  async handleUpdateItem(event: SubmitEvent){
    event.preventDefault()

    if (this.paymentsForm.valid) {

      const user = await this.supaBaseService.getUser(this.user.email)

      let newList =  user.data![0].payments.filter((element: any) => element.id !== this.elementEditId)

      const dataPaymentFormated = {
        id: this.elementEditId,
        date: new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(new Date(this.paymentsForm.get('date')?.value!)),
        title: this.paymentsForm.get('title')?.value!,
        amount: this.paymentsForm.get('amount')?.value!
      }

      newList.unshift(dataPaymentFormated)

      try {
        const {data, error} = await this.supaBaseService.updatePaymentsUser(newList, this.user.email)
  
        this.dataSource = new MatTableDataSource<PeriodicElement>(newList);
        this.dataSource.paginator = this.paginator;

        this.showModal = false
  
        if(error) throw error
      } catch(error){
        console.log(error)
      }
    }
  }

  async handleDeleteItem(id: string){

    const user = await this.supaBaseService.getUser(this.user.email)

    let newList = user.data![0].payments.filter((element: any) => element.id !== id)

    try {
      const {error} = await this.supaBaseService.updatePaymentsUser(newList, this.user.email)
  
      this.dataSource = new MatTableDataSource<PeriodicElement>(newList);
      this.dataSource.paginator = this.paginator;

      if(error) throw error
    } catch(error){
      console.log(error)
    }

    
  }

  handleCloseModal(){
    this.showModal = false
  }
}



export interface PeriodicElement {
  name: string;
  weight: string;
  symbol: string;
}