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
      plottingEnabled: false,
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
    if (this.gMap) {
      this.gSearch = new GoogleSearchBox(this.searchEl)
      this.gSearch.addListener('places_changed', () => {
        const position = this.gSearch.position
        this.gMap.center = position
        this.gMap.zoom = 10
      })
    }
  }

  initMarkers() {
    if (this.gMap) {
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
  }

  initPolyline() {
    if (this.gMap) {
      this.gPolyline = this.gPolyline || new GooglePolyline(this.gMap.map)
      this.gMap.addListener('click', (e) => {
        this.gPolyline.addPathPoint(e.latLng)
      })
    }
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
    this.setState({ plottingEnabled: true })
  }

  handleDisablePlotting() {
    this.gMap.clearListeners('click')
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
    if (this.gPolyline) {
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
            path={this.gPolyline && this.gPolyline.path}
            closeModal={this.props.closeAddTrailModal}
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
