import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalClipsDisplayComponent } from './local-clips-display/local-clips-display.component';
import { RemoteClipsDisplayComponent } from './remote-clips-display/remote-clips-display.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { SignupPageComponent } from './auth/signup-page/signup-page.component';
import { ProfileViewComponent } from './auth/profile-view/profile-view.component';

const redirectToLoginPage = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'signup',
    component: SignupPageComponent,
  },
  {
    path: 'profile',
    component: ProfileViewComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToLoginPage }
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
    path: '',
    pathMatch: 'full',
    redirectTo: '/local'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
