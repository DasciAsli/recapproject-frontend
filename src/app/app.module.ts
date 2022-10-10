import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router';

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
import { DateComponent } from './components/date/date.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { NavComponent } from './components/nav/nav.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component'


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
    DateComponent,
    CreditCardComponent,
    BrandListComponent,
    ColorListComponent,
    ColorAddComponent,
    BrandAddComponent,
    CarListComponent,
    NavComponent,
    CarAddComponent,
    ColorUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
