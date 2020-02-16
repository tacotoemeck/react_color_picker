import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Pallet';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';
import { generatePalette } from './ColorHelpers';
import './App.css';

class App extends React.Component {
  findPalette(id) {
    return seedColors.find((palette) => palette.id === id);
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path='/'
          render={(routeProps) => <PaletteList
            palettes={seedColors}
            {...routeProps}
          />} />
        <Route
          exact
          path='/palette/:id'
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />

          )}
        />
        <Route
          exact
          path='/palette/:paletteId/:colorId'
          render={routeProps => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>

      // <div>
      //   <Palette palette={generatePalette(seedColors[0])} />
      // </div>

    )
  }
}

export default App;
