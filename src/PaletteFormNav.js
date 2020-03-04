import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import {
  ValidatorForm,
  TextValidator,
} from 'react-material-ui-form-validator';

export default function NewPaletteForm(props, classes) {
  const [paletteName, newPaletteName] = React.useState('');

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
      let allPaletteNames = [];
      props.palettes.forEach(palette =>
        allPaletteNames.push(palette.paletteName.toLowerCase()),
      );
      if (allPaletteNames.includes(value.toLowerCase())) {
        return false;
      } else {
        return true;
      }
    });
  });

  function handleChangeNewPalette(e) {
    const paletteName = e.target.value;
    newPaletteName(paletteName);
  }

  return (
    <div>
      <CssBaseline />
      <AppBar
        color="default"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            className={clsx(
              classes.menuButton,
              props.open && classes.hide,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
          <ValidatorForm
            onSubmit={() => props.handleSubmit(paletteName)}
          >
            <TextValidator
              label="Palette Name"
              value={paletteName}
              onChange={handleChangeNewPalette}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={[
                'Enter Palette Name',
                'This Palette Name is already used',
              ]}
            />
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
            <Link exact to="/">
              <Button variant="contained" color="secondary">
                Go Back
              </Button>
            </Link>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
    </div>
  );
}
