import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { shapes, IShape, ToyCard } from '../toys';
import { FilterServiceComponent } from '../filter-service/filter-service.component';



@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
@Input() shapes: IShape[];
@Output() filterThis = new EventEmitter<ToyCard[]>();
  constructor(private filter: FilterServiceComponent) {
    this.shapes = shapes;
   }
  filterBy(shape:IShape) {
    const toys: ToyCard[] = this.filter.filterBy(shape);
    console.log(toys)
    this.filterThis.emit(toys)

  }

  ngOnInit(): void {
    console.log(this.shapes)
  }

}
