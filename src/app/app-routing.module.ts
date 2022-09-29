import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path :"",pathMatch:"full",component:CarComponent},//Herhangi bir path verilmezse yani anasayfada CarComponent'i göster
  {path:"cars",component:CarComponent},
  {path:"customers",component:CustomerComponent},
  {path:"rentals",component:RentalComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
