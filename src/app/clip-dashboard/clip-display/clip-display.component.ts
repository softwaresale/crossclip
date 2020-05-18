import { Component, Input, OnInit } from '@angular/core';
import { Clip } from "../../state/clip/clip.model";
import { Store } from '@ngrx/store';
import { State } from '../../state/state';
import { handleRemoveClip, syncClip } from '../../state/clip/clip.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clip-display',
  templateUrl: './clip-display.component.html',
  styleUrls: ['./clip-display.component.sass']
})
export class ClipDisplayComponent implements OnInit {

  @Input()
  clip: Clip;

  constructor(
    private store$: Store<State>,
    private matSnackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  onSyncClip() {
    this.store$.dispatch(syncClip({ clip: this.clip }));
  }

  async onCopyText() {
    // this.electronService.clipboard.writeText(this.clip.content);
    await navigator.clipboard.writeText(this.clip.content);
    this.matSnackbar.open('Copied text to clipboard', 'CLOSE', {
      duration: 2000,
    });
  }

  onRemoveClip() {
    this.store$.dispatch(handleRemoveClip({ clip: this.clip }));
  }
}
