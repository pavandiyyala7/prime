import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { company } from '../../model/class/company';
import { MasterService } from '../../services/master.service';
import { APIResponseModel } from '../../model/interface/department';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// sample
@Component({
  selector: 'app-company',
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
  templateUrl: './company.component.html',
  styleUrl: './company.component.css',
})
export class CompanyComponent implements OnInit {
  message: string = '';
  isSuccess: boolean = false;
  isLoading: boolean = false;
  isLoader: boolean = true;
  showForm: boolean = false;
  companyObj: company = new company();
  companiesList: company[] = [];
  filteredCompaniesList: company[] = [];
  searchQuery: string = '';

  masterService = inject(MasterService);

  ngOnInit(): void {
    this.loadCompany();
  }

  onReset() {
    this.companyObj = new company();
  }

  onEdit(data: company) {
    this.companyObj = { ...data };
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
      this.loadCompany();
    }
  }

  loadCompany() {
    this.isLoader = true;
    this.masterService.getCompanies().subscribe(
      (res: any) => {
        this.isLoader = false;
        if (res && Array.isArray(res)) {
          this.companiesList = res;
          this.filteredCompaniesList = [...this.companiesList]; // ✅ Ensure filtering works properly
        } else {
          console.warn('Invalid company data:', res);
          this.filteredCompaniesList = [];
        }
      },
      (error) => {
        this.isLoader = false;
        console.error('Error fetching companies:', error);
        this.filteredCompaniesList = [];
      }
    );
  }

  onSaveCompany() {
    this.masterService
      .addUpDateCompany(this.companyObj)
      .subscribe((res: APIResponseModel) => {
        if (res != null) {
          this.companyObj = new company();
          this.isLoader = false;
          this.loadCompany();
          this.closeForm();
          alert('Company saved successfully!');
        } else {
          this.isLoader = false;
          alert('Something went wrong!');
        }
      });
  }

  onDelete(id: number) {
    const isDelete = confirm('Are you sure want to delete?');
    if (isDelete) {
      this.masterService
        .deleteCompanyById(id)
        .subscribe((res: APIResponseModel) => {
          if (res) {
            this.isLoader = false;
            this.loadCompany();
          } else {
            this.isLoader = false;
            console.error('Delete failed:', res);
          }
        });
    }
  }

  filterCompanies() {
    if (!this.searchQuery.trim()) {
      this.filteredCompaniesList = [...this.companiesList]; // ✅ Reset list correctly
    } else {
      this.filteredCompaniesList = this.companiesList.filter((company) =>
        company.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
