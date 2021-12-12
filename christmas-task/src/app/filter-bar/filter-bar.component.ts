import { Component, Input, Output, EventEmitter } from '@angular/core';
import { shapes, IShape, ToyCard, colors, IColor } from '../toys';
import { FilterServiceComponent } from '../filter-service/filter-service.component';
enum Filter {
  colorFilter="colorFilter",
  shapeFilter = "shapeFilter"
}

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent {
@Input() shapes: IShape[];
@Input() colors: IColor[];
@Output() filterThis = new EventEmitter<ToyCard[]>();
  constructor(private filter: FilterServiceComponent) {
    this.shapes = shapes;
    this.colors=colors;
   }
  filterByShape(shape: IShape, e:Event) {
    const isChecked = (<HTMLInputElement>e.target).checked;
    const toys: ToyCard[] = this.filter.updateFilterObject(Filter.shapeFilter, shape);
    this.filterThis.emit(toys)
  }
  filterByColor(color: IColor, e:Event) {
    const isChecked = (<HTMLInputElement>e.target).checked;
    const toys: ToyCard[] = this.filter.updateFilterObject(Filter.colorFilter, color);
    this.filterThis.emit(toys)
  }

}
