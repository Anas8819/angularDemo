import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee.model';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { delay } from 'rxjs/internal/operators';
import { ListEmployeesComponent } from './list-employees.component';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()

export class EmployeeService {

    constructor(private httpClient: HttpClient) { }

    baseURL = 'http://localhost:3000/employees';
    getEmployees(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(this.baseURL).pipe(catchError(this.handleError));
    }

    private handleError(errorResponce: HttpErrorResponse) {
        if (errorResponce.error instanceof ErrorEvent) {
            console.error('Client Side Error: ', errorResponce.error.message);
        } else {
            console.error('Server Side Error: ', errorResponce);
        }
        return throwError('There is a problem with the service. We are notified and working on it. Please try again later.');
    }
    getEmployee(id: number): Observable<Employee> {
        return this.httpClient.get<Employee>(`${this.baseURL}/${id}`).pipe(catchError(this.handleError));
    }

    addEmployee(employee: Employee): Observable<Employee> {
        return this.httpClient.post<Employee>(this.baseURL, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    updateEmployee(employee: Employee): Observable<void> {
        return this.httpClient.put<void>(`${this.baseURL}/${employee.id}`, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    deleteEmployee(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseURL}/${id}`).pipe(catchError(this.handleError));
    }
}
