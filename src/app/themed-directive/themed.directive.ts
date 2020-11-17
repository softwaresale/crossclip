import { Directive, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { appStateSelectTheme } from '../state/app-state/app-state.selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appThemed]'
})
export class ThemedDirective implements OnInit, OnDestroy {

  @Input()
  lightClass: string | string[] | null;

  @Input()
  darkClass: string | string[] | null;

  @HostBinding('class')
  styleClass: string;

  private unsubscribe$: Subject<void>;

  constructor(private store$: Store<any>) {}

  ngOnInit(): void {
    this.unsubscribe$ = new Subject<void>();

    this.store$
      .pipe(select(appStateSelectTheme), takeUntil(this.unsubscribe$))
      .subscribe(isDarkTheme => {
        if (isDarkTheme) {
          this.applyDarkThemes();
        } else {
          this.applyLightThemes();
        }
      });
  }

  private applyDarkThemes() {
    if (typeof this.darkClass === 'string') {
      this.styleClass = this.darkClass as string;
    } else if (this.darkClass instanceof Array) {
      this.styleClass = this.darkClass.join(' ');
    } else {
      this.styleClass = 'dark-theme';
    }
  }

  private applyLightThemes() {
    if (typeof this.lightClass === 'string') {
      this.styleClass = this.lightClass as string;
    } else if (this.lightClass instanceof Array) {
      this.styleClass = this.lightClass.join(' ');
    } else {
      this.styleClass = 'light-theme';
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
