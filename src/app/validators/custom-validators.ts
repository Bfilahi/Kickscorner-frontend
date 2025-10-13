import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators{

    static minSelectedCheckbox(min = 1){
        const validator: ValidationErrors | null = (formArray: FormArray) => {
            const totalSelected = formArray.controls
            .map(control => control.value)
            .reduce((prev, next) => next ? prev + next : prev, 0);

            return totalSelected >= min ? null : {required: true};
        };
        return validator;
    }


    static noWhiteSpaces(): ValidatorFn{
        return (control: AbstractControl): ValidationErrors | null => {
            return control.value != null && control.value.trim().length > 0 ? null : {noWhiteSpaces: true};
        };
    }

    static passwordsMatch(controlName: string, matchingControlName: string): ValidatorFn{
        return (group: AbstractControl): ValidationErrors | null => {
            const control = group.get(controlName);
            const matchingControl = group.get(matchingControlName);

            if(!control || !matchingControl)
            return {controlNotFound: true};

            return control.value === matchingControl.value ? null : {noMatch: true};
        }
    }
}