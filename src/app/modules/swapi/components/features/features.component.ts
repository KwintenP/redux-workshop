import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features',
  template: `
    <div class="content">
      <h3>
        Features
      </h3>
      <ul>
        <li>Autocomplete</li>
        <li>Reducers test</li>
        <li>Reducers</li>
        <li>Store integration</li>
        <li>Selecting from the store</li>
        <li>Updating the store</li>
        <li>Meta reducers</li>
        <li>Proper angular architecture</li>
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
