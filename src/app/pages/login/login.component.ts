import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse, login } from '../../model/class/login';
import { MasterService } from '../../services/master.service';
import { APIAuthResponseModel } from '../../model/interface/department';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  
  loginObj: login = new login();
    
  masterService = inject(MasterService);
  router = inject(Router)
  isLoader:boolean=false;
  
  
  onLogin(){
    this.isLoader = true
    this.masterService.getLoginRequest(this.loginObj).subscribe({
      next: (res: LoginResponse) => {
        if (res && res.access) {
          this.isLoader = false;
          console.log('Login successful:', res);
  
          
          localStorage.setItem('accessToken', res.access);
          localStorage.setItem('refreshToken', res.refresh);
          localStorage.setItem('userEmail', res.user.email);
          localStorage.setItem('userName', res.user.username);
  
          
          this.router.navigateByUrl('/dashboard');
        } else {
          this.isLoader = false;
          alert('Invalid Credentials');
        }
      },
      error: (err) => {
        this.isLoader = false;
        console.error('Login failed:', err);
        alert('Login failed. Please check your credentials.');
      }
    });
  }
}
