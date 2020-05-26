import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../state/state';
import { Observable } from 'rxjs';
import { appStateSelectTheme } from '../../../state/app-state/app-state.selectors';

@Component({
  selector: 'app-profile-button-popup',
  templateUrl: './profile-button-popup.component.html',
  styleUrls: ['./profile-button-popup.component.sass']
})
export class ProfileButtonPopupComponent implements OnInit {

  @Input()
  displayName: string;
  @Output()
  onLogout = new EventEmitter();
  @Output()
  onProfile = new EventEmitter();

  isDarkTheme$: Observable<boolean>;

  constructor(
    private store$: Store<State>,
  ) { }

  ngOnInit(): void {
    this.isDarkTheme$ = this.store$.pipe(select(appStateSelectTheme));
  }
}
