import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clip-content-view',
  templateUrl: './clip-content-view.component.html',
  styleUrls: ['./clip-content-view.component.sass']
})
export class ClipContentViewComponent implements OnInit {

  @Input()
  content: string;

  @Input()
  type: string;

  constructor() { }

  ngOnInit(): void {
  }

}
