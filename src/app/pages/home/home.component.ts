import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  activeTab: string = 'Dashboard'; 
  userEmail: string | null = '';
  userName: string | null = '';
  
  router = inject(Router);

  constructor() {
    this.userEmail = localStorage.getItem('userEmail');
    this.userName = localStorage.getItem('userName');
  }

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }

  logoff() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userEmail'); 
    localStorage.removeItem('userName');  
    this.router.navigateByUrl('login');
  }
}
