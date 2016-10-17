import React, { Component } from 'react';
import Kittens from '../components/Kittens';
import { connect } from 'react-redux';
import { requestKittens } from '../actions/kittens';

class Index extends Component {
  componentDidMount() {
    this.props.requestKittens();
  }

  render() {
    return (
      <div>
        <Kittens />
      </div>
    );
  }
}

export default connect(() => ({}), { requestKittens })(Index)
