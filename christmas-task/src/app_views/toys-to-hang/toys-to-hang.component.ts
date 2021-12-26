import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
  TemplateRef,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  AfterContentChecked,
} from '@angular/core';
import { PositionServiceComponent } from 'src/app_services/position-service/position-service.component';
import { ToyCard } from './../../app_models/interfaces';
import { DecorateServiceComponent } from './../../app_services/decorate-service/decorate-service.component';
import html2canvas from 'html2canvas';
import { TreeComponent } from 'src/app_pages/tree/tree.component';

@Component({
  selector: 'app-toys-to-hang',
  templateUrl: './toys-to-hang.component.html',
  styleUrls: ['./toys-to-hang.component.scss'],
})
export class ToysToHangComponent implements OnInit {
  // @Input() treeContainer!: ElementRef<HTMLImageElement>

  toysArray: (string | number)[][][] = [];
  toysToHang: ToyCard[] = [];
  dragActive: boolean = false;
  toyDrag: HTMLElement = document.getElementById('toysContainer')!;
  currentDroppable: HTMLElement | null = null;
  handleDragStart(event: DragEvent) {
    this.positionService.rewriteIsAvailableToDrop(false);
    event.dataTransfer!.setData('dragToy', (<HTMLElement>event.target)!.id);
  }

  ngOnInit(): void {
    this.toysToHang = this.decorateService.getToysToHang();
    this.toysArray = this.createToysArray();
  }
  getCount(id: number): string {
    const imageContainers = document.querySelectorAll(
      '.tree-container__toy-image'
    );
    return String(imageContainers[id].childElementCount).padStart(2, '0');
  }
  createToysArray() {
    let toysArray: (string | number)[][][] = [];
    this.toysToHang.forEach((el) => {
      let toy: (string | number)[][] = [];
      for (let i = 0; i < Number(el.count); i++) {
        toy.push([el.num, i]);
      }
      toysArray.push(toy);
    });
    return toysArray;
  }

  constructor(
    private decorateService: DecorateServiceComponent,
    private cdr: ChangeDetectorRef,
    private positionService: PositionServiceComponent,
    private mainPage: TreeComponent
  ) {}

  drag(event: DragEvent, toyId: string) {
    event.preventDefault();
    this.toyDrag = event.target as HTMLElement;
    event.dataTransfer!.setData('drag-toy', toyId);
    this.dragActive = true;
  }
}
