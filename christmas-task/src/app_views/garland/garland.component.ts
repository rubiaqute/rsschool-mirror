import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-garland',
  templateUrl: './garland.component.html',
  styleUrls: ['./garland.component.scss'],
})
export class GarlandComponent implements OnInit {
  @HostListener('window:resize')
  onResize() {
    this.garlandObject = this.createGarLandObject().garlandObject;
    this.bulbArray = this.createGarLandObject().bulbArray;
  }
  garlandObject: number[][] = [];
  bulbArray: number[][] = [];
  constructor() {}

  ngOnInit(): void {
    this.garlandObject = this.createGarLandObject().garlandObject;
    this.bulbArray = this.createGarLandObject().bulbArray;
  }

  returnLightropeCount() {
    return this.garlandObject.length;
  }
  returnBulbCount(i: number): number[] {
    return this.bulbArray[this.bulbArray.length - i - 1];
  }
  createGarLandObject() {
    const tree = document.getElementById('treeMain')!;
    const width: number = tree.offsetWidth;
    const height: number = tree.offsetHeight;
    console.log(width, height);
    const lightropesCount = Math.floor(height / 50);
    const bulbsMaximunCount = Math.floor(width / 5);
    const garlandObject: number[][] = [];
    const bulbArray: number[][] = [];
    let heightLightrope = 0;
    let widthLightrope = 0;
    for (let i = 0; i < lightropesCount - 1; i++) {
      bulbArray[i] = [];
      heightLightrope = height - i * 50 - 25;
      widthLightrope = Math.round(2 * heightLightrope * 0.28);
      garlandObject.push([heightLightrope, widthLightrope]);
      for (let j = 0; j < Math.round(widthLightrope / 8); j++) {
        bulbArray[i].push(j);
      }
    }
    console.log(garlandObject);
    return {
      garlandObject: garlandObject,
      bulbArray: bulbArray,
    };
  }
  // returnBulbPosition(i:number, j:number){
  // const c= Math.sqrt(50**2+this.garlandObject[this.garlandObject.length-i-1][1]**2);
  // const degree = Math.asin(this.garlandObject[this.garlandObject.length-i-1][1]/c)/0.0175;
  // let degreeBulb=0;
  // if(j>this.bulbArray[this.bulbArray.length-i-1].length){
  //   degreeBulb=degree/this.bulbArray[this.bulbArray.length-i-1].length/2*j
  // } else degreeBulb=-degree/this.bulbArray[this.bulbArray.length-i-1].length/2*j;
  // console.log(degreeBulb)
  //  return {
  //    'transform':`rotate(${degreeBulb}deg)`
  //  }
  // }
  returnBulbPosition(i: number, j: number) {
    const widthOfRope =
      this.garlandObject[this.garlandObject.length - i - 1][1];
    const bulbCount = this.bulbArray[this.bulbArray.length - i - 1].length;
    const coordX = (widthOfRope / bulbCount) * (j + 1) - widthOfRope / 2;

    const shift = -Math.abs(Math.round(0.005 * coordX ** 2));
    return {
      transform: `translateY(${shift}px)`,
    };
  }
  returnRopeDimensions(i: number) {
    return {
      width: `${this.garlandObject[this.garlandObject.length - i - 1][1]}px`,
      height: '50px',
      display: 'flex',
      'justify-content': 'space-between',
    };
  }
}
