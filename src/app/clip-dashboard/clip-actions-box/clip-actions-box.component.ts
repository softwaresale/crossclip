import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { select, Store } from '@ngrx/store';
import { State } from '../../state/state';
import { Observable } from 'rxjs';
import { appStateSelectSizeSmall, appStateSelectSizeXSmall } from '../../state/app-state/app-state.selectors';

interface ClipAction {
  text: string;
  tooltip: string;
  emitter: EventEmitter<void>;
  icon: string;
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

  actions: Array<ClipAction>;

  constructor(
    private electronService: ElectronService,
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
        icon: 'add_circle'
      },
      {
        text: 'Sync',
        tooltip: 'Synchronize clipping with cloud',
        emitter: this.onSyncAction,
        icon: this.synced ? 'cloud_done' : 'cloud_upload',
      },
      {
        text: 'Remove',
        tooltip: 'Delete this clipping',
        emitter: this.onRemoveAction,
        icon: 'remove_circle'
      }
    ];

    this.isSmall$ = this.store$.pipe(
      select(appStateSelectSizeSmall),
    );

    this.isXSmall$ = this.store$.pipe(
      select(appStateSelectSizeXSmall),
    );
  }

}
