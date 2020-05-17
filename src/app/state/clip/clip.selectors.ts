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

export const clipsSelectSortedByDate = createSelector(
  clipsSelectAll,
  clips => clips.sort(
    (left, right) => left.created.toDate().getTime() - right.created.toDate().getTime()
  )
);

export const clipsSelectReversed = createSelector(
  clipsSelectAll,
  clips => clips.reverse()
);
