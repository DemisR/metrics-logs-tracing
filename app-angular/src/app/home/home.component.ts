import { Component, OnInit } from '@angular/core';
import { Car } from '../model/car';
import { CarService } from '../service/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cars = [];

  constructor(private carService: CarService) { }

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


}
