import { Injectable } from '@angular/core';
import { AuthChangeEvent, AuthSession, createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/app/environments/environments';
import { User } from '../models/user.model';

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

  get users() {
    return this.supabase.from('users').select()
  }

  getUser(email: string) {
    return this.supabase.from('users').select('name, email, cpf, investments, payments, history').eq('email', email)
  }

  addUser(user: User) {
    return this.supabase
      .from('users')
      .insert<User>(
        { 
          name: user.name, 
          email: user.email, 
          password: user.password, 
          cpf: user.cpf, 
          terms: user.terms,
          investments: user.investments,
          payments: user.payments,
          history: user.history
        }
      )
      .select()
  }

  resetPassword(email: string){
    return this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:4200/new-password',
    })
  }

  updateUserDataBase(email: string, password: string){
    return this.supabase.from('users').update({ password: password }).eq('email', email)
  }

  updateUserAuth(password: string){
    return this.supabase.auth.updateUser({password: password})
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
