import { Component, inject } from '@angular/core';
import { PlacesService } from '@services/places.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  private placesService = inject( PlacesService );

  private debounceTimer: NodeJS.Timeout|undefined;

  constructor() { }

  onQueryChanged( query: string = '' ) {

    if ( this.debounceTimer ) clearTimeout( this.debounceTimer );

    this.debounceTimer = setTimeout( () => {
      console.log( 'Mandar query: '+query );
    }, 750 );

    this.placesService.getPlacesByQery( query );

  }

}
