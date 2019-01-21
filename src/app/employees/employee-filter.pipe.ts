import { PipeTransform, Pipe } from '@angular/core';
import { Employee } from '../Models/employee.model';

@Pipe({
    name: 'employeeFilter'
})
export class EmployeeFilterPipe implements PipeTransform {
    transform(employees: Employee[], searchTerm: string): Employee[] {
        if (!employees || !searchTerm) {
            return employees;
        }
        return employees.filter(employee => employee.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }

}
