import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AddTrailModal from '../components/AddTrailModal'
import { addTrail } from '../actions'

import GoogleMap from '../utils/google/map'
import GoogleMarker from '../utils/google/marker'
import GoogleSearchBox from '../utils/google/searchBox'

import styles from './css/Search.css'

const propTypes = {
  addTrail: PropTypes.func,
}

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
      markerPosition: null,
    }
  }

  componentDidMount() {
    // Initialize Google stuff
    const GMap = new GoogleMap(this.mapEl)
    const GMarker = new GoogleMarker(GMap.map)
    const GSearchBox = new GoogleSearchBox(this.searchEl)

    // Add desired listeners
    GMap.addListener('click', (e) => {
      GMarker.position = e.latLng
      this.setState({ markerPosition: GMarker.position })
    })
    GMarker.addListener('dragend', () => {
      this.setState({ markerPosition: GMarker.position })
    })
    GSearchBox.addListener('places_changed', () => {
      const position = GSearchBox.position
      GMarker.position = position
      GMap.center = position
      GMap.zoom = 12
      this.setState({ markerPosition: GMarker.position })
    })
  }

  openModal = () => {
    if (this.state.markerPosition) {
      this.setState({ isModalOpen: true })
    }
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  handleAddTrail = () => {
    this.props.addTrail(this.state.markerPosition)
  }

  render() {
    return (
      <div className={styles.main}>
        <header className={styles.header}>trail spotter</header>
        <div className={styles.mapSearchContainer}>
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
              markerLatLng={this.state.markerPosition}
              closeModal={this.closeModal}
              addTrail={this.handleAddTrail}
              placeTitle={this.searchEl.value || ''}
            />}
          <div style={{ height: '50px' }}>
            {JSON.stringify(this.state.markerPosition)}
          </div>
          <div className={styles.map} ref={(map) => { this.mapEl = map }}></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => ({})
const mapActionsToProps = {
  addTrail,
}

Search.propTypes = propTypes

export default connect(mapStateToProps, mapActionsToProps)(Search)
