import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl="https://localhost:44362/api/auth/";

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>
  {
    let newpath=this.apiUrl + "login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newpath,loginModel);
  }

  isAuthenticated(){ //localStroge'de token varsa true yoksa false döndürür
    if(localStorage.getItem("token"))
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  
}
