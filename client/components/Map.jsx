import React, { Component } from 'react';
import styles from '../css/components/Map.css'


class Map extends Component {
  constructor(props) {
    super(props)
    this.map = null
    this.initMap = initMap.bind(this)
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
  }
  this.map = new google.maps.Map(this.mapEl, mapOptions);

  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(this.map, 'dblclick', (event) => {
    addMarker(event.latLng, this.map);
  });

  // Add a marker at the center of the map.
  addMarker(everest, this.map);
}

// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  const marker = new google.maps.Marker({
    position: location,
    map
  });
}

export default Map
