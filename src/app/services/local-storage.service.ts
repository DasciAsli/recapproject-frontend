import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  add(key:string,value:any)
  {
    localStorage.setItem(key,value);
  }

  remove(key:string)
  {
    localStorage.removeItem(key)
  }
  
  getItem(key:string)
  {
    return localStorage.getItem(key);
  }
}

