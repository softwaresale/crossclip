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
