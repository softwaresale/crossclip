import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RevalidateCredentialsDialogComponent } from './revalidate-credentials-dialog.component';

describe('RevalidateCredentialsDialogComponent', () => {
  let component: RevalidateCredentialsDialogComponent;
  let fixture: ComponentFixture<RevalidateCredentialsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RevalidateCredentialsDialogComponent ]
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
