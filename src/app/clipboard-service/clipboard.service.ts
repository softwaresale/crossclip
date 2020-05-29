import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface IClipboard {
  readText: () => Promise<string>,
  writeText: (msg: string) => Promise<void>,
}

/*
  TODO refactor this class into ClipboardService and provide
  methods for reading and writing from clipboard
*/
@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  private clipboard: IClipboard;
  private readonly watcher$: Observable<string>;
  private lastValue$: BehaviorSubject<string>;

  constructor() {

    const windowUndef = window as any;
    if (windowUndef.electronClipboardApi) {
      // Electron clipboard api has been provided
      this.clipboard = windowUndef.electronClipboardApi;
    } else {
      this.clipboard = navigator.clipboard;
    }

    this.lastValue$ = new BehaviorSubject<string>('');

    this.watcher$ = new Observable(subscriber => {
      setInterval(() =>
        this.clipboard.readText().then(incomingText => {
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

  writeText(content: string) {
    return this.clipboard.writeText(content);
  }
}
