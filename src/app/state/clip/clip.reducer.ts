import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Clip } from './clip.model';
import * as ClipActions from './clip.actions';

export const clipsFeatureKey = 'clips';

export interface State extends EntityState<Clip> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Clip> = createEntityAdapter<Clip>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(ClipActions.addClip,
    (state, action) => adapter.addOne(action.clip, state)
  ),
  on(ClipActions.upsertClip,
    (state, action) => adapter.upsertOne(action.clip, state)
  ),
  on(ClipActions.addClips,
    (state, action) => adapter.addMany(action.clips, state)
  ),
  on(ClipActions.upsertClips,
    (state, action) => adapter.upsertMany(action.clips, state)
  ),
  on(ClipActions.updateClip,
    (state, action) => adapter.updateOne(action.clip, state)
  ),
  on(ClipActions.updateClips,
    (state, action) => adapter.updateMany(action.clips, state)
  ),
  on(ClipActions.deleteClip,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ClipActions.deleteClips,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ClipActions.loadClips,
    (state, action) => adapter.setAll(action.clips, state)
  ),
  on(ClipActions.clearClips,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
