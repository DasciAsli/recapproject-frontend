import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { CustomerComponent } from './components/customer/customer.component';
import { DateComponent } from './components/date/date.component';
import { LoginComponent } from './components/login/login.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path :"",pathMatch:"full",component:CarComponent},//Herhangi bir path verilmezse yani anasayfada CarComponent'i göster
  {path:"cars",component:CarComponent},
  {path:"carlist",component:CarListComponent},
  {path:"cars/add",component:CarAddComponent ,canActivate:[LoginGuard]},
  {path:"cars/update/:carId",component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"customers",component:CustomerComponent},
  {path:"rentals",component:RentalComponent},
  {path:"brands",component:BrandListComponent},
  {path:"brands/add",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"brands/update/:brandId",component:BrandUpdateComponent,canActivate:[LoginGuard]},
  {path:"colors",component:ColorListComponent},
  {path:"colors/add",component:ColorAddComponent ,canActivate:[LoginGuard]},
  {path:"colors/update/:colorId",component:ColorUpdateComponent,canActivate:[LoginGuard]},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/cardetail/:carId",component:CardetailComponent},
  {path:"cars/date/:carId",component:DateComponent,canActivate:[LoginGuard]},
  {path:"cars/card/:carId",component:CreditCardComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
