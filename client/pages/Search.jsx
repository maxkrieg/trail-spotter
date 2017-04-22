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

import { reverseGeocode } from '../utils/google/geocode'

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
      plottingEnabled: false,
    }
    this.gMap = null
    this.gSearch = null
    this.gPolyline = null
    this.gStartMarker = null
    this.gEndMarker = null
    this.gSearchMarker = null
  }

  componentDidMount() {
    this.initMap()
    this.initSearch()
  }

  initMap() {
    this.gMap = new GoogleMap(this.mapEl)
  }

  initSearch() {
    this.gSearch = new GoogleSearchBox(this.searchEl)
    this.gSearch.addListener('places_changed', () => {
      const position = this.gSearch.position
      this.gMap.center = position
      this.gMap.zoom = 10
      this.gSearchMarker = this.gSearchMarker || new GoogleMarker(this.gMap.map)
      this.gSearchMarker.position = position
    })
  }

  initMarkers() {
    this.gMap.addListener('click', (e) => {
      const position = e.latLng
      if (!this.gStartMarker) {
        this.gStartMarker = new GoogleMarker(this.gMap.map, { position })
      }
      if (this.gPolyline.path.length > 1) {
        if (!this.gEndMarker) {
          this.gEndMarker = new GoogleMarker(this.gMap.map, { position })
        } else {
          this.gEndMarker.position = position
        }
      }
    })
  }

  initPolyline() {
    this.gMap.addListener('click', (e) => {
      if (!this.gPolyline) {
        this.gPolyline = new GooglePolyline(this.gMap.map)
      }
      this.gPolyline.addPathPoint(e.latLng)
      if (this.gSearchMarker) {
        this.gSearchMarker.position = null
        this.gSearchMarker = null
      }
    })
  }

  openModal = () => {
    if (this.gPolyline && this.gPolyline.path) {
      this.props.openAddTrailModal()
    }
  }

  handlePlotToggleClick = () => {
    if (!this.state.plottingEnabled) {
      this.handleEnablePlotting()
    } else {
      this.handleDisablePlotting()
    }
  }

  handleEnablePlotting() {
    this.initPolyline()
    this.initMarkers()
    this.gMap.cursor = 'crosshair'
    this.setState({ plottingEnabled: true })
  }

  handleDisablePlotting() {
    this.gMap.clearListeners('click')
    this.gMap.cursor = null
    this.setState({ plottingEnabled: false })
  }

  handleClearPath = () => {
    if (this.gPolyline) {
      this.gPolyline.clearPath()
    }
    if (this.gStartMarker) {
      this.gStartMarker.position = null
      this.gStartMarker = null
    }
    if (this.gEndMarker) {
      this.gEndMarker.position = null
      this.gEndMarker = null
    }
  }

  handleUndo = () => {
    if (!this.gPolyline) return
    this.gPolyline.undo()
    const pathLength = this.gPolyline.path.length
    if (pathLength > 2) {
      const lastPathPoint = this.gPolyline.path[pathLength - 1]
      this.gEndMarker.position = lastPathPoint
    }
    if (pathLength === 0 && this.gStartMarker) {
      this.gStartMarker.position = null
      this.gStartMarker = null
    }
    if (pathLength < 2 && this.gEndMarker) {
      this.gEndMarker.position = null
      this.gEndMarker = null
    }
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
          <button onClick={this.handlePlotToggleClick}>
            {this.state.plottingEnabled ? 'Done' : 'Start plotting'}
          </button>
          {this.state.plottingEnabled &&
            <div style={{ display: 'inline-block' }}>
              <button onClick={this.handleUndo}>Undo</button>
              <button onClick={this.handleClearPath}>Clear</button>
            </div>}
        </div>
        {this.props.modalState.isOpen &&
          <AddTrailModal
            path={this.gPolyline.path}
            trailLength={this.gPolyline.pathMiles}
            closeModal={this.props.closeAddTrailModal}
            addTrail={this.props.addTrail}
            placeTitle={this.gPolyline.firstPointAddress || this.searchEl.value}
            trailHeadAddress={this.gPolyline.firstPointAddress}
            addTrailStatus={this.props.modalState.addTrailStatus}
          />}
        <div className={styles.map} ref={(map) => { this.mapEl = map }} />
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
