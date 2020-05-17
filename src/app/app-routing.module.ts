import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalClipsDisplayComponent } from "./local-clips-display/local-clips-display.component";
import { RemoteClipsDisplayComponent } from "./remote-clips-display/remote-clips-display.component";

const routes: Routes = [
  {
    path: 'local',
    component: LocalClipsDisplayComponent,
  },
  {
    path: 'remote',
    component: RemoteClipsDisplayComponent
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
