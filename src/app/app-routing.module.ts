import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalClipsDisplayComponent } from "./local-clips-display/local-clips-display.component";
import { RemoteClipsDisplayComponent } from "./remote-clips-display/remote-clips-display.component";
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectToLoginPage = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'local',
    component: LocalClipsDisplayComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToLoginPage }
  },
  {
    path: 'remote',
    component: RemoteClipsDisplayComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToLoginPage }
  },
  {
    'path': '',
    pathMatch: 'full',
    redirectTo: '/local'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
