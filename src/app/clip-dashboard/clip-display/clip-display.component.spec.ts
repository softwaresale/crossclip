import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClipDisplayComponent } from './clip-display.component';
import {provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../../state/state';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Clip} from '../../state/clip/clip.model';
import { firestore } from 'firebase';

describe('ClipDisplayComponent', () => {
  let component: ClipDisplayComponent;
  let fixture: ComponentFixture<ClipDisplayComponent>;
  const mockClip: Clip = {
    created: firestore.Timestamp.now(),
    clipType: 'text/plain',
    content: 'Hello World',
    id: '123',
    synced: false
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipDisplayComponent ],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        NoopAnimationsModule,
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipDisplayComponent);
    component = fixture.componentInstance;
    component.clip = mockClip;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
