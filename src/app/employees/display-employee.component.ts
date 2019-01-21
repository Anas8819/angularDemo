import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../Models/employee.model';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {

  @Input()
  displayEmployee: Employee;
  constructor() { }

  ngOnInit() {
  }

}
