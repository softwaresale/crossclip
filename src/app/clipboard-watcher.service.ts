import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject } from "rxjs";
import { ElectronService } from "ngx-electron";
import { ipcRenderer } from 'electron';
import IpcRenderer = Electron.IpcRenderer;

@Injectable({
  providedIn: 'root'
})
export class ClipboardWatcherService {

  private readonly textChanged$: Observable<string>;
  // private ipc: IpcRenderer;

  constructor(
    private electronService: ElectronService
  ) {
    this.textChanged$ = new Observable<string>(subscriber => {
      this.electronService.ipcRenderer.on('clipboard-changed', (event, newText) => {
        console.log('render process: received clipboard changed event');
        console.log(`New text is: ${newText}`);
        subscriber.next(newText);
      });
    });
  }

  get newValue$(): Observable<string> {
    return this.textChanged$;
  }
}
