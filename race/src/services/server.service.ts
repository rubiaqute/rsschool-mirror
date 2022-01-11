import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Car } from './car-factory.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
server: string ='http://127.0.0.1:3000';

  constructor(private http: HttpClient) { }

  fetchCars() : Observable<Car[]> {
      // let params = new HttpParams();
      // params = params.append('_limit', 4);
      // params = params.append('custom', 'anything');
      return this.http
        .get<Car[]>(`${this.server}/garage`, {
          // params,
          // params: new HttpParams().set('_limit', 3)
        })
        .pipe(
          catchError((error) => {
            error.message = 'The server is not working or connection to Intenet is disabled';
            console.log(error.message);
            return throwError(error);
          })
        );

  }
  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(
      `${this.server}/garage`,
      car,
    );
  }
}
