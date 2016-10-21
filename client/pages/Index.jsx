import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestKittens } from '../actions/kittens';
import Map from '../components/Map'
import styles from '../css/pages/Index.css'

class Index extends Component {
  render() {
    return (
      <div className={styles.main}>
        <header className={styles.header}>trail spotter</header>
        <div className={styles.mapSearchContainer}>
          <input
            className={styles.input}
            type='text'
            placeholder='Find a trail'/>
          <Map />
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), { requestKittens })(Index)
