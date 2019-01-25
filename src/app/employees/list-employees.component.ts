import { Component, OnInit } from '@angular/core';
import { Employee } from '../Models/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ResolvedEmployeeList } from './resolved-employee-list.model';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  error: string;
  filteredEmployees: Employee[];
  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }
  constructor(private _router: Router, private _route: ActivatedRoute) {
    const resolvedData: Employee[] | string = this.employees = this._route.snapshot.data['employeeList'];
    if (Array.isArray(resolvedData)) {
      this.employees = resolvedData;
    } else {
      this.error = resolvedData;
    }
    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  ngOnInit() { }


  filterEmployees(searchString: string) {
    return this.employees.filter(employee => employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  onDeleteNotification(id: number) {
    const i = this.filteredEmployees.findIndex(t => t.id === id);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }
  }
}
