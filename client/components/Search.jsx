import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../css/components/Search.css'
import { setSearchBox } from '../actions/search'

class Search extends Component {
  constructor(props) {
    super(props)
    this.initSearchBox = initSearchBox.bind(this)
  }

  componentDidMount() {
    this.initSearchBox()
    this.inputEl.focus()
  }

  render() {
    return (
      <div>
        <input
          className={styles.input}
          ref={inputNode => { this.inputEl = inputNode; }}
          type='text'
          placeholder='Find a trail'>
        </input>
      </div>
    )
  }
}

function initSearchBox() {
  const bounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(44.913693, -67.579621),
    new google.maps.LatLng(32.655332, -117.549211),
    new google.maps.LatLng(47.985760, -124.842826),
    new google.maps.LatLng(25.506170, -80.518336)
  );

  const searchBox = new google.maps.places.SearchBox(this.inputEl, { bounds });
  this.props.setSearchBox(searchBox)
}

const mapStateToProps = (state) => ({
  searchBox: state.searchBox
})

const mapActionsToProps = {
  setSearchBox
}

export default connect(mapStateToProps, mapActionsToProps)(Search)
