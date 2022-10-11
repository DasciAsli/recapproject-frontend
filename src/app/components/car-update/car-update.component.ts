import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarModel } from 'src/app/models/carModel';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm:FormGroup
  colors:Color[]
  brands:Brand[]
  car:Car
  carModel:CarModel

  constructor(
    private colorService:ColorService,
    private brandService:BrandService,
    private activatedRouter:ActivatedRoute,
    private carService:CarService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
    this.createCarUpdateForm();
    this.activatedRouter.params.subscribe((params)=>
    {
      this.getCarByCarId(params["carId"])
      this.getCarModelByCarId(params["carId"])
    })
  }

  createCarUpdateForm(){
    this.carUpdateForm= this.formBuilder.group({
      carId:[""],
      brandId:+["",Validators.required],
      colorId:+["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    });
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>
      {
        this.colors=response.data;
      });
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>
      {
        this.brands=response.data;
      })
  }

  getCarByCarId(carId:number)
  {
    this.carService.getCarByCarId(carId).subscribe(response=>
      {
        this.car=response.data
      })
  }

  getCarModelByCarId(carId:number)
  {
    this.carService.getCarModelByCarId(carId).subscribe(response=>
      {
        this.carModel=response.data
      })
  }

  updateCar(){
    if(this.carUpdateForm.valid)
    {
      let carModelx=Object.assign({},this.carUpdateForm.value);
      carModelx.carId=this.carModel.carId;
      this.carService.updateCar(carModelx).subscribe(response=>
        {
          this.toastrService.success(response.message,"Araba güncellendi");
          this.router.navigate(["/carlist"]);        
        },responseError=>{
          if(responseError.error.Errors.length>0)
          {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası");     
            }           
          }
        })
    }
    else{
      this.toastrService.error("Lütfen formu doğru bir şekilde doldurunuz");   
    }   
  }

 
}
