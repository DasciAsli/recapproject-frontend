import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="https://localhost:44362/api/brands"

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath=this.apiUrl + "/getall";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  addBrand(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl +"/add";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  getBrandByBrandId(brandId:number):Observable<SingleResponseModel<Brand>>{
    let newPath = this.apiUrl + "/getbyid?id=" + brandId;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }

  updateBrand(brand:Brand):Observable<ResponseModel>{
    let newPath=this.apiUrl + "/update";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
}
