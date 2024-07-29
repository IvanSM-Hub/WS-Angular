import { inject, Injectable } from '@angular/core';
import { PlacesClientApi } from '@api/placesClient.api';
import { Feature, Place } from '@interfaces/places.interface';
import { MapService } from '@services/index.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private http = inject( PlacesClientApi );
  private mapService = inject( MapService );

  public userLocation: [number,number] | undefined;
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor() {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      if (typeof navigator !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            this.userLocation = [coords.longitude, coords.latitude];
            resolve(this.userLocation);
          },
          (err) => {
            alert('No se pudo obtener la localización del usuario.');
            console.log('Error getting user location', err.message);
            reject(err);
          }
        );
      } else {
        // Mock coordinates for non-browser environments
        console.log('Geolocation is not available, using mock coordinates');
        const mockLocation: [number, number] = [-122.4194, 37.7749]; // Example coordinates (San Francisco)
        resolve(mockLocation);
      }
    });
  }

  getPlacesByQery(query: string = '') {

    if ( query.length === 0 ) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if ( !this.userLocation ) throw Error('User location not found');

    this.isLoadingPlaces = true;

    return this.http.get<Place>(`/${ query }.json`, {
      params: {
        proximity: this.userLocation.join(','),
      }
    })
      .subscribe( resp => {
        console.log( resp.features );
        this.isLoadingPlaces = false;
        this.places = resp.features;

        this.mapService.createMarkersFromPlaces( this.places, this.userLocation! );
      } );

  }

  deletePlaces() {
    this.places = [];
  }

}
