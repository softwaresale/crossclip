import { clipEntityAdapter, clipsFeatureKey, ClipState } from "./clip.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = clipEntityAdapter.getSelectors();

export const selectClipFeatureState = createFeatureSelector<ClipState>(clipsFeatureKey);

export const clipsSelectAll = createSelector(
  selectClipFeatureState,
  selectAll
);

export const clipsSelectEntities = createSelector(
  selectClipFeatureState,
  selectEntities
);

export const clipsSelectIds = createSelector(
  selectClipFeatureState,
  selectIds
);

export const clipsSelectTotal = createSelector(
  selectClipFeatureState,
  selectTotal
);
