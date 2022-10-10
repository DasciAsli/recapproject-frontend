import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brand:Brand;
  brandUpdateForm:FormGroup

  constructor(
    private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.createBrandUpdateForm();
    this.activatedRoute.params.subscribe((params)=>
    {
      this.getBrandByBrandId(params["brandId"]);
    })
    
  }

  createBrandUpdateForm(){
    this.brandUpdateForm= this.formBuilder.group({
      brandId:[""],
      brandName:["",Validators.required]
    })
  }

  getBrandByBrandId(brandId:number)
  {
    this.brandService.getBrandByBrandId(brandId).subscribe(response=>
      {
        this.brand=response.data;
      })  
  }
 
  brandUpdate(){
    if(this.brandUpdateForm.valid)
    {
      let brandModel=Object.assign({},this.brandUpdateForm.value);
      brandModel.brandId=this.brand.brandId;
      this.brandService.updateBrand(brandModel).subscribe(response=>
        {
          this.toastrService.success(response.message,"Marka güncellendi");
          this.router.navigate(["/brands"]);        
        })
    }
    else{
      this.toastrService.error("Lütfen formu doğru bir şekilde doldurunuz");   
    }   
  }

}
