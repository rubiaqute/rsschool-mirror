import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  HostListener,
} from '@angular/core';
import { PositionServiceComponent } from './../../app_services/position-service/position-service.component';
import { TreeModule } from './tree.module';
import { GarlandComponent } from './../../app_views/garland/garland.component';
import { StorageServiceComponent } from 'src/app_services/storage-service/storage-service.component';
import html2canvas from 'html2canvas';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [GarlandComponent],
})
export class TreeComponent implements OnInit {
  //Get from DOM: tree, main container for toys drop, container for screenshot
  @ViewChild('screenShotContainer')
  containerForScreeshot!: ElementRef<HTMLElement>;
  @ViewChild('containerTree') containerTree!: ElementRef<HTMLImageElement>;
  @ViewChild('containerDrop') containerForDrop!: ElementRef<HTMLElement>;

  toggleScreenShot: boolean = false; //show screenshot container
  toggleScreenShotMessage: boolean = false; //show message before scrennshot complete
  garlandColorChoice: string = 'multicolor'; //color for garland
  backgroundImage: { background: string } = { background: '1' }; //url for background
  switchGarland: boolean = false; //for garland toggle
  imageTree: string = ''; //url for tree img
  congratsInput: string = ''; //user input

  constructor(
    private positionService: PositionServiceComponent,
    private storage: StorageServiceComponent
  ) {}
  ngOnInit(): void {
    if (this.storage.getObject('christmasTreeBgImage'))
      this.backgroundImage = this.storage.getObject('christmasTreeBgImage');
    else this.backgroundImage = this.returnBackground('1');
    if (this.storage.getObject('christmasTreeImageTree'))
      this.imageTree = this.storage.getObject('christmasTreeImageTree');
    else this.imageTree = this.returnTreeImage('1');
  }
  //Listen dragend for returning toys in slots, if they are not dropped on tree
  @HostListener('window:dragend', ['$event'])
  dragEnd(event: MouseEvent): void {
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
  makeScreen(): void {
    this.toggleScreenShot = true;
    this.toggleScreenShotMessage = true;
    html2canvas(this.containerForDrop.nativeElement).then((canvas) => {
      canvas.style.width = '50%';
      canvas.id = 'canvasTree';
      this.containerForScreeshot.nativeElement.appendChild(canvas);
      document.getElementById('messageScreenShot')?.remove();
    });
  }
  closeScreenshot(): void {
    this.toggleScreenShot = false;
  }
  dowloadScreenShot(): void {
    let canvasImage = (<HTMLCanvasElement>(
      document.getElementById('canvasTree')
    ))!.toDataURL('image/jpg');
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
      let a = document.createElement('a');
      a.href = window.URL.createObjectURL(xhr.response);
      a.download = 'merry_christmas.jpg';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
    xhr.open('GET', canvasImage); // This is to download the canvas Image
    xhr.send();
  }
  getCongratInput(input: string): void {
    this.congratsInput = input;
  }
  handleOver(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
  }
  handleOverDrop(event: DragEvent): void {
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
  //for adjusting area coords depending on tree dimensions
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
  changGarlandView(flag: boolean): void {
    this.switchGarland = flag;
  }
  changeGarlandColor(color: string): void {
    this.switchGarland = true;
    this.garlandColorChoice = color;
  }
  rewriteColorGarland(color: string): void {
    this.garlandColorChoice = color;
  }
  rewriteBg(num: string): void {
    this.backgroundImage = this.returnBackground(num);
    this.storage.setObject('christmasTreeBgImage', this.backgroundImage);
  }
  rewriteTree(num: string): void {
    this.imageTree = this.returnTreeImage(num);
    this.storage.setObject('christmasTreeImageTree', this.imageTree);
  }
}
