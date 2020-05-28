import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as ErrorActions from './app-error.actions';
import { tap, map } from 'rxjs/operators';
import { AppError } from './app-error.model';
import { v4 } from 'uuid';

@Injectable()
export class AppErrorEffects {

  errorNetwork$ = createEffect(() => this.actions$.pipe(
    ofType(ErrorActions.errorNetwork),
    map(action => {
      const newError: AppError = {
        causingComponent: action.causingComponent,
        errorType: 'network',
        message: action.message,
        content: action.content,
        id: v4(),
      };

      return ErrorActions.addError({ error: newError });
    })
  ));

  addError$ = createEffect(() => this.actions$.pipe(
    ofType(ErrorActions.addError),
    tap(() => this.router.navigate(['/errors'])),
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private router: Router,
  ) {}

}
