import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { select, Store } from '@ngrx/store';
import { State } from '../../state/state';
import { Observable } from 'rxjs';
import { appStateSelectAnySmall } from '../../state/app-state/app-state.selectors';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProfileEditDialogComponent } from './profile-edit-dialog/profile-edit-dialog.component';
import { map } from 'rxjs/operators';
import { RevalidateCredentialsDialogComponent } from './revalidate-credentials-dialog/revalidate-credentials-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.sass']
})
export class ProfileViewComponent implements OnInit {

  @ViewChild('confirmDeleteDialog')
  deleteDialog: TemplateRef<any>;

  isMobile$: Observable<boolean>;
  user$: Observable<User>;
  providerIsPassword$: Observable<boolean>;

  constructor(
    private store$: Store<State>,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.isMobile$ = this.store$.pipe(select(appStateSelectAnySmall));
    this.user$ = this.angularFireAuth.user;

    this.providerIsPassword$ = this.user$.pipe(
      map(user => user.providerData[0].providerId === 'password')
    );
  }

  onLogout() {
    this.angularFireAuth.signOut().then(() => this.router.navigate(['/login']));
  }

  async editProfile() {
    await this.matDialog.open(RevalidateCredentialsDialogComponent, { width: '500px' }).afterClosed().toPromise()
      .then(loggedIn => {
        if (loggedIn) {
          return this.matDialog.open(ProfileEditDialogComponent, {width: '500px'}).afterClosed().toPromise()
            .then(() => this.matSnackBar.open('Successfully updated profile', 'CLOSE').afterDismissed().toPromise());
        } else {
          return this.matSnackBar.open('Credential revalidation failed. Cannot modify profile', 'CLOSE').afterDismissed().toPromise();
        }
      });
  }

  async deleteProfile() {
    await this.matDialog.open(RevalidateCredentialsDialogComponent, { width: '500px' }).afterClosed().toPromise()
      .then(loggedIn => {
        if (loggedIn) {
          return this.matDialog.open(this.deleteDialog, {width: '500px'}).afterClosed().toPromise()
            .then(doDelete => {
              if (doDelete) {
                return this.handleDeleteUser();
              }
            });
        } else {
          return this.matSnackBar.open('Credential revalidation failed. Cannot modify profile', 'CLOSE').afterDismissed().toPromise();
        }
      });
  }

  private handleDeleteUser() {
    return this.angularFireAuth.currentUser.then(user => user.delete()
      .then(() => this.router.navigateByUrl('/login')
        .then(() => this.matSnackBar.open('Successfully deleted profile', 'CLOSE').afterDismissed().toPromise())
      )
    );
  }
}
