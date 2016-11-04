import React, { Component, PropTypes } from 'react'
import Map from '../components/Map'
import styles from './css/Search.css'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null,
      marker: null
    }
  }

  render() {
    return (
      <div className={styles.main}>
        <header className={styles.header}>trail spotter</header>
        <div className={styles.mapSearchContainer}>
          <Map/>
        </div>
      </div>
    )
  }
}

export default Search
