import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../state/state';
import { Observable } from 'rxjs';
import {
  appStateSelectIsConnected,
  appStateSelectSizeSmall,
  appStateSelectSizeXSmall
} from '../../state/app-state/app-state.selectors';
import { map } from 'rxjs/operators';

interface ClipAction {
  text: string;
  tooltip: string;
  emitter: EventEmitter<void>;
  icon: string;
  disableOffline: boolean;
}

@Component({
  selector: 'app-clip-actions-box',
  templateUrl: './clip-actions-box.component.html',
  styleUrls: ['./clip-actions-box.component.sass']
})
export class ClipActionsBoxComponent implements OnInit {

  @Input() synced: boolean;
  @Output() onSetToClipboardAction: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSyncAction: EventEmitter<void> = new EventEmitter<void>();
  @Output() onRemoveAction: EventEmitter<void> = new EventEmitter<void>();

  isSmall$: Observable<boolean>;
  isXSmall$: Observable<boolean>;
  offline$: Observable<boolean>;

  actions: Array<ClipAction>;

  constructor(
    private store$: Store<State>,
  ) { }

  ngOnInit(): void {
    /*
    this.onSetToClipboardAction = new EventEmitter<void>();
    this.onSyncAction = new EventEmitter<void>();
    this.onRemoveAction = new EventEmitter<void>();
    */
    this.actions = [
      {
        text: 'Set to Clipboard',
        tooltip: 'Set this clipping to the clipboard',
        emitter: this.onSetToClipboardAction,
        icon: 'add_circle',
        disableOffline: false,
      },
      {
        text: 'Sync',
        tooltip: 'Synchronize clipping with cloud',
        emitter: this.onSyncAction,
        icon: this.synced ? 'cloud_done' : 'cloud_upload',
        disableOffline: true,
      },
      {
        text: 'Remove',
        tooltip: 'Delete this clipping',
        emitter: this.onRemoveAction,
        icon: 'remove_circle',
        disableOffline: false,
      }
    ];

    this.isSmall$ = this.store$.pipe(
      select(appStateSelectSizeSmall),
    );

    this.isXSmall$ = this.store$.pipe(
      select(appStateSelectSizeXSmall),
    );

    this.offline$ = this.store$.pipe(
      select(appStateSelectIsConnected),
      map(connected => !connected)
    );
  }

}
