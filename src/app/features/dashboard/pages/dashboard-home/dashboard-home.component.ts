import { Component, Input } from '@angular/core';
import { AuthSession } from '@supabase/supabase-js';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent {
  @Input()
  session!: AuthSession
}
