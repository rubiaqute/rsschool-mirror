import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ToyCard } from '../../app_models/interfaces';
import { ToysBoxComponent } from 'src/app_views/toys-box/toys-box.component';
import { StorageServiceComponent } from '../storage-service/storage-service.component';



@Component({
  selector: 'app-sorting-service',
  templateUrl: './sorting-service.component.html',
  styleUrls: ['./sorting-service.component.scss'],
})
export class SortingServiceComponent implements OnChanges{
  @Input() toysToSort:ToyCard[]=[];
  sortingOrder:string='';
  constructor(private toys: ToysBoxComponent, private storageService:StorageServiceComponent) {
    this.toysToSort = toys.toysOnScreen;
    this.sortingOrder= this.storageService.getObject('sortingOrder')
  }
  
  ngOnChanges(): void {
    this.toysToSort = this.toys.toysOnScreen;
    this.sortingOrder = this.storageService.getObject('sortingOrder')
    if (this.sortingOrder) this.toysToSort = this.sort(this.sortingOrder)
  }
  
  sort(sortCase:string):ToyCard[] {
    this.sortingOrder=sortCase;
    this.toysToSort = this.toys.toysOnScreen;
    switch (sortCase) {
    case "0" : return  this.toysToSort.sort((el1: ToyCard, el2: ToyCard): number => {
      return (el1.name < el2.name)? -1:1;
    });
    case "1" : return  this.toysToSort.sort((el1: ToyCard, el2: ToyCard): number => {
      return (el1.name < el2.name)? 1:-1;
    });
    case "2" : return  this.toysToSort.sort((el1: ToyCard, el2: ToyCard): number => {
      return  Number(el1.year) - Number(el2.year);
    });
    case "3" : return  this.toysToSort.sort((el1: ToyCard, el2: ToyCard): number => {
      return - Number(el1.year) + Number(el2.year);
    });
    default: return this.toysToSort;
    
    }
  }
}
