import { TestBed } from '@angular/core/testing';

import { ClipboardWatcherService } from './clipboard-watcher.service';

describe('ClipboardWatcherService', () => {
  let service: ClipboardWatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClipboardWatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
