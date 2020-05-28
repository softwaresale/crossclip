import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
  ) { }

  isAuthenticated(): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(map(state => !!state));
  }

  user(): Observable<User> {
    return this.angularFireAuth.authState;
  }

  signOut() { return this.angularFireAuth.signOut(); }
}
