import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-topbar',
  template: `
    <div class="content">
      <h3>Swapi application</h3>
      <button type="button" (click)="reloadData()">Reset data</button>
    </div>
  `,
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  @Output() reload = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  reloadData() {
    this.reload.next();
  }
}
