import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarModel } from '../models/carModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:44362/api/";

  constructor(private httpClient:HttpClient) { }


  getCars():Observable<ListResponseModel<Car>>{ 
    let newPath=this.apiUrl+"cars/getcardetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{ 
    let newPath=this.apiUrl+"cars/getcardetailsbybrandid?brandId=" +brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{ 
    let newPath=this.apiUrl+"cars/getcardetailsbycolorid?colorId=" +colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  
  getCarByCarId(carId:number):Observable<SingleResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcardetailsbycarid?carId=" + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);  
  }

  addCar(carModel:CarModel):Observable<ResponseModel>{
    let newPath=this.apiUrl+"cars/add";
    return this.httpClient.post<ResponseModel>(newPath,carModel);
  }
}
