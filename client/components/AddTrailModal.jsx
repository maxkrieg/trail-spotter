import React, { Component, PropTypes } from 'react'

import styles from './css/AddTrailModal.css'

const propTypes = {
  markerLatLng: PropTypes.object,
  closeModal: PropTypes.func
}

class AddTrailModal extends Component {
  render() {
    return (
      <div className={styles.main} onClick={this.props.closeModal}>
        <div className={styles.content} onClick={(e) => {e.stopPropagation()}}>
          <h1>Add trail</h1>
          <input
            type='text'
            placeholder='Title...'
          >
          </input>
          <textarea
            placeholder='Description...'
          >
          </textarea>
          <div>{this.props.markerLatLng}</div>
          <div>Map goes here</div>
          <button>Save</button>
        </div>
      </div>
    )
  }
}

AddTrailModal.propTypes = propTypes

export default AddTrailModal
