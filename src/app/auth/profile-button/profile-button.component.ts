import {
  AfterViewInit,
  Component,
  ElementRef,
  InjectionToken, Injector, OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { FlexibleConnectedPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../../state/state';
import { ProfileButtonPopupComponent } from './profile-button-popup/profile-button-popup.component';
import { User } from 'firebase';

export const PROFILE_BUTTON_DISPLAY_NAME = new InjectionToken<string>('PROFILE_BUTTON_DISPLAY_NAME');
export const PROFILE_BUTTON_CALLBACKS = new InjectionToken<{ onProfile: () => void, onLogout: () => void }>('PROFILE_BUTTON_CALLBACKS');

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.sass']
})
export class ProfileButtonComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('parentButton')
  parentButtonRef: ElementRef;

  @ViewChild('popupContent')
  popupContentTemplateRef: TemplateRef<any>;

  private popupPositionStrategy: FlexibleConnectedPositionStrategy;
  private overlayRef: OverlayRef;
  private popupIsShowing: boolean;

  isLoggedIn$: Observable<boolean>;
  user$: BehaviorSubject<User>;
  private unsubscribe$: Subject<void>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private matOverlay: Overlay,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private store$: Store<State>,
    private injector: Injector,
  ) { }

  ngOnInit(): void {
    this.unsubscribe$ = new Subject<void>();
    this.user$ = new BehaviorSubject<User>(null);
    this.isLoggedIn$ = this.angularFireAuth.authState.pipe(
      switchMap(user => user.reload().then(() => this.angularFireAuth.currentUser)),
      map(user => !!user)
    );

    this.angularFireAuth.user
      .pipe(
        switchMap(user => user.reload().then(() => this.angularFireAuth.currentUser)),
        takeUntil(this.unsubscribe$)
      ).subscribe(this.user$);
  }

  ngAfterViewInit(): void {
    this.popupPositionStrategy = this.matOverlay.position().flexibleConnectedTo(this.parentButtonRef.nativeElement).withPositions([
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetX: -32,
      },
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
      }
    ]);
  }

  ngOnDestroy() {
    this.user$.complete();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  togglePopup() {
    if (this.popupIsShowing) {
      this.hidePopup();
    } else {
      this.showPopup();
    }
  }

  showPopup() {
    this.overlayRef = this.matOverlay.create({
      positionStrategy: this.popupPositionStrategy,
      disposeOnNavigation: true,
    });

    const popupPortal = new ComponentPortal(
      ProfileButtonPopupComponent,
      null,
      this.createOverlayInjector(this.user$.getValue().displayName)
    );
    this.overlayRef.attach(popupPortal);
    this.popupIsShowing = true;
  }

  private createOverlayInjector(displayName: string): Injector {
    return Injector.create({
      providers: [
        { provide: PROFILE_BUTTON_DISPLAY_NAME, useValue: displayName },
        {provide: PROFILE_BUTTON_CALLBACKS, useValue: { onLogout: this.handleLogout.bind(this), onProfile: this.handleProfile.bind(this) }}
      ],
      parent: this.injector,
      name: 'ProfileButtonInjector'
    });
  }

  hidePopup() {
    this.overlayRef.dispose();
    this.popupIsShowing = false;
  }

  handleLogout() {
    // this.overlayRef.dispose();
    this.angularFireAuth.signOut()
      .then(() => this.router.navigate(['/login']))
      .then(() => this.hidePopup());
  }

  handleProfile() {
    // this.overlayRef.dispose();
    this.router.navigate(['/profile']).then(() => this.hidePopup());
  }
}
