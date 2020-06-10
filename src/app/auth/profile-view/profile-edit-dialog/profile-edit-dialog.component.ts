import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { auth } from 'firebase';
import { verifyPasswordMatch } from "../../signup-page/signup-page.component";
import { MatDialogRef } from "@angular/material/dialog";

export const verifyOldAndNewDifferent: ValidatorFn = form => {
  const oldPassword = form.get('oldPassword').value;
  const newPassword = form.get('password').value;

  return oldPassword && newPassword && !(oldPassword === newPassword) ? null : { 'oldAndNewMatch': true };
}

@Component({
  selector: 'app-profile-edit-dialog',
  templateUrl: './profile-edit-dialog.component.html',
  styleUrls: ['./profile-edit-dialog.component.sass']
})
export class ProfileEditDialogComponent implements OnInit, OnDestroy {

  profileForm: FormGroup;
  credentialsForm: FormGroup;
  unsubscribe$: Subject<void>;
  isLoading$: BehaviorSubject<boolean>;

  constructor(
    private dialogRef: MatDialogRef<ProfileEditDialogComponent>,
    private fb: FormBuilder,
    private angularFireAuth: AngularFireAuth,
  ) { }

  ngOnInit(): void {
    this.unsubscribe$ = new Subject<void>();
    this.isLoading$ = new BehaviorSubject<boolean>(false);

    // Create the forms
    this.profileForm = this.fb.group({
      displayName: [null, [Validators.required]],
      photoURL: [null, [Validators.required]]
    });

    this.credentialsForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      oldPassword: [null, Validators.required],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    }, { validators: [verifyPasswordMatch, verifyOldAndNewDifferent] });

    // Set form values
    this.angularFireAuth.user.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(user => {
      this.profileForm.setValue({
        displayName: user.displayName,
        photoURL: user.photoURL,
      });

      this.credentialsForm.get('email').setValue(user.email);
    });
  }

  ngOnDestroy() {
    this.isLoading$.complete();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get editProfileLabel(): string {
    return this.profileForm.dirty ? '\u2022 Edit Profile' : 'Edit Profile';
  }

  get editCredsLabel(): string {
    return this.credentialsForm.dirty ? '\u2022 Edit Credentials' : 'Edit Credentials';
  }

  get submitDisabled(): boolean {
    if (this.credentialsForm.pristine && this.profileForm.pristine) {
      return true; // If nothing is touched, don't submit anything
    } else if (this.credentialsForm.dirty && this.profileForm.pristine) {
      return this.credentialsForm.invalid;
    } else if (this.credentialsForm.pristine && this.profileForm.dirty) {
      return this.profileForm.invalid;
    } else {
      return this.credentialsForm.invalid || this.profileForm.invalid;
    }
  }

  async submitForm() {
    this.isLoading$.next(true);
    const updates: Array<Promise<void | [void, void]>> = new Array<Promise<void|[void, void]>>();
    if (this.profileForm.dirty) {
      updates.push(this.updateProfile());
    }

    if (this.credentialsForm.dirty) {
      updates.push(this.updateEmailAndPassword());
    }

    await Promise.all(updates).then(() => {
      this.isLoading$.next(false);
      this.dialogRef.close();
    });
  }

  private async updateProfile() {
    if (this.profileForm.valid) {
      return this.angularFireAuth.currentUser.then(user => user.updateProfile(this.profileForm.value));
    } else {
      return Promise.reject('ProfileForm was invalid');
    }
  }

  private async updateEmailAndPassword() {
    if (this.credentialsForm.valid) {
      const { email, password } = this.credentialsForm.value;
      return this.angularFireAuth.currentUser.then(async user => {
        return await Promise.all([user.updateEmail(email), user.updatePassword(password)]);
      });
    }
  }
}
