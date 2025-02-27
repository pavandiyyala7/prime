import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { signup } from '../../model/class/signup';
import { MasterService } from '../../services/master.service';
import { APIResponseModel } from '../../model/interface/department';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  signupObj: signup = new signup();
  
  masterService = inject(MasterService);
  
  isLoader:boolean=false;

  onSignup(){
    this.isLoader = true;
    this.masterService.signupRequest(this.signupObj).subscribe((res:APIResponseModel)=>{
      if(res){
        this.isLoader = false;
        this.signupObj = new signup();
        console.log(res)
        alert('User created')
      }else{
        this.isLoader = false;
        alert('Something went wrong')
      }
    })
  }
}

