import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Pallet'
import seedColors from './seedColors';
import { generatePalette } from './ColorHelpers';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => <h1>pallets</h1>} />
        <Route exact path='/palette/:id' render={() => <h1>palleasdasdasdts</h1>} />
      </Switch>

      // <div>
      //   <Palette palette={generatePalette(seedColors[0])} />
      // </div>

    )
  }
}

export default App;
