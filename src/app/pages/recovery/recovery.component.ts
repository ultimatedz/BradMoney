import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from 'src/app/shared/models/login-form.model';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
  recoveryForm!: FormGroup<Pick<LoginForm, 'email'>>
  emailInvalid!: boolean
  showRecoveryLoader!: boolean
  requestAlreadyMade!: boolean
  recoverySuccessfully!:boolean

  constructor(
    private supaBaseService: SupabaseService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  async handleResetPassword(event: SubmitEvent){
    event.preventDefault()

    if (this.recoveryForm.get('email')?.invalid && this.recoveryForm.get('email')?.value) {
      this.emailInvalid = true

      setTimeout(() => {
        this.emailInvalid = false
      }, 2000)
    }

    if(this.recoveryForm.valid){
      this.showRecoveryLoader = true
      try {
        const {data, error} = await this.supaBaseService.resetPassword(this.recoveryForm.get('email')?.value!)

        if(data){
          this.showRecoveryLoader = false
          this.recoverySuccessfully = true
        }

        if(error) throw error

      } catch (error){
        this.showRecoveryLoader = false
        const messageErrorJson = JSON.stringify(error)
        const messageError = JSON.parse(messageErrorJson).message
        
        if(messageError === 'For security purposes, you can only request this once every 60 seconds'){
          this.requestAlreadyMade = true

          setTimeout(() => {
            this.requestAlreadyMade = false
          }, 3000)
        } else {
          console.log(messageError)
        }
      }
    }    
  }

}
