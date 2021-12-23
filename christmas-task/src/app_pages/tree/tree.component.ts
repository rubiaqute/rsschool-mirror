import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, AfterViewInit, HostListener  } from '@angular/core';
import { Router } from '@angular/router';
import { PositionServiceComponent } from './../../app_services/position-service/position-service.component';
import { TreeModule } from './tree.module';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit, AfterViewInit {
  backgroundImage: { background: string } = { background: '1' };
  
  imageTree: string = '';
  @ViewChild('containerTree') containerTree!: ElementRef<HTMLImageElement>;
  @ViewChild('containerForDrop') containerForDrop!: ElementRef<HTMLImageElement>;
  constructor(private router: Router, private positionService: PositionServiceComponent) {}
  @HostListener('window:dragend', ['$event'])
  dragEnd(event:MouseEvent){
    event.preventDefault();
    if(this.positionService.isAvailableToDrop==false){
      const draggedEl = document.getElementById((<HTMLElement>event.target)!.id) as HTMLElement;
      if (draggedEl.parentNode==this.containerForDrop.nativeElement) {
        draggedEl.parentNode!.removeChild(draggedEl);
        this.positionService.initialPrepareForQuit(draggedEl)
        const parent = this.positionService.getParent(draggedEl.id);
        parent.appendChild(draggedEl);
        draggedEl.style.left = '';
        draggedEl.style.top = '';
      }
    
    } 
  }
  ngOnInit(): void {
    this.backgroundImage = this.returnBackground('1');
    this.imageTree = this.returnTreeImage('1');
  }
  showSmth(event:MouseEvent){
    console.log('Мэп')
let elemBelow = document.elementFromPoint(event.clientX, event.clientY)
        console.log(event.target)
  }
  handleOver(event:DragEvent){
    event.stopPropagation();
    event.preventDefault(); 
  }
  handleOverDrop(event:DragEvent){
    event.preventDefault(); 
    this.positionService.rewriteIsAvailableToDrop(true);
    const draggedId = event.dataTransfer!.getData("dragToy");
    const draggedEl = document.getElementById(draggedId) as HTMLElement;
    const container = this.containerForDrop.nativeElement;
    const height = draggedEl.offsetHeight
    const width = draggedEl.offsetWidth
    draggedEl.style.display='block'
    draggedEl.style.position='absolute'
    draggedEl.parentNode!.removeChild(draggedEl);
    // Находим относительную ширину и высоту относительно контейнера с елкой
    draggedEl.style.width = (width/(container.getBoundingClientRect().width))*100 + '%';
    draggedEl.style.height = (height/(container.getBoundingClientRect().height))*100 + '%';
    this.positionService.initialPrepare(draggedEl);
    
    container.appendChild(draggedEl);
    // Находим положение относительно контейнера с елкой
    draggedEl.style.left = ((event.pageX-draggedEl.offsetWidth / 2 -container.getBoundingClientRect().left)/container.getBoundingClientRect().width)*100 + '%';
    draggedEl.style.top = (((event.pageY-draggedEl.offsetHeight / 2)-container.getBoundingClientRect().top)/container.getBoundingClientRect().height)*100 + '%';
    
    

  }
//   dropSmth(event:DragEvent){
// event.preventDefault();
// const data = event.dataTransfer!.getData('drag-toy')
// (<HTMLElement>event.target).appendChild(document.getElementById(data))
//     console.log("Дроп")
//   }
dragOverSmth(event:Event){
  event.stopPropagation();
  event.preventDefault();
  console.log("Дрэговер")
}
  showSize(event:MouseEvent) {
    console.log('Дерево')
    console.log(event.pageX, event.pageY)
  }
  ngAfterViewInit() {

    console.log(this.containerTree) 
    }
  returnCoords():string {
    let newCoords:string = ''
    if (this.containerTree !== undefined){
    newCoords= this.positionService.getNewCoords(this.containerTree.nativeElement)
    }
    return newCoords;
    // return '423,509,609,509,654,429,516,80,371,429';
    // return '94,684,420,682,498,563,257,16,5,553'
  }
  returnBackground(num: string): { background: string } {
    return {
      background: `url(assets/bg/${num}.jpg) center/cover no-repeat `,
    };
  }
  returnTreeImage(num: string): string {
    return `assets/tree/${num}.png`;
  }
  rewriteBg(num: string):void {
    this.backgroundImage = this.returnBackground(num);
  }
  rewriteTree(num: string):void {
    this.imageTree = this.returnTreeImage(num)
  }
}
