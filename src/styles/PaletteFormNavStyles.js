// currently unused due to conflicts

import { makeStyles, useTheme } from '@material-ui/core/styles';

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
    },
  },
  link: {
    textDecoration: 'none',
  },
}));

export default useStyles;
