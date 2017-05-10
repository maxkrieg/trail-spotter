import React, { Component, PropTypes } from 'react'
import styles from './App.css'

const propTypes = {
  children: PropTypes.any,
}

class App extends Component {

  state = {
    isOpen: false,
  }

  render() {
    return (
      <div className={styles.main}>
        <header className={styles.header}>trail spotter</header>
        <div className={styles.pageBody}>
          {this.props.children}
        </div>

      </div>
    )
  }
}

App.propTypes = propTypes
export default App
