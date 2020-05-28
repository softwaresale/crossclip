import { clipsFeatureKey, clipsInitialState, clipsReducer, ClipState } from './clip/clip.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { AppState, appStateFeatureKey, appStateInitialState, appStateReducer } from './app-state/app-state.reducer';
import { appErrorInitialState, appErrorReducer, appErrorsFeatureKey, AppErrorState } from './error/app-error.reducer';

export interface State {
  [clipsFeatureKey]: ClipState;
  [appStateFeatureKey]: AppState;
  [appErrorsFeatureKey]: AppErrorState;
}

export const initialState: State = {
  [clipsFeatureKey]: clipsInitialState,
  [appStateFeatureKey]: appStateInitialState,
  [appErrorsFeatureKey]: appErrorInitialState,
};

export const reducers: ActionReducerMap<State> = {
  [clipsFeatureKey]: clipsReducer,
  [appStateFeatureKey]: appStateReducer,
  [appErrorsFeatureKey]: appErrorReducer,
};
