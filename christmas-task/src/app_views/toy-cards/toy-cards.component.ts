import { Component, OnInit } from '@angular/core';
import { ToysBoxComponent } from '../toys-box/toys-box.component';

import { ToyCard } from '../../app_models/interfaces';
import { ChoosedServiceComponent } from '../../app_services/choosed-service/choosed-service.component';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-toy-cards',
  templateUrl: './toy-cards.component.html',
  styleUrls: ['./toy-cards.component.scss'],
  animations: [
    trigger('enterLeave', [
      transition('void => *', [
        style({ opacity: 0.2, transform: 'translateY(-200%)' }),
        animate('500ms ease-in'),
      ]),
      transition('* => void', [
        animate(
          '500ms ease-in',
          style({ opacity: 0.2, transform: 'scale(0)' })
        ),
      ]),
    ]),
  ],
})
export class ToyCardsComponent implements OnInit {
  toys: ToyCard[] = [];
  constructor(
    private toysOnScreen: ToysBoxComponent,
    private choosedService: ChoosedServiceComponent
  ) {
    this.toys = this.updateToys();
  }
  ngOnInit(): void {
    this.toys = this.updateToys();
  }
  updateToys() {
    this.toys = this.toysOnScreen.returnToys();
    return this.toys;
  }
  changeStylesIfChosen(toy: ToyCard) {
    return this.choosedService.isChosen(toy);
  }
  addToFavourite(toy: ToyCard): void {
    this.choosedService.addToFavourites(toy);
  }

  isFavourite(favouriteValue: boolean): string {
    if (favouriteValue === false) return 'нет';
    else return 'да';
  }
}
