import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { State } from "./state/state";
import { clipboardChanged } from "./state/clip/clip.actions";
import { ElectronService } from "ngx-electron";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { setBreakpointState } from './state/app-state/app-state.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void>;

  navEndpoints = [
    {
      path: '/local',
      text: 'Local Clips'
    },
    {
      path: '/remote',
      text: 'Remote Clips'
    }
  ];

  constructor(
    private store$: Store<State>,
    private electronService: ElectronService,
    private breakpointObserver: BreakpointObserver,
  ) {
  }

  /*
  TODO: consider adding an IPC call to kill the clipboard watcher in the destructor
   */

  ngOnInit(): void {
    // Create the unsubscribe subject
    this.unsubscribe$ = new Subject<void>();

    // TODO consider moving this somewhere else
    this.electronService.ipcRenderer.on('clipboard-changed', (event, newText) => {
      console.log('render process: received clipboard changed event');
      console.log(`New text is: ${newText}`);
      this.store$.dispatch(clipboardChanged({ text: newText }));
    });

    // Watch the breakpoint
    this.breakpointObserver.observe([ Breakpoints.Large, Breakpoints.Small, Breakpoints.XSmall ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(state => this.store$.dispatch(setBreakpointState({ breakpointState: state })));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
