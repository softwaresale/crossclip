import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AppError } from './app-error.model';
import * as ErrorActions from './app-error.actions';

export const appErrorsFeatureKey = 'appErrors';

export interface AppErrorState extends EntityState<AppError> {
  // additional entities state properties
}

export const adapter: EntityAdapter<AppError> = createEntityAdapter<AppError>();

export const appErrorInitialState: AppErrorState = adapter.getInitialState({
  // additional entity state properties
});


export const appErrorReducer = createReducer(
  appErrorInitialState,
  on(ErrorActions.addError,
    (state, action) => adapter.addOne(action.error, state)
  ),
  on(ErrorActions.upsertError,
    (state, action) => adapter.upsertOne(action.error, state)
  ),
  on(ErrorActions.addErrors,
    (state, action) => adapter.addMany(action.errors, state)
  ),
  on(ErrorActions.upsertErrors,
    (state, action) => adapter.upsertMany(action.errors, state)
  ),
  on(ErrorActions.updateError,
    (state, action) => adapter.updateOne(action.error, state)
  ),
  on(ErrorActions.updateErrors,
    (state, action) => adapter.updateMany(action.errors, state)
  ),
  on(ErrorActions.deleteError,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ErrorActions.deleteErrors,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ErrorActions.loadErrors,
    (state, action) => adapter.setAll(action.errors, state)
  ),
  on(ErrorActions.clearErrors,
    state => adapter.removeAll(state)
  ),
);
