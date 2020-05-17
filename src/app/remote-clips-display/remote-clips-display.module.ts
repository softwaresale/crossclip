import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteClipsDisplayComponent } from './remote-clips-display.component';
import { MatButtonModule } from "@angular/material/button";
import { ClipDashboardModule } from "../clip-dashboard/clip-dashboard.module";
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [RemoteClipsDisplayComponent],
  imports: [
    CommonModule,
    ClipDashboardModule,
    MatButtonModule,
    MatCardModule,
  ]
})
export class RemoteClipsDisplayModule { }
