import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable, map,
} from 'rxjs';
import { EngineStatus } from 'src/models/car-data';
import {
  Winner, SortItem, SortOrder, Car, Engine, Success,
} from 'src/models/models';
import CarFactoryService from './car-factory.service';

@Injectable({
  providedIn: 'root',
})
export default class ServerService {
  server: string = 'http://127.0.0.1:3000';

  MAX_AMOUNT_OF_CARS_PER_PAGE = 7;

  MAX_AMOUNT_OF_WINNERS_PER_PAGE = 10;

  constructor(private http: HttpClient, private carService:CarFactoryService) {}

  getAmountOfCars(): Observable<number> {
    return this.http.get<Car[]>(`${this.server}/garage`, {}).pipe(
      map((responce) => responce.length),
    );
  }

  getAmountOfWinners(): Observable<number> {
    return this.http.get<Winner[]>(`${this.server}/winners`, {}).pipe(
      map((response) => response.length),
    );
  }

  getWinner(id:number): Observable<Winner> {
    return this.http.get<Winner>(`${this.server}/winners/${id}`);
  }

  updateWinner(winner:Winner, id: number):Observable<Winner> {
    return this.http.put<Winner>(`${this.server}/winners/${id}`, winner);
  }

  fetchWinnersOnScreen(page: number, sortItem:SortItem, sortOrder: SortOrder)
    : Observable<Winner[]> {
    let params = new HttpParams();
    params = params.append('_page', page);
    params = params.append('_limit', this.MAX_AMOUNT_OF_WINNERS_PER_PAGE);
    params = params.append('_sort', sortItem);
    params = params.append('_order', sortOrder);
    return this.http
      .get<Winner[]>(`${this.server}/winners`, {
      params,
    });
  }

  fetchCarsOnScreen(page: number): Observable<Car[]> {
    let params = new HttpParams();
    params = params.append('_page', page);
    params = params.append('_limit', this.MAX_AMOUNT_OF_CARS_PER_PAGE);
    return this.http
      .get<Car[]>(`${this.server}/garage`, {
      params,
    });
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.server}/garage`, car);
  }

  addWinner(winner: Winner): Observable<Winner> {
    return this.http.post<Winner>(`${this.server}/winners`, winner);
  }

  getCar(id:number):Observable<Car> {
    return this.http.get<Car>(`${this.server}/garage/${id}`);
  }

  updateCar(car:Car, id: number):Observable<Car> {
    return this.http.put<Car>(`${this.server}/garage/${id}`, car);
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.server}/garage/${id}`);
  }

  deleteWinner(id: number): Observable<void> {
    return this.http.delete<void>(`${this.server}/winners/${id}`);
  }

  switchEngine(id:number, status:EngineStatus):Observable<Engine> {
    let params = new HttpParams();
    params = params.append('id', id);
    params = params.append('status', status);
    return this.http.patch<Engine>(`${this.server}/engine`, { status }, { params });
  }

  switchEngineToDrive(id:number, status:EngineStatus):Observable<Success> {
    let params = new HttpParams();
    params = params.append('id', id);
    params = params.append('status', status);
    return this.http.patch<Success>(`${this.server}/engine`, { status }, { params });
  }
}
