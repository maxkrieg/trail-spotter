import React, { Component, PropTypes } from 'react'
import NavBar from './components/NavBar'
import styles from './App.css'

const propTypes = {
  children: PropTypes.any,
  params: PropTypes.object,
}

class App extends Component {

  state = {
    isOpen: false,
  }

  render() {
    return (
      <div className={styles.main}>
        <NavBar params={this.props.params} />
        <div className={styles.pageBody}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

App.propTypes = propTypes
export default App
