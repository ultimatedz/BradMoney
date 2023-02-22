import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Component({
  selector: 'app-exit',
  templateUrl: './exit.component.html',
  styleUrls: ['./exit.component.scss']
})
export class ExitComponent implements OnInit {

  session = this.supaBaseService.session

  constructor(
    private supaBaseService: SupabaseService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.supaBaseService.authChanges((_, session) => (this.session = session))

    const session = this.supaBaseService.session

    if (!session) {
      this.router.navigate(['/'])
    }
  }

  async handleSignOut() {
    await this.supaBaseService.signOut()

    this.router.navigate(['/'])
  }

}
