import { Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Clip } from '../../state/clip/clip.model';
import { select, Store } from '@ngrx/store';
import { State } from '../../state/state';
import { addComment, handleRemoveClip, syncClip } from '../../state/clip/clip.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { animate, style, transition, trigger } from '@angular/animations';
import { ClipboardService } from '../../clipboard-service/clipboard.service';
import { takeUntil } from 'rxjs/operators';
import { appStateSelectAnySmall, appStateSelectMobile } from '../../state/app-state/app-state.selectors';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-clip-display',
  templateUrl: './clip-display.component.html',
  styleUrls: ['./clip-display.component.sass'],
  animations: [
    trigger('fadeClip', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0 })),
      ])
    ])
  ]
})
export class ClipDisplayComponent implements OnInit, OnDestroy {

  @Input()
  clip: Clip;

  @ViewChild('confirmDeleteSyncTemplate')
  confirmDialog: TemplateRef<any>;

  @ViewChild('addCommentDialog')
  addCommentDialog: TemplateRef<any>;

  showAddComment = false;
  addCommentText = '';

  isMobile: boolean;
  private unsubscribe$: Subject<void>;

  constructor(
    private store$: Store<State>,
    private matSnackbar: MatSnackBar,
    private matDialog: MatDialog,
    private clipboardService: ClipboardService,
  ) { }

  ngOnInit(): void {
    this.unsubscribe$ = new Subject<void>();
    this.store$.pipe(select(appStateSelectAnySmall), takeUntil(this.unsubscribe$)).subscribe(isMobile => this.isMobile = isMobile);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSyncClip() {
    this.store$.dispatch(syncClip({ clip: this.clip }));
  }

  async onCopyText() {
    await this.clipboardService.writeText(this.clip.content);
    this.matSnackbar.open('Copied text to clipboard', 'CLOSE', {
      duration: 2000,
    });
  }

  async onShowAddComment(forceDialog: boolean = false) {
    if (forceDialog || this.isMobile) {
      this.matDialog.open(this.addCommentDialog).afterClosed().subscribe(commentInfo => {
        if (commentInfo !== null) {
          this.onSetClipComment(commentInfo);
        }
      });
    } else {
      this.showAddComment = !this.showAddComment;
    }
  }

  onSetClipComment(text: string) {
    this.store$.dispatch(addComment({ clip: this.clip, comment: text }));
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
