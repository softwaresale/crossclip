import { clipsFeatureKey, clipsInitialState, clipsReducer, ClipState } from "./clip/clip.reducer";
import { ActionReducerMap } from "@ngrx/store";
import { AppState, appStateFeatureKey, appStateInitialState, appStateReducer } from './app-state/app-state.reducer';

export interface State {
  [clipsFeatureKey]: ClipState;
  [appStateFeatureKey]: AppState;
}

export const initialState: State = {
  [clipsFeatureKey]: clipsInitialState,
  [appStateFeatureKey]: appStateInitialState
};

export const reducers: ActionReducerMap<State> = {
  [clipsFeatureKey]: clipsReducer,
  [appStateFeatureKey]: appStateReducer,
};
