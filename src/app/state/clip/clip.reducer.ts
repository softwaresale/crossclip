import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Clip } from './clip.model';
import * as ClipActions from './clip.actions';

export const clipsFeatureKey = 'clips';

export interface ClipState extends EntityState<Clip> {
  // additional entities state properties
}

export const clipEntityAdapter: EntityAdapter<Clip> = createEntityAdapter<Clip>();

export const clipsInitialState: ClipState = clipEntityAdapter.getInitialState({
  // additional entity state properties
});


export const clipsReducer = createReducer(
  clipsInitialState,
  on(ClipActions.addClip,
    (state, action) => clipEntityAdapter.addOne(action.clip, state)
  ),
  on(ClipActions.upsertClip,
    (state, action) => clipEntityAdapter.upsertOne(action.clip, state)
  ),
  on(ClipActions.addClips,
    (state, action) => clipEntityAdapter.addMany(action.clips, state)
  ),
  on(ClipActions.upsertClips,
    (state, action) => clipEntityAdapter.upsertMany(action.clips, state)
  ),
  on(ClipActions.updateClip,
    (state, action) => clipEntityAdapter.updateOne(action.clip, state)
  ),
  on(ClipActions.updateClips,
    (state, action) => clipEntityAdapter.updateMany(action.clips, state)
  ),
  on(ClipActions.deleteClip,
    (state, action) => clipEntityAdapter.removeOne(action.id, state)
  ),
  on(ClipActions.deleteClips,
    (state, action) => clipEntityAdapter.removeMany(action.ids, state)
  ),
  on(ClipActions.loadClips,
    (state, action) => clipEntityAdapter.setAll(action.clips, state)
  ),
  on(ClipActions.clearClips,
    state => clipEntityAdapter.removeAll(state)
  ),
);
