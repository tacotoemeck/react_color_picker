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
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { mergeClasses } from '@material-ui/styles';

const drawerWidth = 340;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '64px',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  navBtns: {},
}));

export default function NewPaletteForm(props) {
  const [paletteName, newPaletteName] = React.useState('');
  const classes = useStyles();
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
    <div className={classes.root}>
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
            Create Your Own Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
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
          </ValidatorForm>
          <Link exact to="/">
            <Button variant="contained" color="secondary">
              Go Back
            </Button>
          </Link>
        </div>
      </AppBar>
    </div>
  );
}
