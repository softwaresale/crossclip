import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteClipsDisplayComponent } from './remote-clips-display.component';
import { MatButtonModule } from "@angular/material/button";
import { ClipDashboardModule } from "../clip-dashboard/clip-dashboard.module";
import { MatCardModule } from '@angular/material/card';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [RemoteClipsDisplayComponent],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    ClipDashboardModule,
    MatButtonModule,
    MatCardModule,
  ]
})
export class RemoteClipsDisplayModule { }
