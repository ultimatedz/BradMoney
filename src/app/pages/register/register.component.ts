import { Component } from '@angular/core';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  checked = false;

  constructor(private supaBaseService: SupabaseService) {}

  teste(event: SubmitEvent){
    event.preventDefault()
    console.log('ok')
  }

}
