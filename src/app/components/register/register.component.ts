import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup

  constructor(
    private formbuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm()
  {
    this.registerForm=this.formbuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })

  }

  register()
  {
    if(this.registerForm.valid)
    {
      let registerModel=Object.assign({},this.registerForm.value);
      this.authService.register(registerModel).subscribe(response=>
        {
          console.log(response);
          this.toastrService.info(response.message);
          localStorage.setItem("token",response.data.token);
        },responseError=>
        {
          this.toastrService.error(responseError.error);
        })     
    }
    else
    {
      this.toastrService.error("Lütfen formu doğru bir şekilde doldurunuz")

    }
  }

}
