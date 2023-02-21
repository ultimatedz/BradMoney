import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-dashboard-contact',
  templateUrl: './dashboard-contact.component.html',
  styleUrls: ['./dashboard-contact.component.scss']
})
export class DashboardContactComponent {
  session = this.supaBaseService.session

  constructor(private supaBaseService: SupabaseService, private router: Router){}

  ngOnInit(): void {
    
    this.supaBaseService.authChanges((_, session) => (this.session = session))

    const session = this.supaBaseService.session
    
    if(!session){
      this.router.navigate(['/'])
    }
  }

}


