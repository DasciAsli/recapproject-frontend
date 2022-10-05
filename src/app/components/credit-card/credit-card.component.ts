import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCardInformationService } from 'src/app/services/credit-card-information.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {
  crediCardInformationForm:FormGroup
  constructor(
    private crediCardInformationService:CreditCardInformationService,
    private formBuilder:FormBuilder,
    private toastrService :ToastrService
    ) { }

  ngOnInit(): void {
    this.createCrediCardInformationForm();
  }

  createCrediCardInformationForm(){
    this.crediCardInformationForm = this.formBuilder.group({
      firstName : ["",Validators.required],
      lastName : ["",Validators.required],
      cardNumber : ["",Validators.required],
      cvv : ["",Validators.required]
    })
  }

  creditCardInformationAdd(){
    if (this.crediCardInformationForm.valid)
    {
      let crediCardInformationModel = Object.assign({},this.crediCardInformationForm.value);
      console.log(crediCardInformationModel);
      this.crediCardInformationService.creditCardInformationAdd(crediCardInformationModel).subscribe(
        response=>{
          
          this.toastrService.info("Success");

        }
      )
      
    }
    else{
      this.toastrService.error("Please again enter the informations of your credit card");
    }
  }
  

}
