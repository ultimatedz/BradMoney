import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent implements OnInit {
  investmentsForm!: FormGroup<any>
  user!:any

  constructor(
    private supaBaseService: SupabaseService,
    private formBuilder: FormBuilder
    ){}

  async ngOnInit(): Promise<void> {
    this.investmentsForm = this.formBuilder.group({
      type: ['', [Validators.required]],
      quantity: ['', Validators.required],
      date: ['', Validators.required],
      amount: ['', Validators.required],
    })

    const session = this.supaBaseService.session

    const { data } = await this.supaBaseService.getUser(session?.user.email!)
    this.user = await JSON.parse(JSON.stringify(data![0]))
  }

  async handleAddInvestment(event: SubmitEvent){
    event.preventDefault()

    if (this.investmentsForm.valid) {
      const dateMonth = Number(this.investmentsForm.get('date')?.value!.split('-')[1])
      const dateYear = Number(this.investmentsForm.get('date')?.value!.split('-')[0])

      const dataPaymentFormated = {
        id: new Date().getTime(),
        date: new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(new Date(this.investmentsForm.get('date')?.value!)),
        title: this.investmentsForm.get('title')?.value!,
        amount: this.investmentsForm.get('amount')?.value!
      }

      const { data } = await this.supaBaseService.getUser(this.user.email)
      this.user = await JSON.parse(JSON.stringify(data![0]))

      let newList = this.user.payments

      newList.unshift(dataPaymentFormated)

      // try {
      //   this.showTable = false
      //   this.investmentsForm.reset()

      //   const {data, error} = await this.supaBaseService.updatePaymentsUser(newList, this.user.email)

      //   if(error) throw error

      //   this.showTable = true
        
      // } catch(error){
      //   console.log(error)
      // }
    }
  }
}
