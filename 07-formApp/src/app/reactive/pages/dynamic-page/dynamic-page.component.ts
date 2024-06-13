import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [ Validators.required , Validators.minLength(3) ]],
    favoriteGames: this.formBuilder.array([
      [ 'Metal Gear', Validators.required ],
      [ 'Death Stranding', Validators.required ],
    ]),
  });

  public newFavorite: FormControl = new FormControl('',[Validators.required]);

  constructor (
    private formBuilder: FormBuilder,
  ) {}

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  isValidFieldInArray( formArray: FormArray, index: number ): boolean | null {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }

  getFieldError(field: string): string | null {

    if (!this.myForm.controls[field]) return null;

    console.log(field)

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {

      console.log(key)

      switch (key) {
        case 'required':
          return 'Este campo es requerido.';
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } carácteres.`;
      }
    }
    return null;
  }

  onAddToFavorites(  ): void {
    if ( this.newFavorite.invalid ) return;
    const newGame = this.newFavorite.value;
    this.favoriteGames.push(
      this.formBuilder.control( newGame, Validators.required )
    );
    this.newFavorite.reset();
  }

  onDeleteFavorite( index: number ) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(  ): void {

    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log( this.myForm.value );
    (this.myForm.controls['favoriteGames'] as FormArray) = this.formBuilder.array([]);
    this.myForm.reset();

  }

}
