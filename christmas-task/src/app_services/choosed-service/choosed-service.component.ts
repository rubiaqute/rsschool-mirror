import { Component, OnInit, OnChanges } from '@angular/core';
import { ToyCard } from '../../app_models/interfaces';
import { ModalServiceComponent } from '../modal-service/modal-service.component';
import { StorageServiceComponent } from '../storage-service/storage-service.component';

@Component({
  selector: 'app-choosed-service',
  templateUrl: './choosed-service.component.html',
  styleUrls: ['./choosed-service.component.scss'],
})
export class ChoosedServiceComponent implements OnInit {
  choosed: ToyCard[] = [];
  toggleModal: boolean = true;
  constructor(
    private storageService: StorageServiceComponent,
    private modal: ModalServiceComponent
  ) {
    // this.choosed = this.storageService.getObject('favouritesToys');
  }
  ngOnInit(): void {
    this.choosed = this.storageService.getObject('favouritesToys');
    if (!this.choosed) this.choosed = [];
  }

  addToFavourites(toy: ToyCard): void {
    this.choosed = this.getFavourites();
    if (!this.isChosen(toy)) {
      if (Number(this.getFavouritesLength()) + 1 > 20) {
        this.modal.switchModal();
      } else {
        this.choosed.push(toy);
        this.storageService.setObject('favouritesToys', this.choosed);
      }
    } else {
      const index: number = this.getIndexEliminate(toy);
      this.choosed.splice(index, 1);
      this.storageService.setObject('favouritesToys', this.choosed);
    }
  }
  getIndexEliminate(toy: ToyCard): number {
    this.choosed = this.getFavourites();
    return Number(this.choosed.findIndex((el) => el.num === toy.num));
  }
  isChosen(toy: ToyCard): boolean {
    this.choosed = this.storageService.getObject('favouritesToys');
    if (this.choosed) {
      const check: ToyCard[] = this.choosed.filter((el) => {
        return el.num === toy.num;
      });
      if (check.length > 0) return true;
      else return false;
    } else return false;
  }
  getFavourites(): ToyCard[] {
    this.choosed = this.storageService.getObject('favouritesToys');
    if (!this.choosed) this.choosed = [];
    return this.choosed;
  }
  getFavouritesLength(): string {
    return String(this.getFavourites().length).padStart(2, '0');
  }
}
