import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/shared/services/supabase.service';
import { PaymentsForm } from '../../models/payments-form.model';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  session = this.supaBaseService.session
  paymentsForm!: FormGroup<PaymentsForm>
  user!: any
  showTable: boolean = true

  constructor(
    private supaBaseService: SupabaseService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit(): Promise<void> {
    this.paymentsForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      date: ['', Validators.required],
      amount: ['', Validators.required]
    })

    this.supaBaseService.authChanges((_, session) => (this.session = session))

    const session = this.supaBaseService.session

    const { data } = await this.supaBaseService.getUser(session?.user.email!)
    this.user = await JSON.parse(JSON.stringify(data![0]))

  }

  async handleAddItem(event: SubmitEvent) {
    event.preventDefault()

    if (this.paymentsForm.valid) {
      const dateMonth = Number(this.paymentsForm.get('date')?.value!.split('-')[1])
      const dateYear = Number(this.paymentsForm.get('date')?.value!.split('-')[0])

      const dataPaymentFormated = {
        id: new Date().getTime(),
        date: new Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(new Date(this.paymentsForm.get('date')?.value!)),
        title: this.paymentsForm.get('title')?.value!,
        amount: this.paymentsForm.get('amount')?.value!
      }

      let newList = this.user.payments

      newList.unshift(dataPaymentFormated)

      try {
        this.showTable = false
        this.paymentsForm.reset()

        const {data, error} = await this.supaBaseService.updatePaymentsUser(newList, this.user.email)

        if(error) throw error

        this.showTable = true
        
      } catch(error){
        console.log(error)
      }
    }
  }
}
