import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClipDashboardComponent } from './clip-dashboard.component';

describe('ClipDashboardComponent', () => {
  let component: ClipDashboardComponent;
  let fixture: ComponentFixture<ClipDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
