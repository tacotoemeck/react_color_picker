export default {
  root: {
    backgroundColor: 'blue',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    border: '1p solid white',
    // '@media (max-width: 1200px)': {
    //   width: '80%',
    // },
    '@media (max-width: 992px)': {
      width: '80%',
    },
    '@media (max-width: 576px)': {
      width: '90%',
    },
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    '& a': {
      color: 'white',
    },
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '2rem',
    '@media (max-width: 700px)': {
      gridTemplateColumns: 'repeat(2, 50%)',
    },
    '@media (max-width: 576px)': {
      gridTemplateColumns: 'repeat(1, 60%)',
      justifyContent: 'center',
    },
    '@media (max-width: 307px)': {
      gridTemplateColumns: 'repeat(1, 100%)',
      gridGap: '1rem',
    },
  },
};
