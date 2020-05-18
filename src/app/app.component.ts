import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from "./state/state";
import { clipboardChanged } from "./state/clip/clip.actions";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { networkStatusChanged, setBreakpointState } from './state/app-state/app-state.actions';
import { ClipboardWatcherService } from './clipboard-watcher/clipboard-watcher.service';
import { ConnectionService } from 'ng-connection-service';
import { appStateSelectBreakpointState, appStateSelectIsConnected } from './state/app-state/app-state.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void>;
  offline$: Observable<boolean>;
  isSmall$: Observable<boolean>;

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
    }
  ];

  constructor(
    private store$: Store<State>,
    private breakpointObserver: BreakpointObserver,
    private clipboardWatcherService: ClipboardWatcherService,
    private connectionService: ConnectionService,
  ) {
  }

  /*
  TODO: consider adding an IPC call to kill the clipboard watcher in the destructor
   */

  ngOnInit(): void {
    // Create the unsubscribe subject
    this.unsubscribe$ = new Subject<void>();
    this.offline$ = new BehaviorSubject<boolean>(false);

    // TODO consider moving this somewhere else
    // Watch for clipboard changes
    this.clipboardWatcherService.clipboardWatcher$.pipe(takeUntil(this.unsubscribe$)).subscribe(newText => {
      console.log(`Incoming text: ${newText}`);
      this.store$.dispatch(clipboardChanged({ text: newText }));
    });

    // Watch the breakpoint
    this.breakpointObserver.observe([ Breakpoints.Large, Breakpoints.Small, Breakpoints.XSmall ])
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
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
