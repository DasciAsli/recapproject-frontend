import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validator, Validators } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  colors:Color[];
  brands:Brand[];
  carAddForm:FormGroup;

  constructor(
    private colorService:ColorService,
    private brandService:BrandService,
    private carService:CarService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.createCarAddFrom();
    this.getColors();
    this.getBrands();
  }

  getColors()
  {
    this.colorService.getColors().subscribe(response=>
      {
        this.colors=response.data;
      })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>
      {
        this.brands=response.data;
      })
  }

  createCarAddFrom(){
    this.carAddForm= this.formBuilder.group({
      brandId:+["",Validators.required],
      colorId:+["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    });
  }

  addCar(){
    if(this.carAddForm.valid){
      let carModel=Object.assign({},this.carAddForm.value);
      this.carService.addCar(carModel).subscribe(response=>
        {
          this.toastrService.info(response.message,"Araba eklendi");
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
    else
    {
      this.toastrService.error("Lütfen formu doğru bir şekilde doldurunuz");
    }
  }

}
