import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile-button-popup',
  templateUrl: './profile-button-popup.component.html',
  styleUrls: ['./profile-button-popup.component.sass']
})
export class ProfileButtonPopupComponent implements OnInit {

  @Input()
  displayName: string;

  @Output()
  onLogout = new EventEmitter();

  @Output()
  onProfile = new EventEmitter();

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
