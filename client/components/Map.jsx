import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import AddTrailModal from './AddTrailModal'
import { addTrail } from '../actions'
import styles from './css/Map.css'

import GoogleMap from '../utils/google/map'
import GoogleMarker from '../utils/google/marker'
import GoogleSearchBox from '../utils/google/searchBox'


class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null,
      marker: null,
      searchBox: null,
      isModalOpen: false,
    }
  }

  componentDidMount() {
    // Initialize Google stuff
    const googleMap = new GoogleMap(this.mapEl)
    const googleMarker = new GoogleMarker(googleMap.map)
    const googleSearchBox = new GoogleSearchBox(this.searchEl)

    // Add desired listeners
    googleMap.addListener('click', (e) => {
      googleMarker.position = e.latLng
    })
    googleMarker.addListener('position_changed', (e) => {
      console.log('position changed', googleMarker.position)
    })
    googleSearchBox.addListener('places_changed', (e) => {
      const position = googleSearchBox.position
      googleMarker.position = position
      googleMap.center = position
      googleMap.zoom = 12
    })

    this.setState({
      map: googleMap,
      marker: googleMarker,
      searchBox: googleSearchBox,
    })
  }

  openModal = () => {
    if (this.state.marker.position) {
      this.setState({ isModalOpen: true })
    }
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  handleAddTrail = () => {
    this.props.addTrail(this.state.marker.position)
  }

  render() {
    return (
      <div>
        <div>
          <input
            className={styles.input}
            ref={(search) => { this.searchEl = search }}
            type="text"
            placeholder="Find a trail"
          />
          <button onClick={this.openModal} className={styles.addTrailButton}>
            Add to my trails
          </button>
        </div>
        {this.state.isModalOpen &&
          <AddTrailModal
            markerLatLng={this.state.marker.position}
            closeModal={this.closeModal}
            addTrail={this.handleAddTrail}
            placeTitle={this.searchEl.value || ''}
          />}
        <div className={styles.map} ref={(map) => { this.mapEl = map }} />
      </div>
    )
  }
}

const mapStateToProps = () => ({})
const mapActionsToProps = {
  addTrail,
}

export default connect(mapStateToProps, mapActionsToProps)(Map)
