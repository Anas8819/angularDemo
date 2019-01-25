import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../Models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {

  @Input()
  displayEmployee: Employee;
  @Input()
  searchTerm: string;
  @Output()
  notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete = false;
  private selectedEmployeeId: number;
  constructor(private _employeeService: EmployeeService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');
  }

  viewEmployee() {
    this._router.navigate(['/employees', this.displayEmployee.id], {
      queryParams: { 'searchTerm': this.searchTerm }
    });
  }

  editEmployee() {
    this._router.navigate(['/edit', this.displayEmployee.id]);
  }

  deleteEmployee() {
    this._employeeService.deleteEmployee(this.displayEmployee.id).subscribe(
      () => console.log(`Employee with Id = ${this.displayEmployee.id} deleated`),
      (err) => console.log(err)
    );
    this.notifyDelete.emit(this.displayEmployee.id);
  }
}
