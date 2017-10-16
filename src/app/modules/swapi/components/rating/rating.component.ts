import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-rating',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <i class="fa fa-star rating" *ngFor="let i of [1,2,3,4,5]"
       [class.over]="overValue >= i"
       [class.starred]="rating >= i"
       (mouseover)="over(i)"
       (mouseout)="out()"
       (click)="update(i)"></i>
  `,
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() rating: number;
  @Output() setRate = new EventEmitter<number>();

  overValue: number;

  update(value: number): void {
    this.setRate.emit(value);
  }

  over(value: number): void {
    this.overValue = value;
  }

  out(): void {
    this.overValue = 0;
  }
}
