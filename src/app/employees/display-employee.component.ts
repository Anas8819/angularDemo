import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../Models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';

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
  private selectedEmployeeId: number;
  constructor(private _route: ActivatedRoute, private _router: Router) { }

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
}
