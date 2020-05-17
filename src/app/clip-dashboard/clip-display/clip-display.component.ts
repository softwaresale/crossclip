import { Component, Input, OnInit } from '@angular/core';
import { Clip } from "../../state/clip/clip.model";

@Component({
  selector: 'app-clip-display',
  templateUrl: './clip-display.component.html',
  styleUrls: ['./clip-display.component.sass']
})
export class ClipDisplayComponent implements OnInit {

  @Input()
  clip: Clip;

  constructor() { }

  ngOnInit(): void {
  }

}
