import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipDashboardComponent } from './clip-dashboard.component';

describe('ClipDashboardComponent', () => {
  let component: ClipDashboardComponent;
  let fixture: ComponentFixture<ClipDashboardComponent>;

  beforeEach(async(() => {
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

  
  describe('clipsEmpty', () => {
    it('should return false when populated', () => {
      component.clips = [{ clipType: 'text/plain', content: 'Hello World', created: null }];
      expect(component.clipsEmpty).toBeFalse();
    });

    it('should return true when empty', () => {
      component.clips = [];
      expect(component.clipsEmpty).toBeTrue();
    });

    it('should return true when falsy', () => {
      component.clips = null;
      expect(component.clipsEmpty).toBeTrue();
    });
  });
});
