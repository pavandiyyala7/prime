import { Component, OnInit, inject } from '@angular/core';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit {
  maleCount: number = 0;
  femaleCount: number = 0;
  totalEmployees: number = 0;
  permanentCount: number = 0;
  temporaryCount: number = 0;

  isLoader:boolean=true;

  masterService = inject(MasterService);

  
  
  ngOnInit(): void {
    this.loadEmployee()
  }

  loadEmployee(){
    this.masterService.getEmployees().subscribe(
      (employees) => {
        if (!employees || !Array.isArray(employees)) {
          console.error('Invalid employee data:', employees);
          return;
        }

        this.totalEmployees = employees.length;
        this.maleCount = employees.filter(emp => emp?.gender?.toLowerCase() === 'male').length;
        this.femaleCount = employees.filter(emp => emp?.gender?.toLowerCase() === 'female').length;
        this.permanentCount = employees.filter(emp => emp?.employee_type === 'Full-Time').length;
        this.temporaryCount = employees.filter(emp => emp?.employee_type === 'Part-Time' || emp?.employee_type === 'Temporary' || emp?.employee_type === 'Intern').length;
        this.isLoader=false;
      },
      error => {
        console.error('Error fetching employees:', error);
        this.isLoader=false;
      }
    );
  }
}
