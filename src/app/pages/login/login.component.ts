import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  session = this.supaBaseService.session
  loginForm!: FormGroup<{ 'email': FormControl<string | null>, 'password': FormControl<string | null> }>

  constructor(private formBuilder: FormBuilder, private supaBaseService: SupabaseService, private router: Router){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    const session = this.supaBaseService.session
    
    if(session){
      this.router.navigate(['/dashboard'])
    }
  }

  async handleSubmit(event: SubmitEvent){
    event.preventDefault()
    
    try {
      const {data, error} = await this.supaBaseService.signIn(this.loginForm.value.email!, this.loginForm.value.password!)

      if(data.session){
        this.router.navigate(['/dashboard'])
      }

    } catch(error) {
      console.log(error)
    }
  }
}
