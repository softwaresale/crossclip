import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Clip } from '../../state/clip/clip.model';
import { Store } from '@ngrx/store';
import { State } from '../../state/state';
import { handleRemoveClip, syncClip } from '../../state/clip/clip.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-clip-display',
  templateUrl: './clip-display.component.html',
  styleUrls: ['./clip-display.component.sass']
})
export class ClipDisplayComponent implements OnInit {

  @Input()
  clip: Clip;

  @ViewChild('confirmDeleteSyncTemplate')
  confirmDialog: TemplateRef<any>;

  constructor(
    private store$: Store<State>,
    private matSnackbar: MatSnackBar,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  onSyncClip() {
    this.store$.dispatch(syncClip({ clip: this.clip }));
  }

  async onCopyText() {
    await navigator.clipboard.writeText(this.clip.content);
    this.matSnackbar.open('Copied text to clipboard', 'CLOSE', {
      duration: 2000,
    });
  }

  onRemoveClip() {
    // If the clip is synced, then confirm to delete it from the server
    if (this.clip.synced) {

      this.matDialog.open(this.confirmDialog)
        .afterClosed().subscribe(confirm =>
          this.store$.dispatch(handleRemoveClip({ clip: this.clip, deleteRemote: confirm }))
        );
    } else {
      this.store$.dispatch(handleRemoveClip({ clip: this.clip, }));
    }
  }
}
