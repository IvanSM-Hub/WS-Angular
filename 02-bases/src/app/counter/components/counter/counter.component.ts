import { Component } from "@angular/core";


@Component({
  selector: 'app-counter',
  template: `

  <h1>Hola counter</h1>

  <h3>counter: {{ counter }}</h3>

  <button (click)="increaseBy(1)">+1</button>
  <button (click)="resetBy()">Reset</button>
  <button (click)="decreaseBy(1)">-1</button>

  `
})
export class CounterComponent {

  public counter: number = 10;

  increaseBy(value: number): void {
    this.counter+=value
  }

  decreaseBy(value: number): void {
    this.counter-=value
  }

  resetBy(): void {
    this.counter=10;
  }

}
