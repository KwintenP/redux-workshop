import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features',
  template: `
    <div class="content">
      <h3>
        Features
      </h3>
      <ul>
        <li>Server side filtering</li>
      </ul>
    </div>
  `,
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
