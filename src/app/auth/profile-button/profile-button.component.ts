import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FlexibleConnectedPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.sass']
})
export class ProfileButtonComponent implements OnInit, AfterViewInit {

  @ViewChild('parentButton')
  parentButtonRef: ElementRef;

  @ViewChild('popupContent')
  popupContentTemplateRef: TemplateRef<any>;

  private popupPositionStrategy: FlexibleConnectedPositionStrategy;
  private overlayRef: OverlayRef;
  private popupIsShowing: boolean;

  isLoggedIn$: Observable<boolean>;
  displayName$: Observable<string>;
  userProfileUrl$: Observable<string>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private matOverlay: Overlay,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.angularFireAuth.authState.pipe(map(user => !!user));
    this.displayName$ = this.angularFireAuth.user.pipe(map(user => user.displayName));
    this.userProfileUrl$ = this.angularFireAuth.user.pipe(
      map(user => user.photoURL),
    );
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
    // const popupPortal = new ComponentPortal(ProfileButtonPopupComponent);
    const popupPortal = new TemplatePortal(this.popupContentTemplateRef, this.viewContainerRef);
    this.overlayRef.attach(popupPortal);
    this.popupIsShowing = true;
  }

  hidePopup() {
    this.overlayRef.dispose();
    this.popupIsShowing = false;
  }

  handleLogout() {
    this.overlayRef.dispose();
    this.angularFireAuth.signOut().then(() => this.router.navigate(['/login']));
  }

  handleProfile() {
    this.overlayRef.dispose();
    this.router.navigate(['/profile']);
  }
}
