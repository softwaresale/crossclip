import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { State } from "./state/state";
import { clipboardChanged } from "./state/clip/clip.actions";
import { Clip } from "./state/clip/clip.model";
import { Observable } from "rxjs";
import { clipsSelectAll } from "./state/clip/clip.selectors";
import { ElectronService } from "ngx-electron";
import { IpcRenderer } from 'electron';
import { ClipboardWatcherService } from "./clipboard-watcher.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  clips$: Observable<Clip[]>;

  constructor(
    private store$: Store<State>,
    private electronService: ElectronService,
  ) {
  }

  ngOnInit(): void {
    this.electronService.ipcRenderer.on('clipboard-changed', (event, newText) => {
      console.log('render process: received clipboard changed event');
      console.log(`New text is: ${newText}`);
      this.store$.dispatch(clipboardChanged({ text: newText }));
    });
  }
}
