import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './css/NavBar.css'

class NavBar extends Component {
  render() {
    return (
      <nav className={styles.navBar}>
        <ul className={styles.navBarList}>
          <li>
            <Link to="/" className={styles.navBrandName}>trail spotter</Link>
          </li>
          <li>
            <Link to="/search">MAP TRAIL</Link>
          </li>
          <li>
            <Link to="/all-trails">ALL TRAILS</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default NavBar
