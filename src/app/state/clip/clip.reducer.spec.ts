import { clipsReducer, clipsInitialState } from './clip.reducer';

describe('Clip Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = clipsReducer(clipsInitialState, action);

      expect(result).toBe(clipsInitialState);
    });
  });
});
