import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { FilterPipeForBrandPipe } from './pipes/filter-pipe-for-brand.pipe';
import { FilterPipeForColorPipe } from './pipes/filter-pipe-for-color.pipe';
import { RentCarComponent } from './components/rent-car/rent-car.component';
import { DateComponent } from './components/date/date.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';


@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    CardetailComponent,
    FilterPipeForBrandPipe,
    FilterPipeForColorPipe,
    RentCarComponent,
    DateComponent,
    CreditCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
