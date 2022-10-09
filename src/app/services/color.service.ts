import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl="https://localhost:44362/api/colors";
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath=this.apiUrl + "/getall";
   return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  addColor(color:Color):Observable<SingleResponseModel<Color>>{
    let newPath=this.apiUrl + "/add";
    return this.httpClient.post<SingleResponseModel<Color>>(newPath,color);
  }
}
