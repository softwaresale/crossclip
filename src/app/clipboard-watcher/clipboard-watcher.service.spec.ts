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

  describe('clipboardWatcher$', () => {

    it('should return a truthy value', () => {
      expect(service.clipboardWatcher$).toBeTruthy();
    });

    it('should call navigator#clipboard#readText and get value', done => {
      const mockMsg = 'Hello World';
      spyOn(navigator.clipboard, 'readText').and.resolveTo(mockMsg);

      service.clipboardWatcher$.subscribe(newText => {
        expect(navigator.clipboard.readText).toHaveBeenCalled();
        expect(newText).toBe(mockMsg);
        done();
      });
    });

    xit('should get null on navigator#clipboard#readText error', done => {
      spyOn(navigator.clipboard, 'readText').and.rejectWith();

      // Is there a way to test if the observables fires nothing?
      service.clipboardWatcher$.subscribe(newText => {
        expect(navigator.clipboard.readText).toHaveBeenCalled();
        expect(newText).toBeFalse();
        done();
      });
    });

  });
});
