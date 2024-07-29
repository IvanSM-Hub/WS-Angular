import { PlacesService } from './../../services/places.service';
import { MapService } from '@services/index.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

  private mapService = inject(MapService);
  private placesService = inject(PlacesService);

  goToMyLocation(): void {
    if ( !this.placesService.isUserLocationReady ) throw Error('User location not found');
    if ( !this.mapService.isMapReady ) throw Error('Map is not ready');

    this.mapService.flyTo( this.placesService.userLocation! );
  }

}
