import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandAddForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private brandService:BrandService,
    private toastrService:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm(){
    this.brandAddForm= this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }

  brandAdd()
  {
    if(this.brandAddForm.valid)
    {
      let brandModel=Object.assign({},this.brandAddForm.value);
      console.log(brandModel);
      this.brandService.addBrand(brandModel).subscribe(response=>
        {
          this.toastrService.info(response.message,"Marka eklendi");
          this.router.navigate(["/brands"]);
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
