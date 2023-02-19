import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  checked = false;

  constructor(private supaBaseService: SupabaseService, private router: Router) {}

  teste(event: SubmitEvent){
    event.preventDefault()
    console.log('ok')
  }

  ngOnInit(): void {
    const session = this.supaBaseService.session
    
    if(session){
      this.router.navigate(['/dashboard'])
    }
  }

}
