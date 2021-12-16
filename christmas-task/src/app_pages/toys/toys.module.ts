import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToysRoutingModule } from './toys-routing.module';
import { ToysComponent } from './toys.component';
import { FavouriteComponent } from '../../app_services/favourite/favourite.component';
import { ToysBoxComponent } from '../../app_views/toys-box/toys-box.component';
import { SortBarComponent } from '../../app_views/sort-bar/sort-bar.component';
import { FilterBarComponent } from '../../app_views/filter-bar/filter-bar.component';
import { FilterServiceComponent } from '../../app_services/filter-service/filter-service.component';
import { ToyCardsComponent } from '../../app_views/toy-cards/toy-cards.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SortingServiceComponent } from '../../app_services/sorting-service/sorting-service.component';


@NgModule({
  declarations: [
    ToysComponent,
    ToysBoxComponent,
    FavouriteComponent,
    SortBarComponent,
    FilterBarComponent,
    FilterServiceComponent,
    ToyCardsComponent,
    SortingServiceComponent,
  ],
  imports: [CommonModule, ToysRoutingModule, NgxSliderModule, FormsModule],
})
export class ToysModule {}
