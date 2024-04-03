import { Component } from '@angular/core';
import { Observable, interval, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css'
})
export class UncommonPageComponent {

  //i18n Select
  public name: string = 'Iván';
  public gender: 'male'|'female' = 'male';
  public invitationMap = {
    male:'invitarlo',
    female:'invitarla',
  };

  public changeClient(): void {
    this.name = 'Melisa';
    this.gender = 'female';
  }

  //i18n Plural
  public clients: string[] = ['María','Pedro','Iván','Eduardo','Melissa','Natalia'];
  public clientsMap = {
    '=0':'no tenemos ningún cliente esperando.',
    '=1':'tenemos un cliente esperando.',
    '=2':'tenemos 2 clientes esperando.',
    'other':'tenemos # clientes esperando.',

  }

  public deleteClient(): void {
    this.clients.shift();
  }

  //KeyValue Pipe
  public person = {
    name: 'Iván',
    age: 28,
    address: 'Valencia, España'
  }

  //Async Pipe
  public myObservableTimer: Observable<number> = interval( 2000 );

  public promesValue: Promise<string> = new Promise( (resolve , reject) => {
    setTimeout( () => {
      resolve( 'Tenemos data en la promesa.' );
    }, 3500 )
  } );

}
