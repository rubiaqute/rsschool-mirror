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
isDragged:boolean=false;
isAvailableToDrop:boolean=false;
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
rewriteIsDragged(newFlg:boolean){
  this.isDragged = newFlg;
  
}
rewriteIsAvailableToDrop(newFlg:boolean){
  this.isAvailableToDrop = newFlg;
  
}
returnIsDragged(): boolean{
  alert(this.isDragged)
  return this.isDragged
}

initialPrepare(elem:HTMLElement){
  elem.style.zIndex = '10';
}
initialPrepareForQuit(elem:HTMLElement){
  elem.style.display=''
  elem.style.width = '100%';
  elem.style.height = '';
  elem.style.position = 'absolute';
  elem.style.zIndex = '';

}
getParent(idToy:string):HTMLElement{
  const imageContainers = document.querySelectorAll('.tree-container__toy-image');
  const id=Number(idToy.split('-')[0].trim())
    return <HTMLElement>imageContainers[id];
}
}
