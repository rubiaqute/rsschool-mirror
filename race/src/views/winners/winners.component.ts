import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  Results,
  SortItem,
  SortOrder,
  Winner,
  WinnerPageState,
  sorting,
  SortingData,
} from 'src/models';
import { ServerService } from 'src/services/server.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss'],
})
export class WinnersComponent implements OnInit {
  @Input() state!: WinnerPageState;
  @Output() onPageChange = new EventEmitter<number>();
  @Output() onSortChange = new EventEmitter<SortingData>();
  pageAmount = 1;
  winnersArray: Winner[] = [];
  totalAmountOfWinners: number = 0;
  sorting = sorting;

  constructor(private server: ServerService) {}

  ngOnInit(): void {
    this.getWinners();
  }
  addWinner(data: Results) {
    this.server.getWinner(data.id).subscribe(
      (response) => this.updateWinner(data),
      () => {
        console.log(
          'This error means that this is the first time this car wins. So it will be added to table!'
        );
        this.server
          .addWinner({
            id: data.id,
            wins: 1,
            time: +(data.time / 1000).toFixed(2),
          })
          .subscribe(
            (response) => {},
            (error) =>
              console.log('Something went wrong. Check connection to server')
          );
      }
    );
  }
  updateWinner(updatedData: Results) {
    let winnerForUpdate: Winner;
    this.server.getWinner(updatedData.id).subscribe((response) => {
      const newTime =
        +(updatedData.time / 1000).toFixed(2) < response.time
          ? +(updatedData.time / 1000).toFixed(2)
          : response.time;
      winnerForUpdate = {
        id: updatedData.id,
        wins: response.wins + 1,
        time: newTime,
      };
      this.server
        .updateWinner(winnerForUpdate, updatedData.id)
        .subscribe(() => {});
    });
  }
  getWinners() {
    this.server
      .fetchWinnersOnScreen(
        this.state.pageNumber,
        this.state.sortingBy,
        this.state.sortingOrder
      )
      .subscribe(
        (response) => {
          this.winnersArray = response;
          this.winnersArray.forEach((el) => {
            this.updateColor(el.id);
            this.updateName(el.id);
          });
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
    this.server.getAmountOfWinners().subscribe(
      (response) => {
        this.totalAmountOfWinners = response;
      },
      (error) => console.log(error.message)
    );
  }
  updatePageNumber() {
    this.server.getAmountOfWinners().subscribe((response) => {
      const newPageNumber = Math.ceil(
        response / this.server.MAX_AMOUNT_OF_WINNERS_PER_PAGE
      );
      this.pageAmount = newPageNumber;
      if (this.pageAmount < this.state.pageNumber) {
        this.onPageChange.emit(this.pageAmount);
        this.getWinners();
      }
    });
  }
  previousPage() {
    const page = this.state.pageNumber - 1;
    this.onPageChange.emit(page);
    this.getWinners();
  }
  nextPage() {
    const page = this.state.pageNumber + 1;
    this.onPageChange.emit(page);
    this.getWinners();
  }
  changeView(sortingData: SortingData) {
    this.onSortChange.emit(sortingData);
    this.getWinners();
  }
}
