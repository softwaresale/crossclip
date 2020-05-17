import { clipsFeatureKey, clipsInitialState, clipsReducer, ClipState } from "./clip/clip.reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface State {
  [clipsFeatureKey]: ClipState;
}

export const initialState: State = {
  [clipsFeatureKey]: clipsInitialState,
};

export const reducers: ActionReducerMap<State> = {
  [clipsFeatureKey]: clipsReducer,
};
