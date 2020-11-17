import { TestBed } from '@angular/core/testing';

import { CONTENT_CLASSIFIERS, ContentClassificationService } from './content-classification.service';
import { LinkClassifier } from './link-classifier';

describe('ContentClassificationService', () => {
  let service: ContentClassificationService;
  let mockLinkClassifier: jasmine.SpyObj<LinkClassifier>;

  beforeEach(() => {
    mockLinkClassifier = jasmine.createSpyObj(['classifyContent', 'type']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CONTENT_CLASSIFIERS,
          useValue: [
            mockLinkClassifier,
          ],
        }
      ]
    });
    service = TestBed.inject(ContentClassificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getType', () => {
    it('should classify link', () => {
      mockLinkClassifier.classifyContent.and.returnValue(true);
      mockLinkClassifier.type.and.returnValue('text/uri-list');

      const type = service.getType('https://www.google.com');
      expect(type).toEqual('text/uri-list');
    });

    it('should classify plain text', () => {
      mockLinkClassifier.classifyContent.and.returnValue(false);
      mockLinkClassifier.type.and.returnValue('text/uri-list');
      const type = service.getType('hello world');
      expect(type).toEqual('text/plain');
    });
  });
});
