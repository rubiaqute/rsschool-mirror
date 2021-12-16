import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { SortingServiceComponent } from 'src/app_services/sorting-service/sorting-service.component';
import { ToyCard } from 'src/app_models/interfaces';
import { StorageServiceComponent } from 'src/app_services/storage-service/storage-service.component';

@Component({
  selector: 'app-sort-bar',
  templateUrl: './sort-bar.component.html',
  styleUrls: ['./sort-bar.component.scss'],
  providers:[SortingServiceComponent]
})
export class SortBarComponent implements OnInit{
  @Output() sortThis = new EventEmitter<{toys:ToyCard[], sortingOrder:string}>();
  sortingBar:string='';
  constructor(private sortingService: SortingServiceComponent, private storageService: StorageServiceComponent) { 
  }
  ngOnInit(): void {
      if (this.storageService.getObject('sortingOrder')){
        this.sortingService.sort(this.storageService.getObject('sortingOrder'))
        this.sortingBar=this.storageService.getObject('sortingOrder');
        console.log(this.sortingBar);
      }
  }
  sortBy(value:string) {
    console.log(this.sortingBar)
    this.storageService.setObject('sortingOrder',value);
    const toys: ToyCard[] =  this.sortingService.sort(value);
    this.sortThis.emit({toys:toys, sortingOrder:this.sortingBar})
  }
  
}
