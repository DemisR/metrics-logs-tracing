import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';

import {  throwError, Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { Car, GetCars } from '../model/car';
import { Model } from '../model/model';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  private CAR_URL = 'http://localhost:8080/api/car';
  private CARDETAILS_URL = 'http://localhost:8080/api/car-details';
  //  private CARDETAILS_URL = 'http://httpbin.org/post';

  constructor(private httpClient: HttpClient) { }

  // public sendGetRequest(){
  //   return this.httpClient.get(this.CAR_URL).pipe(catchError(this.handleError));
  // }

  public listCars(): Observable<Car[]> {
    return this.httpClient
      .get<GetCars>( this.CAR_URL + '?projection=expand' )
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

  // public getCarDetails(model) {
  //   return this.httpClient.post<Model>(this.CARDETAILS_URL, model);
  // }

  public getCarDetails(model): Observable<JSON> {
    return this.httpClient.post<JSON>(this.CARDETAILS_URL, model);
  }

}
