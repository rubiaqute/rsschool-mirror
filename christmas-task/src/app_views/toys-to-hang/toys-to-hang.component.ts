import { Component, OnInit } from '@angular/core';
import { ToyCard } from 'src/app_models/interfaces';
import { DecorateServiceComponent } from 'src/app_services/decorate-service/decorate-service.component';

@Component({
  selector: 'app-toys-to-hang',
  templateUrl: './toys-to-hang.component.html',
  styleUrls: ['./toys-to-hang.component.scss'],
})
export class ToysToHangComponent implements OnInit {
  toysToHang: ToyCard[] = [];
  constructor(private decorateService:DecorateServiceComponent) {}

  ngOnInit(): void {
    this.toysToHang = this.decorateService.getToysToHang();
    console.log(this.toysToHang)
  }
  getCount(count:string):string{
return count.padStart(2,'0');
  }
  
}
