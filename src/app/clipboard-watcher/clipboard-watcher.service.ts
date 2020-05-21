import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

  constructor() {

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

  get clipboardWatcher$(): Observable<string> {
    return this.watcher$;
  }
}
