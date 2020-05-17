import * as fromAppState from './app-state.actions';

describe('loadAppStates', () => {
  it('should return an action', () => {
    expect(fromAppState.loadAppStates().type).toBe('[AppState] Load AppStates');
  });
});
