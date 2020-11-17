import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ServiceWorkerModule } from '@angular/service-worker';
import { initialState, reducers } from './state/state';
import { AngularFireModule } from '@angular/fire';
import { ClipEffects } from './state/clip/clip.effects';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { LocalClipsDisplayModule } from './local-clips-display/local-clips-display.module';
import { RemoteClipsDisplayModule } from './remote-clips-display/remote-clips-display.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { ConnectionServiceModule } from 'ng-connection-service';
import { AuthModule } from './auth/auth.module';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { ProfileButtonModule } from './auth/profile-button/profile-button.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ThemeSetterModule } from './theme-setter/theme-setter.module';
import { CONTENT_CLASSIFIERS } from './content-classifiers/content-classification.service';
import { LinkClassifier } from './content-classifiers/link-classifier';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {initialState}),
    // TODO consider putting this in environment
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthGuardModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([ClipEffects]),
    StoreRouterConnectingModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ConnectionServiceModule,

    // Material imports
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,

    // Local UI modules
    LocalClipsDisplayModule,
    RemoteClipsDisplayModule,
    AuthModule,
    ProfileButtonModule,
    ThemeSetterModule,
  ],
  providers: [
    {
      provide: CONTENT_CLASSIFIERS,
      useValue: [
        new LinkClassifier(),
      ],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
