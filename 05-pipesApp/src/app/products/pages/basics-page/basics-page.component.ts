import { Component } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrl: './basics-page.component.css'
})
export class BasicsPageComponent {

  public nameUppercase: string = 'IVÁN';
  public nameLowercase: string = 'iván';
  public fullName: string = 'iVáN sARIó MAdRiGAl';

  public customDate: Date = new Date();

}
