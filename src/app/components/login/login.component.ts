import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;

  constructor(
    private formbuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    private localStorageService:LocalStorageService
    ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formbuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login()
  {
    if(this.loginForm.valid)
    {
      let loginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>
        {
          console.log(response);
          this.toastrService.info(response.message);
          this.localStorageService.add("token",response.data.token);
        },responseError=>
        {
          this.toastrService.error(responseError.error); 
          if(responseError.error=="Kullanıcı bulunamadı")
          {
            this.toastrService.info("Kayıt olmak için yönlendiriliyorsunuz");
            this.router.navigate(["register"]);         
          }
               
        })
    }
    else
    {
      this.toastrService.error("Lütfen formu doğru bir şekilde doldurunuz");
    }
  }

}
