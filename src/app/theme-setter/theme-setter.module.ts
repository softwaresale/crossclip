import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSetterComponent } from './theme-setter.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ThemeSetterComponent],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  exports: [ThemeSetterComponent],
})
export class ThemeSetterModule { }
