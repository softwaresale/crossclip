import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../state/state';
import { Observable } from 'rxjs';
import { AppError } from '../state/error/app-error.model';
import { appErrorSelectAll } from '../state/error/app-error.selectors';

@Component({
  selector: 'app-error-pages',
  templateUrl: './error-pages.component.html',
  styleUrls: ['./error-pages.component.sass']
})
export class ErrorPagesComponent implements OnInit {

  errors$: Observable<AppError[]>;

  constructor(private store$: Store<State>) { }

  ngOnInit(): void {
    this.errors$ = this.store$.pipe(select(appErrorSelectAll));
  }

}
