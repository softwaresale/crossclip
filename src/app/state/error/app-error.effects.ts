import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as ErrorActions from './app-error.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class AppErrorEffects {

  addError$ = createEffect(() => this.actions$.pipe(
    ofType(ErrorActions.addError),
    tap(() => this.router.navigate(['/errors'])),
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private router: Router,
  ) {}

}
