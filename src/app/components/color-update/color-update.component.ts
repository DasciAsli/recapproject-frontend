import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  color:Color;
  colorUpdateForm:FormGroup

  constructor(
    private activatedRoute:ActivatedRoute,
    private colorService:ColorService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.createColorUpdateForm();
    this.activatedRoute.params.subscribe((params)=>
    {
      this.getColorByColorId(params["colorId"]);
    })
    
  }

  createColorUpdateForm(){
    this.colorUpdateForm= this.formBuilder.group({
      colorId:[""],
      colorName:["",Validators.required]
    })
  }

  getColorByColorId(colorId:number)
  {
    this.colorService.getColorByColorId(colorId).subscribe(response=>
      {
        this.color=response.data;
        console.log(this.color);
      })  
  }
 
  colorUpdate(){
    if(this.colorUpdateForm.valid)
    {
      let colorModel=Object.assign({},this.colorUpdateForm.value);
      colorModel.colorId=this.color.colorId;
      this.colorService.updateColor(colorModel).subscribe(response=>
        {
          this.toastrService.success(response.message,"Renk güncellendi");
          this.router.navigate(["/colors"]);        
        })
    }
    else{
      this.toastrService.error("Lütfen formu doğru bir şekilde doldurunuz");   
    }   
  }
 

}
