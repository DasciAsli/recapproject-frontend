import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCardInformation } from '../models/creditCardInformation';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardInformationService {
apiUrl="https://localhost:44362/api";

  constructor(private httpClient:HttpClient) { }

  creditCardInformationAdd(crediCardInformation:CreditCardInformation):Observable<SingleResponseModel<CreditCardInformation>>
  {
    let newPath=this.apiUrl + "/creditcardinformations/add";
    return this.httpClient.post<SingleResponseModel<CreditCardInformation>>(newPath,crediCardInformation);
  }
}
