import React from 'react';
import Palette from './Pallet'
import seedColors from './seedColors';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Palette {...seedColors[2]} />
      </div>

    )
  }
}

export default App;
