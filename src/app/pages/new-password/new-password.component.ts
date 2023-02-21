import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  constructor(private supaBaseService: SupabaseService){}

  async ngOnInit(): Promise<void> {
    const teste = await this.supaBaseService.authStateChange
    console.log(teste)
  }
}
