import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipDashboardComponent } from './clip-dashboard.component';
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { ClipDisplayComponent } from './clip-display/clip-display.component';
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClipActionsBoxComponent } from './clip-actions-box/clip-actions-box.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [ClipDashboardComponent, ClipDisplayComponent, ClipActionsBoxComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatMenuModule,
  ],
  exports: [ClipDashboardComponent],
})
export class ClipDashboardModule { }
