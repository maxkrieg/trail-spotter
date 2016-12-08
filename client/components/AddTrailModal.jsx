import React, { Component, PropTypes } from 'react'

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

          <div>Map goes here</div>

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
