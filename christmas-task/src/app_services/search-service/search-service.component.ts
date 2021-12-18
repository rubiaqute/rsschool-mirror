import { Component, Injectable, Input, OnChanges } from '@angular/core';
import { ToysBoxComponent } from '../../app_views/toys-box/toys-box.component';
import { ToyCard } from '../../app_models/interfaces';
import { toys } from '../../app_mocks/toys';
@Component({
  selector: 'app-search-service',
  templateUrl: './search-service.component.html',
  styleUrls: ['./search-service.component.scss'],
})
export class SearchServiceComponent {
  toysToSearch: ToyCard[] = [];
  sortingOrder: string = '';
  constructor(private toys: ToysBoxComponent) {
    this.toysToSearch = toys.toysOnScreen;
  }

  search(input: string) {
    this.toysToSearch = this.toys.toysOnScreen;
    return this.toysToSearch.filter((el) => {
      if (el.name.toLowerCase().includes(input.toLowerCase())) return true;
      else return false;
    });
  }
}
