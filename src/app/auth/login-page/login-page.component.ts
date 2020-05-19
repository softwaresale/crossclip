import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from '../../state/state';
import { AngularFireAuth } from '@angular/fire/auth';
import { appStateSelectAnySmall } from '../../state/app-state/app-state.selectors';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { auth } from 'firebase';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  isMobile$: Observable<boolean>;
  isSubmitted$: BehaviorSubject<boolean>;
  errorText$: BehaviorSubject<string>;
  loginForm: FormGroup;

  get emailControl(): FormControl { return this.loginForm.get('email') as FormControl }
  get passwordControl(): FormControl { return this.loginForm.get('password') as FormControl }

  constructor(
    private store$: Store<State>,
    private angularFireAuth: AngularFireAuth,
    private fb: FormBuilder,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private router: Router,
    private matSnackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.isMobile$ = this.store$.pipe(select(appStateSelectAnySmall));
    this.isSubmitted$ = new BehaviorSubject<boolean>(false);
    this.errorText$ = new BehaviorSubject<string>(null);

    const assetUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/google.svg');
    this.matIconRegistry.addSvgIcon('google_logo', assetUrl);

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      this.isSubmitted$.next(true);
      const { email, password } = this.loginForm.value;
      this.angularFireAuth.signInWithEmailAndPassword(email, password)
        .then(creds => this.handleSuccess(creds))
        .catch(error => this.handleError(error));
    }
  }

  async onGoogleLogin() {
    this.isSubmitted$.next(true);
    this.angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(creds => this.handleSuccess(creds))
      .catch(error => this.handleError(error));
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
}
