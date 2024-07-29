import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbnNtLWRldiIsImEiOiJjbHh1aXZsdWMxemVoMnBzaDJxbXMzMGw0In0.-Mdrtu3A-T5wpvSO1chtvw';

if (!navigator.geolocation) {
  alert('Geolocation not available');
  throw new Error('Geolocation not available');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
