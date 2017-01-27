import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getAllTrails } from '../actions/trails'

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
        <ul>
          {this.props.trails.map((trail) => (
            <li>
              <strong>{trail.title}</strong><br />
              {trail.description}<br />
              {trail.created.date}, {trail.created.time}
            </li>
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
