import { Component, OnInit } from '@angular/core';
import { Car } from '../model/car';
import { CarService } from '../service/car.service';
import { MatDialog } from '@angular/material/dialog';
import { CardetailsComponent } from './cardetails/cardetails.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cars = [];
  cardetails ;

  constructor(private carService: CarService, public dialog: MatDialog) { }

  ngOnInit() {

    this.getCarsList();

  }

  getCarsList(): void {
    this.carService
        .listCars()
        .subscribe(data => {
            this.cars = data;
            console.log('Data:', data);
        }, err => {});
  }

  getCarDetail(model): void {
    this.carService
        .getCarDetails(model)
        .subscribe(data => {
            this.cardetails = data;
            this.dialog.open(CardetailsComponent, {
              data: this.cardetails
            });
        }, err => {
          // throw new Error( err );
        });
  }


}
