import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localStorageService:LocalStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token=this.localStorageService.getItem("token");//localStorageden tokenı aldık
    let newRequest:HttpRequest<any>; //yeni bir request olusturduk
    newRequest=request.clone({
      headers:request.headers.set("Authorization","Bearer "+ token)
    });//var olan requesti klonla ama headers ekle.O headers da localStorageden aldıgımız tokenı icinde barındırsın.
    return next.handle(newRequest);
  }
  
}
