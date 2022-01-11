import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Car } from './car-factory.service';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  server: string = 'http://127.0.0.1:3000';
  MAX_AMOUNT_OF_CARS_PER_PAGE = 7;

  constructor(private http: HttpClient) {}
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
  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.server}/garage/${id}`).pipe(
      catchError((error) => {
        error.message = 'The car was not found!';
        return throwError(error.message);
      })
    );
  }
}
