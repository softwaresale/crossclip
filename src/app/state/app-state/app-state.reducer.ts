import { Action, createReducer, on } from '@ngrx/store';
import { BreakpointState } from '@angular/cdk/layout';
import * as AppStateActions from './app-state.actions';

export const appStateFeatureKey = 'appState';

export interface AppState {
  breakpointState: BreakpointState;
}

export const appStateInitialState: AppState = {
  breakpointState: null,
};


export const appStateReducer = createReducer(
  appStateInitialState,
  on(AppStateActions.setBreakpointState, (state, { breakpointState }) => ({ ...state, breakpointState })),
);

