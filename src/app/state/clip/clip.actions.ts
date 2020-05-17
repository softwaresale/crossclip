import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Clip } from './clip.model';

export const clipboardChanged = createAction(
  '[Clip/API] Clipboard content changed',
  props<{ text: string }>(),
);

export const syncClip = createAction(
  '[Clip/API] Syncing clip with cloud',
  props<{ clip: Clip }>()
);

export const handleRemoveClip = createAction(
  '[Clip/API] Removing clip',
  props<{ clip: Clip }>(),
);

export const loadClips = createAction(
  '[Clip/API] Load Clips',
  props<{ clips: Clip[] }>()
);

export const addClip = createAction(
  '[Clip/API] Add Clip',
  props<{ clip: Clip }>()
);

export const upsertClip = createAction(
  '[Clip/API] Upsert Clip',
  props<{ clip: Clip }>()
);

export const addClips = createAction(
  '[Clip/API] Add Clips',
  props<{ clips: Clip[] }>()
);

export const upsertClips = createAction(
  '[Clip/API] Upsert Clips',
  props<{ clips: Clip[] }>()
);

export const updateClip = createAction(
  '[Clip/API] Update Clip',
  props<{ clip: Update<Clip> }>()
);

export const updateClips = createAction(
  '[Clip/API] Update Clips',
  props<{ clips: Update<Clip>[] }>()
);

export const deleteClip = createAction(
  '[Clip/API] Delete Clip',
  props<{ id: string }>()
);

export const deleteClips = createAction(
  '[Clip/API] Delete Clips',
  props<{ ids: string[] }>()
);

export const clearClips = createAction(
  '[Clip/API] Clear Clips'
);

export const clipError = createAction(
  '[Clip/API] Error encountered',
);
