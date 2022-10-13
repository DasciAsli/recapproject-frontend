import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token =localStorage.getItem("token");//localStorageden tokenı aldık
    let newRequest:HttpRequest<any>; //yeni bir request olusturduk
    newRequest=request.clone({
      headers:request.headers.set("Authorization","Bearer "+ token)
    });//var olan requesti klonla ama headers ekle.O headers da localStorageden aldıgımız tokenı icinde barındırsın.
    return next.handle(newRequest);
  }
}
