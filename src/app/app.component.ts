import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { State } from "./state/state";
import { clipboardChanged } from "./state/clip/clip.actions";
import { ElectronService } from "ngx-electron";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

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
  ) {
  }

  /*
  TODO: consider adding an IPC call to kill the clipboard watcher in the destructor
   */

  ngOnInit(): void {
    // TODO consider moving this somewhere else
    this.electronService.ipcRenderer.on('clipboard-changed', (event, newText) => {
      console.log('render process: received clipboard changed event');
      console.log(`New text is: ${newText}`);
      this.store$.dispatch(clipboardChanged({ text: newText }));
    });
  }
}
