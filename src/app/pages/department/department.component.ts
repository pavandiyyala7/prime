import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { department } from '../../model/class/department';
import { MasterService } from '../../services/master.service';
import { APIResponseModel } from '../../model/interface/department';
import { ButtonModule } from 'primeng/button';

import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-department',
  standalone: true,
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
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent implements OnInit {
  message: string = '';
  isSuccess: boolean = false;
  isLoading: boolean = false;
  isLoader: boolean = true;
  showForm: boolean = false;
  departmentObj: department = new department();
  departmentList: department[] = [];
  filteredDepartmentsList: department[] = [];
  searchQuery: string = '';

  masterService = inject(MasterService);

  ngOnInit(): void {
    this.loadDepartment();
  }

  onReset() {
    this.departmentObj = new department();
  }

  onEdit(data: department) {
    this.departmentObj = { ...data };
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
      this.loadDepartment();
    }
  }

  loadDepartment() {
    this.isLoader = true;
    this.masterService.getDepartments().subscribe(
      (res: any) => {
        this.isLoader = false;
        if (res && Array.isArray(res)) {
          this.departmentList = res;
          this.filteredDepartmentsList = [...this.departmentList];
        } else {
          console.warn('Invalid department data:', res);
          this.filteredDepartmentsList = [];
        }
      },
      (error) => {
        this.isLoader = false;
        console.error('Error fetching departments:', error);
        this.filteredDepartmentsList = [];
      }
    );
  }

  onSaveDepartment() {
    this.masterService
      .addupdate(this.departmentObj)
      .subscribe((res: APIResponseModel) => {
        if (res != null) {
          this.departmentObj = new department();
          this.isLoader = false;
          this.loadDepartment();
          this.closeForm();
          alert('Department saved successfully!');
        } else {
          this.isLoader = false;
          alert('Something went wrong!');
        }
      });
  }

  onDelete(id: number) {
    const isDelete = confirm('Are you sure want to delete');
    if (isDelete) {
      this.masterService
        .deleteDepartmentsById(id)
        .subscribe((res: APIResponseModel) => {
          if (res) {
            this.isLoader = false;
            this.loadDepartment();
          } else {
            this.isLoader = false;
            console.error('Delete failed:', res);
          }
        });
    }
  }

  filterDepartments() {
    if (!this.searchQuery.trim()) {
      this.filteredDepartmentsList = [...this.departmentList];
    } else {
      this.filteredDepartmentsList = this.departmentList.filter((department) =>
        department.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
