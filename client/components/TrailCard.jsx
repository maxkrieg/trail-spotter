import React, { Component, PropTypes } from 'react'
import styles from './css/TrailCard.css'

const { number, shape, string } = PropTypes

const propTypes = {
  lat: number,
  lng: number,
  trail: shape({
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
        <strong>{this.props.trail.title}</strong><br />
        {this.props.trail.description}<br />
        {this.props.trail.created.date}, {this.props.trail.created.time}
      </li>
    )
  }
}

TrailCard.propTypes = propTypes

export default TrailCard
