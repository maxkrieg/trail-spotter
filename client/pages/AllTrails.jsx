import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { getAllTrails } from '../actions/trails'

// import styles from './css/AllTrails.css'

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
        <ReactTable
          data={this.props.trails}
          columns={columns}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e) => {
                console.log('rowInfo', rowInfo)
              }
            }
          }}
        />
      </div>
    )
  }
}

const columns = [
  {
    header: 'Name',
    accessor: 'title',
  },
  {
    header: 'Trail Head',
    accessor: 'trail_head_address',
  },
  {
    header: 'Length (miles)',
    accessor: 'length',
  },
  {
    header: 'Created',
    accessor: 'created',
    render: props => <span>{props.value.time}, {props.value.date}</span>,
  },
]

const mapStateToProps = (state) => ({
  trails: state.trails,
})

const mapActionsToProps = {
  getAllTrails,
}

AllTrails.propTypes = propTypes
export default connect(mapStateToProps, mapActionsToProps)(AllTrails)
