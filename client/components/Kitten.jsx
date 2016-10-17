import React, { PropTypes } from 'react';
import KittenIcon from '../svg/kitten.svg';

const Kitten = ({ onDeleteKitten, kitten }) => (
  <div>
    <div>
      <div><KittenIcon/></div>
      <div>Kitten #{kitten.id}</div>
    </div>
    <a
       onClick={onDeleteKitten.bind(this, kitten.id)}>
      Remove kitten
    </a>
  </div>
);


Kitten.propTypes = {
  kitten: PropTypes.shape({
    id: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired
  }).isRequired
};

export default Kitten;
