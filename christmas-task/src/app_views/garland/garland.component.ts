import {
  Component,
  OnInit,
  HostListener,
  OnChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewChecked,
  Input,
} from '@angular/core';
import { garlandColors } from 'src/app_mocks/tree-data';
@Component({
  selector: 'app-garland',
  templateUrl: './garland.component.html',
  styleUrls: ['./garland.component.scss'],
})
export class GarlandComponent implements OnInit {
  @Input() garlandColor!: string;
  @HostListener('window:resize')
  onResize() {
    this.garlandObject = this.createGarLandObject().garlandObject;
    this.bulbArray = this.createGarLandObject().bulbArray;
  }
  firstRopeMarginTop: number = 15;
  lightropesInnerCount: number = 0;
  lightropesCount: number = 7;
  bulbsInnerGap: number = 10;
  garlandColors: string[] = [];
  garlandObject: number[][] = [];
  bulbArray: number[][] = [];
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.garlandObject = this.createGarLandObject().garlandObject;
    this.bulbArray = this.createGarLandObject().bulbArray;
    this.garlandColors = garlandColors;
  }

  updateGarlandColor() {
    if (this.garlandColor) return this.garlandColor;
    else return 'multicolor';
  }

  returnLightropeCount() {
    return this.garlandObject.length;
  }
  returnBulbCount(i: number): number[] {
    return this.bulbArray[this.bulbArray.length - i - 1];
  }
  changeColor(color: string) {
    this.garlandColor = color;
  }
  rewriteClass(color: string) {
    this.garlandColor = color;
    this.cdr.detectChanges();
  }
  createGarLandObject() {
    const tree = document.getElementById('treeMain')!;
    const width: number = tree.offsetWidth;
    const height: number = tree.offsetHeight;
    console.log(width, height);
    //Получаю промежуточную высоту между веревками
    this.lightropesInnerCount = Math.floor(height / this.lightropesCount);
    const bulbsMaximunCount = Math.floor(width / this.bulbsInnerGap);
    const garlandObject: number[][] = [];
    const bulbArray: number[][] = [];
    let heightLightrope = 0;
    let widthLightrope = 0;
    //Для каждой веревки нахожу ее высоту от края елки и ее ширину, записываю их в объект
    for (let i = 0; i < this.lightropesCount; i++) {
      bulbArray[i] = [];
      //Высота каждой веревки рассчитывается вычитанием из высоты елки промежуточного расстояния помноженного на порядковый номер веревки
      heightLightrope =
        height - i * this.lightropesInnerCount - this.firstRopeMarginTop;
      // Ширину веревки вычисляю с учетом, что угол вершины елки к ее высоте примерно 15 градусов, по формуле половина ширины это высота * на тангенс угла
      widthLightrope = Math.round(2 * heightLightrope * 0.28);
      garlandObject.push([heightLightrope, widthLightrope]);
      //Записываю также в отдельный объект для каждой веревки количество лампочек.
      for (
        let j = 0;
        j < Math.round(widthLightrope / this.bulbsInnerGap);
        j++
      ) {
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
      height: `${this.lightropesInnerCount}px`,
      display: 'flex',
      'justify-content': 'space-between',
    };
  }
}
