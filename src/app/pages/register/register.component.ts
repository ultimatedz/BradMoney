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
  registerForm!: FormGroup<RegisterForm>

  constructor(
    private supaBaseService: SupabaseService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cpf: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    })

    const session = this.supaBaseService.session

    if (session) {
      this.router.navigate(['/dashboard'])
    }
  }

  async handleSubmit(event: SubmitEvent) {
    event.preventDefault()

    if (this.registerForm.valid) {
      const { error, data } = await this.supaBaseService.addUser(
        {
          'name': this.registerForm.value.name,
          'email': this.registerForm.value.email,
          'password': this.registerForm.value.password,
          'cpf': this.registerForm.value.cpf,
          'terms': this.registerForm.value.terms
        })

      await this.supaBaseService.signUp(this.registerForm.value.email!, this.registerForm.value.password!) 

      if (data![0]) {
        this.router.navigate(['/login'])
      }
    }
  }
}
