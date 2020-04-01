import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import PaletteMetaForm from './PaletteMetaForm';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
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
    alignItems: 'center',
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
  navBtns: {
    marginRight: '10rem',
    '& a': {
      textDecoration: 'none',
    },
    '@media (max-width: 576px)': {
      marginRight: 0,
    },
  },
  button: {
    margin: '0 0.5rem',
    '@media (max-width: 576px)': {
      margin: 0,
      padding: 0,
    },
  },
  link: {
    textDecoration: 'none',
  },
}));

export default function PaletteFormNav(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const hideForm = () => {
    setOpen(false);
  };

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
            Create Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Link exact to="/" className={classes.link}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Go Back
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
            className={classes.button}
          >
            Save
          </Button>
        </div>
      </AppBar>
      {open && (
        <PaletteMetaForm
          palettes={props.palettes}
          handleSubmit={props.handleSubmit}
          hideForm={hideForm}
        />
      )}
    </div>
  );
}
