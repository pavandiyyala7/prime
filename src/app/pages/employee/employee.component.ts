import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { displayEmployee, employee } from '../../model/class/employee';
import { MasterService } from '../../services/master.service';
import { APIResponseModel } from '../../model/interface/department';
import { company } from '../../model/class/company';
import { department } from '../../model/class/department';
import { Employee } from '../../model/interface/employee';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-employee',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    DialogModule,
    TextareaModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  isLoader: boolean = true;
  showForm: boolean = false;
  employeeObj: employee = new employee();
  employeesList: any[] = [];
  companiesList: any[] = [];
  departmentList: any[] = [];
  filteredEmployeesList: Employee[] = [];
  employeeTypes: string[] = ['Full-Time', 'Part-Time', 'Contract', 'Intern'];
  searchQuery: string = '';

  masterService = inject(MasterService);

  ngOnInit(): void {
    this.loadEmployee();
    this.loadDepartment();
    this.loadCompany();
  }

  onReset() {
    this.employeeObj = new employee();
  }

  onEdit(data: any) {
    this.employeeObj = { ...data };
    this.employeeObj.company_id = data.company ? data.company.id : null;
    this.employeeObj.department_id = data.department
      ? data.department.id
      : null;
    this.showForm = true;
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) this.onReset();
  }

  closeForm(event?: Event) {
    if (this.showForm) {
      this.showForm = false;
      this.onReset();
      this.loadEmployee();
    }
  }

  departmentName(id: number) {
    if (this.departmentList.length != 0) {
      for (let item of this.departmentList) {
        if (item.id === id) {
          return item.name;
        } else {
          continue;
        }
      }
    }
  }

  loadEmployee() {
    this.masterService.getEmployees().subscribe({
      next: (res: any) => {
        if (res && Array.isArray(res)) {
          this.employeesList = res;
          this.filteredEmployeesList = [...this.employeesList];
        } else {
          console.warn('Invalid employee data:', res);
          this.filteredEmployeesList = [];
        }
        this.isLoader = false;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
        this.isLoader = false;
        this.filteredEmployeesList = [];
      },
    });
  }

  loadCompany() {
    this.masterService.getCompanies().subscribe(
      (data: any) => {
        if (!data || !Array.isArray(data)) {
          console.error('Invalid company data:', data);
          return;
        }
        this.companiesList = data;
      },
      (error) => {
        console.error('Error fetching company data:', error);
      }
    );
  }

  loadDepartment() {
    this.masterService.getDepartments().subscribe(
      (data: any) => {
        if (!data || !Array.isArray(data)) {
          console.error('Invalid department data:', data);
          return;
        }
        this.departmentList = data;
      },
      (error) => {
        console.error('Error fetching department data:', error);
      }
    );
  }

  onSaveEmployee() {
    this.masterService.addUpDateEmployee(this.employeeObj).subscribe({
      next: (res: any) => {
        if (res) {
          this.employeeObj = new employee();
          this.loadEmployee();
          this.closeForm();
          alert('Employee created successfully!');
        } else {
          console.warn('Unexpected API response format:', res);
          alert('Something went wrong while creating employee.');
        }

        this.isLoader = false;
      },
      error: (error) => {
        console.error('Error saving employee:', error);
        this.isLoader = false;
        alert('Failed to create employee. Please try again.');
      },
    });
  }

  onDelete(id: number) {
    const isDelete = confirm('Are you sure want to delete?');
    if (isDelete) {
      this.masterService
        .deleteEmployeeById(id)
        .subscribe((res: APIResponseModel) => {
          if (res) {
            this.isLoader = false;
            this.loadEmployee();
          } else {
            this.isLoader = false;
            console.error('Delete failed:', res);
          }
        });
    }
  }

  filterEmployees() {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredEmployeesList = [...this.employeesList];
    } else {
      this.filteredEmployeesList = this.employeesList
        .filter(
          (employee) =>
            employee.first_name.toLowerCase().includes(query) ||
            employee.last_name.toLowerCase().includes(query)
        )
        .map((emp) => ({
          ...emp,
          company: emp.company || { id: 0, name: '' },
          department: emp.department || { id: 0, name: '' },
        }));
    }
  }
}
