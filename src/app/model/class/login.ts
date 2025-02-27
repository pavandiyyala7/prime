export class login{
    username: string;
    password: string;

    constructor(){
        this.username = '';
        this.password = '';
    }
}

export interface User {
    id: number;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
  }
  
  export class LoginResponse {
    access: string;
    refresh: string;
    user: User;
  
    constructor() {
      this.access = '';
      this.refresh = '';
      this.user = { id: 0, username: '', email: '' }; 
    }
  }
  