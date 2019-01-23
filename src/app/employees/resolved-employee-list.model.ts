import { Employee } from '../Models/employee.model';

export class ResolvedEmployeeList {
    constructor(public employeeList: Employee[], public error: any = null) { }
}
