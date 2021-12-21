import { Component, OnInit, Injectable } from '@angular/core';
import { coordinatesBasic } from 'src/app_mocks/tree-data';
import { ICoordinates } from 'src/app_models/interfaces';

@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-position-service',
  templateUrl: './position-service.component.html',
  styleUrls: ['./position-service.component.scss']
})
export class PositionServiceComponent {

  constructor() { }
 getNewCoords(tree:HTMLImageElement): string{
let coords:string='';
coordinatesBasic.forEach((el)=>{
  coords= coords+ String(Math.round(tree.getBoundingClientRect().width*el.x/500))+','
  coords= coords+ String(Math.round(tree.getBoundingClientRect().height*el.y/700))+','
})
coords=coords.substring(0,coords.length-1)
// console.log(coords);
return coords;
}

}
