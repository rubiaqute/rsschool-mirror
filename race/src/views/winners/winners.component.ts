import { Component, OnInit } from '@angular/core';
import { SortItem, SortOrder, Winner } from 'src/models';
import { ServerService } from 'src/services/server.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss'],
})
export class WinnersComponent implements OnInit {
  pageNumber = 1;
  pageAmount = 1;
  sortingBy = SortItem.byId;
  sortingOrder = SortOrder.AtoZ;
  winnersArray: Winner[] = [];
  totalAmountOfWinners:number=0;
  constructor(private server: ServerService) {}

  ngOnInit(): void {
    this.getWinners();
  }
  getWinners() {
    this.server
      .fetchWinnersOnScreen(this.pageNumber, this.sortingBy, this.sortingOrder)
      .subscribe(
        (response) => {
          this.winnersArray = response;
          this.winnersArray.forEach((el) => {
            this.updateColor(el.id);
            this.updateName(el.id);
          });
          console.log(this.winnersArray);
        },
        (error) => console.log(error.message)
      );
      this.getTotalAmountOfWinners();
      this.updatePageNumber();
  }
  updateColor(id: number) {
    this.server
      .getCar(id)
      .subscribe(
        (response) =>
          (this.winnersArray.find((el) => el.id == id)!.color = response.color)
      );
  }
  updateName(id: number) {
    this.server
      .getCar(id)
      .subscribe(
        (response) =>
          (this.winnersArray.find((el) => el.id == id)!.name = response.name)
      );
  }
  getTotalAmountOfWinners() {
    this.server.getAmountOfWinners().subscribe((response) => {
      this.totalAmountOfWinners = response;
    }, (error)=> console.log(error.message));
  }
  updatePageNumber() {
    this.server.getAmountOfWinners().subscribe((response) => {
      const newPageNumber = Math.ceil(
        response / this.server.MAX_AMOUNT_OF_WINNERS_PER_PAGE
      );
      this.pageAmount = newPageNumber;
    });
  }
  previousPage(){
    this.pageNumber +=1;
    this.getWinners();
  }
  nextPage(){
    this.pageNumber -=1;
    this.getWinners();
  }
}
