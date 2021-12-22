import { Component, OnInit, HostListener, ElementRef, ViewChild, Input, ChangeDetectorRef, ChangeDetectionStrategy, AfterContentChecked } from '@angular/core';
import { PositionServiceComponent } from 'src/app_services/position-service/position-service.component';
import { ToyCard } from './../../app_models/interfaces';
import { DecorateServiceComponent } from './../../app_services/decorate-service/decorate-service.component';

@Component({

  selector: 'app-toys-to-hang',
  templateUrl: './toys-to-hang.component.html',
  styleUrls: ['./toys-to-hang.component.scss'],
})
export class ToysToHangComponent implements OnInit {

  // @Input() treeContainer!: ElementRef<HTMLImageElement>
  toysToHang: ToyCard[] = [];
  dragActive: boolean = false;
  toyDrag: HTMLElement= document.getElementById('toysContainer')!
  currentDroppable:HTMLElement|null=null;
  handleDragStart(event:DragEvent,toy:ToyCard){
    this.positionService.rewriteIsAvailableToDrop(false);
    const clone=(<HTMLElement>event.target)!.cloneNode(true);
    event.dataTransfer!.setData("dragToy", (<HTMLElement>event.target)!.id );
  }
  
  // @HostListener('window:mouseup', ['$event'])
  // mouseUp(event:MouseEvent){
  //   if(this.dragActive==true){
  //     this.dragActive=false;
  //   }
  // }


 


  // getElementOffsets(elem:HTMLElement) {
  //     return {
  //         top: this.getOffsetTop(elem),
  //         left: this.getOffsetLeft(elem)
  //     }
  // }

  // getOffsetTop(elem:HTMLElement) {
  //     let offsetTop = 0;
  //     do {
  //         if (!isNaN(elem.offsetTop)) {
  //             offsetTop += elem.offsetTop;
  //         }
  //     } while (elem = elem.offsetParent as HTMLElement);
  //     return offsetTop;
  // }

  // getOffsetLeft(elem:HTMLElement) {
  //     let offsetLeft = 0;
  //     do {
  //         if (!isNaN(elem.offsetLeft)) {
  //             offsetLeft += elem.offsetLeft;
  //         }
  //     } while (elem = elem.offsetParent as HTMLElement);
  //     return offsetLeft;
  // }
  constructor(private decorateService: DecorateServiceComponent, private cdr:ChangeDetectorRef, private positionService: PositionServiceComponent) {}

  ngOnInit(): void {
    this.toysToHang = this.decorateService.getToysToHang();
    
    console.log(this.toysToHang);
  }
  getCount(count: string): string {
    return count.padStart(2, '0');
  }
  drag(event: DragEvent, toyId:string) {
    event.preventDefault();
    this.toyDrag = event.target as HTMLElement;
    event.dataTransfer!.setData('drag-toy', toyId)
    this.dragActive=true;
    // this.initialPrepare();
    // this.toyDrag.style.left = event.pageX-this.toyDrag.offsetWidth / 2 + 'px';
    // this.toyDrag.style.top = event.pageY-this.toyDrag.offsetHeight / 2 + 'px';
    // const toyBox = document.querySelectorAll('.tree-container__toy-image');
    // if (this.toyDrag.closest('.tree-container__toy-image')){
    // toyBox[index].removeChild(this.toyDrag)
    // document.querySelector('.tree-container')!.append(this.toyDrag)
    // }
  }
    
  


  

}
