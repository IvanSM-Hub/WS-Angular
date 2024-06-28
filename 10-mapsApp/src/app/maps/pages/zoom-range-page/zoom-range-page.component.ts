import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {LngLat, Map} from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css',
  host: { 'attr': 'zoom-range-page' }
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap?: ElementRef;
  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat( -0.162136, 38.946213 );
  public lng: number = this.currentLngLat.lng;
  public lat: number = this.currentLngLat.lat;

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      if ( !this.divMap ) throw 'El Elemento HTML no fué encontrado';
      this.map = new Map({
        container: this.divMap.nativeElement, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: this.currentLngLat, // starting position [lng, lat]
        zoom: this.zoom, // starting zoom
      });
      this.mapListeners();
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if( !this.map ) throw 'Mapa no inicializado';
    this.map.on('zoom', () => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', () => {
      if( this.map!.getZoom() < 18 ) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
      this.lng = this.currentLngLat.lng;
      this.lat = this.currentLngLat.lat;
    })

  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChange( value: string ) {
    this.zoom = Number(value);
    this.map?.zoomTo( this.zoom );
  }

}
