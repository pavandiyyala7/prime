export interface IEmployee {
  id: number;
  company: any;
  department: any;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  phone: string;
  hire_date: string;
  salary: string;
  designation: string;
  employee_type: string;
  created_at: string;
  updated_at: string;
}
export interface Company {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  phone: string;
  designation: string;
  employee_type: string;
  salary: number;
  hire_date: string;
  company_id: number;
  department_id: number;
  company?: Company;  
  department?: Department; 
}
