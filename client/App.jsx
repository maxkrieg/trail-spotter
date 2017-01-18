import React, { PropTypes } from 'react'
import styles from './App.css'

const propTypes = {
  children: PropTypes.any,
}

const App = (props) => (
  <div className={styles.main}>
    <header className={styles.header}>trail spotter</header>
    {props.children}
  </div>
)

App.propTypes = propTypes
export default App
