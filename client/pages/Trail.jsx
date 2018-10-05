import React, { Component, PropTypes } from 'react'
import { get } from '../utils/api';

class Trail extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    getTrailInformation(this.props.params.trailId)
  }

  render() {
    return (
      <div>
        Show trail info for trail id {this.props.params.trailId}
      </div>
    )
  }
}

async function getTrailInformation(trailId) {
  try {
    const data = await get(`/trails/${trailId}`)
  } catch (e) {

  }
}


export default Trail