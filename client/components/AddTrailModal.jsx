import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import GoogleMap from '../utils/google/map'
import GooglePolyline from '../utils/google/polyline'
import GoogleMarker from '../utils/google/marker'
import styles from './css/AddTrailModal.css'

const propTypes = {
  path: PropTypes.array,
  trailLength: PropTypes.number,
  closeModal: PropTypes.func,
  addTrail: PropTypes.func,
  placeTitle: PropTypes.string,
  trailHeadAddress: PropTypes.string,
  addTrailStatus: PropTypes.any,
}

class AddTrailModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.placeTitle,
      description: '',
    }
  }

  componentDidMount() {
    this.initMap()
    this.initPolyline()
    this.initMarkers()
  }

  initMap() {
    const config = {
      center: this.props.path[Math.round((this.props.path.length - 1) / 2)],
      zoom: 14,
    }
    this.gMap = new GoogleMap(this.mapEl, config)
  }

  initPolyline() {
    if (this.gMap) {
      const config = {
        path: this.props.path,
        editable: false,
      }
      this.gPolyline = new GooglePolyline(this.gMap.map, config)
    }
  }

  initMarkers() {
    if (this.gMap) {
      const start = {
        position: this.props.path[0],
      }
      const end = {
        position: this.props.path[this.props.path.length - 1],
      }
      this.gStartMarker = new GoogleMarker(this.gMap.map, start)
      this.gEndMarker = new GoogleMarker(this.gMap.map, end)
    }
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value })
  }

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value })
  }

  handleSaveClick = () => {
    this.props.addTrail({
      path: this.props.path,
      length: this.props.trailLength,
      title: this.state.title,
      description: this.state.description,
      trail_head_address: this.props.trailHeadAddress,
    })
  }

  renderStatusContent() {
    switch (this.props.addTrailStatus) {
      case 'success':
        return (
          <div>
            <h3>Success!</h3>
            <div>
              <Link to="/all-trails">Go to all trails</Link>
              <button onClick={this.props.closeModal}>Close</button>
            </div>
          </div>
        )
      case 'error':
        return <div>Error</div>
      default:
        return null
    }
  }

  render() {
    return (
      <div className={styles.overlay} onClick={this.props.closeModal}>
        <div className={styles.modal} onClick={(e) => { e.stopPropagation() }}>

          <button className={styles.xButton} onClick={this.props.closeModal}>x</button>

          <h1 className={styles.title}>Add trail</h1>
          <output>{this.props.trailLength}</output>
          {this.props.addTrailStatus ? this.renderStatusContent() :
            <div>
              <div className={styles.mapWrapper}>
                <div className={styles.map} ref={(map) => { this.mapEl = map }} />
              </div>
              <div className={styles.form}>
                <input
                  type="text"
                  placeholder="Title..."
                  className={styles.titleInput}
                  onChange={this.handleTitleChange}
                  value={this.state.title}
                />
                <textarea
                  placeholder="Description..."
                  className={styles.descriptionInput}
                  value={this.state.description}
                  onChange={this.handleDescriptionChange}
                />
              </div>
              <div className={styles.buttonContainer}>
                <button onClick={this.handleSaveClick} className={styles.submitButton}>Save</button>
                <button onClick={this.props.closeModal} className={styles.cancelButton}>Cancel</button>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

AddTrailModal.propTypes = propTypes

export default AddTrailModal
