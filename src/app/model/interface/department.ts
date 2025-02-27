export interface IDepartment{
    id : number,
    name: string,
    description: string,
}

export interface APIResponseModel{
    message:string,
    result: boolean,
    data: any
}

interface User {
    id: number;
    username: string;
    email: string;
    date_joined: string;
  }
  
export interface APIAuthResponseModel  {
    refresh: string;
    access: string;
    user: User;
}