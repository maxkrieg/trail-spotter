import React, { Component } from 'react';
import styles from '../css/components/Map.css'


class Map extends Component {
  constructor(props) {
    super(props)
    this.map = null
    this.initMap = initMap.bind(this)
    this.addMarker = addMarker.bind(this)
  }

  componentDidMount() {
    this.initMap()
  }

  render() {
    return (
      <div className={styles.main} ref={mapNode => { this.mapEl = mapNode; }}></div>
    )
  }
}


function initMap() {
  const everest = { lat: 27.9878, lng: 86.9250 };
  const mapOptions = {
    center: everest,
    zoom: 10,
    mapTypeId: 'terrain',
  }
  this.map = new google.maps.Map(this.mapEl, mapOptions);

  google.maps.event.addListener(this.map, 'click', (event) => {
    this.addMarker(event.latLng);
  });

  this.addMarker(everest);
}

function addMarker(position) {
  const map = this.map
  const marker = new google.maps.Marker({ position, map });
}

export default Map
