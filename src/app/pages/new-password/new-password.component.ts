import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewPassword } from 'src/app/shared/models/new-password.model';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm!: FormGroup<NewPassword>
  session = this.supaBaseService.session
  resetPassword!: boolean
  showLoader!:boolean
  showAlert!:boolean
  showTooltipPassword!: boolean
  inputValidations = {
    'password': {
      'invalid': false,
      'error': ''
    },
    'confirmPassword': {
      'invalid': false,
      'error': ''
    },
  }

  constructor(
    private supaBaseService: SupabaseService,
    private formBuilder: FormBuilder,
    private router: Router,
    ){}

   ngOnInit(): void {
    this.newPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    })

    this.supaBaseService.authChanges((event, session) => {
      if(event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN'){
        this.resetPassword = true
      } else {
        this.resetPassword = false
      }
    })
  }

  async handleSubmit(event: SubmitEvent){
    event.preventDefault()

    const userActivated = this.supaBaseService.session

    this.validateInputs()

    if(this.newPasswordForm.valid && this.newPasswordForm.get('password')?.value?.localeCompare(this.newPasswordForm.get('confirmPassword')?.value!) === 0){
      this.showLoader = true
      try {
        const { error } = await this.supaBaseService.updateUserDataBase(userActivated?.user.email!, this.newPasswordForm.get('confirmPassword')?.value!)

        if(error) throw error

        try {
          const {data, error} = await this.supaBaseService.updateUserAuth(this.newPasswordForm.get('confirmPassword')?.value!)
  
          if(error) throw error

          try {
            const {error} = await this.supaBaseService.signOut()
    
            if(error) throw error
    
            this.showAlert = true
            this.showLoader = false
    
            setTimeout(() => {
              this.router.navigate(['/login'])
            }, 2000)
    
          } catch (error){
            console.log(error)
          }
  
        } catch (error){
          console.log(error)
        }
        
      } catch (error){
        console.log(error)
      }
    }
  }

  validateInputs() {
    this.validateInput(this.inputValidations.password, this.newPasswordForm.get('password'), 'Senha não atende os requisitos!')
    this.validateInput(this.inputValidations.confirmPassword, this.newPasswordForm.get('confirmPassword'), 'Senha não atende os requisitos!')

    if((this.newPasswordForm.get('password')?.value?.localeCompare(this.newPasswordForm.get('confirmPassword')?.value!) !== 0) && this.newPasswordForm.get('password')?.valid){
      this.validateInput(this.inputValidations.confirmPassword, this.newPasswordForm.get('confirmPassword'), 'Senha não coincide com a anterior!', true)
    }
  }

  validateInput(elementValidation: { 'invalid': boolean, 'error': string }, elementForm: any, message: string, passwordComparasion: boolean = false) {
    if (elementForm.invalid || passwordComparasion) {
      elementValidation.invalid = true
      if (elementForm?.value.length <= 0) {
        elementValidation.error = 'Campo obrigatório!'
      } else if (elementForm.invalid) {
        elementValidation.error = message
      } else if (passwordComparasion){
        elementValidation.error = message
      }

      setTimeout(() => {
        elementValidation.invalid = false
      }, 1500)
    }
  }

  handleShowTooltipPassword(state: boolean){
    this.showTooltipPassword = state
  }
  
}
