import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { AppError } from './app-error.model';

export const loadErrors = createAction(
  '[Error/API] Load Errors',
  props<{ errors: AppError[] }>()
);

export const addError = createAction(
  '[Error/API] Add Error',
  props<{ error: AppError }>()
);

export const upsertError = createAction(
  '[Error/API] Upsert Error',
  props<{ error: AppError }>()
);

export const addErrors = createAction(
  '[Error/API] Add Errors',
  props<{ errors: AppError[] }>()
);

export const upsertErrors = createAction(
  '[Error/API] Upsert Errors',
  props<{ errors: AppError[] }>()
);

export const updateError = createAction(
  '[Error/API] Update Error',
  props<{ error: Update<AppError> }>()
);

export const updateErrors = createAction(
  '[Error/API] Update Errors',
  props<{ errors: Update<AppError>[] }>()
);

export const deleteError = createAction(
  '[Error/API] Delete Error',
  props<{ id: string }>()
);

export const deleteErrors = createAction(
  '[Error/API] Delete Errors',
  props<{ ids: string[] }>()
);

export const clearErrors = createAction(
  '[Error/API] Clear Errors'
);
