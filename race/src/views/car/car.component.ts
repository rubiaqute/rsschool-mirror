import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export default class CarComponent {
  @Input() color:string | undefined;

  colorCar:string = '';

  returnCarColor(color: string | undefined): { fill: string } {
    this.colorCar = color!;
    return {
      fill: `${color}`,
    };
  }
}
