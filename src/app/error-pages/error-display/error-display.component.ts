import { Component, Input, OnInit } from '@angular/core';
import { AppError } from '../../state/error/app-error.model';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.sass']
})
export class ErrorDisplayComponent implements OnInit {

  @Input() error: AppError;

  constructor() { }

  ngOnInit(): void {
  }

}
