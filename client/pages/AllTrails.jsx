import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TrailCard from '../components/TrailCard'
import { getAllTrails } from '../actions/trails'

import styles from './css/AllTrails.css'

const propTypes = {
  trails: PropTypes.array.isRequired,
  getAllTrails: PropTypes.func.isRequired,
}

class AllTrails extends Component {

  componentDidMount() {
    this.props.getAllTrails()
  }

  render() {
    return (
      <div>
        <h2>All Trails</h2>
        <ul className={styles.trailCardList}>
          {this.props.trails.map((trail) => (
            <TrailCard key={trail.id} trail={trail} />
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  trails: state.trails,
})

const mapActionsToProps = {
  getAllTrails,
}

AllTrails.propTypes = propTypes

export default connect(mapStateToProps, mapActionsToProps)(AllTrails)
