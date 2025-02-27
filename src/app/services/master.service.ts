import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { department } from '../model/class/department';
import { APIResponseModel } from '../model/interface/department';
import { environment } from '../../environments/environment.development';
import { company } from '../model/class/company';
import { employee } from '../model/class/employee';
import { LoginResponse, login } from '../model/class/login';
import { signup } from '../model/class/signup';


@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) {  }

  getLoginRequest(obj:login): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(environment.API_URL + 'login/',obj)
  }

  signupRequest(obj:signup): Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>(environment.API_URL + 'register/',obj)
  }

  getDepartments(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(environment.API_URL + 'department/')
  }
  addupdate(obj:department): Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>(environment.API_URL + 'department/',obj)
  }
  deleteDepartmentsById(id:number): Observable<APIResponseModel>{
    return this.http.delete<APIResponseModel>(environment.API_URL +'department/' +id)
  }

  getCompanies(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(environment.API_URL + 'company/')
  }
  addUpDateCompany(obj:company): Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>(environment.API_URL + 'company/',obj)
  }
  deleteCompanyById(id:number): Observable<APIResponseModel>{
    return this.http.delete<APIResponseModel>(environment.API_URL +'company/' +id)
  }
  getEmployees(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(environment.API_URL + 'employee/')
  }
  addUpDateEmployee(obj:employee): Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>(environment.API_URL + 'employee/',obj)
  }
  deleteEmployeeById(id:number): Observable<APIResponseModel>{
    return this.http.delete<APIResponseModel>(environment.API_URL +'employee/' +id)
  }
}
