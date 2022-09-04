import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { Auth, signInWithEmailAndPassword, UserCredential, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth : Auth) { }

  login(user: User): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  register(user: User){
    return createUserWithEmailAndPassword(this.auth, user.email, user.password)
  }

  loginWithGoogle(): Promise<UserCredential> {
     return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return this.auth.signOut();
  }

  getSessionData(key: string): string {
    return sessionStorage.getItem(key) as string;
  }

  setSessionData(key:string, value: string) : void {
    sessionStorage.setItem(key, value)
  }
}
