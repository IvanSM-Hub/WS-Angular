import { AfterViewInit, Component, inject, ViewChild, ElementRef } from '@angular/core';
import { MapService, PlacesService } from '@services/index.service';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  private placesService = inject(PlacesService);
  private mapService = inject(MapService);

  ngAfterViewInit(): void {

    if (!this.placesService.userLocation) throw new Error('User location not found');

    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    const popup = new Popup()
      .setHTML(`
        <h6>Usted está aquí</h6>
        <span>Estoy en la posición: ${this.placesService.userLocation}</span>
      `);
    new Marker({ color: 'red' })
        .setLngLat(this.placesService.userLocation)
        .setPopup(popup)
        .addTo(map);

    this.mapService.setMap(map);

  }

}
