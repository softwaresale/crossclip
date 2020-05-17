import { createAction, props } from '@ngrx/store';
import { BreakpointState } from '@angular/cdk/layout';

export const setBreakpointState = createAction(
  '[App/STATE] Setting breakpoint state',
  props<{ breakpointState: BreakpointState }>()
);
