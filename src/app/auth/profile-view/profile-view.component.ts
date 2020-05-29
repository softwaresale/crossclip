import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../state/state';
import { Observable } from 'rxjs';
import { appStateSelectAnySmall } from '../../state/app-state/app-state.selectors';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isMobile$ = this.store$.pipe(select(appStateSelectAnySmall));
    this.user$ = this.authService.user();
  }

  async onLogout() {
    return this.authService.signOut().then(() => this.router.navigate(['/login']));
  }
}
