import { inject, Injectable } from '@angular/core';
import { DirectionsClientApi } from '@api/directionsClient.api';
import { DirectionsResponse, Route } from '@interfaces/directions.interface';
import { Feature } from '@interfaces/places.interface';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private directionsApi = inject(DirectionsClientApi);

  private map: Map | undefined;
  private markers: Marker[] = [];

  get isMapReady() {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) throw Error('Map is not ready');

    this.map?.flyTo({
      zoom: 14,
      center: coords
    });

  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {

    if (!this.map) throw Error('Map is not ready');

    this.markers.forEach(marker => marker.remove());
    const newMarkers = [];

    for (const place of places) {
      const [lng, lat] = place.geometry.coordinates;
      const popup = new Popup()
        .setHTML(`
        <h6>${place.properties.name}</h6>
        <span>Estoy en la posición: ${place.geometry.coordinates}</span>
      `);

      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map);

      newMarkers.push(newMarker);
    }

    this.markers = newMarkers;

    if (places.length === 0) return;

    // Limites del mapa
    const bounce = new LngLatBounds();
    newMarkers.forEach(marker => bounce.extend(marker.getLngLat()));

    this.map.fitBounds(bounce);

  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe(resp => this.drawPolyline(resp.routes[0]));
  }

  private drawPolyline(route: Route) {

    console.log({ kms: route.distance / 1000, time: route.duration / 60 });

    if (!this.map) throw Error('Map is not ready');

    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();

    coords.forEach(([lng, lat]) => {
      bounds.extend([lng, lat]);
    });
    this.map?.fitBounds(bounds, {
      padding: 200
    })

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: coords
            },
            properties: null
          }
        ]
      }
    }

    // Limpiar ruta previa
    if (this.map.getLayer('RouteString')) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }

    this.map.addSource('RouteString', sourceData);
    this.map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    });
  }

}
