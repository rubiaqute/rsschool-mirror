import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  constructor() {}

  @Input() color:string|undefined;
  ngOnInit(): void {}
  returnCarColor(color: string|undefined): { fill: string } {
    return {
      fill: `${color}`,
    };
  }
}
