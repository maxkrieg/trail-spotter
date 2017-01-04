import React, { Component, PropTypes } from 'react'
import GoogleMap from '../utils/google/map'
import GoogleMarker from '../utils/google/marker'
import styles from './css/AddTrailModal.css'

const propTypes = {
  markerLatLng: PropTypes.object,
  closeModal: PropTypes.func,
  addTrail: PropTypes.func,
  placeTitle: PropTypes.string,
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
    const GMap = new GoogleMap(this.mapEl, {
      center: this.props.markerLatLng,
      zoom: 14,
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      streetViewControl: false,
    })
    const GMarker = new GoogleMarker(GMap.map)
    GMarker.position = this.props.markerLatLng
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value })
  }

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value })
  }

  handleSaveClick = () => {
    const data = {
      ...this.props.markerLatLng,
      ...{
        title: this.state.title,
        description: this.state.description,
      },
    }
    this.props.addTrail(data)
  }

  render() {
    return (
      <div className={styles.overlay} onClick={this.props.closeModal}>
        <div className={styles.modal} onClick={(e) => { e.stopPropagation() }}>

          <button className={styles.xButton} onClick={this.props.closeModal}>x</button>

          <h1 className={styles.title}>Add trail</h1>

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
          </div>

          <div className={styles.buttonContainer}>
            <button onClick={this.handleSaveClick} className={styles.submitButton}>Save</button>
            <button onClick={this.props.closeModal} className={styles.cancelButton}>Cancel</button>
          </div>

          <div>{`${this.props.addTrailStatus}`}</div>

        </div>
      </div>
    )
  }
}

AddTrailModal.propTypes = propTypes

export default AddTrailModal
