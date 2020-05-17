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
import { initialState, reducers } from "./state/state";
import { AngularFireModule } from "@angular/fire";
import { ClipEffects } from "./state/clip/clip.effects";
import { NgxElectronModule } from "ngx-electron";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { LocalClipsDisplayModule } from "./local-clips-display/local-clips-display.module";
import { RemoteClipsDisplayModule } from "./remote-clips-display/remote-clips-display.module";
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { initialState }),
    // TODO consider putting this in environment
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCKDvqohDwPW-Up1ZgQzASqUWDX8QfCA4s",
      authDomain: "crossclip.firebaseapp.com",
      databaseURL: "https://crossclip.firebaseio.com",
      projectId: "crossclip",
      storageBucket: "crossclip.appspot.com",
      messagingSenderId: "447960949346",
      appId: "1:447960949346:web:6a1575386630710539673b",
      measurementId: "G-4VZZLXSVKJ"
    }),
    AngularFirestoreModule,
    NgxElectronModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([ClipEffects]),
    StoreRouterConnectingModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),

    // Material imports
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,

    // Local UI modules
    LocalClipsDisplayModule,
    RemoteClipsDisplayModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
