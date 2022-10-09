import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  items:string[]=["CarList","Brands","Colors","Customers","Rentals"];
  currentItem:string;

  constructor() { }

  ngOnInit(): void {
  }

  setCurrentItem(item:string)
  {
    this.currentItem=item;
  }

  getCurrentItem(item:string)
  {
    if(item==this.currentItem)
    {
      return "nav-link active";
    }
    else{
      return "nav-link";
    }
  }

}
