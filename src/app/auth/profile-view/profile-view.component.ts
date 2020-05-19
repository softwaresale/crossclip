import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { select, Store } from '@ngrx/store';
import { State } from '../../state/state';
import { Observable } from 'rxjs';
import { appStateSelectAnySmall } from '../../state/app-state/app-state.selectors';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.sass']
})
export class ProfileViewComponent implements OnInit {

  isMobile$: Observable<boolean>;
  user$: Observable<User>;

  constructor(
    private store$: Store<State>,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isMobile$ = this.store$.pipe(select(appStateSelectAnySmall));
    this.user$ = this.angularFireAuth.user;
  }

  onLogout() {
    this.angularFireAuth.signOut().then(() => this.router.navigate(['/login']));
  }
}
