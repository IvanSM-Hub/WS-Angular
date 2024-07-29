import { Component, inject } from '@angular/core';
import { Feature } from '@interfaces/places.interface';
import { MapService } from '@services/index.service';
import { PlacesService } from '@services/places.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {

  public selectedId: string = '';

  private placesService = inject( PlacesService );
  private mapService = inject( MapService );

  get isloadedPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  flyTo( place: Feature ): void {

    this.selectedId = place.id;

    const [ lng, lat ] = place.geometry.coordinates;

    this.mapService.flyTo( { lng, lat } );

  }

  getDirections(place: Feature) {

    if ( !this.placesService.userLocation ) throw Error('User location not found');

    this.placesService.deletePlaces();

    const start = this.placesService.userLocation;
    const end = place.geometry.coordinates as [number, number];

    this.mapService.getRouteBetweenPoints(start, end);

  }

}
