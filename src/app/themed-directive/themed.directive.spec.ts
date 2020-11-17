import { ThemedDirective } from './themed.directive';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {TestBed, waitForAsync} from '@angular/core/testing';
import {initialState} from '../state/state';

describe('ThemedDirective', () => {

  let mockStore: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
  });

  it('should create an instance', () => {
    const directive = new ThemedDirective(mockStore);
    expect(directive).toBeTruthy();
  });
});
