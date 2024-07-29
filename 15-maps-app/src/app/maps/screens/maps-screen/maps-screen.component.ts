import { Component, inject } from '@angular/core';
import { PlacesService } from '@services/index.service';

@Component({
  selector: 'app-maps-screen',
  templateUrl: './maps-screen.component.html',
  styleUrl: './maps-screen.component.css'
})
export class MapsScreenComponent {

  private placesService = inject(PlacesService);

  get isUserLocationReady(): boolean {
    return this.placesService.isUserLocationReady;
  }

}
