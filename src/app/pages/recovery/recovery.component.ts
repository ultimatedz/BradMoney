import { Component } from '@angular/core';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent {
  constructor(private supaBaseService: SupabaseService){}

  async handleResetPassword(){
    const {data, error} = await this.supaBaseService.resetPassword('luis.silva9902@gmail.com')

    console.log(data, error)
  }
}
