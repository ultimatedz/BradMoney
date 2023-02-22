import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  session = this.supaBaseService.session
  user!: any 

  constructor(private supaBaseService: SupabaseService, private router: Router){}

  async ngOnInit(): Promise<void> {
    
    this.supaBaseService.authChanges((_, session) => (this.session = session))

    const session = this.supaBaseService.session
    
    const { data } = await this.supaBaseService.getUser(session?.user.email!)
    this.user = await JSON.parse(JSON.stringify(data![0]))

    console.log(this.user)
    
    if(!session){
      this.router.navigate(['/'])
    }
  }

}
