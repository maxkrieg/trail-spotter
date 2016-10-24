import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../css/components/Map.css'
import { setMap, setMarker } from '../actions/map'


class Map extends Component {
  constructor(props) {
    super(props)
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
    mapTypeId: 'terrain',
  }
  const map = new google.maps.Map(this.mapEl, mapOptions);
  // map.setCenter(new google.maps.LatLng(27.9878, 86.9250));

  this.props.setMap(map)

  google.maps.event.addListener(map, 'click', (event) => {
    console.log(event.latLng.lat(), event.latLng.lng())
    this.props.setMarker(event.latLng)
  })

  this.props.setMarker(everest);
}

const mapStateToProps = (state) => ({
  map: state.map
})

const mapActionsToProps = {
  setMap,
  setMarker
}
export default connect(mapStateToProps, mapActionsToProps)(Map)
