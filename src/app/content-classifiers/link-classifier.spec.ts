import { LinkClassifier } from './link-classifier';

describe('LinkClassifier', () => {

  let linkClassifier: LinkClassifier;

  beforeEach(() => {
    linkClassifier = new LinkClassifier();
  });

  describe('classifyContent', () => {
    it('should identify links', () => {
      const link = 'https://www.google.com/some/sub/domain';
      const match = linkClassifier.classifyContent(link);
      expect(match).toBeTrue();
    });

    it('should not identify links', () => {
      const link = 'not://a l.ins k';
      const match = linkClassifier.classifyContent(link);
      expect(match).toBeFalse();
    });
  });
});
