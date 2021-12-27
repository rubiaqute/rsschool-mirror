import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PositionServiceComponent } from 'src/app_services/position-service/position-service.component';
import { ToyCard } from './../../app_models/interfaces';
import { DecorateServiceComponent } from './../../app_services/decorate-service/decorate-service.component';
import { StorageServiceComponent } from 'src/app_services/storage-service/storage-service.component';

@Component({
  selector: 'app-toys-to-hang',
  templateUrl: './toys-to-hang.component.html',
  styleUrls: ['./toys-to-hang.component.scss'],
})
export class ToysToHangComponent implements OnInit {
  toysArray: (string | number)[][][] = []; //is used for cloning toys on every card
  toysToHang: ToyCard[] = []; //is used for show every toy card

  ngOnInit(): void {
    this.toysToHang = this.decorateService.getToysToHang();
    this.toysArray = this.createToysArray();
  }
  handleDragStart(event: DragEvent) {
    this.positionService.rewriteIsAvailableToDrop(false);
    event.dataTransfer!.setData('dragToy', (<HTMLElement>event.target)!.id);
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
    private storageService: StorageServiceComponent
  ) {}

  cleanSettings() {
    this.storageService.removeObject('christmasTreeSettings');
    this.storageService.removeObject('christmasTreeBgImage');
    this.storageService.removeObject('christmasTreeBgImage');
    this.storageService.removeObject('christmasTreeImageTree');
    this.storageService.removeObject('garlandSwitch');
    this.storageService.removeObject('garlandColor');
  }
}
