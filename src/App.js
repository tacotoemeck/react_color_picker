import React from 'react';
import Palette from './Pallet'
import seedColors from './seedColors';
import { generatePalette } from './ColorHelpers';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Palette palette={generatePalette(seedColors[0])} />
      </div>

    )
  }
}

export default App;
