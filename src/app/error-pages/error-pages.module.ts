import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPagesComponent } from './error-pages.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ErrorDisplayComponent } from './error-display/error-display.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [ErrorPagesComponent, ErrorDisplayComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
  ]
})
export class ErrorPagesModule { }
