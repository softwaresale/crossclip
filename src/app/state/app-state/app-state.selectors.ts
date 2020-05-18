import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, appStateFeatureKey } from './app-state.reducer';
import { Breakpoints } from '@angular/cdk/layout';

export const selectAppStateFeature = createFeatureSelector<AppState>(appStateFeatureKey);

export const appStateSelectBreakpointState = createSelector(
  selectAppStateFeature,
  state => state.breakpointState
);

export const appStateSelectSizeLarge = createSelector(
  appStateSelectBreakpointState,
  breakpointState => breakpointState.breakpoints[Breakpoints.Large],
);

export const appStateSelectSizeSmall = createSelector(
  appStateSelectBreakpointState,
  breakpointState => breakpointState.breakpoints[Breakpoints.Small]
);

export const appStateSelectSizeXSmall = createSelector(
  appStateSelectBreakpointState,
  breakpointState => breakpointState.breakpoints[Breakpoints.XSmall],
);

export const appStateSelectIsConnected = createSelector(
  selectAppStateFeature,
  state => state.networkConnected
);
