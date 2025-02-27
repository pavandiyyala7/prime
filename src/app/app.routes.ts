import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DepartmentComponent } from './pages/department/department.component';
import { CompanyComponent } from './pages/company/company.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [authGuard],
        children:[
            {
                path: 'dashboard',
                component: DashboardComponent,
                title: 'Dashboard'
            },
            {
                path: 'employee',
                component: EmployeeComponent,
                title: 'Employee'
            },
            {
                path: 'departments',
                component: DepartmentComponent,
                title: 'department'
            },
            {
                path: 'companies',
                component: CompanyComponent,
                title: 'company'
            }
        ]
    }
      
];
