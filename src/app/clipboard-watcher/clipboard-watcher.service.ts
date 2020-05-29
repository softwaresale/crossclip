import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppError } from '../state/error/app-error.model';
import { v4 } from 'uuid';
import { Store } from '@ngrx/store';
import { State } from '../state/state';
import { addError } from '../state/error/app-error.actions';

interface ClipboardInterface {
  readText: () => Promise<string>,
  writeText: (msg: string) => Promise<void>,
}

@Injectable({
  providedIn: 'root'
})
export class ClipboardWatcherService {

  private readonly watcher$: Observable<string>;
  private lastValue$: BehaviorSubject<string>;

  constructor(private store$: Store<State>) {

    this.checkClipboardPermissions();

    let clipboardInterface: ClipboardInterface;
    const windowUndef = window as any;
    if (windowUndef.electronClipboardApi) {
      // Electron clipboard api has been provided
      clipboardInterface = windowUndef.electronClipboardApi;
    } else {
      clipboardInterface = navigator.clipboard;
    }

    this.lastValue$ = new BehaviorSubject<string>('');

    this.watcher$ = new Observable(subscriber => {
      setInterval(() =>
        clipboardInterface.readText().then(incomingText => {
          // If text is different, then dispatch new event
          if (incomingText !== this.lastValue$.getValue()) {
            this.lastValue$.next(incomingText);
            subscriber.next(incomingText);
          }
        }).catch(() => null)
        , 500);
    });
  }

  private checkClipboardPermissions() {
    if (navigator && navigator.permissions) {
      // Ignore because 'clipboard' is not supported
      // @ts-ignore
      navigator.permissions.query({ name: 'clipboard-read' })
        .then(status => this.evaluatePermissionState('clipboard-read', status));

      // @ts-ignore
      navigator.permissions.query({ name: 'clipboard-write' })
        .then(status => this.evaluatePermissionState('clipboard-write', status));
    } else {
      console.warn('Permissions are not supported. Might not be able to access clipboard')
    }
  }

  private evaluatePermissionState(name: string, status: PermissionStatus) {
    if (status.state === 'granted') {
      console.log(`Permission ${name} is ${status.state}`);
    } else if (status.state === 'prompt') {
      console.log(`Permission ${name} must be prompted`);
    } else {
      console.error('Permission is not granted');
      const permissionError: AppError = {
        id: v4(),
        message: `Permission ${name} is not granted`,
        errorType: 'permissions',
        causingComponent: 'ClipboardWatcher',
      };
      this.store$.dispatch(addError({ error: permissionError }));
    }
  }

  get clipboardWatcher$(): Observable<string> {
    return this.watcher$;
  }
}
