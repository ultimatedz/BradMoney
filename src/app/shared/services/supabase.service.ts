import { Injectable } from '@angular/core';
import { AuthChangeEvent, AuthSession, createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient
  _session: AuthSession | null = null

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

  get authStateChange(){
    const test = this.supabase.auth.onAuthStateChange(((event, session) => {
      return {event, session}
    }))

    return test
  }

  get users() {
    return this.supabase.from('users').select()
  }

  getUser(email: string) {
    return this.supabase.from('users').select('email, password').eq('email', email)
  }

  addUser(user: any) {
    return this.supabase
      .from('users')
      .insert({ name: user.name, email: user.email, password: user.password, cpf: user.cpf, terms: user.terms })
      .select()
  }

  resetPassword(email: string){
    return this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:4200/new-password',
    })
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email: email, password: password, options: {
      emailRedirectTo: 'http://localhost:4200/login/signUp'
    } })
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email: email, password: password })
  }

  signOut() {
    return this.supabase.auth.signOut()
  }
}
