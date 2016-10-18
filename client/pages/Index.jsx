import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestKittens } from '../actions/kittens';
import styles from '../css/pages/Index.css'

class Index extends Component {
  constructor(props) {
    super(props)
    this.map = null
    this.initMap = initMap.bind(this)
  }

  componentDidMount() {
    this.initMap()
  }

  render() {
    return (
      <div className={styles.main}>
        <header className={styles.header}>Header</header>
        <div>
          <h2 className={styles.heading}>Search</h2>
          <input
            className={styles.input}
            type='text'
            placeholder='Search here'/>
          <div className={styles.map} ref={map => { this.mapEl = map; }}></div>
        </div>
        <footer className={styles.footer}>Footer</footer>
      </div>
    );
  }
}

function initMap() {
  this.map = new google.maps.Map(this.mapEl, {
    center: { lat: 42.1792524, lng: -71.0714453 },
    zoom: 12
  });
}

export default connect(() => ({}), { requestKittens })(Index)
