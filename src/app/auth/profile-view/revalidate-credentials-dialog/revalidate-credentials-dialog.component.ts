import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-revalidate-credentials-dialog',
  templateUrl: './revalidate-credentials-dialog.component.html',
  styleUrls: ['./revalidate-credentials-dialog.component.sass']
})
export class RevalidateCredentialsDialogComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loginErrorMessage$: BehaviorSubject<string>;

  constructor(
    private matDialogRef: MatDialogRef<RevalidateCredentialsDialogComponent>,
    private fb: FormBuilder,
    private angularFireAuth: AngularFireAuth,
  ) { }

  ngOnInit(): void {
    this.loginErrorMessage$ = new BehaviorSubject<string>(null);

    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.loginErrorMessage$.complete();
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const reauthCredential = auth.EmailAuthProvider.credential(email, password);
      return this.angularFireAuth.currentUser
        .then(user => user.reauthenticateWithCredential(reauthCredential)
          .then(() => this.matDialogRef.close(true))
        ).catch(err => this.matDialogRef.close(false));
    } else {
      console.error('Form was invalid');
    }
  }
}
