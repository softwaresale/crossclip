import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalClipsDisplayComponent } from './local-clips-display.component';
import { ClipDashboardModule } from "../clip-dashboard/clip-dashboard.module";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [LocalClipsDisplayComponent],
    imports: [
      CommonModule,
      ClipDashboardModule,
      MatCardModule
    ]
})
export class LocalClipsDisplayModule { }
