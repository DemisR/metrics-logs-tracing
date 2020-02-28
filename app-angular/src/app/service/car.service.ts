import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {  throwError, Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { Car, GetCars } from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private CAR_URL = 'http://localhost:8080/api/car';

  constructor(private httpClient: HttpClient) { }

  // handleError(error: HttpErrorResponse) {
  //   let errorMessage = 'Unknown error!';
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side errors
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Server-side errors
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }

  // public sendGetRequest(){
  //   return this.httpClient.get(this.CAR_URL).pipe(catchError(this.handleError));
  // }

  public listCars(): Observable<Car[]> {
    return this.httpClient
      .get<GetCars>( this.CAR_URL )
      .pipe(
        map(response => response._embedded.car)
      );
  }

  public deleteCar(car) {
    return this.httpClient.delete(this.CAR_URL + '/' + car.id);
  }

  public createUser(car) {
    return this.httpClient.post<Car>(this.CAR_URL, car);
  }

}
