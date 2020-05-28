import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, appErrorsFeatureKey } from './app-error.reducer';

const {
  selectTotal,
  selectIds,
  selectEntities,
  selectAll,
} = adapter.getSelectors();

export const appErrorSelectFeature = createFeatureSelector(appErrorsFeatureKey);

export const appErrorSelectAll = createSelector(
  appErrorSelectFeature,
  selectAll,
);

export const appErrorSelectTotal = createSelector(
  appErrorSelectFeature,
  selectTotal,
);

export const appErrorSelectIds = createSelector(
  appErrorSelectFeature,
  selectIds,
);

export const appErrorSelectEntities = createSelector(
  appErrorSelectFeature,
  selectEntities
);
