import { createReducer, on } from '@ngrx/store';
import { BreakpointState } from '@angular/cdk/layout';
import * as AppStateActions from './app-state.actions';

export const appStateFeatureKey = 'appState';

export interface AppState {
  breakpointState: BreakpointState;
  networkConnected: boolean;
  darkTheme: boolean;
}

export const appStateInitialState: AppState = {
  breakpointState: null,
  networkConnected: true,
  darkTheme: false,
};

export const appStateReducer = createReducer(
  appStateInitialState,
  on(AppStateActions.setBreakpointState, (state, { breakpointState }) => ({ ...state, breakpointState })),
  on(AppStateActions.networkStatusChanged, (state, { isConnected }) => ({ ...state, networkConnected: isConnected })),
  on(AppStateActions.setDarkTheme, state => ({ ...state, darkTheme: true })),
  on(AppStateActions.setLightTheme, state => ({ ...state, darkTheme: false })),
  on(AppStateActions.toggleTheme, state => ({ ...state, darkTheme: !state.darkTheme })),
);

