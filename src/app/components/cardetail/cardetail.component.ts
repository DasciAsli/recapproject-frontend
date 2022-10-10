import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { identity } from 'rxjs';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carimage';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {
  car:Car;
  carImages:CarImage[];

  constructor(
    private carService:CarService,
    private carImageService:CarimageService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>
    {
      this.getCarByCarId(params["carId"]);
      this.getImagesByCarId(params["carId"]);
    })  
  }
  

  getCarByCarId(carId:number){
    this.carService.getCarByCarId(carId).subscribe
    (
      response=>
       {
        this.car = response.data;
       }
    );
  }

  getImagesByCarId(carId:number)
  {
    this.carImageService.getImagesByCarId(carId).subscribe
    (
      response=>
      {
        this.carImages=response.data;
      }
    );
  }

  
}
