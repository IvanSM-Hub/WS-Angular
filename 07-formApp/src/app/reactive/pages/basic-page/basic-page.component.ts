import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    templateUrl: './basic-page.component.html',
    styles: ``,
})
export class BasicPageComponent {

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // })

  public myForm: FormGroup = this.formBuilder.group({
    name:[''],
    price:[0],
    inStorage:[0],
  });

  constructor ( private formBuilder: FormBuilder ) {}

  OnSave(): void {
    console.log(this.myForm.value)
  }

}
