export class employee {

       id: number;
       company_id: number;
       department_id: number;
       first_name: string;
       last_name: string;
       gender: string;
       email: string;
       phone: string;
       hire_date: Date;
       salary: string;
       designation: string;
       employee_type: string;
       created_at: string;
       updated_at: string;

    constructor() {
      this.id = 0,
      this.company_id= 0,
      this.department_id= 0,
      this.first_name= '',
      this.last_name= '',
      this.gender= '',
      this.email= '',
      this.phone= '',
      this.hire_date= new Date(),
      this.salary= '',
      this.designation= '',
      this.employee_type= '',
      this.created_at= '',
      this.updated_at= ''
    }
  
}



  
export class displayEmployee {

       id: number;
       company: any;
       department: any;
       first_name: string;
       last_name: string;
       gender: string;
       email: string;
       phone: string;
       hire_date: Date;
       salary: string;
       designation: string;
       employee_type: string;
       created_at: string;
       updated_at: string;

    constructor() {
      this.id = 0,
      this.company= '',
      this.department= '',
      this.first_name= '',
      this.last_name= '',
      this.gender= '',
      this.email= '',
      this.phone= '',
      this.hire_date= new Date(),
      this.salary= '',
      this.designation= '',
      this.employee_type= '',
      this.created_at= '',
      this.updated_at= ''
    }
  
}


  