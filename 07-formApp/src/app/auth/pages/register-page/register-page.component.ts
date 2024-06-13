import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
    templateUrl: './register-page.component.html',

})
export class RegisterPageComponent {

  public myForm: FormGroup = this.formBuilder.group({
    name: ['',[ Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern) ]],
    email: ['',[ Validators.required, Validators.pattern(this.validatorsService.emailPattern)  ], [ this.emailValidatorService ] ],
    username: ['',[ Validators.required, this.validatorsService.cantBeStrider ]],
    password: ['',[ Validators.required, Validators.minLength(6) ]],
    password2: ['',[ Validators.required ]],

  }, {
    validators: [
      this.validatorsService.isFieldEqualFildTwo('password','password2')
    ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidatorService: EmailValidatorService
  ) { }

  isValidField(field: string) {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}
