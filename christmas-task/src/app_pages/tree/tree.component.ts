import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { PositionServiceComponent } from './../../app_services/position-service/position-service.component';
import { TreeModule } from './tree.module';
import { GarlandComponent } from './../../app_views/garland/garland.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [GarlandComponent],
})
export class TreeComponent implements OnInit, AfterViewInit {
  garlandColorChoice: string = 'multicolor';
  backgroundImage: { background: string } = { background: '1' };
  switchGarland: boolean = false;
  imageTree: string = '';
  @ViewChild('containerTree') containerTree!: ElementRef<HTMLImageElement>;
  @ViewChild('containerDrop') containerForDrop!: ElementRef<HTMLElement>;
  constructor(
    private router: Router,
    private positionService: PositionServiceComponent,
    private garland: GarlandComponent
  ) {}
  @HostListener('window:dragend', ['$event'])
  dragEnd(event: MouseEvent) {
    event.preventDefault();
    if (this.positionService.isAvailableToDrop == false) {
      const draggedEl = document.getElementById(
        (<HTMLElement>event.target)!.id
      ) as HTMLElement;
      if (draggedEl.parentNode == this.containerForDrop.nativeElement) {
        draggedEl.parentNode!.removeChild(draggedEl);
        this.positionService.initialPrepareForQuit(draggedEl);
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
  showSmth(event: MouseEvent) {
    console.log('Мэп');
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    console.log(event.target);
  }
  handleOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }
  handleOverDrop(event: DragEvent) {
    event.preventDefault();
    this.positionService.rewriteIsAvailableToDrop(true);
    const draggedId = event.dataTransfer!.getData('dragToy');
    const draggedEl = document.getElementById(draggedId) as HTMLElement;
    const container = this.containerForDrop.nativeElement;
    const height = draggedEl.offsetHeight;
    const width = draggedEl.offsetWidth;
    draggedEl.style.display = 'block';
    draggedEl.style.position = 'absolute';
    draggedEl.parentNode!.removeChild(draggedEl);
    // Находим относительную ширину и высоту относительно контейнера с елкой
    draggedEl.style.width =
      (width / container.getBoundingClientRect().width) * 100 + '%';
    draggedEl.style.height =
      (height / container.getBoundingClientRect().height) * 100 + '%';
    this.positionService.initialPrepare(draggedEl);

    container.appendChild(draggedEl);
    // Находим положение относительно контейнера с елкой
    draggedEl.style.left =
      ((event.pageX -
        draggedEl.offsetWidth / 2 -
        container.getBoundingClientRect().left) /
        container.getBoundingClientRect().width) *
        100 +
      '%';
    draggedEl.style.top =
      ((event.pageY -
        draggedEl.offsetHeight / 2 -
        container.getBoundingClientRect().top) /
        container.getBoundingClientRect().height) *
        100 +
      '%';
  }

  ngAfterViewInit() {
    console.log(this.containerTree);
  }
  returnCoords(): string {
    let newCoords: string = '';
    if (this.containerTree !== undefined) {
      newCoords = this.positionService.getNewCoords(
        this.containerTree.nativeElement
      );
    }
    return newCoords;
  }
  returnBackground(num: string): { background: string } {
    return {
      background: `url(assets/bg/${num}.jpg) center/cover no-repeat `,
    };
  }
  returnTreeImage(num: string): string {
    return `assets/tree/${num}.png`;
  }
  changGarlandView(flag: boolean) {
    this.switchGarland = flag;
    console.log(this.switchGarland);
  }
  changeGarlandColor(color: string) {
    this.switchGarland = true;
    this.garlandColorChoice = color;
    // this.garland.rewriteClass(color);
  }
  rewriteBg(num: string): void {
    this.backgroundImage = this.returnBackground(num);
  }
  rewriteTree(num: string): void {
    this.imageTree = this.returnTreeImage(num);
  }
}
