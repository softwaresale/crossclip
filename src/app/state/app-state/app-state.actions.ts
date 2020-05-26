import { createAction, props } from '@ngrx/store';
import { BreakpointState } from '@angular/cdk/layout';

export const setBreakpointState = createAction(
  '[App/STATE] Setting breakpoint state',
  props<{ breakpointState: BreakpointState }>()
);

export const networkStatusChanged = createAction(
  '[App/STATE] Network status has changed',
  props<{ isConnected: boolean }>(),
);

export const setDarkTheme = createAction(
  '[App/STATE] Set dark theme'
);

export const setLightTheme = createAction(
  '[App/STATE] Set light theme',
);

export const toggleTheme = createAction(
  '[App/STATE] Toggling theme',
);
