import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-loader',
  standalone: true,
  imports: [],
  template: `
  <h1>Hola app-user-loader</h1>
  `
})
export class UsersLoaderComponent implements OnInit {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
