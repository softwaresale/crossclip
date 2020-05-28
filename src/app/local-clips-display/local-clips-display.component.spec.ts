import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalClipsDisplayComponent } from './local-clips-display.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../state/state';

describe('LocalClipsDisplayComponent', () => {
  let component: LocalClipsDisplayComponent;
  let fixture: ComponentFixture<LocalClipsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalClipsDisplayComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalClipsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
