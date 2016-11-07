import React, { Component, PropTypes } from 'react'
import AddTrailModal from './AddTrailModal'
import styles from './css/Map.css'


class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      map: null,
      marker: null,
      searchBox: null,
      isModalOpen: false
    }
  }

  componentDidMount() {
    this.initSearchBox()
    this.initMap()
    this.inputEl.focus()
  }

  initSearchBox = () => {
    const bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(44.913693, -67.579621),
      new google.maps.LatLng(32.655332, -117.549211),
      new google.maps.LatLng(47.985760, -124.842826),
      new google.maps.LatLng(25.506170, -80.518336)
    );

    const searchBox = new google.maps.places.SearchBox(this.inputEl, { bounds })

    searchBox.addListener('places_changed', () => {
      this.handleSearchBoxChange()
    })

    this.setState({ searchBox })
  }

  initMap = () => {
    const everest = { lat: 27.9878, lng: 86.9250 };
    const map = new google.maps.Map(this.mapEl, {
      center: everest,
      zoom: 10,
      mapTypeId: 'terrain'
    })

    google.maps.event.addListener(map, 'click', (event) => {
      this.handleMapClick(event)
    })

    this.setState({ map })
  }

  handleSearchBoxChange = () => {
    const places = this.state.searchBox.getPlaces()
    if (places.length === 0) return

    const place = places[0]
    const position = place.geometry.location

    this.setMarker(position)
    this.setMapCenter(position)
    this.setMapZoom(12)
  }

  handleMapClick = (event) => {
    this.setMarker(event.latLng)
  }

  setMarker = (position) => {
    if (this.state.marker) {
      this.state.marker.setMap(null)
    }

    const marker = new google.maps.Marker({
      map: this.state.map,
      position,
      draggable: true,
      clickable: true
    })

    google.maps.event.addListener(marker, 'dragend', (event) => {
      this.handleMapClick(event)
    })

    this.setState({ marker })
  }

  setMapCenter = (position) => {
    this.state.map.setCenter(position)
  }

  setMapZoom = (zoom) => {
    this.state.map.setZoom(zoom)
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  openModal = () => {
    this.setState({ isModalOpen: true })
  }

  getMarkerLatLng() {
    const { marker } = this.state
    return marker && marker.getPosition().toJSON()
  }

  render() {
    const markerLatLng = this.getMarkerLatLng()
    return (
      <div>
        <input
          className={styles.input}
          ref={inputNode => { this.inputEl = inputNode; }}
          type='text'
          placeholder='Find a trail'>
        </input>
        <button onClick={this.openModal}>Add to my trails</button>
        {this.state.isModalOpen && <AddTrailModal markerLatLng={markerLatLng} closeModal={this.closeModal}/>}
        <div className={styles.map} ref={mapNode => { this.mapEl = mapNode; }}></div>
      </div>
    )
  }
}

export default Map
