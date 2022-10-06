import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';//urlde belirttiğimiz carId değerini alabilmek için kullanıldı
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
isControl:boolean=false;

  constructor(
    private rentalService:RentalService,
    private activatedRoute:ActivatedRoute,
    private formBuilder : FormBuilder,
    private toastrService:ToastrService,
    private router:Router
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
      let dateModel = Object.assign({},this.dateForm.value);
      this.compareDates(this.rentals,dateModel);    
    }
    else
    {
      this.toastrService.error("The date is wrong");
    }

    this.successRoute();
    
  }

  successRoute(){
    if(this.isControl==true)
    {
      this.toastrService.success("Ödeme sayfasına yönlendiriliyorsunuz");
      this.router.navigate(["cars/card/:carId"])
    }
  }

  compareDates(array:any[],model:any){
    for(let x=0;x<array.length;x++)
    {       
      let rentDate:any=new DatePipe('en-US').transform(this.rentals[x].rentDate,'yyyy-MM-dd');
      let returnDate:any= new DatePipe('en-US').transform(this.rentals[x].returnDate,'yyyy-MM-dd');
        if
          (
            model.rentDate === rentDate ||
            model.rentDate === returnDate||

            model.returnDate === rentDate ||
            model.returnDate ===returnDate ||

            (model.rentDate>rentDate && model.rentDate<returnDate) ||
            (model.returnDate>rentDate && model.returnDate<returnDate)||

            (model.rentDate>returnDate && model.rentDate<rentDate)||
            (model.returnDate>returnDate && model.returnDate<rentDate)||
               
            (model.rentDate<rentDate && model.returnDate>rentDate) ||
             (model.rentDate<returnDate && model.returnDate>returnDate)||

             (model.rentDate>rentDate && model.returnDate<rentDate) ||
             (model.rentDate>returnDate && model.returnDate<returnDate)
          )
             {
              this.toastrService.error("The car is not available");
              this.isControl=false;
              break;             
             }
          else
          {
            this.isControl=true;
          }               
    } 
  }

}
