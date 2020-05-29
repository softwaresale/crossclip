import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipDisplayComponent } from './clip-display.component';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialState } from 'src/app/state/state';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { firestore } from 'firebase';
import { Clip } from 'src/app/state/clip/clip.model';
import { syncClip, handleRemoveClip } from 'src/app/state/clip/clip.actions';
import { of } from 'rxjs';

describe('ClipDisplayComponent', () => {
  let component: ClipDisplayComponent;
  let fixture: ComponentFixture<ClipDisplayComponent>;
  let mockClip: Clip = {
    clipType: 'text/plain',
    content: 'Hello World',
    created: firestore.Timestamp.now(),
  };
  let mockStore: MockStore;
  let spyMatSnackbar: MatSnackBar;
  let spyMatDialog: MatDialog;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipDisplayComponent ],
      providers: [
        provideMockStore({ initialState }),
      ],
      imports: [
        MatSnackBarModule,
        MatDialogModule,
        BrowserAnimationsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipDisplayComponent);
    component = fixture.componentInstance;
    component.clip = mockClip;
    mockStore = TestBed.inject(MockStore);
    spyMatSnackbar = TestBed.inject(MatSnackBar);
    spyMatDialog = TestBed.inject(MatDialog);
    mockDialogRef = jasmine.createSpyObj(['afterClosed']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display clip content', () => {
    // There should be only one pre
    const contentText = fixture.debugElement.query(By.css('pre')).nativeElement.textContent;
    
    expect(contentText).toContain(component.clip.content);
  });

  describe('onSyncClip', () => {

    it('should dispatch an action with clip', () => {
      const mockNewClipAction = syncClip({ clip: mockClip });
      const dispatchSpy = spyOn(mockStore, 'dispatch');
      component.onSyncClip();
      expect(dispatchSpy).toHaveBeenCalledWith(mockNewClipAction);
    });
  });

  describe('onCopyText', () => {

    it('should set text to clipboard and show snackbar', done => {
      const writeTextSpy = spyOn(navigator.clipboard, 'writeText').and.resolveTo();
      const openSnackbarSpy = spyOn(spyMatSnackbar, 'open');
      component.onCopyText().then(() => {
        expect(writeTextSpy).toHaveBeenCalledWith(component.clip.content);
        expect(openSnackbarSpy).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('onRemoveClip', () => {

    it('should dispatch removeClip action when not synced', () => {
      component.clip.synced = false;
      const mockRemoveAction = handleRemoveClip({ clip: component.clip });
      const dispatchSpy = spyOn(mockStore, 'dispatch');

      component.onRemoveClip();

      expect(dispatchSpy).toHaveBeenCalledWith(mockRemoveAction);
    });

    xit('should dispatch removeClip action with delete flag', () => {
      // TODO this needs some word. It's an async test that is not evaluated asynchronously
      mockDialogRef.afterClosed.and.returnValue(of(true));
      const mockDialogOpen = spyOn(spyMatDialog, 'open').and.returnValue(mockDialogRef);
      const dispatchSpy = spyOn(mockStore, 'dispatch');
      const mockRemoveAction = handleRemoveClip({ clip: component.clip, deleteRemote: true });

      component.onRemoveClip();

      expect(mockDialogOpen).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledWith(mockRemoveAction);
    });
  });
});
