import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemedDirective } from './themed.directive';

@NgModule({
  declarations: [ThemedDirective],
  exports: [
    ThemedDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ThemedDirectiveModule { }
