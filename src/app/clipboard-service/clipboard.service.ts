import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface IClipboardService {
  readText: () => Promise<string>;
  writeText: (msg: string) => Promise<void>;
}

@Injectable({
  providedIn: 'root'
})
export class ClipboardService implements IClipboardService {

  private readonly watcher$: Observable<string>;
  private lastValue$: BehaviorSubject<string>;
  private clipboardInterface: IClipboardService;

  constructor() {
    const windowUndef = window as any;
    if (windowUndef.electronClipboardApi) {
      // Electron clipboard api has been provided
      this.clipboardInterface = windowUndef.electronClipboardApi;
    } else {
      this.clipboardInterface = navigator.clipboard;
    }

    this.lastValue$ = new BehaviorSubject<string>('');

    this.watcher$ = new Observable(subscriber => {
      setInterval(() =>
        this.clipboardInterface.readText().then(incomingText => {
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

  readText(): Promise<string> {
    return this.clipboardInterface.readText();
  }

  writeText(msg: string): Promise<void> {
    return this.clipboardInterface.writeText(msg);
  }
}
