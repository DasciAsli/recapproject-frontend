import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';//urlde belirttiğimiz carId değerini alabilmek için kullanıldı
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
import {FormGroup,FormControl, FormBuilder, Validators} from "@angular/forms"; //Formdaki verileri alabilmek için kullanıldı
import { ToastrService } from 'ngx-toastr'; //Animasyon şeklinde uyarı mesajı vermek için kullanıldı
import {DatePipe} from '@angular/common'; //Tarih formatını değiştirmek için kullanıldı



@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})

export class DateComponent implements OnInit {
rentals:Rental[];
dateForm :FormGroup;

  constructor(
    private rentalService:RentalService,
    private activatedRoute:ActivatedRoute,
    private formBuilder : FormBuilder,
    private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.createAddDateForm();
    this.activatedRoute.params.subscribe((params)=>
    {
      this.getByCar(params["carId"]);
      this.dateForm.patchValue({
        carId : + params["carId"] 
      })
    })  
  }

  createAddDateForm(){
    this.dateForm = this.formBuilder.group({
      rentDate : ["",Validators.required],
      returnDate : ["", Validators.required],
      carId : []
    })
  }

  getByCar(carId:number){
    this.rentalService.getByCar(carId).subscribe(
      response =>
      {
        this.rentals=response.data;
      }
    );
  }

  controlDate(){
    if(this.dateForm.valid)
    {
      let dateModel = Object.assign({},this.dateForm.value)
      for(const x of this.rentals)
      {
        let rentDate:any=new DatePipe('en-US').transform(x.rentDate,'yyyy-MM-dd');
        let returnDate:any= new DatePipe('en-US').transform(x.returnDate,'yyyy-MM-dd');
          if
            (
              dateModel.rentDate === rentDate ||
              dateModel.rentDate === returnDate||
  
              dateModel.returnDate === rentDate ||
              dateModel.returnDate ===returnDate ||
  
              (dateModel.rentDate>rentDate && dateModel.rentDate<returnDate) ||
              (dateModel.returnDate>rentDate && dateModel.returnDate<returnDate)||
  
              (dateModel.rentDate>returnDate && dateModel.rentDate<rentDate)||
              (dateModel.returnDate>returnDate && dateModel.returnDate<rentDate)||
                 
              (dateModel.rentDate<rentDate && dateModel.returnDate>rentDate) ||
               (dateModel.rentDate<returnDate && dateModel.returnDate>returnDate)||
  
               (dateModel.rentDate>rentDate && dateModel.returnDate<rentDate) ||
               (dateModel.rentDate>returnDate && dateModel.returnDate<returnDate)
            )
               {
                this.toastrService.error("The car is not available");
                break;             
               }               
      } 
    }
     else
    {
      this.toastrService.error("The date is wrong");
    }

  }



}
