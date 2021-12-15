import { Component, Output, EventEmitter } from '@angular/core';
import { SortingServiceComponent } from 'src/app_services/sorting-service/sorting-service.component';
import { ToyCard } from 'src/app_models/interfaces';

@Component({
  selector: 'app-sort-bar',
  templateUrl: './sort-bar.component.html',
  styleUrls: ['./sort-bar.component.scss'],
  providers:[SortingServiceComponent]
})
export class SortBarComponent {
  @Output() sortThis = new EventEmitter<{toys:ToyCard[], sortingOrder:string}>();
  sortingBar:string='';
  constructor(private sortingSevice: SortingServiceComponent) { 
  }
  
  sortBy(value:string) {
    console.log(this.sortingBar)
    const toys: ToyCard[] =  this.sortingSevice.sort(value);
    this.sortThis.emit({toys:toys, sortingOrder:this.sortingBar})
  }
  
}
