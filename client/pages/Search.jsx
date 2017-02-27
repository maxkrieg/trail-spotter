import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AddTrailModal from '../components/AddTrailModal'
import { addTrail } from '../actions/trails'
import { openAddTrailModal, closeAddTrailModal } from '../actions/addTrailModal'
import GoogleMap from '../utils/google/map'
import GoogleMarker from '../utils/google/marker'
import GoogleSearchBox from '../utils/google/searchBox'
import GooglePolyline from '../utils/google/polyline'
import styles from './css/Search.css'

const propTypes = {
  addTrail: PropTypes.func,
  openAddTrailModal: PropTypes.func,
  closeAddTrailModal: PropTypes.func,
  modalState: PropTypes.object,
}

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    // const GPolyline = new GooglePolyline(GMap.map)
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
      this.props.openAddTrailModal()
    }
  }

  closeModal = () => {
    this.props.closeAddTrailModal()
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
        {this.props.modalState.isOpen &&
          <AddTrailModal
            markerLatLng={this.state.markerPosition}
            closeModal={this.closeModal}
            addTrail={this.props.addTrail}
            placeTitle={this.searchEl.value || ''}
            addTrailStatus={this.props.modalState.addTrailStatus}
          />}
        <div className={styles.map} ref={(map) => { this.mapEl = map }}></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  modalState: state.addTrailModal,
})

const mapActionsToProps = {
  addTrail,
  openAddTrailModal,
  closeAddTrailModal,
}

Search.propTypes = propTypes

export default connect(mapStateToProps, mapActionsToProps)(Search)
