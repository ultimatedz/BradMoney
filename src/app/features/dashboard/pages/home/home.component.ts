import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  session = this.supaBaseService.session
  user!: any
  showDashboard = false

  constructor(
    private supaBaseService: SupabaseService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {

    this.supaBaseService.authChanges((_, session) => (this.session = session))

    const session = this.supaBaseService.session

    const { data } = await this.supaBaseService.getUser(session?.user.email!)
    this.user = await JSON.parse(JSON.stringify(data![0]))

    if (!session) {
      this.router.navigate(['/'])
    }
  }

  async handleSignOut() {
    await this.supaBaseService.signOut()

    this.router.navigate(['/'])
  }
}
