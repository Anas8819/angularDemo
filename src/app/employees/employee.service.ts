import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee.model';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { delay } from 'rxjs/internal/operators';
import { ListEmployeesComponent } from './list-employees.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()

export class EmployeeService {

    constructor(private httpClient: HttpClient) { }
    private listEmployees: Employee[] = [
        {
            id: 1,
            name: 'Mark',
            gender: 'Male',
            contactPreference: 'Email',
            email: 'mark@mark.com',
            dateOfBirth: new Date('10/25/1988'),
            department: '2',
            isActive: true,
            photoPath: 'assets/images/male.png'
        },
        {
            id: 2,
            name: 'Mary',
            gender: 'Female',
            contactPreference: 'Phone',
            phoneNumber: 12345678,
            dateOfBirth: new Date('11/20/1979'),
            department: '3',
            isActive: true,
            photoPath: 'assets/images/female.png'
        },
        {
            id: 3,
            name: 'John',
            gender: 'Male',
            contactPreference: 'Phone',
            phoneNumber: 87654321,
            dateOfBirth: new Date('3/25/1976'),
            department: '1',
            isActive: true,
            photoPath: 'assets/images/male.png'
        }
    ];

    getEmployees(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>('http://localhost:3000/employees').pipe(catchError(this.handleError));
    }

    private handleError(errorResponce: HttpErrorResponse) {
        if (errorResponce.error instanceof ErrorEvent) {
            console.error('Client Side Error: ', errorResponce.error.message);
        } else {
            console.error('Server Side Error: ', errorResponce);
        }
        return throwError('There is a problem with the service. We are notified and working on it. Please try again later.');
    }
    getEmployee(id: number): Employee {
        return this.listEmployees.find(t => t.id === id);
    }

    save(employee: Employee) {
        if (employee.id === null) {
            const maxId = this.listEmployees.reduce(function (e1, e2) {
                return (e1.id > e2.id) ? e1 : e2;
            }).id;
            employee.id = maxId + 1;
            this.listEmployees.push(employee);
        } else {
            const foundIndex = this.listEmployees.findIndex(t => t.id === employee.id);
            this.listEmployees[foundIndex] = employee;
        }
    }

    deleteEmployee(id: number) {
        const i = this.listEmployees.findIndex(t => t.id === id);
        if (i !== -1) {
            this.listEmployees.splice(i, 1);
        }
    }
}
