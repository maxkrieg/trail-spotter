import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestKittens } from '../actions/kittens';
import Map from '../components/Map'
import styles from '../css/pages/Index.css'

class Index extends Component {
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
          <Map />
        </div>
        <footer className={styles.footer}>Footer</footer>
      </div>
    );
  }
}

export default connect(() => ({}), { requestKittens })(Index)
