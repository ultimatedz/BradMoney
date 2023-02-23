import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterForm } from 'src/app/shared/models/register-form.model';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  session = this.supaBaseService.session
  accountCreated!: boolean
  showTooltipPassword!: boolean
  showLoader!: boolean
  registerForm!: FormGroup<RegisterForm>
  inputValidations = {
    'name': {
      'invalid': false,
      'error': ''
    },
    'email': {
      'invalid': false,
      'error': ''
    },
    'password': {
      'invalid': false,
      'error': ''
    },
    'cpf': {
      'invalid': false,
      'error': ''
    },
    'terms': {
      'invalid': false,
      'error': ''
    },
  }

  constructor(
    private supaBaseService: SupabaseService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)]],
      terms: [false, Validators.requiredTrue]
    })

    this.accountCreated = false

    const session = this.supaBaseService.session

    if (session) {
      this.router.navigate(['/dashboard'])
    }
  }

  async handleSubmit(event: SubmitEvent) {
    event.preventDefault()

    this.validateInputs()

    if (this.registerForm.valid) {
      try {
        this.showLoader = true
        const { error } = await this.supaBaseService.addUser(
          {
            name: this.registerForm.value.name!,
            email: this.registerForm.value.email!,
            password: this.registerForm.value.password!,
            cpf: this.registerForm.value.cpf?.replace(/\D/g,"")!,
            terms: this.registerForm.value.terms!,
            investments: {
              stocks: [],
              fiis: [],
              treasure: [],
              fiagro: [],
            },
            payments: {},
            history: {}
          })

        if (error) throw error

      } catch (error) {
        console.log(error)
      }

      try {
        const { data, error } = await this.supaBaseService.signUp(this.registerForm.value.email!, this.registerForm.value.password!)

        if (data.user) {
          this.showLoader = false
          this.accountCreated = true
        }
        if (error) throw error
      } catch (error) {
        console.log(error)
      }
    }
  }

  validateInputs() {
    this.validateInput(this.inputValidations.name, this.registerForm.get('name'), 'Preencha o nome corretamente!')
    this.validateInput(this.inputValidations.email, this.registerForm.get('email'), 'Email inválido!')
    this.validateInput(this.inputValidations.password, this.registerForm.get('password'), 'Senha não atende os requisitos!')
    this.validateInput(this.inputValidations.cpf, this.registerForm.get('cpf'), 'CPF inválido!')
    this.validateInput(this.inputValidations.terms, this.registerForm.get('terms'), '(Obrigatório)')
  }

  validateInput(elementValidation: { 'invalid': boolean, 'error': string }, elementForm: any, message: string) {
    if (elementForm.invalid) {
      elementValidation.invalid = true
      if (elementForm?.value.length <= 0) {
        elementValidation.error = 'Campo obrigatório!'
      } else if (elementForm.invalid) {
        elementValidation.error = message
      }
      setTimeout(() => {
        elementValidation.invalid = false
      }, 1500)
    } else {
    }
  }

  maskCPF() {
    const cpfElement: HTMLInputElement = document.querySelector('#cpf')!
    cpfElement.value = cpfElement.value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
  }

  handleShowTooltipPassword(state: boolean){
    this.showTooltipPassword = state
  }
}
