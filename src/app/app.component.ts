import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from './state/state';
import { clipboardChanged } from './state/clip/clip.actions';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { networkStatusChanged, setBreakpointState } from './state/app-state/app-state.actions';
import { ClipboardWatcherService } from './clipboard-watcher/clipboard-watcher.service';
import { ConnectionService } from 'ng-connection-service';
import { appStateSelectBreakpointState, appStateSelectIsConnected } from './state/app-state/app-state.selectors';
import { AngularFireAuth } from '@angular/fire/auth';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppError } from './state/error/app-error.model';
import { v4 } from 'uuid';
import { addError } from './state/error/app-error.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  private unsubscribe$: Subject<void>;
  offline$: Observable<boolean>;
  isSmall$: Observable<boolean>;
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
    private clipboardWatcherService: ClipboardWatcherService,
    private connectionService: ConnectionService,
    private angularFireAuth: AngularFireAuth,
    private swUpdate: SwUpdate,
    private matSnackBar: MatSnackBar,
  ) {
  }

  /*
  TODO: consider adding an IPC call to kill the clipboard watcher in the destructor
   */

  ngOnInit(): void {
    // Create the unsubscribe subject
    this.unsubscribe$ = new Subject<void>();
    this.offline$ = new BehaviorSubject<boolean>(false);

    // Watch for application updates from the sw
    this.swUpdate.available
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap(() => this.matSnackBar.open('Crossclip has an update available', 'UPGRADE').afterDismissed())
       )
      .subscribe(shouldUpdate => {
        if (shouldUpdate) {
          this.swUpdate.activateUpdate().then(() => document.location.reload())
        }
      });

    this.swUpdate.activated
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.matSnackBar.open('Crossclip was updated', 'CLOSE', {
          duration: 3000
        })
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

    // Watch the state...
    this.offline$ = this.store$.pipe(select(appStateSelectIsConnected), map(value => !value));

    this.isSmall$ = this.store$.pipe(
      select(appStateSelectBreakpointState),
      map(state => state.breakpoints[Breakpoints.Small] || state.breakpoints[Breakpoints.XSmall]),
    );

    // Watch if the user is logged in or not
    this.userLoggedOut$ = this.angularFireAuth.user.pipe(map(user => !user));
  }

  ngAfterViewInit(): void {
    // Create some sort of basic error for testing
    const genericError: AppError = {
      causingComponent: 'main app',
      errorType: 'app',
      message: 'Dummy Error. Hello World!!',
      id: v4(),
    };

    this.store$.dispatch(addError({ error: genericError }));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
