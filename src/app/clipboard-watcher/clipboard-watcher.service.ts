import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClipboardWatcherService {

  private readonly watcher$: Observable<string>;
  private lastValue$: BehaviorSubject<string>;

  constructor() {
    this.lastValue$ = new BehaviorSubject<string>('');

    this.watcher$ = new Observable(subscriber => {
      setInterval(() =>
        navigator.clipboard.readText().then(incomingText => {
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
