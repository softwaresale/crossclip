import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RevalidateCredentialsDialogComponent } from './revalidate-credentials-dialog.component';
import {MatDialogRef} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {FIREBASE_OPTIONS} from '@angular/fire';
import {environment} from '../../../../environments/environment';

describe('RevalidateCredentialsDialogComponent', () => {
  let component: RevalidateCredentialsDialogComponent;
  let fixture: ComponentFixture<RevalidateCredentialsDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<RevalidateCredentialsDialogComponent>>;

  beforeEach(waitForAsync(() => {
    mockDialogRef = jasmine.createSpyObj(['close']);

    TestBed.configureTestingModule({
      declarations: [ RevalidateCredentialsDialogComponent ],
      imports: [
        ReactiveFormsModule,
      ],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevalidateCredentialsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
