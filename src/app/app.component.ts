import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items:string[]=["Cars","Customers","Rentals"];
  currentItem:string;
  title = 'recapproject-frontend';

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
