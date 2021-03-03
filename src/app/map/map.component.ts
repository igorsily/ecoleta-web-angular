import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {icon, Map as MapLeaflet, Marker} from 'leaflet';


const iconRetinaUrl = '../../../../../assets/marker/marker-icon-2x.png';
const iconUrl = '../../../../../assets/marker/marker-icon.png';
const shadowUrl = '../../../../../assets/marker/marker-shadow.png';


const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {


  public map: MapLeaflet;
  marker;

  constructor() {
  }


  ngAfterViewInit(): void {

    this.initMap();
  }

  initMap(): void {

    navigator.geolocation.getCurrentPosition((position) => {
      const {latitude, longitude} = position.coords;


      this.map = new L.Map('map', {
        center: [latitude, longitude],
        zoom: 16
      });

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

      tiles.addTo(this.map);

      const map = this.map;

      this.map.on('click', (event => this.addMarker(event)));
    });
  }

  addMarker(e): void {

    if (this.marker !== undefined) {
      this.map.removeLayer(this.marker);
    }

    const {lat, lng} = e.latlng;

    this.marker = new L.Marker([lat, lng]).addTo(this.map);

  }


}
