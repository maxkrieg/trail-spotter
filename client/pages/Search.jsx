import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AddTrailModal from '../components/AddTrailModal'
import { addTrail } from '../actions/trails'
import { openAddTrailModal, closeAddTrailModal } from '../actions/addTrailModal'
import GoogleMap from '../utils/google/map'
import GoogleMarker from '../utils/google/marker'
import GoogleSearchBox from '../utils/google/searchBox'

import styles from './css/Search.css'

const propTypes = {
  addTrail: PropTypes.func,
  openAddTrailModal: PropTypes.func,
  closeAddTrailModal: PropTypes.func,
  isModalOpen: PropTypes.bool,
}

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // isModalOpen: false,
      markerPosition: null,
    }
  }

  componentDidMount() {
    this.initGoogle()
  }

  initGoogle() {
    const GMap = new GoogleMap(this.mapEl)
    const GMarker = new GoogleMarker(GMap.map, {
      draggable: true,
      clickable: true,
    })
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
      // this.setState({ isModalOpen: true })
      this.props.openAddTrailModal()
    }
  }

  closeModal = () => {
    // this.setState({ isModalOpen: false })
    this.props.closeAddTrailModal()
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
          {this.props.isModalOpen &&
            <AddTrailModal
              markerLatLng={this.state.markerPosition}
              closeModal={this.closeModal}
              addTrail={this.props.addTrail}
              placeTitle={this.searchEl.value || ''}
            />}
          <div className={styles.map} ref={(map) => { this.mapEl = map }}></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isModalOpen: state.addTrailModal.isOpen,
})

const mapActionsToProps = {
  addTrail,
  openAddTrailModal,
  closeAddTrailModal,
}

Search.propTypes = propTypes

export default connect(mapStateToProps, mapActionsToProps)(Search)
