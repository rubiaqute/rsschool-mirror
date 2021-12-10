import { Component, OnInit, Input } from '@angular/core';
import { shapes, IShape } from '../toys';


@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
@Input() shapes: IShape[];
  constructor() {
    this.shapes = shapes;
   }

  ngOnInit(): void {
    console.log(this.shapes)
  }

}
