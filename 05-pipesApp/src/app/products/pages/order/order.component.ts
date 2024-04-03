import { Component } from '@angular/core';
import { Color, Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'products-order',
  templateUrl: './order.component.html',
  styles: ``
})
export class OrderComponent {

  public isUpperCase: boolean = true;
  public orderBy?: keyof Hero|undefined|''|null;

  public heroes: Hero[] = [
    {
      name: 'superman',
      canFly: true,
      color: Color.blue
    },
    {
      name: 'batman',
      canFly: false,
      color: Color.black
    },
    {
      name: 'daredevil',
      canFly: false,
      color: Color.red
    },
    {
      name: 'robin',
      canFly: false,
      color: Color.red
    },
    {
      name: 'green lantern',
      canFly: true,
      color: Color.green
    },
  ];

  toggleUppercase(): void {
    this.isUpperCase = !this.isUpperCase;
  }

  changeOrder( value: keyof Hero ) {
    this.orderBy = value;
  }

}
