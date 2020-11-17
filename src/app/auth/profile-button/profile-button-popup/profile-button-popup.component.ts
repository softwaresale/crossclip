import { Component, Inject, OnDestroy, OnInit, } from '@angular/core';
import {
  PROFILE_BUTTON_CALLBACKS,
  PROFILE_BUTTON_DISPLAY_NAME,
} from '../profile-button.component';

@Component({
  selector: 'app-profile-button-popup',
  templateUrl: './profile-button-popup.component.html',
  styleUrls: ['./profile-button-popup.component.sass']
})
export class ProfileButtonPopupComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(PROFILE_BUTTON_DISPLAY_NAME) public displayName: string,
    @Inject(PROFILE_BUTTON_CALLBACKS) public callbacks: { onProfile: () => void, onLogout: () => void }
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }
}
