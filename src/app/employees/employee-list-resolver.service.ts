import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Employee } from '../Models/employee.model';
import { EmployeeService } from './employee.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ResolvedEmployeeList } from './resolved-employee-list.model';

@Injectable()

export class EmployeeListResolverService implements Resolve<ResolvedEmployeeList> {
    constructor(private _employeeService: EmployeeService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedEmployeeList> {
        return this._employeeService.getEmployees()
            .pipe(map(employeeList => new ResolvedEmployeeList(employeeList)),
                catchError((err: any) => of(new ResolvedEmployeeList(null, err)))
            );
    }
}
