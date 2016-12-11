import React, { Component, PropTypes } from 'react'

import GoogleMap from '../utils/google/map'
import GoogleMarker from '../utils/google/marker'

import styles from './css/AddTrailModal.css'

const propTypes = {
  markerLatLng: PropTypes.object,
  closeModal: PropTypes.func,
  addTrail: PropTypes.func,
  placeTitle: PropTypes.string,
}

class AddTrailModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titleValue: props.placeTitle,
      descriptionValue: '',
    }
  }

  componentDidMount() {
    const GMap = new GoogleMap(this.mapEl, {
      center: this.props.markerLatLng,
      zoom: 13,
      draggable: false,
      zoomControl: false,
      streetViewControl: false,
    })
    const GMarker = new GoogleMarker(GMap.map)
    GMarker.position = this.props.markerLatLng
  }

  handleTitleChange = (e) => {
    this.setState({
      titleValue: e.target.value,
    })
  }

  handleDescriptionChange = (e) => {
    this.setState({
      descriptionValue: e.target.value,
    })
  }

  handleClearClick = () => {
    this.setState({
      titleValue: '',
      descriptionValue: '',
    })
  }

  render() {
    const { lat, lng } = this.props.markerLatLng

    return (
      <div className={styles.main} onClick={this.props.closeModal}>
        <div className={styles.content} onClick={(e) => { e.stopPropagation() }}>

          <button className={styles.xButton} onClick={this.props.closeModal}>x</button>

          <h1 className={styles.title}>Add trail</h1>

          <div className={styles.form}>
            <input
              type="text"
              placeholder="Title..."
              className={styles.titleInput}
              onChange={this.handleTitleChange}
              value={this.state.titleValue}
            />

            <textarea
              placeholder="Description..."
              className={styles.descriptionInput}
              value={this.state.descriptionValue}
              onChange={this.handleDescriptionChange}
            />
          </div>

          <div>
            <output>LAT: {lat}</output>
            <output>LONG: {lng}</output>
          </div>

          <div ref={(map) => { this.mapEl = map }} style={{ height: '200px', width: '100%' }}></div>

          <div className={styles.buttonContainer}>
            <button onClick={this.props.addTrail} className={styles.submitButton}>Save</button>
            <button onClick={this.props.closeModal} className={styles.cancelButton}>Cancel</button>
          </div>

        </div>
      </div>
    )
  }
}

AddTrailModal.propTypes = propTypes

export default AddTrailModal
