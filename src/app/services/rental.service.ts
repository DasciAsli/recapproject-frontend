import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:44362/api/rentals";

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>
  {
    let newPath=this.apiUrl + "/getrentaldetails"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getByCar(carId:number):Observable<ListResponseModel<Rental>>
  {
    let newPath=this.apiUrl + "/getrentalsbycarid?carId="+ carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }


}
