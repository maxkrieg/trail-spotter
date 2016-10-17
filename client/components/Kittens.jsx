import React from 'react';
import Kitten from './Kitten';
import { connect } from 'react-redux';
import { addKitten, deleteKitten } from '../actions/kittens';

const Kittens = ({ kittens, addKitten, deleteKitten }) =>
  <div>
    {!!kittens.length &&
      <h1>Look, there are kittens in this basket:</h1>
    }
    {!!kittens.length &&
      <div>
        {kittens.map(kitten => (
          <Kitten key={`kitten-${kitten.id}`}
                  kitten={kitten}
                  onDeleteKitten={deleteKitten} />
        ))}
      </div>
    }
    {!kittens.length &&
      <h1>This backet has no kittens in it :(</h1>
    }
    <a onClick={addKitten}>
      Put another kitten into basket
    </a>
    <div>
      {'Icons made by '}
      <a
         href='http://www.flaticon.com/authors/freepik'
         title='Freepik'>
        Freepik
      </a>
      {' from '}
      <a
         href='http://www.flaticon.com'
         title='Flaticon'>
        www.flaticon.com
      </a>
      {' is licensed by '}
      <a
         href='http://creativecommons.org/licenses/by/3.0/'
         title='Creative Commons BY 3.0'>
        CC BY 3.0
      </a>
    </div>
  </div>;

export default connect(state => ({ kittens: state.kittens }), { addKitten, deleteKitten })(Kittens);
