import React from 'react';
import Palette from './Pallet'
import seedColors from './seedColors';
import { generatePalette } from './ColorHelpers';
import './App.css';

class App extends React.Component {
  render() {
    console.log(generatePalette(seedColors[4]))
    return (
      <div>
        <Palette {...seedColors[2]} />
      </div>

    )
  }
}

export default App;
