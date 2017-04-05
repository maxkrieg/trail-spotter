import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TrailCard from '../components/TrailCard'
import { getAllTrails, sortTrails } from '../actions/trails'

import styles from './css/AllTrails.css'

const propTypes = {
  trails: PropTypes.array.isRequired,
  getAllTrails: PropTypes.func.isRequired,
  sortTrails: PropTypes.func.isRequired,
}

class AllTrails extends Component {

  componentDidMount() {
    this.props.getAllTrails()
  }

  handleSelect = (e) => {
    this.props.sortTrails(e.target.value)
  }

  render() {
    return (
      <div>
        <h2>All Trails</h2>
        <select onChange={this.handleSelect}>
          <option value="created">Created</option>
          <option value="longest">Longest</option>
          <option value="shortest">Shortest</option>
        </select>
        <ul className={styles.trailCardList}>
          {this.props.trails.map((trail, i) => (
            <TrailCard key={i} trail={trail} />
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
  sortTrails,
}

AllTrails.propTypes = propTypes
export default connect(mapStateToProps, mapActionsToProps)(AllTrails)
