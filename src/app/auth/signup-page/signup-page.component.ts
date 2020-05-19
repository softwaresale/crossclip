import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../state/state';
import { BehaviorSubject, Observable } from 'rxjs';
import { appStateSelectAnySmall } from '../../state/app-state/app-state.selectors';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

const verifyPasswordMatch: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
  const password = group.get('password');
  const confirm = group.get('confirmPassword');

  return password && confirm && password.value === confirm.value ? null : { 'noMatch': true };
}

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.sass']
})
export class SignupPageComponent implements OnInit, OnDestroy {

  isMobile$: Observable<boolean>;
  isSubmitted$: BehaviorSubject<boolean>;
  errorText$: BehaviorSubject<string>;
  signupForm: FormGroup;

  get displayNameControl(): FormControl { return this.signupForm.get('displayName') as FormControl; }
  get emailControl(): FormControl { return this.signupForm.get('email') as FormControl; }
  get passwordControl(): FormControl { return this.signupForm.get('password') as FormControl; }
  get confirmPasswordControl(): FormControl { return this.signupForm.get('confirmPassword') as FormControl; }

  constructor(
    private store$: Store<State>,
    private fb: FormBuilder,
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private matSnackBar: MatSnackBar,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
  ) { }

  ngOnInit(): void {
    this.isMobile$ = this.store$.pipe(select(appStateSelectAnySmall));
    this.isSubmitted$ = new BehaviorSubject<boolean>(false);
    this.errorText$ = new BehaviorSubject<string>(null);

    const assetUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/google.svg');
    this.matIconRegistry.addSvgIcon('google_logo', assetUrl);

    this.signupForm = this.fb.group({
      displayName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: verifyPasswordMatch });
  }

  private handleSuccess(credentials: auth.UserCredential) {
    this.router.navigate(['/local']);
    this.matSnackBar.open(`Welcome ${credentials.user.displayName}`, 'CLOSE');
  }

  private handleError(error: any) {
    this.isSubmitted$.next(false);
    this.errorText$.next(error.message);
    console.error(error);
  }

  ngOnDestroy(): void {
    this.isSubmitted$.complete();
    this.errorText$.complete();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isSubmitted$.next(true);
      const { email, password, displayName } = this.signupForm.value;
      this.angularFireAuth.createUserWithEmailAndPassword(email, password)
        .then(creds => {
          if (!!displayName) {
            return creds.user.updateProfile({ displayName }).then(() => this.handleSuccess(creds))
          } else {
            return this.handleSuccess(creds);
          }
        })
        .catch(error => this.handleError(error));
    }
  }

  onGoogleSignIn() {
    this.angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(creds => this.handleSuccess(creds))
      .catch(error => this.handleError(error));
  }
}
