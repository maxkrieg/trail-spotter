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
      trailHeadAddress: null,
    }
    this.gMap = null
    this.gSearch = null
    this.gPolyline = null
    this.gStartMarker = null
    this.gEndMarker = null
  }

  componentDidMount() {
    this.initMap()
    this.initSearch()
  }

  initMap() {
    this.gMap = new GoogleMap(this.mapEl)
  }

  initSearch() {
    if (!this.gMap) return
    this.gSearch = new GoogleSearchBox(this.searchEl)
    this.gSearch.addListener('places_changed', () => {
      const position = this.gSearch.position
      this.gMap.center = position
      this.gMap.zoom = 10
    })
  }

  initMarkers() {
    if (!this.gMap) return
    this.gStartMarker = this.gStartMarker || new GoogleMarker(this.gMap.map)
    this.gEndMarker = this.gEndMarker || new GoogleMarker(this.gMap.map)
    this.gMap.addListener('click', (e) => {
      const path = this.gPolyline.path
      if (path.length === 1) {
        this.gStartMarker.position = e.latLng
      }
      if (path.length > 1) {
        this.gEndMarker.position = e.latLng
      }
    })
  }

  initPolyline() {
    if (!this.gMap) return
    this.gPolyline = this.gPolyline || new GooglePolyline(this.gMap.map)
    this.gMap.addListener('click', (e) => {
      this.gPolyline.addPathPoint(e.latLng)
      if (this.gPolyline.path.length === 1) {
        reverseGeocode(e.latLng.toJSON(), (address) => {
          this.setState({ trailHeadAddress: address })
        })
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
    }
    if (this.gEndMarker) {
      this.gEndMarker.position = null
    }
  }

  handleUndo = () => {
    if (!this.gPolyline) return
    this.gPolyline.undo()
    const pathLength = this.gPolyline.path.length
    if (pathLength === 0) {
      this.gStartMarker.position = null
    }
    if (pathLength < 2 && this.gEndMarker.position) {
      this.gEndMarker.position = null
    } else {
      const lastPathPoint = this.gPolyline.path[pathLength - 1]
      this.gEndMarker.position = lastPathPoint
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
            placeTitle={this.searchEl.value || ''}
            addTrailStatus={this.props.modalState.addTrailStatus}
          />}
        <div>{this.state.trailHeadAddress}</div>
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
