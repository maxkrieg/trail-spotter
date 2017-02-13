import React, { Component, PropTypes } from 'react'
import styles from './css/TrailCard.css'

const { number, shape, string } = PropTypes

const propTypes = {
  trail: shape({
    lat: number,
    lng: number,
    title: string,
    created: shape({
      date: string,
      time: string,
    }),
  }),
}

class TrailCard extends Component {
  render() {
    return (
      <li className={styles.trailCard}>
        <div className={styles.trailCardContent}>
          <strong>{this.props.trail.title}</strong><br />
          {this.props.trail.description}<br />
          Added: {this.props.trail.created.date}, {this.props.trail.created.time}<br />
          Lat: {this.props.trail.lat}, Long: {this.props.trail.lng}
        </div>
      </li>
    )
  }
}

TrailCard.propTypes = propTypes

export default TrailCard
