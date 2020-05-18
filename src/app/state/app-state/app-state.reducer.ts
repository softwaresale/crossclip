import { createReducer, on } from '@ngrx/store';
import { BreakpointState } from '@angular/cdk/layout';
import * as AppStateActions from './app-state.actions';

export const appStateFeatureKey = 'appState';

export interface AppState {
  breakpointState: BreakpointState;
  networkConnected: boolean;
}

export const appStateInitialState: AppState = {
  breakpointState: null,
  networkConnected: true,
};


export const appStateReducer = createReducer(
  appStateInitialState,
  on(AppStateActions.setBreakpointState, (state, { breakpointState }) => ({ ...state, breakpointState })),
  on(AppStateActions.networkStatusChanged, (state, { isConnected }) => ({ ...state, networkConnected: isConnected })),
);

