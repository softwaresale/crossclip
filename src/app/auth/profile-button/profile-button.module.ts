import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileButtonComponent } from './profile-button.component';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatRippleModule } from '@angular/material/core';
import { ProfileButtonPopupComponent } from './profile-button-popup/profile-button-popup.component';
import { PortalModule } from '@angular/cdk/portal';
import { RouterModule } from '@angular/router';
import { ThemedDirectiveModule } from "../../themed-directive/themed-directive.module";

@NgModule({
  declarations: [ProfileButtonComponent, ProfileButtonPopupComponent],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    RouterModule,
    AngularFireAuthModule,
    MatButtonModule,
    MatRippleModule,
    ThemedDirectiveModule,
  ],
  exports: [ProfileButtonComponent],
})
export class ProfileButtonModule { }
