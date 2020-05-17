import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipDashboardComponent } from './clip-dashboard.component';
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { ClipDisplayComponent } from './clip-display/clip-display.component';
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [ClipDashboardComponent, ClipDisplayComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
  ],
  exports: [ClipDashboardComponent],
})
export class ClipDashboardModule { }
