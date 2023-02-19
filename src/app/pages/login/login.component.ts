import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/shared/models/login-form.model';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  session = this.supaBaseService.session
  loginForm!: FormGroup<LoginForm>

  emailInvalid!: boolean
  passwordInvalid!: boolean
  loginInvalid!: boolean

  constructor(
    private formBuilder: FormBuilder,
    private supaBaseService: SupabaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    const session = this.supaBaseService.session

    if (session) {
      this.router.navigate(['/dashboard'])
    }
  }

  async handleSubmit(event: SubmitEvent) {
    event.preventDefault()

    if (this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.value) {
      this.emailInvalid = true

      setTimeout(() => {
        this.emailInvalid = false
      }, 2000)
    }

    if (this.loginForm.get('email')?.valid && this.loginForm.get('password')?.invalid) {
      this.passwordInvalid = true

      setTimeout(() => {
        this.passwordInvalid = false
      }, 2000)
    }

    if (this.loginForm.get('email')?.valid && this.loginForm.get('password')?.valid) {
      try {
        
        const {data, error} = await this.supaBaseService.signIn(this.loginForm.value.email!, this.loginForm.value.password!)

        if(error) throw error

        if(data.session){
          this.router.navigate(['/dashboard'])
        }

      } catch(error) {
        const messageErrorJson = JSON.stringify(error)
        const messageError = JSON.parse(messageErrorJson).message
        
        if(messageError === 'Invalid login credentials'){
          this.loginInvalid = true
        } else {
          console.log(messageError)
        }

        setTimeout(() => {
          this.loginInvalid = false
        }, 2000)
      }
    }
  }
}
