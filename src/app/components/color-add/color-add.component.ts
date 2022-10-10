import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms'
import {Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';
//FormBuilder ,ReactiveForm'un servisi form oluştumayı sağlıyor

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm:FormGroup;


  constructor(
    private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastService:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm() //ColorAdd Formumuzu oluşturalım
  {
    this.colorAddForm=this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  colorAdd() //Veritabanımıza renk ekleme işlemi yapalım
  {
    if(this.colorAddForm.valid)
    {
      let colorModel=Object.assign({},this.colorAddForm.value);//colorModel için bir sınıf oluşturuyor ve formdaki alanların değerini alıp colorModel'e atıyor
       this.colorService.addColor(colorModel).subscribe(response=>
        {
          this.toastService.success(response.message,"Renk eklendi");
          this.router.navigate(["/colors"]);   
        },responseError=>{
          if(responseError.error.Errors.length>0)
          {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası");     
            }           
          }
        })     
    }
    else
    {
      this.toastService.error("Lütfen formu doğru bir şekilde doldurunuz");
    }  
  }

}
