import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';

import { SelectRequiredValidatorDirective } from './Shared/selectRequiredValidator.directive';
import { ConfirmEqualValidatorDirective } from './Shared/confirmEqualValidator.directive';

import { EmployeeService } from './employees/employee.service';
import { DisplayEmployeeComponent } from './employees/display-employee.component';
import { CreateEmployeeCanDeactivateGuardService } from './employees/CreateEmployeeCanDeactivateGuardService';

const appRoutes: Routes = [
  { path: 'list', component: ListEmployeesComponent },
  { path: 'create', component: CreateEmployeeComponent, canDeactivate: [CreateEmployeeCanDeactivateGuardService] },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [EmployeeService,CreateEmployeeCanDeactivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
