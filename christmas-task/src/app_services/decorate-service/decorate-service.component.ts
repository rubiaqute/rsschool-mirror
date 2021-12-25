import { Component, OnInit, Injectable } from '@angular/core';
import { StorageServiceComponent } from '../storage-service/storage-service.component';
import { toys } from 'src/app_mocks/toys';
import { toysToHangLength } from 'src/app_mocks/tree-data';
import { ToyCard } from 'src/app_models/interfaces';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-decorate-service',
  templateUrl: './decorate-service.component.html',
  styleUrls: ['./decorate-service.component.scss'],
})
export class DecorateServiceComponent {
  constructor(private storage: StorageServiceComponent) {}
  getToysToHang(): ToyCard[] {
    let toysForTree: ToyCard[] = [];
    if (
      this.storage.getObject('favouritesToys') &&
      this.storage.getObject('favouritesToys').length > 0
    ) {
      toysForTree = this.storage.getObject('favouritesToys');
    } else {
      toysForTree = this.getRandomToys();
    }
    return toysForTree;
  }
  getRandomToys(): ToyCard[] {
    let randomToysForTree: ToyCard[] = [];
    do {
      const index = Math.floor(Math.random() * toys.length);
      if (!randomToysForTree.includes(toys[index]))
        randomToysForTree.push(toys[index]);
    } while (randomToysForTree.length < toysToHangLength);
    return randomToysForTree;
  }
}
