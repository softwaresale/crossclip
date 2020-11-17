import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { appStateSelectAnySmall } from '../state/app-state/app-state.selectors';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit, OnDestroy {

  isMobile: boolean;
  sub: Subscription;

  constructor(
    private store$: Store<any>,
  ) { }

  ngOnInit(): void {
    this.sub = this.store$.pipe(select(appStateSelectAnySmall)).subscribe(isMobile => this.isMobile = isMobile);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get readmeLink(): string {
    return environment.readmeLink;
  }
}
