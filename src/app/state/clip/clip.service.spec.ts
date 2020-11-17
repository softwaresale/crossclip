import { TestBed } from '@angular/core/testing';

import { ClipService } from './clip.service';
import {FIREBASE_OPTIONS} from '@angular/fire';
import {environment} from '../../../environments/environment';

describe('ClipService', () => {
  let service: ClipService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
      ]
    });
    service = TestBed.inject(ClipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
