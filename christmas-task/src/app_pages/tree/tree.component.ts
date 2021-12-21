import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, AfterViewInit  } from '@angular/core';
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
  constructor(private router: Router, private positionService: PositionServiceComponent) {}
  ngOnInit(): void {
    this.backgroundImage = this.returnBackground('1');
    this.imageTree = this.returnTreeImage('1');
  }
  showSmth(event:MouseEvent){
    console.log('Мэп')
console.log(event.pageX, event.pageY)
  }
  showSize(event:MouseEvent) {
    // console.log((<HTMLElement>event.target)!.offsetWidth)
    // console.log((<HTMLElement>event.target)!.offsetHeight)
    // console.log((<HTMLElement>event.target)!.getBoundingClientRect().left)
    // console.log((<HTMLElement>event.target)!.getBoundingClientRect().top)
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
