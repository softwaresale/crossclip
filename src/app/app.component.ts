import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from './state/state';
import { clipboardChanged } from './state/clip/clip.actions';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import {
  networkStatusChanged,
  setBreakpointState,
  setDarkTheme,
  setLightTheme
} from './state/app-state/app-state.actions';
import { ClipboardService } from './clipboard-watcher/clipboard.service';
import { ConnectionService } from 'ng-connection-service';
import {
  appStateSelectAnySmall,
  appStateSelectIsConnected, appStateSelectTheme
} from './state/app-state/app-state.selectors';
import { AngularFireAuth } from '@angular/fire/auth';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {

  @HostBinding('class')
  styleClass: string;

  private unsubscribe$: Subject<void>;
  offline$: Observable<boolean>;
  isSmall$: BehaviorSubject<boolean>;
  userLoggedOut$: Observable<boolean>;

  navEndpoints = [
    {
      path: '/local',
      text: 'Local Clips',
      icon: 'devices',
      disableOffline: false,
    },
    {
      path: '/remote',
      text: 'Remote Clips',
      icon: 'cloud',
      disableOffline: true,
    },
    {
      path: '/profile',
      text: 'Profile',
      icon: 'account_circle',
      disableOffline: false,
    }
  ];

  constructor(
    private store$: Store<State>,
    private breakpointObserver: BreakpointObserver,
    private clipboardWatcherService: ClipboardService,
    private connectionService: ConnectionService,
    private angularFireAuth: AngularFireAuth,
    private swUpdate: SwUpdate,
    private matSnackBar: MatSnackBar,
    private overlayContainer: OverlayContainer,
  ) {
  }

  /*
  TODO: consider adding an IPC call to kill the clipboard watcher in the destructor
   */

  ngOnInit(): void {
    // Create the unsubscribe subject
    this.unsubscribe$ = new Subject<void>();
    this.offline$ = new BehaviorSubject<boolean>(false);
    this.isSmall$ = new BehaviorSubject<boolean>(false);

    // Watch for application updates from the sw
    this.swUpdate.available
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap(() => this.matSnackBar.open('Crossclip has an update available', 'UPGRADE').afterDismissed())
       )
      .subscribe(shouldUpdate => {
        if (shouldUpdate) {
          this.swUpdate.activateUpdate().then(() => document.location.reload());
        }
      });

    this.swUpdate.activated
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.matSnackBar.open('Crossclip was updated', 'CLOSE', {
          duration: 3000
        });
      });

    // TODO consider moving this somewhere else
    // Watch for clipboard changes
    this.clipboardWatcherService.clipboardWatcher$.pipe(takeUntil(this.unsubscribe$)).subscribe(newText => {
      console.log(`Incoming text: ${newText}`);
      this.store$.dispatch(clipboardChanged({ text: newText }));
    });

    // Watch the breakpoint
    this.breakpointObserver.observe([ Breakpoints.Large, Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Handset ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(state => this.store$.dispatch(setBreakpointState({ breakpointState: state })));

    // Watch network connected status
    this.connectionService.monitor()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isConnected =>
        this.store$.dispatch(networkStatusChanged({isConnected}))
      );

    // Watch for system theme changes
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.store$.dispatch(setDarkTheme());
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      this.store$.dispatch(setLightTheme());
    }

    // Watch the state...
    this.offline$ = this.store$.pipe(select(appStateSelectIsConnected), map(value => !value));

    this.store$.pipe(
      select(appStateSelectAnySmall),
      takeUntil(this.unsubscribe$)
    ).subscribe(this.isSmall$);

    // Watch if the user is logged in or not
    this.userLoggedOut$ = this.angularFireAuth.user.pipe(map(user => !user));

    this.store$
      .pipe(select(appStateSelectTheme), takeUntil(this.unsubscribe$))
      .subscribe(isDarkTheme => {
        if (isDarkTheme) {
          this.overlayContainer.getContainerElement().classList.remove('light-theme');
          this.overlayContainer.getContainerElement().classList.add('dark-theme');
          this.styleClass = 'dark-theme';
        } else {
          this.overlayContainer.getContainerElement().classList.remove('dark-theme');
          this.overlayContainer.getContainerElement().classList.add('light-theme');
          this.styleClass = 'light-theme';
        }
      });
  }

  get pageHeight(): number {
    return this.isSmall$.getValue() ? 56 : 64;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
