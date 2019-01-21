import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Employee } from '../Models/employee.model';
import { EmployeeService } from './employee.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()

export class EmployeeListResolverService implements Resolve<Employee[]> {
    constructor(private _employeeService: EmployeeService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[]> {
        return this._employeeService.getEmployees();
    }
}
