import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../state/state';
import { Observable } from 'rxjs';
import { appStateSelectTheme } from '../state/app-state/app-state.selectors';
import { map } from 'rxjs/operators';
import { toggleTheme } from '../state/app-state/app-state.actions';

@Component({
  selector: 'app-theme-setter',
  templateUrl: './theme-setter.component.html',
  styleUrls: ['./theme-setter.component.sass']
})
export class ThemeSetterComponent implements OnInit {

  isDarkTheme$: Observable<boolean>;
  icon$: Observable<string>;

  constructor(
    private store$: Store<State>,
  ) { }

  ngOnInit(): void {
    this.isDarkTheme$ = this.store$.pipe(
      select(appStateSelectTheme),
    );

    this.icon$ = this.isDarkTheme$.pipe(
      map(isDarkTheme => isDarkTheme ? 'brightness_3' : 'brightness_5')
    );
  }

  onToggleTheme() {
    this.store$.dispatch(toggleTheme());
  }
}
