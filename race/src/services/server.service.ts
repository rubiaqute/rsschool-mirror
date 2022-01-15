import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, throwError } from 'rxjs';
import { map, catchError } from 'rxjs';
import { CarFactoryService } from './car-factory.service';
import { EngineStatus } from 'src/car-data';
import { Winner, SortItem, SortOrder, Car, Engine, Success } from 'src/models';


@Injectable({
  providedIn: 'root',
})
export class ServerService {
  server: string = 'http://127.0.0.1:3000';
  MAX_AMOUNT_OF_CARS_PER_PAGE = 7;
  MAX_AMOUNT_OF_WINNERS_PER_PAGE = 10;



  constructor(private http: HttpClient, private carService:CarFactoryService) {}
  getAmountOfCars(): Observable<number> {
    return this.http.get<Car[]>(`${this.server}/garage`, {}).pipe(
      map((responce) => responce.length),
      catchError((error) => {
        error.message =
          'The server is not working or Internet connection is disabled';
        return throwError(error.message);
      })
    );
  }
  getAmountOfWinners(): Observable<number> {
    return this.http.get<Winner[]>(`${this.server}/winners`, {}).pipe(
      map((response) => response.length),
    );
  }
  getWinner(id:number):  Observable<Winner>{
    return this.http.get<Winner>(`${this.server}/winners/${id}`);

  }
  updateWinner(winner:Winner, id: number):Observable<Winner> {
    return this.http.put<Winner>(`${this.server}/winners/${id}`, winner);
  }

  fetchWinnersOnScreen(page: number, sortItem:SortItem, sortOrder: SortOrder): Observable<Winner[]> {
    let params = new HttpParams();
    params = params.append('_page', page);
    params = params.append('_limit', this.MAX_AMOUNT_OF_WINNERS_PER_PAGE);
    params = params.append('_sort', sortItem);
    params = params.append('_order', sortOrder);
    return this.http
      .get<Winner[]>(`${this.server}/winners`, {
        params,
      })
  }
  fetchCarsOnScreen(page: number): Observable<Car[]> {
    let params = new HttpParams();
    params = params.append('_page', page);
    params = params.append('_limit', this.MAX_AMOUNT_OF_CARS_PER_PAGE);
    return this.http
      .get<Car[]>(`${this.server}/garage`, {
        params,
      })
      .pipe(
        catchError((error) => {
          error.message =
            'The server is not working or Internet connection is disabled';
          return throwError(error.message);
        })
      );
  }
  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.server}/garage`, car).pipe(
      catchError((error) => {
        error.message =
          'Something went wrong! Please check your Internet connection';
        return throwError(error.message);
      })
    );
  }
  addWinner(winner: Winner): Observable<Winner> {
    return this.http.post<Winner>(`${this.server}/winners`, winner);
  }

  getCar(id:number):Observable<Car> {
    return this.http.get<Car>(`${this.server}/garage/${id}`).pipe(
      catchError((error) => {
        error.message =
          'Something went wrong! Please check your Internet connection';
        return throwError(error.message);
      })
    );
  }

  updateCar(car:Car, id: number):Observable<Car> {
    return this.http.put<Car>(`${this.server}/garage/${id}`, car).pipe(
      catchError((error) => {
        error.message = "There's no such car!";
        return throwError(error.message);
      })
    )
  }
  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.server}/garage/${id}`).pipe(
      catchError((error) => {
        error.message = 'The car was not found!';
        return throwError(error.message);
      })
    );
  }
  deleteWinner(id: number): Observable<void> {
    return this.http.delete<void>(`${this.server}/winners/${id}`);
  }
  switchEngine(id:number, status:EngineStatus):Observable<Engine>{
    let params = new HttpParams();
    params = params.append('id', id);
    params = params.append('status', status);
    return this.http.patch<Engine>(`${this.server}/engine`, {'status':status}, {params,}).pipe(
      catchError((error) => {
        error.message = 'Oops';
        return throwError(error.message);
      })
    );
  }
  switchEngineToDrive(id:number, status:EngineStatus):Observable<Success>{
    let params = new HttpParams();
    params = params.append('id', id);
    params = params.append('status', status);
    return this.http.patch<Success>(`${this.server}/engine`, {'status':status}, {params,})
  }
}
