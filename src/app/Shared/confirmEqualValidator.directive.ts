import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector:'[appConfirmEqualValidator]',
    providers:[{
        provide:NG_VALIDATORS,
        useExisting:ConfirmEqualValidatorDirective,
        multi:true
    }]
})

export class ConfirmEqualValidatorDirective implements Validator{
    appConfirmEqualValidator:string;
    validate(passswordGroup: AbstractControl):{[key:string]:any}|null{
        const passwordField = passswordGroup.get('passsword');
        const confirmPasswordField = passswordGroup.get('confirmPasssword');

        if(passwordField && confirmPasswordField && passwordField!=confirmPasswordField){
            return {'notEqual':true};
        }
        return null;
    }
}