import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../Models/department.component';
import { BsDatepickerConfig, DatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../Models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  previewPhoto = false;
  panelTitle: string;
  public datePickerConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  employee: Employee;
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ];
  constructor(private _route: ActivatedRoute, private _employeeService: EmployeeService, private _router: Router) {
    this.datePickerConfig.containerClass = 'theme-dark-blue';
    this.datePickerConfig.dateInputFormat = 'DD/MM/YYYY';
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: null,
        dateOfBirth: null,
        department: 'select',
        isActive: null,
        photoPath: null
      };
      this.panelTitle = 'Create Employee';
      this.createEmployeeForm.reset();
    } else {
      this.panelTitle = 'Edit Employee';
      this._employeeService.getEmployee(id).subscribe(employee => this.employee = employee,
        (err: any) => console.log(err)
      );
    }
  }

  saveEmployee(): void {
    if (this.employee.id == null) {
      this._employeeService.addEmployee(this.employee).subscribe((data: Employee) => {
        console.log(data);
        this.createEmployeeForm.reset();
        this._router.navigate(['list']);
      },
        (error: any) => console.log(error)
      );
    } else {
      this._employeeService.updateEmployee(this.employee).subscribe(() => {
        this.createEmployeeForm.reset();
        this._router.navigate(['list']);
      },
        (error: any) => console.log(error)
      );
    }
  }

  togglePhotoPreview(): void {
    this.previewPhoto = !this.previewPhoto;
  }
}
