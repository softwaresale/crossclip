import { appStateReducer, appStateInitialState } from './app-state.reducer';

describe('AppState Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = appStateReducer(appStateInitialState, action);

      expect(result).toBe(appStateInitialState);
    });
  });
});
